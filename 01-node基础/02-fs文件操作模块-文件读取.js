// fs 文件操作模块
// 需先引入 再使用
const fs = require('fs')

// 1- 文件读取
// fs.readFile(path,[编码],function(err,data){
// err: 文件读取失败时，返回
// data: 文件读取成功时，数据
//})
// 注意： fs.readFile 读取成功时，返回的 data 是一个 buffer(二进制的对象) ，需要使用 toString 方法 进行转换
fs.readFile('./data.txt', (err, data) => {
  if (err) {
    return console.log(err)
  }
  console.log(data)
  console.log(data.toString())
})

//  文件读取失败
fs.readFile('../data.txt', (err, data) => {
  if (err) {
    return console.log(err)
  }
})
