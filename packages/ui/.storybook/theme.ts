import { create } from "@storybook/theming/create";

export default create({
  base: "dark",
  fontBase: '"Tomorrow ExtraLight", sans-serif',
  fontCode: "monospace",

  brandTitle: "Tessellator UI",
  brandUrl: "http://localhost:6006",
  brandImage: "./logo.png",
  brandTarget: "_self",

  //
  colorPrimary: "#FFF",
  colorSecondary: "#1db954",

  // UI
  appBg: "#000",
  appContentBg: "#131313",
  appBorderColor: "#1db954",
  appBorderRadius: 4,

  // Text colors
  textColor: "#FFF",
  textInverseColor: "#1db954",

  // Toolbar default and active colors
  barTextColor: "#FFF",
  barSelectedColor: "#1db954",
  barBg: "#000",

  // Form colors
  inputBg: "#000",
  inputBorder: "#1db954",
  inputTextColor: "#FFF",
  inputBorderRadius: 2,
});
