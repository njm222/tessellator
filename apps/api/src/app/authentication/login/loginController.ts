import { environment } from "../../../environments/environment";
import pkceChallenge from "pkce-challenge";
import { stringify } from "querystring";
import { generateRandomString } from "@tessellator/core";

export async function loginController(req, res) {
  const { clientId, redirectUri, stateKey, challengeKey, verifierKey } =
    environment;
  const { code_challenge: challenge, code_verifier: verifier } =
    pkceChallenge();
  const state = generateRandomString(16);
  res.cookie(challengeKey, challenge);
  res.cookie(verifierKey, verifier);
  res.cookie(stateKey, state);
  // your application requests authorization
  const scope =
    "user-read-private user-read-email user-top-read user-read-recently-played user-modify-playback-state user-read-playback-state user-read-currently-playing app-remote-control streaming user-library-modify user-library-read";
  const uri = `https://accounts.spotify.com/authorize?${stringify({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code_challenge_method: "S256",
    code_challenge: challenge,
    state,
    scope,
  })}`;

  return res.json({ uri });
}
