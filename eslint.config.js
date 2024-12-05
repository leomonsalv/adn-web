import pluginQuery from '@tanstack/eslint-plugin-query'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  ...pluginQuery.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    ignores: ['.next/*'],
  },
  // Any other config...
]
