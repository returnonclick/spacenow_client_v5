// import * as functions from 'firebase-functions'
// import * as firebase from 'firebase'
import * as nodemailer from 'nodemailer'
// import * as admin from 'firebase-admin'
import { text } from 'body-parser';
import { user } from 'firebase-functions/lib/providers/auth';

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
admin.initializeApp(functions.config().firebase);
var EmailTemplate = require('swig-email-templates');
// create template renderer
var templates = new EmailTemplate({
    root: './src/templates/'
});
/**
* New User - Welcome email
*/
exports.sendWelcomeEmail = functions.auth.user().onCreate((event) => {
    const user = event.data;
    const email = user.email;
    const displayName = user.displayName;
    return templates.render('userNewWelcome.html', user, function (err, html, text, subject) {
        //send email
        return mailTransport.sendMail({
            from: '"Spacenow" <noreply@spacenow-bca9c.firebaseapp.com>',
            to: email,
            html: html,
            subject: 'Welcome to Spacenow'
        }).then(() => {
            console.log('New welcome email sent to:', email);
        }).catch(error => {
            console.error('There was an error while sending the email:', error);
        });
    });
});
/**
* Listing Approved email
*/
exports.createNewListing = functions.firestore
    .document('listings-Gui/{id}')
    .onCreate(event => {
        const listing = event.data.data()
        var email
        const uid = listing.userId
        const userDocRef = admin.firestore().collection('users').doc(`${uid}`)
        userDocRef.get()
            .then(doc => {
                let userData = doc.data()
                email = userData.email
                var displayName = userData.displayName
                var context = {listing,displayName}
                templates.render('listingToApprove.html', context, function (err, html, text, subject) {
                    //send email
                    return mailTransport.sendMail({
                        from: '"Spacenow" <noreply@spacenow-bca9c.firebaseapp.com>',
                        to: email,
                        html: html,
                        subject: 'Spacenow: New space waiting to be approved'
                    }).then(() => {
                        console.log('New space waiting to be approved, send to:', email);
                    }).catch(error => {
                        console.error('There was an error while sending the email:', error);
                    });
                })
            })
            .catch(error => {
                console.log(error)
            })
    })

/**
* Listing Active email
*/
exports.activeListing = functions.firestore
    .document('listings-Gui/{id}')
    .onUpdate(event => {
        var email
        var displayName
        const listing = event.data.data()
        const listingPrevious = event.data.previous.data()
        if (listing.isApproved !== listingPrevious.isApproved) {
            const uid = listing.userId
            const userDocRef = admin.firestore().collection('users').doc(`${uid}`)
            userDocRef.get()
                .then(doc => {
                    let userData = doc.data()
                    email = userData.email
                    displayName = userData.displayName
                    var context = {listing,displayName}
                    templates.render('listingActive.html', context, function (err, html, text, subject) {
                        //send email
                        return mailTransport.sendMail({
                            from: '"Spacenow" <noreply@spacenow-bca9c.firebaseapp.com>',
                            to: email,
                            html: html,
                            subject: 'Spacenow: Your space is now live.'
                        }).then(() => {
                            console.log('New space was approved, send to:', email);
                        }).catch(error => {
                            console.error('There was an error while sending the email:', error);
                        });
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    })
// /**
// * Booking Request email
// */
exports.requestBooking = functions.firestore
    .document('bookings-Gui/{id}')
    .onCreate(event => {
        const booking = event.data.data()
        var email
        var displayName
        const spaceId = booking.spaceBookings.spaceId
        const listingsDocRef = admin.firestore().collection('listings-Gui').doc(`${spaceId}`)
        listingsDocRef.get()
            .then(doc => {
                var listing = doc.data()
                let ownerId = listing.userId
                const userDocRef = admin.firestore().collection('users').doc(`${ownerId}`)
                userDocRef.get()
                    .then(doc => {
                        let userData = doc.data()
                        email = userData.email
                        displayName = userData.displayName
                        var context = {booking,displayName,listing}
                        templates.render('bookingRequest.html', context, function (err, html, text, subject) {
                            //send email
                            return mailTransport.sendMail({
                                from: '"Spacenow" <noreply@spacenow-bca9c.firebaseapp.com>',
                                to: email,
                                html: html,
                                subject: 'You have a new booking request.'
                            }).then(() => {
                                console.log('New booking requesting to be approved, send to:', email);
                            }).catch(error => {
                                console.error('There was an error while sending the email:', error);
                            });
                        })
                    })
            })
            .catch(error => {
                console.log(error)
            })
    })
// /**
// * Booking Payment Request email // Booking Cancellation Request email //  Booking Confirmation Request email // Host Confirmation
// */
exports.actionsBooking = functions.firestore
    .document('bookings-Gui/{id}')
    .onUpdate(event => {
        const booking = event.data.data()
        const spaceId = booking.spaceBookings.spaceId
        const uid = booking.userId
        const bookingPrevious = event.data.previous.data()
        if (booking.bookingStatus !== bookingPrevious.bookingStatus) {
            if (booking.bookingStatus === 'Approved') {
                var email
                var displayName
                const listingsDocRef = admin.firestore().collection('listings-Gui').doc(`${spaceId}`)
                listingsDocRef.get()
                    .then(doc => {
                        let listing = doc.data()
                        const userDocRef = admin.firestore().collection('users').doc(`${uid}`)
                        userDocRef.get()
                            .then(doc => {
                                let userData = doc.data()
                                email = userData.email
                                displayName = userData.displayName
                                var context = {booking, displayName, listing}
                                templates.render('bookingPaymentRequest.html', context, function (err, html, text, subject) {
                                    //send email
                                    return mailTransport.sendMail({
                                        from: '"Spacenow" <noreply@spacenow-bca9c.firebaseapp.com>',
                                        to: email,
                                        html: html,
                                        subject: 'Your booking request has been approved.'
                                    }).then(() => {
                                        console.log('Booking request was approved, send to:', email);
                                    }).catch(error => {
                                        console.error('There was an error while sending the email:', error);
                                    });
                                })
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
            if (booking.bookingStatus === 'Declined') {
                var email
                var displayName
                const listingsDocRef = admin.firestore().collection('listings-Gui').doc(`${spaceId}`)
                listingsDocRef.get()
                    .then(doc => {
                        let listing = doc.data()
                        const userDocRef = admin.firestore().collection('users').doc(`${uid}`)
                        userDocRef.get()
                            .then(doc => {
                                let userData = doc.data()
                                email = userData.email
                                displayName = userData.displayName
                                var context = {booking,displayName,listing}
                                templates.render('bookingCancelation.html', context, function (err, html, text, subject) {
                                    //send email
                                    return mailTransport.sendMail({
                                        from: '"Spacenow" <noreply@spacenow-bca9c.firebaseapp.com>',
                                        to: email,
                                        html: html,
                                        subject: 'Unfortunately the host has declined your booking request.'
                                    }).then(() => {
                                        console.log('Booking request was declined, send to:', email);
                                    }).catch(error => {
                                        console.error('There was an error while sending the email:', error);
                                    });
                                })
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
            if (booking.bookingStatus === 'Confirmed') {
                var email
                var hostEmail
                var hostDisplayName
                var displayName
                const listingsDocRef = admin.firestore().collection('listings-Gui').doc(`${spaceId}`)
                listingsDocRef.get()
                    .then(doc => {
                        let listing = doc.data()
                        let ownerId = listing.userId
                        const userDocRef = admin.firestore().collection('users').doc(`${uid}`)
                        userDocRef.get()
                            .then(doc => {
                                let userData = doc.data()
                                email = userData.email
                                displayName = userData.displayName
                                //
                                const ownerDocRef = admin.firestore().collection('users').doc(`${ownerId}`)
                                ownerDocRef.get()
                                    .then(doc => {
                                        let userData = doc.data()
                                        hostEmail = userData.email
                                        hostDisplayName = userData.displayName
                                        var context = {booking,hostDisplayName,listing}
                                        templates.render('bookingHostConfirmation.html', context, function (err, html, text, subject) {
                                            //send email
                                            return mailTransport.sendMail({
                                                from: '"Spacenow" <noreply@spacenow-bca9c.firebaseapp.com>',
                                                to: hostEmail,
                                                html: html,
                                                subject: 'Your space has been booked and you have a new guest coming for the below space.'
                                            }).then(() => {
                                                console.log('Your space has beed booked, send to:', hostEmail);
                                            }).catch(error => {
                                                console.error('There was an error while sending the email:', error);
                                            });
                                        })
                                    })
                                //
                                var context = {booking,displayName,listing,hostDisplayName,hostEmail}
                                templates.render('bookingConfirmation.html', context, function (err, html, text, subject) {
                                    //send email
                                    return mailTransport.sendMail({
                                        from: '"Spacenow" <noreply@spacenow-bca9c.firebaseapp.com>',
                                        to: email,
                                        html: html,
                                        subject: 'Congratulations your booking has been confirmed for the below space.'
                                    }).then(() => {
                                        console.log('Booking has beed confirmed, send to:', email);
                                    }).catch(error => {
                                        console.error('There was an error while sending the email:', error);
                                    });
                                })
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    })
//# sourceMappingURL=index.js.map
