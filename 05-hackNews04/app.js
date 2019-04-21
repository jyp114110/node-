const http = require('http')
const mime = require('mime')
const ruoter = require('./router')
const server = http.createServer()

server.on('request', (req, res) => {
  res.setHeader('content-type', mime.getType(req.url))
  ruoter(req, res)
})
server.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))

// 读数据
// function readData(callback) {
//   fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
//     if (err) console.log(err)
//     data = JSON.parse(data)
//     callback && callback(data)
//   })
// }

// 写入数据
// function writeData(data, callback) {
//   fs.writeFile(path.join(__dirname, 'data', 'data.json'), data, err => {
//     if (err) console.log(err)
//     callback && callback()
//   })
// }
