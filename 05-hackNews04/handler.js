const fs = require('fs')
const path = require('path')
const template = require('art-template')
const url = require('url')
const queryString = require('querystring')
module.exports = {
  showIndex(req, res) {
    readData(data => {
      let str = template(path.join(__dirname, 'views', 'index.html'), data)
      res.end(str)
    })
  },
  showSubmit(req, res) {
    // 提交页
    fs.readFile(path.join(__dirname, 'views', 'submit.html'), (err, data) => {
      res.end(data)
    })
  },
  showDetails(req, res) {
    readData(data => {
      let id = url.parse(req.url, true).query.id
      let list = data.list.filter(item => item.id == id)[0]
      let str = template(path.join(__dirname, 'views', 'details.html'), list)
      res.end(str)
    })
  },
  showAssets(req, res) {
    fs.readFile(path.join(__dirname, req.url), (err, data) => {
      if (err) console.log(err)
      res.end(data)
    })
  },
  add(req, res) {
    let info = ''
    req.on('data', chunk => {
      info += chunk
    })

    req.on('end', () => {
      info = queryString.parse(info)
      readData(data => {
        if (data.list.length > 0) {
          info.id = data.list[data.list.length - 1].id + 1
        } else {
          info.id = 1
        }
        data.list.push(info)
        data = JSON.stringify(data, null, 2)
        writeData(data, () => {
          res.statusCode = 302
          res.setHeader('location', '/index')
          res.end()
        })
      })
    })
  },
  notFound(req, res) {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.end('404-Not found')
  }
}
// 读数据
function readData(callback) {
  fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
    if (err) console.log(err)
    data = JSON.parse(data)
    callback && callback(data)
  })
}

// 写入数据
function writeData(data, callback) {
  fs.writeFile(path.join(__dirname, 'data', 'data.json'), data, err => {
    if (err) console.log(err)
    callback && callback()
  })
}
