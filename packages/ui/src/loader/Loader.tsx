import { LoaderDots } from "./LoaderDots";

export const Loader = ({
  message,
  dotVariant,
}: {
  message?: string;
  dotVariant?: number;
}) => {
  return (
    <div className="loader">
      <h1 className="loaderText">{message ? message : "Loading"}</h1>
      <LoaderDots dotVariant={dotVariant} />
    </div>
  );
};
