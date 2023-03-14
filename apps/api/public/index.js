"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_body_parser = require("body-parser");
var import_express = __toESM(require("express"));
var import_morgan = __toESM(require("morgan"));
var import_cors = __toESM(require("cors"));

// src/environments/environment.ts
var environment = {
  production: process.env.NODE_ENV === "production",
  redirectUri: `${process.env.BACKEND_URL}/callback`,
  clientId: process.env.SPOTIFY_CLIENT_ID || "",
  port: process.env.BACKEND_PORT || "",
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
  spotifyAccountUrl: process.env.SPOTIFY_ACCOUNT_URL || "",
  stateKey: "spotify_auth_state",
  challengeKey: "spotify_auth_challenge",
  verifierKey: "spotify_auth_verifier",
  frontendUrl: process.env.FRONTEND_URL || ""
};

// src/server.ts
var import_cookie_parser = __toESM(require("cookie-parser"));
var createServer = () => {
  const app = (0, import_express.default)();
  app.disable("x-powered-by").use((0, import_morgan.default)("dev")).use((0, import_body_parser.urlencoded)({ extended: true })).use((0, import_body_parser.json)()).use(import_express.default.static(`${__dirname}/public`)).use((0, import_cors.default)({ credentials: true, origin: environment.frontendUrl })).use((0, import_cookie_parser.default)()).get("/", (req, res) => {
    return res.json({ message: `api running` });
  }).get("/healthz", (req, res) => {
    return res.json({ ok: true });
  });
  return app;
};

// src/app/authentication/login/loginController.ts
var import_querystring = require("querystring");

// ../../packages/core/src/primitiveUtils/stringUtils.ts
function generateRandomString(length) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// ../../packages/core/src/web/apiClient.ts
var import_axios = __toESM(require("axios"));

// ../../packages/core/src/environments/environment.ts
var environment2 = {
  production: process.env.NODE_ENV === "production",
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL,
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || process.env.FRONTEND_URL
};

// ../../packages/core/src/web/apiClient.ts
var apiClient = import_axios.default.create({
  baseURL: environment2.backendUrl,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": environment2.frontendUrl
  }
});

// src/app/authentication/login/loginController.ts
function LoginController({
  spotifyAccountUrl
}) {
  return async function loginController2(req, res) {
    const { clientId, redirectUri, stateKey, challengeKey, verifierKey } = environment;
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    const scope = "user-read-private user-read-email user-top-read user-read-recently-played user-modify-playback-state user-read-playback-state user-read-currently-playing app-remote-control streaming user-library-modify user-library-read";
    const uri = `${spotifyAccountUrl}/authorize?${(0, import_querystring.stringify)({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      state,
      scope
    })}`;
    return res.json({ uri });
  };
}

// src/app/authentication/login/index.ts
var loginController = LoginController({
  spotifyAccountUrl: environment.spotifyAccountUrl
});

// src/app/authentication/callback/callbackController.ts
var import_querystring2 = require("querystring");
var import_axios2 = __toESM(require("axios"));
function CallbackController({
  spotifyAccountUrl,
  frontendUrl
}) {
  return async function callbackController2(req, res) {
    const { clientId, redirectUri, stateKey, clientSecret, verifierKey } = environment;
    const code = req.query.code || null;
    const state = req.query.state || null;
    if (state === null) {
      res.redirect(`/#${(0, import_querystring2.stringify)({ error: "state_mismatch" })}`);
    } else {
      res.clearCookie(stateKey);
      res.clearCookie(verifierKey);
      const authOptions = {
        method: "POST",
        url: `${spotifyAccountUrl}/api/token`,
        params: {
          client_id: clientId,
          code,
          grant_type: "authorization_code",
          redirect_uri: redirectUri
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`
        },
        json: true
      };
      (0, import_axios2.default)(authOptions).then((response) => {
        const { data } = response;
        res.redirect(`${frontendUrl}/visualizer?${(0, import_querystring2.stringify)(data)}`);
      }).catch(console.log);
    }
  };
}

// src/app/authentication/callback/index.ts
var callbackController = CallbackController({
  spotifyAccountUrl: environment.spotifyAccountUrl,
  frontendUrl: environment.frontendUrl
});

// src/app/authentication/refresh-token/refreshTokenController.ts
var import_axios3 = __toESM(require("axios"));
function RefreshTokenController({
  spotifyAccountUrl,
  clientId,
  clientSecret
}) {
  return async function refreshTokenController2(req, res, next) {
    const authOptions = {
      method: "POST",
      url: `${spotifyAccountUrl}/api/token`,
      params: {
        grant_type: "refresh_token",
        refresh_token: req.body.refreshToken,
        client_id: clientId
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`
      },
      json: true
    };
    (0, import_axios3.default)(authOptions).then((response) => {
      const { data } = response;
      res.send(data);
    }).catch((e) => {
      console.log(e);
      next(e);
    });
  };
}

// src/app/authentication/refresh-token/index.ts
var refreshTokenController = RefreshTokenController({
  spotifyAccountUrl: environment.spotifyAccountUrl,
  clientId: environment.clientId,
  clientSecret: environment.clientSecret
});

// src/app/authentication/authenticationRoutes.ts
function authenticationRoutes(app) {
  app.get("/login", loginController);
  app.get("/callback", callbackController);
  app.post("/refresh-token", refreshTokenController);
}

// src/app/routes.ts
var routes = {
  authenticationRoutes
};
function registerRoutes(app) {
  Object.values(routes).map((endpoint) => endpoint(app));
  return app;
}

// src/index.ts
var port = environment.port;
var server = createServer();
registerRoutes(server);
server.listen(port, () => {
  console.log(`api running on ${port}`);
});
server.on("error", console.log);
