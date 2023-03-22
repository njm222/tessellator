export const PrevIcon = ({
  height = "32px",
  width = "32px",
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <svg style={{ width, height }} viewBox="0 0 24 24">
      <path
        d="M15.54 21.15L5.095 12.23 15.54 3.31l.65.76-9.555 8.16 9.555 8.16"
        fill="currentColor"
      ></path>
    </svg>
  );
};
