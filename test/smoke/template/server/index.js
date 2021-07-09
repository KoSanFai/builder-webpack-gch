/* hack: node端运行本地打的包时报错：window is not defined */
if (typeof window === 'undefined') {
  global.window = {}
}
const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/search-server'); // 必须配置 output.libraryTarget 为 umd

const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8')
const data = require('./data.json')

const renderMarkup = str => {
  const dataStr = JSON.stringify(data)
  return template.replace('<!--HTML_PLACEHOLDER-->', str)
    .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data=${dataStr}</script>`)
};

const server = (port) => {
  const app = express();

  app.use(express.static('dist'));

  app.get('/search', (req, res) => {
    console.log('search...')
    const html = renderMarkup(renderToString(SSR))
    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

server(process.env.PORT || 3000);
