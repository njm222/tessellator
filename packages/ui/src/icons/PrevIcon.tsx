export const PrevIcon = ({
  height = "100%",
  width = "32px",
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <svg height={height} role="img" viewBox="0 0 24 24" width={width}>
      <path
        d="M6 4h2v16H6V4zm12 0h-2v2h-2v3h-2v2h-2v2h2v3h2v2h2v2h2V4z"
        fill="currentColor"
      />
    </svg>
  );
};
