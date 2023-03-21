import * as React from "react";
import * as ReactDOM from "react-dom";
import { NewTabLink } from "../src/NewTabLink";

describe("NewTabLink", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<NewTabLink href="/">link</NewTabLink>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
