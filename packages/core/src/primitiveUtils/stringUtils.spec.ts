import { generateRandomInteger } from ".";
import { generateRandomString } from "./stringUtils";

describe("stringUtils", () => {
  it("should return an empty string", () => {
    expect(generateRandomString(0)).toEqual("");
  });
  it("should return a random string of length n", () => {
    const randomLength = generateRandomInteger(0, 50);
    expect(generateRandomString(randomLength).length).toEqual(randomLength);
  });
});
