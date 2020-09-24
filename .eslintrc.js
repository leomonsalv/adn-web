module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:sonarjs/recommended',
    'airbnb',
    'plugin:unicorn/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: '2020',
    sourceType: 'module',
  },
  plugins: ['react', 'sonarjs'],
  rules: {
    'react/jsx-filename-extension': [0],
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          kebabCase: true,
        },
      },
    ],
  },
  globals: {
    test: 'readonly',
    expect: 'readonly',
  },
};
