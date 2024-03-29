import { fireEvent, render } from "@testing-library/react";

import { PlayerControls } from "./PlayerControls";

describe("PlayerControls", () => {
  it("renders without crashing - paused", () => {
    const mockCallBack = jest.fn();
    const { getByTitle } = render(
      <PlayerControls
        isPaused={true}
        isSaved={true}
        isShuffle={true}
        onNext={mockCallBack}
        onPause={mockCallBack}
        onPlay={mockCallBack}
        onPrev={mockCallBack}
        onSave={mockCallBack}
        onShuffle={mockCallBack}
      />
    );

    expect(getByTitle("play-track")).toBeTruthy();
  });
  it("renders without crashing - playing", () => {
    const mockCallBack = jest.fn();
    const { getByTitle } = render(
      <PlayerControls
        isPaused={false}
        isSaved={true}
        isShuffle={true}
        onNext={mockCallBack}
        onPause={mockCallBack}
        onPlay={mockCallBack}
        onPrev={mockCallBack}
        onSave={mockCallBack}
        onShuffle={mockCallBack}
      />
    );

    expect(getByTitle("pause-track")).toBeTruthy();
  });
  it("should handle actions", () => {
    const mockCallBack = jest.fn();
    const { getByTitle } = render(
      <PlayerControls
        isPaused={true}
        isSaved={true}
        isShuffle={true}
        onNext={mockCallBack}
        onPause={mockCallBack}
        onPlay={mockCallBack}
        onPrev={mockCallBack}
        onSave={mockCallBack}
        onShuffle={mockCallBack}
      />
    );

    fireEvent.click(getByTitle("play-track"));

    expect(mockCallBack.mock.calls.length).toBe(1);

    fireEvent.click(getByTitle("next-track"));

    expect(mockCallBack.mock.calls.length).toBe(2);

    fireEvent.click(getByTitle("prev-track"));

    expect(mockCallBack.mock.calls.length).toBe(3);
  });
});
