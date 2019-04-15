const fs = require('fs')
// 文件重命名
fs.rename('./data', './data02.txt', function(err) {
  if (err) {
    return console.log('重命名失败')
  }
  console.log('重命名成功')
})

// 文件删除
fs.unlink('./text.txt', err => {
  if (err) {
    return console.log('删除失败')
  }
  console.log('删除成功')
})
