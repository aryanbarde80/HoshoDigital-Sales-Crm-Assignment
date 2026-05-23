import * as Sentry from "@sentry/react";

let sentryInitialized = false;

export function initializeMonitoring() {
  if (sentryInitialized) {
    return;
  }

  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    return;
  }

  Sentry.init({
    dsn,
    tracesSampleRate: 0.2,
    environment: import.meta.env.MODE,
    integrations: [Sentry.browserTracingIntegration()]
  });

  sentryInitialized = true;
}
