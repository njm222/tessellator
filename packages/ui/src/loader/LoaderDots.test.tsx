import { render } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import { LoaderDots } from "./LoaderDots";

describe("LoaderDots", () => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  it("should break component if dotVaraint is lower than the bounds", () => {
    expect(() => render(<LoaderDots variant={-1} />)).toThrow(
      "UI: dot variant out of bounds"
    );
  });
  it("should break component if dotVaraint is greater than the bounds", () => {
    expect(() => render(<LoaderDots variant={10000} />)).toThrow(
      "UI: dot variant out of bounds"
    );
  });
});
