import type { Meta, StoryObj } from "@storybook/react";
import { storybookHintOptions } from "./hints/storybookHintOptions";

import { Loader } from "./Loader";

const meta = {
  title: "Loader/Loader",
  component: Loader,
  argTypes: {
    dotVariant: {
      control: {
        type: "number",
        min: 1,
        max: 10,
        step: 1,
      },
    },
    hintVariant: {
      control: { type: "select" },
      options: storybookHintOptions,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    hintVariant: 0,
    dotVariant: 2,
    message: "Loading",
  },
};
