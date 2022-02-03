import { useDispatch } from 'react-redux';
//import { receiveBusyDates } from '../redux/api/api';

var rs = require('jsrsasign');

let gapi = window.gapi
let CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
let API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
let DISCOVERY_DOCS = process.env.DISCOVERY_DOCS
let SCOPES = "https://www.googleapis.com/auth/calendar"
let SERVICE_ACCOUNT = process.env.REACT_APP_SERVICE_ACCOUNT
let SERVICE_ACCOUNT_ID = "la-refineria"
let SERVICE_ACCOUNT_KEY = process.env.REACT_APP_SERVICE_ACCOUNT_KEY
let SERVICE_ACCOUNT_PRIVATE_KEY = process.env.REACT_APP_SERVICE_ACCOUNT_PRIVATE_KEY
let SERVICE_ACCOUNT_CLIENT_CERT_URL = process.env.REACT_APP_SERVICE_ACCOUNT_CLIENT_CERT_URL
let PROJECT_ID = process.env.REACT_APP_PROJECT_ID
let CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID

const TOKEN_DURATION_IN_SECONDS = 3600;

function postJWT(jwt, callback) {
    let response = null
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200 && callback) {
                callback(this.responseText);
                return
            }
            if (console) console.log(this.responseText);
        }
    };
    var parameters = "grant_type=" + encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer") + "&assertion=" + encodeURIComponent(jwt);
    xhttp.open("POST", "https://www.googleapis.com/oauth2/v4/token", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);
}

function getCert() {
    var cert = //your json key (downloaded earlier) goes here
    {
        "type": "service_account",
        "project_id": PROJECT_ID,
        "private_key_id": SERVICE_ACCOUNT_PRIVATE_KEY,
        "private_key": SERVICE_ACCOUNT_KEY,
        "client_email": SERVICE_ACCOUNT,
        "client_id": SERVICE_ACCOUNT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": SERVICE_ACCOUNT_CLIENT_CERT_URL
    };
    return cert;
}
function getJWT() {
    var cert = getCert();
    var key = rs.KEYUTIL.getKey(cert.private_key);
    var headers = { "alg": "RS256", "typ": "JWT" };
    var issued = Math.floor(new Date().getTime() / 1000);

    var claims = {
        "iss": cert.client_email,
        "scope": "https://www.googleapis.com/auth/prediction https://www.googleapis.com/auth/calendar",
        "aud": "https://www.googleapis.com/oauth2/v4/token",
        "exp": issued + 3600,
        "iat": issued
    };

    var jwt = rs.KJUR.jws.JWS.sign(headers.alg, headers, JSON.stringify(claims), key);
    return jwt;
}


export default { getJWT, postJWT }