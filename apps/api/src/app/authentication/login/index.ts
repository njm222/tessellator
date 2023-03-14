import { environment } from "../../../environments/environment";
import { LoginController } from "./loginController";

const loginController = LoginController({
  spotifyAccountUrl: environment.spotifyAccountUrl,
  clientId: environment.clientId,
  redirectUri: environment.redirectUri,
  stateKey: environment.stateKey,
});

export { loginController };
