export const PlayIcon = ({
  height = "32px",
  width = "32px",
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <svg height={height} role="img" viewBox="0 0 24 24" width={width}>
      <polygon
        fill="currentColor"
        points="21.57 12 5.98 3 5.98 21 21.57 12"
      ></polygon>
    </svg>
  );
};
