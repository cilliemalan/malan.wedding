const nodemailer = require('nodemailer');
const winston = require('winston');


const smtpHost = process.env.SMTP_HOST | '127.0.0.1';
const smtpPort = process.env.SMTP_PORT || 25;
const smtpSecure = !!process.env.SMTP_SECURE;
const smtpUsername = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;


const mailClient = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure, // true for 465, false for other ports
    auth: {
        user: smtpUsername, // generated ethereal user
        pass: smtpPassword  // generated ethereal password
    }
});

module.exports = {
    sendEmail: async function (from, to, subject, body, attachments) {
        winston.verbose('processing email from %s to %s, subject: %s', from, to, subject);

        const mailOptions = {
            from, to, subject, html: body, attachments
        };

        try {
            const info = await mailClient.sendMail(mailOptions);
            winston.debug('mail sent, response: %j', info)
        } catch (e) {
            winston.error('failed to send email from %s to %s, subject: %s: %s', from, to, subject, e);
            throw e;
        }

        return info;
    }
}