module.exports = {
    ignorePatterns: ['.eslintrc.js', 'node_modules/', 'dist/'],
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: ['./tsconfig.eslint.json'],
      tsconfigRootDir: __dirname,
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'import', 'prettier'],
    extends: [
      'airbnb-base',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/typescript',
      'prettier',
    ],
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.eslint.json'],
        },
        node: {
          paths: ['node_modules'],
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      },
    },
    env: {
      node: true,
      jest: true,
    },
    rules: {
      // Disable base rules
      "new-cap": "off",
      "max-classes-per-file": "off",
      "linebreak-style": ["error", "unix"],
      'no-useless-constructor': 'off',
      'no-empty-function': 'off',
      "no-underscore-dangle": [
        "error",
        { "allow": ["_id"] }
      ],
      // Enable TypeScript-specific rules
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-empty-function': [
        'error',
        {
          allow: ['constructors'],
        },
      ],
      'import/no-cycle': 'off',

      // Other general rules
      'no-console': 'off',
      'no-shadow': 'off',
      'class-methods-use-this': 'off',
      'import/prefer-default-export': 'off',

      // TypeScript-specific rules
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/no-unused-vars': ['warn'],

      // Import plugin rules
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/no-unresolved': 'error',
      'import/no-extraneous-dependencies': 'off',

      // Prettier
      'prettier/prettier': 'error',
    },

    overrides: [
      {
        files: ['**/*.test.ts', '**/*.spec.ts'],
        rules: {
          // Allow importing devDependencies in test files
          'import/no-extraneous-dependencies': [
            'error',
            {
              devDependencies: true,
              optionalDependencies: false,
              peerDependencies: false,
            },
          ],
        },
      },
    ],
};
