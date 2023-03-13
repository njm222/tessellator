import axios, { Method } from "axios";
import { NextFunction, Request, Response } from "express";

export function RefreshTokenController({
  spotifyAccountUrl,
  clientId,
  clientSecret,
}: {
  spotifyAccountUrl: string;
  clientId: string;
  clientSecret: string;
}) {
  return async function refreshTokenController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authOptions = {
      method: "POST" as Method,
      url: `${spotifyAccountUrl}/api/token`,
      params: {
        grant_type: "refresh_token",
        refresh_token: req.body.refreshToken,
        client_id: clientId,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      },
      json: true,
    };

    axios(authOptions)
      .then((response) => {
        const { data } = response;
        res.send(data);
      })
      .catch((e) => {
        console.log(e);
        next(e);
      });
  };
}
