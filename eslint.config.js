import pluginQuery from "@tanstack/eslint-plugin-query";

export default [
  ...pluginQuery.configs["flat/recommended"],
  {
    ignores: [".next/*"],
  },
  // Any other config...
];
