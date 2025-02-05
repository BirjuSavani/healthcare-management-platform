import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  // Base JavaScript rules
  js.configs.recommended,

  // TypeScript recommended rules from the plugin (directly use the plugin)
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: 'tsconfig.json', // Reference to your tsconfig.json
        tsconfigRootDir: process.cwd(), // Current directory as root
        sourceType: 'module' // Using ES modules
      },
      globals: {
        process: true,
        __dirname: true,
        __filename: true,
        console: true,
        Express: 'writable'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier
    },
    rules: {
      // TypeScript ESLint Rules
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-invalid-this': 'off',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/return-await': 'warn',
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'default', format: ['strictCamelCase'] },
        { selector: 'import', format: ['camelCase', 'PascalCase'] },
        { selector: 'variable', format: ['strictCamelCase', 'UPPER_CASE', 'PascalCase'] },
        { selector: 'parameter', modifiers: ['unused'], format: ['strictCamelCase'], leadingUnderscore: 'allow' },
        { selector: 'property', format: null },
        { selector: 'typeProperty', format: null },
        { selector: 'typeLike', format: ['StrictPascalCase'] },
        { selector: 'enumMember', format: ['UPPER_CASE'] },
        { selector: 'interface', format: ['StrictPascalCase'], prefix: ['I'] },
        { selector: 'function', format: ['strictCamelCase', 'snake_case'], leadingUnderscore: 'allow' }
      ],

      // General ESLint Rules
      'no-useless-return': 'error',
      'no-constant-condition': 'warn',
      'max-len': ['error', { code: 180 }],
      'max-lines': ['error', { max: 1000 }],
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
      'no-console': 'error',
      'keyword-spacing': 'error',
      'no-nested-ternary': 2,
      'no-undef': 'error',
      'no-whitespace-before-property': 'error',
      'nonblock-statement-body-position': 'error',
      'no-mixed-operators': 'error'
    }
  },
  // Override for test files
  {
    files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
    languageOptions: {
      env: { jest: true }
    },
    rules: {}
  },
  {
    ignores: ['dist/', 'db-migration/', 'eslint.config.mjs']
  }
];
