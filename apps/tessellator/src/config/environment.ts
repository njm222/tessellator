export const environment = {
  production: process.env.NODE_ENV === "production",
  sentryDSN: process.env.SENTRY_DSN_WEB,
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || process.env.FRONTEND_URL,
};
