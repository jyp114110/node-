// fs 文件操作模块
// 文件追加
// fs.appendFile(path,内容,[编码],function(err){})

// 注意：
// 1、 文件追加不会产生 文件内容被覆盖的问题
// 2、文件名写错/路径下文件不存在，不会报错，会产生对应的文件
const fs = require('fs')
let data = '金笨笨'
fs.appendFile('./data.txt', data, err => {
  if (err) {
    return console.log(err)
  }
  console.log('追加成功')
})
