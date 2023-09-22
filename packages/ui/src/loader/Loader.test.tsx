import { render } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import { Loader } from "./Loader";

describe("Loader", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Loader />);

    expect(getByText("Loading")).toBeTruthy();
  });
  it("renders correct loading text", () => {
    const { getByText } = render(<Loader message="test loading" />);

    expect(getByText("test loading")).toBeTruthy();
  });
});
