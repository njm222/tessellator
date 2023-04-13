export const FilledHeartIcon = ({
  height = "100%",
  width = "32px",
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <svg height={height} role="img" viewBox="0 0 15 15" width={width}>
      <path
        d="M4.036 1a4.036 4.036 0 0 0-2.854 6.89l5.964 5.964a.5.5 0 0 0 .708 0l5.964-5.965a4.036 4.036 0 0 0-5.707-5.707l-.611.61-.61-.61A4.036 4.036 0 0 0 4.035 1Z"
        fill="#e74c3c"
      />
    </svg>
  );
};
