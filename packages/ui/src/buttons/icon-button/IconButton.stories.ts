import type { Meta, StoryObj } from "@storybook/react";

import * as Icons from "../../icons";

import { IconButton } from "./IconButton";

import "./iconButton.css";

const meta = {
  title: "Buttons/IconButton",
  component: IconButton,
  argTypes: {
    onClick: { action: "clicked" },
    icon: {
      control: { type: "select" },
      options: Object.entries(Icons).reduce((acc: any, [key, val]) => {
        const icon = val({});
        acc[key] = icon;
        return acc;
      }, {}),
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Title",
    icon: Icons.BackIcon({}),
  },
};
