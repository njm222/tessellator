import type { Meta, StoryObj } from "@storybook/react";

import { Toast } from "./Toast";

import "./toast.css";

const meta = {
  title: "Misc/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: { options: ["primary", "error"], control: { type: "radio" } },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary toast",
  },
};

export const Error: Story = {
  args: {
    children: "Error toast",
    variant: "error",
  },
};
