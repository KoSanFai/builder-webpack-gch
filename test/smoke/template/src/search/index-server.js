// SSR时必须使用 require, 不能用 import
const React = require('react');
const largeNumberCalc = require('large-number-calc');
// SSR构建时由于 style-loader 需要使用 document 插入 style 标签，所以会报错
// 所以要用 MiniCssExtractPlugin 单独提取出 css 文件
require('./index.less');
// const { common } = require('../../common');

// console.log(common());

function Search() {
  const num = largeNumberCalc('9999', '2');
  return (
    <div>
      {num}
      搜索引擎
    </div>
  );
};

module.exports = <Search />; // 需导出 标签
