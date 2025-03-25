import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      js,
    },
    languageOptions: { globals: globals.browser },
    extends: ['js/recommended'],
  },
  tseslint.configs.recommended,
  eslintConfigPrettier,
]);
