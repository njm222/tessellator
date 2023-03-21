import * as React from "react";
import * as ReactDOM from "react-dom";
import { Loader } from "../src/loader/Loader";

describe("Loader", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Loader />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
