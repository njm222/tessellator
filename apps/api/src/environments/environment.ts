export const environment = {
  production: false,
  redirectUri: `${process.env.BACKEND_URL}/callback`,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  stateKey: "spotify_auth_state",
  challengeKey: "spotify_auth_challenge",
  verifierKey: "spotify_auth_verifier",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
};
