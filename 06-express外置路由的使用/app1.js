const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded())
app.post('/list.html', (req, res) => {
  console.log(req.body)
})
app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
