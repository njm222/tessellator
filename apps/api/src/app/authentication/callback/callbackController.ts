import { stringify } from "querystring";
import axios, { Method } from "axios";
import { environment } from "../../../environments/environment";

export async function callbackController(req, res) {
  const { clientId, redirectUri, stateKey, clientSecret, verifierKey } =
    environment;
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  const storedVerifier = req.cookies ? req.cookies[verifierKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(`/#${stringify({ error: "state_mismatch" })}`);
  } else {
    res.clearCookie(stateKey);
    res.clearCookie(verifierKey);

    const authOptions = {
      method: "POST" as Method,
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
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      },
      json: true,
    };

    axios(authOptions)
      .then((response) => {
        const { data } = response;

        res.redirect(
          `${process.env.FRONTEND_URL}/dashboard?${stringify(data)}`
        );
      })
      .catch(console.log);
  }
}
