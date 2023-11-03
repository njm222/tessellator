import type { Meta, StoryObj } from "@storybook/react";

import { Hint } from "./Hint";
import { storybookHintOptions } from "./storybookHintOptions";

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
