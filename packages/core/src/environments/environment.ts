export const environment = {
  production: process.env.NODE_ENV === "production",
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL,
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || process.env.FRONTEND_URL,
  spotifyApiUrl:
    process.env.NEXT_PUBLIC_SPOTIFY_API_URL || process.env.SPOTIFY_API_URL,
};
