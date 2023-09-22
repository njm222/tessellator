import { Hints } from "../hints/Hints";

import { LoaderDots } from "./LoaderDots";

export const Loader = ({
  message,
  dotVariant,
  hintVariant,
}: {
  message?: string;
  dotVariant?: number;
  hintVariant?: number;
}) => {
  return (
    <div className="loader">
      <h1 className="loaderText">{message ? message : "Loading"}</h1>
      <LoaderDots dotVariant={dotVariant} />
      <Hints hintVariant={hintVariant} />
    </div>
  );
};
