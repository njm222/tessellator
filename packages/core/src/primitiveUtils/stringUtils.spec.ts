import { generateRandomString } from "./stringUtils";
import { generateRandomInteger } from ".";

describe("stringUtils", () => {
  it("should return an empty string", () => {
    expect(generateRandomString(0)).toEqual("");
  });
  it("should return a random string of length n", () => {
    expect(generateRandomString(25).length).toEqual(25);
  });
});
