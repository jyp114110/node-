# Node 基础知识

## 一、nodeJS 的概念

### (一)  什么是nodeJS

​	nodeJS 是 JavaScript 运行在服务端的环境。

### (二) nodeJS 与 浏览器的区别

#### 1、nodeJS 与 浏览器 的相同点

​	都能够解析 JavaScript

#### 2、 nodeJS 与浏览器的不同点

- nodeJS ： 无法使用 BOM 和 DOM 操作；
- 浏览器： 无法执行 nodeJS 中的文件操作系统

		![00-nodeJS和浏览器的异同点](G:\自学代码\node\node笔记\images\00-nodeJS和浏览器的异同点.png)

## 二、nodeJS常用模块

### (一) 核心模块

- **核心模块**：是 nodJS 本身就提供的模块，在 nodeJS 官网中罗列出来的模块
- 除了 `global` 全局模块，无须引入，可以直接使用外；其他模块需要引入后，再使用
- 常用的核心模块：
  - global 全局模块  【无须引入，直接使用】
  - fs 文件操作模块
  - path 文件路径模块
  - http 服务器模块
  - url 查询字符串模块

#### 1、global 全局模块

- `global` 是 nodeJS 中的一个全局变量（对象）
- `global` 中的方法和属性 在任何地方都可以直接使用，**无须引入**
- `global` 全局模块中，常用的方法：

```js
// console 系列
// setTimeout /clearTimout  延时器
// setIneterval / clearInterval 定时器
// __dirname  当前文件的绝对路径（执行nodeJS的文件所在的文件目录） ★★★
// __filename 当前文件的全名（执行nodeJS的文件的 绝对路径 + 文件名） ★
```

#### 2、fs 文件操作模块

- `fs`  须先引入，再使用

```js
const fs = require('fs')
```

- `fs` 用于对文件进行 **读取** 和 **写入**
- `fs` 文件操作模块中的常用方法：

##### **(1) 文件读取 `fs.readFile`**

```js
// path： 是文件路径
// 编码： 选写， 一般为 utf-8 
fs.readFile(path,[编码],(err,data)=>{
    if(err){
        // 读取失败
        return console.log(err)
    }
    console.log(data)
})
```

- 注意： `fs.readFile` 读取文件时，如果 **编码** 没有指定，会得到一个 **buffer** 对象（是一个**二进制**存储数据的数组）。 可以调用 **`toString() `** 方法将 buffer 对象 转换成 字符串。

  ​

##### (2) 文件写入 `fs.writeFile`

```js
// path: 文件路径
// content: 写入的内容
fs.writeFile(path,content,[编码],(err) =>{
    if(err) {
        return console.log(err)
    }
    console.log('文件写入成功')
})
```

注意：

- 1、`fs.writeFile` 写入内容时，会**覆盖**文件之前的内容
- 2、文件名写错 或者 指定路径的文件不存在，会生成对应的文件，**不会报错**

##### (3) 文件追加 `fs.appendFile`

- 1、`fs.appendFile` 文件追加，**不会覆盖**文件之前的内容
- 2、文件名写错 或者 指定路径的文件不存在，会生成对应的文件，**不会报错**

```js
fs.appendFile(path,content,[编码], (err)=>{
    if(err) {
        return console.log(err)
    }
    console.log('文件追加成功')
        
})
```

##### (4) 对文件的其他操作方法

```js
fs.rename(oldPath,newPath,callback) // 文件重命名
fs.unlink(path,callback) // 文件删除
fs.mkdir(path,mode,callback) // 创建文件夹
fs.rmdir(path,callback) // 删除文件夹
fs.readdir(path,callback) // 读取文件夹
```

##### 注意：

> fs 文件操作模块，在操作文件时，如果写的是 相对路径， 相对路径 是相对于 node命令 执行的位置，而不是相对于 js文件所在的位置
>
> 因此，推荐使用 绝对路径 【__dirname】
>
> ```js
> fs.readFile(__dirname+'/data.txt','utf-8',(err,data) => {
>     if(err) {
>     	return console.log(err)
> 	}
> 	console.log(data)
> })
> ```

#### 3、path 文件路径模块

- `path`  文件路径模块，须先引入，再使用

```js
const path = require('path')
```

- `path`  文件路径，是为了解决不同操作系统中 路径分割符 不一样的问题
  - window 系统中 `\`
  - 其他系统中 `/`

如果，我们直接使用字符串拼接，不能实现操作系统之间的兼容

为了解决这个问题，nodeJS 中 提供了 path文件路径模块

##### 常用方法

**(1) `path.join`**

```js
path.join(__dirname.'pages','data.txt') // 根据不同操作系统拼接出不同的路径分隔符，实现兼容
path.join(__dirname,'../','data.txt') // '../'表示的是 返回上一级目录
```

(2) 其他方法

```js
path.dirname(path) // 返回文件所在目录
path.basename(path) // 返回文件名
path.extname(path) // 返回文件的扩展名
```

#### 4、http 服务器模块

- 须先引入，再使用
- 在 node 中没有现成服务器，需要用代码创建服务器，我们可以使用 http 服务器模块来创建一个服务器，处理 http 请求

##### (1) 基本使用步骤

```js
// 第一步： 引入 http 服务器模块
const http = require('http') 

// 第二步： 创建一个服务器
const server = http.createServer()

// 第三步： 绑定事件，处理请求
server.on('request',(request,response) =>{
    // request 请求报文
    // response 响应报文
})

// 第四步：设置端口号，开启服务器
server.listen(9999,()=>console.log('服务器启动了'))
```

##### (2) `request` 请求报文 和 `response` 请求报文 详解

- `request`  请求报文

  - `request.url` 请求地址  => `/index`.....
  - `request.method`  请求方式 => `GET `   / `POST`
  - `request.header` 请求头信息

- `response` 响应报文

  - 1、响应行

  ```JS
  response.statusCode = '404'  // 设置响应码
  respose.statusMessage = 'Not Found' // 设置响应信息
  ```

  - 2、响应头

  ```js
  response.setHeader('content-type','text/html;charset=utf-8') // 设置响应头
  // 主要作用是：告知浏览器，需要解析的文件的 mine 类型 => 后面 mime模块 会详细讲解
  ```

  - 3、响应主体

    - 注意： 必须先设置响应头，才能设置响应体

  ```js
  response.write(data) // 响应内容
  response.end() // 告知浏览器 响应结束

  // 合写
  response.end(data)
  ```


##### (3) 根据不同的请求，返回不同的数据(页面)

> - 判断 request.url 地址，根据地址，读取对应的数据（文件），返回给浏览器进行解析
>
> ```js
> sever.on('request',(request,response) => {
>     response.setHeader('content-tpype','text/html;charset=utf-8') // contentType 属性写死了
>     fs.readFile(path.join(__dirname,'pages',request.url),(err,data)=>{
>         if(err) {
>             return console.log(err)
>         }
>         res.end(data)
>     })
> })
> ```
>
> 问题： `content-type` 属性写死了，无法告知浏览器正确的 mime 类型。浏览器无法正确解析响应回来的文件，会发出警告。
>
> 解决办法： 引入 第三方模块 => mime 类型模块

![01-缺少mine类型01](G:\自学代码\node\node笔记\images\01-缺少mine类型01.png)

![01-缺少mine类型02](G:\自学代码\node\node笔记\images\02-有mime模块对mine类型进行动态设置.png)

#### 5、 url 查询字符串解析模块

- 用于将查询字符串转化为对象的形式
- 使用步骤：

```js
// 第一步： 引入 url 模块
const url = require('url')

// 第二步： 使用 API
url.parse(要解析的url地址, 是否解析为queryString[默认为fasle])

// 示例
let obj = url.parse('/index.html?id=1&name=zs',true)
console.log(obj) // {query:{id:'1',name:'zs'}}
```

##### 注意：

- url 模块是用于解析查询字符串的。当`url.parse(req.url,Boolean)` 方法的第二参数为 `true` 时，会调用 `queryString.parse(req.url) ` 方法，将查询字符串解析为对象的形式。

​	queryString 也是一个模块。

- 解析的结果是 **对象**，里面的值 全是 **字符串**



### (二) 第三方模块

​	第三方模块，是要先安装，再引入，最后才能使用的模块。

​	安装方法：使用`npm i 包名` 进行下载。

##### 1、 mime 类型模块

- 用于设置	`content-type` 属性值

  > ​	从服务器返回的资源，需要设置明确的 mime类型（`contetn-type`属性）。因为浏览器会依据后端指定的 mine类型（`contetn-type`属性）对返回的数据进行解析。
  >
  > ​	如果后端没有个数据指定 mime 类型 (`content-type`属性)，浏览器就会猜测 数据的mime 类型。同时，浏览器会发出警告。

![01-缺少mine类型01](G:\自学代码\node\node笔记\images\01-缺少mine类型01.png)

![02-有mime模块对mine类型进行动态设置](G:\自学代码\node\node笔记\images\02-有mime模块对mine类型进行动态设置.png)

- 常用方法：

```js
mime.getType(文件名) // 根据文件名，返回对应的mime类型（contentType 属性值）

mime.getExtension('text/html') // 根据指定的 mime类型（contentType 属性值），返回对应的 文件后缀名
```

- 使用步骤：

```js
// 需 配合 request.url 使用
// 第一步： 下载 => npm i mime
// 第二步： 引入
const mime = require('mime')
// 第三步：根据不同的请求，设置对应的请求头
server.on('request',(req,res) => {
    res.setHeader('content-type', mime.getType(req.url))
    fs.readFile(path.join(__dirname,'pages',req.url),'utf-8',(err,data) =>{
        if(err) {
            return console.log(err)
        }
        
        res.end(data)
    })
})
```



### (三) 自定义模块

​	自己创建的 js 文件。 先自己定义，再引入使用。

**注意：** 

- 1、自定义模块引入时，需要加上**路径**
- 2、如果不加**路径**，就当做**核心模块**去查找，再当作**第三方模块**查找。



## 三、nodeJS中模块查找的规则

- 1、先看模块名是否带有**路径**

  - 带有路径，是自定义模块。会相对于当前 js 文件，以相对路径查找指定 js 文件

- 2、模块名中**没有路径**

    - 会先当做 **核心模块** 查找
    - 再当作 **第三方模块** 查找

    ​

## 四、 nodeJS 中get 请求和 post 请求的处理

### (一) get 请求 和 post 请求的区别

- get 请求 ： 
  - 请求数据是拼接在 url 地址中的  `/index?name=zs&age=18`
  - 请求数据是比较小的
  - 安全性相对较低
- post 请求： 
  - 请求数据是放在请求体中的
  - 请求数据较大
  - 相对较安全

注意： post 请求数据 是 **分块** 传输的，因此一个数据可能**多次**传入。

### (二) nodeJS 对 get 请求的处理

- 使用 `url.parse(req.url,true)` 将地址栏中的查询字符串进行解析

```js
url.parse(req.url,true)
```

### (三) nodeJS  对 post 请求的处理

- 由于 post 请求的数据 放在 请求体中， 且 分块 传输，所以需要利用  `request`请求报文 创建 监听 post请求 **数据传输开始和结束的事件**
- 具体步骤如下：

```js
// 第一步： 声明 一个字符串变量 作为接受请求数据的容器
let info = ''


server.on('request',(req,res)=>{
    // 利用 req 请求报文 创建监听事件
    // 第二步： 创建 监听数据传输的事件
    req.on('data',(chunk) =>{  // 数据传输时，触发
        info += chunk // 将上传的每一块数据进行拼接
    })
    
    // 第三步：创建 监听数据 传输结束的事件
    req.on('end',() =>{})   //数据传输结束时，触发。
})
```



### 



## 补充：

### (一) art-template 模板引擎在 nodeJS 中的使用

```js
// 第一步： 下载  => npm i art-template
// 第二步： 引入
const template = require('art-template')
// 第三步： 使用
let str = template(模板路径,{对象})
// 第四步： 返回给浏览器，进行解析
res.end(str)
```

- nodeJS 中 模板引擎的使用 与 前端的区别

  第一个参数不同：

  - nodeJS 中的 第一个参数是： 模板路径
  - 前端中的 第一个参数是： 模板的id

```JS
// nodeJs 中的 第一个参数
template(模板路径,{对象})

// 前端 中的 第一个参数
template(模板的id,{对象})
```

### (二) ` JSON.stringfy `格式化输出

- 基本语法

```js
JSON.stringfy(data,[callback],[格式化缩进的空格数])
```

-  数据格式化输出

```js
JSON.stringfy(data, null, 2) // 缩减 2个空格
```



