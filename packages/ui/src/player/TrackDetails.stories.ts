import type { Meta, StoryObj } from "@storybook/react";

import { TrackDetails } from "./TrackDetails";

import "./player.css";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Player/TrackDetails",
  component: TrackDetails,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof TrackDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    trackName: "track name",
    trackLink: "",
    trackArtists: [
      { link: "", name: "track artist 1" },
      { link: "", name: "track artist 2" },
    ],
  },
};
