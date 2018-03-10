const winston = require('winston');
const util = require('util');
const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const fs = require('fs');
const config = require('../config');
const reCAPTCHA = require('recaptcha2');

const recaptcha = new reCAPTCHA({
    siteKey: config.recaptchaKey,
    secretKey: config.recaptchaSecret
});

const jwtIssuer = process.env.JWT_ISSUER || "https://malan-wedding.eu.auth0.com/";
const jwtAudience = process.env.JWT_AUDIENCE || 'https://malan.wedding/api';

const api = express.Router();

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${jwtIssuer}.well-known/jwks.json`
    }),
    credentialsRequired: false,
    audience: jwtAudience,
    issuer: jwtIssuer,
    algorithms: ['RS256']
});



api.use((req, res, next) => {
    res.on('finish', () => {
        winston.verbose('API %s request for %s by %j -> %s', req.method, req.url, (req.user && req.user.sub) || 'anonymous', res.statusCode);
    });
    next();
});

api.use(jwtCheck);
api.use(express.urlencoded());
api.use(express.json());

api.get('/', (req, res) => res.json({ status: 'ok' }));

api.post('/rsvp', (req, res) => {

    const { body } = req;
    if (body) {
        // I hope whoever made me do this loses his keys while he's at the gym.
        Object.keys(body)
            .filter(k => util.isArray(body[k]))
            .forEach(k => body[k] = body[k].join(','));
    }

    const { name, email, num, coming, rsvp } = body || {};
    if (!name || !email || !num) {
        res.redirect('/#error');
    } else {
        const unquote = (a) => a.replace(/"/g, '');
        const escape = (a) => a && ((a.indexOf(',') >= 0) ? `"${unquote(a)}"` : unquote(a));
        fs.appendFile(config.rsvpFile, [rsvp, name, email, num, coming].map(escape).join(',') + "\n", e => {
            if (e) {
                res.redirect('/#error');
            } else {
                if (rsvp == "yes") {
                    res.redirect('/#thanks');
                } else {
                    res.redirect('/#sorry');
                }
            }
        });
    }
});

api.post('/contact', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const token = req.body.token;
    if (typeof name === 'string' &&
        typeof email === 'string' &&
        typeof token === 'string' &&
        name && email && token &&
        name.length > 3 && name.length < 100 &&
        email.length > 3 && email.length < 100 &&
        token.length > 100 && token.length < 1000) {

        recaptcha.validate(token).then(() => {
            fs.appendFile(config.listFile, `${name.replace(/,/g, ';')},${email.replace(/,/g, ';')}\n`, e => {
                if (e) {
                    res.status(500).end();
                } else {
                    res.end();
                }
            });
        }, () => {
            res.status(400).end();
        });

    } else {
        res.status(400).end();
    }
});




api.use((err, req, res, next) => {
    if (err.name == "UnauthorizedError") {
        winston.verbose('received auth error %j', err);
        res.status(403).json({ error: 'authorization', message: err.message, code: err.code });
    } else {
        winston.warn('request error for %s request for %s by %j -> %j', req.method, req.url, (req.user && req.user.sub) || 'anonymous', err);
        res.status(500).json({ error: 'server', message: 'An internal server error occurred.' });
    }
})
module.exports = api;