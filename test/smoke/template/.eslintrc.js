module.exports = {
  parser: "babel-eslint",
  extends: "airbnb",
  env: {
    browser: true,
    node: true,
  },
  // 在 airbnb 的基础上拓展自己的配置
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"], // windows系统问题 Expected linebreaks to be 'LF' but found 'CRLF'  linebreak-style
    "react/jsx-filename-extension": [1, { allow: "as-needed" }], // JSX not allowed in files with extension '.js'
    "jsx-a11y/no-static-element-interactions": [
      // Static HTML elements with event handlers require a role
      0,
      {
        handlers: [],
      },
    ],
    quotes: ["error", "single"],
  },
};
