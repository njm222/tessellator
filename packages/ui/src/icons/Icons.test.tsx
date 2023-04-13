import { render } from "@testing-library/react";

import {
  FilledHeartIcon,
  GithubIcon,
  HeartIcon,
  InstagramIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  SettingsIcon,
} from ".";

describe("Icons", () => {
  it("renders FilledHeartIcon without crashing", () => {
    const { getByRole } = render(<FilledHeartIcon />);

    expect(getByRole("img")).toBeTruthy();
  });
  it("renders HeartIcon without crashing", () => {
    const { getByRole } = render(<HeartIcon />);

    expect(getByRole("img")).toBeTruthy();
  });
  it("renders GithubIcon without crashing", () => {
    const { getByRole } = render(<GithubIcon />);

    expect(getByRole("img")).toBeTruthy();
  });
  it("renders InstagramIcon without crashing", () => {
    const { getByRole } = render(<InstagramIcon />);

    expect(getByRole("img")).toBeTruthy();
  });
  it("renders NextIcon without crashing", () => {
    const { getByRole } = render(<NextIcon />);

    expect(getByRole("img")).toBeTruthy();
  });
  it("renders PauseIcon without crashing", () => {
    const { getByRole } = render(<PauseIcon />);

    expect(getByRole("img")).toBeTruthy();
  });
  it("renders PlayIcon without crashing", () => {
    const { getByRole } = render(<PlayIcon />);

    expect(getByRole("img")).toBeTruthy();
  });
  it("renders PrevIcon without crashing", () => {
    const { getByRole } = render(<PrevIcon />);

    expect(getByRole("img")).toBeTruthy();
  });
  it("renders SettingsIcon without crashing", () => {
    const { getByRole } = render(<SettingsIcon />);

    expect(getByRole("img")).toBeTruthy();
  });
});
