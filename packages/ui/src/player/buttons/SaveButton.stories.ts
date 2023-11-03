import type { Meta, StoryObj } from "@storybook/react";

import { SaveButton } from "./SaveButton";

import "../player.css";

const meta = {
  title: "Player/Buttons/SaveButton",
  component: SaveButton,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof SaveButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "save track",
  },
};
