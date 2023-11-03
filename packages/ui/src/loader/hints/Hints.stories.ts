import type { Meta, StoryObj } from "@storybook/react";

import { Hints } from "./Hints";
import { storybookHintOptions } from "./storybookHintOptions";

const meta = {
  title: "Loader/Hints",
  component: Hints,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: storybookHintOptions,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Hints>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 0,
  },
};
