import type { Meta, StoryObj } from "@storybook/react";

import { Hint, hintOptions } from "./Hint";

export const storybookHintOptions = hintOptions.reduce(
  (acc: any, curr, index) => {
    acc[curr] = index;
    return acc;
  },
  {}
);

const meta = {
  title: "Loader/Hint",
  component: Hint,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: storybookHintOptions,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Hint>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 0,
  },
};
