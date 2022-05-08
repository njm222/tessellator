import * as express from "express";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import { registerRoutes } from "./app/routes";
import { environment } from "./environments/environment";

const app = express();

app
  .use(express.static(`${__dirname}/public`))
  .use(cors({ credentials: true, origin: environment.frontendUrl }))
  .use(cookieParser())
  .use(express.json());

app.get("/api", (req, res) => {
  res.send("hello world");
});

registerRoutes(app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on("error", console.error);
