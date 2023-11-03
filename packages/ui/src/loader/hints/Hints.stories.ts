import type { Meta, StoryObj } from "@storybook/react";

import { storybookHintOptions } from "./Hint.stories";
import { Hints } from "./Hints";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Loader/Hints",
  component: Hints,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: storybookHintOptions,
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Hints>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 0,
  },
};
