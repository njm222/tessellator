import { generateRandomString } from "core";
import { Request, Response } from "express";
import { stringify } from "querystring";

export function LoginController({
  spotifyAccountUrl,
  clientId,
  redirectUri,
  stateKey,
}: {
  spotifyAccountUrl: string;
  clientId: string;
  redirectUri: string;
  stateKey: string;
}) {
  return async function loginController(req: Request, res: Response) {
    const state = generateRandomString(16);

    res.cookie(stateKey, state);

    const scope =
      "user-read-private user-read-email user-top-read user-read-recently-played user-modify-playback-state user-read-playback-state user-read-currently-playing app-remote-control streaming user-library-modify user-library-read";
    const uri = `${spotifyAccountUrl}/authorize?${stringify({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      state,
      scope,
    })}`;

    return res.json({ uri });
  };
}
