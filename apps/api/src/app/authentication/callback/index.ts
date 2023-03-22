import { environment } from "../../../environments/environment";

import { CallbackController } from "./callbackController";

const callbackController = CallbackController({
  spotifyAccountUrl: environment.spotifyAccountUrl,
  frontendUrl: environment.frontendUrl,
  clientId: environment.clientId,
  clientSecret: environment.clientSecret,
  redirectUri: environment.redirectUri,
  stateKey: environment.stateKey,
});

export { callbackController };
