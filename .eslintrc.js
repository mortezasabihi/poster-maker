module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', 'prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', { anonymous: 'ignore', named: 'always' }],
    'func-names': ['error', 'never'],
    'import/extensions': [0, 'never'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['./tailwind.config.js'] }],
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    react: {
      version: 'detect'
    }
  }
};
