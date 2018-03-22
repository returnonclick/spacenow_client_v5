"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
const moment = require('moment')
admin.initializeApp(functions.config().firebase);

const EmailTemplate = require('swig-email-templates');
// create template renderer
const templates = new EmailTemplate({
    root: './src/templates/'
});
var spacenow = '"Spacenow" <noreply@spacenow-bca9c.firebaseapp.com>'

// create PDF document
var PDFDocument, doc;
var fs = require('fs');
PDFDocument = require('pdfkit');
doc = new PDFDocument;
// doc.pipe(fs.createWriteStream('output.pdf'));
// // PDF Creation logic goes here
// doc.end();

/**
* New User - Welcome email
*/
// exports.sendWelcomeEmail = functions.auth.user().onCreate((event) => {
//     const userData = event.data;
//     let subject = 'Welcome to Spacenow'
//     var context = { userData }
//     sendEmail('userNewWelcome.html', context, spacenow, userData.email, subject)
// });
/**
* Listing Approved email
*/
// exports.createNewListing = functions.firestore
//     .document('listings/{id}')
//     .onCreate(event => {
//         const listing = event.data.data()
//         return getUser(listing.ownerUid)
//             .then(doc => {
//                 const hostData = doc.data()
//                 return getCategories(listing.categoryId)
//                     .then((docCat) => {
//                         const cateData = docCat.data()
//                         let subject = 'Spacenow: Your space is now live.'
//                         var context = { listing, hostData, cateData }
//                         sendEmail('listingToApprove-table.html', context, spacenow, hostData.email, subject)
//                     }).catch(error => { console.log(error) })
//             }).catch(error => { console.log(error) })
//     })

// /**
// * Listing Active email
// */
// exports.activeListing = functions.firestore
//     .document('listings/{id}')
//     .onUpdate(event => {
//         const listing = event.data.data()
//         const listingPrevious = event.data.previous.data()
//         if (listing.status !== listingPrevious.status) {
//             return getCategories(listing.categoryId)
//                 .then((docCat) => {
//                     const cateData = docCat.data()
//                     return getUser(listing.ownerUid)
//                         .then(doc => {
//                             const hostData = doc.data()
//                             let subject = 'Spacenow: Your space is now live.'
//                             var context = { listing, hostData, cateData }
//                             sendEmail('listingActive-table.html', context, spacenow, hostData.email, subject)
//                         }).catch(error => { console.log(error) })
//                 })
//                 .catch(error => {
//                     console.error('There was an error while sending the email:', error)
//                 })
//                 .catch(error => { console.log(error) })
//         }
//     })
/**
* Booking Request email
*/
// exports.requestBooking = functions.firestore
//     .document('bookings/{id}')
//     .onCreate(event => {
//         const booking = event.data.data()
 
//         // RETIRAR spaceID HARDCODE
//         //************************************* */
//         // const spaceId = 'QV18Xnq4nKkVqVOuSRwpb'
//         // return getSpace(spaceId)  ---TEST
//         //************************************* */
//         return getSpace(booking.spaceBookings[0].spaceId)
//             .then(docListing => {
//                 const listing = docListing.data()
//                 return getUser(listing.ownerUid)
//                     .then(doc => {
//                         const hostData = doc.data()
//                         return getUser(booking.userId)
//                             .then((docUser) => {
//                                 const userData = docUser.data()
//                                 return getCategories(listing.categoryId)
//                                     .then((docCat) => {
//                                         const cateData = docCat.data()
//                                         let subject = 'You have a new booking request.'
//                                         convertDate(booking.spaceBookings[0].bookingDates)
//                                             .then(dates => {
//                                                 var context = { booking, listing, userData, hostData, cateData, dates }
//                                                 sendEmail('bookingRequest-table.html', context, spacenow, hostData.email, subject)
//                                             })
//                                     }).catch(error => console.error('There was an error while sending the email:', error))
//                             }).catch(error => console.error(error))
//                     }).catch(error => console.error(error))
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     })
/**
* Booking Payment Request email // Booking Cancellation Request email //  Booking Confirmation Request email // Host Confirmation
*/
exports.actionsBooking = functions.firestore
    .document('bookings/{id}')
    .onUpdate(event => {
        const booking = event.data.data()
        const bookingPrevious = event.data.previous.data()
        // const spaceId = booking.spaceBookings.spaceId
        // RETIRAR spaceID HARDCODE
        //************************************* */
        const spaceId = 'QV18Xnq4nKkVqVOuSRwpb'
        //************************************* */
        if (booking.bookingStatus !== bookingPrevious.bookingStatus) {
            // return getSpace(booking.spaceBookings[0].spaceId)
            return getSpace(spaceId)
                .then((docListing) => {
                    const listing = docListing.data()
                    switch (booking.bookingStatus) {

                        // case 'Approved':
                        //     return getUser(booking.userId)
                        //         .then((docUser) => {
                        //             const userData = docUser.data()
                        //             return getCategories(listing.categoryId)
                        //                 .then((docCat) => {
                        //                     const cateData = docCat.data()
                        //                     let subject = 'Your booking request has been approved.'
                        //                     convertDate(booking.spaceBookings[0].bookingDates)
                        //                         .then(dates => {
                        //                             var context = { booking, userData, listing, cateData, dates }
                        //                             console.log(dates)
                        //                             sendEmail('bookingConfirmation-table.html', context, spacenow, userData.email, subject)
                        //                         })
                        //                 }).catch(error => console.error('There was an error while sending the email:', error))
                        //         }).catch(error => console.error(error))

                        // case 'Declined':
                        //     return getUser(booking.userId)
                        //         .then(doc => {
                        //             const userData = doc.data()
                        //             return getCategories(listing.categoryId)
                        //                 .then((docCat) => {
                        //                     const cateData = docCat.data()
                        //                     let subject = 'Unfortunately the host has declined your booking request.'
                        //                     var context = { booking, userData, listing, cateData }
                        //                     sendEmail('bookingCancellation-table.html', context, spacenow, userData.email, subject)
                        //                 }).catch(error => console.error('There was an error while sending the email:', error))
                        //         }).catch(error => console.error(error))

                        case 'Confirmed':
                            return getUser(booking.userId)
                                .then(doc => {
                                    const userData = doc.data()
                                    return getUser(listing.ownerUid)
                                        .then(hostDoc => {
                                            const hostData = hostDoc.data()
                                            return getCategories(listing.categoryId)
                                                .then((docCat) => {
                                                    const cateData = docCat.data()
                                                    let subject = 'Your space has been booked and you have a new guest coming for the below space.'
                                                    let guestSubject = 'Congratulations your booking has been confirmed for the below space.'
                                                    const context = { booking, hostData, listing, userData, cateData }
                                                    sendEmail('bookingHostConfirmation-table.html', context, spacenow, hostData.email, subject)
                                                        // .then(emailSent => {
                                                        //     console.log('emailHostSent = ', emailSent)
                                                        //     if (emailSent) {
                                                        //         console.log(emailSent)
                                                        //         doc.pipe(fs.createWriteStream('Host_Invoice.pdf'));
                                                        //         // PDF Creation logic goes here
                                                        //         doc.end();
                                                        //     }
                                                        // })
                                                    sendEmail('bookingGuestConfirmation-table.html', context, spacenow, userData.email, guestSubject)
                                                        // .then(emailGuestSent => {
                                                        //     console.log('emailGuestSent = ', emailGuestSent)
                                                        //     if (emailGuestSent) {
                                                        //         doc.pipe(fs.createWriteStream('Guest_Invoice.pdf'));
                                                        //         // PDF Creation logic goes here
                                                        //         doc.end();
                                                        //     }
                                                        // })
                                                }).catch(error => console.error('There was an error getCategories function', error))
                                        }).catch(error => console.error(error))
                                }).catch(error => console.error(error))
                    }
                })
                .catch(error => console.log(error))
        }
    })

function getSpace(id) {
    return admin.firestore().collection('listings').doc(`${id}`).get()
}

function getUser(id) {
    return admin.firestore().collection('users').doc(`${id}`).get()
}

function getCategories(id) {
    return admin.firestore().collection('categories').doc(`${id}`).get()
}

function sendEmail(template, context, from, email, subject) {
    // function sendEmail(template, context, from, email, subject): Promise<boolean> {    
    templates.render(`${template}`, context, function (err, html) {
    return mailTransport.sendMail({
            from: from,
            to: email,
            html: html,
            subject: subject
        }).then(() => {
            console.log('Email Template:', template + ', ' + 'send to', email);
            // return true
        }).catch(error => {
            console.error('There was an error while sending the email:', error);
            // return false
        });
    })
}

function convertDate(bookingDates: Array<any>): Promise<Array<any>> {
    return new Promise(resolve => {
        let dates: Array<any> = new Array()
        let count = bookingDates.length

        for (let i = 0; count >= 1; i++) {
            dates.push({
                date: formatDate(bookingDates[i].date),
                fromHour: formatDate(bookingDates[i].fromHour, 'H', 'h A'),
                toHour: formatDate(bookingDates[i].toHour, 'H', 'h A')
            })
            count = count - 1
            if (count <= 1) {
                resolve(dates)
            }
        }
    })
}

function formatDate(d: number, fromFmt: string = null, toFmt: string = 'DD-MM-YYYY') {
    if (!fromFmt)
        return moment(d).format(toFmt)
    return moment(d, fromFmt).format(toFmt)
}

//# sourceMappingURL=index.js.map
