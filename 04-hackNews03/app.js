const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const template = require('art-template')
const server = http.createServer()
const url = require('url')
const queryString = require('querystring')
server.on('request', (req, res) => {
  res.setHeader('content-type', mime.getType(req.url))
  if (req.url.startsWith('/index') || req.url === '/') {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
      if (err) {
        return console.log(err)
      }
      data = JSON.parse(data)
      let str = template(path.join(__dirname, 'views', 'index.html'), data)
      res.end(str)
    })
  } else if (req.url.startsWith('/details')) {
    let id = url.parse(req.url, true).query.id
    fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
      if (err) {
        return console.log(err)
      }
      let list = JSON.parse(data).list
      let dataObj = list.filter(item => item.id == id)[0]
      let str = template(path.join(__dirname, 'views', 'details.html'), dataObj)
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
    fs.readFile(path.join(__dirname, req.url), (err, data) => {
      if (err) {
        return console.log(err)
      }
      res.end(data)
    })
  } else {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.end('404-页面未找到')
  }
})

server.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
