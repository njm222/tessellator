import type { Meta, StoryObj } from "@storybook/react";

import { TrackDetails } from "./TrackDetails";

import "./player.css";

const meta = {
  title: "Player/TrackDetails",
  component: TrackDetails,
  tags: ["autodocs"],
} satisfies Meta<typeof TrackDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

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
