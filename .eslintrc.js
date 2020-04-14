// module.exports = {
//   env: {
//     node: true,
//     es6: true,
//   },
//   parser: 'babel-eslint',
//   extends: ['plugin:react/recommended', 'airbnb'],
//   globals: {
//     Atomics: 'readonly',
//     SharedArrayBuffer: 'readonly',
//   },
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//     ecmaVersion: 2018,
//     sourceType: 'module',
//   },
//   plugins: ['react'],
//   rules: {
//     'react/jsx-filename-extension': 'off',
//   },
// };

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'nonblock-statement-body-position': 'off',
  },
  globals: {
    fetch: false,
  },
};
