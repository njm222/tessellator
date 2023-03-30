import { render } from "@testing-library/react";

import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders without crashing ", () => {
    const { getByTitle } = render(<ProgressBar />);

    expect(getByTitle("progress-bar")).toBeTruthy();
  });
});
