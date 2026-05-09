/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: false,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules', 'dist', '.next', '.turbo', 'next-env.d.ts'],
};
