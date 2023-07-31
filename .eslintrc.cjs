module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: 'semistandard',
  overrides: [
    {
      env: {
        browser: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'linebreak-style': [
      'error',
      'windows'
    ],
    curly: [
      'warn'
    ],
    quotes: [
      'warn',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
    'no-unused-vars': [
      'warn'
    ]
  }
};
