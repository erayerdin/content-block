import js from "@eslint/js";
import eslintConfigPrettierFlat from "eslint-config-prettier/flat";
import perfectionist from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["build", "node_modules", "assets", ".wxt", ".output"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["node_modules", ".output", ".wxt"],
    ...react.configs.flat.all,
    rules: {
      ...react.configs.flat.all.rules,
      "react/forbid-component-props": "off",
      "react/function-component-definition": "off",
      "react/jsx-filename-extension": "off",
      "react/jsx-indent": "off",
      "react/jsx-indent-props": "off",
      "react/jsx-max-depth": ["error", { max: 5 }],
      "react/jsx-newline": "off",
      "react/jsx-no-bind": "off",
      "react/jsx-no-literals": "off",
      "react/jsx-one-expression-per-line": "off",
      "react/no-multi-comp": "off",
      "react/react-in-jsx-scope": "off",
      "react/require-default-props": "off",
    },
  },
  // {
  //   extends: [js.configs.recommended, ...tseslint.configs.recommended],
  //   files: ["tests/**/*.{ts,tsx}"],
  //   languageOptions: {
  //     ecmaVersion: 2020,
  //     globals: globals.browser,
  //   },
  //   rules: {
  //     "no-empty-pattern": "off",
  //   },
  // },
  perfectionist.configs["recommended-natural"],
  {
    ...sonarjs.configs.recommended,
    rules: {
      ...sonarjs.configs.recommended.rules,
      "sonarjs/no-commented-code": "warn",
      "sonarjs/no-nested-functions": "warn",
      "sonarjs/todo-tag": "warn",
    },
  },
  eslintConfigPrettierFlat
);
