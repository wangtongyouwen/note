[toc]

# 1 ES6模块化与异步编程高级用法

## 1.1 ES6 模块化

### 1.1.1  node.js 中如何实现模块化

node.js 遵循了 CommonJS 的模块化规范。其中： 

- 导入其它模块使用 require() 方法 

- 模块对外共享成员使用 module.exports 对象 

模块化的好处： 

大家都遵守同样的模块化规范写代码，降低了沟通的成本，极大方便了各个模块之间的相互调用，利人利己。

### 1.1.2 前端模块化规范的分类

在 ES6 模块化规范诞生之前，JavaScript 社区已经尝试并提出了 AMD、CMD、CommonJS 等模块化规范。 

但是，这些由社区提出的模块化标准，还是存在一定的差异性与局限性、并不是浏览器与服务器通用的模块化 标准，例如： 

- AMD 和 CMD 适用于浏览器端的 Javascript 模块化 

- CommonJS 适用于服务器端的 Javascript 模块化 



太多的模块化规范给开发者增加了学习的难度与开发的成本。因此，大一统的 ES6 模块化规范诞生了！

### 1.1.3 ES6模块化规范定义

ES6 模块化规范是浏览器端与服务器端通用的模块化开发规范。它的出现极大的降低了前端开发者的模块化学 习成本，开发者不需再额外学习 AMD、CMD 或 CommonJS 等模块化规范。

 ES6 模块化规范中定义： 

- 每个 js 文件都是一个独立的模块 

- 导入其它模块成员使用 import 关键字 

- 向外共享模块成员使用 export 关键字

### 1.1.4 在 node.js 中体验 ES6 模块化

node.js 中默认仅支持 CommonJS 模块化规范，若想基于 node.js 体验与学习 ES6 的模块化语法，可以按照 如下两个步骤进行配置： 

① 确保安装了 v14.15.1 或更高版本的 node.js 

② 在 package.json 的根节点中添加 "type": "module" 节点

![image-20220902162622707](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209021626675.png)

### 1.1.5 基本语法

ES6 的模块化主要包含如下 3 种用法： 

① 默认导出与默认导入 

② 按需导出与按需导入 

③ 直接导入并执行模块中的代码

#### 1 默认导出

默认导出的语法： export default 默认导出的成员

```JavaScript
let n1 = 10 // 定义模块私有成员 n1
let n2 = 20 // 定义模块私有成员 n2 （外界访问不到 n2,因为它没有被共享出去）
function show() {}  // 定义模块私有方法 show

export default {  // 使用 export default 默认导出语法，向外共享 n1 和 show 两个成员
  n1,
  show
}

// export default {
//   n2
// }
```

每个模块中，只允许使用唯一的一次 export default，否则会报错！

#### 2 默认导入

默认导入的语法： import 接收名称 from '模块标识符'

```javascript
// 从01.默认导出.js 模块中导入 export default 向外共享的成员
// 并使用 m1 成员进行接收
import m1 from './01.默认导出.js'

// 打印输出的结果为：
// {n1:10, show: [Function:show]}
console.log(m1)

```

默认导入时的接收名称可以任意名称，只要是合法的成员名称即可

#### 3 按需导出

```javascript
export let s1 = 'aaa'
export let s2 = 'ccc'
export function say() {}

export default {
  a: 20
}

```

① 每个模块中可以使用多次按需导出 

#### 4 按需导入

```javascript
import info, { s1, s2 as str2, say } from './03.按需导出.js'

console.log(s1)
console.log(str2)
console.log(say)

console.log(info)

```

① 按需导入的成员名称必须和按需导出的名称保持一致 

② 按需导入时，可以使用 as 关键字进行重命名 

③ 按需导入可以和默认导入一起使用

#### 5 直接导入并执行模块中的代码

如果只想单纯地执行某个模块中的代码，并不需要得到模块中向外共享的成员。此时，可以直接导入并执行模 块代码，示例代码如下：

```javascript
// 05_m3.js:
for (let i = 0; i < 3; i++) {
  console.log(i)
}
//----------------------------------------------
// 直接导入并执行模块代码，不需要得到模块向外共享的成员
import './05_m3.js'
```

## 1.2 Promise

### 1.2.1 回调地狱

多层回调函数的相互嵌套，就形成了回调地狱

回调地狱的缺点： 

- 代码耦合性太强，牵一发而动全身，难以维护 

- 大量冗余的代码相互嵌套，代码的可读性变差

#### 1 如何解决回调地狱的问题

为了解决回调地狱的问题，ES6（ECMAScript 2015）中新增了 Promise 的概念。

#### 2 Promise 的基本概念

① Promise 是一个构造函数 

- 我们可以创建 Promise 的实例 const p = new Promise() - new 出来的 Promise 实例对象，代表一个异步操作 

② Promise.prototype 上包含一个 .then() 方法 

- 每一次 new Promise() 构造函数得到的实例对象， 

- 都可以通过原型链的方式访问到 .then() 方法，例如 p.then() 

③ .then() 方法用来预先指定成功和失败的回调函数 

- p.then(成功的回调函数，失败的回调函数) 

- p.then(result => { }, error => { }) 

- 调用 .then() 方法时，成功的回调函数是必选的、失败的回调函数是可选的

### 1.2.2 基于回调函数按顺序读取文件内容

```JavaScript
// 读取文件1.txt
fs.readFile('./files/1.txt','utf8',(err,r1) =>{
  if (err1) return console.log(err1.message) // 读取文件1 失败
  console.log(r1) // 读取文件1成功
  // 读取文件2.txt
  fs.readFile('./files/2.txt','utf8',(err2,r2) =>{
    if (err2) return console.log(err2.message) // 读取文件2 失败 
    console.log(r2) // 读取文件2成功
    // 读取文件3.txt
    fs.readFile('./files/3.txt','utf8',(err3,r3) =>{
      if (err3) return console.log(err3.message) // 读取文件3 失败 
      console.log(r3) // 读取文件3成功
  })
})
```

### 1.2.3 基于then-fs 读取文件内容

由于 node.js 官方提供的 fs 模块仅支持以回调函数的方式读取文件，不支持 Promise 的调用方式。因此，需 要先运行如下的命令，安装 then-fs 这个第三方包，从而支持我们基于 Promise 的方式读取文件的内容：

```bash
npm install then-fs
```

#### 1 基本用法

调用 then-fs 提供的 readFile() 方法，可以异步地读取文件的内容，它的返回值是 Promise 的实例对象。因 此可以调用 .then() 方法为每个 Promise 异步操作指定成功和失败之后的回调函数。示例代码如下：

```JavaScript
import thenFs from 'then-fs'
// .then() 中的失败回调是可选的，可以被省略
thenFs.readFile('./files/1.txt', 'utf8').then((r1) => {console.log(r1)})
thenFs.readFile('./files/2.txt', 'utf8').then((r2) => {console.log(r2)})
thenFs.readFile('./files/3.txt', 'utf8').then((r3) => {console.log(r3)})
```

注意：上述的代码无法保证文件的读取顺序，需要做进一步的改进！

#### 2 .then() 方法的特性

如果上一个 .then() 方法中返回了一个新的 Promise 实例对象，则可以通过下一个 .then() 继续进行处理。通 过 .then() 方法的链式调用，就解决了回调地狱的问题。

#### 3 基于Promise按顺序读取文件的内容

Promise 支持链式调用，从而来解决回调地狱的问题。示例代码如下：

```javascript
import thenFs from 'then-fs'

thenFs
  .readFile('./files/11.txt', 'utf8') // 文件不存在导致读取失败，后面的3个.then都不执行
  .then((r1) => {
    console.log(r1)
    return thenFs.readFile('./files/2.txt', 'utf8')
  })
  .then((r2) => {
    console.log(r2)
    return thenFs.readFile('./files/3.txt', 'utf8')
  })
  .then((r3) => {
    console.log(r3)
  })

```

#### 4 通过 .catch 捕获错误

如果不希望前面的错误导致后续的 .then 无法正常执行，则可以将 .catch 的调用提前，示例代码如下：

```JavaScript
import thenFs from 'then-fs'

thenFs
  .readFile('./files/11.txt', 'utf8')
  .catch((err) => {
    console.log(err.message)
  })
  .then((r1) => {
    console.log(r1)
    return thenFs.readFile('./files/2.txt', 'utf8')
  })
  .then((r2) => {
    console.log(r2)
    return thenFs.readFile('./files/3.txt', 'utf8')
  })
  .then((r3) => {
    console.log(r3)
  })

```

#### 5 Promise.all() 方法

Promise.all() 方法会发起并行的 Promise 异步操作，等所有的异步操作全部结束后才会执行下一步的 .then  操作（等待机制）。示例代码如下：

```javascript
import thenFs from 'then-fs'
// 1. 定义一个数组，存放3个读文件的异步操作
const promiseArr = [
  thenFs.readFile('./files/3.txt', 'utf8'),
  thenFs.readFile('./files/2.txt', 'utf8'),
  thenFs.readFile('./files/1.txt', 'utf8'),
]
// 2. 将 Promise 的数组，作为 Promise.all() 的参数
Promise.all(promiseArr)
  .then(([r1,r2,r3]) => { // 2.1 所有文件读取成功（等待机制）
    console.log(r1,r2,r3)
})
.catch(err => { // 2.2 捕获 Promise 异步操作中的错误
    console.log(err.message)
})
```

注意：数组中 Promise 实例的顺序， 就是最终结果的顺序！

#### 6 Promise.race()方法

Promise.race() 方法会发起并行的 Promise 异步操作，只要任何一个异步操作完成，就立即执行下一步的 .then 操作（赛跑机制）。示例代码如下：

```JavaScript
import thenFs from 'then-fs'
// 1. 定义一个数组，存放3个读文件的异步操作
const promiseArr = [
  thenFs.readFile('./files/3.txt', 'utf8'),
  thenFs.readFile('./files/2.txt', 'utf8'),
  thenFs.readFile('./files/1.txt', 'utf8'),
]
// 2. 将 Promise 的数组，作为 Promise.race() 的参数
Promise.race(promiseArr)
  .then(([r1,r2,r3]) => { // 2.1 只要任何一个异步操作完成，就立即执行成功的回调函数（赛跑机制）
    console.log(r1,r2,r3)
})
.catch(err => { // 2.2 捕获 Promise 异步操作中的错误
    console.log(err.message)
})
```

### 1.2.4 基于Promise封装读文件的方法

方法的封装要求： 

① 方法的名称要定义为 getFile 

② 方法接收一个形参 fpath，表示要读取的文件的路径 

③ 方法的返回值为 Promise 实例对象

#### 1 getFile 方法的基本定义

```JavaScript
// 1. 方法的名称为 getFile
// 2. 方法接收一个形参 fpath，表示要读取的文件的路径
function getFile(fpath) {
  // 3. 方法的返回值为 Promise 的实例对象
  return new Promise()
}
```

注意：第 5 行代码中的 new Promise() 只是创建了一个形式上的异步操作。

#### 2 创建具体的异步操作

如果想要创建具体的异步操作，则需要在 new Promise() 构造函数期间，传递一个 function 函数，将具体的 异步操作定义到 function 函数内部。示例代码如下：

```javascript
// 1. 方法的名称为 getFile
// 2. 方法接收一个形参 fpath，表示要读取的文件的路径
function getFile(fpath) {
  // 3. 方法的返回值为 Promise 的实例对象
  return new Promise(function() {
  // 4. 下面这行代码，表示这是一个具体的，读文件的异步操作
  fs.readFile(fpath,'utf8',(err,dataStr) =>{ })
  })
}
```

#### 3 获取.then的两个实参

通过 .then() 指定的成功和失败的回调函数，可以在 function 的形参中进行接收，示例代码如下：

```JavaScript
function getFile(fpath) {
  // resolve 形参是：调用 getFiles()方法时，通过.then 指定的“成功的”回调函数
  // reject 形参是：调用 getFiles()方法时，通过.then 指定的“失败的”回调函数
  return new Promise(function(resolve,reject) {
  fs.readFile(fpath,'utf8',(err,dataStr) =>{ })
  })
}

//getFile 方法的调用过程
getFile('./files/1.txt').then(成功的回调函数，失败的回调函数)
```

#### 4 调用 resolve 和 reject 回调函数

Promise 异步操作的结果，可以调用 resolve 或 reject 回调函数进行处理。示例代码如下：

```javascript
import fs from 'fs'
function getFile(fpath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fpath, 'utf8', (err, dataStr) => {
      if (err) return reject(err)
      resolve(dataStr)
    })
  })
}

getFile('./files/11.txt')
  .then((r1) => {
    console.log(r1)
  })
  .catch((err) => console.log(err.message))
```

## 1.3  async/await

### 1.3.1 定义

async/await 是 ES8（ECMAScript 2017）引入的新语法，用来简化 Promise 异步操作。在 async/await 出 现之前，开发者只能通过链式 .then() 的方式处理 Promise 异步操作。示例代码如下：

```javascript
import thenFs from 'then-fs'

thenFs
  .readFile('./files/11.txt', 'utf8') // 文件不存在导致读取失败，后面的3个.then都不执行
  .then((r1) => {
    console.log(r1)
    return thenFs.readFile('./files/2.txt', 'utf8')
  })
  .then((r2) => {
    console.log(r2)
    return thenFs.readFile('./files/3.txt', 'utf8')
  })
  .then((r3) => {
    console.log(r3)
  })

```

- .then 链式调用的优点： 解决了回调地狱的问题

- .then 链式调用的缺点： 代码冗余、阅读性差、 不易理解

### 1.3.2 async/await 的基本使用

使用 async/await 简化 Promise 异步操作的示例代码如下：

```javascript
import thenFs from 'then-fs'

console.log('A')
async function getAllFile() {
  console.log('B')
  const r1 = await thenFs.readFile('./files/1.txt', 'utf8')
  console.log(r1)
  const r2 = await thenFs.readFile('./files/2.txt', 'utf8')
  console.log(r2)
  const r3 = await thenFs.readFile('./files/3.txt', 'utf8')
  console.log(r3)
  console.log('D')
}

getAllFile()
console.log('C')

```

### 1.3.3 async/await 的使用注意事项

① 如果在 function 中使用了 await，则 function 必须被 async 修饰 

② 在 async 方法中，第一个 await 之前的代码会同步执行，await 之后的代码会异步执行

输出顺序：A B C 111 222 333 D

## 1.4 EventLoop

### 1.4.1 JavaScript是单线程的语言

avaScript 是一门单线程执行的编程语言。也就是说，同一时间只能做一件事情。

单线程执行任务队列的问题： 如果前一个任务非常耗时，则后续的任务就不得不一直等待，从而导致程序假死的问题。

### 1.4.2 同步任务和异步任务

为了防止某个耗时任务导致程序假死的问题，JavaScript 把待执行的任务分为了两类： 

① 同步任务（synchronous） 

- 又叫做非耗时任务，指的是在主线程上排队执行的那些任务 

- 只有前一个任务执行完毕，才能执行后一个任务 

② 异步任务（asynchronous） 

- 又叫做耗时任务，异步任务由 JavaScript 委托给宿主环境进行执行 

- 当异步任务执行完成后，会通知 JavaScript 主线程执行异步任务的回调函数

### 1.4.3 同步任务和异步任务的执行过程

① 同步任务由 JavaScript 主线程次序执行 

② 异步任务委托给宿主环境执行 

③ 已完成的异步任务对应的回调函数，会被 加入到任务队列中等待执行 

④ JavaScript 主线程的执行栈被清空后，会 读取任务队列中的回调函数，次序执行 

⑤ JavaScript 主线程不断重复上面的第 4 步

![image-20220902172039156](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209021720499.png)

### 1.4.4 EventLoop的基本概念

JavaScript 主线程从“任务队列”中读取异步 任务的回调函数，放到执行栈中依次执行。这 个过程是循环不断的，所以整个的这种运行机 制又称为 EventLoop（事件循环）。

### 1.4.5 分析输出的顺序

```javascript
import thenFs from 'then-fs'

console.log('A')
thenFs.readFile('./files/1.txt','utf8').then(dataStr => {
  console.log('B')
})
setTimeout(() => {
  console.log('C')
},0)
console.log('D')
```

正确的输出结果：ADCB。其中： 

- A 和 D 属于同步任务。会根据代码的先后顺序依次被执行 
-  C 和 B 属于异步任务。它们的回调函数会被加入到任务队列中，等待主线程空闲时再执行

## 1.5  宏任务和微任务

### 1.5.1 定义

JavaScript 把异步任务又做了进一步的划分，异步任务又分为两类，分别是： 

① 宏任务（macrotask） 

- 异步 Ajax 请求、 

- setTimeout、setInterval、 

- 文件操作 

- 其它宏任务 

② 微任务（microtask） 

- Promise.then、.catch 和 .finally 

- process.nextTick 

- 其它微任务

### 1.5.2 宏任务和微任务的执行顺序

![image-20220902172906621](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209021729975.png)

每一个宏任务执行完之后，都会检查是否存在待执行的微任务， 如果有，则执行完所有微任务之后，再继续执行下一个宏任务。

### 1.5.3 分析以下代码输出的顺序

```javascript
setTimeout(function(){
  console.log('1')
})

new Promise(function(resolve) {
  console.log('2')
  resolve()
}).then(function() {
  console.log('3')
})

console.log('4')
```

顺序为：2431

① 先执行所有的同步任务 

- 执行第 6 行、第 12 行代码 

② 再执行微任务 

- 执行第 9 行代码 

③ 再执行下一个宏任务 

- 执行第 2 行代码

```javascript
console.log('1')
setTimeout(function() {
  console.log('2')
  new Promise(function(resolve) {
    console.log('3')
    resolve()
  }).then(function(){
    console.log('4')
  })
})
new Promise(function(resolve) {
  console.log('5')
  resolve()
}).then(function() {
  console.log('6')
})

setTiemout(function() {
  console.log('7')
  new Promise(function(resolve) {
    console.log('8')
    resolve()
  }).then(function() {
    console.log('9')
  })
})
```

正确的输出顺序是：156234789

## 1.6 API 接口案例

### 1.6.1 案例需求

基于 MySQL 数据库 + Express 对外提供用户列表的 API 接口服务。用到的技术点如下： 

- 第三方包 express 和 mysql2 

- ES6 模块化

- Promise 

- async/await

### 1.6.2 实现步骤

① 搭建项目的基本结构 

② 创建基本的服务器 

③ 创建 db 数据库操作模块 

④ 创建 user_ctrl 业务模块 

⑤ 创建 user_router 路由模块

### 1.6.3 具体实现

#### 1 搭建项目的基本结构 

① 启用 ES6 模块化支持 

- 在 package.json 中声明 "type": "module" 

② 安装第三方依赖包 

- 运行 npm install express@4.17.1 mysql2@2.2.5

#### 2 创建基本的服务器 

app.js

```javascript
import express from 'express'
const app = express()

app.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})

```

#### 3 创建 db 数据库操作模块

db/index.js

```javascript
import mysql from 'mysql2'

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  database: 'my_db_01',
  user: 'root',
  password: 'admin123',
})

export default pool.promise()

```

#### 4 创建 user_ctrl 业务模块

controller/user_ctrl.js

```javascript
import db from '../db/index.js'

// 使用 ES6 的按需导出语法，将 getAllUser 方法导出出去
export async function getAllUser(req, res) {
  // db.query()函数的返回值是Promise的对象实例，因此可以使用async/await 进行简化
  const [rows] = await db.query('select id,username,nickname from ev_users')
  res.send({
      status: 0,
      message: '获取用户列表数据成功！',
      data: rows,
  })
}

```

#### 5 创建 user_router 路由模块

router/user_router.js

```javascript
import express from 'express'
import { getAllUser } from '../controller/user_ctrl.js'

const router = new express.Router()
router.get('/user', getAllUser)

export default router

```

#### 6 导入并挂载路由模块

```javascript
import express from 'express'
import userRouter from './router/user_router.js'
const app = express()

app.use('/api', userRouter)

app.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})

```

#### 7 使用 try ... catch 捕获异常

```javascript
import db from '../db/index.js'

// 使用 ES6 的按需导出语法，将 getAllUser 方法导出出去
export async function getAllUser(req, res) {
  try {
    const [rows] = await db.query('select id, username, nickname, xxx from ev_users')
    res.send({
      status: 0,
      message: '获取用户列表数据成功！',
      data: rows,
    })
  } catch (err) {
    res.send({
      status: 1,
      message: '获取用户列表数据失败！',
      desc: err.message,
    })
  }
}

```

# 2 vue 组件

## 2.1  vue组件的构成与使用

### 2.1.1 template 中定义根节点

在 vue 3.x 的版本中，<template> 中支持定义多个根节点

```javascript
<template>
  <!-- 这是包含多个根节点的 template 结构， 因为 h1 标签和 h2 标签外层没有包裹性质的根元素-->
  <h1></h1>
  <h2></h2>
</template>
```

### 2.1.2 组件的注册

vue 中注册组件的方式分为“全局注册”和“局部注册”两种，其中： 

- 被全局注册的组件，可以在全局任何一个组件内使用 

- 被局部注册的组件，只能在当前注册的范围内使用

#### 1 全局注册组件

```javascript
// main.js 中注册的组件
import { createApp } from 'vue'
import App from './App.vue'
// 1. 导入 Swiper 和 Test 两个组件
import Swiper from './components/MySwiper.vue'
import Test from './components/MyTest.vue'

const app = createApp(app)

// 2. 调用 app 实例的 component() 方法，在全局注册 my-swiper 和 my-test 两个组件
app.component('my-swiper', Swiper)
app.component('my-test', Test)

app.mount('#app')
```

使用 app.component() 方法注册的全局组件，直接以标签的形式进行使用即可，例如：

```javascript
<template>
  <h1></h1>
  <hr />
  <my-swiper></my-swiper>
  <my-test></my-test>
</template>
```

#### 2 局部注册组件

```JavaScript
<template>
  <my-search></my-search>
</template>

<script>
import Search from './components/MySearch.vue'
export default {
  components: {  // 通过 components 节点，为当前的组件注册私有子组件
    'my-search': Search,
  },
}
</script>
```

#### 3 组件注册时的大小写

在进行组件的注册时，定义组件注册名称的方式有两种：

 ① 使用 kebab-case 命名法（俗称短横线命名法，例如 my-swiper 和 my-search） 

② 使用 PascalCase 命名法（俗称帕斯卡命名法或大驼峰命名法，例如 MySwiper 和 MySearch）

短横线命名法的特点： 

- 必须严格按照短横线名称进行使用 

帕斯卡命名法的特点： 

- 既可以严格按照帕斯卡名称进行使用，又可以转化为短横线名称进行使用

注意：在实际开发中，推荐使用帕斯卡命名法为组件注册名称，因为它的适用性更强。

#### 4 通过 name 属性注册组件

在注册组件期间，除了可以直接提供组件的注册名称之外，还可以把组件的 name 属性作为注册后组件的名称， 示例代码如下：

```javascript
// Swiper 组件：
<template>
</template>
<script>
export default {
  name: "MySwiper"  // name 属性为当前组件的名字
}
</script>

// 全局注册 Swiper 组件
import Swiper from './components/MySwiper.vue'
app.component(Swiper.name,Swiper) // 相当于 app.component('MySwiper',Swiper)
```

### 2.1.3 组件绑定修改样式属性

#### 1 Class 与 Style 绑定

在实际开发中经常会遇到动态操作元素样式的需求。因此，vue 允许开发者通过 v-bind 属性绑定指令，为元素动态绑定 class 属性的值和行内的 style 样式。

#### 2 动态绑定 HTML 的 class

可以通过三元表达式，动态的为元素绑定 class 的类名。示例代码如下：

```javascript
<h3 class="thin" :class="isItalic ? 'italic' : ''">MyDeep 组件</h3>
<button @click="isItalic=!isItalic">Toggle Italic </button>

data(){
  return { isItalic: true }
}

.thin {
  font-weight: 200;
}
.italic {
  font-style: italic;
}
```

#### 3  以数组语法绑定 HTML 的 class

如果元素需要动态绑定多个 class 的类名，此时可以使用数组的语法格式：

```javascript
<h3 class="thin" :class="[isItalic ? 'italic' : '', isDelete ? 'delete' : '']">MyStyle 组件</h3>
    <button @click="isItalic = !isItalic">Toggle Italic</button>
    <button @click="isDelete = !isDelete">Toggle Delete</button> 

data(){
  return { 
    isItalic: true,
    isDelete: false,
  }
}
```

#### 4 以对象语法绑定HTML的class

使用数组语法动态绑定 class 会导致模板结构臃肿的问题。此时可以使用对象语法进行简化：

```JavaScript
<h3 class="thin" :class="classObj">MyStyle 组件</h3>
    <button @click="isItalic = !isItalic">Toggle Italic</button>
    <button @click="isDelete = !isDelete">Toggle Delete</button> 

data(){
  return { 
   classObj: { // 对象中，属性名是 class 类名，值是布尔值
     italic: true,
     delete: false,
   }
  }
}
```

#### 5 以对象语法绑定内联的 style

:style 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼 峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

```javascript
<div :style="{ color: active, fontSize: fsize + 'px', 'background-color': bgcolor }">黑马程序员</div>
<button @click="fsize+=1">字号 +1</button>
<button @click="fsize-=1">字号 -1</button>

data() {
  return {
    active: 'red',
    fsize: 30,
    bgcolor: 'pink',
  }
}
```

### 2.1.4 封装组件的案例

封装要求： 

① 允许用户自定义 title 标题 

② 允许用户自定义 bgcolor 背景色 

③ 允许用户自定义 color 文本颜色 

④ MyHeader 组件需要在页面顶部进行 fixed 固定定位，且 z-index 等于 999

使用知识点：

- 组件的封装与注册 

- props 

- 样式绑定

整体步骤：

- 创建 MyHeader 组件 

- 渲染 MyHeader 组件的基本结构 

- 在 App 组件中注册并使用 MyHeader 组件 

- 通过 props 为组件传递数据

```JavaScript
app.vue 根组件
<template>
  <div class="app-container">
    <h1>App根组件</h1>

    <hr>

    <my-header title="黑马程序员" bgcolor="#000" color="#fff"></my-header>
  </div>
</template>

<script>
import MyHeader from './06.MyHeader/MyHeader.vue'

export default {
  name: 'MyApp',
  components: {
    MyHeader,
  },
}
</script>

<style lang="less" scoped>
.app-container {
  margin-top: 45px;
}
</style>
```

```JavaScript
main.js 渲染效果

import App from './components/App.vue'

app.mount('#app')

```

```javascript
MyHeader.vue 组件
<template>
  <div class="header-container" :style="{ backgroundColor: bgcolor, color: color }">
    {{title || 'Header 组件'}}
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  props: ['title', 'bgcolor', 'color']
}
</script>

<style lang="less" scoped>
.header-container {
  height: 45px;
  background-color: pink;
  text-align: center;
  line-height: 45px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
</style>

```

## 2.2 vite 的基本使用

|                            | vite               | vue-cli       |
| -------------------------- | ------------------ | ------------- |
| 支持的vue版本              | 仅支持 vue 3.x     | 支持 3.x和2.x |
| 是否基于 webpack           | 否                 | 是            |
| 运行速度                   | 快                 | 较慢          |
| 功能完整度                 | 小而巧（逐步完善） | 大而全        |
| 是否建议在企业级开发中使用 | 不建议             | 建议          |

### 2.2.1 创建 vite 的项目

按照顺序执行如下的命令，即可基于 vite 创建 vue 3.x 的工程化项目：

```bash
npm init vite-app 项目名称

cd 项目名称
npm install
npm run dev
```

### 2.2.2 梳理项目的结构

其中： 

- node_modules 目录用来存放第三方依赖包 

- public 是公共的静态资源目录 

- src 是项目的源代码目录（程序员写的所有代码都要放在此目录下）

- .gitignore 是 Git 的忽略文件 

- index.html 是 SPA 单页面应用程序中唯一的 HTML 页面 

- package.json 是项目的包管理配置文件

![image-20220902222812185](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209022228382.png)

在 src 这个项目源代码目录之下，包含了如下的文件和文件夹：

- assets 目录用来存放项目中所有的静态资源文件（css、fonts等） 

- components 目录用来存放项目中所有的自定义组件 

- App.vue 是项目的根组件 

- index.css 是项目的全局样式表文件 

- main.js 是整个项目的打包入口文件

### 2.2.3 vite 项目的运行流程

在工程化的项目中，vue 要做的事情很单纯：通过 main.js 把 App.vue 渲染到 index.html 的指定区域中。 

其中： 

① App.vue 用来编写待渲染的模板结构 

② index.html 中需要预留一个 el 区域 

③ main.js 把 App.vue 渲染到了 index.html 所预留的区域中

```javascript
app.vue:
<template>
  <h1>content</h1>
</template>
```

打开 index.html 页面，确认预留了 el 区域：

```JavaScript
<body>
  <!-- id 为 app 的 div 元素，就是将来 vue 要控制的区域-->
  <div id="app"><div>
  <script type="module" src="/src/main.js"></script>
</body>
```

按照 vue 3.x 的标准用法，把 App.vue 中的模板内容渲染到 index.html 页面的 el 区域中：

```javascript
main.js:
// 1. 从 vue 中按需导入 createApp 函数
// createApp 函数的作用： 创建 vue 的“单页面应用程序实例”
import { createApp } from 'vue'
// 2. 导入待渲染的 App 组件
import App from './App.vue'

// 3. 调用 createApp() 函数，返回值是“单页面应用程序的实例”，用常量 spa_app 进行接收
// 同时把App组件作为参数传给 createApp 函数，表示要把App渲染到index.html 页面上
const spa_app = createApp(App)
// 4. 调用 spa_app 实例的mount 方法，用来指定vue实际要控制的区域
spa_app.mount('#app')
```

### 2.3 props 验证

### 2.3.1 定义

指的是：在封装组件时对外界传递过来的 props 数据进行合法性的校验，从而防止数据不合法的问题。

使用数组类型的 props 节点的缺点：无法为每个 prop 指定具体的数据类型。

### 2.3.2 对象类型的props节点

使用对象类型的 props 节点，可以对每个 prop 进行数据类型的校验。

![image-20220903084310332](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209030843911.png)

### 2.3.2 props验证

对象类型的 props 节点提供了多种数据验证方案，例如： 

① 基础的类型检查 

② 多个可能的类型 

③ 必填项校验 

④ 属性默认值 

⑤ 自定义验证函数

#### 1 基础的类型检查

```JavaScript
export default {
  props: {
    proA: String,   // 字符串类型
    proB: Number,   // 数字类型
    proC: Boolean,  // 布尔值类型
    proD: Array,    // 数组类型
    proE: object,   // 对象类型
    proF: Date,     // 日期类型
    proG: Function, // 函数类型
    proH: Symbol    // 符号类型
  }
}
```

#### 2 多个可能的类型

如果某个 prop 属性值的类型不唯一，此时可以通过数组的形式，为其指定多个可能的类型，示例代码如下：

```javascript
export default {
  props: {
    proA: [String, Number],   // 可能是字符串类型或数字
  }
}
```

#### 3 必填项校验

如果组件的某个 prop 属性是必填项，必须让组件的使用者为其传递属性的值。此时，可以通过如下的方式将 其设置为必填项

```JavaScript
export default {
  props: {
    proB: {
      type: String,
      required: true  // 当前属性是必填项
    }  
  }
}
```

#### 4 属性默认值

在封装组件时，可以为某个 prop 属性指定默认值。示例代码如下：

```JavaScript
export default {
  props: {
    proC: {
      type: Number,
      default: 100  // 如果没有指定proC,则默认值为100
    }  
  }
}
```

#### 5 自定义验证函数

在封装组件时，可以为 prop 属性指定自定义的验证函数，从而对 prop 属性的值进行更加精确的控制：

```JavaScript
export default {
  props: {
    proD: {
      // 通过 validator 函数，对 propD 属性的值进行校验，“属性的值”可以通过形参 value 进行接收
      validator(value) {
        // propD 属性的值，必须匹配下列字符串中的一个
        // validator 函数的返回值为true表示验证通过，false表示验证失败
        return ['success','warning','danger'].indexOf(value) !== -1
      }
    }  
  }
}
```

## 2.4 计算属性

相对于方法来说，计算属性会缓存计算的结果，只有计算属性的依赖项发生变化时，才会重新进行运算。因此 计算属性的性能更好

```javascript
<template>
  <div>
    <input type="text" v-model.number="count" />
    <p>{{ count }} 乘以 2 的值为：{{ plus }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyCounter',
  data() {
    return {
      count: 1,
    }
  },
  computed: {
    plus() {
      console.log('计算属性被执行了')
      return this.count * 2
    },
  },
  methods: {
    // plus() {
    //   console.log('方法被执行了')
    //   return this.count * 2
    // }
  }
}
</script>

<style></style>

```

① 计算属性必须定义在 computed 节点中 

② 计算属性必须是一个 function 函数 

③ 计算属性必须有返回值 

④ 计算属性必须当做普通属性使用

## 2.5 自定义事件

### 2.5.1 定义

在封装组件时，为了让组件的使用者可以监听到组件内状态的变化，此时需要用到组件的自定义事件。

![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209030917290.png)

### 2.5.2 自定义事件的3个步骤

在封装组件时：

① 声明自定义事件 

② 触发自定义事件 

在使用组件时： 

③ 监听自定义事件

#### 1 声明自定义事件

开发者为自定义组件封装的自定义事件，必须事先在 emits 节点中声明，示例代码如下：

```javascript
<template>
  <div>
    <p>count 的值是：{{ count }}</p>
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  // 1. 声明自定义事件
  emits: ['countChange'],
}
</script>

```

#### 2 触发自定义事件

```javascript
<template>
  <div>
    <p>count 的值是：{{ count }}</p>
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  // 1. 声明自定义事件
  emits: ['countChange'],
  methods: {
    add() {
      this.count++
      // 2. this.$emit() 触发自定义事件
      this.$emit('countChange')
    },
  },
}
</script>

```

#### 3 监听自定义事件

在使用自定义的组件时，可以通过 v-on 的形式监听自定义事件。示例代码如下：

```javascript
<template>
  <div>
    <h1>app 根组件</h1>
    <hr />

    <my-counter @countChange="getCount"></my-counter>
  </div>
</template>

<script>
import MyCounter from './Counter.vue'

export default {
  name: 'MyApp',
  methods: {
    getCount(val) {
      console.log('触发了 countChange 自定义事件', val)
    },
  },
  components: {
    MyCounter,
  },
}
</script>

```

### 2.5.3 自定义事件传参

在调用 this.$emit() 方法触发自定义事件时，可以通过第 2 个参数为自定义事件传参，示例代码如下：

```javascript
<template>
  <div>
    <p>count 的值是：{{ count }}</p>
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  // 1. 声明自定义事件
  emits: ['countChange'],
  methods: {
    add() {
      this.count++
      // 2. this.$emit() 触发自定义事件
      this.$emit('countChange', this.count)
    },
  },
}
</script>

```

## 2.6 组件上的v-model

![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209031020537.png)

```javascript
子组件：counter.vue
<template>
  <div>
    <p>count值是：{{number}}</p>
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  name: 'MyCounter',
  props: ['number'],
  emits: ['update:number'],
  methods: {
    add() {
      this.$emit('update:number', this.number + 1)
    }
  }
}
</script>

<style></style>
```

```javascript
父组件 app.vue
<template>
  <div>
    <h1>App 根组件  ---- {{count}}</h1>
    <button @click="count += 1">+1</button>
    <hr />

    <my-counter v-model:number="count"></my-counter>
  </div>
</template>

<script>
import MyCounter from './Counter.vue'

export default {
  name: 'MyApp',
  data() {
    return {
      count: 0,
    }
  },
  components: {
    MyCounter
  }
}
</script>

<style></style>

```

```javascript
main.js
import { createApp } from 'vue'
import App from './components/04.v-model/App.vue'

createApp(App).mount('#app')

```



## 2.7 任务列表案例

使用知识点：

① vite 创建项目 

② 组件的封装与注册 

③ props 

④ 样式绑定 

⑤ 计算属性 

⑥ 自定义事件 

⑦ 组件上的 v-model

步骤：

① 使用 vite 初始化项目 

② 梳理项目结构 

③ 封装 todo-list 组件 

④ 封装 todo-input 组件 

⑤ 封装 todo-button 组件

### 2.7.1 初始化项目

```bash
npm init vite-app todos
npm install
npm i less -D
```

### 2.7.2 梳理项目结构

1 重置 index.css 中的全局样式如下：

```css
:root {
  font-size: 12px;
}

body {
  padding: 8px;
}
```

2 重置 App.use 组件的代码：

```javascript
<template>
  <div>
    <h1>App 根组件</h1>
  </div>
</template>

<script>
export default {
  name: 'MyApp',
  data() {
    return {
      // 任务列表的数据
      todolist: [
        { id: 1, task: '周一早晨9点开会', done: false },
        { id: 2, task: '周一晚上8点聚餐', done: false },
        { id: 3, task: '准备周三上午的演讲稿', done: true },
      ],
    }  
  },
}
</script>

<style lang="less" scoped></style>

```

3 删除 components目录下的 HelloWorld 组件

4 终端中运行项目

```bash
npm run dev
```

### 2.7.3 封装 todo-list 组件

#### 1 创建并注册TODOList组件

- src/components/todo-list/ 目录下新建 TodoList.vue 组件

```javascript
<template>
  <div> TodoList 组件 </div>
</template>

<script>
export default {
  name: 'TodoList',
}
</script>

<style lang="less" scoped>
</style>

```

- 在 App.vue 组件中导入并注册 TodoList.vue 组件

```javascript
import TodoList from './components/todo-list/TodoList.vue'

export default {
  name: 'MyApp',
  components: {
    TodoList,
  },
}
```

- 在 App.vue 的 template 模板结构中使用注册的 TodoList 组件

```javascript
<template>
  <div>
    <h1>App 根组件</h1>
    
    <hr />
    <todo-list></todo-list>
  </div>
</template>
```

#### 2 基于bootstrap渲染列表组件

-  将 资料 目录下的 css 文件夹拷贝到 src/assets/ 静态资源目录中。
- 在 main.js 入口文件中，导入 src/assets/css/bootstrap.css 样式表：

```javascript
import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/bootstrap.css'
import './index.css'

createApp(App).mount('#app')

```

- 根据 bootstrap 提供的列表组（https://v4.bootcss.com/docs/components/list-group/#with-badges）和复选框（https://v4.bootcss.com/docs/components/forms/#checkboxes-and-radios-1）渲染列表组件的基本效果：

```javascript
<template>
  <ul class="list-group">
    <!-- 列表组 -->
    <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in list" :key="item.id">
      <!-- 复选框 -->
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" :id="item.id" v-model="item.done" />
        <label class="custom-control-label" :class="item.done ? 'delete' : ''" :for="item.id">{{item.task}}</label>
      </div>
      <!-- 徽标 -->
      <span class="badge badge-success badge-pill" v-if="item.done">完成</span>
      <span class="badge badge-warning badge-pill" v-else>未完成</span>
    </li>
  </ul>
</template>
```

#### 3 为 TodoList 声明 props 属性

- 为了接受外界传递过来的列表数据，需要在 TodoList 组件中声明如下的 props 属性：

```javascript
export default {
  name: 'TodoList',
  prop: {
    list: {
      type: Array,
      required: true,
      default: [],
    },
  },
}
```

- 在 App 组件中通过 list 属性，将数据传递到 TodoList 组件之中：

```javascript
<todo-list :list="todolist"></todo-list>
```

#### 4 渲染列表的 DOM 结构

- 通过 v-for 指令，循环渲染列表的 DOM 结构：

```javascript
<template>
  <ul class="list-group">
    <!-- 列表组 -->
    <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in list" :key="item.id">
      <!-- 复选框 -->
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" :id="item.id" />
        <label class="custom-control-label" :for="item.id">{{item.task}}</label>
      </div>
      <!-- 徽标 -->
      <span class="badge badge-success badge-pill">完成</span>
      <span class="badge badge-warning badge-pill">未完成</span>
    </li>
  </ul>
</template>
```

- 通过 v-if 和 v-else 指令，按需渲染 badge 效果：

```javascript
<!-- 徽标 -->
<span class="badge badge-success badge-pill" v-if="item.done">完成</span>
<span class="badge badge-warning badge-pill" v-else>未完成</span>
```

- 通过 v-model 指令，双向绑定任务的完成状态：

```javascript
<input type="checkbox" class="custom-control-input" :id="item.id" v-model="item.done" />
<!--注意：App父组件通过props传递过来的list是引用类型的数据 -->
<!--这里v-model双向绑定的结果是：用户的操作修改的是App组件中数据的状态 -->
```

- 通过 v-bind 属性绑定，动态切换元素的 class 类名：

```javascript
<label class="custom-control-label" :class="item.done ? 'delete' : ''" :for="item.id">{{item.task}}</label>
```

- 在 TodoList 组件中声明如下的样式，美化当前组件的 UI 结构：

```javascript
<style lang="less" scoped>
.list-group {
  width: 400px;
}

.delete {
  text-decoration: line-through;
  color: gray;
  font-style: italic;
}
</style
```

### 2.7.4 封装 todo-input 组件

#### 1 创建并注册 TodoInput 组件

- 在 src/components/todo-input/ 目录下新建 TodoInput.vue 组件：

```javascript
<template>
  <div> TodoInput 组件 </div>
</template>

<script>
export default {
  name: 'TodoList',
}
</script>

<style lang="less" scoped>
</style>
```

- 在 App.vue 组件中导入并注册 TodoInput.vue 组件：

```javascript
import TodoList from './components/todo-list/TodoList.vue'
import TodoInput from './components/todo-input/TodoInput.vue'
export default {
  name: 'MyApp',
  components: {
    TodoList,
    TodoInput
  },
}
```

- 在 App.vue 的 template 模板结构中使用注册的 TodoInput 组件：

```javascript
<template>
  <div>
    <h1>App 根组件</h1>

    <hr />

    <todo-input></todo-input>
    <todo-list></todo-list>
  </div>
</template>
```

#### 2 基于 bootstrap 渲染组件结构

- 根据 bootstrap 提供的 inline-forms（https://v4.bootcss.com/docs/components/forms/#inline-forms）渲染 TodoInput 组件的基本结构。 
- 在 TodoInput 组件中渲染如下的 DOM 结构：

```JavaScript
<template>
  <!-- form 表单 -->
  <form class="form-inline">
    <div class="input-group mb-2 mr-sm-2">
      <!-- 输入框前缀 -->
      <div class="input-group-prepend">
        <div class="input-group-text">任务</div>
      </div>
      <!-- 文本输入框 -->
      <input type="text" class="form-control" placeholder="请输入任务信息" style="width: 356px" v-model.trim="taskname" />
    </div>
    <!-- 添加按钮 -->
    <button type="submit" class="btn btn-primary mb-2">添加新任务</button>
  </form>
</template>
```

#### 3 通过自定义事件向外传递数据

-  在 TodoInput  组件的 data 中声明如下的数据：

```javascript
export default {
  name: 'TodoInput',
  data() {
    return {
      taskname: '',
    }
  },
}
```

- 为 input 输入框进行 v-model 的双向数据绑定

```javascript
<input type="text" class="form-control" placeholder="请输入任务信息" style="width: 356px" v-model.trim="taskname" />
```

- 监听 form 表单的 submit 事件，阻止默认提交行为并指定事件处理函数

```javascript
<form class="form-inline" @submit.prevent="onFormSubmit">
</form>
```

- 在 methods 中声明 onFormSubmit 事件处理函数如下

```javascript
methods: {
  // 表单的提交事件处理函数
  onFormSubmit() {
    if (!this.taskname) return alert('任务名称不能为空！')

    this.$emit('add', this.taskname)
    this.taskname = ''
  },
},
```

- 声明自定义事件如下：

```javascript
emits: ['add'],
```

#### 4 实现添加任务的功能

- 在 App.vue 组件中监听 TodoInput 组件自定义的 add 事件：

```JavaScript
<!--使用ToDoInput组件-->
<!--监听ToDoInput的add自定义事件>
<todo-input @add="onAddNewTask"></todo-input>
```

- 在 App.vue 组件的 data 中声明 nextId 来模拟 id 自增 +1 的操作

```javascript
data() {
  return {
    // 任务列表的数据
    todolist: [
      { id: 1, task: '周一早晨9点开会', done: false },
      { id: 2, task: '周一晚上8点聚餐', done: false },
      { id: 3, task: '准备周三上午的演讲稿', done: true },
    ],
    // 下一个可用的 Id
    nextId: 4,
  }
},
```

- 在 App.vue 组件的 methods 中声明 onAddNewTask 事件处理函数如下：

```javascript
methods: {
  onAddNewTask(taskname) {
    this.todolist.push({
      id: this.nextId,
      task: taskname,
      done: false,
    })

    this.nextId++
  },
},
```

### 2.7.5 封装 todo-button 组件

#### 1 创建并注册 TODOButton 组件

- 在 src/components/todo-button/ 目录下新建 TodoButton.vue 组件：

```javascript
<template>
  <div> TodoButton 组件 </div>
</template>

<script>
export default {
  name: 'TodoButton',
}
</script>

<style lang="less" scoped>
</style>
```

- 在 App.vue 组件中导入并注册 TodoButton.vue 组件：

```javascript
// 导入 TodoList 组件
import TodoList from './components/todo-list/TodoList.vue'
// 导入 TodoInput 组件
import TodoInput from './components/todo-input/TodoInput.vue'
// 导入 TodoButton 组件
import TodoButton from './components/todo-button/TodoButton.vue'

export default {
  name: 'MyApp',
  components: {
    TodoList,
    TodoInput,
    TodoButton,
  },
}
```

- 在 App.vue 的 template 模板结构中使用注册的 TodoButton 组件：

```javascript
<template>
  <div>
    <h1>App 根组件</h1>

    <hr />

    <todo-input @add="onAddNewTask"></todo-input>
    <todo-list :list="tasklist" class="mt-2"></todo-list>
    <todo-button></todo-button>
  </div>
</template>
```

#### 2 基于 bootstrap 渲染组件结构

- 根据 bootstrap 提供的 Button group（https://v4.bootcss.com/docs/components/button-group/）渲染 Todobutton 组件的基本结构。
- 在 TodoButton 组件中渲染如下的 DOM 结构：

```javascript
<template>
  <div class="mt-3 btn-container">
    <div class="btn-group">
      <button type="button" class="btn btn-primary">全部</button>
      <button type="button" class="btn btn-secondary" >已完成</button>
      <button type="button" class="btn btn-secondary" >未完成</button>
    </div>
  </div>
</template>
```

- 并通过 button-container 类名美化组件的样式：

```javascript
<style lang="less" scoped>
.btn-container {
  width: 400px;
  text-align: center;
}
</style>
```

#### 3 通过 props 指定默认激活的按钮

- 在 TodoButton 组件中声明如下的 props，用来指定默认激活的按钮的索引：

```JavaScript
name: 'TodoButton',
props: {
  active: {
    type: Number,
    required: true,
    default: 0,
    // 默认激活索引值为0的按钮（全部：0，已完成：1，未完成：2）
  },
},
```

-  通过 动态绑定 class 类名 的方式控制按钮的激活状态：

```javascript
<button type="button" class="btn" :class="active === 0 ? 'btn-primary' : 'btn-secondary'">全部</button>
<button type="button" class="btn" :class="active === 1 ? 'btn-primary' : 'btn-secondary'">已完成</button>
<button type="button" class="btn" :class="active === 2 ? 'btn-primary' : 'btn-secondary'">未完成</button>
```

- 在 App 组件中声明默认激活项的索引，并通过属性绑定的方式传递给 TodoButton 组件：

```javascript
<todo-button v-model:active="activeBtnIndex"></todo-button>


data() {
  return {
    activeBtnIndex: 0,
  }
},
```

#### 4 通过 v-model 更新激活项的索引

> 需求分析： 

> 父 -> 子 通过 props 传递了激活项的索引（active） 

> 子 -> 父 需要更新父组件中激活项的索引 

> 这种场景下适合在组件上使用 v-model 指令，维护组件内外数据的同步。

- 为 TodoButton 组件中的三个按钮分别绑定 click 事件处理函数如下：

```javascript
<button type="button" class="btn" :class="active === 0 ? 'btn-primary' : 'btn-secondary'" @click="onBtnClick(0)">全部</button>
<button type="button" class="btn" :class="active === 1 ? 'btn-primary' : 'btn-secondary'" @click="onBtnClick(1)">已完成</button>
<button type="button" class="btn" :class="active === 2 ? 'btn-primary' : 'btn-secondary'" @click="onBtnClick(2)">未完成</button>
```

- 在 TodoButton 组件中声明如下的自定义事件，用来更新父组件通过 v-model 指令传递过来 的 props 数据：

```javascript
export default {
  name: 'TodoButton',
  emits: ['update:active'],
  props: {
    active: {
      type: Number,
      required: true,
      default: 0,
    },
  },
}
```

- 在 TodoButton 组件的 methods 节点中声明 onBtnClick 事件处理函数如下：

```JavaScript
methods: {
  onBtnClick(index) {
    // 1.如果当前点击的按钮的索引值，等于 props传递过来的索引值，则没必要触发 update:active 自定义事件
    if (index === this.active) return
    // 2.通过 this.$emit() 方法触发自定义事件
    this.$emit('update:active', index)
  },
},
```

- app.vue 绑定button按钮属性

```javascript
<todo-button v-model:active="activeBtnIndex"></todo-button>
```

#### 5 通过计算属性动态切换列表的数据

> 需求分析： 

> 点击不同的按钮，切换显示不同的列表数据。此时可以根据当前激活按钮的索引，动态计算出要显示的列表数据并返回即可！

- 在 App 根组件中声明如下的计算属性：

```javascript
computed: {
  tasklist() {
    switch(this.activeBtnIndex) {
      case 0:
        return this.todolist
      case 1:
        return this.todolist.filter(x => x.done === true)
      case 2:
        return this.todolist.filter(x => x.done !== true)
    }
  }
},
```

- 在 App 根组件的 DOM 结构中，将 TodoList 组件的 :list="todolist" 修改为：

```javascript
<todo-list :list="tasklist" class="mt-2"></todo-list>
```

## 2.8 watch 侦听器

### 2.8.1 定义

watch 侦听器允许开发者监视数据的变化，从而针对数据的变化做特定的操作。例如，监视用户名的变化并发 起请求，判断用户名是否可用。

### 2.8.2 计算属性与侦听器

计算属性和侦听器侧重的应用场景不同： 

计算属性侧重于监听多个值的变化，最终计算并返回一个新值 

侦听器侧重于监听单个数据的变化，最终执行特定的业务处理，不需要有任何返回值

## 2.9 组件之间的数据共享

### 2.9.1 父组件向子组件共享数据

父组件通过 v-bind 属性绑定向子组件共享数据。同时，子组件需要使用 props 接收数据。

### 2.9.2 子组件向父组件共享数据

子组件通过自定义事件的方式向父组件共享数据。

子组件使用 $emit 方法当事件触发时，发送数据；

父组件监听自定义事件，通过形参接收数据

### 2.9.3 父子组件之间数据的双向同步

父组件在使用子组件期间，可以使用 v-model 指令维护组件内外数据的双向同步：

![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209031020537.png)

### 2.9.4 兄弟组件之间的数据共享

兄弟组件之间实现数据共享的方案是 EventBus。可以借助于第三方的包 mitt 来创建 eventBus 对象，从而实 现兄弟组件之间的数据共享。示意图如下：

#### 1 安装 mitt 依赖包

```bash
npm install mitt@2.1.0
```

#### 2 创建公共的 EventBus 模块

```javascript
// eventBus.js

// 导入 mitt 包
import mitt from 'mitt'
// 创建 EventBus 的实例对象
const bus = mitt()

// 将 EventBus 的实例对象共享出去
export default bus
```

#### 3 在数据接收方自定义事件

在数据接收方，调用 bus.on('事件名称', 事件处理函数) 方法注册一个自定义事件。示例代码如下：

```javascript
// 导入 eventBus.js 模块，得到共享的 bus 对象
import bus from './eventBus.js'

export default {
  data() { return { count:0 }},
  created() {
    // 调用bus.on() 方法注册一个自定义事件，通过事件处理函数的形参接收数据
    bus.on('countChange',(count) => {
      this.count = count
    })
  }
}
```

#### 4 在数据接发送方触发事件

在数据发送方，调用 bus.emit('事件名称', 要发送的数据) 方法触发自定义事件。示例代码如下：

```JavaScript
// 导入 eventBus.js 模块，得到共享的 bus 对象
import bus from './eventBus.js'

export default {
  data() { return { count:0 }},
  methods: {
    addCount() {
      this.count ++
      bus.emit('countChange', this.count) // 调用 bus.emit() 方法触发自定义事件，并发送数据
    }
  }
}
```

### 2.9.5 后代关系组件之间的数据共享

后代关系组件之间共享数据，指的是父节点的组件向其子孙组件共享数据。此时组件之间的嵌套关系比较复杂， 可以使用 provide 和 inject 实现后代关系组件之间的数据共享。

#### 1 父节点通过 provide 共享数据

父节点的组件可以通过 provide 方法，对其子孙组件共享数据

```JavaScript
export default {
  data() {
    return {
      color:'red'  // 定义父组件要向子组件共享的数据
    }
  },
  provide() {  // provide 函数 return 的对象中，包含了“要向子孙组件共享的数据”
    return {
      color: this.color,
    }
  }
}
```

#### 2 子孙节点通过  inject 接收数据

子孙节点可以使用 inject 数组，接收父级节点向下共享的数据。示例代码如下：

```JavaScript
<template>
  <h5> 子孙组件 ---- {{color}}</h5>
</template>

<script>
export default {
  // 子孙组件，使用 inject 接收父节点向下共享的 color 数据，并在页面上使用
  inject: ['color'],
}
</script>
```

#### 3 父节点对外共享响应式的数据

父节点使用 provide 向下共享数据时，可以结合 computed 函数向下共享响应式的数据。示例代码如下

```JavaScript
import {computed} from 'vue'
export default {
  data() {
    return { color: 'red' }
  },
  provide() {
    return {
      // 使用 computed 函数，可以把要共享的数据包装为响应式数据
      color: computed(() => this.color),
    }
  }
}
```

#### 4 子孙节点使用响应式的数据

如果父级节点共享的是响应式的数据，则子孙节点必须以 .value 的形式进行使用。示例代码如下：

```JavaScript
<template>
  <!-- 响应式的数据，必须以.value的形式进行使用 -->
  <h5> 子孙组件 ---- {{color.value}}</h5>
</template>

<script>
export default {
  // 子孙组件，使用 inject 接收父节点向下共享的 color 数据，并在页面上使用
  inject: ['color'],
}
</script>
```

#### 5 vuex

vuex 是终极的组件之间的数据共享方案。在企业级的 vue 项目开发中，vuex 可以让组件之间的数据共享变得高 效、清晰、且易于维护。

## 2.10 vue3.x中全局配置 axios

在实际项目开发中，几乎每个组件中都会用到 axios 发起数据请求。此时会遇到如下两个问题： 

① 每个组件中都需要导入 axios（代码臃肿） 

② 每次发请求都需要填写完整的请求路径（不利于后期的维护）



在 main.js 入口文件中，通过 app.config.globalProperties 全局挂载 axios，示例代码如下：

```
// 为 axios 配置请求的根路径
axios.defaults.baseURL = 'http://api.com'

// 将 axios 挂载为 app 的全局自定义属性
// 每个组件可以通过this直接访问到全局挂载的自定义属性
app.config.globalProperties.$http = axios
```

![image-20220903175527816](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209031755372.png)

但是该方法修改了main.js文件，修改根路径后项目需要重启



新建 utils/request.js

```javascript
import axios from 'axios'

// 调用 axios.create() 函数，创建一个 axios 的实例对象，用 request 来接收
const request = axios.create({
  // 指定请求的根路径
  baseURL: 'https://www.escook.cn'
})

export default request

```

新建 api/

```javascript
// 文章相关的 API 接口，都封装到这个模块中
import request from '@/utils/request.js'

// 向外按需导出一个 API 函数
export const getArticleListAPI = function(_page, _limit) {
  return request.get('/articles', {
    // 请求参数
    params: {
      _page,
      _limit
    }
  })
}

```

使用

```javascript
import { getArticleListAPI } from '@/api/articleAPI.js'
methods: {
  // 封装获取文章列表数据的方法
  async initArticleList() {
    // 发起 GET 请求，获取文章的列表数据
    const { data: res } = await getArticleListAPI(this.page, this.limit)
  }
}
```

# 3 购物车案例

① 初始化项目基本结构 

② 封装 EsHeader 组件 

③ 基于 axios 请求商品列表数据 

④ 封装 EsFooter 组件 

⑤ 封装 EsGoods 组件 

⑥ 封装 EsCounter 组件

## 3.1 初始化项目结构

### 1 运行如下的命令，初始化 vite 项目

```bash
npm init vite-app code-cart
cd code-cart
npm install
```

### 2 清理项目结构

- 把 bootstrap 相关的文件放入 src/assets 目录下 

- 在 main.js 中导入 bootstrap.css 

- 清空 App.vue 组件 

- 删除 components 目录下的 HelloWorld.vue 组件

### 3 为组件的样式启用 less 语法：

```javascript
npm i less -D
```

### 4 初始化 index.css 全局样式如下：

```css
:root {
  font-size: 12px;
}
```

## 3.2 封装es-header 组件

### 1 创建并注册 EsHeader 组件

- 在 src/components/es-header/ 目录下新建 EsHeader.vue 组件：

```javascript
<template>
  <div>EsHeader 组件</div>
</template>
<script>
export default {
  name: 'EsHeader',
}
</script>
<style lang="less" scoped></style>
```

- 在 App.vue 组件中导入并注册 EsHeader.vue 组件：

```javascript
// 导入 header 组件
import EsHeader from './components/es-header/EsHeader.vue'
export default {
  name: 'MyApp',
  components: {
    // 注册 header 组件
    EsHeader,
  },
}
```

- 在 App.vue 的 template 模板结构中使用 EsHeader 组件：

```javascript
<template>
  <div>
    <h1>App 根组件</h1>
    
    <!-- 使用 es-header 组件 -->
    <es-header></es-header>
  </div>
</template>
```

### 2 封装 es-header 组件

> 允许用户自定义 title 标题内容 

> 允许用户自定义 color 文字颜色 

> 允许用户自定义 bgcolor 背景颜色 

> 允许用户自定义 fsize 字体大小 

> es-header 组件必须固定定位到页面顶部的位置，高度为 45px，文本居中，z-index 为 999

- 在 es-header 组件中封装以下的 props 属性：

```javascript
export default {
  name: 'EsHeader',
  props: {
    title: { // 标题内容
      type: String,
      default: 'es-header',
    },
    bgcolor: { // 背景颜色
      type: String,
      default: '#007BFF',
    },
    color: { // 文字颜色
      type: String,
      default: '#ffffff',
    },
    fsize: { // 文字大小
      type: Number,
      default: 12,
    },
  },
}
```

- 渲染标题内容，并动态为 DOM 元素绑定行内的 style 样式对象：

```javascript
<template>
  <div :style="{ color: color, backgroundColor: bgcolor, fontSize: fsize + 'px' }">{{ title }}</div>
</template>

```

- 为 DOM 节点添加 header-container 类名，进一步美化 es-header 组件的样式：

```javascript
<template>
  <div class="header-container" :style="{ color: color,backgroundColor: bgcolor, fontSize: fsize + 'px' }">{{ title }}
  </div>
</template>

<style lang="less" scoped>
.header-container {
  height: 45px;
  line-height: 45px;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
</style>
```

- 在 App 根组件中使用 es-header 组件时，通过 title 属性 指定 标题内容 ：

```javascript
<template>
  <div class="app-container">
    <h1>App 根组件</h1>
 
    <!-- 为 es-header 组件指定 title 属性的值 -->
    <es-header title="购物车案例"></es-header>
  </div>
</template>
```

## 3.3 基于 axios 请求商品列表数据

### 1 全局配置 axios

```javascript
npm i axios -S
```

- 在 main.js 入口文件中导入并全局配置 axios：

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/bootstrap.css'
import './index.css'
// 导入 axios
import axios from 'axios'
const app = createApp(App)
// 配置请求的根路径
axios.defaults.baseURL = 'https://www.escook.cn'
// 将 axios 挂载为全局的 $http 自定义属性
app.config.globalProperties.$http = axios
app.mount('#app')
```

### 2 请求商品列表数据

- 在 App.vue 根组件中声明如下的 data 数据：

```javascript
data() {
  return {
    // 商品列表的数据
    goodslist: [],
  }
},
```

- 在 App.vue 根组件的 created 生命周期函数中，预调用获取商品列表数据 的 methods 方法：

```javascript
// 组件实例创建完毕之后的生命周期函数
created() {
  // 调用 methods 中的 getGoodsList 方法，请求商品列表的数据
  this.getGoodsList()
},
```

- 在 App.vue 根组件的 methods 节点中，声明刚才预调用的 getGoodsList 方法：

```javascript
methods: {
  // 请求商品列表的数据
  async getGoodsList() {
    // 1. 通过组件实例 this 访问到全局挂载的 $http 属性，并发起Ajax 数据请求
    const { data: res } = await this.$http.get('/api/cart')
    // 2. 判断请求是否成功
    if (res.status !== 200) return alert('请求商品列表数据失败！')
    // 3. 将请求到的数据存储到 data 中，供页面渲染期间使用
    this.goodslist = res.list
  },
},
```

## 3.4 封装 es-footer 组件

### 1 创建并注册 EsFooter 组件

- 在 src/components/es-footer/ 目录下新建 EsFooter.vue 组件：

```javascript
<template>
  <div>EsFooter 组件</div>
</template>

<script>
export default {
  name: 'EsFooter',
}
</script>

<style lang="less" scoped></style>
```

- 在 App.vue 组件中导入并注册 EsFooter.vue 组件：

```javascript
// 导入 header 组件
import EsHeader from './components/es-header/EsHeader.vue'
// 导入 footer 组件
import EsFooter from './components/es-footer/EsFooter.vue'
export default {
  name: 'MyApp',
  components: {
    // 注册 header 组件
    EsHeader,
    // 注册 footer 组件
    EsFooter,
  },
}
```

- 在 App.vue 的 template 模板结构中使用 EsFooter 组件：

```javascript
<template>
  <div>
    <h1>App 根组件</h1>
    <!-- 使用 es-header 组件 -->
    <es-header></es-header>
    <!-- 使用 es-footer 组件 -->
    <es-footer></es-footer>
  </div>
</template>
```

### 2 封装 es-footer 组件

1. es-footer 组件必须固定定位到 页面底部 的位置，高度为 50px，内容两端贴边对齐，zindex 为 999 
2.  允许用户自定义 amount 总价格（单位是元），并在渲染时 保留两位小数 
3.  允许用户自定义 total 总数量，并渲染到 结算按钮 中；如果要结算的商品数量为0，则 禁 用结算按钮 
4. 允许用户自定义 isfull 全选按钮的选中状态 5. 允许用户通过 自定义事件 的形式，监听全选按钮 选中状态的变化 ，并获取到 最新的选 中状态

```javascript
<!-- Footer 组件 -->
<my-footer :isfull="false" :total="1" :amount="98" @fullChange="onFullStateChange"></my-footer>
```

#### 1  渲染组件的基础布局

- 将 EsFooter.vue 组件在页面底部进行固定定位：

```javascript
<template>
  <div class="footer-container">EsFooter 组件</div>
</template>

<script>
export default {
  name: 'EsFooter',
}
</script>

<style lang="less" scoped>
.footer-container {
  // 设置宽度和高度
  height: 50px;
  width: 100%;
  // 设置背景颜色和顶边框颜色
  background-color: white;
  border-top: 1px solid #efefef;
  // 底部固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  // 内部元素的对齐方式
  display: flex;
  justify-content: space-between;
  align-items: center;
  // 设置左右 padding
  padding: 0 10px;
}
</style>
```

- 根据 bootstrap 提供的 Checkboxes https://v4.bootcss.com/docs/components/forms/#checkboxes 渲染左侧的 全选 按钮：

```javascript
<template>
  <div class="footer-container">
    <!-- 全选按钮 -->
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="fullCheck" />
      <label class="custom-control-label" for="fullCheck">全选</label>
    </div>
  </div>
</template>
```

- 并在全局样式表 index.css 中覆盖 全选 按钮的圆角样式：

```css
.custom-checkbox .custom-control-label::before {
 border-radius: 10px;
}
```

- 渲染合计对应的价格区域：

```javascript
<template>
  <div class="footer-container">
    <!-- 全选按钮 -->
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="fullCheck" />
      <label class="custom-control-label" for="fullCheck"> 全选 </label>
    </div>
    <!-- 合计 -->
    <div>
      <span>合计：</span>
      <span class="amount">￥0.00</span>
    </div>
  </div>
</template>
```

- 并在当前组件的<style>节点中美化总价格的样式：

```css
.amount {
 color: red;
 font-weight: bold;
}
```

- 根据 bootstrap 提供的 Buttons https://v4.bootcss.com/docs/components/buttons/#examples 渲染结算按钮：

```javascript
<template>
  <div class="footer-container">
    <!-- 全选按钮 -->
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="fullCheck" />
      <label class="custom-control-label" for="fullCheck"> 全选 </label>
    </div>
    <!-- 合计 -->
    <div>
      <span>合计：</span>
      <span class="amount">￥0.00</span>
    </div>
    <!-- 结算按钮 -->
    <button type="button" class="btn btn-primary">结算(0)</button>
  </div>
</template>

```

- 并在当前组件的<style>节点中美化结算按钮的样式：

```javascript
.btn-primary {
  // 设置固定高度
  height: 38px;
  // 设置圆角效果
  border-radius: 19px;
  // 设置最小宽度
  min-width: 90px;
}
```

#### 2 封装自定义属性 amount

> amount 是已勾选商品的总价格

- 在 EsFooter.vue 组件的 props 节点中，声明如下的自定义属性：

```javascript
export default {
  name: 'EsFooter',
  props: {
  // 已勾选商品的总价格
    amount: {
      type: Number,
      default: 0,
    },
  },
}
```

- 在 EsFooter.vue 组件的 DOM 结构中渲染 amount 的值：

```javascript
<!-- 合计 -->
<div>
  <span>合计：</span>
  <!-- 将 amount 的值保留两位小数 -->
  <span class="amount">￥{{ amount.toFixed(2) }}</span>
</div>
```

#### 3 封装自定义属性 total

> total 为已勾选商品的总数量

- 在 EsFooter.vue 组件的 props 节点中，声明如下的自定义属性：

```javascript
export default {
  name: 'EsFooter',
  props: {
    // 已勾选商品的总价格
    amount: {
      type: Number,
      default: 0,
    },
    // 已勾选商品的总数量
    total: {
      type: Number,
      default: 0,
    },
  },
}
```

- 在 EsFooter.vue 组件的 DOM 结构中渲染 total 的值：

```javascript
<!-- 结算按钮 -->
<button type="button" class="btn btn-primary">结算({{total}})</button>
```

- 动态控制结算按钮的禁用状态：

```javascript
<!-- disabled 的值为 true，表示禁用按钮 -->
<button type="button" class="btn btn-primary" :disabled="total === 0">结算({{ total }})</button>
```

#### 4 封装自定义属性 isfull

> isfull 是全选按钮的选中状态，true 表示选中，false 表示未选中

- 在 EsFooter.vue 组件的 props 节点中，声明如下的自定义属性：

```javascript
export default {
  name: 'EsFooter',
  props: {
    // 已勾选商品的总价格
    amount: {
      type: Number,
      default: 0,
    },
    // 已勾选商品的总数量
    total: {
      type: Number,
      default: 0,
    },
    // 全选按钮的选中状态
    isfull: {
      type: Boolean,
      default: false,
    },
  },
}
```

- 为复选框动态绑定 ckecked 属性的值：

```javascript
<!-- 全选按钮 -->
<div class="custom-control custom-checkbox">
  <input type="checkbox" class="custom-control-input" id="fullCheck" :checked="isfull" />
  <label class="custom-control-label" for="fullCheck">全选</label>
</div>
```

#### 5 封装自定义事件 fullChange

> 通过自定义事件 fullChange，把最新的选中状态传递给组件的使用者

- 监听复选框选中状态变化的 change 事件：

```
<!-- 全选按钮 -->
<div class="custom-control custom-checkbox">
  <input type="checkbox" class="custom-control-input" id="fullCheck" :checked="isfull" @change="onCheckBoxChange" />
  <label class="custom-control-label" for="fullCheck">全选</label>
</div>

```

- 在 methods 中声明 onCheckBoxChange ，并通过事件对象 e 获取到最新的选中状态：

```javascript
methods: {
  // 监听复选框选中状态的变化
  onCheckBoxChange(e) {
    // e.target.checked 是复选框最新的选中状态
    console.log(e.target.checked)
  },
},
```

- 在 emits 中声明自定义事件：

```javascript
// 声明自定义事件
emits: ['fullChange'],
```

- 在 onCheckBoxChange 事件处理函数中，通过 $emit() 触发自定义事件，把最新的选中 状态传递给当前组件的使用者：

```javascript
methods: {
  onCheckBoxChange(e) {
    // 触发自定义事件
    this.$emit('fullChange', e.target.checked)
  },
},
```

- 在 App.vue 根组件中测试 EsFooter.vue 组件：

```javascript
<!-- 使用 footer 组件 -->
<es-footer :total="0" :amount="0" @fullChange="onFullStateChange"></es-footer>
```

- 并在 methods 中声明 onFullStateChange 处理函数，通过形参获取到全选按钮最新的 选中状态：

```javascript
methods: {
  // 监听全选按钮状态的变化
  onFullStateChange(isFull) {
    // 打印全选按钮最新的选中状态
    console.log(isFull)
  },
},
```

## 3.5 封装 es-goods 组件

### 1 创建并注册 EsGoods 组件

- 在 src/components/es-goods/ 目录下新建 EsGoods.vue 组件：

```javascript
<template>
  <div>EsGoods 组件</div>
</template>

<script>
export default {
  name: 'EsGoods',
}
</script>

<style lang="less" scoped></style>
```

- 在 App.vue 组件中导入并注册 EsGoods.vue 组件：

```javascript
// 导入 header 组件
import EsHeader from './components/es-header/EsHeader.vue'
// 导入 footer 组件
import EsFooter from './components/es-footer/EsFooter.vue'
// 导入 goods 组件
import EsGoods from './components/es-goods/EsGoods.vue'
export default {
  name: 'MyApp',
  components: {
    // 注册 header 组件
    EsHeader,
    // 注册 footer 组件
    EsFooter,
    // 注册 goods 组件
    EsGoods,
  },
}
```

- 在 App.vue 的 template 模板结构中使用 EsGoods 组件：

```javascript
<template>
  <div class="app-container">
    <!-- 使用 header 组件 -->
    <es-header title="购物车案例"></es-header>
    <!-- 使用 goods 组件 -->
    <es-goods></es-goods>
    <!-- 使用 footer 组件 -->
    <es-footer :total="0" :amount="0" @fullChange="onFullStateChange"></es-footer>
  </div>
</template>
```

### 2 封装 es-goods 组件

1. 实现 EsGoods 组件的基础布局 

1. 封装组件的 6 个自定义属性（id, thumb，title，price，count，checked） 
2. 封装组件的自定义事件 stateChange ，允许外界监听组件选中状态的变化

使用示例：

```javascript
<!-- 使用 goods 组件 -->
<es-goods
  v-for="item in goodslist"
  :key="item.id"
  :id="item.id"
  :thumb="item.goods_img"
  :title="item.goods_name"
  :price="item.goods_price"
  :count="item.goods_count"
  :checked="item.goods_state"
  @stateChange="onGoodsStateChange">
</es-goods>

```

#### 1 渲染组件的基础布局

- 渲染 EsGoods 组件的基础 DOM 结构：

```javascript
<template>
 <div class="goods-container">
   <!-- 左侧图片区域 -->
   <div class="left">
      <!-- 商品的缩略图 -->
      <img src="" alt="商品图片" class="thumb" />
   </div>
   
   <!-- 右侧信息区域 -->
   <div class="right">
     <!-- 商品名称 -->
     <div class="top">xxxx</div>
     <div class="bottom">
        <!-- 商品价格 -->
        <div class="price">￥0.00</div>
        <!-- 商品数量 -->
        <div class="count">数量</div>
      </div>
    </div>
  </div>
</template>

```

- 美化组件的布局样式：

```less
.goods-container {
  display: flex;
  padding: 10px;
  // 左侧图片的样式
  .left {
    margin-right: 10px;
    // 商品图片
    .thumb {
      display: block;
      width: 100px;
      height: 100px;
      background-color: #efefef;
    }
  }
  // 右侧商品名称、单价、数量的样式
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    .top {
      font-weight: bold;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
}
```

- 在商品缩略图之外包裹复选框( https://v4.bootcss.com/docs/components/forms/#checkboxes ) 效果：

```javascript
<!-- 左侧图片和复选框区域 -->
<div class="left">
  <!-- 复选框 -->
  <div class="custom-control custom-checkbox">
    <input type="checkbox" class="custom-control-input" id="customCheck1" />
    <!-- 将商品图片包裹于 label 之中，点击图片可以切换“复选框”的选中状态 -->
    <label class="custom-control-label" for="customCheck1">
      <img src="" alt="商品图片" class="thumb" />
    </label>
  </div>
  <!-- <img src="" alt="商品图片" class="thumb" /> -->
</div>
```

- 覆盖复选框的默认样式：

```javascript
.custom-control-label::before,
.custom-control-label::after {
 top: 3.4rem;
}
```

- 在 App.vue 组件中循环渲染 EsGoods.vue 组件：

```javascript
<!-- 使用 goods 组件 -->
<es-goods v-for="item in goodslist" :key="item.id"></es-goods>
```

- 为 EsGoods.vue 添加顶边框：

```javascript
.goods-container {
  display: flex;
  padding: 10px;
  // 最终生成的选择器为 .goods-container + .goods-container
  // 在 css 中，（+）是“相邻兄弟选择器”，表示：选择紧连着另一元素后的元素，二者具有相同的父元素。
  + .goods-container {
    border-top: 1px solid #efefef;
  }
  // ...省略其他样式
}
```

#### 2 封装自定义属性 id

> id 是每件商品的唯一标识符

- 在 EsGoods.vue 组件的 props 节点中，声明如下的自定义属性：

```javascript
export default {
  name: 'EsGoods',
  props: {
  // 唯一的 key 值
    id: {
      type: [String, Number], // id 的值可以是“字符串”也可以是“数值”
      required: true,
    },
  },
}
```

- 在渲染复选框时动态绑定 input 的 id 属性和 label 的 for 属性值：

```javascript
<!-- 复选框 -->
<div class="custom-control custom-checkbox">
  <input type="checkbox" class="custom-control-input" :id="id" />
  <label class="custom-control-label" :for="id">
    <img src="" alt="商品图片" class="thumb" />
  </label>
</div>
```

- 在 App.vue 中使用 EsGoods.vue 组件时，动态绑定 id 属性的值：

```javascript
<!-- 使用 goods 组件 -->
<es-goods v-for="item in goodslist" :id="item.id"></es-goods>
```

#### 3 封装其它属性

> 除了 id 属性之外，EsGoods 组件还需要封装： 缩略图（thumb）、商品名称（title）、单价（price）、数量（count）、勾选状态 （checked）这 5 个属性

- 在 EsGoods.vue 组件的 props 节点中，声明如下的自定义属性：

```javascript
export default {
  name: 'EsGoods',
  props: {
    // 唯一的 key 值
    id: {
      type: [String, Number],
      required: true,
    },
    // 1. 商品的缩略图
    thumb: {
      type: String,
      required: true,
    },
    // 2. 商品的名称
    title: {
      type: String,
      required: true,
    },
    // 3. 单价
    price: {
      type: Number,
      required: true,
    },
    // 4. 数量
    count: {
      type: Number,
      required: true,
    },
    // 5. 商品的勾选状态
    checked: {
      type: Boolean,
      required: true,
    },
  },
}
```

- 在 EsGoods.vue 组件的 DOM 结构中渲染商品的信息数据：

```javascript
<template>
  <div class="goods-container">
    <!-- 左侧图片区域 -->
    <div class="left">
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" :id="id" :checked="checked"/>
        <label class="custom-control-label" :for="id">
          <!-- 商品的缩略图 -->
          <img :src="thumb" alt="商品图片" class="thumb" />
        </label>
      </div>
    </div>

    <!-- 右侧信息区域 -->
    <div class="right">
      <!-- 商品名称 -->
      <div class="top">{{ title }}</div>
      <div class="bottom">
        <!-- 商品价格 -->
        <div class="price">￥{{ price.toFixed(2) }}</div>
        <!-- 商品数量 -->
        <div class="count"> 数量：{{ count }} </div>
      </div>
    </div>
  </div>
</template>
```

- 在 App.vue 组件中使用 EsGoods.vue 组件时，动态绑定对应属性的值：

```javascript
<!-- 使用 goods 组件 -->
<es-goods
  v-for="item in goodslist"
  :key="item.id"
  :id="item.id"
  :thumb="item.goods_img"
  :title="item.goods_name"
  :price="item.goods_price"
  :count="item.goods_count"
  :checked="item.goods_state">
</es-goods>
```

#### 4  封装自定义事件 stateChange

> 点击复选框时，可以把最新的勾选状态，通过自定义事件的方式传递给组件的使用者。

- 在 EsGoods.vue 组件中，监听 checkbox 选中状态变化的事件：

```javascript
<!-- 监听复选框的 change 事件 -->
<input type="checkbox" class="custom-control-input" :id="id":checked="checked" @change="onCheckBoxChange" />
```

- 在 EsGoods.vue 组件的 methods 中声明对应的事件处理函数：

```javascript
methods: {
  // 监听复选框选中状态变化的事件
  onCheckBoxChange(e) {
    // e.target.checked 是最新的勾选状态
    console.log(e.target.checked)
  },
},
```

- 在 EsGoods.vue 组件中声明自定义事件：

```javascript
emits: ['stateChange'],
```

- 完善 onCheckBoxChange 函数的处理逻辑，调用 $emit() 函数触发自定义事件：

```javascript
methods: {
  // 监听复选框选中状态变化的事件
  onCheckBoxChange(e) {
    // 向外发送的数据是一个对象，包含了 { id, value } 两个属性
    this.$emit('stateChange', {
      id: this.id,
      value: e.target.checked,
    })
  },
},
```

- 在 App.vue 根组件中使用 EsGoods.vue 组件时，监听它的 stateChange 事件：

```javascript
<!-- 使用 goods 组件 -->
<es-goods
  v-for="item in goodslist"
  :key="item.id"
  :id="item.id"
  :thumb="item.goods_img"
  :title="item.goods_name"
  :price="item.goods_price"
  :count="item.goods_count"
  :checked="item.goods_state"
  @stateChange="onGoodsStateChange">
</es-goods>
```

- 并在 App.vue 的 methods 中声明如下的事件处理函数：

```javascript
methods: {
  // 监听商品选中状态变化的事件
  onGoodsStateChange(e) {
    // 1. 根据 id 进行查找（注意：e 是一个对象，包含了 id 和 value 两个属性）
    const findResult = this.goodslist.find(x => x.id === e.id)
    // 2. 找到了对应的商品，则更新其选中状态
    if (findResult) {
      findResult.goods_state = e.value
    }
  },
}
```

### 3.6 实现合计、结算数量、全选功能

#### 1 动态统计已勾选商品的总价格

> 需求分析： 合计的商品总价格，依赖于 goodslist 数组中每一件商品信息的变化，此场景下适合使用计算属 性。

- 在 App.vue 中声明如下的计算属性：

```javascript
computed: {
  // 已勾选商品的总价
  amount() {
    // 1. 定义商品总价格
    let a = 0
    // 2. 循环累加商品总价格
    this.goodslist
        .filter(x => x.goods_state)
        .forEach(x => {
          a += x.goods_price * x.goods_count
        })
    // 3. 返回累加的结果
    return a
  },
},
```

- 在 App.vue 中使用 EsFooter.vue 组件时，动态绑定已勾选商品的总价格：

```javascript
<!-- 使用 footer 组件 -->
<es-footer :total="0" :amount="amount"></es-footer>
```

#### 2 动态统计已勾选商品的总数量

> 需求分析： 已勾选商品的总数量依赖项 goodslist 中商品勾选状态的变化，此场景下适合使用计算属性。

- 在 App.vue 中声明如下的计算属性：

```javascript
computed: {
  // 已勾选商品的总数量
  total() {
    // 1. 定义已勾选的商品总数量
    let t = 0
    // 2. 循环累加
    this.goodslist
        .filter(x => x.goods_state)
        .forEach(x => (t += x.goods_count))
    // 3. 返回计算的结果
    return t
  },
},
```

- 在 App.vue 中使用 EsFooter.vue 组件时，动态绑定已勾选商品的总数量：

```javascript
<!-- 使用 footer 组件 -->
<es-footer :total="total" :amount="amount"></es-footer>
```

#### 3 实现全选功能

- 在 App.vue 组件中监听到 EsFooter.vue 组件的选中状态发生变化时，立即更新 goodslist 中每件商品的选中状态即可：

```javascript
<!-- 使用 footer 组件 -->
<es-footer :total="total" :amount="amount" @fullChange="onFullStateChange"></es-footer>
```

- 在 onFullStateChange 的事件处理函数中修改每件商品的选中状态：

```javascript
methods: {
  // 监听全选按钮状态的变化
  onFullStateChange(isFull) {
    this.goodslist.forEach(x => x.goods_state = isFull)
  },
}
```

## 3.7 封装 es-counter 组件

### 1 创建并注册 EsCounter 组件

- 在 src/components/es-counter/ 目录下新建 EsCounter.vue 组件：

```javascript
<template>
  <div>EsCounter 组件</div>
</template>

<script>
export default {
  name: 'EsCounter',
}
</script>

<style lang="less" scoped></style>
```

- 在 EsGoods.vue 组件中导入并注册 EsCounter.vue 组件：

```javascript
// 导入 counter 组件
import EsCounter from '../es-counter/EsCounter.vue'

export default {
  name: 'EsGoods',
  components: {
    // 注册 counter 组件
    EsCounter,
  }
}
```

- 在 EsGoods.vue 的 template 模板结构中使用 EsCounter.vue 组件：

```javascript
<div class="bottom">
  <!-- 商品价格 -->
  <div class="price">￥{{ price.toFixed(2) }}</div>
  <!-- 商品数量 -->
  <div class="count">
    <!-- 使用 es-counter 组件 -->
    <es-counter></es-counter>
  </div>
</div>
```

### 2 封装 es-counter 组件

1. 渲染组件的 基础布局 
2. 实现数量值的 加减操作 
3. 处理 min 最小值 
4. 使用 watch 侦听器处理文本框输入的结果 
5. 封装 numChange 自定义事件

代码示例：

```javascript
<es-counter :num="count" :min="1" @numChange="getNumber"></es-counter>
```

#### 1 渲染组件的基础布局

- 基于 bootstrap 提供的 Buttons https://v4.bootcss.com/docs/components/buttons/#examples 和 form-control 渲染组件的基础布局：

```javascript
<template>
  <div class="counter-container">
    <!-- 数量 -1 按钮 -->
    <button type="button" class="btn btn-light btn-sm">-</button>
    <!-- 输入框 -->
    <input type="number" class="form-control form-control-sm ipt-num" />
    <!-- 数量 +1 按钮 -->
    <button type="button" class="btn btn-light btn-sm">+</button>
  </div>
</template>
```

- 美化当前组件的样式：

```javascript
.counter-container {
  display: flex;
  // 按钮的样式
  .btn {
    width: 25px;
  }
  // 输入框的样式
  .ipt-num {
    width: 34px;
    text-align: center;
    margin: 0 4px;
  }
}
```

#### 2 实现数值的渲染及加减操作

> 思路分析： 
>
> 1. 加减操作需要依赖于 EsCounter 组件的 data 数据 
> 2. 初始数据依赖于父组件通过 props 传递进来 将父组件传递进来的 props 初始值转存到 data 中，形成 EsCounter 组件的内部状态！

- 在 EsCounter.vue 组件中声明如下的 props：

```javascript
props: {
  // 数量值
  num: {
    type: Number,
    default: 0,
  },
},
```

- 在 EsGoods.vue 组件中通过属性绑定的形式，将数据传递到 EsCounter.vue 组件中：

```javascript
<!-- 商品数量 -->
<div class="count">
  <es-counter :num="count"></es-counter>
</div>
```

> 注意：不要直接把 num 通过 v-model 指令双向绑定到 input 输入框，因为 vue 规定：props 的值只读的！例如下面的做法是错误的：

```javascript
<!-- Warning 警告：不要模仿下面的操作 -->
<input type="number" class="form-control form-control-sm ipt-num" v-model.number="num" />
```

- 正确的做法：将 props 的初始值转存到 data 中，因为 data 中的数据是可读可写的！示例代码如下：

```javascript
export default {
  name: 'EsCounter',
  props: {
    // 初始数量值【只读数据】
    num: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
    // 内部状态值【可读可写的数据】
    // 通过 this 可以访问到 props 中的初始值
      number: this.num,
    }
  },
}
```

- 并且把 data 中的 number 双向绑定到 input 输入框：

```javascript
<input type="number" class="form-control form-control-sm ipt-num" v-model.number="number" />
```

- 为 -1 和 +1 按钮绑定响应的点击事件处理函数：

```javascript
<button type="button" class="btn btn-light btn-sm"@click="onSubClick">-</button>
<input type="number" class="form-control form-control-sm ipt-num"v-model.number="number" />
<button type="button" class="btn btn-light btn-sm"@click="onAddClick">+</button>
```

- 并在 methods 中声明对应的事件处理函数如下：

```javascript
methods: {
  // -1 按钮的事件处理函数
  onSubClick() {
    this.number -= 1
  },
  // +1 按钮的事件处理函数
  onAddClick() {
    this.number += 1
  },
},
```

#### 3 实现 min 最小值的处理

> 需求分析： 购买商品时，购买的数量最小值为 1

- 在 EsCounter.vue 组件中封装如下的 props：

```javascript
export default {
  name: 'EsCounter',
  props: {
    // 数量值
    num: {
      type: Number,
      default: 0,
    },
    // 最小值
    min: {
      type: Number,
      // min 属性的值默认为 NaN，表示不限制最小值
      default: NaN,
    },
  },
}
```

- 在 -1 按钮的事件处理函数中，对 min 的值进行判断和处理：

```javascript
methods: {
  // -1 按钮的事件处理函数
  onSubClick() {
    // 判断条件：min 的值存在，且 number - 1 之后小于 min
    if (!isNaN(this.min) && this.number - 1 < this.min) return
    this.number -= 1
  },
}
```

- 在 EsGoods.vue 组件中使用 EsCounter.vue 组件时指定 min 最小值：

```javascript
<!-- 商品数量 -->
<div class="count">
  <!-- 指定数量的最小值为 1 -->
  <es-counter :num="count" :min="1"></es-counter>
</div>
```

#### 4 处理输入框的输入结果

> 思路分析： 
>
> 1. 将输入的新值转化为整数 
> 2. 如果转换的结果不是数字，或小于1，则强制 number 的值等于1 
>
> 3. 如果新值为小数，则把转换的结果赋值给 number

- 为输入框的 v-model 指令添加 .lazy 修饰符（当输入框触发 change 事件时更新 vmodel 所绑定到的数据源）：

```javascript
<input type="number" class="form-control form-control-sm ipt-num" v-model.number.lazy="number" />
```

- 通过 watch 侦听器监听 number 数值的变化，并按照分析的步骤实现代码：

```javascript
export default {
  name: 'EsCounter',
  watch: {
    // 监听 number 数值的变化
    number(newVal) {
      // 1. 将输入的新值转化为整数
      const parseResult = parseInt(newVal)
      // 2. 如果转换的结果不是数字，或小于1，则强制 number 的值等于
      if (isNaN(parseResult) || parseResult < 1) {
        this.number = 1
        return
      }
      // 3. 如果新值为小数，则把转换的结果赋值给 number
      if (String(newVal).indexOf('.') !== -1) {
        this.number = parseResult
        return
      }
      console.log(this.number)
    },
  },
}
```

#### 5 把最新的数据传递给使用者

> 需求分析： 当 EsGoods 组件使用 EsCounter 组件时，期望能够监听到商品数量的变化，此时需要使用自定义事件的方式，把最新的数据传递给组件的使用者。

- 在 EsCounter.vue 组件中声明自定义事件如下：

```javascript
emits: ['numChange'],
```

- 在 EsCounter.vue 组件的 watch 侦听器中触发自定义事件：

```javascript
watch: {
  number(newVal) {
    // 1. 将输入的新值转化为整数
    const parseResult = parseInt(newVal)
    // 2. 如果转换的结果不是数字，或小于1，则强制 number 的值等于1
    if (isNaN(parseResult) || parseResult < 1) {
      this.number = 1
      return
    }
    // 3. 如果新值为小数，则把转换的结果赋值给 number
    if (String(newVal).indexOf('.') !== -1) {
      this.number = parseResult
      return
    }
    // 触发自定义事件，把最新的 number 数值传递给组件的使用者
    this.$emit('numChange', this.number)
  },
},
```

- 在 EsGoods.vue 组件中监听 EsCounter.vue 组件的自定义事件：

```javascript
<!-- 商品数量 -->
<div class="count">
  <es-counter :num="count" :min="1" @numChange="getNumber"></es-counter>
</div>
```

- 并声明对应的事件处理函数如下：

```javascript
methods: {
  // 监听数量变化的事件
  getNumber(num) {
    console.log(num)
  },
}
```

#### 6 更新购物车中商品的数量

> 思路分析： 
>
> 1. 在 EsGoods 组件中获取到最新的商品数量 
> 2. 在 EsGoods 组件中声明自定义事件 
> 3. 在 EsGoods 组件中触发自定义事件，向外传递数据对象 { id, value } 
> 4. 在 App 根组件中监听 EsGoods 组件的自定义事件，并根据 id 更新对应商品的数量

- 在 EsGoods.vue 组件中声明自定义事件 countChange ：

```javascript
emits: ['stateChange', 'countChange'],
```

- 在 EsCounter.vue 组件的 numChange 事件处理函数中，触发步骤1声明的自定义事件：

```javascript
<es-counter :num="count" :min="1" @numChange="getNumber"></es-counter>

methods: {
  // 监听数量变化的事件
  getNumber(num) {
    // 触发自定义事件，向外传递数据对象 { id, value }
    this.$emit('countChange', {
      // 商品的 id
      id: this.id,
      // 最新的数量
      value: num,
    })
  },
}
```

- 在 App.vue 根组件中使用 EsGoods.vue 组件时，监听它的自定义事件 countChange ：

```javascript
<!-- 使用 goods 组件 -->
<es-goods
  v-for="item in goodslist"
  :key="item.id"
  :id="item.id"
  :thumb="item.goods_img"
  :title="item.goods_name"
  :price="item.goods_price"
  :count="item.goods_count"
  :checked="item.goods_state"
  @stateChange="onGoodsStateChange"
  @countChange="onGoodsCountChange">
</es-goods>
```

- 并在 methods 中声明对应的事件处理函数：

```javascript
methods: {
  // 监听商品数量变化的事件
  onGoodsCountChange(e) {
    // 根据 id 进行查找
    const findResult = this.goodslist.find(x => x.id === e.id)
    // 找到了对应的商品，则更新其数量
    if (findResult) {
      findResult.goods_count = e.value
    }
  }
}
```

# 4 table 案例

① 搭建项目的基本结构 

② 请求商品列表的数据 

③ 封装 MyTable 组件 

④ 实现删除功能 

⑤ 实现添加标签的功能

## 4.1 初始化项目结构

### 4.1.1 运行如下的命令，初始化 vite 项目

```bash
npm init vite-app table-demo
cd table-demo
npm install
npm run dev
```

### 4.1.2 清理项目结构

- 把 bootstrap 相关的文件放入 src/assets 目录下 

- 在 main.js 中导入 bootstrap.css 

- 清空 App.vue 组件 

- 删除 components 目录下的 HelloWorld.vue 组件

### 4.1.3 为组件的样式启用 less 语法：

```javascript
npm i less -D
```

### 4.1.4 初始化 index.css 全局样式如下：

```css
:root {
  font-size: 12px;
}

body {
  padding: 8px;
}
```

## 4.2 请求商品列表的数据

### 4.2.1 运行如下的命令，安装 Ajax 的请求库

```bash
npm install axios@0.21.0 -S
```

### 4.2.2 在 main.js 入口模块中，导入并全局配置 axios

```javascript
// 1. 导入 axios
import axios from 'axios'
const app = createApp(App)

// 2. 将 axios 挂载到全局，今后，每个组件中，都可以直接通过
this.$http 代替 axios 发起 Ajax 请求
app.config.globalProperties.$http = axios

// 3. 配置请求的根路径
axios.defaults.baseURL = 'https://www.escook.cn'
app.mount('#app')

```

### 4.2.3 在 App.vue 组件的 data 中声明 goodslist 商品列表数据

```javascript
data() {
  return {
     // 商品列表数据
     goodslist: []
  }  
}
```

### 4.2.4 在 App.vue 组件的 methods 中声明 getGoodsList 方法，用来从服务器请求商品列表的数据

```javascript
methods: {
  // 初始化商品列表的数据
  async getGoodsList() {
    // 发起 Ajax 请求
    const { data: res } = await this.$http.get('/api/goods')
    // 请求失败
    if (res.status !== 0) return console.log('获取商品列表失败！')
    // 请求成功
    this.goodslist = res.data
  }
}
```

### 4.2.5 在 App.vue 组件中，声明 created 生命周期函数，并调用 getGoodsList 方法

```javascript
created() {
  this.getGoodsList()
}
```

## 4.3 封装 MyTable 组件

> 1. 用户通过名为 data 的 prop 属性，为 MyTable.vue 组件指定数据源 
> 2. 在 MyTable.vue 组件中，预留名称为 header 的具名插槽 
> 3.  在 MyTable.vue 组件中，预留名称为 body 的作用域插槽

### 4.3.1 创建并使用 MyTable 组件

#### 1 在 components/my-table 目录下新建 MyTable.vue 组件

```javascript
<template>
  <div>MyTable 组件</div>
</template>
<script>
export default {
  name: 'MyTable',
  data() {
    return {
      // 商品列表的数据
      goodslist: [],
    }
  },
}
</script>
<style lang="less" scoped></style>
```

#### 2 在 App.vue 组件中导入并注册 MyTable.vue 组件

```javascript
// 导入 MyTable 组件
import MyTable from './components/my-table/MyTable.vue'
export default {
  name: 'MyApp',
  // ... 省略其它代码
  // 注册 MyTable 组件
  components: {
    MyTable
  }
}

```

#### 3 在 App.vue 组件的 DOM 结构中使用 MyTable.vue 组件

```javascript
<template>
  <div>
    <h1>App 根组件</h1>
    <hr />
    <!-- 使用表格组件 -->
    <my-table></my-table>
  </div>
</template>
```

### 4.3.2 为表格声明 data 数据源

#### 1 在 MyTable.vue 组件的 props 节点中声明表格的 data 数据源

```javascript
export default {
  name: 'MyTable',
  props: {
    // 表格的数据源
    data: {
      type: Array,
      required: true,
      default: [],
    },
  },
}
```

#### 2 在 App.vue 组件中使用 MyTable.vue 组件时，通过属性绑定的形式为表格指定 data 数据源

```javascript
<!-- 使用表格组件 -->
<my-table :data="goodslist"></my-table>
```

### 4.3.3  封装 MyTable 组件的模板结构

#### 1 基于 bootstrap 提供的Tables( https://v4.bootcss.com/docs/content/tables/ )，在 MyTable.vue 组件中渲染最基本的模板结构

```javascript
<template>
  <table class="table table-bordered table-striped">
    <!-- 表格的标题区域 -->
    <thead>
      <tr>
        <th>#</th>
        <th>商品名称</th>
        <th>价格</th>
        <th>标签</th>
        <th>操作</th>
      </tr>
    </thead>
    <!-- 表格的主体区域 -->
    <tbody></tbody>
  </table>
</template>
```

#### 2 为了提高组件的复用性，最好把表格的 标题区域 预留为  具名插槽，方便使用者 自定义表格的标题

```javascript
<template>
  <table class="table table-bordered table-striped">
    <!-- 表格的标题区域 -->
    <thead>
      <tr>
      <!-- 命名插槽 -->
      <slot name="header"></slot>
      </tr>
     </thead>
    <!-- 表格的主体区域 -->
    <tbody></tbody>
  </table>
</template>
```

#### 3 在 App.vue 组件中，通过具名插槽的形式，为 MyTable.vue 组件指定标题名称

```javascript
<!-- 使用表格组件 -->
<my-table :data="goodslist">
  <!-- 表格的标题 -->
  <template v-slot:header>
    <th>#</th>
    <th>商品名称</th>
    <th>价格</th>
    <th>标签</th>
    <th>操作</th>
  </template>
</my-table>
```

### 4.3.4 预留名称为 body 的作用域插槽

#### 1 在 MyTable.vue 组件中，通过 v-for 指令循环渲染表格的数据行

```javascript
<template>
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <slot name="header"></slot>
      </tr>
    </thead>
    <!-- 表格的主体区域 -->
    <tbody>
      <!-- 使用 v-for 指令，循环渲染表格的数据行 -->
      <tr v-for="(item, index) in data" :key="item.id"></tr>
    </tbody>
  </table>
</template>
```

#### 2 为了提高 MyTable.vue 组件的复用性，最好把表格数据行里面的 td 单元格预留为 具名插槽。示例代码如下

```javascript
<template>
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <slot name="header"></slot>
      </tr>
    </thead>
    <!-- 表格的主体区域 -->
    <tbody>
      <!-- 使用 v-for 指令，循环渲染表格的数据行 -->
      <tr v-for="(item, index) in data" :key="item.id">
      <!-- 为数据行的 td 预留的插槽 -->
        <slot name="body"></slot>
      </tr>
    </tbody>
  </table>
</template>
```

#### 3 为了让组件的使用者在提供 body 插槽的内容时，能够自定义内容的渲染方式，需要把 body 具名插槽升级为 作用域插槽

```javascript
<template>
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <slot name="header"></slot>
      </tr>
    </thead>
    <!-- 表格的主体区域 -->
    <tbody>
      <!-- 使用 v-for 指令，循环渲染表格的数据行 -->
      <tr v-for="(item, index) in data" :key="item.id">
      <!-- 为数据行的 td 预留的“作用域插槽” -->
        <slot name="body" :row="item" :index="index"></slot>
      </tr>
    </tbody>
  </table>
</template>
```

#### 4 在 App.vue 组件中，基于作用域插槽的方式渲染表格的数据

```javascript
<!-- 使用表格组件 -->
<my-table :data="goodslist">
  <!-- 表格的标题 -->
  <template v-slot:header>
    <th>#</th>
    <th>商品名称</th>
    <th>价格</th>
    <th>标签</th>
    <th>操作</th>
  </template>
  <!-- 表格每行的单元格 -->
  <template v-slot:body="{ row, index }">
    <td>{{ index + 1 }}</td>
    <td>{{ row.goods_name }}</td>
    <td>￥{{ row.goods_price }}</td>
    <td>{{ row.tags }}</td>
    <td>
      <button type="button" class="btn btn-danger btn-sm">删除</button>
    </td>
  </template>
</my-table>
```

## 4.4 实现删除功能

#### 1 为删除按钮绑定 click 事件处理函数

```javascript
<td>
  <button type="button" class="btn btn-danger btn-sm"@click="onRemove(row.id)">删除</button>
</td>
```

#### 2 在 App.vue 组件的 methods 中声明事件处理函数如下

```javascript
methods: {
  // 根据 Id 删除商品信息
  onRemove(id) {
    this.goodslist = this.goodslist.filter(x => x.id !== id)
  },
}
```

## 4.5 实现添加标签的功能

### 4.5.1 自定义渲染标签列

根据 bootstrap 提供的 Badge ( https://v4.bootcss.com/docs/components/badge/#contextual-variations )效果，循环渲染商品的标签信息如下

```javascript
<td>
  <span class="badge badge-warning ml-2" v-for="item in row.tags":key="item">{{tag}}</span>
</td>
```

### 4.5.2 实现 input 和 button 的按需展示

#### 1 使用 v-if 结合 v-else 指令，控制 input 和 button 的按需展示

```javascript
<td>
  <!-- 基于当前行的 inputVisible，来控制 input 和 button 的按需展示-->
  <input type="text" class="form-control form-control-sm ipt-tag" v-if="row.inputVisible">
  <button type="button" class="btn btn-primary btn-sm" v-else>+Tag</button>
  <span class="badge badge-warning ml-2" v-for="item in row.tags":key="item">{{item}}</span>
</td>
```

#### 2 点击按钮，控制 input 和 button 的切换

```javascript
<td>
  <!-- 基于当前行的 inputVisible，来控制 input 和 button 的按需展示-->
  <input type="text" class="form-control form-control-sm ipt-tag" v-if="row.inputVisible" />
  <button type="button" class="btn btn-primary btn-sm" v-else @click="row.inputVisible = true">+Tag</button>
  <span class="badge badge-warning ml-2" v-for="item in row.tags":key="item">{{item}}</span>
</td>
```

### 4.5.3 让 input 自动获取焦点

#### 1 在 App.vue 组件中，通过 directives 节点自定义 v-focus 指令如下

```javascript
directives: {
  // 封装自动获得焦点的指令
  focus(el) {
    el.focus()
  },
}
```

#### 2 为 input 输入框应用 v-focus 指令

```javascript
<input type="text" class="form-control ipt-tag form-control-sm" vif="row.inputVisible" v-focus />
```

### 4.5.4 文本框失去焦点自动隐藏

#### 1 使用 v-model 指令把 input 输入框的值双向绑定到 row.inputValue 中

```javascript
<input
  type="text"
  class="form-control ipt-tag form-control-sm"
  v-if="row.inputVisible"
  v-focus
  v-model.trim="row.inputValue"
/>
```

#### 2 监听文本框的 blur 事件，在触发其事件处理函数时，把 当前行的数据 传递进去

```javascript
<input
  type="text"
  class="form-control ipt-tag form-control-sm"
  v-if="row.inputVisible"
  v-focus
  v-model.trim="row.inputValue"
  @blur="onInputConfirm(row)"
/>
```

#### 3 在 App.vue 组件的 methods 节点下声明 onInputConfirm 事件处理函数

```javascript
onInputConfirm(row) {
  // 1. 把用户在文本框中输入的值，预先转存到常量 val 中
  const val = row.inputValue
  // 2. 清空文本框的值
  row.inputValue = ''
  // 3. 隐藏文本框
  row.inputVisible = false
}
```

### 4.5.5 为商品添加新的 tag 标签

进一步修改 onInputConfirm 事件处理函数如下

```javascript
onInputConfirm(row) {
  // 把用户在文本框中输入的值，预先转存到常量 val 中
  const val = row.inputValue
  // 清空文本框的值
  row.inputValue = ''
  // 隐藏文本框
  row.inputVisible = false
  
  // 1.1 判断 val 的值是否为空，如果为空，则不进行添加
  // 1.2 判断 val 的值是否已存在于 tags 数组中，防止重复添加
  if (!val || row.tags.indexOf(val) !== -1) return
  // 2. 将用户输入的内容，作为新标签 push 到当前行的 tags 数组中
  row.tags.push(val)
}
```

### 4.5.6 响应文本框的回车按键

当用户在文本框中敲击了 回车键 的时候，也希望能够把当前输入的内容添加为 tag 标签。此时，可 以为文本框绑定 keyup 事件如下:

```javascript
<input
 type="text"
 class="form-control ipt-tag form-control-sm"
 v-if="row.inputVisible"
 v-focus
 v-model.trim="row.inputValue"
 @blur="onInputConfirm(row)"
 @keyup.enter="onInputConfirm(row)"
/>
```

### 4.5.7 响应文本框的 esc 按键

当用户在文本框中敲击了 esc 按键的时候，希望能够快速清空文本框的内容。此时，可以为文本框 绑定 keyup 事件如下:

```javascript
<input
 type="text"
 class="form-control ipt-tag form-control-sm"
 v-if="row.inputVisible"
 v-focus
 v-model.trim="row.inputValue"
 @blur="onInputConfirm(row)"
 @keyup.enter="onInputConfirm(row)"
 @keyup.esc="row.inputValue = ''"
/>
```

# 5 路由

## 5.1 vue-router 的基本使用

vue-router 是 vue.js 官方给出的路由解决方案。它只能结合 vue 项目进行使用，能够轻松的管理 SPA 项目 中组件的切换

vue-router 目前有 3.x 的版本和 4.x 的版本。其中： 

- vue-router 3.x 只能结合 vue2 进行使用 

- vue-router 4.x 只能结合 vue3 进行使用 

vue-router 3.x 的官方文档地址：https://router.vuejs.org/zh/ 

vue-router 4.x 的官方文档地址：https://next.router.vuejs.org/

### 5.1.1 使用步骤

① 在项目中安装 vue-router 

② 定义路由组件 

③ 声明路由链接和占位符 

④ 创建路由模块 

⑤ 导入并挂载路由模块

#### 1 在项目中安装 vue-router

在 vue3 的项目中，只能安装并使用 vue-router 4.x。安装的命令如下:

```bash
npm install vue-router@next -S
```

#### 2 定义路由组件

在项目中定义 MyHome.vue、MyMovie.vue、MyAbout.vue 三个组件，将来要使用 vue-router 来控制它们 的展示与切换

#### 3 声明路由链接和占位符

可以使用 <router-link> 标签来声明路由链接，并使用 <router-view> 标签来声明路由占位符。示例代码如下

```javascript
<template>
  <div class="app-container">
    <h1>App 组件</h1>
    <!-- 1.定义路由连接 -->
    <router-link to="/home">首页</router-link>&nbsp;
    <router-link to="/movie">电影</router-link>&nbsp;
    <router-link to="/about">关于</router-link>
    <hr />
    <!-- 2.定义路由的占位符 -->
    <router-view></router-view>
  </div>
</template>
```

#### 4 创建路由模块

在项目中创建 router.js 路由模块，在其中按照如下 5个步骤创建并得到路由的实例对象： 

① 从 vue-router 中按需导入两个方法 

```JavaScript
// 1. 从 vue-router 中按需导入两个方法
// createRouter 方法用于创建路由的实例对象
// createWebHashHistory 用于指定路由的工作模式(hash模式)
import { createRouter, createWebHashHistory } from 'vue-router'
```

② 导入需要使用路由控制的组件 

```javascript
// 2. 导入组件，这些组件将要以路由的方式，来控制他们的切换
import Home from './MyHome.vue'
import Movie from './MyMovie.vue'
import About from './MyAbout.vue'
```

③ 创建路由实例对象 

```JavaScript
// 3. 创建路由对象
const router = createRouter({
  // 3.1 指定路由的工作模式
  history: createWebHashHistory(),
  // 自定义路由高亮的 class 类
  linkActiveClass: 'active-router',
  // 3.2 声明路由的匹配规则
  routes: [
    { path: '/', redirect: '/home' },  // 路由重定向
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/about', component: About },
  ],
})
```

④ 向外共享路由实例对象 

```javascript
// 4. 导出路由对象
export default router
```

⑤ 在 main.js 中导入并挂载路由模块

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/bootstrap.css'
import './index.css'

import router from './router'
const app = createApp(App)

// 挂载路由模块
app.use(router)

app.mount('#app')
```

## 5.2 高级用法

### 5.2.1 路由高亮

可以通过如下的两种方式，将激活的路由链接进行高亮显示： 

① 使用默认的高亮 class 类 

被激活的路由链接，默认会应用一个叫做 router-link-active 的类名。开发者可以使用此类名选择器，为激活 的路由链接设置高亮的样式

```JavaScript
// 在 index.css 全局样式表中，更新 router-link-active 的样式
.router-link-active {
  background-color: red;
  color: white;
  font-weight: bold;
}
```

② 自定义路由高亮的 class 类

在创建路由的实例对象时，开发者可以基于 linkActiveClass 属性，自定义路由链接被激活时所应用的类名

```javascript
linkActiveClass: 'active-router',
```

# 6 路由案例

## 6.1 实现步骤

1. 安装并配置 vue-router 4.x 
2. 展示 Login.vue 登录组件 
3. 模拟并实现登录功能  
4. 通过路由渲染 Home.vue 
5. 实现退出登录的功能 
6. 全局控制路由的访问权限  
7. 将左侧菜单改造为路由链接  
8. 渲染用户管理页面的数据 
9. 实现跳转到用户详情页的功能  
10. 开启路由的 props 传参  
11. 通过编程式导航实现后退功能

## 6.2 安装并配置 vue-router 4.x

### 6.2.1 运行如下的命令，安装 vue-router

```bash
npm install vue-router@next -S
```

### 6.2.2 在 src 目录下新建 router.js 路由模块

```javascript
// 1. 按需导入对应的函数
import { createRouter, createWebHashHistory } from 'vue-router'

// 2. 创建路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes: [],
})

// 3. 向外共享路由实例对象
export default router
```

### 6.2.3 在 main.js 入口文件中导入并挂载路由对象

```javascript
// 1. 导入路由模块
import router from './router'
const app = createApp(App)
// 2. 挂载路由对象
app.use(router)
app.mount('#app')
```

## 6.3 展示 Login.vue 登录组件

### 6.3.1 在 router.js 模块中导入 Login.vue 组件

```javascript
import Login from './components/MyLogin.vue'
```

### 6.3.2 声明路由规则如下

```javascript
routes: [
  // 路由重定向
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
]
```

### 6.3.3 在 App.vue 组件中声明路由占位符

```javascript
<template>
  <!-- 路由的占位符 -->
  <router-view></router-view>
</template>
<script>
export default {
  name: 'MyApp',
}
</script>
<style lang="less" scoped>
</style>
```

## 6.4 模拟并实现登录功能

### 6.4.1 在 MyLogin.vue 组件中声明如下的 data 数据

```javascript
data() {
  return {
    username: '',
    password: '',
  }
},
```

### 6.4.2 为用户名和密码的文本框进行 v-model 双向数据绑定

```javascript
<!-- 登录名称 -->
<div class="form-group form-inline">
  <label for="username">登录名称</label>
  <input type="text" class="form-control ml-2" id="username" placeholder="请输入登录名称" autocomplete="off" v-model="username">
</div>
<!-- 登录密码 -->
<div class="form-group form-inline">
  <label for="password">登录密码</label>
  <input type="password" class="form-control ml-2" id="password"placeholder="请输入登录密码" v-model="password">
</div>
```

### 6.4.3 为 登录按钮 绑定点击事件处理函数

```javascript
<button type="button" class="btn btn-primary"@click="onLoginClick">登录</button>
```

### 6.4.4 在 methods 中声明 onLoginClick 事件处理函数如下

```javascript
methods: {
  onLoginClick() {
    // 判断用户名和密码是否正确
    if (this.username === 'admin' && this.password === '123456') {
      // 登录成功，跳转到后台主页
      this.$router.push('/home')
      // 模拟存储 Token 的操作
      return localStorage.setItem('token', 'Bearer xxx')
    }
    // 登录失败，清除 Token
    localStorage.removeItem('token')
  },
},
```

## 6.5  通过路由渲染 Home.vue

### 6.5.1 在 router.js 中导入 Home.vue 组件

```javascript
import Home from './components/MyHome.vue'
```

### 6.5.2 在 routes 路由规则的数组中，声明对应的路由规则

```javascript
routes: [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  // Home 组件的路由规则
  { path: '/home', component: Home },
]
```

### 6.5.3 渲染 Home.vue 组件的基本结构

```javascript
<template>
  <div class="home-container">
    <!-- 头部组件 -->
    <my-header></my-header>

    <!-- 主体区域 -->
    <div class="home-main-box">
      <!-- 左侧边栏区域 -->
      <my-aside></my-aside>
      <!-- 右侧内容主体区域 -->
      <div class="home-main-body"></div>
    </div>
  </div>
</template>
```

## 6.6 实现退出登录的功能

### 6.6.1 在 MyHeader.vue 组件中，为 退出登录 按钮绑定 click 事件处理函数

```javascript
<button type="button" class="btn btn-light" @click="onLogout">退出登录</button>
```

### 6.6.2 在 methods 中声明如下的事件处理函数

```javascript
export default {
  name: 'MyHeader',
  methods: {
    // 退出按钮的点击事件处理函数
    onLogout() {
      // 移除 Token
      localStorage.removeItem('token')
      // 强制跳转到“登录页面”
      this.$router.push('/login')
    },
  },
}
```

## 6.7 全局控制路由的访问权限

### 6.7.1 在 router.js 模块中，通过 router 路由实例对象，全局挂载路由导航守卫

```javascript
// 全局路由导航守卫
router.beforeEach((to, from, next) => {
  // 如果用户访问的是登录页面，直接放行
  if (to.path === '/login') return next()
  // 获取 Token 值
  const token = localStorage.getItem('token')
  if (!token) {
    // Token 值不存在，强制跳转到登录页面
    return next('/login')
  }
  // 存在 Token 值，直接放行
  next()
})
```

## 6.8 将左侧菜单改造为路由链接

### 6.8.1 打开 MyAside.vue 组件，把 li 内部的纯文本升级改造为 \<router-link\> 组件

```javascript
<template>
  <div class="layout-aside-container">
    <!-- 左侧边栏列表 -->
    <ul class="user-select-none menu">
      <li class="menu-item">
        <router-link to="/home/users">用户管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/rights">权限管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/goods">商品管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/orders">订单管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/settings">系统设置</router-link>
      </li>
    </ul>
  </div>
</template>
```

### 6.8.2 打开 Home.vue 组件，在 右侧内容主体区域 中声明子路由的占位符

```javascript
<template>
  <div class="home-container">
    <!-- 头部组件 -->
    <my-header></my-header>
    
    <!-- 主体区域 -->
    <div class="home-main-box">
      <!-- 左侧边栏区域 -->
      <my-aside></my-aside>
      <!-- 右侧内容主体区域 -->
      <div class="home-main-body">
        <!-- **子路由的占位符** -->
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>
```

### 6.8.3 在 router.js 中导入左侧菜单对应的组件

```javascript
import Users from './components/menus/MyUsers.vue'
import Rights from './components/menus/MyRights.vue'
import Goods from './components/menus/MyGoods.vue'
import Orders from './components/menus/MyOrders.vue'
import Settings from './components/menus/MySettings.vue'
```

### 6.8.4 通过 children 属性，为 home 规则定义子路由规则如下

```javascript
{
  path: '/home',
  component: Home,
  // 用户访问 /home 时，重定向到 /home/users
  redirect: '/home/users',
  // 子路由规则
  children: [
    { path: 'users', component: Users },
    { path: 'rights', component: Rights },
    { path: 'goods', component: Goods },
    { path: 'orders', component: Orders },
    { path: 'settings', component: Settings },
  ],
},
```

## 6.9 渲染用户管理页面的数据

### 6.9.1 在 MyUsers.vue 组件中，通过 v-for 指令循环渲染用户列表的数据

```javascript
<tbody>
  <tr v-for="(item, i) in userlist" :key="item.id">
    <td>{{i + 1}}</td>
    <td>{{item.name}}</td>
    <td>{{item.age}}</td>
    <td>{{item.position}}</td>
    <td>详情</td>
  </tr>
</tbody>
```

## 6.10 实现跳转到用户详情页的功能 

### 6.10.1 在 MyUsers.vue 组件中，渲染详情页的路由链接如下

```javascript
<td>
  <router-link :to="'/home/users/' + item.id">详情</router-link>
</td>
```

### 6.10.2 在 router.js 中导入用户详情页组件

```javascript
import UserDetail from './components/user/MyUserDetail.vue'
```

### 6.10.3 在 home 规则的 children 节点下，声明 用户详情页 的路由规则

```javascript
{
  path: '/home',
  component: Home,
  // 用户访问 /home 时，重定向到 /home/users
  redirect: '/home/users',
  // 子路由规则
  children: [
    { path: 'users', component: Users },
    { path: 'rights', component: Rights },
    { path: 'goods', component: Goods },
    { path: 'orders', component: Orders },
    { path: 'settings', component: Settings },
    // 用户详情页的路由规则
    { path: 'users/:id', component: UserDetail },
  ],
},
```

## 6.11 开启路由的 props 传参

### 6.11.1 在 router.js 模块中，为 用户详情页 的路由规则开启 props 传参

```javascript
{ path: 'users/:id', component: UserDetail, props: true },
```

### 6.11.2  在 MyUserDetail.vue 组件中声明 props 参数

```javascript
export default {
  name: 'MyUserDetail',
  props: ['id'],
}
```

### 6.11.3 在 MyUserDetail.vue 组件的结构中直接使用路由参数

```javascript
<template>
  <button type="button" class="btn btn-light btn-sm">后退</button>
  <h4 class="text-center">用户详情 --- {{id}}</h4>
</template>
```

## 6.12 通过编程式导航实现后退功能

### 6.12.1 在 MyUserDetail.vue 组件中，为后退按钮绑定点击事件处理函数：

```javascript
<template>
  <button type="button" class="btn btn-light btn-sm" @click="goBack">后退</button>
  <h4 class="text-center">用户详情 --- {{id}}</h4>
</template>
```

### 6.12.2 在 methods 中声明 goBack 事件处理函数如下

```javascript
export default {
  name: 'MyUserDetail',
  props: ['id'],
  methods: {
    // 编程式导航实现后退功能
    goBack() {
      this.$router.go(-1)
    },
  },
}
```

# 7 vue-cli

## 7.1 定义

vue-cli（俗称：vue 脚手架）是 vue 官方提供的、快速生成 vue 工程化项目的工具。 

特点： ① 开箱即用 ② 基于 webpack ③ 功能丰富且易于扩展 ④ 支持创建 vue2 和 vue3 的项目 

vue-cli 的中文官网首页：https://cli.vuejs.org/zh

## 7.2 安装 vue-cli

vue-cli 是基于 Node.js 开发出来的工具，因此需要使用 npm 将它安装为全局可用的工具：

```bash
# 全局安装 vue-cli
npm install -g @vue/cli

# 查看 vue-cli 的版本，检验vue-cli 是否安装成功
vue --version
```

### 7.2.1 解决 Windows PowerShell 不识别 vue 命令的问题

解决方案如下： 

① 以管理员身份运行 PowerShell 

② 执行 set-ExecutionPolicy RemoteSigned 命令 

③ 输入字符 Y ，回车即可

## 7.3 创建项目

vue-cli 提供了创建项目的两种方式: 基于命令行、基于可视化面板

### 7.3.1 基于 vue ui 创建 vue 项目

步骤1：在终端下运行 vue ui 命令，自动在浏览器中打开创建项目的可视化面板

步骤2：在详情页面填写项目名称

![image-20220905002135749](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209050021716.png)

步骤3：在预设页面选择手动配置项目

![image-20220905002311801](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209050023710.png)

步骤4：在功能页面勾选需要安装的功能（Choose Vue Version、Babel、CSS 预处理器、使用配置文件）

步骤5：在配置页面勾选 vue 的版本和需要的预处理器   vue3.0 和 less

# 8 组件库

## 8.1 定义

在实际开发中，前端开发者可以把自己封装的 .vue 组件整理、打包、并发布为 npm 的包，从而供其他人下载 和使用。这种可以直接下载并在项目中使用的现成组件，就叫做 vue 组件库。

## 8.2 vue 组件库和 bootstrap 的区别

二者之间存在本质的区别： 

- bootstrap 只提供了纯粹的原材料（ css 样式、HTML 结构以及 JS 特效），需要由开发者做进一步的组装和改造 

- vue 组件库是遵循 vue 语法、高度定制的现成组件，开箱即用

## 8.3  最常用的 vue 组件库

① PC 端  

- Element UI（https://element.eleme.cn/#/zh-CN） 

- View UI（http://v1.iviewui.com/） 

② 移动端 

- Mint UI（http://mint-ui.github.io/#!/zh-cn） 

- Vant（https://vant-contrib.gitee.io/vant/#/zh-CN/）

## 8.4  Element UI

Element UI 是饿了么前端团队开源的一套 PC 端 vue 组件库。支持在 vue2 和 vue3 的项目中使用： 

- vue2 的项目使用旧版的 Element UI（https://element.eleme.cn/#/zh-CN） 

- vue3 的项目使用新版的 Element Plus（https://element-plus.gitee.io/#/zh-CN）

### 8.4.1 在 vue2 的项目中安装 element-ui

```bash
npm i element-ui -S
```

开发者可以一次性完整引入所有的 element-ui 组件，或是根据需求，只按需引入用到的 element-ui 组件： 

- 完整引入：操作简单，但是会额外引入一些用不到的组件，导致项目体积过大 

- 按需引入：操作相对复杂一些，但是只会引入用到的组件，能起到优化项目体积的目的

### 8.4.2 完整引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue'
import App from './App.vue'
// 完整引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Loading } from 'element-ui'

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
```

### 8.4.3 按需引入

借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。

#### 1 安装 babel-plugin-component

```bash
npm install babel-plugin-component -D
```

#### 2 修改根目录下的 babel.config.js 配置文件，新增 plugins 节点如下

```JavaScript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
}
```

#### 3 如果你只希望引入部分组件，比如 Loading，那么需要在 main.js 中写入以下内容

```javascript
import { Loading } from 'element-ui'

Vue.use(ElementUI)
```

### 8.4.4 把组件的导入和注册封装为独立的模块

在 src 目录下新建 element-ui/index.js 模块，并声明如下的代码

```JavaScript
// 模块路径：/src/element-ui/index.js:
import Vue from 'vue'
import {Button, Input} from 'element-ui'

Vue.use(Button)
Vue.use(Input)

// 在 main.js 中导入
import './element-ui'
```

# 9 axios 拦截器

## 9.1 拦截器定义

拦截器（英文：Interceptors）会在每次发起 ajax 请求和得到响应的时候自动被触发。

应用场景： ① Token 身份认证 ② Loading 效果 ③ etc…

![image-20220905083726522](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209050837305.png)

## 9.2 配置请求拦截器

通过 axios.interceptors.request.use(成功的回调, 失败的回调) 可以配置请求拦截器。示例代码如下：

```javascript
axios.interceptors.request.use(function(config){
  // Do something before request is sent
  return config;
  },function(err){
  // Do something with request error
  return Promise.reject(error);
})
```

注意：失败的回调函数可以被省略！

### 9.2.1 请求拦截器 – Token 认证

```JavaScript
import axios from 'axios'

axios.default.baseURL = 'https://www.escook.cn'
// 配置请求的拦截器
axios.interceptors.request.use(config =>{
  // 为当前请求配置 Token 认证字段
  config.headers.Authorization = 'Bearer xxx'
  return config
})

Vue.prototype.$http = axios
```

### 9.2.2 请求拦截器 – 展示 Loading 效果

借助于 element ui 提供的 Loading 效果组件（https://element.eleme.cn/#/zh-CN/component/loading） 可以方便的实现 Loading 效果的展示：

```JavaScript
// 1.按需导入 Loading 效果组件
import { loading } from 'element-ui'
// 2.声明变量，用来存储 Loading 组件的实例对象
let loadingInstance = null

import axios from 'axios'

// 配置请求的拦截器
axios.interceptors.request.use(config =>{
  // 调用 Loading 组件的 service() 方法，创建 Loading 组件的实例，并全屏展示 loading 效果
  loadingInstance = Loading.service({ fullscreen: true })
  return config
})

Vue.prototype.$http = axios
```

## 9.3 配置响应拦截器

通过 axios.interceptors.response.use(成功的回调, 失败的回调) 可以配置响应拦截器。示例代码如下：

```javascript
// Add a response interceptor
axios.interceptors.response.use(function(response){
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
  },function(err){
  // Any status code that falls outside the range of 2xx cause this function to trigger
  // Do something with request error
  return Promise.reject(error);
})
```

注意：失败的回调函数可以被省略！

### 9.3.1 响应拦截器 – 关闭 Loading 效果

调用 Loading 实例提供的 close() 方法即可关闭 Loading 效果，示例代码如下:

```JavaScript
// 响应拦截器
axios.interceptors.response.use(response => {
  // 调用 Loading 实例的 close 方法即可关闭 loading 效果
  loadingInstance.close()
  return response
})
```

# 10 proxy 跨域代理

![image-20220905085240758](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209050852658.png)

## 10.1 通过代理解决接口的跨域问题

通过 vue-cli 创建的项目在遇到接口跨域问题时，可以通过代理的方式来解决：

![image-20220905085401541](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209050854611.png)

① 把 axios 的请求根路径设置为 vue 项目的运行地址（接口请求不再跨域） 

② vue 项目发现请求的接口不存在，把请求转交给 proxy 代理 

③ 代理把请求根路径替换为 devServer.proxy 属性的值，发起真正的数据请求 

④ 代理把请求到的数据，转发给 axios

## 10.2  在项目中配置 proxy 代理

### 10.2.1 在 main.js 入口文件中，把 axios 的请求根路径改造为当前 web 项目的根路径

```javascript
axios.defaults.baseURL = 'http://localhost:8000'
```

### 10.2.2 在项目根目录下创建 vue.config.js 的配置文件，并声明如下的配置

```javascript
module.exports = {
  devServer: {
    // 当前项目在开发调试阶段，
    // 会将任何未知请求（没有匹配到静态文件的请求）代理到 https://www.escook.cn
    proxy:'https://www.escook.cn',
  }
}
```

注意： ① devServer.proxy 提供的代理功能，仅在开发调试阶段生效 ② 项目上线发布时，依旧需要 API 接口服务器开启 CORS 跨域资源共享

# 11 用户列表案例

## 11.1 初始化项目

### 11.1.1 梳理项目结构

#### 1 基于 vue-cli 运行如下的命令，新建 vue2.x 的项目

```bash
vue create code-users
```

#### 2 重置 App.vue 组件中的代码

```javascript
<template>
  <div>
    <h1>App 组件</h1>
  </div>
</template>
<script>
export default {
  name: 'MyApp',
}
</script>
<style lang='less' scoped></style>
```

#### 3 删除 components 目录下的 HelloWorld.vue 组件

### 11.1.2 修改项目的开发调试配置

#### 1 在项目根目录中新建 vue.config.js 配置文件

#### 2 在 vue.config.js 配置文件中，通过 devServer 节点添加如下的配置项

```javascript
module.exports = {
  devServer: {
    // 修改 dev 期间的端口号
    port: 3000,
    // 自动打开浏览器
    open: true
 }
}
```

### 11.1.3 初始化路由

#### 1 运行如下的命令，在 vue2.x 的项目中安装 vue-router：

```bash
npm install vue-router@3.4.9 -S
```

#### 2 在 src 目录下新建 router/index.js 路由模块：

```javascript
// 路由模块
import Vue from 'vue'
import VueRouter from 'vue-router'
// 安装路由插件
Vue.use(VueRouter)
// 创建路由实例对象
const router = new VueRouter({
  // 路由规则
  routes: [],
})
// 向外共享路由实例对象
export default router
```

#### 3 在 main.js 模块中导入并挂载路由模块

```javascript
import Vue from 'vue'
import App from './App.vue'
// 导入路由模块
import router from './router'
Vue.config.productionTip = false
new Vue({
  // 挂载路由
  router,
  render: h => h(App),
}).$mount('#app')
```

### 11.1.4 使用路由渲染 UserList 组件

#### 1 在 components 目录下新建 UserList.vue 组件如下：

```javascript
<template>
  <div>
    UserList
  </div>
</template>
<script>
export default {
  name: 'UserList',
}
</script>
<style></style>
```

#### 2 在 router/index.js 路由模块中新增如下的路由规则

```javascript
// 创建路由实例对象
const router = new VueRouter({
  // 路由规则
  routes: [
    // 路由重定向
   { path: '/', redirect: '/users', },
    // 用户列表的路由规则
   { path: '/users', component: UserList }
 ],
})
```

#### 3 在 App.vue 中声明 router-view 路由占位符

```javascript
<template>
  <div>
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'MyApp',
}
</script>
```

## 11.2 渲染用户列表组件

### 11.2.1 安装并配置 axios

#### 1 运行如下的命令，在项目中安装 axios 

```bash
npm install axios@0.21.1 -S
```

#### 2 在 main.js 中导入并配置 axios

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入 axios
import axios from 'axios'
Vue.config.productionTip = false
// 全局配置 axios
axios.defaults.baseURL = 'https://www.escook.cn'
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

### 11.2.2 请求用户列表的数据

#### 1 在 UserList.vue 组件中声明如下的 data 数据节点

```javascript
data() {
  return {
    // 用户列表数据，默认为空数组
    userList: [],
 }
}
```

#### 2 在 created 生命周期函数中预调用 getUserList 方法

```javascript
created() {
  // 调用此方法，请求用户列表数据
  this.getUserList()
}
```

#### 3 在 methods 中声明 getUserList 方法

```javascript
methods: {
  // 请求用户列表的数据
  async getUserList() {
    const { data: res } = await this.$http.get('/api/users')
    // res.status 等于 0 表示数据请求成功，否则，请求失败！
    if (res.status !== 0) return console.log('用户列表数据请求失
败！')
    this.userList = res.data
 },
}
```

### 11.2.3 解决跨域请求限制

> 由于 API 接口服务器并没有开启 CORS 跨域资源共享，因此终端会提示如下的错误： Access to XMLHttpRequest at ' https://www.escook.cn/api/users ' from origin ' http://l ocalhost:3000 ' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

解决方案： 通过 vue.config.js 中的 devServer.proxy 即可在开发环境下将 API 请求代理到 API 服 务器。

```javascript
module.exports = {
  devServer: {
    port: 3000,
    open: true,
    // 当前项目在开发调试阶段，
    // 会将任何未知请求 (没有匹配到静态文件的请求) 代理到
https://www.escook.cn
    proxy: 'https://www.escook.cn'
 }
}
```

同时，在 main.js 入口文件中，需要把 axios 的根路径改造为开发服务器的根路径：

```javascript
// 全局配置 axios
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:3000'
```

> 注意：devServer.proxy 提供的代理功能，仅在开发调试阶段生效。项目上线发布时，依旧需要 API 接口服务器开启 CORS 跨域资源共享。

### 11.2.4 安装并配置 element-ui

#### 1  运行如下的命令，在项目中安装 element-ui 组件库：

```bash
npm i element-ui -S
```

#### 2 在 main.js 中配置 element-ui：

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// 1. 导入 element-ui
import ElementUI from 'element-ui'
// 2. 导入 element-ui 的样式表
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
// 3. 将 ElementUI 安装为 vue 的插件
Vue.use(ElementUI)
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:3000'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```































