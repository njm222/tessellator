import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { environment } from "./environments/environment";
import cookieParser from "cookie-parser";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(express.static(`${__dirname}/public`))
    .use(cors({ credentials: true, origin: environment.frontendUrl }))
    .use(cookieParser())
    .get("/", (req, res) => {
      return res.json({ message: `tessellator-api is running!` });
    });

  return app;
};
