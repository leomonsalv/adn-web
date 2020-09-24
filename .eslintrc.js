module.exports = {
  env: {
    browser: true,
  },
  extends: ['plugin:react/recommended', 'plugin:sonarjs/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: '2020',
    sourceType: 'module',
  },
  plugins: ['react', 'sonarjs'],
  rules: { 'react/jsx-filename-extension': [0] },
  globals: {
    test: 'readonly',
    expect: 'readonly',
  },
};
