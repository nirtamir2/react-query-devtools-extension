module.exports = {
  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-packagejson"),
    require.resolve("@nirtamir2/prettier-plugin-css-order"),
  ],
  // @see https://github.com/trivago/prettier-plugin-sort-imports
  importOrder: [
    "^react$",
    "<THIRD_PARTY_MODULES>",
    // Internal modules
    "^@core/(.*)$",
    "^@server/(.*)$",
    "^@ui/(.*)$",
    "^@*/(.*)$",
    // Relative imports
    "^[./]",
  ],
  overrides: [
    {
      files: "*.svg",
      options: {
        parser: "html",
      },
    },
  ],
};
