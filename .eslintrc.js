module.exports = {
  root: true,
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: [
    "nirtamir2/recommended",
    "nirtamir2/react",
    "nirtamir2/typescript",
    "nirtamir2/security",
    "nirtamir2/compat",
  ],
  rules: {
    "no-console": "off",
    "import/no-unresolved": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
  },
  overrides: [
    {
      files: "vite.config.ts",
      parserOptions: {
        project: "./tsconfig.node.json",
      },
    },
  ],
};
