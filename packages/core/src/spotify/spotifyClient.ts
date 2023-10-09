import axios, { AxiosError } from "axios";

import { environment } from "../environments/environment";

export const spotifyClient = axios.create({
  baseURL: environment.spotifyApiUrl,
});

export function getDefaultOptions(accessToken: string) {
  return {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
}

export type TError = AxiosError;
