"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listing_short_detail_1 = require("./models/listing-short-detail");
const booking_1 = require("./models/booking");
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const serviceAccount = require("./service-account-v5.json");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
const moment = require('moment');
// const path = require('path')
// const phantomPath = require('witch')('phantomjs-prebuilt', 'phantomjs');
// admin.initializeApp(functions.config().firebase);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://spacenow-bca9c.appspot.com/",
    databaseURL: "https://spacenow-bca9c.firebaseio.com"
});
// Require gcloud
var gcloud = require('google-cloud');
// Enable Storage
var gcs = gcloud.storage({
    projectId: "spacenow-bca9c",
    keyFilename: './lib/service-account-v5.json'
});
// const serviceAccount = require("./service-account-v5.json");
const BUCKET_NAME = "gs://spacenow-bca9c.appspot.com";
const EmailTemplate = require('swig-email-templates');
// create template renderer
const templates = new EmailTemplate({
    root: './src/templates/'
});
var spacenow = '"Spacenow" <noreply@spacenow-bca9c.firebaseapp.com>';
/**
* New User - Welcome email
*/
const sendWelcomeEmail = functions.auth
    .user()
    .onCreate(userData => {
    let context = { userData };
    let subject = 'Welcome to Spacenow';
    return sendEmail('userNewWelcome.html', context, spacenow, userData.email, subject);
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
        case 'Pending': {
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
                    return sendEmail('bookingRequest-table.html', context, spacenow, hostData.email, subject);
                });
            })
                .catch(err => console.error(err));
        }
        case 'Enquiry': {
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
                    return sendEmail('enquiryRequest-table.html', context, spacenow, hostData.email, subject);
                });
            })
                .catch(err => console.error(err));
        }
    }
});
/**
 * Booking Payment Request email // Booking Cancellation Request email //  Booking Confirmation Request email // Host Confirmation
 */
const actionsBooking = functions.firestore
    .document('bookings/{id}')
    .onUpdate((event, context) => {
    let booking = new booking_1.Booking;
    booking = event.after.data();
    const bookingPrevious = event.before.data();
    let spaceId = booking.spaceId;
    if (booking.bookingStatus !== bookingPrevious.bookingStatus) {
        return getSpace(spaceId)
            .then((docListing) => {
            const listing = docListing.data();
            switch (booking.bookingStatus) {
                case 'Approved':
                    return getUser(booking.userId)
                        .then((docUser) => {
                        const userData = docUser.data();
                        return getCategories(listing.categoryId)
                            .then((docCat) => {
                            const cateData = docCat.data();
                            convertDates(booking.bookingDates)
                                .then(dates => {
                                let bookingDates = new Object([]);
                                bookingDates = dates;
                                let daysTot = booking.bookingDates.length;
                                var context = { booking, userData, listing, cateData, bookingDates, daysTot };
                                let subject = 'Your booking request has been approved.';
                                // sendEmail('bookingConfirmation-table.html', context, spacenow, userData.email, subject)
                            }).catch(error => console.error('There was an error while sending the email:', error));
                        }).catch(error => console.error(error));
                    }).catch(error => console.error(error));
                case 'Declined':
                    return getUser(booking.userId)
                        .then(doc => {
                        const userData = doc.data();
                        return getCategories(listing.categoryId)
                            .then((docCat) => {
                            const cateData = docCat.data();
                            let subject = 'Unfortunately the host has declined your booking request.';
                            var context = { booking, userData, listing, cateData };
                            // sendEmail('bookingCancellation-table.html', context, spacenow, userData.email, subject)
                            let status = 'Canceled';
                            updateBooking(booking, status);
                        }).catch(error => console.error('There was an error while sending the email:', error));
                    }).catch(error => console.error(error));
                case 'Confirmed':
                    return getUser(booking.userId)
                        .then(doc => {
                        const userData = doc.data();
                        return getUser(listing.ownerUid)
                            .then(hostDoc => {
                            const hostData = hostDoc.data();
                            return getCategories(listing.categoryId)
                                .then((docCat) => {
                                const cateData = docCat.data();
                                let subject = 'Your space has been booked and you have a new guest coming for the below space.';
                                let guestSubject = 'Congratulations your booking has been confirmed for the below space.';
                                const context = { booking, hostData, listing, userData, cateData };
                                pdfGenerator(booking.id + 'Invoice_host.pdf', context).then(pdfFile => {
                                    sendEmailInvoice('bookingHostConfirmation-table.html', context, spacenow, hostData.email, subject, booking.id + '_Invoice.pdf', pdfFile);
                                    pdfGeneratorGuest(booking.id + 'Invoice_guest.pdf', context).then(pdfFileGuest => {
                                        sendEmailInvoice('bookingGuestConfirmation-table.html', context, spacenow, userData.email, guestSubject, booking.id + 'Invoice_guest.pdf', pdfFileGuest);
                                        let status = 'Completed';
                                        updateBooking(booking, status);
                                    }).catch(error => console.error(error));
                                }).catch(error => console.error(error));
                            }).catch(error => console.error('There was an error getCategories function', error));
                        }).catch(error => console.error(error));
                    }).catch(error => console.error(error));
            }
        })
            .catch(error => console.log(error));
    }
});
module.exports = {
    sendWelcomeEmail,
    createNewListing,
    activeListing,
    requestBooking,
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
function updateBooking(booking, status) {
    let data = booking;
    data.bookingStatus = status;
    data.paymentStatus = status;
    return admin.firestore().collection('bookings').doc(`${booking.id}`).set(data);
}
function sendEmail(template, context, from, email, subject) {
    return new Promise((resolve, reject) => {
        templates.render(template, context, (err, html) => {
            if (err)
                reject(err);
            resolve(html);
        });
    }).then(html => mailTransport.sendMail({
        from: from,
        to: email,
        html: html,
        subject: subject,
    }))
        .then(() => console.log(`Email Template: ${template}, sent to ${email}`))
        .catch(err => console.error('There was an error while sending the email:', err));
}
function sendEmailInvoice(template, context, from, email, subject, fileName = null, filePath = null) {
    templates.render(`${template}`, context, function (err, html) {
        return mailTransport.sendMail({
            from: from,
            to: email,
            html: html,
            subject: subject,
            attachments: [
                { filename: fileName, path: filePath, contentType: 'application/pdf' }
            ],
        }).then(() => {
            console.log('Email Template:', template + ', ' + 'send to', email);
            // return true
        }).catch(error => {
            console.error('There was an error while sending the email:', error);
            // return false
        });
    });
}
function convertDates(bookingDates) {
    return new Promise((resolve, reject) => {
        if (bookingDates.length < 1)
            reject();
        let dates = bookingDates.map(date => {
            return {
                date: formatDate(date.date),
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
function pdfGenerator(fileName, context) {
    return new Promise(resolve => {
        let fs = require('fs');
        let pdf = require('html-pdf');
        let options = {
            format: 'A4',
            border: { top: "0.5cm", right: "0.5cm", bottom: "0.5cm", left: "0.5cm" },
            type: 'pdf',
            timeout: 600000,
            renderDelay: 1000,
        };
        console.log('pdfGenerator Host');
        templates.render('invoice.html', context, function (err, html) {
            console.log(html);
            pdf.create(html, options).toBuffer(function (err, buffer) {
                if (!err) {
                    uploadFile(fileName, buffer).then(pdfFile => {
                        console.log('pdfFile = ', pdfFile);
                        resolve(pdfFile);
                    }).catch(error => console.error(error));
                }
            });
            console.log(err);
        });
    });
}
function pdfGeneratorGuest(fileName, context) {
    return new Promise(resolve => {
        let fs = require('fs');
        let pdf = require('html-pdf');
        let options = {
            format: 'A4',
            border: { top: "0.5cm", right: "0.5cm", bottom: "0.5cm", left: "0.5cm" },
            type: 'pdf',
            timeout: 600000,
            renderDelay: 1000,
        };
        console.log('pdfGenerator Guest');
        templates.render('invoice.html', context, function (err, html) {
            pdf.create(html, options).toBuffer(function (err, buffer) {
                if (!err) {
                    uploadFile(fileName, buffer).then(pdfFile => {
                        console.log('pdfFile = ', pdfFile);
                        resolve(pdfFile);
                    }).catch(error => console.error(error));
                }
            });
        });
    });
}
function uploadFile(fileName, buffer) {
    return new Promise(resolve => {
        var bucket = gcs.bucket('gs://spacenow-bca9c.appspot.com');
        const gcsname = '/pdf/' + fileName;
        const file = bucket.file(gcsname);
        var buff = Buffer.from(buffer);
        const stream = file.createWriteStream({
            metadata: {
                contentType: 'application/pdf'
            }
        });
        file.save(buffer, ((error) => { console.log(error); }));
        stream.on('error', (err) => {
            console.log(err);
            resolve(err);
        });
        stream.on('finish', () => {
            console.log(gcsname);
            let pdfFile = "https://storage.googleapis.com/" + BUCKET_NAME +
                "/pdf/" + fileName;
            resolve(pdfFile);
        });
        stream.end(new Buffer(buff));
    });
}
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map