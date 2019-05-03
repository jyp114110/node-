const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const app = express()
app.engine('html', require('express-art-template')) //引入并设置模板引擎
app.set('views', 'pages') // 设置 模板所在目录
app.use(bodyParser.urlencoded())

app.use('/assets', express.static('assets')) // 静态资源托管
app.use(router)

app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
