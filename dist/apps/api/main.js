/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/authentication/authenticationRoutes.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.authenticationRoutes = void 0;
const loginController_1 = __webpack_require__("./apps/api/src/app/authentication/login/loginController.ts");
const callbackController_1 = __webpack_require__("./apps/api/src/app/authentication/callback/callbackController.ts");
function authenticationRoutes(app) {
    app.get("/login", loginController_1.loginController);
    app.get("/callback", callbackController_1.callbackController);
}
exports.authenticationRoutes = authenticationRoutes;


/***/ }),

/***/ "./apps/api/src/app/authentication/callback/callbackController.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.callbackController = void 0;
const tslib_1 = __webpack_require__("tslib");
const querystring_1 = __webpack_require__("querystring");
const axios_1 = __webpack_require__("axios");
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
function callbackController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { clientId, redirectUri, stateKey, clientSecret, verifierKey } = environment_1.environment;
        // your application requests refresh and access tokens
        // after checking the state parameter
        const code = req.query.code || null;
        const state = req.query.state || null;
        const storedState = req.cookies ? req.cookies[stateKey] : null;
        const storedVerifier = req.cookies ? req.cookies[verifierKey] : null;
        if (state === null || state !== storedState) {
            res.redirect(`/#${(0, querystring_1.stringify)({ error: "state_mismatch" })}`);
        }
        else {
            res.clearCookie(stateKey);
            res.clearCookie(verifierKey);
            const authOptions = {
                method: "POST",
                url: "https://accounts.spotify.com/api/token",
                params: {
                    client_id: clientId,
                    code,
                    grant_type: "authorization_code",
                    redirect_uri: redirectUri,
                    code_verifier: storedVerifier,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
                },
                json: true,
            };
            (0, axios_1.default)(authOptions)
                .then((response) => {
                const { data } = response;
                res.redirect(`${process.env.FRONTEND_URL}/dashboard?${(0, querystring_1.stringify)(data)}`);
            })
                .catch(console.log);
        }
    });
}
exports.callbackController = callbackController;


/***/ }),

/***/ "./apps/api/src/app/authentication/login/loginController.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loginController = void 0;
const tslib_1 = __webpack_require__("tslib");
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
const pkce_challenge_1 = __webpack_require__("pkce-challenge");
const querystring_1 = __webpack_require__("querystring");
const core_1 = __webpack_require__("./libs/core/src/index.ts");
function loginController(req, res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { clientId, redirectUri, stateKey, challengeKey, verifierKey } = environment_1.environment;
        const { code_challenge: challenge, code_verifier: verifier } = (0, pkce_challenge_1.default)();
        const state = (0, core_1.generateRandomString)(16);
        res.cookie(challengeKey, challenge);
        res.cookie(verifierKey, verifier);
        res.cookie(stateKey, state);
        // your application requests authorization
        const scope = "user-read-private user-read-email user-top-read user-read-recently-played user-modify-playback-state user-read-playback-state user-read-currently-playing app-remote-control streaming user-library-modify user-library-read";
        const uri = `https://accounts.spotify.com/authorize?${(0, querystring_1.stringify)({
            response_type: "code",
            client_id: clientId,
            redirect_uri: redirectUri,
            code_challenge_method: "S256",
            code_challenge: challenge,
            state,
            scope,
        })}`;
        return res.json({ uri });
    });
}
exports.loginController = loginController;


/***/ }),

/***/ "./apps/api/src/app/routes.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerRoutes = void 0;
const authenticationRoutes_1 = __webpack_require__("./apps/api/src/app/authentication/authenticationRoutes.ts");
const routes = {
    authenticationRoutes: authenticationRoutes_1.authenticationRoutes,
};
function registerRoutes(app) {
    Object.values(routes).map((endpoint) => endpoint(app));
    return app;
}
exports.registerRoutes = registerRoutes;


/***/ }),

/***/ "./apps/api/src/environments/environment.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
exports.environment = {
    production: false,
    redirectUri: `${process.env.BACKEND_URL}/callback`,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    stateKey: "spotify_auth_state",
    challengeKey: "spotify_auth_challenge",
    verifierKey: "spotify_auth_verifier",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
};


/***/ }),

/***/ "./libs/core/src/colourUtils/hslToHex.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hslToHex = void 0;
/**
 * Generates a hex colour given the hsl values
 * @param  {number} h The hue
 * @param  {number} s The saturation
 * @param  {number} l The lightness
 * @return {string} The hex colour
 */
function hslToHex(h, s, l) {
    h = (h % 361) / 360;
    s = (s % 256) / 255;
    l = (l % 256) / 255;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        const hue2rgb = (p, q, t) => {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = (x) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
exports.hslToHex = hslToHex;


/***/ }),

/***/ "./libs/core/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/core/src/primitiveUtils/stringUtils.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/core/src/colourUtils/hslToHex.ts"), exports);


/***/ }),

/***/ "./libs/core/src/primitiveUtils/stringUtils.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateRandomString = void 0;
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
exports.generateRandomString = generateRandomString;


/***/ }),

/***/ "axios":
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "cookie-parser":
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "pkce-challenge":
/***/ ((module) => {

module.exports = require("pkce-challenge");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "querystring":
/***/ ((module) => {

module.exports = require("querystring");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const express = __webpack_require__("express");
const cors = __webpack_require__("cors");
const cookieParser = __webpack_require__("cookie-parser");
const routes_1 = __webpack_require__("./apps/api/src/app/routes.ts");
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
const app = express();
app
    .use(express.static(`${__dirname}/public`))
    .use(cors({ credentials: true, origin: environment_1.environment.frontendUrl }))
    .use(cookieParser())
    .use(express.json());
app.get("/api", (req, res) => {
    res.send("hello world");
});
(0, routes_1.registerRoutes)(app);
const port = process.env.port || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
server.on("error", console.error);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map