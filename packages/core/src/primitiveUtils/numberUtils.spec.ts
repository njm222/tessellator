import { generateRandomNumber, generateRandomInteger } from "./numberUtils";

describe("numberUtils", () => {
  it("should return a random number between", () => {
    const number = generateRandomNumber(0, 1);
    expect(number).toBeLessThanOrEqual(1);
    expect(number).toBeGreaterThanOrEqual(0);
  });
  it("should return a random negative number between", () => {
    const number = generateRandomNumber(-4, -2);
    expect(number).toBeLessThanOrEqual(-2);
    expect(number).toBeGreaterThanOrEqual(-4);
  });
  it("should return throw an error when generating a random number", () => {
    try {
      generateRandomNumber(1, 0);
      expect(true).toBe(false);
    } catch (e) {
      expect(e?.toString()).toEqual("Error: max cannot be less than min");
    }
  });
  it("should return a random integer between", () => {
    const number = generateRandomInteger(0, 1);
    expect(number).toBeLessThanOrEqual(1);
    expect(number).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(number)).toBe(true);
  });
  it("should return a random negative integer between", () => {
    const number = generateRandomInteger(-4, -2);
    expect(number).toBeLessThanOrEqual(-2);
    expect(number).toBeGreaterThanOrEqual(-4);
  });
  it("should return throw an error when generating a random integer", () => {
    try {
      generateRandomInteger(1, 0);
      expect(true).toBe(false);
    } catch (e) {
      expect(e?.toString()).toEqual("Error: max cannot be less than min");
    }
  });
});
