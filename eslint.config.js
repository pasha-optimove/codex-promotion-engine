import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ...js.configs.recommended,
    ignores: ['client'],
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
];
