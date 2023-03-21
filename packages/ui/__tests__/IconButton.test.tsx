import * as React from "react";
import * as ReactDOM from "react-dom";
import { IconButton } from "../src/icon-button/IconButton";

describe("IconButton", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <IconButton title="iconTitle" icon={<>icon</>} onClick={console.log} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
