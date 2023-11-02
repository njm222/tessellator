export const LoaderDots = ({ variant = 1 }: { variant?: number }) => {
  if (variant > 10 || variant < 1 || !Number.isInteger(variant)) {
    throw Error("UI: dot variant out of bounds");
  }

  return (
    <div className="dots">
      <div className={`dots-${variant}`} />
    </div>
  );
};
