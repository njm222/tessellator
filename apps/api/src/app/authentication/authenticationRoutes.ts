import { Router } from "express";

import { loginController } from "./login/loginController";
import { callbackController } from "./callback/callbackController";

export function authenticationRoutes(app: Router) {
  app.get("/login", loginController);
  app.get("/callback", callbackController);
}
