import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact, { rules } from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  {
    plugins: {},
    rules: { 'no-console': 'warn' },
  },
];
