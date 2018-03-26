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


// const serviceAccount = require("./service-account-v5.json");
const BUCKET_NAME = "gs://spacenow-bca9c.appspot.com";

// admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount),
//   storageBucket: "gs://spacenow-bca9c.appspot.com/",
//   databaseURL: "https://spacenow-bca9c.firebaseio.com"

// });

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

                        case 'Approved':
                            return getUser(booking.userId)
                                .then((docUser) => {
                                    const userData = docUser.data()
                                    return getCategories(listing.categoryId)
                                        .then((docCat) => {
                                            const cateData = docCat.data()
                                            let subject = 'Your booking request has been approved.'
                                            convertDate(booking.spaceBookings[0].bookingDates)
                                                .then(dates => {
                                                    let daysTot = ((booking.spaceBookings[0].bookingDates.length) - 1)                                              
                                                    var context = { booking, userData, listing, cateData, dates, daysTot }
                                                    sendEmail('bookingConfirmation-table.html', context, spacenow, userData.email, subject)
                                                })
                                        }).catch(error => console.error('There was an error while sending the email:', error))
                                }).catch(error => console.error(error))

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

                        // case 'Confirmed':
                        //     return getUser(booking.userId)
                        //         .then(doc => {
                        //             const userData = doc.data()
                        //             return getUser(listing.ownerUid)
                        //                 .then(hostDoc => {
                        //                     const hostData = hostDoc.data()
                        //                     return getCategories(listing.categoryId)
                        //                         .then((docCat) => {
                        //                             const cateData = docCat.data()
                        //                             let subject = 'Your space has been booked and you have a new guest coming for the below space.'
                        //                             let guestSubject = 'Congratulations your booking has been confirmed for the below space.'
                        //                             const context = { booking, hostData, listing, userData, cateData }
                        //                             sendEmail('bookingHostConfirmation-table.html', context, spacenow, hostData.email, subject)
                        //                             sendEmail('bookingGuestConfirmation-table.html', context, spacenow, userData.email, guestSubject)
                        //                         }).catch(error => console.error('There was an error getCategories function', error))
                        //                 }).catch(error => console.error(error))
                        //         }).catch(error => console.error(error))
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


// pdfGenerator("test.pdf");

// function pdfGenerator(fileName) {
//   let fs = require('fs');
//   let pdf = require('html-pdf');
//   let html = fs.readFileSync(__dirname + '/(new)invoice.html', 'utf8')
//   let options = {format: 'Letter'};

  /*
   *   pdf.create(html, options).toFile('./pdf/test.pdf', function(err, res) {
   *     if (err) return console.log(err);
   *     console.log(res);  // { filename: '/app/businesscard.pdf' }
   *   });
   *  */

//   pdf.create(html).toBuffer(function(err, buffer) {
//     uploadFile(fileName, buffer)
//   });
// }

// function uploadFile(fileName, buffer) {
//   const bucket = admin.storage().bucket();
//   const file = bucket.file('pdf/' + fileName);
//   file.save(buffer, ((error) => {
//               if (error) {
//                 // return res.status(500).send('Unable to upload file.');
//                 console.log("Unable to upload file");
//               }
//               // return res.status(200).send('Uploaded');
//               console.log("file uploaded");
//               let pdfFile = "https://storage.googleapis.com/" + BUCKET_NAME +
//                   "/pdf/" + fileName;
//               // sendEmail(pdfFile);
//             }));
// }
//# sourceMappingURL=index.js.map