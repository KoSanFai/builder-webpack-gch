const assert = require('assert')

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base')
  console.log(baseConfig)

  it('entry', () => {
    assert.equal(baseConfig.entry.index, 'C:/Users/Admin/Desktop/LEARN/GeekWebpack/builder-webpack-gch/test/smoke/template/src/index/index.js')
    assert.equal(baseConfig.entry.search, 'C:/Users/Admin/Desktop/LEARN/GeekWebpack/builder-webpack-gch/test/smoke/template/src/search/index.js')
  })
})