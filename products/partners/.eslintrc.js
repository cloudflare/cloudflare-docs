module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  "rules": {
    /* Don’t require <html lang/> for proxy elements in https://github.com/nfl/react-helmet */
    "jsx-a11y/html-has-lang": 0
  }
}
