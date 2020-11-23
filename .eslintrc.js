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
    'comma-dangle': 0,
    'react/jsx-props-no-spreading': 0,
    'unicorn/prevent-abbreviations': 0,
    'unicorn/no-fn-reference-in-iterator': 0,
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': 0
  },
  globals: {
    test: 'readonly',
    expect: 'readonly',
    jest: 'readonly',
    describe: 'readonly',
    beforeEach: 'readonly',
    afterEach: 'readonly',
    it: 'readonly',
    render: 'readonly',
    sinon: 'readonly',
    act: 'readonly',
    fireEvent: 'readonly',
    waitFor: 'readonly',
    mount: 'readonly',
    shallow: 'readonly'
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src']
      }
    }
  }
};
