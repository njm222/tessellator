import { Hint } from "./Hint";

export const Hints = ({ hintVariant = 0 }: { hintVariant?: number }) => {
  return (
    <div className="hints">
      <Hint variant={hintVariant} />
    </div>
  );
};
