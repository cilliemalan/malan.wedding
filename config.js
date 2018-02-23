const port = process.env.PORT || 3000;
const root = process.env.URL || "http://localhost:3000/";
const ghsecret = process.env.GITHUB_HOOK_SECRET;
const loglevel = process.env.LOGLEVEL || 'verbose';

const issuer = process.env.JWT_ISSUER || "https://malan-wedding.eu.auth0.com/";
const audience = process.env.JWT_AUDIENCE || 'https://malan.wedding/api';
const oAuthDomain = issuer.match(/^https:\/\/(.+)\//)[1];

const clientId = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;

const recaptchaKey = process.env.RECAPTCHA_KEY;
const recaptchaSecret = process.env.RECAPTCH_SECRET;

const environment = process.env.NODE_ENV || 'development';
const production = environment == 'production';


const gaTrackingId = process.env.GA_TRACKING_ID || 'UA-114404288-1';

module.exports = {
    environment,
    production,
    port,
    root,
    ghsecret,
    loglevel,
    issuer,
    audience,
    clientId,
    clientSecret,
    oAuthDomain,
    recaptchaKey,
    recaptchaSecret,
    gaTrackingId
}