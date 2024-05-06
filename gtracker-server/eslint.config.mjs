// @ts-check

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: { 
      globals: {...globals.browser, ...globals.node} 
    },
    files: ['**/*.ts'],
  },
  eslintConfigPrettier
  // ...
);