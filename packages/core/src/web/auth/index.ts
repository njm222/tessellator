import { environment } from "../../environments/environment";
import { apiClient, defaultFetchOptions } from "../apiClient";

export async function updateToken(refreshToken: string) {
  try {
    const { data } = await apiClient.post("/refresh-token", {
      refreshToken,
    });
    return {
      accessToken: data?.access_token,
      refreshToken: data?.refresh_token,
    };
  } catch (err: unknown) {
    throw Error(err as string);
  }
}

export async function loginUser() {
  try {
    const response = await fetch(
      environment.backendUrl + "/login",
      defaultFetchOptions
    );
    return response.json();
  } catch (err: unknown) {
    console.log(err);
    throw Error(err as string);
  }
}
