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


api.use(jwtCheck);

api.use((req, res, next) => {
    try {
        next();
        winston.verbose('API %s request for %s by %j -> ', req.method, req.url, (req.user && req.user.sub) || 'anonymous', res.statusCode);
    } catch (e) {
        winston.error('Exception during request: %j', e);
        throw e;
    }
});

api.get('/', (req, res) => res.json({ status: 'ok' }));

module.exports = api;