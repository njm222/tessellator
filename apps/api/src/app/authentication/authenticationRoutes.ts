import { Router } from "express";

import { loginController } from "./login";
import { callbackController } from "./callback";
import { refreshTokenController } from "./refresh-token";

export function authenticationRoutes(app: Router) {
  app.get("/login", loginController);

  app.get("/callback", callbackController);

  app.post("/refresh-token", refreshTokenController);
}
