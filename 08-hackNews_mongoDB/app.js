const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()

app.use(bodyParser.urlencoded())
app.engine('html', require('express-art-template'))
app.set('views', 'pages')
app.use('/assets', express.static('assets'))
app.use(router)

app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
