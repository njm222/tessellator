import * as Sentry from "@sentry/node";

import { registerRoutes } from "./app/routes";
import { environment } from "./environments/environment";
import { registerErrorHandler } from "./sentry/sentry";
import { createServer } from "./server/server";

const port = environment.port;
const server = createServer();
registerRoutes(server);
registerErrorHandler(server);

server.listen(port, () => {
  console.log(`api running on ${port}`);
});

server.on("error", console.log);
