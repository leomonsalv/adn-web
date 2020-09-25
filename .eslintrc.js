module.exports = {
  env: {
    browser: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:sonarjs/recommended',
    'airbnb',
    'plugin:unicorn/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: '2020',
    sourceType: 'module'
  },
  plugins: ['react', 'sonarjs'],
  rules: {
    'react/jsx-filename-extension': [0],
    'unicorn/filename-case': [0],
    'linebreak-style': 0,
    'comma-dangle': 0
  },
  globals: {
    test: 'readonly',
    expect: 'readonly'
  }
};
