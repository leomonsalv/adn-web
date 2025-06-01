import pluginQuery from '@tanstack/eslint-plugin-query';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // Apply recommended query rules
  ...pluginQuery.configs['flat/recommended'],

  // Apply prettier config to disable conflicting rules
  eslintConfigPrettier,

  // Global configuration
  {
    ignores: ['.next/*', 'node_modules/*', 'dist/*', 'build/*', '*.config.js', '*.config.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Add any custom rules here
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
];
