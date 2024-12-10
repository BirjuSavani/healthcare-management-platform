module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  globals: {
    process: true,
    __dirname: true,
    console: true,
    Express: 'writable',
  },
  rules: {
    'no-console': [
      'error',
      {
        allow: [], // Explicitly empty allow array to block all console methods
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [],
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
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
          {
            selector: 'default',
            format: ['strictCamelCase'],
          },
          {
            selector: 'import',
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: 'variable',
            format: ['strictCamelCase', 'UPPER_CASE', 'PascalCase'],
          },
          {
            selector: 'parameter',
            modifiers: ['unused'],
            format: ['strictCamelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'property',
            format: null,
          },
          {
            selector: 'typeProperty',
            format: null,
          },
          {
            selector: 'typeLike',
            format: ['StrictPascalCase'],
          },
          {
            selector: 'enumMember',
            format: ['UPPER_CASE'],
          },
          {
            selector: 'interface',
            format: ['StrictPascalCase'],
            prefix: ['I'],
          },
          {
            selector: 'function',
            format: ['strictCamelCase'],
            leadingUnderscore: 'allow',
          },
        ],
        'no-useless-return': 'error',
        'no-constant-condition': 'warn',
        'max-len': [
          'error',
          {
            code: 120,
          },
        ],
        'max-lines': [
          'error',
          {
            max: 1000,
          },
        ],
        'no-multiple-empty-lines': [
          'error',
          {
            max: 2,
            maxEOF: 1,
          },
        ],
        'no-console': ['error', { allow: [] }],
        'keyword-spacing': 'error',
        'no-nested-ternary': 2,
        'no-undef': 'error',
        'no-whitespace-before-property': 'error',
        'nonblock-statement-body-position': 'error',
        'no-mixed-operators': 'error',
      },
    },
    {
      files: ['*.js', '*.jsx'],
      extends: [],
      rules: {},
    },
    {
      files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
      env: {
        jest: true,
      },
      rules: {},
    },
  ],
};
