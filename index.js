// dependencies
const path = require('path');
const { execSync } = require('child_process');
const output = execSync('yarn');
console.log(output.toString());

// module requires
const express = require('express');
const winston = require('winston');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// local requires
const webhooks = require('./webhooks');
const api = require('./api');
const webpackconfig = require('./webpack.config');
const config = require('./config');

// set up logging
const mask = (a) => a ? a.replace(/./g, '*') : a;
winston.configure({
    transports: [new (winston.transports.Console)({ level: config.loglevel, colorize: true })]
});
winston.info('starting...');
winston.info(`loglevel: ${config.loglevel}`);
winston.info('port: %s', config.port);
winston.info('root: %s', config.root);
winston.info('environment: %s', config.environment);
winston.info('oauth issuer: %s', config.issuer);
winston.info('oauth issuer domain: %s', config.oAuthDomain);
winston.info('oauth audience: %s', config.audience);
winston.info('oauth client id: %s', config.clientId);
winston.info('oauth client secret: %s', mask(config.clientSecret));
winston.info('github hook secret: %s', mask(config.ghsecret));
winston.info('recaptcha key: %s', config.recaptchaKey);
winston.info('recaptcha secret: %s', mask(config.recaptchaSecret));
winston.info('GA tracking ID: %s', config.gaTrackingId);



// express app
const app = express();

// set up pipeline
// API
app.use('/api', api);

// static files
app.use(express.static('public'));

// webhooks
app.use('/webhooks', webhooks(config.ghsecret));

// webpack
const webpackCompiler = webpack(webpackconfig);
const wpmw = webpackMiddleware(webpackCompiler, {});
const wphmw = webpackHotMiddleware(webpackCompiler);
app.use(wpmw);
app.use(wphmw);

// SPA
app.use((req, res) => {
    const indexFile = `${webpackconfig.output.path}/index.html`;
    const index = webpackCompiler.outputFileSystem.readFileSync(indexFile);
    res.contentType('text/html');
    res.end(index);
});


app.listen(config.port, () => winston.info(`Listening on port ${config.port}!`));
