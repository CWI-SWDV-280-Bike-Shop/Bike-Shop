module.exports = {
  root: true,
  plugins: [
    "@typescript-eslint",
  ],
  overrides: [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
    },
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    node: true
  }
};
