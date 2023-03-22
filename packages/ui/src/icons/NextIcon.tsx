export const NextIcon = ({
  height = "32px",
  width = "32px",
}: {
  height?: string;
  width?: string;
}) => {
  return (
    <svg style={{ width, height }} viewBox="0 0 24 24">
      <path
        d="M7.96 21.15l-.65-.76 9.555-8.16L7.31 4.07l.65-.76 10.445 8.92"
        fill="currentColor"
      ></path>
    </svg>
  );
};
