import { render } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import { Hints } from "./Hints";

describe("Hints", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Hints />);

    expect(
      getByText("Press [0, 1, 2, 3] to change visualizer mode")
    ).toBeTruthy();
  });
  it("renders correct hint", () => {
    const { getByText } = render(<Hints hintVariant={2} />);

    expect(getByText("Press [f] to toggle fullscreen")).toBeTruthy();
  });
});
