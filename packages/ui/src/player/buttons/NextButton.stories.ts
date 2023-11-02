import type { Meta, StoryObj } from "@storybook/react";
import { NextButton } from "./NextButton";
import "../player.css";

const meta = {
  title: "Player/Buttons/NextButton",
  component: NextButton,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof NextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "next track",
  },
};
