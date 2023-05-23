import { getIndexOfMax, getIndexOfMin } from "./arrayUtils";

describe("arrayUtils", () => {
  it("should return a 0 if array is empty", () => {
    const index = getIndexOfMax([]);
    expect(index).toBe(0);
  });
  it("should return the max index of an array", () => {
    const index = getIndexOfMax([0, 2, 1]);
    expect(index).toBe(1);
  });
  it("should return a 0 if array is empty", () => {
    const index = getIndexOfMin([]);
    expect(index).toBe(0);
  });
  it("should return the min index of an array", () => {
    const index = getIndexOfMin([2, 0, 1]);
    expect(index).toBe(1);
  });
});
