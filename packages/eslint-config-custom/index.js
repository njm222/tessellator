module.exports = {
  extends: ["base", "next", "turbo", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  rules: {
    "react/jsx-sort-props": "error",
    "react/prop-types": "error",
    "react/no-unescaped-entities": "error",
  },
};
