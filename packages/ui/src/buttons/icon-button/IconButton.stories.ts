import type { Meta, StoryObj } from "@storybook/react";
import * as Icons from "../../icons";
import { IconButton } from "./IconButton";
import "./iconButton.css";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
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
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    title: "Title",
    icon: Icons.BackIcon({}),
  },
};
