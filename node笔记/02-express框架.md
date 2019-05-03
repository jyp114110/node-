# express框架

​	基于 node.js 平台，快速、开放、极简的 web 开发框架。

## 一、 安装

- 第一步：初始化项目

```js
npm init  -y // 快速初始化项目
```

​	使用`npm init`命令为应用程序创建`package.json`文件。

- 第二步：安装 `express`

```js
npm install express
// or
npm install express --save
```

> 采用 `save` 选项安装 node 模块 已添加到 `package.json` 中的`dependencies`列表。今后运行pp`app.js` 目录中的 `npm install` 将自动安装依赖项列表中的模块。

## 二、基本使用：Hello World 示例

```js
// 第一步： 引入 express
const express = require('express')

// 第二步： 创建服务器
const app = express()

// 第三步： 注册事件，处理请求 => 处理路由
app.get('/',(req,req)=>{
    res.end('GET-Hello World')
})
	// or
app.post('/',(req,res)=>{
    res.end('POST-Hello World')
})

// 第四步： 设置端口号，开启服务
app.listen(9999,()=>console.log('服务器开启'))
```

## 三、express中 路由处理的三种方式

### (一) METHOD

#### 1、基本语法

```js
app.METHOD(url,callback)
```

- 1、监听 **特定** 的请求方式
- 2、**精确** 匹配 `url`  地址 

#### 2、具体使用

```JS
// GET
app.get('/index',(req,res)=>{
    res.end('GET请求')
})

// POST
app.post('/index',(req,res)=>{
    res.end('POST请求')
})
// 注意：由于是精确匹配，所以只能匹配到 /index; 且无法匹配到 index.html
```

### (二) ALL

#### 1、基本语法

```js
app.all(url,callback)
```

- 1、监听 **任意** 的请求方式
- 2、**精确匹配** `url` 地址

#### 2、具体用法

```js
app.all('/index',(req,res)=>{
    res.end('访问了 index') // GET、POST 均可 监听到
})
// 注意：由于是精确匹配，所以只能匹配到 /index; 且无法匹配到 index.html
```

### (三) USE

#### 1、基本语法

```js
app.use(url,callback)
```

- 1、监听**任意**的请求方式
- 2、**模糊匹配** `url`  地址 => 监听以指定 `url` **开头**的请求
- 3、参数`url` 可以省略不写，默认值为 `/`
- 4、`url` 不包含在 `req.url` 中，它只是匹配条件

```js
// 请求地址为： /index/aa/bb/cc.html
app.use('/index',(req,res)=>{
    console.log(req.url) // aa/bb/cc.html , 不包含 /index
})
```

## 四、request 和 response 对象的扩展

### (一) request 对象的扩展

#### 1、node 原生 request 对象中的方法

``` js
request.url // 请求地址
request.mdthod // 请求方式
request.headers // 请求头
```

#### 2、express 新增 request 方法

**(1) 处理 get 请求 提交的数据**

```js
request.query
// 相当于 
url.parse(req.url,true)
```

**(2) 处理 post 请求 提交的数据**

```js
request.body
// 相当于
let info = ''
request.on('data',chunk => {
    info += chunk
})
request('end',()=>{
   info = queryString.parse(info)
})
```

**注意：**

​	`request.body`默认值是`undefined`.需要利用`body-parse`中间件，进行手动赋值。

### (二) response 对象的扩展

#### 1、node 原生 response 对象中的方法

```js
res.statusCode = 302 // 设置响应码
res.statusMessage = 'Not Found' // 设置响应信息
res.setHeader('content-type','text/html;charset=utf-8') // 设置响应头
res.write(data) // 设置响应主体
res.end() // 告知浏览器响应结束
```

#### 2、express 中新增response 方法

```js
res.status(302) // 设置状态码
// 相当于
res.statusCode = 302
```

```js
res.set('content-type','text/html;charset=utf-8') // 设置响应头
// 相当于
res.setHeader('content-type','text/html;charset=utf-8')
```

```js
res.send(data) // 设置响应主体，并自动设置 MIME 类型
// 相当于
res.setHeader('content-type','text/html;charset=utf-8')
res.end(data)
```

```js
res.sendFile(path,[,option],[,function]) // 返回文件
// 相当于 fs.readFile 读取文件 + 设置 MIME 类型 + res.end()
```

````js
res.redirect('/index') // 页面重定向
// 相当于
res.statusCode = 302
res.setHeader('location','/index')
````

## 五、express中的静态资源托管

- 对于静态资源直接读取资源返回即可

```js
response.sendFile(path.join(__dirname,'pages',request.url))
```

- express中提供了**内置中间件函数**，处理诸如图片、CSS文件和 JavaScript文件之类的静态文件

#### 1、基本语法

```js
express.static(静态资源所在目录)
```

#### 2、基本使用

```js
app.use(express.static('public')) // localhost:9999/350.jpg  => 在public目录下找350.jpg
// 优化：
app.use('/public',express.static('public')) // localhost:9999/public/350.jpg => 在public目录下找350.jpg
// app.use(url,callback) =>  req.url 不包含 url， url 只是匹配条件
```

## 六、中间件

### (一) 中间件的介绍

#### 1、中间件的功能

- 可以接收上一个中间件的处理结果
- 可以将自身的处理结果传递给下一个中间件

#### 2、express中的中间件

- 其实质是一个函数
- 其作用是给 `request`  和 `response`  扩展功能的（添加属性和方法）

**基本使用**：

```js
const express = require('express')
const app = express()
// 中间件实质上是一个函数
express.use((req,res,next)=>{
    req.aa = 'aa'
    req.say = function(){
        console.log('hello')
	}
    // 不做任何处理的话 悬挂
    // 1、终止请求
    res.send('中间件返回响应')
    // or
    // 2、将本次执行的结果传递给下一个中间件
    next()
})
app.get('/index',(req,res,next)=>{
	// 接收上一个中间件处理的结果
    console.log(req.aa)
    console.log(req.say)
    
    res.send('请求处理结束')
})

app.listen(9999,()=>console.log('服务器已开启'))
```

### (二) 中间件`body-parser`的使用

- 作用：给 `request.body `赋值
- 第一步： 下载 `npm i body-parser`
- 第二步： 使用

```js
const express = express
const bodyParser = require('body-pareser')
const app = express()

app.use(bodyParser.urlencoded())
app.use('./index',(req,res)=>{
    console.log(req.body)
    res.send('use')
})

app.listen(9999,()=>console.log('服务器开启'))
```

**注意： 提示信息**

![03-bodyParser提示信息](G:\自学代码\node\node笔记\images\03-bodyParser提示信息.png)

## 七、外部路由的处理

​	express 框架中内置了路由处理方法。

**使用步骤：**

````js
// 1、引入 express
const express = require('express')
// 2、创建路由实例
const router = express.Router()
// 3、处理路由
router.get('/index',(req,res)=>{})
// 4、导出路由
module.export =  router
````



## 补充：

### (一) express中模板引擎的使用

**使用步骤：**

- 第一步： 下载模板引擎

```js
npm i express-art-template
```

- 第二步：配置：告诉express 使用哪个模版引擎

```js
// app.egine(模板后缀名,要使用的模板)
express.engine('html',require('express-art-template'))
```

- 第三步：设置默认目录

在express中，模版引擎默认会去`views`目录查找模版文件， 一般我们需要修改模块的默认目录

```js
// app.set('views',模板目录名)
app.set('views','pages')
```

- 第四步：模板渲染

```js
// res.render(模板,数据)
res.render('./index.html',obj)
```



