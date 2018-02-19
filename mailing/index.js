
const mail = require('./mail_jobs');


module.exports = {
    sendEmail: function(from, to, subject, body, attachments) {
        mail.sendEmail(from, to, subject, body, attachments);
    }
}
