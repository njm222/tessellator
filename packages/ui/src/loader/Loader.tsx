export const Loader = ({
  message,
  dotVariant = 1,
}: {
  message?: string;
  dotVariant?: number;
}) => {
  return (
    <div className="loader">
      <h1 className="loaderText">{message ? message : "Loading"}</h1>
      <div
        className={`dots dots-${
          dotVariant > 10 || dotVariant < 0 || !Number.isInteger(dotVariant)
            ? 1
            : dotVariant
        }`}
      />
    </div>
  );
};
