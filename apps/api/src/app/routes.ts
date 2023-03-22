import { Router } from "express";

import { authenticationRoutes } from "./authentication/authenticationRoutes";

const routes = {
  authenticationRoutes,
};

export function registerRoutes(app: Router) {
  Object.values(routes).map((endpoint) => endpoint(app));

  return app;
}
