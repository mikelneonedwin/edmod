import Rollbar, { type Configuration } from "rollbar";

const baseConfig: Configuration = {
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === "production",
};

export const rollbarClientConfig: Configuration = {
  ...baseConfig,
  accessToken: process.env.NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN,
};

export const rollbarServer = new Rollbar({
  ...baseConfig,
  accessToken: process.env.ROLLBAR_SERVER_TOKEN,
});
