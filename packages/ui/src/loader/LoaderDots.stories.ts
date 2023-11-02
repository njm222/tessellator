import type { Meta, StoryObj } from "@storybook/react";
import { LoaderDots } from "./LoaderDots";

const meta = {
  title: "Loader/LoaderDots",
  component: LoaderDots,
  argTypes: {
    variant: {
      control: {
        type: "number",
        min: 1,
        max: 10,
        step: 1,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoaderDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 1,
  },
};
