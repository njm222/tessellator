import { Router } from "express";

import { callbackController } from "./callback";
import { loginController } from "./login";
import { refreshTokenController } from "./refresh-token";

export function authenticationRoutes(app: Router) {
  app.get("/login", loginController);

  app.get("/callback", callbackController);

  app.post("/refresh-token", refreshTokenController);
}
