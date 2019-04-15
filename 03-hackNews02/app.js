const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const template = require('art-template')
const url = require('url')

const server = http.createServer()

server.on('request', (req, res) => {
  console.log(req.url)
  res.setHeader('content-type', 'text/html;charset=utf-8')
  // res.setHeader('content-type', 'text/html;charset=utf-8')
  if (req.url.startsWith('/index') || req.url === '/') {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
      if (err) {
        return console.log(err)
      }
      data = JSON.parse(data) // 将 json 数据转化Wie 对象
      let str = template(path.join(__dirname, 'views', 'index.html'), data)
      res.end(str)
    })
  } else if (req.url.startsWith('/details')) {
    // console.log(url.parse(req.url, true))

    let id = Number(url.parse(req.url, true).query.id)
    console.log(id)
    fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
      if (err) {
        return console.log(err)
      }
      data = JSON.parse(data)
      console.log(data.list)
      data = data.list.filter(item => item.id === id)[0]
      // console.log(data[0])

      let str = template(path.join(__dirname, 'views', 'details.html'), data)
      res.end(str)
    })
  } else if (req.url.startsWith('/submit')) {
    fs.readFile(path.join(__dirname, 'views', 'submit.html'), (err, data) => {
      if (err) {
        return console.log(err)
      }
      res.end(data)
    })
  } else if (req.url.startsWith('/assets')) {
    res.setHeader('content-type', mime.getType(req.url))
    fs.readFile(path.join(__dirname, req.url), (err, data) => {
      if (err) {
        return console.log(err)
      }
      res.end(data)
    })
  } else {
    res.end('404-页面未找到')
  }
})

server.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
