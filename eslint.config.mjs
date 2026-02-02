import { FlatCompat } from '@eslint/eslintrc';
import nextConfig from 'eslint-config-next/core-web-vitals';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...nextConfig,
  ...compat.plugins('import-helpers'),
  {
    rules: {
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            ['/^react/'],
            ['/^next/'],
            ['module'],
            ['/^@//'],
            ['/^~/'],
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: {
            order: 'asc',
            ignoreCase: true,
          },
        },
      ],
      'no-console': [
        'error',
        {
          allow: ['error', 'warn'],
        },
      ],
      'react/hook-use-state': 'warn',
      'react/jsx-boolean-value': 'warn',
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
          propElementValues: 'always',
        },
      ],
      'react/jsx-fragments': 'warn',
      'react/jsx-newline': 'warn',
      'react/jsx-no-target-blank': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
      'react/no-unused-prop-types': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: join(__dirname, 'tsconfig.json'),
      },
    },
    rules: {
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': 'allow-with-description',
        },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
    },
  },
];

export default eslintConfig;
