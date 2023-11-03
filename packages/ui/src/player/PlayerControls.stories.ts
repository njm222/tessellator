import type { Meta, StoryObj } from "@storybook/react";

import { PlayerControls } from "./PlayerControls";

import "./player.css";

const meta = {
  title: "Player/PlayerControls",
  component: PlayerControls,
  tags: ["autodocs"],
} satisfies Meta<typeof PlayerControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isPaused: false,
    isSaved: false,
    isShuffle: false,
  },
};
