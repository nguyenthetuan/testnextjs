module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: ['react', 'jsx-a11y', 'import'],
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      experimentalDecorators: true
    }
  },
  rules: {
    "eol-last": 0,
    'max-len': 0,
    cammelcase: 0,
    camelcase: 0,
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 0,
    'react/prop-types': 0,
    'react/destructuring-assignment': 0,
    indent: 'warn',
    'react/jsx-one-expression-per-line': 0,
    'arrow-parens': 0,
    'no-trailing-spaces': 0,
    'comma-dangle': 0,
    'prefer-destructuring': 0,
    'import/no-dynamic-require': 0,
    'import/prefer-default-export': 0,
    'no-console': 0,
    'arrow-body-style': 0,
    'implicit-arrow-linebreak': 0,
    'object-shorthand': 0,
    'object-curly-newline': 0,
    'no-unused-vars': 0,
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-underscore-dangle': 0,
    'jsx-a11y/label-has-for': 0,
    'linebreak-style': 0,
    'react/no-unescaped-entities': 0,
    'react/no-this-in-sfc': 0,
    'react/no-array-index-key': 0,
    'jsx-a11y/interactive-supports-focus': [
      'error',
      {
        tabbable: ['button', 'checkbox', 'link', 'searchbox', 'spinbutton', 'switch', 'textbox', 'menuitem']
      }
    ],
    'space-before-function-paren': 0,
    'no-plusplus': 0,
    'react/no-unused-state': 'warn',
    'prefer-const': 0,
    'react/forbid-prop-types': 0,
    'react/no-unescaped-entities': 0,
    'react/no-this-in-sfc': 0,
    'react/no-array-index-key': 0,
    'react/button-has-type': 0,
    'react/jsx-closing-tag-location': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'array-callback-return': 0,
    'react/no-access-state-in-setstate': 0,
    'operator-linebreak': 0,
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 0,
    'no-param-reassign': 0,
    'react/no-danger': 0
  }
};
