export const environment = {
  production: process.env.NODE_ENV === "production",
  redirectUri: `${process.env.BACKEND_URL}/callback`,
  clientId: process.env.SPOTIFY_CLIENT_ID || "",
  port: process.env.BACKEND_PORT || "",
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
  spotifyAccountUrl: process.env.SPOTIFY_ACCOUNT_URL || "",
  stateKey: "spotify_auth_state",
  frontendUrl: process.env.FRONTEND_URL || "",
};
