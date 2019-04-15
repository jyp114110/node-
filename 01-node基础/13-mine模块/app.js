//  mine模块 是第三方模块 需 npm i 进行下载，引入后 再使用
// 作用： 给服务器返回的文件 设置 具体的 content-type 属性，从而使得 浏览器 能够以正确的格式解析文件
const mime = require('mime')
const fs = require('fs')
const path = require('path')
const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  res.setHeader('content-type', mime.getType(req.url))
  fs.readFile(path.join(__dirname, 'pages', req.url), (err, data) => {
    if (err) {
      return console.log(err)
    }

    res.end(data)
  })
})

server.listen(9999, () =>
  console.log('http://localhost:9999/index.html 服务器已启动')
)
