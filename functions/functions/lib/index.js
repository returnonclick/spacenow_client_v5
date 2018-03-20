"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return templates.render('userNewWelcome2.html', user, function (err, html, text, subject) {
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
//# sourceMappingURL=index.js.map