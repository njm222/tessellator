import { stringify } from "querystring";
import axios, { Method } from "axios";
import { environment } from "../../../environments/environment";
import { Request, Response } from "express";

export function CallbackController({
  spotifyAccountUrl,
  frontendUrl,
}: {
  spotifyAccountUrl: string;
  frontendUrl: string;
}) {
  return async function callbackController(req: Request, res: Response) {
    const { clientId, redirectUri, stateKey, clientSecret, verifierKey } =
      environment;

    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null) {
      res.redirect(`/#${stringify({ error: "state_mismatch" })}`);
    } else {
      res.clearCookie(stateKey);
      res.clearCookie(verifierKey);

      const authOptions = {
        method: "POST" as Method,
        url: `${spotifyAccountUrl}/api/token`,
        params: {
          client_id: clientId,
          code,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
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

          res.redirect(`${frontendUrl}/visualizer?${stringify(data)}`);
        })
        .catch(console.log);
    }
  };
}
