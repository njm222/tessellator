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
