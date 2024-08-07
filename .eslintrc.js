module.exports = {
    env: {
      browser: true,
      es2021: true,.eslintrc.js
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
  };
  