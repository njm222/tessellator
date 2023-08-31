export const LoaderDots = ({ dotVariant = 1 }: { dotVariant?: number }) => {
  return (
    <div className="dots">
      <div
        className={`dots-${
          dotVariant > 10 || dotVariant < 0 || !Number.isInteger(dotVariant)
            ? 1
            : dotVariant
        }`}
      />
    </div>
  );
};
