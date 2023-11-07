import axios from "axios";

import { environment } from "../environments/environment";

export const apiClient = axios.create({
  baseURL: environment.backendUrl,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": environment.frontendUrl,
  },
});

const headers = new Headers();
headers.append("Access-Control-Allow-Credentials", "true");
headers.append("Access-Control-Allow-Origin", environment.frontendUrl || "");

export const defaultFetchOptions: RequestInit = {
  headers,
  credentials: "include",
};
