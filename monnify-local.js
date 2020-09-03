const fetch = require("node-fetch");
const B64 = require("@hapi/b64");


const API_HOST = "https://api.monnify.com/api/v1";
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;

const CURRENCY_NGN = "NGN";
const DEFAULT_SPLIT_PERCENTAGE = "99.215";

function getBasicAuth() {
    return "Basic " + B64.base64urlEncode(`${MON_API_KEY}:${MON_API_SEC}`);
}

console.log(getBasicAuth());

function getBasicAuth() {
    return "Basic " + B64.base64urlEncode(`${MON_API_KEY}:${MON_API_SEC}`);
}

function request(endpoint, config) {
    return fetch(API_HOST + endpoint, config);
}

async function getAccessToken() {
    const token = process.env.ACCESS_TOKEN_KEY;

    if (token) {
        return token;
    }

    return await login();
}

async function getAuthorizationHeader(isBasic) {
    if (isBasic) {
        return getBasicAuth();
    }

    const token = await getAccessToken();
    return `Bearer ${token}`;
}

async function getRequestConfig(method, body, isBasic) {
    const authorization = await getAuthorizationHeader(isBasic);

    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
        },
    };

    if (body) {
        config["body"] = JSON.stringify(body);
    }

    return config;
}

async function login() {
    const config = {
        method: "POST",
        headers: {
            Authorization: getBasicAuth(),
        },
    };

    try {
        const response = await request("/auth/login", config);
        const data = await response.json();

        if (response.status === 200) {
            const {
                accessToken,
                expiresIn
            } = data.responseBody;
            process.env.ACCESS_TOKEN_KEY = accessToken;
            // redis.expire(ACCESS_TOKEN_KEY, expiresIn);
            return accessToken;
        }
    } catch (e) {
        console.error(e);
    }

    return null;
}

// login()
//   .then((e) => console.log(e))
//   .catch((e) => console.log(err.message));

let basicAuth = getBasicAuth();

console.log(basicAuth, process.env.ACCESS_TOKEN_KEY);
