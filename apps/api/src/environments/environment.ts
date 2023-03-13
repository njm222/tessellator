export const environment = {
  production: false,
  redirectUri: `${process.env.BACKEND_URL}/callback`,
  clientId: process.env.SPOTIFY_CLIENT_ID || "",
  port: process.env.BACKEND_PORT || "",
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
  spotifyAccountUrl: process.env.SPOTIFY_ACCOUNT_URL || "",
  stateKey: "spotify_auth_state",
  challengeKey: "spotify_auth_challenge",
  verifierKey: "spotify_auth_verifier",
  frontendUrl: process.env.FRONTEND_URL || "",
};
