import axios from "axios";
import { setState, useStore } from "./utils/store";

const backendClient = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:3333",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin":
      process.env.FRONTEND_URL || "http://localhost:4200",
  },
});

export const updateToken = async (refreshToken) => {
  try {
    const { data } = await backendClient.post("/refresh-token", {
      refreshToken,
    });
    return {
      accessToken: data?.access_token,
      refreshToken: data?.refresh_token,
    };
  } catch (err) {
    console.log(err); // TODO: toast messages
    // remove this set state stuff
    useStore.setState({ refreshToken: null }); // reset refresh token just incase
  }
};

export const login = async () => {
  try {
    const { data } = await backendClient.get("/login");
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const logout = async () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  setState({ accessToken: null, refreshToken: null, user: null });
  window.location.pathname = "/";
};
