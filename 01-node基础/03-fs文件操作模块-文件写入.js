// fs 文件操作模块
// 文件写入
// fs.writeFile(path,内容,[编码],function(err){
// if(err){
// console.log(err)
// return
//}
// console.log('写入成功')
//})

// 注意：
// 1、 文件写入会 覆盖之前的内容
// 2、 文件写入时，文件名写错/指定路径下文件不存在，不会报错，而会生成对应的文件

const fs = require('fs')
let data = '胡图图'
fs.writeFile('./data.txt', data, err => {
  if (err) {
    return console.log(err)
  }
  console.log('写入成功')
})

// 文件名写错
fs.writeFile('./text.txt', data, err => {
  if (err) {
    return console.log(err)
  }
  console.log('写入成功')
})
