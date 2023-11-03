import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "./ProgressBar";

import "./player.css";

const meta = {
  title: "Player/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
