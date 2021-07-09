const path = require('path');

// 资源解析
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 目录清理
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 命令行信息显示优化
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// 多页面打包
const HtmlWebpackPlugin = require('html-webpack-plugin');

const glob = require('glob');
const autoprefixer = require('autoprefixer');

const projectRoot = process.cwd()
// 构建状态判断
const errorPlugin = () => function buildStatusPlugin() {
  // wbpack4
  this.hooks.done.tap('done', (stats) => {
    if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
      console.log('Build Error--KoSanFai'); // eslint-disable-line
      process.exit(1);
    }
  });

  // // webpack3
  // this.plugin('done', (stats) => {
  //   if (
  //     stats.compilation.errors &&
  //     stats.compilation.errors.length &&
  //     process.argv.indexOf('--watch') === -1
  //   ) {
  //     process.exit(1)
  //   }
  // })
};

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
  console.log('entryFiles: ', entryFiles); // eslint-disable-line
  entryFiles.map((entryFile) => {
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    return htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        inlineSource: '.css$',
        template: path.join(projectRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ['vendors', pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    );
  });

  // Object.keys(entryFiles).map(index => {
  //   const entryFile = entryFiles[index]
  //   const pageName = entryFile.match(/src\/(.*)\/index\.js/)
  //   entry[pageName] = entryFile
  // })

  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry: entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  // stats: 'errors-only', // production 设置 构建信息 输出
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          // 'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  browsers: [
                    'last 2 versions',
                    '> 1%',
                    'ios 7',
                  ],
                }),
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 1rem = 75px
              remPrecesion: 8, // px 转换为 rem 时,小数点位数
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log(stats.compilation.errors); // eslint-disable-line
          process.exit(1);
        }
      });
    },
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
  ].concat(htmlWebpackPlugins),
};
