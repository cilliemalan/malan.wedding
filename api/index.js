const winston = require('winston');
const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtIssuer = process.env.JWT_ISSUER || "https://retro.eu.auth0.com/";
const jwtAudience = process.env.JWT_AUDIENCE || 'https://malan.wedding/api';

const api = express.Router();

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${jwtIssuer}.well-known/jwks.json`
    }),
    credentialsRequired: true,
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

api.get('/', (req, res) => res.json({ status: 'ok' }));






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