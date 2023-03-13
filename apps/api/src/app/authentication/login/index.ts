import { environment } from "../../../environments/environment";
import { LoginController } from "./loginController";

const loginController = LoginController({
  spotifyAccountUrl: environment.spotifyAccountUrl,
});

export { loginController };
