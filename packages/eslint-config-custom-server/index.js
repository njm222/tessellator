module.exports = {
  extends: ["base", "turbo", "prettier"],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["**/__tests__/**/*", "**/**/*.test*", "**/**/*.spec*"],
      env: {
        jest: true,
      },
    },
  ],
};
