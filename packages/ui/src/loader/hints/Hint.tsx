export const hintOptions = [
  "Press [0, 1, 2, 3, 4] to change visualizer mode",
  "Press [q, a, z, w] to change color mode",
  "Press [f] to toggle fullscreen",
];

export const Hint = ({ variant }: { variant: number }) => {
  if (variant < 0 || variant > hintOptions.length) {
    throw Error("UI: hint variant out of bounds");
  }
  return <h5>{hintOptions[variant]}</h5>;
};
