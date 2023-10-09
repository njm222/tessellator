import { AxiosError } from "axios";

export function convertURItoURL(stringToConvert: string) {
  const stringArr = stringToConvert.split(":");
  let ret = "https://open.spotify.com/";
  if (stringArr.length === 3) {
    ret += stringArr[1] + "/";
    ret += stringArr[2];
  }
  return ret;
}

export function handleError(err: unknown) {
  if (err instanceof AxiosError) {
    throw new AxiosError(err.message, err.code, err.config, err.request);
  }
}
