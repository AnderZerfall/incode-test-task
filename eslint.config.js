import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig, // This is a config, so it goes under "extends"
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react, // We register the "eslint-plugin-react" plugin
      prettier,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      'prefer-const': 2,
      'curly': [2, 'all'],
      'no-redeclare': [2, { builtinGlobals: true }],
      'operator-linebreak': 0,
      'brace-style': [2, '1tbs'],
      'arrow-body-style': 0,
      'arrow-parens': 0,
      'no-param-reassign': [2, { props: true }],
      'padding-line-between-statements': [
        2,
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
      ],
      'max-len': [
        'error',
        {
          code: 80,
          tabWidth: 2,
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true, minProperties: 3 },
          ObjectPattern: { multiline: true, minProperties: 3 },
          ImportDeclaration: { multiline: true, minProperties: 3 },
          ExportDeclaration: { multiline: true, minProperties: 3 },
        },
      ],
      'implicit-arrow-linebreak:': 0,
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules, // This way we use recommended set of rules from "eslint-plugin-react" plugin
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 0,
      'import/prefer-default-export': 0,
      'standard/no-callback-literal': 0,
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'react/destructuring-assignment': 0,
      'react/jsx-props-no-spreading': 0,
      'react/state-in-constructor': [2, 'never'],
      'react-hooks/rules-of-hooks': 2,
      'indent': ['error', 2], // Use base indent rule instead
      '@typescript-eslint/no-unused-vars': ['error'],
    },
  },
);