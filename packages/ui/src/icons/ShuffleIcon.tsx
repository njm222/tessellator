export const ShuffleIcon = ({
  height = "100%",
  width = "32px",
  active,
}: {
  height?: string;
  width?: string;
  active: boolean;
}) => {
  return (
    <svg height={height} role="img" viewBox="0 0 24 24" width={width}>
      <path
        d="M18 5h-2v2h2v2h-6v2h-2v6H2v2h8v-2h2v-6h6v2h-2v2h2v-2h2v-2h2V9h-2V7h-2V5zM2 9h6v2H2V9zm20 10v-2h-8v2h8z"
        fill={active ? "green" : "currentColor"}
      />
    </svg>
  );
};
