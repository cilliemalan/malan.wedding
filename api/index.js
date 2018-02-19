const winston = require('winston');
const express = require('express');


const api = express.Router();

api.use((req, res, next) => {
    try {
        next();
        winston.verbose('API %s request for %s by %s -> ', req.method, req.url, req.user || '(anonymous)', res.statusCode);
    } catch (e) {
        winston.error('Exception during request: %j', e);
        throw e;
    }
});

api.get('/', (req, res) => res.json({ status: 'ok' }));

module.exports = api;