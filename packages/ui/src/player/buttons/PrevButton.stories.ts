import type { Meta, StoryObj } from "@storybook/react";

import { PrevButton } from "./PrevButton";

import "../player.css";

const meta = {
  title: "Player/Buttons/PrevButton",
  component: PrevButton,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof PrevButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "previous track",
  },
};
