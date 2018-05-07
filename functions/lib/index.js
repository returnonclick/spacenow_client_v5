"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const booking_1 = require("./models/booking");
const listing_short_detail_1 = require("./models/listing-short-detail");
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const moment = require('moment');
const gcloud = require('google-cloud');
const EmailTemplate = require('swig-email-templates');
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
const BUCKET_NAME = 'gs://spacenow-bca9c.appspot.com';
let serviceAccount = require('./service-account-v5.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET_NAME,
    databaseURL: 'https://spacenow-bca9c.firebaseio.com'
});
const SPACENOW = '"Spacenow" <noreply@spacenow-bca9c.firebaseapp.com>';
const TEMPLATES = new EmailTemplate({
    root: './src/templates/',
});
const GCS = gcloud.storage({
    projectId: 'spacenow-bca9c',
    keyFilename: './lib/service-account-v5.json',
});
/**
* New User - Welcome email
*/
const sendWelcomeEmail = functions.auth
    .user()
    .onCreate(userData => {
    let context = { userData };
    const subject = 'Welcome to Spacenow';
    return sendEmail('userNewWelcome.html', context, SPACENOW, userData.email, subject);
});
/**
 * Creating listings-short-detail document
 */
const createNewListing = functions.firestore
    .document('listings/{id}')
    .onCreate(event => {
    let listing = event.data();
    let userP = getUser(listing.ownerUid);
    let catP = getCategories(listing.categoryId);
    return Promise.all([userP, catP])
        .then(([hostData, catData]) => updateShortDetailSpace(listing, catData.data(), hostData.data()))
        .catch(err => console.log(err));
});
/**
 *  Listing Active email / Listing Approved email
 */
const activeListing = functions.firestore
    .document('listings/{id}')
    .onUpdate((event, context) => {
    let listing = event.after.data();
    let userP = getUser(listing.ownerUid);
    let catP = getCategories(listing.categoryId);
    return Promise.all([userP, catP])
        .then(([hostData, catData]) => updateShortDetailSpace(listing, catData.data(), hostData.data()))
        .catch(err => console.log(err));
});
/**
 * Booking Request email
 */
const requestBooking = functions.firestore
    .document('bookings-errol/{id}') // TODO: change back to original
    .onCreate((event, ctx) => {
    let booking = new booking_1.Booking(event.data());
    switch (booking.bookingStatus) {
        case booking_1.BookingStatus.PENDING: {
            let spaceP = getSpace(booking.spaceId);
            let datesP = convertDates(booking.bookingDates);
            let guestP = getUser(booking.userId);
            return Promise.all([spaceP, datesP, guestP])
                .then(([space, dates, guest]) => {
                let listing = space.data();
                let userData = guest.data();
                let hostP = getUser(listing.ownerUid);
                let catP = getCategories(listing.categoryId);
                return Promise.all([hostP, catP])
                    .then(([host, cat]) => {
                    let hostData = host.data();
                    let cateData = cat.data();
                    let subject = 'You have a new booking request.';
                    let context = { booking, listing, userData, hostData, cateData, dates };
                    return sendEmail('bookingRequest-table.html', context, SPACENOW, hostData.email, subject);
                });
            })
                .catch(err => console.error(err));
        }
        case booking_1.BookingStatus.ENQUIRY: {
            return getSpace(booking.spaceId)
                .then(space => {
                let listing = space.data();
                let hostP = getUser(listing.ownerUid);
                let catP = getCategories(listing.categoryId);
                return Promise.all([hostP, catP])
                    .then(([host, cat]) => {
                    let hostData = host.data();
                    let cateData = cat.data();
                    let subject = 'You have a new booking enquiry.';
                    let context = { booking, listing, hostData, cateData };
                    return sendEmail('enquiryRequest-table.html', context, SPACENOW, hostData.email, subject);
                });
            })
                .catch(err => console.error(err));
        }
        default:
            return null;
    }
});
/**
 * Booking Payment Request email // Booking Cancellation Request email //  Booking Confirmation Request email // Host Confirmation
 */
const actionsBooking = functions.firestore
    .document('bookings-errol/{id}') // TODO: change back to original
    .onUpdate((event, ctx) => {
    let currBooking = new booking_1.Booking(event.after.data());
    let prevBooking = event.before.data();
    if (currBooking.bookingStatus !== prevBooking.bookingStatus) {
        let spaceP = getSpace(currBooking.spaceId);
        let guestP = getUser(currBooking.userId);
        return Promise.all([spaceP, guestP])
            .then(([space, guest]) => {
            let listing = space.data();
            let userData = guest.data();
            let daysTot = currBooking.bookingDates.length;
            switch (currBooking.bookingStatus) {
                case booking_1.BookingStatus.APPROVED: {
                    let datesP = convertDates(currBooking.bookingDates);
                    let catP = getCategories(listing.categoryId);
                    return Promise.all([datesP, catP])
                        .then(([bookingDates, cat]) => {
                        let cateData = cat.data();
                        let context = {
                            booking: currBooking,
                            userData,
                            listing,
                            cateData,
                            bookingDates,
                            daysTot,
                        };
                        let subject = 'Your booking request has been approved.';
                        return sendEmail('bookingConfirmation-table.html', context, SPACENOW, userData.email, subject);
                    });
                }
                case booking_1.BookingStatus.DECLINED: {
                    return getCategories(listing.categoryId)
                        .then(cat => {
                        let cateData = cat.data();
                        let context = {
                            booking: currBooking,
                            userData,
                            listing,
                            cateData,
                        };
                        const subject = 'Unfortunately the host has declined your booking request.';
                        return Promise.all([
                            sendEmail('bookingCancellation-table.html', context, SPACENOW, userData.email, subject),
                            updateBookingStatus(currBooking, booking_1.BookingStatus.CANCELED),
                        ]);
                    });
                }
                case booking_1.BookingStatus.CONFIRMED: {
                    let hostP = getUser(listing.ownerUid);
                    let catP = getCategories(listing.categoryId);
                    let datesP = convertDates(currBooking.bookingDates, 'D MMM YYYY');
                    return Promise.all([hostP, catP, datesP])
                        .then(([host, cat, dates]) => {
                        let hostData = host.data();
                        let cateData = cat.data();
                        let context = {
                            booking: currBooking,
                            hostData,
                            listing,
                            userData,
                            cateData,
                            dates,
                        };
                        const hostSubject = 'Your space has booked and you have a new guest coming.';
                        let hostPdfP = generatePdf(`${currBooking.id}_Invoice_host.pdf`, context)
                            .then(pdf => sendEmailInvoice('bookingHostConfirmation-table.html', context, SPACENOW, hostData.email, hostSubject, `${currBooking.id}_Invoice.pdf`, pdf));
                        const guestSubject = 'Congratulations! Your booking has been confirmed';
                        let guestPdfP = generatePdf(`${currBooking.id}_Invoice_guest.pdf`, context)
                            .then(pdf => sendEmailInvoice('bookingGuestConfirmation-table.html', context, SPACENOW, userData.email, guestSubject, `${currBooking.id}_Invoice.pdf`, pdf));
                        return Promise.all([hostPdfP, guestPdfP])
                            .then(pdfs => updateBookingStatus(currBooking, booking_1.BookingStatus.COMPLETED));
                    });
                }
                default:
                    return null;
            }
        })
            .catch(err => console.error(err));
    }
    return null;
});
module.exports = {
    sendWelcomeEmail,
    createNewListing,
    activeListing,
    requestBooking,
    actionsBooking,
};
/* maintenance function /listings-short-detail Document */
function updateShortDetailSpace(listing, catData, hostData) {
    let shortData = new listing_short_detail_1.ListingShortDetail({
        id: listing.id,
        title: listing.title,
        countryName: listing.address.country,
        currency: listing.currency,
        fullAddress: listing.address.full_name,
        priceUnit: listing.priceUnit,
        price: listing.price.price,
        category: catData.name,
        geopoint: listing.address,
        images: listing.images,
        ownerDisplayName: hostData.displayName,
        categorySlug: catData.slug || null,
        status: listing.status,
        capacity: listing.specifications.capacity || null,
    });
    const data = Object.assign({}, shortData);
    return admin.firestore().doc(`/listings-short-detail/${shortData.id}`).set(data);
}
function getSpace(id) {
    return admin.firestore().collection('listings').doc(id).get();
}
function getUser(id) {
    return admin.firestore().doc(`/users/${id}`).get();
}
function getCategories(id) {
    return admin.firestore().doc(`/categories/${id}`).get();
}
function updateBookingStatus(booking, status) {
    let data = {
        // ...booking,
        bookingStatus: status,
        paymentStatus: status,
    };
    return admin.firestore().doc(`bookings-errol/${booking.id}`) // TODO: change back to original
        .set(data, {
        merge: true,
    });
}
function sendEmail(template, context, from, email, subject) {
    return new Promise((resolve, reject) => {
        TEMPLATES.render(template, context, (err, html) => {
            if (email != 'errol+test@returnonclick.com.au') // TODO: remove
                reject('Not errol+test@returnonclick.com.au');
            if (err)
                reject(err);
            resolve(html);
        });
    })
        .then(html => mailTransport.sendMail({
        from: from,
        to: email,
        html: html,
        subject: subject,
    }))
        .then(() => console.log(`Email Template: ${template}, sent to ${email}`))
        .catch(err => console.error('There was an error while sending the email:', err));
}
function sendEmailInvoice(template, context, from, email, subject, fileName = null, filePath = null) {
    return new Promise((resolve, reject) => {
        TEMPLATES.render(template, context, (err, html) => {
            if (email != 'errol+test@returnonclick.com.au') // TODO: remove
                reject('Not errol+test@returnonclick.com.au');
            if (err)
                reject(err);
            resolve(html);
        });
    })
        .then(html => mailTransport.sendMail({
        from: from,
        to: email,
        html: html,
        subject: subject,
        attachments: [{
                filename: fileName,
                path: filePath,
                contentType: 'application/pdf',
            }],
    }))
        .then(() => console.log(`Email Template: ${template}, sent to: ${email}`))
        .catch(err => console.error('There was an error while sending the email:', err));
}
function convertDates(bookingDates, toFmt = 'DD-MM-YYYY') {
    return new Promise((resolve, reject) => {
        if (bookingDates.length < 1)
            reject('Invalid list of bookingDates');
        let dates = bookingDates.map(date => {
            return {
                date: formatDate(date.date, null, toFmt),
                fromHour: formatDate(date.fromHour, 'H', 'h A'),
                toHour: formatDate(date.toHour, 'H', 'h A'),
            };
        });
        resolve(dates);
    });
}
function formatDate(d, fromFmt = null, toFmt = 'DD-MM-YYYY') {
    if (!fromFmt)
        return moment(d).format(toFmt);
    return moment(d, fromFmt).format(toFmt);
}
function generatePdf(fileName, context) {
    return new Promise((resolve, reject) => {
        TEMPLATES.render('invoice_new.html', context, (err, html) => {
            if (err)
                reject(err);
            resolve(html);
        });
    })
        .then(html => new Promise((resolve, reject) => {
        let pdf = require('html-pdf');
        let options = {
            format: 'A4',
            border: {
                top: '0.5cm',
                right: '0.5cm',
                bottom: '0.5cm',
                left: '0.5cm',
            },
            type: 'pdf',
            timeout: 600000,
            renderDelay: 1000,
        };
        pdf.create(html, options).toBuffer((err, buffer) => {
            if (err)
                reject(err);
            resolve(buffer);
        });
    }))
        .then(buffer => uploadFile(fileName, buffer))
        .catch(err => console.error(err));
}
function uploadFile(fileName, buffer) {
    return new Promise((resolve, reject) => {
        const GCS_NAME = `pdf/${fileName}`;
        let bucket = GCS.bucket(BUCKET_NAME);
        let file = bucket.file(GCS_NAME);
        let stream = file.createWriteStream({
            metadata: {
                contentType: 'application/pdf'
            }
        });
        stream.on('error', err => {
            reject(err);
        });
        stream.on('finish', () => {
            let transform = GCS_NAME.replace('/', '%2F');
            resolve(`https://firebasestorage.googleapis.com/v0/b/spacenow-bca9c.appspot.com/o/${transform}?alt=media`);
            // resolve(`https://storage.googleapis.com/${BUCKET_NAME}/${GCS_NAME}`)
        });
        stream.end(buffer);
    });
}
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map