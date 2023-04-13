export const PauseIcon = ({
  height = "100%",
  width = "32px",
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <svg height={height} role="img" viewBox="0 0 24 24" width={width}>
      <path d="M10 4H5v16h5V4zm9 0h-5v16h5V4z" fill="currentColor" />
    </svg>
  );
};
