export const PlayIcon = ({
  height = "100%",
  width = "32px",
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <svg
      fill="currentColor"
      height={height}
      role="img"
      viewBox="0 0 24 24"
      width={width}
    >
      <path
        d="M10 20H8V4h2v2h2v3h2v2h2v2h-2v2h-2v3h-2v2z"
        fill="currentColor"
      />
    </svg>
  );
};
