import type { Meta, StoryObj } from "@storybook/react";
import { ShuffleButton } from "./ShuffleButton";
import "../player.css";

const meta = {
  title: "Player/Buttons/ShuffleButton",
  component: ShuffleButton,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof ShuffleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "shuffle",
  },
};
