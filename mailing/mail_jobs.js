const kue = require('kue');
const queue = kue.createQueue();
const mail = require('./mail_internal');

async function processEmail(job) {
    winston.debug('processing email job %j', job);
    const response = mail.sendEmail(job.from, job.to, job.subject, job.body, job.attachments);
    winston.debug('done processing email job with result %j', response);
    return response;
}

queue.process('email', 5, (job, done) => processEmail(job).then((r) => done(null, r), e => done(e)));


module.exports = {
    sendEmail: function (from, to, subject, body, attachments) {
        winston.verbose('enqueueing email from %s to %s, subject: %s', from, to, subject);

        const job = queue.create('email', { from, to, subject, body, attachments });
        job.attempts(3).backoff(true)
        job.save((err) => {
            if (err) {
                winston.error('failed to enqueue job: %s', err);
            }
        });

        job.on('failed attempt', () => winston.warn('email attempt failed for email from %s to %s, subject: %s', from, to, subject));
        job.on('failed', () => winston.warn('email failed for email from %s to %s, subject: %s', from, to, subject));

        return job.id;
    }
}