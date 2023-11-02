import type { Meta, StoryObj } from "@storybook/react";
import { PauseButton } from "./PauseButton";
import "../player.css";

const meta = {
  title: "Player/Buttons/PauseButton",
  component: PauseButton,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof PauseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "pause track",
  },
};
