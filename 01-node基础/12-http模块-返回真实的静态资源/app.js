// 返回真实的静态资源
//  fs 模块读取文件时，路径不能写死。即，path.join (__dirname,'pages',req.ulr) 的最后一部分写成 req.url

const fs = require('fs')
const path = require('path')
const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  console.log(req.url)
  // res.setHeader('content-type', 'text/html;charset=uft-8')

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
