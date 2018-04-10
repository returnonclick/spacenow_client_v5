import { ListingShortDetail } from "./models/listing-short-detail"

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const serviceAccount = require("./service-account-v5.json");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
const moment = require('moment')
const path = require('path')
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
var spacenow = '"Spacenow" <noreply@spacenow-bca9c.firebaseapp.com>'



// });

/**
* New User - Welcome email
*/
exports.sendWelcomeEmail = functions.auth.user().onCreate((event) => {
    const userData = event.data;
    let subject = 'Welcome to Spacenow'
    var context = { userData }
    sendEmail('userNewWelcome.html', context, spacenow, userData.email, subject)
});
/**
* Creating listings-short-detail document
*/
exports.createNewListing = functions.firestore
    .document('listings/{id}')
    .onCreate(event => {
        const listing = event.data.data()
        return getUser(listing.ownerUid)
            .then(doc => {
                const hostData = doc.data()
                return getCategories(listing.categoryId)
                    .then((docCat) => {
                        const cateData = docCat.data()
                        updateShortDetailSpace(listing, cateData , hostData)
                    }).catch(error => { console.log(error) })
            }).catch(error => { console.log(error) })
    })

// /**
// * Listing Active email / Listing Approved email
// */
exports.activeListing = functions.firestore
    .document('listings/{id}')
    .onUpdate(event => {
        const listing = event.data.data()
        const listingPrevious = event.data.previous.data()

            return getCategories(listing.categoryId)
                .then((docCat) => {
                    const cateData = docCat.data()
                    return getUser(listing.ownerUid)
                        .then(doc => {
                            const hostData = doc.data()

                            updateShortDetailSpace(listing, cateData , hostData)

                            // switch (listing.status) {  
                            //     case 'pending':
                            //         var subject = 'Spacenow: Your space is now live.'
                            //         var context = { listing, hostData, cateData }
                            //         // MISSING THE SPACENOW ADMIN EMAIL
                            //         sendEmail('listingToApprove-table.html', context, spacenow, hostData.email, subject)
                            //     case 'active':
                            //         var subject = 'Spacenow: Your space is now live.'
                            //         var context = { listing, hostData, cateData } 
                            //         sendEmail('listingActive-table.html', context, spacenow, hostData.email, subject) 
                            // }    
                        }).catch(error => { console.log(error) })
                })
                .catch(error => {
                    console.error('There was an error while sending the email:', error)
                })
                .catch(error => { console.log(error) })
        }
    )
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
        const spaceId = booking.spaceBookings.spaceId
        // RETIRAR spaceID HARDCODE
        //************************************* */
        // const spaceId = 'QV18Xnq4nKkVqVOuSRwpb'
        //************************************* */
        if (booking.bookingStatus !== bookingPrevious.bookingStatus) {
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
                                            convertDate(booking.spaceBookings[0].bookingDates)
                                                .then(dates => {
                                                    let bookingDates = new Object([])
                                                    bookingDates = dates
                                                    let daysTot: number = booking.spaceBookings[0].bookingDates.length                              
                                                    var context = { booking, userData, listing, cateData, bookingDates, daysTot }
                                                    let subject = 'Your booking request has been approved.'
                                                    sendEmail('bookingConfirmation-table.html', context, spacenow, userData.email, subject)
                                                }).catch(error => console.error('There was an error while sending the email:', error))
                                        }).catch(error => console.error(error))
                                }).catch(error => console.error(error))

                        case 'Declined':
                            return getUser(booking.userId)
                                .then(doc => {
                                    const userData = doc.data()
                                    return getCategories(listing.categoryId)
                                        .then((docCat) => {
                                            const cateData = docCat.data()
                                            let subject = 'Unfortunately the host has declined your booking request.'
                                            var context = { booking, userData, listing, cateData }
                                            sendEmail('bookingCancellation-table.html', context, spacenow, userData.email, subject)
                                            let status = 'Canceled'
                                            updateBooking(booking, status)
                                        }).catch(error => console.error('There was an error while sending the email:', error))
                                }).catch(error => console.error(error))

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
                                                    pdfGenerator('Invoice_host.pdf',context).then(pdfFile => {
                                                    sendEmailInvoice('bookingHostConfirmation-table.html', context, spacenow, hostData.email, subject,booking.id+'_Invoice.pdf', pdfFile)
                                                }).catch(error => console.error(error))
                                                
                                                pdfGenerator("Invoice_guest.pdf",context).then(pdfFileGuest => {
                                                    sendEmailInvoice('bookingGuestConfirmation-table.html', context, spacenow, userData.email, guestSubject,booking.id+'Invoice_guest.pdf',pdfFileGuest)
                                                }).catch(error => console.error(error))

                                                let status = 'Completed'
                                                updateBooking(booking, status)
                                                }).catch(error => console.error('There was an error getCategories function', error))
                                        }).catch(error => console.error(error))
                                }).catch(error => console.error(error))
                    }
                })
                .catch(error => console.log(error))
        }
    })

/**
* Enquiry Request
*/
// exports.createEnquiryBooking = functions.firestore
//     .document('bookingRequests/{id}')
//     .onCreate(event => {
//         const enquiry = event.data.data()
//         return getUser(enquiry.userId)
//             .then(doc => {
//                 const guestData = doc.data()
//                 return getSpace(enquiry.spaceId)
//                 .then((docListing) => {
//                     const listing = docListing.data()
//                     return getUser(listing.ownerUid)
//                         .then(hostDoc => {
//                             const hostData = hostDoc.data() 
//                             return getCategories(listing.categoryId)
//                                 .then((docCat) => {
//                                     const cateData = docCat.data()
//                                     let subject = 'You have a new booking enquiry.'
//                                     var context = { listing, hostData, cateData, guestData }
//                                     sendEmail('enquiryRequest-table.html', context, spacenow, hostData.email, subject)
//                                 }).catch(error => { console.log(error) })
//                         }).catch(error => { console.log(error) })
//                 })
//             }).catch(error => { console.log(error) })
//     })


// maintenance function /listings-short-detail Document
function updateShortDetailSpace(listing, cateData, hostData) {
    let shortData = new ListingShortDetail
    
    shortData.id = listing.id
    shortData.title = listing.title
    shortData.countryName = listing.address.country
    shortData.currency = listing.currency
    shortData.fullAddress = listing.address.full_name
    shortData.priceUnit = listing.priceUnit
    shortData.price = listing.price.price
    shortData.category = cateData.name
    shortData.geopoint = listing.address
    shortData.images = listing.images
    shortData.ownerDisplayName = hostData.displayName
    shortData.categorySlug = cateData.slug || null
    shortData.status = listing.status
    shortData.capacity = listing.specifications.capacity || null
    const data = Object.assign({},shortData)

    admin.firestore().collection('listings-short-detail').doc(`${shortData.id}`).set(data)
}

function getSpace(id) {
    return admin.firestore().collection('listings').doc(`${id}`).get()
}

function getUser(id) {
    return admin.firestore().collection('users').doc(`${id}`).get()
}

function getCategories(id) {
    return admin.firestore().collection('categories').doc(`${id}`).get()
}

function updateBooking(booking, status) {
    let data = booking
    data.bookingStatus = status
    data.paymentStatus = status
    return admin.firestore().collection('bookings').doc(`${booking.id}`).set(data)
}

function sendEmail(template, context, from, email, subject) {  
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

function sendEmailInvoice(template, context, from, email, subject, fileName = null,filePath = null) {  
    templates.render(`${template}`, context, function (err, html) {
    return mailTransport.sendMail({
            from: from,
            to: email,
            html: html,
            subject: subject,
            attachments: [
                {filename: fileName, path: filePath, contentType: 'application/pdf'}
              ],
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


function pdfGenerator(fileName , context): Promise<any> {
    return new Promise(resolve => {
        let fs = require('fs');
        let pdf = require('html-pdf');
        // let pathName = path.join(__dirname,'/(new)Invoice.html')
        // let html = fs.readFileSync(pathName, 'utf8')
        let options = {
            format: 'A4',
            border: { top: "0.5cm", right: "0.5cm", bottom: "0.5cm", left: "0.5cm" },
            type: 'pdf',
            timeout: 600000, 
            // phantomPath: "./node_modules/phantomjs-prebuilt/bin/phantomjs",
            renderDelay: 1000,
        };
  
         templates.render('(new)Invoice.html', context, function(err, html) {
             console.log('html = ',html)
                  
            // pdf.create(html, options).toFile('./lib/pdf/test.pdf', function(err, res) {
            //  if (err) return console.log(err);
            //   console.log(res);  // { filename: '/app/businesscard.pdf' }
            // });
         
             pdf.create(html , options).toBuffer(function(err, buffer) {
                // console.log('This is a buffer:', Buffer.isBuffer(buffer))
                // console.log('Buffer = ', buffer)
                // console.log('error = ',err) ;
               if (!err) {
                   uploadFile(fileName, buffer).then(pdfFile => { 
                       console.log('pdfFile = ',pdfFile); resolve(pdfFile)
                    }).catch(error => console.error(error));
               }
             })
         })
      
    })
}

function uploadFile(fileName, buffer): Promise<string> { 
    return new Promise(resolve => {
        // const bucket = admin.storage().bucket();
        // const file = bucket.file('/pdf/' + fileName);
        // file.save(buffer, ((error) => {

        var bucket = gcs.bucket('gs://spacenow-bca9c.appspot.com');
        const gcsname = '/pdf/'+fileName
        const file = bucket.file(gcsname)
        var buff = Buffer.from(buffer)

        const stream = file.createWriteStream({
            metadata: {
                contentType: 'application/pdf'
            }
        });

        file.save(buffer, ((error) => {console.log(error)}))

        stream.on('error', (err) => {
            console.log(err);
            resolve(err)
        });
        stream.on('finish', () => {
            console.log(gcsname);
            let pdfFile = "https://storage.googleapis.com/" + BUCKET_NAME +
            "/pdf/" + fileName;
            resolve(pdfFile)
        });
        stream.end(new Buffer(buff));


            // bucket.upload('/pdf/'+buffer, function(err, file) {
            //     // bucket.upload('/pdf/'+fileName, function(err, file) {
            //     if (!err) {
            //         console.log("file uploaded");
            //         let pdfFile = "https://storage.googleapis.com/" + BUCKET_NAME +
            //             "/pdf/" + fileName;
            //           resolve(pdfFile)
            //     } console.log("Unable to upload file",err);
            // })    
            // console.log('error = ',error)
            //         if (error) {
            //           // return res.status(500).send('Unable to upload file.');
            //           console.log("Unable to upload file",error);
            //           resolve(error)
            //         } else {
            //             console.log("file uploaded");
                        // let pdfFile = "https://storage.googleapis.com/" + BUCKET_NAME +
                        //     "/pdf/" + fileName;
                        //   resolve(pdfFile)
            //               // return res.status(200).send('Uploaded');
                //     }
                //   }));
    })
}

//# sourceMappingURL=index.js.map