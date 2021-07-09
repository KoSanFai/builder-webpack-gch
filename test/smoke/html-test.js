const glob = require('glob-all')

// describe 描述要测试的文件
describe('Checking generated html files', () => {
  // 一个 it 代表一个测试用例
  it('should generate html files', (done) => {
    const files = glob.sync([
      './dist/index.html',
      './dist/search.html'
    ])

    if (files.length > 0) {
      done()
    } else {
      throw new Error('No html files generated')
    }
  })
})