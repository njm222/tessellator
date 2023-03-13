import { environment } from "../../../environments/environment";
import { CallbackController } from "./callbackController";

const callbackController = CallbackController({
  spotifyAccountUrl: environment.spotifyAccountUrl,
  frontendUrl: environment.frontendUrl,
});

export { callbackController };
