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
    try {
        const r = next();
        winston.verbose('API %s request for %s by %j -> %s', req.method, req.url, (req.user && req.user.sub) || 'anonymous', res.statusCode);
        return r;
    } catch (e) {
        winston.error('Exception during request: %j', e);
        throw e;
    }
});

api.use(jwtCheck);

api.get('/', (req, res) => res.json({ status: 'ok' }));






api.use((err, req, res, next) => {
    if(err.name == "UnauthorizedError") {
        res.status(403).end();
    } else {
        winston.warn('request error for %s request for %s by %j -> %j', req.method, req.url, (req.user && req.user.sub) || 'anonymous', err);
        res.status(500).end();
    }
})
module.exports = api;