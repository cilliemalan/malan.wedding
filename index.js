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
// API
app.use('/api', api);

// static files
app.use(express.static('public'));

// webhooks
app.use('/webhooks', webhooks(ghsecret));

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


app.listen(port, () => winston.info(`Listening on port ${port}!`));
