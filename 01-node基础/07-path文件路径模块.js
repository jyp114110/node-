// path 文件路径模块
// 在不同的操作系统中，路径分隔符也不一样
// window系统中 \
// 其他系统     /
// 因此，我们直接使用字符串拼接的话，不能实现操作系统之间的兼容
//  为了解决这个问题，node 中提供了 path 模块
const fs = require('fs')
const path = require('path')
console.log(__dirname)
fs.readFile(__dirname + '/data.txt', 'utf-8', (err, data) => {
  if (err) {
    return console.log(err)
  }

  console.log(data)
})
