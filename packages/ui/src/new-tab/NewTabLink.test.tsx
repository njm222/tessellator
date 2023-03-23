import { render } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import { NewTabLink } from "./NewTabLink";

describe("NewTabLink", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<NewTabLink href="/">link</NewTabLink>);

    expect(getByText("link")).toHaveAttribute("href", "/");
  });
});
