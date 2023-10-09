import axios, { Method } from "axios";
import { Request, Response } from "express";
import { stringify } from "querystring";

export function CallbackController({
  spotifyAccountUrl,
  frontendUrl,
  clientId,
  clientSecret,
  redirectUri,
  stateKey,
}: {
  spotifyAccountUrl: string;
  frontendUrl: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  stateKey: string;
}) {
  return async function callbackController(req: Request, res: Response) {
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null) {
      res.redirect(`/#${stringify({ error: "state_mismatch" })}`);
    } else {
      res.clearCookie(stateKey);

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
        .catch((error) => {
          throw new Error(error);
        });
    }
  };
}
