import { fireEvent, render } from "@testing-library/react";

import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("renders without crashing", () => {
    const mockCallBack = jest.fn();
    const { getByTitle } = render(
      <IconButton icon={<>icon</>} onClick={mockCallBack} title="iconTitle" />
    );

    expect(getByTitle("iconTitle")).toBeTruthy();
  });
  it("should handle onClick", () => {
    const mockCallBack = jest.fn();
    const { getByTitle } = render(
      <IconButton icon={<>icon</>} onClick={mockCallBack} title="iconTitle" />
    );

    fireEvent.click(getByTitle("iconTitle"));

    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it("should handle onHover", () => {
    const mockCallBack = jest.fn();
    const { getByTitle } = render(
      <IconButton icon={<>icon</>} onClick={mockCallBack} title="iconTitle" />
    );

    expect(getByTitle("iconTitle").className).not.toContain("hover");

    fireEvent.pointerEnter(getByTitle("iconTitle"));

    expect(getByTitle("iconTitle").className).toContain("hover");

    fireEvent.pointerLeave(getByTitle("iconTitle"));

    expect(getByTitle("iconTitle").className).not.toContain("hover");
  });
});
