import { hslToHex } from "./hslToHex";

describe("hslToHex", () => {
  it("should return white as a hex string", () => {
    expect(
      hslToHex(
        Math.round(Math.random() * 360),
        Math.round(Math.random() * 255),
        255
      )
    ).toEqual("#ffffff");
  });

  it("should return black as a hex string", () => {
    expect(
      hslToHex(
        Math.round(Math.random() * 360),
        Math.round(Math.random() * 255),
        0
      )
    ).toEqual("#000000");
  });
  it("should return red as a hex string", () => {
    expect(hslToHex(0, 255, 127.5)).toEqual("#ff0000");
  });
  it("should return green as a hex string", () => {
    expect(hslToHex(120, 255, 127.5)).toEqual("#00ff00");
  });
  it("should return blue as a hex string", () => {
    expect(hslToHex(240, 255, 127.5)).toEqual("#0000ff");
  });
});
