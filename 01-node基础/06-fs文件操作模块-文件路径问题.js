//  fs模块操作文件时，如果写的时相对路径，相对路径是相对于 node 命令 执行的位置，而不是相对于 js文件的位置
//  因此，推荐使用 绝对路径 (__dirname)

const fs = require('fs')
fs.readFile('./data.txt', 'utf-8', (err, data) => {
  console.log(data)
})
