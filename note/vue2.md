[toc]

# 1 前端工程化与webpack

## 1.1 前端工程化

- 模块化（js的模块化、css的模块化、资源的模块化）
- 组件化（复用现有的UI结构、样式、行为）
- 规范化（目录结构的划分、编码规范化、接口规范化、文档规范化、Git分支管理）
- 自动化（自动化构建、自动部署、自动化测试）

前端工程化指的是：在企业级的前端项目开发中，把前端开发所需的工具、技术、流程、经验等进行规范化、 标准化。

企业中的 Vue 项目和 React 项目，都是基于工程化的方式进行开发的。 

好处：前端开发自成体系，有一套标准的开发方案和流程。



早期的前端工程化解决方案： 

- grunt（ https://www.gruntjs.net/ ） 

- gulp（ https://www.gulpjs.com.cn/ ）

目前主流的前端工程化解决方案： 

- webpack（ https://www.webpackjs.com/ ）

-  parcel（ https://zh.parceljs.org/ ）

## 1.2 webpack的基本使用

### 1.2.1 定义

概念：webpack 是前端项目工程化的具体解决方案。 

主要功能：它提供了友好的前端模块化开发支持，以及代码压缩混淆、处理浏览器端 JavaScript 的兼容性、性 能优化等强大的功能。 

好处：让程序员把工作的重心放到具体功能的实现上，提高了前端开发效率和项目的可维护性。 注意：目前 Vue，React 等前端项目，基本上都是基于 webpack 进行工程化开发的。

### 1.2.2 创建列表隔行变色项目

①新建项目空白目录，并运行 npm init –y 命令，初始化包管理配置文件 package.json 

② 新建 src 源代码目录 

③ 新建 src -> index.html 首页和 src -> index.js 脚本文件 

④ 初始化首页基本的结构 

⑤ 运行 npm install jquery –S 命令，安装 jQuery 

⑥ 通过 ES6 模块化的方式导入 jQuery，实现列表隔行变色效果

```javascript
index.js
// 1. 使用ES6导入语法，导入jquery
import $ from 'jquery'

// 2. 定义jQuery的入口函数
$(function(){
	// 3. 实现奇偶行变色
	$('li:odd').css('background-color','red');
	$('li:even').css('background-color','pink');
})
```

1.first：获取第一个元素 
语法：$(" li:first" )选取所有<li>元素中的第一个<li>元素

2.last：获取最后一个的元素
语法：$(" li:last" )选取所有<li>元素中的最后一个<li>元素

3.even：获得索引下标为偶数的元素
语法：$(" li:even" )选取索引是偶数的所有<li>元素

4.odd：获得索引下标为基数的元素
语法：$(" li:odd" )选取索引是奇数的所有<li>元素

5.eq(index)：选取索引等于index的元素（index从0开始）
语法：$("li:eq(1)" )选取索引等于1的<li>元素

6.gt(index)：选取索引大于index的元素（index从0开始）
语法：$(" li:gt(1)" )选取索引大于1的<li>元素（注：大于1，不包括1）

7.lt(index)：选取索引小于index的元素（index从0开始）
语法：$(“li:lt(1)” )选取索引小于1的<li>元素（注：小于1，不包括1）

### 1.2.3 在项目中安装webpack

在终端运行如下的命令，安装 webpack 相关的两个包： 

```bash
npm install webpack@5.42.1 webpack-cli@4.7.2 -D 
```

### 1.2.4 在项目中配置webpack

① 在项目根目录中，创建名为 webpack.config.js 的 webpack 配置文件，并初始化如下的基本配置：

```JavaScript
module.exports = {
	mode: 'development'  // mode 用来指定构建模式。可选值有 development 和 production
}
```

② 在 package.json 的 scripts 节点下，新增 dev脚本如下：

```json
"scrigts":{
	"dev": "webpack" //script 节点下的脚本，可以通过 npm run 执行。例如 npm run dev
}
```

③ 在终端中运行 npm run dev 命令，启动 webpack 进行项目的打包构建

#### 1 mode的可选值

mode 节点的可选值有两个，分别是： 

① development 

- 开发环境 

- 不会对打包生成的文件进行代码压缩和性能优化 

- 打包速度快，适合在开发阶段使用 

② production 

- 生产环境 

- 会对打包生成的文件进行代码压缩和性能优化 

- 打包速度很慢，仅适合在项目发布阶段使用

#### 2 webpack.config.js 文件的作用

webpack.config.js 是 webpack 的配置文件。webpack 在真正开始打包构建之前，会先读取这个配置文件， 从而基于给定的配置，对项目进行打包。

 注意：由于 webpack 是基于 node.js 开发出来的打包工具，因此在它的配置文件中，支持使用 node.js 相关 的语法和模块进行 webpack 的个性化配置。

#### 3 webpack中的默认约定

在 webpack 4.x 和 5.x 的版本中，有如下的默认约定： 

① 默认的打包入口文件为 src -> index.js 

② 默认的输出文件路径为 dist -> main.js 

注意：可以在 webpack.config.js 中修改打包的默认约定

#### 4 自定义打包的入口与出口

在 webpack.config.js 配置文件中，通过 entry 节点指定打包的入口。通过 output 节点指定打包的出口。 示例代码如下：

```JavaScript
const path = require('path') // 导入 node.js 中专门操作路径的模块

module.exports = {
	entry: path.join(__dirname,'./src/index.js'), // 打包入口文件的路劲
	output:{
		path:path.join(__dirname,'./dist'), // 输出文件的存放路径
		filename: 'bundle.js' // 输出文件的名称
	}
}
```

## 1.3 webpack中的插件

### 1.3.1 webpack插件的作用

通过安装和配置第三方的插件，可以拓展 webpack 的能力，从而让 webpack 用起来更方便。最常用的 webpack 插件有如下两个：

 ① webpack-dev-server 

- 类似于 node.js 阶段用到的 nodemon 工具 

- 每当修改了源代码，webpack 会自动进行项目的打包和构建 

② html-webpack-plugin 

- webpack 中的 HTML 插件（类似于一个模板引擎插件） 

- 可以通过此插件自定制 index.html 页面的内容

### 1.3.2 webpack-dev-server

webpack-dev-server 可以让 webpack 监听项目源代码的变化，从而进行自动打包构建

#### 1 安装

运行如下的命令，即可在项目中安装此插件：

```bash
 npm install webpack-dev-server@3.11.2 -D
```

#### 2 配置

① 修改 package.json -> scripts 中的 dev 命令如下： 

```json
"scripts":{
	"dev": "webpack serve", // script 节点下的脚本，可以通过 npm run 执行
}
```

② 再次运行 npm run dev 命令，重新进行项目的打包 

③ 在浏览器中访问 http://localhost:8080 地址，查看自动打包效果

注意：webpack-dev-server 会启动一个实时打包的 http 服务

#### 3 打包生成的文件在哪里？

① 不配置 webpack-dev-server 的情况下，webpack 打包生成的文件，会存放到实际的物理磁盘上 

- 严格遵守开发者在 webpack.config.js 中指定配置 

- 根据 output 节点指定路径进行存放 

② 配置了 webpack-dev-server 之后，打包生成的文件存放到了内存中 

- 不再根据 output 节点指定的路径，存放到实际的物理磁盘上 

- 提高了实时打包输出的性能，因为内存比物理磁盘速度快很多

#### 4 生成到内存中的文件该如何访问？

webpack-dev-server 生成到内存中的文件，默认放到了项目的根目录中，而且是虚拟的、不可见的。 

- 可以直接用 / 表示项目根目录，后面跟上要访问的文件名称，即可访问内存中的文件 

- 例如 /bundle.js 就表示要访问 webpack-dev-server 生成到内存中的 bundle.js 文件

### 1.3.3 html-webpack-plugin

html-webpack-plugin 是 webpack 中的 HTML 插件，可以通过此插件自定制 index.html 页面的内容。 需求：通过 html-webpack-plugin 插件，将 src 目录下的 index.html 首页，复制到项目根目录中一份！

#### 1 安装

运行如下的命令，即可在项目中安装此插件：

```bash
 npm install html-webpack-plugin@5.3.2 -D
```

#### 2 配置

```JavaScript
// 1. 导入 HTML 插件，得到一个构造函数
const HtmlPlugin = require('html-webpack-plugin')

// 2. 创建 HTML 插件的实例对象
const htmlPlugin = new HtmlPlugin({
	template: './src/index.html',     // 指定原文件的存放路径
	filename: './index.html',         // 指定生成的文件的存放路径
})

module.exports = {
	mode: 'development',
	plugins: [htmlPlugin], //3. 通过 plugins 节点，使htmlPlugin 插件生效
}
```

① 通过 HTML 插件复制到项目根目录中的 index.html 页面，也被放到了内存中 

② HTML 插件在生成的 index.html 页面，自动注入了打包的 bundle.js 文件

### 1.3.4 devServer 节点

在 webpack.config.js 配置文件中，可以通过 devServer 节点对 webpack-dev-server 插件进行更多的配置， 示例代码如下：

```JavaScript
devServer: {
	open: true, // 初次打包完成后，自动打开浏览器
	host: '127.0.0.1', // 实时打包所使用的主机地址
	port: 80, // 实时打包所使用的端口号
}
```

注意：凡是修改了 webpack.config.js 配置文件，或修改了 package.json 配置文件，必须重启实时打包的服 务器，否则最新的配置文件无法生效！

## 1.4 webpack中的loader

### 1.4.1 概述

在实际开发过程中，webpack 默认只能打包处理以 .js 后缀名结尾的模块。其他非 .js 后缀名结尾的模块， webpack 默认处理不了，需要调用 loader 加载器才可以正常打包，否则会报错！ loader 加载器的作用：协助 webpack 打包处理特定的文件模块。比如： 

- css-loader 可以打包处理 .css 相关的文件 

- less-loader 可以打包处理 .less 相关的文件 

- babel-loader 可以打包处理 webpack 无法处理的高级 JS 语法

### 1.4.2 loader调用过程

![搜狗截图20220829013108](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/vue/202209011007040.bmp)

### 1.4.3 打包处理css文件

① 运行 npm i style-loader@3.0.0 css-loader@5.2.6 -D 命令，安装处理 css 文件的 loader 

② 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下： 

```JavaScript
module: {    // 所有第三方文件模块的匹配规则
	rules: [ // 文件后缀名的匹配规则
		{ test: /\.css$/, use: ['style-loader', 'css-loader']}
	]
}
```

其中，test 表示匹配的文件类型， use 表示对应要调用的 loader

注意：

- use 数组中指定的 loader 顺序是固定的 

- 多个 loader 的调用顺序是：从后往前调用

### 1.4.4 打包处理less文件

① 运行 npm i less-loader@10.0.1 less@4.1.1 -D 命令 

② 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：

```javascript
module: {    // 所有第三方文件模块的匹配规则
	rules: [ // 文件后缀名的匹配规则
		{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']}
	]
}
```

### 1.4.5 打包处理样式表中与URL路径相关的文件

① 运行 npm i url-loader@4.1.1 file-loader@6.2.0 -D 命令 

② 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：

```javascript
module: {    // 所有第三方文件模块的匹配规则
	rules: [ // 文件后缀名的匹配规则
		{ test: /\.jpg|png|gid$/, use: 'url-loader?limit=470&outputPath=images'}
	]
}
```

其中 ? 之后的是 loader 的参数项： 

- limit 用来指定图片的大小，单位是字节（byte） 

- 只有 ≤ limit 大小的图片，才会被转为 base64 格式的图片

### 1.4.6 打包处理js文件中的高级语法

webpack 只能打包处理一部分高级的 JavaScript 语法。对于那些 webpack 无法处理的高级 js 语法，需要借 助于 babel-loader 进行打包处理。例如 webpack 无法处理下面的 JavaScript 代码：

```javascript
// 1. 定义了名为info的装饰器
function info(target){
	// 2. 为目标添加静态属性 info
	target.info = 'Person info'
}

// 3. 为 Person 类应用 info 装饰器
@info
class Person{}

// 4. 打印Person的静态属性 info
console.log(Person.info)
```

#### 1 安装 babel-loader相关的包

运行如下的命令安装对应的依赖包：

 npm i babel-loader@8.2.2 @babel/core@7.14.6 @babel/plugin-proposal-decorators@7.14.5 -D 

在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：

```javascript
// 注意：必须使用 exclude 指定排除项；因为 node_modules 目录下的第三方包不需要被打包
{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
```

#### 2 配置babel-loader

在项目根目录下，创建名为 babel.config.js 的配置文件，定义 Babel 的配置项如下：

```javascript
module.exports = {
	// 声明 babel 可用的插件
	plugins: [['@babel/plugin-proposal-decorators', { legacy: true}]]
}
```

详情请参考 Babel 的官网 https://babeljs.io/docs/en/babel-plugin-proposal-decorators

## 1.5 打包发布

### 1.5.1 目的

项目开发完成之后，需要使用 webpack 对项目进行打包发布，主要原因有以下两点： 

① 开发环境下，打包生成的文件存放于内存中，无法获取到最终打包生成的文件 

② 开发环境下，打包生成的文件不会进行代码压缩和性能优化 

为了让项目能够在生产环境中高性能的运行，因此需要对项目进行打包发布。

### 1.5.2 配置webpack的打包发布

在 package.json 文件的 scripts 节点下，新增 build 命令如下：

```json
"scripts": {
    "dev": "webpack serve",  // 开发环境中，运行 dev 命令
    "build": "webpack --mode production" // 项目发布时，运行 build 命令
}
```

--model 是一个参数项，用来指定 webpack 的运行模式。production 代表生产环境，会对打包生成的文件 进行代码压缩和性能优化。

 注意：通过 --model 指定的参数项，会覆盖 webpack.config.js 中的 model 选项。

### 1.5.3 把JavaScript文件统一生成到js目录中

在 webpack.config.js 配置文件的 output 节点中，进行如下的配置：

```JavaScript
output: {
    // 存放的目录
    path: path.join(__dirname, 'dist'),
    // 生成的文件名
    // 明确告诉 webpack 把生成的bundle.js 文件存放在 dist 目录下的 js 子目录中
    filename: 'js/bundle.js'
  },
```

### 1.5.4 把图片文件统一生成到image目录中

修改 webpack.config.js 中的 url-loader 配置项，新增 outputPath 选项即可指定图片文件的输出路径：

```javascript
{
	test: /\.jpg|png|gif$/,
	use: {
		loader: 'url-loader',
		options: {
			limit: 22228,
			// 明确指定把打包生成的图片文件，储存到 dist 目录下的 image 文件夹中
			outputPath: 'image',
     // { test: /\.jpg|png|gif$/, use: 'url-loader?limit=470&outputPath=images' }
		}
	}
}
```

### 1.5.5 自动清理dist目录下的旧文件

为了在每次打包发布时自动清理掉 dist 目录中的旧文件，可以安装并配置 clean-webpack-plugin 插件：

```JavaScript
// 1. 安装清理 dist 目录的 webpack 插件
npm install clean-webpack-plugin@3.0.0 -D

// 2. 按需导入插件、得到插件的构造函数之后，创建插件的实例对象
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const cleanPlugin = new CleanWebpackPlugin()

// 3. 把创建的 cleanPlugin 插件实例对象，挂载到 plugins 节点中
plugins：[htmlPlugin, cleanPlugin], //挂载插件
```

## 1.6 Source Map

### 1.6.1 生产环境遇到的问题

前端项目在投入生产环境之前，都需要对 JavaScript 源代码进行压缩混淆，从而减小文件的体积，提高文件的 加载效率。此时就不可避免的产生了另一个问题： 对压缩混淆之后的代码除错（debug）是一件极其困难的事情

- 变量被替换成没有任何语义的名称 
- 空行和注释被剔除

### 1.6.2 Source Map 定义

Source Map 就是一个信息文件，里面储存着位置信息。也就是说，Source Map 文件中存储着压缩混淆后的 代码，所对应的转换前的位置。 

有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码，能够极大的方便后期的调试。

### 1.6.3 webpack开发环境下的Source Map

在开发环境下，webpack 默认启用了 Source Map 功能。当程序运行出错时，可以直接在控制台提示错误行 的位置，并定位到具体的源代码

#### 1 默认Source Map的问题

开发环境下默认生成的 Source Map，记录的是生成后的代码的位置。会导致运行时报错的行数与源代码的行 数不一致的问题。

#### 2 解决默认Source Map的问题

开发环境下，推荐在 webpack.config.js 中添加如下的配置，即可保证运行时报错的行数与源代码的行数 保持一致：

```javascript
module.exports = {
	mode: 'development',
	// eval-source-map 仅限在"开发模式"下使用，不建议在"生产模式"下使用
	// 此选项生成的 Source Map 能够保证"运行时报错的行数"与"源代码的行数"保持一致
	devtool: 'eval-source-map',
}
```

### 1.6.4 webpack 生产环境下的 Source Map

在生产环境下，如果省略了 devtool 选项，则最终生成的文件中不包含 Source Map。这能够防止原始代码通 过 Source Map 的形式暴露给别有所图之人。

#### 1 只定位行数不暴露源码

在生产环境下，如果只想定位报错的具体行数，且不想暴露源码。此时可以将 devtool 的值设置为 nosources-source-map。实际效果如图所示：

![搜狗截图20220829093036](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011007487.bmp)

#### 2 定位行数且暴露源码

在生产环境下，如果想在定位报错行数的同时，展示具体报错的源码。此时可以将 devtool 的值设置为 source-map。实际效果如图所示：

![搜狗截图20220829093139](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011007967.bmp)

采用此选项后：你应该将你的服务器配置为，不允许普通用户访问 source map 文件！

### 1.6.5 Source Map 的最佳实践

① 开发环境下： 

- 建议把 devtool 的值设置为 eval-source-map 

- 好处：可以精准定位到具体的错误行 

② 生产环境下： 

- 建议关闭 Source Map 或将 devtool 的值设置为 nosources-source-map 

- 好处：防止源码泄露，提高网站的安全性



实际开发中需要自己配置 webpack 吗？

答案：不需要！ 

- 实际开发中会使命令行工具（俗称 CLI）一键生成带有 webpack 的项目 

- 开箱即用，所有 webpack 配置项都是现成的！ 

- 我们只需要知道 webpack 中的基本概念即可！

## 1.7 其他注意事项

- 用@表示src源代码目录，从外往里查找；不要使用 ../ 从里往外查找

在webpack中需要向webpack.config.js文件中添加如下代码才能使用@

```JavaScript
resolve: {
	alias: {
		// 告诉webpack，程序员写得代码中，@符号表示src这一层目录
		'@':path.join(__dirname,'./src/')
	}
}
```



# 2 VUE基础入门

## 2.1 vue简介

### 2.1.1 定义

官方给出的概念：Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的前端框架。

框架：框架是一套现成的解决方案，程序员只能遵守框架的规范，去编写自己的业务功能！

vue框架中的内容:vue 的指令、组件（是对 UI 结构的复用）、路由、Vuex、vue 组件库

### 2.1.2 vue的特性

① 数据驱动视图 

在使用了 vue 的页面中，vue 会监听数据的变化，从而自动重新渲染页面的结构。示意图如下： 

![搜狗截图20220829093928](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011007205.bmp)

好处：当页面数据发生变化时，页面会自动重新渲染！ 

注意：数据驱动视图是单向的数据绑定

② 双向数据绑定

在填写表单时，双向数据绑定可以辅助开发者在不操作 DOM 的前提下，自动把用户填写的内容同步到数据源 中。示意图如下：

![搜狗截图20220829094122](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011007876.bmp)

好处：开发者不再需要手动操作 DOM 元素，来获取表单元素最新的值！

### 2.1.3 MVVM

MVVM 是 vue 实现数据驱动视图和双向数据绑定的核心原理。MVVM 指的是 Model、View 和 ViewModel， 它把每个 HTML 页面都拆分成了这三个部分，如图所示：

![搜狗截图20220829094242](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011007952.bmp)

在 MVVM 概念中： 

Model 表示当前页面渲染时所依赖的数据源。 

View 表示当前页面所渲染的 DOM 结构。 

ViewModel 表示 vue 的实例，它是 MVVM 的核心。

### 2.1.4 MVVM的工作原理

ViewModel 作为 MVVM 的核心，是它把当前页面的数据源（Model）和页面的结构（View）连接在了一起。

![搜狗截图20220829094428](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011007510.bmp)

当数据源发生变化时，会被 ViewModel 监听到，VM 会根据最新的数据源自动更新页面的结构 

当表单元素的值发生变化时，也会被 VM 监听到，VM 会把变化过后最新的值自动同步到 Model 数据源中

### 2.1.5 vue的版本

当前，vue 共有 3 个大版本，其中： 

2.x 版本的 vue 是目前企业级项目开发中的主流版本 

3.x 版本的 vue 于 2020-09-19 发布，生态还不完善，尚未在企业级项目开发中普及和推广 

1.x 版本的 vue 几乎被淘汰，不再建议学习与使用 

总结： 

3.x 版本的 vue 是未来企业级项目开发的趋势； 

2.x 版本的 vue 在未来（1 ~ 2年内）会被逐渐淘汰；

## 2.2 vue的基本使用

### 2.2.1 基本使用步骤

① 导入 vue.js 的 script 脚本文件 

② 在页面中声明一个将要被 vue 所控制的 DOM 区域 

③ 创建 vm 实例对象（vue 实例对象）

```html
<body>
  <!-- 希望 Vue 能够控制下面的这个 div，帮我们在把数据填充到 div 内部 -->
  <div id="app">{{ username }}</div>

  <!-- 1. 导入 Vue 的库文件，在 window 全局就有了 Vue 这个构造函数 -->
  <script src="./lib/vue-2.6.12.js"></script>
  <!-- 2. 创建 Vue 的实例对象 -->
  <script>
    // 创建 Vue 的实例对象
    const vm = new Vue({
      // el 属性是固定的写法，表示当前 vm 实例要控制页面上的哪个区域，接收的值是一个选择器
      el: '#app',
      // data 对象就是要渲染到页面上的数据
      data: {
        username: 'zhangsan'
      }
    })
  </script>
</body>
```

### 2.2.2 基本代码与MVVM的对应关系

![搜狗截图20220829095103](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011007296.bmp)

## 2.3 vue的调试工具

### 2.3.1 安装 vue-devtools 调试工具

vue 官方提供的 vue-devtools 调试工具，能够方便开发者对 vue 项目进行调试与开发。 Chrome 浏览器在线安装 vue-devtools ：

https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd 

FireFox 浏览器在线安装 vue-devtools ： 

https://addons.mozilla.org/zh-CN/firefox/addon/vue-js-devtools/

### 2.3.2 配置 Chrome浏览器中的 vue-devtools

点击 Chrome 浏览器右上角的 按钮，选择更多工具 -> 扩展程序 -> Vue.js devtools 详细信息，并勾选如下 的两个选项：

运行此扩展程序读取和更改您在所有访问的网站上留存的所有数据

允许访问文件网址

### 2.3.3 使用vue-devtools调试vue页面

在浏览器中访问一个使用了 vue 的页面，打开浏览器的开发者工具，切换到 Vue 面板，即可使用 vue-devtools  调试当前的页面。

## 2.4 vue的指令与过滤器

### 2.4.1 指令的定义

指令（Directives）是 vue 为开发者提供的模板语法，用于辅助开发者渲染页面的基本结构。 vue 中的指令按照不同的用途可以分为如下 6 大类： 

① 内容渲染指令 

② 属性绑定指令 

③ 事件绑定指令 

④ 双向绑定指令 

⑤ 条件渲染指令 

⑥ 列表渲染指令 

注意：指令是 vue 开发中最基础、最常用、最简单的知识点。

#### 1 内容渲染指令

内容渲染指令用来辅助开发者渲染 DOM 元素的文本内容。常用的内容渲染指令有如下 3 个： 

- v-text 

- {{ }} 

- v-html

##### v-text：

```html
<!-- 把 username 对应的值，渲染到第一个p标签中 -->
<p v-text="username"></p>

<!-- 把 gender 对应的值，渲染到第二个p标签中 -->
<!-- 注意：第二个p标签中，默认的文本“性别”会被gender的值覆盖掉 -->
<p v-text="gender">性别：</p>
```

注意：v-text 指令会覆盖元素内默认的值。

##### {{}}：

vue 提供的 {{ }} 语法，专门用来解决 v-text 会覆盖默认文本内容的问题。这种 {{ }} 语法的专业名称是插值表达 式（英文名为：Mustache）。

```html
<!-- 使用{{}}插值表达式，将对应的值渲染到元素的内容节点中 -->
<!-- 同时保留元素自身的默认值 -->
<p>姓名：{{ username }}</p>
<p>性别：{{ gender }}</p>
```

> 注意：

> 相对于 v-text 指令来说，插值表达式在开发中更常用一些！因为它不会覆盖元素中默认的文本内容

> 插值表达式只能用在元素的内容节点中，不能用在元素的属性节点

##### v-html：

v-text 指令和插值表达式只能渲染纯文本内容。如果要把包含 HTML 标签的字符串渲染为页面的 HTML 元素， 则需要用到 v-html 这个指令：

```html
<!-- 假设 data 中定义了名为 discription 的数据，数据的值为包含HTML标签的字符串： -->
<!-- '<h4 style="color: red; font-weight: bold;">欢迎大家来学习 vue.js</h4>' -->
<div v-html="discription"></div>
```

#### 2 属性绑定指令

如果需要为元素的属性动态绑定属性值，则需要用到 v-bind 属性绑定指令。用法示例如下：

```html
<!-- 假设有如下的 data 数据：
data：{
	inputValue: '请输入内容',
	imgSrc:'https://cn.vuejs.org/images/logo.png'
}-->

<!-- 使用 v-bind 指令，为 input 的 placeholder 动态绑定属性值 -->
<input type="text" v-bind:placeholder="inputValue"/>
<br/>
<!-- 使用 v-bind 指令，为 img 的 src 动态绑定属性值 -->
<img v-bind:src="imgSrc" alt="">
```

由于 v-bind 指令在开发中使用频率非常高，因此，vue 官方为其提供了简写形式（简写为英文的 : ）。

```html
<!-- 假设有如下的 data 数据：
data：{
	inputValue: '请输入内容',
	imgSrc:'https://cn.vuejs.org/images/logo.png'
}-->

<!-- 使用 v-bind 指令，为 input 的 placeholder 动态绑定属性值 -->
<input type="text" :placeholder="inputValue"/>
<br/>
<!-- 使用 v-bind 指令，为 img 的 src 动态绑定属性值 -->
<img :src="imgSrc" alt="">
```

在 vue 提供的模板渲染语法中，除了支持绑定简单的数据值之外，还支持 Javascript 表达式的运算，例如：

```html
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('')}}
<div v-bind:id="'list-' + id"></div>
```

#### 3 事件绑定指令

- vue 提供了 v-on 事件绑定指令,用来辅助程序员为 DOM 元素绑定事件监听。语法格式如下：

```html
<h3>count 的值为:{{count}}</h3>
<!-- 语法格式为 v-on：事件名称="事件处理函数的名称" -->
<button v-on:click="addCount">+1</button>
```

注意：原生 DOM 对象有 onclick、oninput、onkeyup 等原生事件，替换为 vue 的事件绑定形式后， 分别为：v-on:click、v-on:input、v-on:keyup

- 通过 v-on 绑定的事件处理函数，需要在 methods 节点中进行声明:

```JavaScript
const vm = new Vue({
	el:'#app',
	data:{ count:0 },
	methods:{      // v-on 绑定的事件处理函数，需要声明在 methods 节点
		addCount() {// 事件处理函数的名称
		// this 表示当前 new 出来的 vm 实例对象
		// 通过 this 可以访问到 data 中的数据
		this.count += 1
       }
	}
})
```

- 事件绑定的简写形式：

由于 v-on 指令在开发中使用频率非常高,因此,vue 官方为其提供了简写形式（简写为英文的 @ ）

```html
  <div id="app">
    <p>count 的值是：{{ count }}</p>
    <!-- 在绑定事件处理函数的时候，可以使用 () 传递参数 -->
    <!-- v-on: 指令可以被简写为 @ -->
    <!-- 如果事件处理函数中的代码足够简单，只有一行代码，则可以简写到行内 -->
    <button @click="add(1)">+1</button>
    <button @click="sub">-1</button>
  </div>
```

- 事件参数对象

在原生的 DOM 事件绑定中，可以在事件处理函数的形参处，接收事件参数对象 event。同理，在 v-on 指令 （简写为 @ ）所绑定的事件处理函数中，同样可以接收到事件参数对象 event，示例代码如下：

```javascript
<h3>count 的值为:{{count}}</h3>
<button v-on:click="addCount">+1</button>

methods: {
	addCount(e){
		const nowBgColor = e.target.style.backgroundColor
		e.target.style.backgroundColor = nowBgColor === 'red' ? '' : 'red'
		this.count += 1
	}
}
```

- 绑定事件并传参

在使用v-on指令绑定事件时，可以使用()进行传参，示例代码如下：

```JavaScript
<h3>count 的值为:{{count}}</h3>
<button v-on:click="addCount">+2</button>

methods: {
	// 在形参处用 step 接收传递过来的参数值
	addNewCount(step){
	this.count += step
	}
}
```

- \$event是vue提供的特殊变量，用来表示原生的事件参数对象event。\$event 可以解决事件参数对象event被覆盖的问题.。

```javascript
<h3>count 的值为:{{count}}</h3>
<button v-on:click="addNewCount(2, $event)">+2</button>

methods: {
	addNewCount(step,e){
		const nowBgColor = e.target.style.backgroundColor
		e.target.style.backgroundColor = nowBgColor === 'cyan' ? '' : 'cyan'
		this.count += step
	}
}
```

- 事件修饰符

在事件处理函数中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。因此， vue 提供了事件修饰符的概念，来辅助程序员更方便的对事件的触发进行控制。常用的 5 个事件修饰符如下：

| 事件修饰符 | 说明                                                    |
| ---------- | ------------------------------------------------------- |
| .prevent   | 阻止默认行为（例如：阻止a连接的跳转、阻止表单的提交等） |
| .stop      | 阻止事件冒泡                                            |
| .capture   | 以捕获模式触发当前的事件处理函数                        |
| .once      | 绑定的事件只触发一次                                    |
| .self      | 只有在event.target是当前元素自身时触发事件处理函数      |

```html
<!-- 触发 click 点击事件时，阻止 a 链接的默认跳转行为 -->
<a href='http://wwww.baidu.com' @click.prevent='onLinkClick'>百度首页</a>
```

- 按键修饰符

在监听键盘事件时，我们经常需要判断详细的按键。此时，可以为键盘相关的事件添加按键修饰符，例如：

```html
<!-- 只有在'key'是'enter'时调用'vm.submit()' -->
<input @keyup.enter='submit'>

<!--只有在'key'是'esc'时调用'vm.clearInput()' -->
<input @keyup.esc='clearInput'>
```

#### 4 双向绑定指令

vue 提供了 v-model 双向数据绑定指令，用来辅助开发者在不操作 DOM 的前提下，快速获取表单的数据。

```html
  <div id="app">
    <p>用户的名字是：{{ username }}</p>
    <input type="text" v-model="username">
    <hr>
    <input type="text" :value="username">
    <hr>
    <select v-model="city">
      <option value="">请选择城市</option>
      <option value="1">北京</option>
      <option value="2">上海</option>
      <option value="3">广州</option>
    </select>
  </div>
```

- v-model 指令的修饰符

为了方便对用户输入的内容进行处理，vue 为 v-model 指令提供了 3 个修饰符，分别是：

| 修饰符  | 作用                           | 示例                          |
| ------- | ------------------------------ | ----------------------------- |
| .number | 自动将用户的输入值转为数值类型 | <input v-model.number='age'/> |
| .trim   | 自动过滤用户输入的首尾空白字符 | <input v-model.trim='msg'/>   |
| .lazy   | 在“change”时而非“input”时更新  | <input v-model.lazy='msg'/>   |

示例用法如下:

```html
<input type="text" v-model.number="n1"> + <input type="text" v-model.number="n2"> = <span>{{ n1 + n2 }}</span>
<hr>
<input type="text" v-model.trim="username">
<button @click="showName">获取用户名</button>
<hr>
<input type="text" v-model.lazy="username">
```

#### 5 条件渲染指令

条件渲染指令用来辅助开发者按需控制 DOM 的显示与隐藏。条件渲染指令有如下两个，分别是： 

- v-if 

- v-show

```html
  <div id="app">
    <p v-if="flag">这是被 v-if 控制的元素</p>
    <p v-show="flag">这是被 v-show 控制的元素</p>
  </div>
```

实现原理不同： 

- v-if 指令会动态地创建或移除 DOM 元素，从而控制元素在页面上的显示与隐藏； 
- v-show 指令会动态为元素添加或移除 style="display: none;" 样式，从而控制元素的显示与隐藏；

 性能消耗不同：

v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此： 

- 如果需要非常频繁地切换，则使用 v-show 较好 

- 如果在运行时条件很少改变，则使用 v-if 较好

v-else 和 v-else-if

v-if 可以单独使用，或配合 v-else或v-else-if 指令一起使用：

```html
<div v-if="type === 'A'">优秀</div>
<div v-else-if="type === 'B'">良好</div>
<div v-else-if="type === 'C'">一般</div>
<div v-else>差</div>
```

注意：v-else或v-else-if 指令必须配合 v-if 指令一起使用，否则它将不会被识别！

#### 6 列表渲染指令

vue 提供了 v-for 列表渲染指令，用来辅助开发者基于一个数组来循环渲染一个列表结构。v-for 指令需要使 用 item in items 形式的特殊语法，其中： 

- items 是待循环的数组 

- item 是被循环的每一项

```html
data:{
	list:[   // 列表数据
		{ id:1, name:'zs'},
		{ id:2, name: 'ls'}
	]
}

<ul>
	<li v-for='item in list'>姓名是:{{item.name}}</li>
</ul>
```

- v-for 中的索引

v-for 指令还支持一个可选的第二个参数，即当前项的索引。语法格式为 (item, index) in items，示例代码如下：

```html
data:{
	list:[   // 列表数据
		{ id:1, name:'zs'},
		{ id:2, name: 'ls'}
	]
}

<ul>
	<li v-for='（item, index) in list'> 索引是：{{index}},姓名是:{{item.name}}</li>
</ul>
```

- 使用key维护列表的状态

当列表的数据变化时，默认情况下，vue 会尽可能的复用已存在的 DOM 元素，从而提升渲染的性能。但这种 默认的性能优化策略，会导致有状态的列表无法被正确更新。 

为了给 vue 一个提示，以便它能跟踪每个节点的身份，从而在保证有状态的列表被正确更新的前提下，提升渲 染的性能。此时，需要为每项提供一个唯一的 key 属性：

```html
<!-- 用户列表区域 -->
<ul>
   <!-- 加 key 属性的好处： -->
   <!-- 1. 正确维护列表的状态 -->
   <!-- 2. 复用现有的 DOM 元素，提升渲染的性能 -->
   <li v-for="(user, index) in userlist" :key="user.id">
     <input type="checkbox" />
     姓名：{{user.name}}
   </li>
</ul>

<!-- 官方建议：只要用到了 v-for 指令，那么一定要绑定一个 :key 属性 -->
<!-- 而且，尽量把 id 作为 key 的值 -->
<!-- 官方对 key 的值类型，是有要求的：字符串或数字类型 -->
<!-- key 的值是千万不能重复的，否则会终端报错：Duplicate keys detected -->
<tr v-for="(item, index) in list" :key="item.id">
	<td>{{ index }}</td>
	<td>{{ item.id }}</td>
	<td>{{ item.name }}</td>
</tr>
```

① key 的值只能是字符串或数字类型 

② key 的值必须具有唯一性（即：key 的值不能重复） 

③ 建议把数据项 id 属性的值作为 key 的值（因为 id 属性的值具有唯一性） 

④ 使用 index 的值当作 key 的值没有任何意义（因为 index 的值不具有唯一性）

⑤ 建议使用 v-for 指令时一定要指定 key 的值（既提升性能、又防止列表状态紊乱）

#### 7 案例

```css
body {
  padding: 15px;
  user-select: none;
}

```

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>品牌列表案例</title>
  <link rel="stylesheet" href="./lib/bootstrap.css">
  <link rel="stylesheet" href="./css/brandlist.css">
</head>

<body>

  <div id="app">
    <!-- 卡片区域 -->
    <div class="card">
      <div class="card-header">
        添加品牌
      </div>
      <div class="card-body">
        <!-- 添加品牌的表单区域 -->
        <!-- form 表单元素有 submit 事件 -->
        <form @submit.prevent="add">
          <div class="form-row align-items-center">
            <div class="col-auto">
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">品牌名称</div>
                </div>
                <input type="text" class="form-control" placeholder="请输入品牌名称" v-model.trim="brand">
              </div>
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary mb-2">添加</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- 表格区域 -->
    <table class="table table-bordered table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">品牌名称</th>
          <th scope="col">状态</th>
          <th scope="col">创建时间</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>
            <div class="custom-control custom-switch">
              <!-- 使用 v-model 实现双向数据绑定 -->
              <input type="checkbox" class="custom-control-input" :id="'cb' + item.id" v-model="item.status">
              <!-- 使用 v-if 结合 v-else 实现按需渲染 -->
              <label class="custom-control-label" :for="'cb' + item.id" v-if="item.status">已启用</label>
              <label class="custom-control-label" :for="'cb' + item.id" v-else>已禁用</label>
            </div>
          </td>
          <td>{{ item.time }}</td>
          <td>
            <a href="javascript:;" @click="remove(item.id)">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <script src="./lib/vue-2.6.12.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        // 用户输入的品牌名称
        brand: '',
        // nextId 是下一个，可用的 id
        nextId: 4,
        // 品牌的列表数据
        list: [
          { id: 1, name: '宝马', status: true, time: new Date() },
          { id: 2, name: '奔驰', status: false, time: new Date() },
          { id: 3, name: '奥迪', status: true, time: new Date() },
        ],
      },
      methods: {
        // 点击链接，删除对应的品牌信息
        remove(id) {
          this.list = this.list.filter(item => item.id !== id)
        },
        // 阻止表单的默认提交行为之后，触发 add 方法
        add() {
          // 如果判断到 brand 的值为空字符串，则 return 出去
          if (this.brand === '') return alert('必须填写品牌名称！')

          // 如果没有被 return 出去，应该执行添加的逻辑
          // 1. 先把要添加的品牌对象，整理出来
          const obj = {
            id: this.nextId,
            name: this.brand,
            status: true,
            time: new Date()
          }
          // 2. 往 this.list 数组中 push 步骤 1 中得到的对象
          this.list.push(obj)
          // 3. 清空 this.brand；让 this.nextId 自增 +1
          this.brand = ''
          this.nextId++
        }
      },
    })
  </script>
</body>

</html>
```



### 2.4.2 过滤器

过滤器（Filters）是 vue 为开发者提供的功能，常用于文本的格式化。过滤器可以用在两个地方：插值表达式 和 v-bind 属性绑定。 

过滤器应该被添加在 JavaScript 表达式的尾部，由“管道符”进行调用，示例代码如下：

```html
<!-- 在双花括号中通过“管道符”调用capitalize过滤器，对message的值进行格式化 -->
<p>{{message | capitalize }}</p>
<!-- 在v-bind中通过“管道符”调用formatId过滤器，对rawId的值进行格式化 -->
<div v-bind:id='rawId | formatId'></div>
```

#### 1 定义过滤器

在创建 vue 实例期间，可以在 filters 节点中定义过滤器，示例代码如下：

```javascript
    const vm = new Vue({
      el: '#app',
      data: {
        message: 'hello vue.js',
        info: 'title info'
      },
      // 过滤器函数，必须被定义到 filters 节点之下
      // 过滤器本质上是函数
      filters: {            // 在filters节点下定义“过滤器”
          // 形参中的str永远是管道符前面的那个值
          capitalize(str){  // 把首字母转为大写的过滤器
              return str.charAt(0).toUpperCase + str.slice(1)  // 必须有个返回值
          // 字符串有 charAt 方法，这个方法接收索引值，表示从字符串中把索引对应的字符，获取出来
          // 字符串的 slice 方法，可以截取字符串，从指定索引往后截取    
          }
        }
      }
    })
```

#### 2 私有过滤器和全局过滤器

在 filters 节点下定义的过滤器，称为“私有过滤器”，因为它只能在当前 vm 实例所控制的 el 区域内使用。 如果希望在多个 vue 实例之间共享过滤器，则可以按照如下的格式定义全局过滤器：

```javascript
// 全局过滤器 - 独立于每个vm实例之外
// Vue.filter() 方法接收两个参数：
// 1. 第一个参数，是全局过滤器的“名字”
// 2. 第二个参数，是全局过滤器的“处理函数”
// 使用 Vue.filter() 定义全局过滤器
Vue.filter('capitalize', function (str) => {
   return str.charAt(0).toUpperCase() +str.slice(1) +'--'
})
```

#### 3 连续调用多个过滤器

过滤器可以串联地进行调用，例如：

```javascript
<!-- 把 message 的值，交给 filterA 进行处理 -->
<!-- 把 filterA 处理的结果，再交给 filterB 进行处理 -->
<!-- 最终把 filterB 处理的结果，作为最终的值渲染到页面上-->
{{ message | filterA | filterB }}
```

#### 4 过滤器传参

过滤器的本质是 JavaScript 函数，因此可以接收参数，格式如下：

```JavaScript
<!-- arg1 和 arg2 是传递给 filterA 的参数 -->
<p>{{ message | filterA(arg1,arg2)}}</p>

// 过滤器处理函数的形参列表中：
// 第一个参数：永远是“管道符”前面待处理的值
// 从第二个参数开始，才是调用过滤器时传递过来的 arg1 和 arg2 参数
Vue.filter('filterA',(msg, arg1, arg2) =>{
	// 过滤器的代码逻辑
})
```

```javascript
<!-- 调用 maxLength 过滤器时传参 -->
<p>{{ text | capitalize | maxlength(5)}}</p>

// 全局过滤器 - 首字母大写
Vue.filter('capitalize',(str) =>{
	return str.charAt(0).toUpperCase() + str.slice(1) +'--'
})

// 全局过滤器 - 控制文本的最大长度
Vue.filter('maxLenght',(str, len = 10) => {
	if (str.length <= len) return str
	return str.slice(0, len) + '...'
})
```

#### 5 过滤器的兼容性

过滤器仅在 vue 2.x 和 1.x 中受支持，在 vue 3.x 的版本中剔除了过滤器相关的功能。

 在企业级项目开发中： 

- 如果使用的是 2.x 版本的 vue，则依然可以使用过滤器相关的功能 

- 如果项目已经升级到了 3.x 版本的 vue，官方建议使用计算属性或方法代替被剔除的过滤器功能 

具体的迁移指南，请参考 vue 3.x 的官方文档给出的说明：

https://v3.vuejs.org/guide/migration/filters.html#migration-strategy

#### 6 过滤器注意点

1. 要定义到 filters 节点下，**本质是一个函数**
2. 在过滤器函数中，**一定要有 return 值**
3. 在过滤器的形参中，可以获取到“管道符”前面待处理的那个值
4. 如果全局过滤器和私有过滤器名字一致，此时按照“**就近原则**”，调用的是”私有过滤器“

## 2.5 品牌列表案例

bootstrap 4.x 相关的知识点： 卡片（Card）、表单相关（Forms）、按钮（Buttons）、表格（Tables） 

vue 指令与过滤器相关的知识点： 插值表达式、属性绑定、事件绑定、双向数据绑定、修饰符、条件渲染、列表渲染、全局过滤器

① 创建基本的 vue 实例 

② 基于 vue 渲染表格数据 

③ 实现添加品牌的功能 

④ 实现删除品牌的功能 

⑤ 实现修改品牌状态的功能

### 2.5.1 创建基本的 vue 实例

#### 1 导入vue 的 js 文件

```javascript
<!-- 导入 bootstrap 的样式表 -->
<!-- https://v4.bootcss.com/docs/components/forms/#switches -->
<link rel="stylesheet" href="./lib/bootstrap.css" />
```

#### 2 在<body>标签中声明el区域

不要基于body进行声明

```javascript
<div id="app">
</div>
```

3  创建vue实例对象

```javascript
// 创建 vue 的实例对象
const vm = new Vue({
  el: '#app',
  data: {
    brandlist: [
      { id: 1, brandname: '宝马', state: true, addtime: new Date() },
      { id: 2, brandname: '奥迪', state: false, addtime: new Date() },
      { id: 3, brandname: '奔驰', state: true, addtime: new Date() },
    ],
  },
})
```

### 2.5.2 基于vue渲染表格数据

#### 1 使用v-for指令循环渲染表格的数据

```javascript
<tbody>
  <!-- TODO：循环渲染表格的每一行数据 -->
  <tr v-for="(item, index) in brandlist" :key="item.id">
    <td>{{index + 1}}</td>
    <td>{{item.brandname}}</td>
    <td>{{item.state}}</td>
    <td>{{item.addtime}}</td>
    <td><a href="#>删除</a></td>
  </tr>
</tbody>
```

#### 2 将品牌的状态渲染为switch开发效果

Switch 开关效果的官方文档地址：

https://v4.bootcss.com/docs/components/forms/#switches

```javascript
<td>
  <div class="custom-control custom-switch">
    <!-- 基于 checkbox 渲染出 switch 开关效果 -->
    <input type="checkbox" class="custom-control-input" :id="item.id" v-model="item.state" />
     <!-- switch 开发后面的描述文本-->
     <label class="custom-control-label" :for="item.id" v-if="item.state">已启用</label>
      <label class="custom-control-label" :for="item.id" v-else>已禁用</label>
   </div>
</td>
```

#### 3 使用全局过滤器对时间进行格式化

```JavaScript
<!-- 调用 dateFormat 过滤器 -->
<td>{{item.addtime | dateFormat}}</td>
```

#### 4 全局过滤器dateFormat定义

```javascript
Vue.filter('dateFormat', (dateStr) => {
  const dt = new Date(dateStr)

  const y = dt.getFullYear()
  const m = padZero(dt.getMonth() + 1)
  const d = padZero(dt.getDate())

  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      })

// 补零的函数
function padZero(n) {
  return n > 9 ? n : '0' + n
}
```

### 2.5.3 添加品牌

#### 1 阻止表单的默认提交行为

```javascript
<form class="form-inline" @submit.prevent>
</form>
```

#### 2 为input输入框进行v-model 双向数据绑定

```JavaScript
<input type="text" class="form-control" placeholder="请输入品牌名称" v-model.trim="brandname"/>
```

注意：需要在 data 数据中声明 brandname 属性字段。

#### 3 为“添加品牌”的button按钮绑定click事件处理函数

```javascript
<button type="submit" class="btn btn-primary mb-2" @click="addNewBrand">添加品牌</button>
```

#### 4 在 data 中声明 nextId 属性（用来记录下一个可用的 id 值），并在 methods 中声明 addNewBrand 事件处理函数

```javascript
data: {
  nextId: 4, // 下一个可用的 Id 值
}
methods: {
  // 添加新的品牌数据
  addNewBrand() {
  // 判断品牌名称是否为空
    if (!this.brandname) return alert('品牌名称不能为空！')
    // 添加新的品牌数据
    this.brandlist.push({ id: this.nextId, brandname: this.brandname, state: true, addtime: new Date(),})
    // 重置文本框的值
    this.brandname = ''
    // 让 nextId 自增 +1
    this.nextId++
  },
}
```

#### 5 监听 input 输入框的 keyup 事件，通过 .esc 按键修饰符快速清空文本框中的内容

```javascript
<input type="text" class="form-control" placeholder="请输入品牌名称" v-model.trim="brandname" @keyup.esc="brandname = ''" />
```

### 2.5.4 删除品牌

#### 1 为删除的 a 链接绑定 click 点击事件处理函数，并阻止其默认行为

```JavaScript
<td>
  <!-- 通过 .prevent 事件修饰符，阻止 a 链接的默认跳转行为-->
  <!-- 把 item.id 作为参数，传递给 removeBrand 函数-->
  <a href="#" @click.prevent="removeBrand(item.id)">删除</a>
</td>
```

#### 2 在 methods 节点中声明 removeBrand 事件处理函数

```javascript
methods: {
  // 根据 Id 删除对应的数据
  removeBrand(id) {
    this.brandlist = this.brandlist.filter((x) => x.id !== id)
  },
}
```

## 2.6 侦听器

### 2.6.1 定义

watch 侦听器允许开发者监视数据的变化，从而针对数据的变化做特定的操作。

```javascript
const vm = new Vue({
  el: '#app',
  data: {
     username: 'admin'
   },
   // 所有的侦听器，都应该被定义到 watch 节点下
   watch: {
     // 侦听器本质上是一个函数，要监视哪个数据的变化，就把数据名作为方法名即可
     // 新值在前，旧值在后
     username(newVal, oldVal) {
       if (newVal === '') return
       // 1. 调用 jQuery 中的 Ajax 发起请求，判断 newVal 是否被占用！！！
       $.get('https://www.escook.cn/api/finduser/' + newVal, function (result) {
         console.log(result)
       })
     }
  }
})
```

### 2.6.2 使用 watch 检测用户名是否可用

监听 username 值的变化，并使用 axios 发起 Ajax 请求，检测当前输入的用户名是否可用：

```javascript
watch: {
// 监听 username 值的变化
async username(newVal) {
   if (newVal === '') return
   // 使用 axios 发起请求，判断用户名是否可用
   const { data: res } = await axios.get('https://www.escook.cn/api/finduser/' + newVal)
   console.log(res)
   }
}
```

### 2.6.3 对象格式 immediate 选项

默认情况下，组件在初次加载完毕后不会调用 watch 侦听器。如果想让 watch 侦听器立即被调用，则需要使 用 immediate 选项。示例代码如下：

```javascript
watch: {
   username: {
   // handler 是固定写法，表示当 username 的值变化时，自动调用 handler 处理函数
     handler: async function (newVal) {
       if (newVal === '') return
       const { data: res } = await axios.get('https://www.escook.cn/api/finduser/' + newVal)
       console.log(res)
     },
   // 表示页面初次渲染好之后，就立即触发当前的 watch 侦听器
   // 默认值为false
   immediate: true
   }
}
```

### 2.6.4 对象格式 deep 选项

如果 watch 侦听的是一个对象，如果对象中的属性值发生了变化，则无法被监听到。此时需要使用 deep 选 项，代码示例如下：

```javascript
const vm = new Vue({
	el: '#app',
	data:{
		info:{ username: 'admin'}
	},
	watch: {
		info:{
			handler(newVal){
				console.log(newVal.username)
			},
             // 开启深度监听，只要对象中任何一个属性发生变化，都会触发“对象的侦听”
			deep: true
		}
	}
})
```

### 2.6.5 监听对象单个属性的变化

如果只想监听对象中单个属性的变化，则可以按照如下的方式定义 watch 侦听器：

```javascript
const vm = new Vue({
	el: '#app',
	data:{
		info:{ username: 'admin'}
	},
	watch: {
		'info.username':{
			handler(newVal){
				console.log(newVal)
			},
		}
	}
})
```

### 2.6.6 侦听器的格式

1. 方法格式的侦听器
   + 缺点1：无法在刚进入页面的时候，自动触发！！！
   + 缺点2：如果侦听的是一个对象，如果对象中的属性发生了变化，不会触发侦听器！！！
2. 对象格式的侦听器
   + 好处1：可以通过 **immediate** 选项，让侦听器自动触发！！！
   + 好处2：可以通过 **deep** 选项，让侦听器深度监听对象中每个属性的变化！！！

## 2.7 计算属性

### 2.7.1 定义

计算属性指的是通过一系列运算之后，最终得到一个属性值。 这个动态计算出来的属性值可以被模板结构或 methods 方法使用。示例代码如下：

```javascript
    var vm = new Vue({
      el: '#app',
      data: {
        // 红色
        r: 0,
        // 绿色
        g: 0,
        // 蓝色
        b: 0
      },
      methods: {
        // 点击按钮，在终端显示最新的颜色
        show() {
          console.log(this.rgb)
        }
      },
      // 所有的计算属性，都要定义到 computed 节点之下
      // 计算属性在定义的时候，要定义成“方法格式”
      computed: {
        // rgb 作为一个计算属性，被定义成了方法格式，
        // 最终，在这个方法中，要返回一个生成好的 rgb(x,x,x) 的字符串
        rgb() {
          return `rgb(${this.r}, ${this.g}, ${this.b})`
        }
      }
    });

    console.log(vm)
```

### 2.7.2 计算属性的特点

① 虽然计算属性在声明的时候被定义为方法，但是计算属性的本质是一个属性 

② 计算属性会缓存计算的结果，只有计算属性依赖的数据变化时，才会重新进行运算

## 2.8 vue-cli

### 2.8.1 单网页应用程序

单页面应用程序（英文名：Single Page Application）简称 SPA，顾名 思义，指的是一个 Web 网站中只有唯一的一个 HTML 页面，所有的功能 与交互都在这唯一的一个页面内完。

### 2.8.2 vue-cli工具

vue-cli 是 Vue.js 开发的标准工具。它简化了程序员基于 webpack 创建工程化的 Vue 项目的过程。 

引用自 vue-cli 官网上的一句话： 

程序员可以专注在撰写应用上，而不必花好几天去纠结 webpack 配置的问题

中文官网：https://cli.vuejs.org/zh/

### 2.8.3 安装与使用

vue-cli 是 npm 上的一个全局包，使用 npm install 命令，即可方便的把它安装到自己的电脑上： 

```bash
npm install -g @vue/cli 
```

基于 vue-cli 快速生成工程化的 Vue 项目： 

```bash
vue create 项目的名称
```

![01](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011007297.jpg)

<img src="https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011007824.jpg" alt="02" style="zoom:80%;" />

![03](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011007352.jpg)

![04](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011007601.jpg)

![05](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011007971.jpg)

```bash
cd 项目根目录
npm run serve
```

vue 项目中 src 目录的构成：

   ```
   assets 文件夹：存放项目中用到的静态资源文件，例如：css 样式表、图片资源
   components 文件夹：程序员封装的、可复用的组件，都要放到 components 目录下
   main.js 是项目的入口文件。整个项目的运行，要先执行 main.js
   App.vue 是项目的根组件。
   ```

### 2.8.4 vue项目的运行流程

在工程化的项目中，vue 要做的事情很单纯：通过 main.js 把 App.vue 渲染到 index.html 的指定区域中。 

其中：

① App.vue 用来编写待渲染的模板结构 

```vue
<template>
  <div>
    <p>aaa</p>
    <p>bbb</p>
    <p>ccc</p>
  </div>
</template>

```

② index.html 中需要预留一个 el 区域 

```html
<!DOCTYPE html>
<html lang="">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
  <title>
    <%= htmlWebpackPlugin.options.title %>
  </title>
</head>

<body>
  <noscript>
    <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled.
        Please enable it to continue.</strong>
  </noscript>
  <div id="app"></div>
  <!-- built files will be auto injected -->
</body>

</html>
```

③ main.js 把 App.vue 渲染到了 index.html 所预留的区域中

```javascript
// 导入 vue 这个包，得到 Vue 构造函数
import Vue from 'vue'
// 导入 App.vue 根组件，将来要把 App.vue 中的模板结构，渲染到 HTML 页面中
// import App from './App.vue'
import Test from './Test.vue'

Vue.config.productionTip = false

// 创建 Vue 的实例对象
new Vue({
  // 把 render 函数指定的组件，渲染到 HTML 页面中
  render: h => h(Test)
}).$mount('#app')

// Vue 实例的 $mount() 方法，作用和 el 属性完全一样！

```

## 2.9 vue 组件

### 2.9.1 组件化开发

组件化开发指的是：根据封装的思想，把页面上可重用的 UI 结构封装为组件，从而方便项目的开发和维护.

### 2.9.2 vue中的组件化开发

vue 是一个支持组件化开发的前端框架。 

vue 中规定：组件的后缀名是 .vue。之前接触到的 App.vue 文件本质上就是一个 vue 的组件。

### 2.9.3 vue组件的三个组成部分

每个 .vue 组件都由 3 部分构成，分别是：  

- template -> 组件的模板结构  

- script -> 组件的 JavaScript 行为  

- style -> 组件的样式 

其中，每个组件中必须包含 template 模板结构，而 script 行为和 style 样式是可选的组成部分。

```vue
<template>
  <div>
    <div class="test-box">
      <h3>这是用户自定义的 Test.vue --- {{ username }}</h3>
      <button @click="chagneName">修改用户名</button>
    </div>
    <div>123</div> // compontent template should contain exactly one root element
  </div>
</template>

<script>
// 默认导出。这是固定写法！
export default {
  // data 数据源
  // 注意：.vue 组件中的 data 不能像之前一样，不能指向对象。
  // 注意：组件中的 data 必须是一个函数
  data() {
    // 这个 return 出去的 { } 中，可以定义数据
    return {
      username: 'admin'
    }
  },
  methods: {
    chagneName() {
      // 在组件中， this 就表示当前组件的实例对象
      console.log(this)
      this.username = '哇哈哈'
    }
  },
  // 当前组件中的侦听器
  watch: {},
  // 当前组件中的计算属性
  computed: {},
  // 当前组件中的过滤器
  filters: {}
}
</script>

<style lang="less">
.test-box {
  background-color: pink;
  h3 {
    color: red;
  }
}
</style>

```

#### 1 template

vue 规定：每个组件对应的模板结构，需要定义到<template>节点中

```vue
<template>
	<!-- 当前组件的 DOM 结构， 需要定义到 template 标签的内容 -->
</template>
```

注意：  

- template 是 vue 提供的容器标签，只起到包裹性质的作用，它不会被渲染为真正的 DOM 元素  
- template 中只能包含唯一的根节点

#### 2 script

vue 规定：开发者可以在<script>节点中封装组件的JavaScript业务逻辑

```vue
<script>
// 组建相关的data数据、，methods方法等,都需要定义到 export default 所导出的对象中
export default{}
</script>
```

- .vue 组件中的data 必须是函数

vue 规定：.vue 组件中的 data 必须是一个函数，不能直接指向一个数据对象。 因此在组件中定义 data 数据节点时，下面的方式是错误的：

```vue
data: {  // 组件中，不能直接让 data 指向一个数据对象（会报错）
	count:0
}
```

会导致多个组件实例共用同一份数据的问题，请参考官方给出的示例： 

https://cn.vuejs.org/v2/guide/components.html#data-必须是一个函数

#### 3 style

vue规定：组件内的<style>节点是可选的，开发者可以在<style>节点中编写样式美化当前组件的UI结构。

```vue
<style>
h1{
	font-weight: normal;
}
</style>
```

- 让 style 中支持 less 语法

在<style>标签上添加 lang="less" 属性，即可使用 less 语法编写组件的样式：

```vue
<style lang="less">
h1 {
	font-weight: normal;
	span {
		color:red;
	}
}
</style>
```

### 2.9.4 组件之间父子关系

![搜狗截图20220830102809](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011007732.bmp)

#### 1 使用组件的三个步骤

![搜狗截图20220830103117](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011007693.bmp)

#### 2 通过 components 注册的是私有子组件

常用的组件使用components注册不方便

#### 3 注册全局组件

 vue 项目的 main.js 入口文件中，通过 Vue.component() 方法，可以注册全局组件。示例代码如下：

```vue
// 导入需要全局注册的组件
import Count from '@/components/Count.vue'

// 参数1：字符串格式，表示组件的“注册名称”
// 参数2：需要被全局注册的那个组件
Vue.component('MyCount',Count)
```

### 2.9.5 组件的props

props 是组件的自定义属性，在封装通用组件的时候，合理地使用 props 可以极大的提高组件的复用性！ 它的语法格式如下：

```javascript
export default {
 // 组件的自定义属性
 props: ['自定义属性A','自定义属性B','其他自定义属性...'],
 
 // 组件的私有属性
 data(){
 	return { }
 }
}
```

```vue
// props 是"自定义属性"，允许使用者通过自定义属性，为当前组件指定初始值
// 自定义属性的名字，是封装者自定义的（只要名称合法即可）
// props 中的数据，可以直接在模板结构中被使用
// 注意：props 是只读的，不要直接修改 props 的值，否则终端会报错！
// props: ['init'],
props: {
  // 自定义属性A : { /* 配置选项 */ },
  // 自定义属性B : { /* 配置选项 */ },
  // 自定义属性C : { /* 配置选项 */ },
  init: {
    // 如果外界使用 Count 组件的时候，没有传递 init 属性，则默认值生效
    default: 0,
    // init 的值类型必须是 Number 数字
    type: Number,
    // 必填项校验
    required: true
  }
},
```

```vue
Left.vue:
<MyCount :init="9"></MyCount>
```

如果不使用v-bind 则显示字符串9，使用v-bind则表示对应js文件，其中属性不加''为数值

#### 1 props是只读的

vue 规定：组件中封装的自定义属性是只读的，程序员不能直接修改 props 的值。否则会直接报错.

要想修改 props 的值，可以把 props 的值转存到 data 中，因为 data 中的数据都是可读可写的

```javascript
props: [init],
data(){
	return{
		count: this.init // 把 this.init 的值转存到 count
	}
}
```

#### 2 props 的 default 默认值

在声明自定义属性时，可以通过 default 来定义属性的默认值。示例代码如下:

```javascript
export default {
  props: {
    init: {
      // 用 default 属性定义属性的默认值
      default: 0
    }
  }
}
```

#### 3 props 的type 值类型

在声明自定义属性时，可以通过 type 来定义属性的值类型。示例代码如下:

```JavaScript
export default {
  prop: {
    init: {
      // 用 default 属性定义属性的默认值
      default: 0,
      // 用 type 属性定义属性的值类型
      // 如果传递过来的值不符合次类型，则会在终端报错
      type: Number
    }
  }
}
```

#### 4 props 的 required 必填项

在声明自定义属性时，可以通过 required 选项，将属性设置为必填项，强制用户必须传递属性的值。示例代码如下：

```JavaScript
export default {
  prop: {
    init: {
      // 用 default 属性定义属性的默认值
      default: 0,
      // 值类型为 Number 数字
      type: Number,
      // 必填项校验
      required: true
    }
  }
}
```

### 2.9.6 组件之间的样式冲突问题

认情况下，写在 .vue 组件中的样式会全局生效，因此很容易造成多个组件之间的样式冲突问题。

 导致组件之间样式冲突的根本原因是： 

① 单页面应用程序中，所有组件的 DOM 结构，都是基于唯一的 index.html 页面进行呈现的 

② 每个组件中的样式，都会影响整个 index.html 页面中的 DOM 元素

#### 1 如何解决

为每个组件分配唯一的自定义属性，在编写组件样式时，通过属性选择器来控制样式的作用域，实例代码如下：

```vue
<template>
  <div class="container" data-v-001>
    <h3 data-v-001>轮播图组件</h3>
  </div>
</template>

<style>
// 通过中括号“属性选择器”，来防止组件之间的“样式冲突问题”，因为每个组件分配的自定义属性是唯一的
.container[data-v-001] {
  border: 1px solid red;
}
</style>
```

#### 2 style 节点的 scoped 属性

为了提高开发效率和开发体验，vue 为 style 节点提供了 scoped 属性，从而防止组件之间的样式冲突问题：

```vue
<template>
  <div class="container">
    <h3>轮播图组件</h3>
  </div>
</template>

<style scoped>
// style 节点的 scoped 属性，用来自动为每个组件分配唯一的“自定义属性”
// 并自动为当前组件的 DOM 标签 和 style 样式应用这个自定义属性，防止组件的样式冲突问题
.container {
  border: 1px solid red;
}
</style>
```

#### 3 /deep/样式穿透

如果给当前组件的 style 节点添加了 scoped 属性，则当前组件的样式对其子组件是不生效的。如果想让某些样 式对子组件生效，可以使用 /deep/ 深度选择器。

```vue
<style lang="less" scoped>
.title {
  color: blue; /* 不加 /deep/ 时，生成的选择器格式为 .title[data-v-052242de] */
}

/deep/ .title {
  color: ble; /* 加上 /deep/ 时，生成的选择器格式为 [data-v-052242de] .title */
}
</style>
```



# 3 声明周期 & 数据共享

## 3.1 组件的生命周期

### 3.1.1 生命周期 & 生命周期函数

生命周期（Life Cycle）是指一个组件从创建 -> 运行 -> 销毁的整个阶段，强调的是一个时间段。 

生命周期函数：是由 vue 框架提供的内置函数，会伴随着组件的生命周期，自动按次序执行。 



注意：生命周期强调的是时间段，生命周期函数强调的是时间点。

### 3.1.2 分类

![搜狗截图20220830171210](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011006247.bmp)

### 3.1.3 生命周期图示

可以参考 vue 官方文档给出的“生命周期图示”，进一步理解组件生命周期执行的过程： 

https://cn.vuejs.org/v2/guide/instance.html#生命周期图示

created -- ajax 请求

mouted -- DOM 操作

updated -- 数据更新 

![lifecycle](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011006234.png)

```vue
<template>
  <div class="test-container">
    <h3 id="myh3">Test.vue 组件 --- {{ books.length }} 本图书</h3>
    <p id="pppp">message 的值是：{{ message }}</p>
    <button @click="message += '~'">修改 message 的值</button>
  </div>
</template>

<script>
export default {
  props: ['info'],
  data() {
    return {
      message: 'hello vue.js',
      // 定义 books 数组，存储的是所有图书的列表数据。默认为空数组！
      books: []
    }
  },
  watch: {
    message(newVal) {
      console.log('监视到了 message 的变化：' + newVal)
    }
  },
  methods: {
    show() {
      console.log('调用了 Test 组件的 show 方法！')
    },
    // 使用 Ajax 请求图书列表的数据
    initBookList() {
      const xhr = new XMLHttpRequest()
      xhr.addEventListener('load', () => {
        const result = JSON.parse(xhr.responseText)
        console.log(result)
        this.books = result.data
      })
      xhr.open('GET', 'http://www.liulongbin.top:3006/api/getbooks')
      xhr.send()
    }
  },
  // 创建阶段的第1个生命周期函数
  beforeCreate() {
    // console.log(this.info)
    // console.log(this.message)
    // this.show()
  },
  created() {
    // created 生命周期函数，非常常用。
    // 经常在它里面，调用 methods 中的方法，请求服务器的数据。
    // 并且，把请求到的数据，转存到 data 中，供 template 模板渲染的时候使用！
    this.initBookList()
  },
  beforeMount() {
    // console.log('beforeMount')
    // const dom = document.querySelector('#myh3')
    // console.log(dom)
  },
  // 如果要操作当前组件的 DOM，最早，只能在 mounted 阶段执行
  mounted() {
    // console.log(this.$el)
    // const dom = document.querySelector('#myh3')
    // console.log(dom)
  },
  beforeUpdate() {
    // console.log('beforeUpdate')
    // console.log(this.message)
    // const dom = document.querySelector('#pppp')
    // console.log(dom.innerHTML)
  },
  // 当数据变化之后，为了能够操作到最新的 DOM 结构，必须把代码写到 updated 生命周期函数中
  updated() {
    // console.log('updated')
    // console.log(this.message)
    // const dom = document.querySelector('#pppp')
    // console.log(dom.innerHTML)
  },
  beforeDestroy() {
    console.log('beforeDestroy')
    this.message = 'aaa'
    console.log(this.message)
  },
  destroyed() {
    console.log('destroyed')
    // this.message = 'aaa'
  }
}
</script>

<style lang="less" scoped>
.test-container {
  background-color: pink;
  height: 200px;
}
</style>

```

## 3.2 组件之间的数据共享

### 3.2.1 组件之间的关系

在项目开发中，组件之间的最常见的关系分为如下两种： 

① 父子关系

② 兄弟关系

### 3.2.2 父子组件之间的数据共享

父子组件之间的数据共享又分为： 

① 父 -> 子共享数据 

② 子 -> 父共享数据

#### 1 父组件向子组件共享数据

首先在父组件的子组件上定义一个属性，在属性上挂载要传输的变量，然后在子组件中通过`props`来接收

父组件向子组件共享数据需要使用自定义属性。示例代码如下：

```vue
// 父组件
<Son :msg="message" :user="userinfo"></Son>

data(){
  return {
    message: 'hello vue.js',
    userinfo: { name: 'zs',age: 20}
  }
}
```

```vue
<template>
  <div>
    <h5>Son 组件 </h5>
    <p>父组件传递过来的 msg 值是: {{ msg}}</p>
    <p>父组件传递过来的 user 值是： {{ user }}</p>
  </div>
</template>

prop: ['msg','user']
```

#### 2 子组件向父组件共享数据

在父组件的子组件上定义一个方法，挂载子组件传递过来的参数，然后在子组件中，通过`this.$emit("方法名",数据)`来传送

子组件向父组件共享数据使用自定义事件。示例代码如下：

```javascript
export default {
  data() {
    return { count:0 }
  },
  methods: {
    add(){
      this.count += 1
      // 修改数据时，通过 $emit()触发自定义事件
      this.$emit('numchange',this.count)
    }
  }
}
```

```javascript
<Son @numchange="getNewCount"></Son>

export default {
  data() {
    return { countFromSon: 0 }
  },
  methods: {
    getNewCount(val) {
      this.countFromSon = val
    }
  }
}
```

### 3.2.3 兄弟组件之间的数据共享

在 vue2.x 中，兄弟组件之间数据共享的方案是 EventBus。

首先在src目录新建一个bus.js文件，抛出一个空的vue实例
在发送数据的一方，引入bus.js，再通过Bus.emit ( "方法名" , 参数 )来传送 ，

在接收数据的一方，引入bus.js,再通过Bus.on(“方法名”,参数)来接收

兄弟组件A（数据发送方）

```javascript
import bus from './eventBus.js'
export default {
  data(){
    return {
      msg: 'hello vue.js'
    }
  },
  methods: {
    sendMsg() {
      bus.$emit('share',this.msg)
    }
  }
}
```

eventBus.js

```javascript
import Vue from 'vue'

// 向外共享
export default new Vue()
```

兄弟组件C（数据接收方）

```javascript
import bus from './eventBus.js'
export default {
  data(){
    return {
     msgFromLeft: ''
    }
  },
  created() {
    bus.$on('share',val =>{
      this.msgFromLeft = val
    })
  }
}
```

① 创建 eventBus.js 模块，并向外共享一个 Vue 的实例对象 

② 在数据发送方，调用 bus.\$emit('事件名称', 要发送的数据) 方法触发自定义事件 

③ 在数据接收方，调用 bus.\$on('事件名称', 事件处理函数) 方法注册一个自定义事件

## 3.3 ref 引用

- vue项目极少操作 DOM，只需要把数据维护好。
- vue 操作DOM的方法为 ref 引用

### 3.3.1 ref引用定义

ref 用来辅助开发者在不依赖于 jQuery 的情况下，获取 DOM 元素或组件的引用。 

每个 vue 的组件实例上，都包含一个 \$refs 对象，里面存储着对应的 DOM 元素或组件的引用。默认情况下， 组件的\$refs 指向一个空对象。

```javascript
<template>
    <div>
        <h3>MyRef 组件</h3>
        <button @click="getRef"> 获取 $refs 引用</button>
    </div>
</template>

<script>
export default {
    methods: {
        getRef() {console.log(this)}  // this 是当前组件的实例对象，this.$refs 默认指向空对象
    }
}
</script>
```

### 3.3.2 使用ref引用 DOM 元素

如果想要使用 ref 引用页面上的 DOM 元素，则可以按照如下的方式进行操作：

```javascript
<!-- 使用 ref 属性，为对应的 DOM 添加引用名称-->>
<h3 ref="myh3">MyRef 组件</h3>
<button @click="getRef">获取 $refs 引用</button>

methods:{
    getRef(){
        // 通过this.$refs 引用的名称 可以获取到DOM元素的引用
        console.log(this.$refs.myh3)
        // 操作 DOM 元素，把文本颜色改为红色
        this.$refs.myh3.style.color = 'red'
    }
}
```

### 3.3.3 使用 ref 引用组件实例

如果想要使用 ref 引用页面上的组件实例，则可以按照如下的方式进行操作：

```JavaScript
<!-- 使用 ref 属性，为对应的 DOM 添加引用名称-->>
<my-counter ref="counterRef">MyRef 组件</my-counter>
<button @click="getRef">获取 $refs 引用</button>

methods:{
    getRef(){
        // 通过this.$refs 引用的名称 可以获取组件的实例
        console.log(this.$refs.counterRef)
        // 引用到组件的实例之后，就可以调用组件上的 methods 方法
        this.$refs.counterRef.add()
    }
}
```

### 3.3.4 控制文本框和按钮的按需切换

通过布尔值 inputVisible 来控制组件中的文本框与按钮的按需切换。示例代码如下：

```JavaScript
<template>
  <input type="text" v-if="inputVisible">
  <button v-else @click="showInput">展示input输入框</button>
</template>

<script>
export default {
    data(){
      return {
        // 控制文本框和按钮的按需切换
        inputVisible: false,
      }
    },
    methods: {
      showInput() { // 切换布尔值，显示文本框
        this.inputVisible = true
      }
    }
</script>
```

### 3.3.5 让文本框自动获得焦点

当文本框展示出来之后，如果希望它立即获得焦点，则可以为其添加 ref 引用，并调用原生 DOM 对象的 .focus() 方法即可。示例代码如下：

```javascript
<template>
  <input type="text" v-if="inputVisible">
  <button v-else @click="showInput">展示input输入框</button>
</template>

<script>
export default {
    data(){
      return {
        // 控制文本框和按钮的按需切换
        inputVisible: false,
      }
    },
    methods: {
      showInput() { // 切换布尔值，显示文本框
        this.inputVisible = true
        // 获取文本框的 DOM 引用，并使用 .focus()使其自动获得焦点
        // ipt undefined 此时数据已经更新，但是页面没有更新
        this.$refs.ipt.focus()
      }
    }
</script>
```



### 3.3.6 this.$nextTick(cb) 方法

组件的 $nextTick(cb) 方法，会把 cb 回调推迟到下一个 DOM 更新周期之后执行。通俗的理解是：等组件的 DOM 更新完成之后，再执行 cb 回调函数。从而能保证 cb 回调函数可以操作到最新的 DOM 元素。

```javascript
<template>
  <input type="text" v-if="inputVisible">
  <button v-else @click="showInput">展示input输入框</button>
</template>

<script>
export default {
    data(){
      return {
        // 控制文本框和按钮的按需切换
        inputVisible: false,
      }
    },
    methods: {
      showInput() { // 切换布尔值，显示文本框
        this.inputVisible = true
        // 把对 input 文本框的操作，推迟到下次 DOM 更新之后，否则页面上根本不存在文本框元素
        this.$nextTick(() => {
          this.$refs.ipt.focus()
        })
      }
    }
</script>
```

## 3.4 购物车案例

① 初始化项目基本结构 

② 封装 MyHeader 组件 

③ 基于 axios 请求商品列表数据（ GET 请求，地址为 https://www.escook.cn/api/cart ） 

④ 封装 MyFooter 组件 

⑤ 封装 MyGoods 组件 

⑥ 封装 MyCounter 组件

![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202208311026200.png)

1. axios 请求商品列表

```JavaScript
import axios from 'axios'
created() {
// 调用请求数据的方法
this.initCartList()
},
methods: {
// 封装请求列表数据的方法
async initCartList() {
  // 调用 axios 的 get 方法，请求列表数据
  const { data: res } = await axios.get('https://www.escook.cn/api/cart')
  // 只要请求回来的数据，在页面渲染期间要用到，则必须转存到 data 中
  if (res.status === 200) {
    this.list = res.list
  }
},
```

2. 循环渲染Goods插件

````vue
import Header from '@/components/Header/Header.vue'
import Goods from '@/components/Goods/Goods.vue'
<template>
  <div class="app-container">
    <!-- Header 头部区域 -->
    <Header title="购物车案例"></Header>
    <!-- 循环渲染每一个商品的信息 -->
    <Goods
      v-for="item in list"
      :key="item.id"
      :id="item.id"
      :title="item.goods_name"
      :pic="item.goods_img"
      :price="item.goods_price"
      :state="item.goods_state"
      :count="item.goods_count"
      @state-change="getNewState"
    ></Goods>

    <!-- Footer 区域 -->
    <Footer :isfull="fullState" :amount="amt" :all="total" @full-change="getFullState"></Footer>
  </div>
</template>
````

goods：

```javascript
<template>
  <div class="goods-container">
    <!-- 左侧图片 -->
    <div class="thumb">
      <div class="custom-control custom-checkbox">
        <!-- 复选框 -->
        <input type="checkbox" class="custom-control-input" :id="'cb' + id" :checked="state" @change="stateChange" />
        <label class="custom-control-label" :for="'cb' + id">
          <!-- 商品的缩略图 -->
          <img :src="pic" alt="" />
        </label>
      </div>
    </div>
    <!-- 右侧信息区域 -->
    <div class="goods-info">
      <!-- 商品标题 -->
      <h6 class="goods-title">{{ title }}</h6>
      <div class="goods-info-bottom">
        <!-- 商品价格 -->
        <span class="goods-price">￥{{ price }}</span>
        <!-- 商品的数量 -->
        <Counter :num="count" :id="id"></Counter>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from '@/components/Counter/Counter.vue'

export default {
  props: {
    // 商品的 id
    // 为啥在这里要封装一个 id 属性呢？
    // 原因:将来,子组件中商品的勾选状态变化之后, 需要通过子 -> 父的形式,
    // 通知父组件根据 id 修改对应商品的勾选状态。
    id: {
      required: true,
      type: Number
    },
    // 要渲染的商品的标题
    title: {
      default: '',
      type: String
    },
    // 要渲染的商品的图片
    pic: {
      default: '',
      type: String
    },
    // 商品的单价
    price: {
      default: 0,
      type: Number
    },
    // 商品的勾选状态
    state: {
      default: true,
      type: Boolean
    },
    // 商品的购买数量
    count: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // 只要复选框的选中状态发生了变化，就会调用这个处理函数
    stateChange(e) {
      const newState = e.target.checked
      // 触发自定义事件
      this.$emit('state-change', { id: this.id, value: newState })
    }
  },
  components: {
    Counter
  }
}
</script>

<style lang="less" scoped>
.goods-container {
  + .goods-container {
    border-top: 1px solid #efefef;
  }
  padding: 10px;
  display: flex;
  .thumb {
    display: flex;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      margin: 0 10px;
    }
  }

  .goods-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    .goods-title {
      font-weight: bold;
      font-size: 12px;
    }
    .goods-info-bottom {
      display: flex;
      justify-content: space-between;
      .goods-price {
        font-weight: bold;
        color: red;
        font-size: 13px;
      }
    }
  }
}
</style>

```

复选框的选中状态变化：子向父传值

```JavaScript
 <input type="checkbox" class="custom-control-input" :id="'cb' + id" :checked="state" @change="stateChange" />  
  methods: {
    // 只要复选框的选中状态发生了变化，就会调用这个处理函数
    stateChange(e) {
      const newState = e.target.checked
      // 触发自定义事件
      this.$emit('state-change', { id: this.id, value: newState })
    }
  },
    // 接收子组件传递过来的数据
    // e 的格式为 { id, value }
    getNewState(e) {
      this.list.some(item => {
        if (item.id === e.id) {
          item.goods_state = e.value
          // 终止后续的循环
          return true
        }
      })
    },
```

3. 定义fullstate计算属性

```javascript
  // 计算属性
  computed: {
    // 动态计算出全选的状态是 true 还是 false
    fullState() {
      return this.list.every(item => item.goods_state)
    },
  },
      
<Footer :isfull="fullState"></Footer>
```

父向子传参：


```javascript
<div class="custom-control custom-checkbox">
   <input type="checkbox" class="custom-control-input" id="cbFull" :checked="isfull" />
   <label class="custom-control-label" for="cbFull">全选</label>
</div>
props: {
  // 全选的状态
  isfull: {
    type: Boolean,
    default: true
  },
},
```

子向父传参：

```javascript
<div class="custom-control custom-checkbox">
  <input type="checkbox" class="custom-control-input" id="cbFull" :checked="isfull" @change="fullChange" />
  <label class="custom-control-label" for="cbFull">全选</label>
</div>

methods: {
  // 监听到了全选的状态变化
  fullChange(e) {
    this.$emit('full-change', e.target.checked)
  }
}
//--------------------------------------------------------------------------------------------
// 接收 Footer 子组件传递过来的全选按钮的状态
getFullState(val) {
  this.list.forEach(item => (item.goods_state = val))
}
<!-- Footer 区域 -->
<Footer :isfull="fullState" @full-change="getFullState"></Footer>
```

4. 计算商品总价格

```javascript
amt() {
  // 1. 先 filter 过滤
  // 2. 再 reduce 累加
  return this.list
    .filter(item => item.goods_state)
    .reduce((total, item) => (total += item.goods_price * item.goods_count), 0)
},  
<Footer :isfull="fullState" :amount="amt" :all="total" @full-change="getFullState"></Footer>
//------------------------------------------
props: {
  // 总价格
  amount: {
    type: Number,
    default: 0
  },
}    
<!-- 中间的合计 -->
<div>
  <span>合计：</span>
  <span class="total-price">￥{{ amount.toFixed(2) }}</span>
</div>
```

5. 把数量组件传递到count组件

```javascript
<Goods
  v-for="item in list"
  :count="item.goods_count"
></Goods>


props: {
  // 商品的购买数量
  count: {
    type: Number,
    default: 1
  }
},
<!-- 商品的数量 -->
<Counter :num="count" :id="id"></Counter>
```

6. 修改购买数量,使用eventbus

```javascript
import bus from '@/components/eventBus.js'
props: {
  // 接收商品的 id 值，将来，使用 EventBus 方案，
  // 把数量传递到 App.vue 的时候，需要通知 App 组件，更新哪个商品的数量
  id: {
    type: Number,
    required: true
  },
  // 接收到的 num 数量值
  num: {
    type: Number,
    default: 1
  }
},
methods: {
  // 点击按钮，数值 +1
  add() {
    // 要发送给 App 的数据格式为 { id, value }
    // 其中，id 是商品的 id; value 是商品最新的购买数量
    const obj = { id: this.id, value: this.num + 1 }
    // 要做的事情：通过 EventBus 把 obj 对象，发送给 App.vue 组件
    bus.$emit('share', obj)
  },
  sub() {
    if (this.num - 1 === 0) return
    // 要发送给 App 的数据格式为 { id, value }
    // 其中，id 是商品的 id; value 是商品最新的购买数量
    const obj = { id: this.id, value: this.num - 1 }
    // 要做的事情：通过 EventBus 把 obj 对象，发送给 App.vue 组件
    bus.$emit('share', obj)
  }
}

<div class="number-container d-flex justify-content-center align-items-center">
  <!-- 减 1 的按钮 -->
  <button type="button" class="btn btn-light btn-sm" @click="sub">-</button>
  <!-- 购买的数量 -->
  <span class="number-box">{{ num }}</span>
  <!-- 加 1 的按钮 -->
  <button type="button" class="btn btn-light btn-sm" @click="add">+</button>
</div>
//--------------------------------------------------
import Vue from 'vue'
export default new Vue()
//--------------------------------------------------
import bus from '@/components/eventBus.js'

created() {
  // 调用请求数据的方法
  this.initCartList()

  bus.$on('share', val => {
    this.list.some(item => {
      if (item.id === val.id) {
        item.goods_count = val.value
        return true
      }
    })
  })
},
```

7. 动态显示已勾选商品的总数量

```javascript
computed: {
  // 已勾选商品的总数量
  total() {
    return this.list.filter(item => item.goods_state).reduce((t, item) => (t += item.goods_count), 0)
  }
},
//-------------------------------------------------------------------------------
props: {
  // 已勾选的商品的总数量
  all: {
    type: Number,
    default: 0
  }
},
<!-- 结算按钮 -->
<button type="button" class="btn btn-primary btn-settle">结算（{{ all }}）</button>    

```



# 4 动态组件&插槽&自定义指令

## 4.1 动态组件

### 4.1.1 动态组件定义

动态组件指的是动态切换组件的显示与隐藏。

### 4.1.2 如何实现动态组件渲染

vue 提供了一个内置的 组件，专门用来实现动态组件的渲染。示例代码如下：

```JavaScript
data() {
  // 1. 当前要渲染的组件名称
  return { comName: 'Left' }
}

<!-- 2. 通过 is 属性，动态指定要渲染的组件 -->
<component :is="comName"></component>

<!-- 3. 点击按钮，冬天切换组件的名称 -->
<button @click="comName = 'Left'">展示 Left 组件</button>
<button @click="comName = 'Right'">展示 Right 组件</button>

export default {
  data() {
    return {
      // comName 表示要展示的组件的名字
      comName: 'Left'
    }
  },
  components: {
    // 如果在“声明组件”的时候，没有为组件指定 name 名称，则组件的名称默认就是“注册时候的名称”
    Left,
    Right
  }
}
```

### 4.1.3 使用 keep-alive 保持状态

默认情况下，切换动态组件时无法保持组件的状态。此时可以使用 vue 内置的  组件保持动态组 件的状态。示例代码如下：   

```vue
<keep-alive>
  <component :is="comName"></component>
</keep-alive>
```

inactive: 表示组件被缓存

### 4.1.4 keep-alive 对应的生命周期函数

当组件被缓存时，会自动触发组件的 deactivated 生命周期函数。 

当组件被激活时，会自动触发组件的 activated 生命周期函数。

```JavaScript
// 当组件第一个被创建的时候，会执行 created 生命周期，也会执行 activated 生命周期
// 当组件被激活的时候，只会触发 activated 生命周期， 不再触发 created。 因为组件没有被重新创建
export default {
  created() { console.log('组件被创造了') },
  destroyed() { console.log('组件被摧毁了') },
  
  activated() { console.log('Left 组件被激活了！')},
  deactivated() { console.log('Left 组件被缓存了！')}
}
```

### 4.1.5 keep-alive 的 include 属性

include 属性用来指定：只有名称匹配的组件会被缓存。多个组件名之间使用英文的逗号分隔：

可以使用exclude属性来指定哪些不需要被缓存。但是不能同时使用两个属性

```vue
<keep-alive include="MyLeft,MyRight">
  <component :is="comName"></component>
</keep-alive>
```

### 4.1.6 组件的注册名称

```javascript
export default {
  // 当提供了 name 属性之后，组件的名称，就是 name 属性的值
  // 对比：
  // 1. 组件的 “注册名称” 的主要应用场景是：以标签的形式，把注册好的组件，渲染和使用到页面结构之中
  // 2. 组件声明时候的 “name” 名称的主要应用场景：结合 <keep-alive> 标签实现组件缓存功能；以及在调试工具中看到组件的 name 名称
  name: 'MyRight'
}
```



## 4.2 插槽

### 4.2.1 插槽定义

插槽（Slot）是 vue 为组件的封装者提供的能力。允许开发者在封装组件时，把不确定的、希望由用户指定的 部分定义为插槽。

![搜狗截图20220830232943](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202208312341767.bmp)

### 4.2.2 基础用法

在封装组件时，可以通过  元素定义插槽，从而为用户预留内容占位符。示例代码如下：

```vue
<template>
  <p>这是MyCom1组件的第一个p标签</p>
  <!-- 通过 slot 标签，为用户预留内容占位符（插槽）-->
  <slot></slot>
  <p>这是MyCom1 组件最后一个p标签</p>
</template>
```

```
<my-com-1>
  <!-- 在使用Mycom1组件时，为插槽指定具体的内容 -->
  <p>---用户自定义的内容---</p>
</my-com-1>
```

默认情况下，在使用组件的时候，提供的内容都会被填充到名字为default的插槽中。

如果省略了slot的name属性，则是一个默认名称叫做default

```javascript
// app
<Left>
  <!-- 默认情况下，在使用组件的时候，提供的内容都会被填充到名字为 default 的插槽之中 -->
  <!-- 1. 如果要把内容填充到指定名称的插槽中，需要使用 v-slot: 这个指令 -->
  <!-- 2. v-slot: 后面要跟上插槽的名字 -->
  <!-- 3. v-slot: 指令不能直接用在元素身上，必须用在 template 标签上 -->
  <!-- 4. template 这个标签，它是一个虚拟的标签，只起到包裹性质的作用，但是，不会被渲染为任何实质性的 html 元素 -->
  <!-- 5. v-slot: 指令的简写形式是 # -->
  <template #default>
    <p>这是在 Left 组件的内容区域，声明的 p 标签</p>
  </template>
</Left>
```

```javascript
// left
<template>
  <div class="left-container">
    <h3>Left 组件</h3>
    <hr />
    <!-- 声明一个插槽区域 -->
    <!-- vue 官方规定：每一个 slot 插槽，都要有一个 name 名称 -->
    <!-- 如果省略了 slot 的 name 属性，则有一个默认名称叫做 default -->
    <slot name="default">
      <!-- 如果插槽中没有内容，可以在这里加入内容，就是默认显示的效果,即后备内容 -->
      <h6>这是 default 插槽的后备内容</h6>
    </slot>
  </div>
</template>
```

#### 1 没有预留插槽的内容会被丢弃

如果在封装组件时没有预留任何  插槽，则用户提供的任何自定义内容都会被丢弃。示例代码如下：

```JavaScript
<template>
  <p>这是MyCom1组件的第一个p标签</p>
  <!-- 封装组件时，没有预留任何插槽-->
  <p>这是MyCom1 组件最后一个p标签</p>
</template>
```

```JavaScript
<my-com-1>
  <!-- 自定义的内容会被丢弃 -->
  <p>---用户自定义的内容---</p>
</my-com-1>
```

#### 2 后备内容

封装组件时，可以为预留的 插槽提供后备内容（默认内容）。如果组件的使用者没有为插槽提供任何内容，则后备内容会生效。示例代码如下：

```JavaScript
<template>
  <p>这是MyCom1组件的第一个p标签</p>
  <slot>这是后备内容</slot>
  <p>这是MyCom1 组件最后一个p标签</p>
</template>
```

### 4.2.3 具名插槽

如果在封装组件时==需要预留多个插槽节点==，则需要为每个 插槽指定==具体的 name 名称==。这种==带有具体名称的插槽==叫做“具名插槽”。示例代码如下：

```javascript
<div class="container">
  <header>
    <!-- 我们需要把页头放这里>
    <slot name="header"></slot>
  </header>
  <main>
    <!-- 我们希望把主要内容放这里>
    <slot></slot>
  </main>
  <footer>
    <!--我们需要把页脚放这里>
    <slot name="footer"></slot>
  </footer>
</div>
```

注意：没有指定 name 名称的插槽， 会有隐含的名称叫做 ==“default”==

#### 1 为具名插槽提供内容

在向具名插槽提供内容的时候，我们可以在一个 <template>元素上使用 v-slot 指令，并以 v-slot 的参数的 形式提供其名称。示例代码如下：

```javascript
<my-com-2>
  <template v-slot:header>
    <h1></h1>
  </template>
  
  <template v-slot:default>
    <p></p>
    <p></p>
    <p></p>
  </template>
  
  <template v-slot:footer>
    <p></p>
  </template>
</my-com-2>
```

#### 2 具名插槽的简写形式

跟 v-on 和 v-bind 一样，v-slot 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 #。例如 v-slot:header 可以被重写为 #header：

```javascript
<my-com-2>
  <template #header>
    <h1></h1>
  </template>
  
  <template #default>
    <p></p>
    <p></p>
    <p></p>
  </template>
  
  <template #footer>
    <p></p>
  </template>
</my-com-2>
```

### 4.2.4 作用域插槽

在封装组件的过程中，可以为预留的 <slot>插槽绑定 props 数据，这种带有 props 数据的  叫做“作用 域插槽”。示例代码如下:

```javascript
<tbody>
  <!-- 下面的 slot 是一个作用域插槽 -->
  <slot v-for="item in list" :user="item"></slot>
</tbody>
```

#### 1 使用作用域插槽

可以使用 v-slot: 的形式，接收作用域插槽对外提供的数据。示例代码如下：

```JavaScript
<my-com-3>
  <!-- 1.接收作用域插槽对外提供的数据 -->
  <template v-slot:default="scope">
    <tr>
      <!-- 2.使用作用域插槽的数据 -->
      <td>{{scope}}</td>
    </tr>
  </template>  
</my-com-3>
```

#### 2 解构插槽Prop

作用域插槽对外提供的数据对象，可以使用解构赋值简化数据的接收过程。示例代码如下：

```JavaScript
<my-com-3>
  <!-- 作用域插槽对外提供的数据对象，可以通过“解构赋值”简化接收的过程>
  <template #default="{user}">
    <tr>
      <td>{{user.id}}</td>
      <td>{{user.name}}</td>
      <td>{{user.state}}</td>
    </tr>
  </template>  
</my-com-3>
```

### 4.2.5 使用插槽重构购物车案例

```javascript
app:
<template>
  <div class="app-container">
    <!-- 循环渲染每一个商品的信息 -->
    <Goods
      <Counter :num="item.goods_count" @num-change="getNewNum(item, $event)"></Counter>
    </Goods>
</template>

<script>
// 导入 Counter 组件
import Counter from '@/components/Counter/Counter.vue'

export default {
  methods: {
    // 获取 Counter 组件发过来的最新的数量值
    getNewNum(item, e) {
      // console.log(item, e)
      item.goods_count = e
    }
  },
  components: {
    Counter
  }
}
</script>
```

```javascript
goods:
<template>
  <div class="goods-container">
    <!-- 右侧信息区域 -->
    <div class="goods-info">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
```

```javascript
count:
<template>
  <div class="number-container d-flex justify-content-center align-items-center">
    <!-- 减 1 的按钮 -->
    <button type="button" class="btn btn-light btn-sm" @click="del">-</button>
    <!-- 购买的数量 -->
    <span class="number-box">{{ num }}</span>
    <!-- 加 1 的按钮 -->
    <button type="button" class="btn btn-light btn-sm" @click="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    // 要展示的商品的数量
    num: {
      type: Number,
      default: 1
    }
  },
  methods: {
    add() {
      // 通过自定义事件的方法，把最新的数量值，发给父组件
      this.$emit('num-change', this.num + 1)
    },
     del() {
      // 通过自定义事件的方法，把最新的数量值，发给父组件
      this.$emit('num-change', this.num - 1)
    },
     
  }
}
</script>

<style lang="less" scoped>
.number-box {
  min-width: 30px;
  text-align: center;
  margin: 0 5px;
  font-size: 12px;
}

.btn-sm {
  width: 30px;
}
</style>

```

## 4.3 自定义指令

### 4.3.1 自定义指令

vue 官方提供了 v-text、v-for、v-model、v-if 等常用的指令。除此之外 vue 还允许开发者自定义指令。

### 4.3.2 自定义指令的分类

vue 中的自定义指令分为两类，分别是： 

- 私有自定义指令 

- 全局自定义指令

### 4.3.3 私有自定义指令

在每个 vue 组件中，可以在 directives 节点下声明私有自定义指令。示例代码如下：

```javascript
directives: {
  color: {
    // 为绑定到的 HTML 元素设置红色的文字
    bind(el) {
      // 形参中的 el 是绑定了次指令的，原生的 DOM 对象
      el.style.color = 'red'
    }
  }
}
```

### 4.3.4 使用自定义指令

在使用自定义指令时，需要加上 v- 前缀。示例代码如下：

```javascript
<!-- 声明自定义指令时，指令的名字是 color -->
<!-- 使用自定义指令时，需要加上 v- 指令前缀 -->
<h1 v-color> App 组件</h1>
```

### 4.3.5 为自定义指令动态绑定参数值

在 template 结构中使用自定义指令时，可以通过等号（=）的方式，为当前指令动态绑定参数值：

```JavaScript
data() {
  return {
    color: 'red' // 定义 color 颜色值
  }
}
<!-- 在使用指令时，动态为当前指令绑定参数值 color -->
<h1 v-color="color">App 组件 </h1>
```

### 4.3.6 通过binding获取指令的参数值

在声明自定义指令时，可以通过形参中的第二个参数，来接收指令的参数值：

```javascript
directives: {
  color: {
    bind(el,binding) {
      // 通过 binding 对象.value 属性，获取动态的参数值
      el.style.color = binding.value
      // express
    }
  }
}
```

   binding：一个对象，包含以下 property：

- `name`：指令名，不包括 `v-` 前缀。
- `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
- `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
- `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
- `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
- `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。

### 4.3.7 update 函数

bind 函数只调用 1 次：当指令第一次绑定到元素时调用，当 DOM 更新时 bind 函数不会被触发。 update 函 数会在每次 DOM 更新时被调用。示例代码如下：

```javascript
directives: {
  color: {
  // 当指令第一次被绑定到元素时被调用
    bind(el,binding) {
      el.style.color = binding.value
    },
    // 每次 DOM 更新时被调用
    update(el,binding) {
      el.style.color = binding.value
    }
  }
}
```

### 4.3.8 函数简写

如果 bind 和update 函数中的逻辑完全相同，则对象格式的自定义指令可以简写成函数格式：

```javascript
directives: {
    // 在 insert 和 update 时，会触发相同的业务逻辑
    color(el, binding) {
      el.style.color = binding.value
    }
  }
}
```

### 4.3.9 全局自定义指令

全局共享的自定义指令需要通过“Vue.directive()”进行声明，示例代码如下：

```JavaScript
main.js
// 参数1：字符串，表示全局自定义指令的名字
// 参数2： 对象，用来接收指令的参数值
Vue.directive('color',function(el,binding) {
  el.style.color = binding.value
})
```

# 5 路由

## 5.1 前端路由的概念与原理

### 5.1.1 路由定义

由（英文：router）就是对应关系

### 5.1.2 SPA与前端路由

SPA 指的是一个 web 网站只有唯一的一个 HTML 页面，所有组件的展示与切换都在这唯一的一个页面内完成。 

此时，不同组件之间的切换需要通过前端路由来实现。 



结论：在 SPA 项目中，不同功能之间的切换，要依赖于前端路由来完成！

### 5.1.3 前端路由

Hash 地址与组件之间的对应关系

锚链接也是 Hash 地址

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .box {
      height: 800px;
    }

    #b1 {
      background-color: pink;
    }

    #b2 {
      background-color: red;
    }

    #b3 {
      background-color: orange;
    }

    #b4 {
      background-color: skyblue;
    }

    .side-bar {
      position: fixed;
      top: 0;
      right: 0;
      background: white;
    }
  </style>
</head>

<body>
  <div class="side-bar">
    <a href="#b1">b1</a>
    <a href="#b2">b2</a>
    <a href="#b3">b3</a>
    <a href="#b4">b4</a>
  </div>

  <div class="box" id="b1"></div>
  <div class="box" id="b2"></div>
  <div class="box" id="b3"></div>
  <div class="box" id="b4"></div>
</body>

</html>
```



### 5.1.4 前端路由的工作方式

① 用户点击了页面上的路由链接 

② 导致了 URL 地址栏中的 Hash 值发生了变化 

③ 前端路由监听了到 Hash 地址的变化 

④ 前端路由把当前 Hash 地址对应的组件渲染都浏览器中

![image-20220831233618678](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202208312336759.png)

结论：前端路由，指的是 Hash 地址与组件之间的对应关系！

### 5.1.5 实现简单的前端路由

步骤1：通过  标签，结合 comName 动态渲染组件。示例代码如下：

```JavaScript
<!-- 通过 is 属性， 指定要展示的组件的名称 -->
<component :is="comName"></component>

export default {
  name: 'App',
  data() {
    return {
      // 要展示的组件的名称
      comName: 'Home'
    }
  }
}
```

步骤2：在 App.vue 组件中，为  链接添加对应的 hash 值：

```javascript
<a href="#/home">Home</a>&nbsp;
<a href="#/movie">Home</a>&nbsp;
<a href="#/about">Home</a>
```

步骤3：在 created 生命周期函数中，监听浏览器地址栏中 hash 地址的变化，动态切换要展示的组件的名称：

```javascript
created(){
  window.onhashchange = () => {
    switch(location.hash) {
      case '#/home':
        this.comName = 'Home'
        break
      case '#/moive':
        this.comName = 'Movie'
        break
      case '#/about':
        this.comName = 'About'
        break
    }
  }
}
```

## 5.2 vue-router 的基本用法

### 5.2.1 vue-router 定义

vue-router 是 vue.js 官方给出的路由解决方案。它只能结合 vue 项目进行使用，能够轻松的管理 SPA 项目 中组件的切换。 

vue-router 的官方文档地址：https://router.vuejs.org/zh/

### 5.2.2 vue-router 安装和配置的步骤

① 安装 vue-router 包 

==② 创建路由模块==

③ 导入并挂载路由模块 

④ 声明==路由链接==和==占位符==

#### 1 在项目中安装 vue-router

在 vue2 的项目中，安装 vue-router 的命令如下：

```bash
npm i vue-router@3.5.2 -S
```

#### 2 创建路由模块

在 src 源代码目录下，新建 router/index.js 路由模块，并初始化如下的代码：

```JavaScript
// 1. 导入 Vue 和 VueRouter 的包
import Vue from 'vue'
import VueRouter from 'vue-router'
// 2. 调用 Vue.use() 函数， 把 VueRouter 安装为 Vue 的插件
Vue.use(VueRouter)
// 3. 创建路由的实例对象
const router = new VueRouter()
// 4. 向外共享路由的实例对象
export default router
```

#### 3 导入并挂载路由模块

在 src/main.js 入口文件中，导入并挂载路由模块。示例代码如下：

```javascript
import Vue from 'vue'
import App from './App.vue'
// 1. 导入路由模块
import router from '@/router'

new Vue ({
  render: h => h(App),
  // 2. 挂载路由模块
  router: router
}).$mount('#app')
```

#### 4 声明路由链接和占位符

在 src/App.vue 组件中，使用 vue-router 提供的 <router-link>和<router-view>声明路由链接和占位符：

```javascript
<template>
  <div class="app-container">
    <h1>App 组件</h1>
    <!-- 1.定义路由连接 -->
    <router-link to="/home">首页</router-link>
    <router-link to="/movie">电影</router-link>
    <router-link to="/about">关于</router-link>
    <hr />
    <!-- 2.定义路由的占位符 -->
    <router-view></router-view>
  </div>
</template>
```

### 5.2.3 声明路由的匹配规则

在 src/router/index.js 路由模块中，通过 routes 数组声明路由的匹配规则。示例代码如下：

```javascript
// 导入需要的组件
import Home from '@/components/Home.vue'
import Movie from '@/components/Movie.vue'
import About from '@/components/About.vue'

// 创建路由的实例对象
const router = new VueRouter({
  // routes 是一个数组，作用：定义 “hash 地址” 与 “组件” 之间的对应关系
  routes: [ // 在 routes 数组中，声明路由的匹配规则
      // path 表示要匹配的 hash 地址： component 表示要展示的路由组件
      { path: '/home', component: Home },
      { path: '/movie', component: Movie },
      { path: '/about', component: About },
  ]
})
```

## 5.3 vue-router 的常见用法

### 5.3.1 路由重定向

路由重定向指的是：用户在访问地址 A 的时候，强制用户跳转到地址 C ，从而展示特定的组件页面。 通过路由规则的 redirect 属性，指定一个新的路由地址，可以很方便地设置路由的重定向：

```javascript
const router = new VueRouter({
  // routes 数组中，声明路由的匹配规则
  routes: [
      // 当用户访问 / 的时候，通过 redirect 属性跳转到 /home 对应的路由规则
      { path: '/', redirect: '/home' },
      { path: '/home', component: Home },
      { path: '/movie', component: Movie },
      { path: '/about', component: About },
  ]
})
```

### 5.3.2 嵌套路由

通过路由实现组件的嵌套展示，叫做嵌套路由。

![image-20220901155548512](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011555799.png)

#### 1 声明子路由链接和子路由占位符

在 About.vue 组件中，声明 tab1 和 tab2 的子路由链接以及子路由占位符。示例代码如下：

```javascript
<template>
  <div class="about-container">
    <h3>About 组件</h3>

    <!-- 子级路由链接 -->
    <router-link to="/about/tab1">tab1</router-link>
    <router-link to="/about/tab2">tab2</router-link>

    <hr />

    <!-- 子级路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="less" scoped>
.about-container {
  min-height: 200px;
  background-color: skyblue;
  padding: 15px;
  > a {
    margin-right: 10px;
  }
}
</style>

```

#### 2 通过 children 属性声明子路由规则

在 src/router/index.js 路由模块中，导入需要的组件，并使用 children 属性声明子路由规则：

```JavaScript
import Tab1 from '@/components/tabs/Tab1.vue'
import Tab2 from '@/components/tabs/Tab2.vue'


const router = new VueRouter({
  // routes 是一个数组，作用：定义 “hash 地址” 与 “组件” 之间的对应关系
  routes: [
    { // about 页面的路由规则（父级路由规则）
      path: '/about',
      component: About,
      children: [ // 1. 通过 children 属性，嵌套声明子级路由规则
        { path: 'tab1', component: Tab1 }, // 2. 访问 /about/tab1时，展示 Tab1 组件
        { path: 'tab2', component: Tab2 }  // 2. 访问 /about/tab2时，展示 Tab2 组件
      ]
    }
  ]
})
```

路由重定向

```javascript
import Tab1 from '@/components/tabs/Tab1.vue'
import Tab2 from '@/components/tabs/Tab2.vue'


const router = new VueRouter({
  // routes 是一个数组，作用：定义 “hash 地址” 与 “组件” 之间的对应关系
  routes: [
    { // about 页面的路由规则（父级路由规则）
      path: '/about',
      component: About,
      redirect: 'about/tab1'
      children: [ // 1. 通过 children 属性，嵌套声明子级路由规则
        { path: 'tab1', component: Tab1 }, // 2. 访问 /about/tab1时，展示 Tab1 组件
        { path: 'tab2', component: Tab2 }  // 2. 访问 /about/tab2时，展示 Tab2 组件
      ]
    }
  ]
})
```

默认子路由：默认子路由：如果 children 数组中，某个路由规则的 path 值为空字符串，则这条路由规则，叫做“默认子路由”

```javascript
const router = new VueRouter({
  // routes 是一个数组，作用：定义 “hash 地址” 与 “组件” 之间的对应关系
  routes: [
    { // about 页面的路由规则（父级路由规则）
      path: '/about',
      component: About,
      children: [ // 1. 通过 children 属性，嵌套声明子级路由规则
        { path: '', component: Tab1 }, // 2. 访问 /about/tab1时，展示 Tab1 组件
        { path: 'tab2', component: Tab2 }  // 2. 访问 /about/tab2时，展示 Tab2 组件
      ]
    }
  ]
})
<router-link to="/about">tab1</router-link>
```



### 5.3.3 动态路由匹配

三个路由链接

```JavaScript
<router-link to="/movie/1">电影1</router-link>
<router-link to="/movie/2">电影2</router-link>
<router-link to="/movie/3">电影3</router-link>
```

定义三个路由规则

```JavaScript
{ path: '/movie/1',component:Movie}
{ path: '/movie/2',component:Movie}
{ path: '/movie/3',component:Movie}
```

缺点：路由规则的复用性差

#### 1 动态路由的概念

动态路由指的是：把 Hash 地址中可变的部分定义为参数项，从而提高路由规则的复用性。 在 vue-router 中使用英文的冒号（:）来定义路由的参数项。示例代码如下：

```JavaScript
// 路由中的动态参数以 ： 进行声明，冒号后面ed是动态参数的名称
{ path: '/movie/:id',component:Movie}

// 将一下三个路由规则，合并成了一个，提高路由规则的复用性
{ path: '/movie/1',component:Movie}
{ path: '/movie/2',component:Movie}
{ path: '/movie/3',component:Movie}
```

#### 2 $route.params 参数对象

在动态路由渲染出来的组件中，可以使用 this.$route.params 对象访问到动态匹配的参数值。

```javascript
<template>
  <div class="movie-container">
    <!-- this.$route 是路由的“参数对象”-->
    <h3> Movie 组件 -- {{ this.$route.params.id }}</h3>
  </div>
</template>

<script>
export default {
  name: 'Movie'
}
</script>
```

#### 3 使用 props 接收路由参数

为了简化路由参数的获取形式，vue-router 允许在路由规则中开启 props 传参。示例代码如下：

```JavaScript
// 1. 在定义路由规则时，声明 props：true选项
// 即可在Movie组件中，以props的形式接收到路由规则匹配到的参数项
index.js
{ path: '/movie/:id', component: Movie, props: true }

//-------------------------------------------
<template>
  <div class="movie-container">
    <h3> Movie 组件 -- {{ id }}</h3>
  </div>
</template>

<script>
export default {
  prop: ['id']  // 2. 使用 props 接收路由规则中匹配到的参数项
}
</script>
```

- 在 hash 地址中，/ 后面的参数项是“路径参数”；在路由“参数对象”中，需要使用this.$route.params 来访问路径参数

- 在 hash 地址中，? 后面的参数项是“查询参数”；在路由“参数对象”中，需要使用this.$route.query来访问路径参数

### 5.3.4 声明式导航&编程式导航

在浏览器中，点击链接实现导航的方式，叫做声明式导航。例如： 

- 普通网页中点击  链接、vue 项目中点击  都属于声明式导航 

在浏览器中，调用 API 方法实现导航的方式，叫做编程式导航。例如： 

- 普通网页中调用 location.href 跳转到新页面的方式，属于编程式导航

#### 1 vue-router 中的编程式导航API

vue-router 提供了许多编程式导航的 API，其中最常用的导航 API 分别是：

 ① this.\$router.push('hash 地址') 

- 跳转到指定 hash 地址，并增加一条历史记录 

② this.\$router.replace('hash 地址') 

- 跳转到指定的 hash 地址，并替换掉当前的历史记录 

③ this.$router.go(数值 n) 

- 实现导航历史前进、后退

#### 2 $router.push

调用 this.$router.push() 方法，可以跳转到指定的 hash 地址，从而展示对应的组件页面。示例代码如下：

```javascript
<template>
  <div class="movie-container">
    <h3> Movie 组件 </h3>
    <button @click="gotoMovie">跳转到Movie页面</button>
  </div>
</template>

<script>
export default {
  methods: {
    gotoMovie() { this.$router.push('/movie/1')}
  }
}
</script>
```

#### 3 $router.replace

调用 this.$router.replace() 方法，可以跳转到指定的 hash 地址，从而展示对应的组件页面。 push 和 replace 的区别： 

- push 会增加一条历史记录 
- replace 不会增加历史记录，而是替换掉当前的历史记录

#### 4 $router.go

调用 this.$router.go() 方法，可以在浏览历史中前进和后退。示例代码如下：

```javascript
<template>
  <div class="movie-container">
    <h3> Movie 组件 </h3>
    <button @click="goBack">后退</button>
  </div>
</template>

<script>
export default {
  prop: ['id'], 
  methods: {
    goBack() { this.$router.go(-1) } //后退到之前的组件页面
  },
}
</script>
```

#### 5 $router.go 的简化用法

在实际开发中，一般只会前进和后退一层页面。因此 vue-router 提供了如下两个便捷方法： 

① \$router.back() 

- 在历史记录中，后退到上一个页面 

② $router.forward()  

- 在历史记录中，前进到下一个页面

在行内使用：

```JavaScript
<!-- 在行内使用编程式导航跳转的时候，this 必须要省略，否则会报错！ -->
<button @click="$router.back()">back 后退</button>
<button @click="$router.forward()">forward 前进</button>
```



### 5.3.5 导航守卫

![image-20220901163709448](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011637683.png)

#### 1 全局前置守卫

每次发生路由的导航跳转时，都会触发全局前置守卫。因此，在全局前置守卫中，程序员可以对每个路由进行 访问权限的控制：

```javascript
// 创建路由实例对象
const router = new VueRouter({...})

// 调用路由实例对象的 beforeEach 方法，即可声明“全局前置守卫”
// 每次发生路由导航跳转的时候，都会自动触发 fn 这个“回调函数”
router.beforeEach(fn)
```

#### 2 守卫方法的3个形参

全局前置守卫的回调函数中接收 3 个形参，格式为：

```JavaScript
// 创建路由实例对象
const router = new VueRouter({...})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // to 是将要访问的路由的信息对象
  // from 是将要离开的路由的信息对象
  // next 是一个函数，调用 next()表示放行，允许这次路由导航
})
```

#### 3 next函数的3中调用方式

参考示意图，分析 next 函数的 3 种调用方式最终导致的结果：

![image-20220901164618077](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011646522.png)

#### 4 控制后台主页的访问权限

```JavaScript
router.beforeEach((to, from, next) => {
  if (to.path === '/main') {
    const token =localStorage.getItem('token')
    if (token) {
      next() // 访问的是后台主页，且有 token 的值
    } else {
      next('/login')  // 访问的是后台主页，但是没有 token 的值
    }
  } else {
    next() // 访问的不是后台主页，直接放行
  }
})
```

## 5.4 后台管理案例

- 命名路由 
- 路由重定向 
- 导航守卫 
- 嵌套路由 
- 动态路由匹配
- 编程式导航

#### 登陆路由渲染

```javascript

main.js:
// 导入路由模块
import router from '@/router'
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
//------------------------------------------------------------------
app.vue:
<template>
  <!-- 占位符 -->
  <router-view></router-view>
</template>
//-------------------------------------------------------------------
router index.js:
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/MyLogin.vue'
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    // 登录的路由规则
    { path: '/login', component: Login }
  ]
})
export default router
```

#### Mylogin.vue

```javascript
<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="text-center avatar-box">
        <img src="../assets/logo.png" class="img-thumbnail avatar" alt="" />
      </div>

      <!-- 表单区域 -->
      <div class="form-login p-4">
        <!-- 登录名称 -->
        <div class="form-group form-inline">
          <label for="username">登录名称</label>
          <input
            type="text"
            class="form-control ml-2"
            id="username"
            placeholder="请输入登录名称"
            autocomplete="off"
            v-model.trim="username"
          />
        </div>
        <!-- 登录密码 -->
        <div class="form-group form-inline">
          <label for="password">登录密码</label>
          <input
            type="password"
            class="form-control ml-2"
            id="password"
            placeholder="请输入登录密码"
            v-model.trim="password"
          />
        </div>
        <!-- 登录和重置按钮 -->
        <div class="form-group form-inline d-flex justify-content-end">
          <button type="button" class="btn btn-secondary mr-2" @click="reset">重置</button>
          <button type="button" class="btn btn-primary" @click="login">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyLogin',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    reset() {
      this.username = ''
      this.password = ''
    },
    login() {
      if (this.username === 'admin' && this.password === '666666') {
        // 登录成功
        // 1. 存储 token
        localStorage.setItem('token', 'Bearer xxxx')
        // 2. 跳转到后台主页
        this.$router.push('/home')
      } else {
        // 登录失败
        localStorage.removeItem('token')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-color: #35495e;
  height: 100%;
  .login-box {
    width: 400px;
    height: 250px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
    .form-login {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
    }
  }
}

.form-control {
  flex: 1;
}

.avatar-box {
  position: absolute;
  width: 100%;
  top: -65px;
  left: 0;
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50% !important;
    box-shadow: 0 0 6px #efefef;
  }
}
</style>

```

#### MyHome.vue

```javascript
<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <MyHeader></MyHeader>

    <!-- 页面主体区域 -->
    <div class="home-main-box">
      <!-- 左侧边栏 -->
      <MyAside></MyAside>
      <!-- 右侧内容主体区域 -->
      <div class="home-main-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// 头部区域组件
import MyHeader from './subcomponents/MyHeader.vue'
// 左侧边栏组件
import MyAside from './subcomponents/MyAside.vue'

export default {
  name: 'MyHome',
  // 注册组件
  components: {
    MyHeader,
    MyAside
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .home-main-box {
    height: 100%;
    display: flex;
    .home-main-body {
      padding: 15px;
      flex: 1;
    }
  }
}
</style>

```

#### 退出登陆

```javascript
<template>
  <div class="layout-header-container d-flex justify-content-between align-items-center p-3">
    <!-- 左侧 logo 和 标题区域 -->
    <div class="layout-header-left d-flex align-items-center user-select-none">
      <!-- logo -->
      <img class="layout-header-left-img" src="../../assets/heima.png" alt="" />
      <!-- 标题 -->
      <h4 class="layout-header-left-title ml-3">黑马后台管理系统</h4>
    </div>

    <!-- 右侧按钮区域 -->
    <div class="layout-header-right">
      <button type="button" class="btn btn-light" @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  methods: {
    logout() {
      // 1. 清空 token
      localStorage.removeItem('token')
      // 2. 跳转到登录页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header-container {
  height: 60px;
  border-bottom: 1px solid #eaeaea;
}

.layout-header-left-img {
  height: 50px;
}
</style>

```

#### 控制访问权限

```javascript
router index.js
import pathArr from '@/router/pathArr.js'
// 全局前置守卫
router.beforeEach(function(to, from, next) {
  if (pathArr.indexOf(to.path) !== -1) {  // 路径在这个pathArr数组中
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})


pathArr.js
export default ['/home', '/home/users', '/home/rights']
```

#### 左侧嵌套路由

router index.js 中的子路由规则

```javascript
import Users from '@/components/menus/MyUsers.vue'
import Rights from '@/components/menus/MyRights.vue'
import Goods from '@/components/menus/MyGoods.vue'
import Orders from '@/components/menus/MyOrders.vue'
import Settings from '@/components/menus/MySettings.vue'
import UserDetail from '@/components/user/MyUserDetail.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      redirect: '/home/users',  // 路由重定向
      children: [
        { path: 'users', component: Users },
        { path: 'rights', component: Rights },
        { path: 'goods', component: Goods },
        { path: 'orders', component: Orders },
        { path: 'settings', component: Settings },
        // 用户详情页的路由规则
        { path: 'userinfo/:id', component: UserDetail, props: true }
      ]
    }
  ]
})

```

MyAside.vue 中的路由链接

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

MyHome.vue 中的路由占位符

```javascript
<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <MyHeader></MyHeader>

    <!-- 页面主体区域 -->
    <div class="home-main-box">
      <!-- 左侧边栏 -->
      <MyAside></MyAside>
      <!-- 右侧内容主体区域 -->
      <div class="home-main-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
```

#### 渲染用户管理组件

```javascript
<template>
  <div>
    <!-- 标题 -->
    <h4 class="text-center">用户管理</h4>

    <!-- 用户列表 -->
    <table class="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>头衔</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in userlist" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.position }}</td>
          <td>
            <a href="#" @click.prevent="gotoDetail(item.id)">详情</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyUser',
  data() {
    return {
      // 用户列表数据
      userlist: [
        { id: 1, name: '嬴政', age: 18, position: '始皇帝' },
        { id: 2, name: '李斯', age: 35, position: '丞相' },
        { id: 3, name: '吕不韦', age: 50, position: '商人' },
        { id: 4, name: '赵姬', age: 48, position: '王太后' }
      ]
    }
  },
  methods: {
    gotoDetail(id) {
      //   /home/userinfo/1
      //   /home/userinfo/2
      //   /home/userinfo/3
      this.$router.push('/home/userinfo/' + id)
    }
  }
}
</script>

<style lang="less" scoped></style>

```

#### 用户管理中的详情操作 

其中id用来传递具体那一项的用户

```JavaScript
<a href="#" @click.prevent="gotoDetail(item.id)">详情</a>
  
methods: {
  gotoDetail(id) {
    //   /home/userinfo/1
    //   /home/userinfo/2
    //   /home/userinfo/3
    this.$router.push('/home/userinfo/' + id)
  }
}
//-----------------------------------------------------------------------------------------

// 用户详情页的路由规则
{ path: 'userinfo/:id', component: UserDetail, props: true }
//-----------------------------------------------------------------------------------------
MyUserDetail.vue：
<template>
  <div>
    <button type="button" class="btn btn-light btn-sm" @click="$router.back()">后退</button>
    <h4 class="text-center">用户详情 --- {{ id }}</h4>    // {{ this.$route.params.id }}
  </div>
</template>

<script>
export default {
  name: 'MyUserDetail',
  props: ['id']
}
</script>

<style lang="less" scoped></style>

```





# 6 补充

## 6.1 main.js中内容

Vue.config.productionTip = false  发布模式

Vue.config.productionTip = Ture 开发模式，部署的时候要改为 false

## 6.2 ESLint

### 6.2.1 配置

![image-20220901095319856](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209010953477.png)

![image-20220901100119868](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011001048.png)

 Standard config

![image-20220901100245931](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011002756.png)

![image-20220901100542040](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011005775.png)

### 6.2.2 错误演示

![image-20220901101316377](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Vue/202209011013730.png)

### 6.2.3 规则

| 序号 | 规则名称                    | 规则约束/默认约束                            |
| ---- | --------------------------- | -------------------------------------------- |
| 1    | quotes                      | 默认：字符串需要使用单引号包裹               |
| 2    | key-spacing                 | 默认：对象的属性和值之间，需要有一个空格分割 |
| 3    | comma-dangle                | 默认：对象或数组的末尾，不允许出现多余的逗号 |
| 4    | no-multiple-empty-lines     | 不允许出现多个空行                           |
| 5    | no-trailing-spaces          | 不允许在行尾出现多余的空格                   |
| 6    | eol-last                    | 默认：文件的末尾必须保留一个空行             |
| 7    | spaced-comment              | 在注释中的 // 或 /* 后强制使用一致的间距     |
| 8    | indent                      | 强制一致的缩进                               |
| 9    | import/first                | `import`导入模块的语句必须声明在js文件的顶部 |
| 10   | space-before-function-paren | 方法的形参之前是否需要保留一个空格           |
| 11   | no-unused-vars              | 禁止出现未使用过的变量                       |

详见：https://eslint.bootcss.com/docs/rules/

### 6.2.4 配置VSCode 

安装ESLine插件

```bash
// ESLint 插件的配置
"editor.codeActionsOnSave": {
  "source.fixAll": true,
},
```

安装Prettier - Code formatter插件：

```bash
// 配置 prettier
"prettier.trailingComma": "none",
"prettier.semi": false,
// 每行文字个数超出次限制将会被迫换行
"prettier.printWidth": 300,
// 使用单引号替换双引号
"prettier.singleQuote": true,
"prettier.arrowParens": "avoid",
```

新建 .prettierrc 文件 放到C:\Users\jyh

文件内容如下：

```bash
{
    "semi": false,
    "singleQuote": true,
    "bracketSpacing": true
}
settings.json中的配置如下：
"prettier.configPath": "C:\\Users\\HP\\.prettierrc",
    // 安装Prettier配置
    "eslint.alwaysShowStatus": true,
    "prettier.trailingComma": "none",
    "prettier.semi": false,

    // 每行文字个数超出此限制将会被迫换行
    "prettier.printWidth": 300,
    // 使用单引号替换双引号
    "prettier.singleQuote": true,
    "prettier.arrowParens": "avoid",
    // 设置 .vue 文件中，HTML代码的格式化插件
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.ignoreProjectWarning": true,
    "vetur.format.defaultFormatterOptions": {
        "prettier": {
            "trailingComma": "none",
            "singleQuote": true,
            "semi": false,
            "arrowParens": "avoid",
            "printWidth": 300
        },
        "js-beautify-html": {
            "wrap_attributes": false
        },
    },
```

```bash
config 中加入
"prettier.configPath": "C:\\Users\\jyh\\.prettiercc",
```

```bash
eslintrc.js 中加入
'space-before-function-paren': ['warn', 'never'],
'vue/multi-word-component-names': 'off'
```

## 6.3 更方便发起axios请求

```javascript
main.js:
import axios from 'axios'
// 全局配置 axios 的请求根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3006'
// 把 axios 挂载到 Vue.prototype 上，供每个 .vue 组件的实例直接使用
Vue.prototype.$http = axios

// 今后，在每个 .vue 组件中要发起请求，直接调用 this.$http.xxx
// 但是，把 axios 挂载到 Vue 原型上，有一个缺点：不利于 API 接口的复用！！！
```

## 6.4 移动端项目 demo-toutiao

注意点： 

1. 项目安装的时候，路由模式选择 n  use history mode for router? N

2. check the features needed for your project. Babel, Router, Css Pre-processors, Linter

### 6.4.1 Vant 组件库

安装：

```bash
npm i vant -S
```

https://vant-contrib.gitee.io/vant/#/zh-CN

配置：

```javascript
// main.js
// 导入并安装 Vant 组件库
import Vant from 'vant'
// 切记：为了能够覆盖默认的 less 变量，这里一定要把后缀名改为 .less
import 'vant/lib/index.less'

Vue.use(Vant)
```

### 6.4.2 Tabbar组件制作导航栏

```javascript
App.vue:
<template>
  <div>
    <!-- 路由占位符 -->
    <router-view></router-view>

    <!-- Tabbar 区域 -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
```

```javascript
router index.js
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入需要的组件
import Home from '@/views/Home/Home.vue'
import User from '@/views/User/User.vue'

// 把 VueRouter 安装为 Vue 的插件
Vue.use(VueRouter)

// 路由规则的数组
const routes = [
  // 定义首页的路由规则
  { path: '/', component: Home },
  // 定义我的路由规则
  { path: '/user', component: User }
]

// 创建路由实例对象
const router = new VueRouter({
  routes
})

export default router

```

### 6.4.3 user界面内容

```javascript
<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <img src="../../assets/logo.png" alt="" class="avatar" />
        </template>
        <template #title>
          <span class="username">用户名</span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>0</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>0</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>0</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="edit" title="编辑资料" is-link />
      <van-cell icon="chat-o" title="小思同学" is-link />
      <van-cell icon="warning-o" title="退出登录" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'User'
}
</script>

<style lang="less" scoped>
.user-container {
  .user-card {
    background-color: #007bff;
    color: white;
    padding-top: 20px;
    .van-cell {
      background: #007bff;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
</style>

```

### 6.4.4 Home界面

```javascript
<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <van-nav-bar title="黑马头条" fixed />
    <!-- :fixed='true'-->>
  </div>
</template>
```

### 6.4.5 封装utils目录下的request模块

```javascript
import axios from 'axios'

// 调用 axios.create() 函数，创建一个 axios 的实例对象，用 request 来接收
const request = axios.create({
  // 指定请求的根路径
  baseURL: 'https://www.escook.cn'
})

export default request
```

### 6.4.6 在Home组件中封装initArticleList方法

```javascript
data() {
  return {
    // 页码值
    page: 1,
    // 每页显示多少条数据
    limit: 10,
  }
},
created() {
    this.initArticleList()
  },
methods: {
  // 封装获取文章列表数据的方法
  async initArticleList() {
     // 发起 GET 请求，获取文章的列表数据
    const { data: res } = await request.get('/articles',{
      // 请求参数
      params: {
        _page: this.page,
        _limit: this.limit
      }
    })
},
```

### 6.4.7 封装articleAPI模块

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

```javascript
// 按需导入 API 接口
import { getArticleListAPI } from '@/api/articleAPI.js'
methods: {
  // 封装获取文章列表数据的方法
  async initArticleList() {
    // 发起 GET 请求，获取文章的列表数据
    const { data: res } = await getArticleListAPI(this.page, this.limit)
  }
}
```

### 6.4.8 封装ArticleInfo.vue 

渲染页面每个文章组件效果  ArticleInfo.vue

```javascript
<template>
  <div>
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ title }}</span>
          <!-- 单张图片 -->
          <img :src="cover.images[0]" alt="" class="thumb" v-if="cover.type === 1" />
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="cover.type === 3">
          <img :src="item" alt="" class="thumb" v-for="(item, i) in cover.images" :key="i" />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span>作者 {{ author }} &nbsp;&nbsp; {{ cmtCount }} 评论 &nbsp;&nbsp; 发布日期 {{ time }}</span>
          <!-- 关闭按钮 -->
          <van-icon name="cross" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleInfo',
  // 自定义属性
  props: {
    // 文章的标题
    title: {
      type: String,
      default: ''
    },
    // 作者名字
    author: {
      type: String,
      default: ''
    },
    // 评论数
    cmtCount: {
      // 通过数组形式，为当前属性定义多个可能的类型
      type: [Number, String],
      default: 0
    },
    // 发布日期
    time: {
      type: String,
      default: ''
    },
    // 封面的信息对象
    cover: {
      type: Object,
      // 通过 default 函数，返回 cover 属性的默认值
      default: function() {
        // 这个 return 的对象就是 cover 属性的默认值
        return { type: 0 }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  // 矩形黄金比例：0.618
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>

```

Home.vue:

```javascript
<template>
  <div class="home-container">
    <!-- 在使用组件的时候，如果某个属性名是“小驼峰”形式，则绑定属性的时候，建议改写成“连字符”格式。例如： -->
    <!-- cmtCount 建议写成 cmt-count -->
    <ArticleInfo
      v-for="item in artlist"
      :key="item.id"
      :title="item.title"
      :author="item.aut_name"
      :cmt-count="item.comm_count"
      :time="item.pubdate"
      :cover="item.cover"
    ></ArticleInfo>
  </div>
</template>

// 导入需要的组件
import ArticleInfo from '@/components/Article/ArticleInfo.vue'

data() {
  return {
    // 文章的数组
    artlist: []
  }
}
```

### 6.4.9 上拉加载更多

https://vant-contrib.gitee.io/vant/#/zh-CN/list

```javascript
<template>
  <div class="home-container">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ArticleInfo
        v-for="item in artlist"
        :key="item.id"
        :title="item.title"
        :author="item.aut_name"
        :cmt-count="item.comm_count"
        :time="item.pubdate"
        :cover="item.cover"
      ></ArticleInfo>
    </van-list>
  </div>
</template>

data() {
  return {
    // 是否正在加载下一页数据，如果 loading 为 true，则不会反复触发 load 事件
    // 每当下一页数据请求回来之后，千万要记得，把 loading 从 true 改为 false
    loading: true,
    // 所有数据是否加载完毕了，如果没有更多数据了，一定要把 finished 改成 true
    finished: false,
  }
},
methods: {
  // 封装获取文章列表数据的方法
  async initArticleList() {
    // this.artlist = [旧数据在前, 新数据在后]
    this.artlist = [...this.artlist, ...res]
    this.loading = false
    
    if (res.length === 0) {
      // 证明没有下一页数据了，直接把 finished 改为 true，表示数据加载完了！
      this.finished = true
      }
    }
  },
  // 只要 onLoad 被调用，就应该请求下一页数据
  onLoad() {
    console.log('触发了 load 事件！')
    // 1. 让页码值 +1
    this.page++
    // 2. 重新请求接口获取数据
    this.initArticleList()
  },
}
```

### 6.4.10 下拉刷新

https://vant-contrib.gitee.io/vant/#/zh-CN/pull-refresh

```javascript
<template>
  <div class="home-container">
    <van-pull-refresh v-model="isLoading" :disabled="finished" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleInfo
          v-for="item in artlist"
          :key="item.id"
          :title="item.title"
          :author="item.aut_name"
          :cmt-count="item.comm_count"
          :time="item.pubdate"
          :cover="item.cover"
        ></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>


methods: {
  // 封装获取文章列表数据的方法
  async initArticleList(isRefresh) {
    // 发起 GET 请求，获取文章的列表数据
    const { data: res } = await getArticleListAPI(this.page, this.limit)
    
    if (isRefresh) {
      // 证明是下拉刷新；新数据在前，旧数据在后
      // this.artlist = [新数据在后, 旧数据在前]
      this.artlist = [...res, ...this.artlist]
      this.isLoading = false
    } else {
      // 证明是上拉加载更多；旧数据在前，新数据在后
      // this.artlist = [旧数据在前, 新数据在后]
      this.artlist = [...this.artlist, ...res]
      this.loading = false
    }
      
    if (res.length === 0) {
      // 证明没有下一页数据了，直接把 finished 改为 true，表示数据加载完了！
      this.finished = true
    }
  },
  onRefresh() {
    console.log('触发了下拉刷新！')
    // 1. 让页码值 +1
    this.page++
    // 2. 重新请求接口获取数据
    this.initArticleList(true)
  } 
}

```

### 6.4.11 主题定制

https://vant-contrib.gitee.io/vant/#/zh-CN/config-provider

```javascript
main.js
// 导入并安装 Vant 组件库
import Vant from 'vant'
// 切记：为了能够覆盖默认的 less 变量，这里一定要把后缀名改为 .less
import 'vant/lib/index.less'
```

项目根目录，vue.config.js:

```javascript
// 这个文件是 vue-cli 创建出来的项目的配置文件
// 在 vue.config.js 这个配置文件中，可以对整个项目的打包、构建进行全局性的配置

// webpack 在进行打包的时候，底层用到了 node.js
// 因此,在 vue.config.js 配置文件中，可以导入并使用 node.js 中的核心模块
const path = require('path')
const themePath = path.join(__dirname, './src/theme.less')

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量
          // 'nav-bar-background-color': 'orange'
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          //  ../    ./    theme.less
          // 从盘符开始的路径，叫做绝对路径   C:\\Users\liulongbin\\theme.less
          hack: `true; @import "${themePath}";`
        }
      }
    }
  }
}

```

theme.less:

```less
// 在 theme.less 文件中，覆盖 Vant 官方的 less 变量值
@blue: #007bff;

// 覆盖 Navbar 的 less 样式
@nav-bar-background-color: @blue;
@nav-bar-title-text-color: #fff;
```

### 6.4.12 自动记忆滚动位置

router index.js

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home/Home.vue'
import User from '@/views/User/User.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home, meta: { isRecord: true, top: 0 } },
    { path: '/user', component: User }
  ],
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: to.meta.top || 0 }
    }
  }
})

export default router

```

app.vue

```javascript
<template>
  <div>
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>

    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped></style>

```

Home.vue:

```javascript
// 鲁大师 提供了许多牛逼的函数 节流的函数、防抖的函数、操作数组的一系列函数、操作对象的一系列函数（对象的深拷贝、浅拷贝）
import _ from 'lodash'

activated() {
  fn = this.recordTopHandler()
  window.addEventListener('scroll', fn)
},
deactivated() {
  window.removeEventListener('scroll', fn)
},
methods: {
  recordTopHandler() {
    return _.debounce(
      () => {
        this.$route.meta.top = window.scrollY
      },
      50,
      { trailing: true }
    )
  }
}
```



## 6.5 其他项目文档

http://doc.toutiao.liulongbin.top/















































