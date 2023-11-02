import { Hint } from "./Hint";

export const Hints = ({ variant = 0 }: { variant?: number }) => {
  return (
    <div>
      <Hint variant={variant} />
    </div>
  );
};
