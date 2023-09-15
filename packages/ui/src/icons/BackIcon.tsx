export const BackIcon = ({
  height = "100%",
  width = "48px",
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <svg height={height} role="img" viewBox="0 0 24 24" width={width}>
      <g strokeWidth="0" />
      <g strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12 17h-1v-2H9v-2h12v-2H9V9h2V7h1V5H9v2H7v2H5v1H4v1H3v2h1v1h1v1h2v2h2v2h3z"
        fill="currentColor"
      />
    </svg>
  );
};
