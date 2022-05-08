import { hslToHex } from "./hslToHex";

describe("hslToHex", () => {
  it("should return white as a hex string", () => {
    expect(
      hslToHex(Math.round(Math.random() * 360), Math.round(Math.random() * 255), 255)
    ).toEqual("#ffffff");
  });

  it("should return black as a hex string", () => {
    expect(
      hslToHex(Math.round(Math.random() * 360), Math.round(Math.random() * 255), 0)
    ).toEqual("#000000");
  });
});
