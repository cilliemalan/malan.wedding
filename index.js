// dependencies
const path = require('path');
const { execSync } = require('child_process');
const output = execSync('yarn');
console.log(output.toString());


// module requires
const express = require('express');
const winston = require('winston');

// local requires
const webhooks = require('./webhooks');
const api = require('./api');

// env
const port = process.env.PORT || 3000;
const ghsecret = process.env.GITHUB_HOOK_SECRET;
const loglevel = process.env.LOGLEVEL || 'verbose';

// set up logging
winston.configure({
    transports: [new (winston.transports.Console)({ level: loglevel, colorize: true })]
});
winston.info('starting...');
winston.info(`loglevel: ${loglevel}`);
winston.info('port: %s', port);
winston.info('github hook secret: %s', !!ghsecret);


// express app
const app = express();


// set up pipeline
app.use('/api', api);
app.use(express.static('public'));
app.use('/webhooks', webhooks(ghsecret));
app.listen(port, () => winston.info(`Listening on port ${port}!`));
