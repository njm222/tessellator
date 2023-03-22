import { environment } from "../../../environments/environment";

import { RefreshTokenController } from "./refreshTokenController";

const refreshTokenController = RefreshTokenController({
  spotifyAccountUrl: environment.spotifyAccountUrl,
  clientId: environment.clientId,
  clientSecret: environment.clientSecret,
});

export { refreshTokenController };
