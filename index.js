// dependencies
const path = require('path');
const fs = require('fs');
const { execSync, exec } = require('child_process');
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
winston.verbose(`loglevel: ${config.loglevel}`);
winston.verbose('port: %s', config.port);
winston.verbose('root: %s', config.root);
winston.verbose('environment: %s', config.environment);
winston.verbose('oauth issuer: %s', config.issuer);
winston.verbose('oauth issuer domain: %s', config.oAuthDomain);
winston.verbose('oauth audience: %s', config.audience);
winston.verbose('oauth client id: %s', config.clientId);
winston.verbose('oauth client secret: %s', mask(config.clientSecret));
winston.verbose('github hook secret: %s', mask(config.ghsecret));
winston.verbose('recaptcha key: %s', config.recaptchaKey);
winston.verbose('recaptcha secret: %s', mask(config.recaptchaSecret));
winston.verbose('GA tracking ID: %s', config.gaTrackingId);



// express app
const app = express();

// set up pipeline
// API
app.use('/api', api);

// webhooks
app.use('/webhooks', webhooks(config.ghsecret));

if(!config.production) {
    // webpack
    const webpackCompiler = webpack(webpackconfig);
    const wpmw = webpackMiddleware(webpackCompiler, {});
    const wphmw = webpackHotMiddleware(webpackCompiler);
    app.use(wpmw);
    app.use(wphmw);
        
    // static files
    app.use(express.static('public'));
        
    // SPA
    app.use((req, res) => {
        const indexFile = `${webpackconfig.output.path}/index.html`;
        const index = webpackCompiler.outputFileSystem.readFileSync(indexFile);
        res.contentType('text/html');
        res.end(index);
    });
} else {
    // kick off manual webpack compile
    winston.info('Running webpack...');
    exec(path.join(__dirname, 'node_modules/.bin/webpack'), (e,stdout,stderr) => {
        if(e) {
            winston.error('Webpack error');
            if(stdout) winston.error(stdout);
            if(stderr) winston.error(stderr);
        } else {
            winston.info('Webpack done');
            if(stdout) winston.info(stdout);
            if(stderr) winston.error(stderr);
        }
    });
        
    // static files
    app.use(express.static('public'));

    // SPA
    app.use((req, res) => {
        const indexFile = path.resolve(__dirname, 'public/index.html');

        fs.readFile(indexFile, (e, data) => {
            if(e) {
                winston.error('error reading %s: %s', indexFile, e);
                res.status(500).end();
            } else {
                res.contentType('text/html');
                res.end(data);
            }
        });
    });
}

app.listen(config.port, () => winston.info(`Listening on port ${config.port}!`));
