import { generateRandomString } from "./stringUtils";

describe("stringUtils", () => {
  it("should return a random string of length n", () => {
    const randomLength = Math.round(Math.random() * 50);
    expect(generateRandomString(randomLength).length).toEqual(randomLength);
  });
});
