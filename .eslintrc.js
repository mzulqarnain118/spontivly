module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:testing-library/react',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json']
  },
  plugins: ['react', 'import', 'prettier', '@typescript-eslint'],
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/']
      },
      typescript: { alwaysTryTypes: true }
    }
  },
  ignorePatterns: ['react-app-env.d.ts'],
  rules: {
    semi: ['error', 'never'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'import/no-default-export': 'error',
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'import/order': [
      'error',
      {
        alphabetize: { caseInsensitive: true, order: 'asc' },
        groups: ['builtin', 'external', 'internal', 'index', 'parent', 'sibling', 'object', 'type']
      }
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'block' },
      { blankLine: 'always', prev: 'block', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
    ],
    'prettier/prettier': ['warn', require('./.prettierrc.js')]
  },
  settings: {
    jest: {
      version: 29
    },
    react: {
      version: '18.2.0'
    }
  },
  "ignorePatterns": [
    "dist",
    ".eslintrc.js",
    "postcss.config.js",
    "src/**/*.test.js",
    "src/**/*.test.ts",
    "vite-env.d.ts",
    "vite-config.ts"
],
}
