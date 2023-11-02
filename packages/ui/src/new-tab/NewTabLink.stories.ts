import type { Meta, StoryObj } from "@storybook/react";
import { NewTabLink } from "./NewTabLink";

const meta = {
  title: "Links/NewTabLink",
  component: NewTabLink,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof NewTabLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "NewTabLink",
  },
};
