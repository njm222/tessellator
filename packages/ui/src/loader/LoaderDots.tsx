export const LoaderDots = ({ dotVariant = 1 }: { dotVariant?: number }) => {
  if (dotVariant > 10 || dotVariant < 1 || !Number.isInteger(dotVariant)) {
    throw Error("UI: dot variant out of bounds");
  }

  return (
    <div className="dots">
      <div className={`dots-${dotVariant}`} />
    </div>
  );
};
