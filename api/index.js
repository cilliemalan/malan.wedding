const winston = require('winston');
const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const fs = require('fs');
const config = require('../config');

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

api.post('/contact', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    if (typeof name === 'string' &&
        typeof email === 'string' &&
        name && email &&
        name.length > 3 && name.length < 100 &&
        email.length > 3 && email.length < 100) {
        fs.appendFile(config.listFile, `${name.replace(/,/g, ';')},${email.replace(/,/g, ';')}\n`);
    } else {
        res.status(400);
    }
    res.end();
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