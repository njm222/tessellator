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
  it("renders correct loading dots", () => {
    const { getByText } = render(<Loader dotVariant={2} />);

    expect(getByText("Loading").nextSibling).toHaveClass("dots dots-2");
  });
  it("should not break component if dotVaraint is lower than the bounds", () => {
    const { getByText } = render(<Loader dotVariant={-1} />);

    expect(getByText("Loading").nextSibling).toHaveClass("dots dots-1");
  });
  it("should not break component if dotVaraint is greater than the bounds", () => {
    const { getByText } = render(<Loader dotVariant={1000} />);

    expect(getByText("Loading").nextSibling).toHaveClass("dots dots-1");
  });
});
