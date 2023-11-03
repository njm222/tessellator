import { hintOptions } from "./Hint";

export const storybookHintOptions = hintOptions.reduce(
  (acc: any, curr, index) => {
    acc[curr] = index;
    return acc;
  },
  {}
);
