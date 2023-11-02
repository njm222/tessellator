import type { Meta, StoryObj } from "@storybook/react";
import { PlayButton } from "./PlayButton";
import "../player.css";

const meta = {
  title: "Player/Buttons/PlayButton",
  component: PlayButton,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof PlayButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "play track",
  },
};
