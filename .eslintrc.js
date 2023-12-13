module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint', 'typescript-sort-keys', 'sort-destructure-keys'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
    'sort-destructure-keys/sort-destructure-keys': [2, { caseSensitive: false }],
  },
}
