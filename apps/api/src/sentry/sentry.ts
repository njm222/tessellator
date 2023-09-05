import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import { Express } from "express";

import { environment } from "../environments/environment";

export function setupSentry(app: Express) {
  Sentry.init({
    enabled: environment.production,
    dsn: environment.sentryDSN,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  });

  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());

  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
}

export function registerErrorHandler(app: Express) {
  // The error handler must be registered before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());
}
