import { render } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import { Hint } from "./Hint";

describe("Hint", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  it("should break component if hintVariant is lower than the bounds", () => {
    expect(() => render(<Hint variant={-1} />)).toThrow(
      "UI: hint variant out of bounds"
    );
  });
  it("should break component if hintVariant is greater than the bounds", () => {
    expect(() => render(<Hint variant={10000} />)).toThrow(
      "UI: hint variant out of bounds"
    );
  });
});
