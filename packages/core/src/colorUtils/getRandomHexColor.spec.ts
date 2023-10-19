import { getRandomHexColor } from "./getRandomHexColor";

describe("getRandomHexColor", () => {
  it("should return a valid hex number", () => {
    const Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;

    const colorString = getRandomHexColor();
    expect(Reg_Exp.test(colorString)).toBeTruthy();
  });
});
