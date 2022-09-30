

# 1 小程序

## 1.1 小程序简介

### 1.1.1 小程序与普通网页开发的区别

- 运行环境不同: 网页运行在浏览器环境中, 小程序运行在微信环境中

- API 不同: 由于运行环境的不同，所以小程序中，无法调用 DOM 和 BOM 的 API。

​                       小程序中可以调用微信环境提供的各种 API，例如：地理定位、扫码、支付、开发模式不同:

- 开发模式不同：网页的开发模式：浏览器 + 代码编辑器

  ​                         小程序有自己的一套标准开发模式：申请小程序开发账号、安装小程序开发者工具、创建和配置小程序项目

![image-20220905100154654](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051001345.png)

## 1.2 第一个小程序

微信开发者工具是官方推荐使用的小程序开发工具，它提供的主要功能如下：

①快速创建小程序项目

②代码的查看和编辑

③对小程序功能进行调试

④小程序的预览和发布

推荐下载和安装最新的稳定版（Stable Build）的微信开发者工具，下载页面的链接如下：

https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html

## 1.3 小程序代码的构成

![image-20220905101318957](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051013662.png)

① pages 用来存放所有小程序的页面

② utils 用来存放工具性质的模块（例如：格式化时间的自定义模块）

③ app.js 小程序项目的入口文件

④ app.json 小程序项目的全局配置文件

⑤ app.wxss 小程序项目的全局样式文件

⑥ project.config.json 项目的配置文件

⑦ sitemap.json 用来配置小程序及其页面是否允许被微信索引



小程序官方建议把所有小程序的页面，都存放在 pages 目录中，以单独的文件夹存在，如图所示：

![image-20220905101457613](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051015334.png)

其中，每个页面由 4 个基本文件组成，它们分别是：

① .js 文件（页面的脚本文件，存放页面的数据、事件处理函数等）

② .json 文件（当前页面的配置文件，配置窗口的外观、表现等）

③ .wxml 文件（页面的模板结构文件）

④ .wxss 文件（当前页面的样式表文件）

### 1.3.1 JSON 配置文件的作用

JSON 是一种数据格式，在实际开发中，JSON 总是以**配置文件**的形式出现。小程序项目中也不例外：通过不同的 .json 配置文件，可以对小程序项目进行不同级别的配置。



小程序项目中有 4 种 json 配置文件，分别是：

①项目根目录中的 app.json 配置文件

②项目根目录中的 project.config.json 配置文件

③项目根目录中的 sitemap.json 配置文件

④每个页面文件夹中的 .json 配置文件

#### 1 app.json 文件

app.json 是当前小程序的**全局配置**，包括了小程序的所有页面路径、窗口外观、界面表现、底部 tab 等。Demo 项目里边的 app.json 配置内容如下：

```json
{
  "pages":[
    "pages/index/index",
    "pages/logs/logs"
  ],
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "Weixin",
    "navigationBarTextStyle":"black"
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json"
}
```

简单了解下这 4 个配置项的作用：

①pages：用来记录当前小程序所有页面的路径

②window：全局定义小程序所有页面的背景色、文字颜色等

③style：全局定义小程序组件所使用的样式版本

④sitemapLocation：用来指明 sitemap.json 的位置

#### 2 project.config.json 文件

project.config.json 是项目配置文件，用来记录我们对小程序开发工具所做的个性化配置，例如：

- setting 中保存了编译相关的配置

- projectname 中保存的是项目名称

- appid 中保存的是小程序的账号 ID

#### 3 sitemap.json 文件

微信现已开放小程序内搜索，效果类似于 PC 网页的 SEO。sitemap.json 文件用来配置小程序页面是否允许微信索引。

当开发者允许微信索引时，微信会通过爬虫的形式，为小程序的页面内容建立索引。当用户的搜索关键字和页面的索引匹配成功的时候，小程序的页面将可能展示在搜索结果中。

```javascript
{
  "desc": "关于本文件的更多信息，请参考文档 https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html",
  "rules": [{
  "action": "allow",
  "page": "*"
  }]
}
```

注意：sitemap 的索引提示是默认开启的，如需要关闭 sitemap 的索引提示，可在小程序项目配置文件 project.config.json 的 setting 中配置字段 checkSiteMap 为 false

#### 4 页面的.json 配置文件

小程序中的每一个页面，可以使用 .json 文件来对本页面的窗口外观进行配置，**页面中的配置项会覆盖** **app.json** **的** **window** **中相同的配置项**。

#### 5 新建小程序页面

![image-20220905103241948](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051032410.png)

#### 6 修改项目首页

只需要调整 app.json -> pages 数组中页面路径的前后顺序，即可修改项目的首页。小程序会把排在第一位的页面，当作项目首页进行渲染。

### 1.3.2 WXML

#### 1 定义

WXML（WeiXin Markup Language）是小程序框架设计的一套标签语言，用来构建小程序页面的结构，其作用类似于网页开发中的 HTML。

#### 2 区别

①标签名称不同

- HTML （div, span, img, a）

- WXML（view, text, image, navigator）

②属性节点不同

- \<a href="#">超链接\</a>

- <navigator url="/pages/home/home"></navigator>

③提供了类似于 Vue 中的模板语法

- 数据绑定

- 列表渲染

- 条件渲染

### 1.3.3 WXSS

#### 1 定义

WXSS (WeiXin Style Sheets)是一套样式语言，用于描述 WXML 的组件样式，类似于网页开发中的 CSS。

#### 2 区别

①新增了 rpx 尺寸单位

- CSS 中需要手动进行像素单位换算，例如 rem

- WXSS 在底层支持新的尺寸单位 rpx，在不同大小的屏幕上小程序会自动进行换算

②提供了全局的样式和局部样式

- 项目根目录中的 app.wxss 会作用于所有小程序页面

- 局部页面的 .wxss 样式仅对当前页面生效

③WXSS 仅支持部分 CSS 选择器

- .class 和 #id

- element

- 并集选择器、后代选择器

- ::after 和 ::before 等伪类选择器

### 1.3.4 JS逻辑交互

一个项目仅仅提供界面展示是不够的，在小程序中，我们通过 .js 文件来处理用户的操作。例如：响应用户的点击、获取用户的位置等等。

#### 1 分类

小程序中的 JS 文件分为三大类，分别是：

①app.js

- 是整个小程序项目的入口文件，通过调用 App() 函数来启动整个小程序

②页面的 .js 文件

- 是页面的入口文件，通过调用 Page() 函数来创建并运行页面

③普通的 .js 文件

- 是普通的功能模块文件，用来封装公共的函数或属性供页面使用

## 1.4 小程序的宿主环境

### 1.4.1 定义

宿主环境（host environment）指的是程序运行所**必须的依赖环境**。例如：

Android 系统和 iOS 系统是两个不同的宿主环境。安卓版的微信 App 是不能在 iOS 环境下运行的，所以，Android 是安卓软件的宿主环境，脱离了宿主环境的软件是没有任何意义的！

### 1.4.2 小程序的宿主环境

**手机微信**是小程序的宿主环境，如图所示：

![image-20220905103740900](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051037821.png)

小程序借助宿主环境提供的能力，可以完成许多普通网页无法完成的功能，例如：微信扫码、微信支付、微信登录、地理定位、etc…

### 1.4.3 内容

①通信模型

②运行机制

③组件

④API

### 1.4.4 通信模型

#### 1 通信主体

小程序中通信的主体是渲染层和逻辑层，其中：

①WXML 模板和 WXSS 样式工作在渲染层

②JS 脚本工作在逻辑层

![image-20220905104022555](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051040622.png)

#### 2 通信模型

小程序中的通信模型分为两部分：

① 渲染层和逻辑层之间的通信：由微信客户端进行转发

② 逻辑层和第三方服务器之间的通信：由微信客户端进行转发

![image-20220905104104091](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051041466.png)

### 1.4.5 运行机制

#### 1 启动过程

①把小程序的代码包下载到本地

②解析 app.json 全局配置文件

③执行 app.js 小程序入口文件，调用 App() 创建小程序实例

④渲染小程序首页

⑤小程序启动完成

#### 2 页面渲染过程

①加载解析页面的 .json 配置文件

②加载页面的 .wxml 模板和 .wxss 样式

③执行页面的 .js 文件，调用 Page() 创建页面实例

④页面渲染完成

### 1.4.6 组件

#### 1 分类

小程序中的组件也是由宿主环境提供的，开发者可以基于组件快速搭建出漂亮的页面结构。官方把小程序的组件分为了 9 大类，分别是：

①视图容器

②基础内容

③表单组件

④导航组件

⑤媒体组件

⑥map 地图组件

⑦canvas 画布组件

⑧开放能力

⑨无障碍访问

#### 2 常用的视图容器类组件

①view

- 普通视图区域

- 类似于 HTML 中的 div，是一个块级元素

- 常用来实现页面的布局效果

②scroll-view

- 可滚动的视图区域

- 常用来实现滚动列表效果

③swiper 和 swiper-item

- 轮播图容器组件 和 轮播图 item 组件

#### 3 view组件的使用

实现如图的 flex 横向布局效果：

![image-20220905104342803](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051043481.png)

#### 4 scroll-view 组件的使用

实现如图的纵向滚动效果：

![image-20220905104423982](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051044227.png)

#### 5 swiper 和 swiper-item 组件的使用

实现如图的轮播图效果：

```javascript
<!-- 轮播图的结构 -->
<swiper class="swiper-container" indicator-dots indicator-color="white" indicator-active-color="gray" autoplay interval="3000" circular>
	<swiper-item>
    <view class="item">A</view>
  </swiper-item>
	<swiper-item>
    <view class="item">B</view>
  </swiper-item>
	<swiper-item>
    <view class="item">C</view>
  </swiper-item>
</swiper> 

/* 轮播图的样式 */
.swiper-container {
  height: 150px;
}

.item {
  height: 100%;
  line-height: 150px;
  text-align: center;
}

swiper-item:nth-child(1) .item {
  background-color: lightgreen;
}
swiper-item:nth-child(2) .item {
  background-color: lightskyblue;
}
swiper-item:nth-child(3) .item {
  background-color: lightpink;
} 
```

![image-20220905154529872](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051545466.png)

#### 6 swiper组件的常用属性

| **属性**               | **类型** | **默认值**         | **说明**             |
| ---------------------- | -------- | ------------------ | -------------------- |
| indicator-dots         | boolean  | false              | 是否显示面板指示点   |
| indicator-color        | color    | rgba(0,  0, 0, .3) | 指示点颜色           |
| indicator-active-color | color    | #000000            | 当前选中的指示点颜色 |
| autoplay               | boolean  | false              | 是否自动切换         |
| interval               | number   | 5000               | 自动切换时间间隔     |
| circular               | boolean  | false              | 是否采用衔接滑动     |

#### 7 常用的基础内容组件

①text

- 文本组件

- 类似于 HTML 中的 span 标签，是一个行内元素

②rich-text

- 富文本组件

- 支持把 HTML 字符串渲染为 WXML 结构

#### 8 text 组件的基本使用

通过 text 组件的 selectable 属性，实现长按选中文本内容的效果：

![image-20220905154911164](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051549348.png)

#### 9 rich-text 组件的基本使用

通过 rich-text 组件的 nodes 属性节点，把 HTML 字符串渲染为对应的 UI 结构：

![image-20220905154946691](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051549882.png)

#### 10 常用的其他组件

①button

- 按钮组件
- 功能比 HTML 中的 button 按钮丰富
- 通过 open-type 属性可以调用微信提供的各种功能（客服、转发、获取用户授权、获取用户信息等）

②image

- 图片组件

- image 组件默认宽度约 300px、高度约 240px

③navigator（后面课程会专门讲解）

- 页面导航组件
- 类似于 HTML 中的 a 链接

#### 11 button 组件的使用

```javascript
<!-- 按钮组件的基本使用 -->
<!-- 通过 type 属性指定按钮颜色类型 -->
<button>普通按钮</button>
<button type="primary">主色调按钮</button>
<button type="warn">警告按钮</button> 
<!-- size="mini" 小尺寸按钮 -->
<button size="mini">普通按钮</button>
<button type="primary" size="mini">主色调按钮</button>
<button type="warn" size="mini">警告按钮</button> 
<!-- plain 镂空按钮 -->
<button size="mini" plain>普通按钮</button>
<button type="primary" size="mini" plain>主色调按钮</button>
<button type="warn" size="mini" plain>警告按钮</button> 
```

![image-20220905155621856](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051556918.png)

#### 12 image 组件的使用

 ![image-20220905155631149](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051556190.png)

image 组件的 mode 属性用来指定图片的裁剪和缩放模式，常用的 mode 属性值如下：

| **mode** **值** | **说明**                                                     |
| --------------- | ------------------------------------------------------------ |
| scaleToFill     | （默认值）缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素 |
| aspectFit       | 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。 |
| aspectFill      | 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。 |
| widthFix        | 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变         |
| heightFix       | 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变         |

### 1.4.7 API

#### 1 定义

小程序中的 API 是由宿主环境提供的，通过这些丰富的小程序 API，开发者可以方便的调用微信提供的能力，例如：获取用户信息、本地存储、支付功能等。

#### 2 分类

小程序官方把 API 分为了如下 3 大类：

①事件监听 API

- 特点：以 on 开头，用来监听某些事件的触发

- 举例：wx.onWindowResize(function callback) 监听窗口尺寸变化的事件

②同步 API

- 特点1：以 Sync 结尾的 API 都是同步 API

- 特点2：同步 API 的执行结果，可以通过函数返回值直接获取，如果执行出错会抛出异常

- 举例：wx.setStorageSync('key', 'value') 向本地存储中写入内容

③异步 API

- 特点：类似于 jQuery 中的 $.ajax(options) 函数，需要通过 success、fail、complete 接收调用的结果

- 举例：wx.request() 发起网络数据请求，通过 success 回调函数接收数据

## 1.5 协同工作和发布 

### 1.5.1 权限管理

在中大型的公司里，人员的分工非常仔细：同一个小程序项目，一般会有不同岗位、不同角色的员工同时参与设计与开发。



此时出于管理需要，我们**迫切需要对**不同岗位、不同角色的**员工的权限进行边界的划分**，使他们能够高效的进行协同工作。

### 1.5.2 了解项目成员的组织结构

![image-20220905155902465](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051559535.png)

### 1.5.3 小程序的开发流程

![image-20220905155920097](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051559337.png)

### 1.5.4 成员管理的两个方面

小程序成员管理体现在管理员对小程序项目成员及体验成员的管理：

①项目成员：

- 表示参与小程序开发、运营的成员

- 可登录小程序管理后台

- 管理员可以添加、删除项目成员，并设置项目成员的角色

②体验成员：

- 表示参与小程序内测体验的成员

- 可使用体验版小程序，但不属于项目成员

- 管理员及项目成员均可添加、删除体验成员

![image-20220905160012402](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051600153.png)

| **权限**       | **运营者** | **开发者** | **数据分析者** |
| -------------- | ---------- | ---------- | -------------- |
| 开发者权限     |            | **√**      |                |
| 体验者权限     | √          | **√**      | √              |
| 登录           | √          | **√**      | √              |
| 数据分析       |            |            | √              |
| 微信支付       | √          |            |                |
| 推广           | √          |            |                |
| 开发管理       | √          |            |                |
| 开发设置       |            | **√**      |                |
| 暂停服务       | √          |            |                |
| 解除关联公众号 | √          |            |                |
| 腾讯云管理     |            | **√**      |                |
| 小程序插件     | √          |            |                |
| 游戏运营管理   | √          |            |                |

### 1.5.5 开发者权限

① 开发者权限：可使用小程序开发者工具及对小程序的功能进行代码开发

② 体验者权限：可使用体验版小程序

③ 登录权限：可登录小程序管理后台，无需管理员确认

④ 开发设置：设置小程序服务器域名、消息推送及扫描普通链接二维码打开小程序

⑤ 腾讯云管理：云开发相关设置





### 1.5.6 小程序版本

在软件开发过程中，根据时间节点的不同，会产出不同的软件版本，例如：

①开发者编写代码的同时，对项目代码进行自测（开发版本）

②直到程序达到一个稳定可体验的状态时，开发者把体验版本给到产品经理和测试人员进行体验测试

③最后修复完程序的 Bug 后，发布正式版供外部用户使用

| **版本阶段** | **说明**                                                     |
| ------------ | ------------------------------------------------------------ |
| 开发版本     | 使用开发者工具，可将代码上传到开发版本中。  开发版本只保留每人最新的一份上传的代码。     点击提交审核，可将代码提交审核。开发版本可删除，不影响线上版本和审核中版本的代码。 |
| 体验版本     | 可以选择某个开发版本作为体验版，并且选取一份体验版。         |
| 审核中的版本 | 只能有一份代码处于审核中。有审核结果后可以发布到线上，也可直接重新提交审核，覆盖原审核版本。 |
| 线上版本     | 线上所有用户使用的代码版本，该版本代码在新版本代码发布后被覆盖更新。 |

一个小程序的发布上线，一般要经过上传代码 -> 提交审核 -> 发布这三个步骤。

#### 1 上传代码

![image-20220905160409651](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051604657.png)

#### 2 在后台查看上传之后的版本

![image-20220905160446577](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051604163.png)

#### 3 提交审核

- 为什么需要提交审核：为了保证小程序的质量，以及符合相关的规范，小程序的发布是需要经过腾讯官方审核的。

- 提交审核的方式：在开发版本的列表中，点击“提交审核”按钮之后，按照页面提示填写相关的信息，就能把小程序提交到腾讯官方进行审核。

![image-20220905160522439](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051605388.png)

#### 4 发布

审核通过之后，管理员的微信中会收到小程序通过审核的通知，此时在审核版本的列表中，点击“发布”按钮之后，即可把“审核通过”的版本发布为“线上版本”，供所有小程序用户访问和使用。

![image-20220905160544963](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051605942.png)

#### 5 基于小程序码进行推广

相对于普通二维码来说，小程序码的优势如下：

①在样式上更具辨识度和视觉冲击力

②能够更加清晰地树立小程序的品牌形象

③可以帮助开发者更好地推广小程序



获取小程序码的 5 个步骤：

登录小程序管理后台 -> 设置 -> 基本设置 -> 基本信息 -> 小程序码及线下物料下载

#### 6 运营数据

①在“小程序后台”查看

1.登录小程序管理后台

2.点击侧边栏的“统计”

3.点击相应的 tab 可以看到相关的数据

②使用“小程序数据助手”查看

1.打开微信

2.搜索“小程序数据助手”

3.查看已发布的小程序相关的数据

# 2 模板与配置

## 2.1 WXML 模板语法

### 2.1.1 数据绑定

#### 1 基本原则

①在 data 中定义数据

②在 WXML 中使用数据

#### 2 在 data 中定义页面的数据

在页面对应的 .js 文件中，把数据定义到 data 对象中即可：

```JavaScript
Page({
  // 页面的初始数据  
  data: {
  // 字符串类型的数据
  info: 'init data',
  // 数组类型的数据
  msgList: [{msg: 'hello'},{msg: 'world'}]
  },
})
```

#### 3 Mustache 语法的格式

把data中的数据绑定到页面中渲染，使用 **Mustache** **语法**（双大括号）将变量包起来即可。语法格式为：

```JavaScript
<view>{{要绑定的数据名称}}</view>
```

Mustache 语法的主要应用场景如下：

- 绑定内容

- 绑定属性

- 运算（三元运算、算术运算等）

#### 4 动态绑定

```javascript
// 页面数据
Page({
  // 页面的初始数据  
  data: {
  // 字符串类型的数据
  info: 'init data'
  }
})
// 页面结构
<view>{{ info }}</view>
```

#### 5 动态绑定属性

```javascript
// 页面数据
Page({
  // 页面的初始数据  
  data: {
  imgSrc: 'http://www.itheima.com/images/logo.png'
  }
})
// 页面结构
<image src="{{imgSrc}}" mode="widthFix"></image>
```

#### 6 三元运算与算术运算

```JavaScript
// 页面数据
Page({
  // 页面的初始数据  
  data: {
  randomNum1: Math.random() * 10,
  randomNum2: Math.random().toFixed(2),
  }
})
// 页面结构
<view>{{randomNum1 >=5 ? '数字大于或等于5' : '数字小于5'}}</view>
<view>{{randomNum2 * 100}}</view> -->
```

### 2.1.2 事件绑定

事件是渲染层到逻辑层的通讯方式。通过事件可以将用户在渲染层产生的行为，反馈到逻辑层进行业务的处理。

![image-20220905162046312](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051620914.png)

| **类型** | **绑定方式**              | **事件描述**                                    |
| -------- | ------------------------- | ----------------------------------------------- |
| tap      | bindtap 或 bind:tap       | 手指触摸后马上离开，类似于 HTML 中的 click 事件 |
| input    | bindinput 或 bind:input   | 文本框的输入事件                                |
| change   | bindchange 或 bind:change | 状态改变时触发                                  |

#### 1 事件对象属性列表

当事件回调触发的时候，会收到一个事件对象 event，它的详细属性如下表所示：

| **属性**       | **类型** | **说明**                                     |
| -------------- | -------- | -------------------------------------------- |
| type           | String   | 事件类型                                     |
| timeStamp      | Integer  | 页面打开到触发事件所经过的毫秒数             |
| target         | Object   | 触发事件的组件的一些属性值集合               |
| currentTarget  | Object   | 当前组件的一些属性值集合                     |
| detail         | Object   | 额外的信息                                   |
| touches        | Array    | 触摸事件，当前停留在屏幕中的触摸点信息的数组 |
| changedTouches | Array    | 触摸事件，当前变化的触摸点信息的数组         |

#### 2 target和currentTarget的区别

target 是触发该事件的源头组件，而 currentTarget 则是当前事件所绑定的组件。举例如下：

![image-20220905162330011](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051623421.png)

点击内部的按钮时，点击事件以冒泡的方式向外扩散，也会触发外层 view 的 tap 事件处理函数。

此时，对于外层的 view 来说：

- e.target 指向的是触发事件的源头组件，因此，e.target 是内部的按钮组件

- e.currentTarget 指向的是当前正在触发事件的那个组件，因此，e.currentTarget 是当前的 view 组件

#### 3 bindtap 语法格式

在小程序中，不存在 HTML 中的 onclick 鼠标点击事件，而是通过 tap 事件来响应用户的触摸行为。

①通过 bindtap，可以为组件绑定 tap 触摸事件，语法如下：

```javascript
<button type="primary" bindtap="btnTapHandler">按钮</button>
```

②在页面的 .js 文件中定义对应的事件处理函数，事件参数通过形参 event（一般简写成 e） 来接收：

```javascript
Page({
  // 定义按钮的事件处理函数
  btnTapHandler(e) {
    console.log(e)
  },
})
```

#### 4 在事件处理函数中为data中的数据赋值

通过调用 this.setData(dataObject) 方法，可以给页面 data 中的数据重新赋值，示例如下：

```JavaScript
 // 页面结构
 <button type="primary" bindtap="CountChange">+1</button>

 // 页面数据
 data: {
    count: 0,
  },
Page({
  // +1 按钮的点击事件处理函数
  CountChange() {
    this.setData({
      count: this.data.count + 1
    })
  },
})
```

#### 5 事件传参

- 小程序中的事件传参比较特殊，不能在绑定事件的同时为事件处理函数传递参数。例如，下面的代码将不能正常工作：

```JavaScript
<button type="primary" bindtap="btnTapHandler(123)">事件传参</button>
```

因为小程序会把 bindtap 的属性值，统一当作事件名称来处理，相当于要调用一个名称为 btnHandler(123) 的事件处理函数。



- 可以为组件提供 data-* 自定义属性传参，其中 * 代表的是参数的名字，示例代码如下：

```javascript
<button type="primary" bindtap="btnTapHandler" data-info="{{2}}">事件传参</button>
```

最终：

- info 会被解析为参数的名字

- 数值 2 会被解析为参数的值



- 在事件处理函数中，通过 event.target.dataset.参数名 即可获取到具体参数的值，示例代码如下：

```JavaScript
btnHandler(event){
  // dataset 是一个对象，包含了所有通过 data-* 传递过来的参数项
  console.log(event.target.dataset)
  // 通过 dataset 可以访问到具体参数的值
  console.log(event.target.dataset.info)
}
```



实例代码如下：

```javascript
 // 页面结构
 <button type="primary" bindtap="btnTap2" data-info="{{2}}">+2</button>

 // 页面数据
 data: {
    count: 0,
  },
Page({
  btnTap2(e) {
    this.setData({
      count: this.data.count + e.target.dataset.info
    })
  },
})
```

#### 6 bindinput 的语法格式

在小程序中，通过 input 事件来响应文本框的输入事件，语法格式如下：

①通过 bindinput，可以为文本框绑定输入事件：

```javascript
<input bindinput="inputHandler"></input>
```

②在页面的 .js 文件中定义事件处理函数：

```JavaScript
inputHandler(e){
  // e.detail.value 是变化过后，文本框最新的值
  console.log(e.detail.value)
}
```

#### 7 实现文本框和data之间的数据同步

实现步骤：

①定义数据

```JavaScript
Page({
  data: {
    msg: '你好，'
  }
})
```

②渲染结构

```javascript
<input value="{{msg}}" bindinput="iptHandler"></input>
```

③美化样式

```javascript
input {
  border: 1px solid #eee;
  padding: 5px;
  margin: 5px;
  border-radius: 3px;
}
```

④绑定 input 事件处理函数

```JavaScript
// 文本框内容改变的事件
iptHandler(e) {
  this.setData({
    // 通过e.detail.value获取到文本框最新的值
    msg: e.detail.value
  })
}
```

### 2.1.3 条件渲染

#### 1 wx:if

在小程序中，使用 wx:if="{{condition}}" 来判断是否需要渲染该代码块：

```javascript
<view wx:if="{{type === 1}}">男</view>
```

也可以用 wx:elif 和 wx:else 来添加 else 判断：

```javascript
<view wx:elif="{{type === 2}}">女</view>
<view wx:else>保密</view> 
```

#### 2 结合 <block> 使用wx:if

如果要一次性控制多个组件的展示与隐藏，可以使用一个 <block></block> 标签将多个组件包装起来，并在<block> 标签上使用 wx:if 控制属性，示例如下：

```javascript
<block wx:if="{{false}}">
	<view>view1</view>
	<view>view2</view>
</block> 
```

注意： <block> 并不是一个组件，它只是一个包裹性质的容器，不会在页面中做任何渲染。

#### 3 hidden 

在小程序中，直接使用 hidden="{{ condition }}" 也能控制元素的显示与隐藏：

```javascript
<view hidden="{{!flag}}">条件为 true 的时候隐藏元素，否则显示</view>
<view wx:if="{{flag}}">这是使用 wx:if 控制的元素</view> 
```

#### 4 wx:if 与 hidden 区别

①运行方式不同

- wx:if 以动态创建和移除元素的方式，控制元素的展示与隐藏

- hidden 以切换样式的方式（display: none/block;），控制元素的显示与隐藏

②使用建议

- 频繁切换时，建议使用 hidden

- 控制条件复杂时，建议使用 wx:if 搭配 wx:elif、wx:else 进行展示与隐藏的切换

### 2.1.4 列表渲染

#### 1 wx:for

通过 wx:for 可以根据指定的数组，循环渲染重复的组件结构，语法示例如下：

```javascript
<view wx:for="{{arr1}}" wx:key="index">
	索引是：{{index}}，item 项是：{{item}}
</view>
```

默认情况下，当前循环项的索引用 index 表示；当前循环项用 item 表示。

#### 2 手动指定索引和当前项的变量名*

- 使用 wx:for-index 可以指定当前循环项的索引的变量名

- 使用 wx:for-item 可以指定当前项的变量名

示例代码如下：

```javascript
<view wx:for="{{arr1}}" wx:for-index="idx" wx:for-item="itemName" wx:key="idx">
	索引是：{{idx}}，item 项是：{{itemName}}
</view>
```

#### 3 wx:key 的使用

类似于 Vue 列表渲染中的 **:key**，小程序在实现列表渲染时，也建议为渲染出来的列表项指定唯一的 key 值，从而提高渲染的效率，示例代码如下：

```javascript
<view wx:for="{{userList}}" wx:key="id" class="username">{{item.name}}</view>

data: {
  userList: [
    { id: 1, name: '小红' },
    { id: 2, name: '小黄' },
    { id: 3, name: '小白' }
  ]
},
```

## 2.2 WXSS 模板样式

### 2.2.1 定义

WXSS (WeiXin Style Sheets)是一套样式语言，用于美化 WXML 的组件样式，类似于网页开发中的 CSS。

### 2.2.2 关系

WXSS 具有 CSS 大部分特性，同时，WXSS 还对 CSS 进行了扩充以及修改，以适应微信小程序的开发。

与 CSS 相比，WXSS 扩展的特性有：

- rpx 尺寸单位

- @import 样式导入

![image-20220905170927022](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051709488.png)

### 2.2.3 rpx 尺寸

#### 1 定义

rpx（responsive pixel）是微信小程序独有的，用来解决屏适配的尺寸单位。

#### 2 实现原理

rpx 的实现原理非常简单：鉴于不同设备屏幕的大小不同，为了实现屏幕的自动适配，rpx 把所有设备的屏幕，在宽度上等分为 750 份（即：当前屏幕的总宽度为 750rpx）。

- 在较小的设备上，1rpx 所代表的宽度较小

- 在较大的设备上，1rpx 所代表的宽度较大



小程序在不同设备上运行的时候，会自动把 rpx 的样式单位换算成对应的像素单位来渲染，从而实现屏幕适配。

#### 3 rpx与px 之间的单位换算

在 iPhone6 上，屏幕宽度为375px，共有 750 个物理像素，等分为 750rpx。则：

750rpx = 375px = 750 物理像素

  1rpx = 0.5px = 1物理像素

| **设备**      | rpx换算px (屏幕宽度/750) | px换算rpx (750/屏幕宽度) |
| ------------- | ------------------------ | ------------------------ |
| iPhone5       | 1rpx = 0.42px            | 1px  = 2.34rpx           |
| iPhone6       | **1rpx** **=** **0.5px** | 1px = 2rpx               |
| iPhone6  Plus | 1rpx = 0.552px           | 1px  = 1.81rpx           |

官方建议：开发微信小程序时，设计师可以用 iPhone6 作为视觉稿的标准。

开发举例：在 iPhone6 上如果要绘制宽100px，高20px的盒子，换算成rpx单位，宽高分别为 200rpx 和 40rpx。

### 2.2.4 样式导入

#### 1 定义

使用 WXSS 提供的 @import 语法，可以导入外联的样式表。

#### 2 @import 的语法格式

@import 后跟需要导入的外联样式表的相对路径，用 ; 表示语句结束。示例如下：

```javascript
/**index.wxss**/
@import "/common/common.wxss";
```

#### 3 全局样式和局部样式

定义在 app.wxss 中的样式为全局样式，作用于每一个页面。

在页面的 .wxss 文件中定义的样式为局部样式，只作用于当前页面。



注意：

①当局部样式和全局样式冲突时，根据就近原则，局部样式会覆盖全局样式

②当局部样式的权重大于或等于全局样式的权重时，才会覆盖全局的样式

## 2.3 全局配置

### 2.3.1 全局配置文件及常用的配置项

小程序根目录下的 app.json 文件是小程序的全局配置文件。常用的配置项如下：

① pages

- 记录当前小程序所有页面的存放路径

② window

- 全局设置小程序窗口的外观

③ tabBar

- 设置小程序底部的 tabBar 效果

④ style

- 是否启用新版的组件样式

### 2.3.2 window

#### 1 小程序窗口的组成部分

![image-20220905172315894](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051723062.png)

#### 2 window常用节点

| **属性名**                   | **类型** | **默认值** | **说明**                                       |
| ---------------------------- | -------- | ---------- | ---------------------------------------------- |
| navigationBarTitleText       | String   | 字符串     | 导航栏标题文字内容                             |
| navigationBarBackgroundColor | HexColor | #000000    | 导航栏背景颜色，如 #000000                     |
| navigationBarTextStyle       | String   | white      | 导航栏标题颜色，仅支持 black / white           |
| backgroundColor              | HexColor | #ffffff    | 窗口的背景色  （下拉刷新时背景色）             |
| backgroundTextStyle          | String   | dark       | 下拉 loading 的样式，仅支持 dark / light       |
| enablePullDownRefresh        | Boolean  | false      | 是否全局开启下拉刷新                           |
| onReachBottomDistance        | Number   | 50         | 页面上拉触底事件触发时距页面底部距离，单位为px |

#### 3 全局开启下拉刷新功能

概念：下拉刷新是移动端的专有名词，指的是通过手指在屏幕上的下拉滑动操作，从而重新加载页面数据的行为。

设置步骤：app.json -> window -> 把 enablePullDownRefresh 的值设置为 true



注意：在 app.json 中启用下拉刷新功能，会作用于每个小程序页面！

### 2.3.3  tabBar

#### 1 定义

tabBar 是移动端应用常见的页面效果，用于实现多页面的快速切换。小程序中通常将其分为：

- 底部 tabBar

- 顶部 tabBar

注意：

- tabBar中只能配置最少 2 个、最多 5 个 tab 页签

- 当渲染顶部 tabBar 时，不显示 icon，只显示文本

#### 2 组成部分

![image-20220905173445121](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051734846.png)



① backgroundColor：tabBar 的背景色

② selectedIconPath：选中时的图片路径

③ borderStyle：tabBar 上边框的颜色

④ iconPath：未选中时的图片路径

⑤ selectedColor：tab 上的文字选中时的颜色

⑥ color：tab 上文字的默认（未选中）颜色

#### 3 tabBar节点配置项

| **属性**        | **类型** | **必填** | **默认值** | **描述**                                     |
| --------------- | -------- | -------- | ---------- | -------------------------------------------- |
| position        | String   | 否       | bottom     | tabBar 的位置，仅支持 bottom/top             |
| borderStyle     | String   | 否       | black      | tabBar 上边框的颜色，仅支持 black/white      |
| color           | HexColor | 否       |            | tab 上文字的默认（未选中）颜色               |
| selectedColor   | HexColor | 否       |            | tab 上的文字选中时的颜色                     |
| backgroundColor | HexColor | 否       |            | tabBar 的背景色                              |
| list            | Array    | 是       |            | tab 页签的列表，  最少 2  个、最多  5 个 tab |

#### 4 每个tab项的配置选项

| **属性**         | **类型** | **必填** | **描述**                                              |
| ---------------- | -------- | -------- | ----------------------------------------------------- |
| pagePath         | String   | 是       | 页面路径，页面必须在 pages  中预先定义                |
| text             | String   | 是       | tab 上显示的文字                                      |
| iconPath         | String   | 否       | 未选中时的图标路径；当 postion 为 top 时，不显示 icon |
| selectedIconPath | String   | 否       | 选中时的图标路径；当 postion 为 top 时，不显示 icon   |

#### 5 案例

根据资料中提供的小图标、在小程序中配置如图所示的 tabBar 效果：

![image-20220905173718139](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051737217.png)

实现步骤：

1. 拷贝图标资源

①把资料目录中的 images 文件夹，拷贝到小程序项目根目录中

②将需要用到的小图标分为 3 组，每组两个，其中：

- 图片名称中包含 -active 的是选中之后的图标

- 图片名称中不包含 -active 的是默认图标

2. 新建 3 个对应的 tab 页面

通过 app.json 文件的 pages 节点，快速新建 3 个对应的 tab 页面，示例代码如下：

```javascript
  "pages": [
    "pages/home/home",
    "pages/message/message",
    "pages/contact/contact",
  ],
```

其中，home 是首页，message 是消息页面，contact 是联系我们页面。

3. 配置 tabBar 选项

①打开 app.json 配置文件，和 pages、window 平级，新增 tabBar 节点

②tabBar 节点中，新增 list 数组，这个数组中存放的，是每个 tab 项的配置对象

③在 list 数组中，新增每一个 tab 项的配置对象。对象中包含的属性如下：

- pagePath 指定当前 tab 对应的页面路径【必填】

- text 指定当前 tab 上按钮的文字【必填】

- iconPath 指定当前 tab 未选中时候的图片路径【可选】

- selectedIconPath 指定当前 tab 被选中后高亮的图片路径【可选】

```json
 "tabBar": {
    "list": [{
      "pagePath": "pages/home/home",
      "text": "首页",
      "iconPath": "/images/tabs/home.png",
      "selectedIconPath": "/images/tabs/home-active.png"
    },{
      "pagePath": "pages/message/message",
      "text": "消息",
      "iconPath": "/images/tabs/message.png",
      "selectedIconPath": "/images/tabs/message-active.png"
    },{
      "pagePath": "pages/contact/contact",
      "text": "联系我们",
      "iconPath": "/images/tabs/contact.png",
      "selectedIconPath": "/images/tabs/contact-active.png"
    }]
  }
```

## 2.4 页面配置

### 2.4.1 作用

小程序中，每个页面都有自己的 .json 配置文件，用来对当前页面的窗口外观、页面效果等进行配置。

### 2.4.2 页面配置与全局配置的区别

小程序中，app.json 中的 window 节点，可以全局配置小程序中每个页面的窗口表现。

如果某些小程序页面想要拥有特殊的窗口表现，此时，“页面级别的 .json 配置文件”就可以实现这种需求。



注意：当页面配置与全局配置冲突时，根据就近原则，最终的效果以页面配置为准。

### 2.4.3 页面配置中常用的配置项

| **属性**                     | **类型** | **默认值** | **描述**                                         |
| ---------------------------- | -------- | ---------- | ------------------------------------------------ |
| navigationBarBackgroundColor | HexColor | #000000    | 当前页面导航栏背景颜色，如 #000000               |
| navigationBarTextStyle       | String   | white      | 当前页面导航栏标题颜色，仅支持 black / white     |
| navigationBarTitleText       | String   |            | 当前页面导航栏标题文字内容                       |
| backgroundColor              | HexColor | #ffffff    | 当前页面窗口的背景色                             |
| backgroundTextStyle          | String   | dark       | 当前页面下拉 loading 的样式，仅支持 dark / light |
| enablePullDownRefresh        | Boolean  | false      | 是否为当前页面开启下拉刷新的效果                 |
| onReachBottomDistance        | Number   | 50         | 页面上拉触底事件触发时距页面底部距离，单位为 px  |

## 2.5 网络数据请求

### 2.5.1 小程序中网络数据请求的限制

出于安全性方面的考虑，小程序官方对数据接口的请求做出了如下两个限制：

①只能请求 HTTPS 类型的接口

②必须将接口的域名添加到信任列表中

![image-20220905174606083](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051746233.png)

### 2.5.2 配置 request 合法域名

需求描述：假设在自己的微信小程序中，希望请求 https://www.escook.cn/ 域名下的接口

配置步骤：登录微信小程序管理后台 -> 开发 -> 开发设置 -> 服务器域名 -> 修改 request 合法域名



注意事项：

①域名只支持 https 协议

②域名不能使用 IP 地址或 localhost

③域名必须经过 ICP 备案

④服务器域名一个月内最多可申请 5 次修改

### 2.5.3 发起GET请求

调用微信小程序提供的 wx.request() 方法，可以发起 GET 数据请求，示例代码如下：

```javascript
// 发起GET数据请求
  getInfo() {
    wx.request({
      url: 'https://www.escook.cn/api/get',
      method: 'GET',
      data: {
        name: 'zs',
        age: 20
      },
      success: (res) => {
        console.log(res.data)
      }
    })
  },
```

### 2.5.4 发起POST请求

调用微信小程序提供的 wx.request() 方法，可以发起 POST 数据请求，示例代码如下：

```javascript
 // 发起POST请求
  postInfo() {
    wx.request({
      url: 'https://www.escook.cn/api/post',
      method: "POST",
      data: {
        name: 'ls',
        age: 33
      },
      success: (res) => {
        console.log(res.data)
      }
    })
  },
```

### 2.5.5 在页面刚加载时请求数据

在很多情况下，我们需要在页面刚加载的时候，自动请求一些初始化的数据。此时需要在页面的 onLoad 事件中调用获取数据的函数，示例代码如下：

```javascript
Page({
  onLoad: function (options) {
    this.getInfo()
    this.postInfo()
  },   
})  
```

### 2.5.6 跳过request合法域名校验

如果后端程序员仅仅提供了 http 协议的接口、暂时没有提供 https 协议的接口。

此时为了不耽误开发的进度，我们可以在微信开发者工具中，临时开启「开发环境不校验请求域名、TLS 版本及 HTTPS 证书」选项，跳过 request 合法域名的校验。



注意：跳过 request 合法域名校验的选项，仅限在开发与调试阶段使用！

![image-20220905185031277](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209051850680.png)

### 2.5.7 关于跨域和Ajax的说明

跨域问题只存在于基于浏览器的 Web 开发中。由于小程序的宿主环境不是浏览器，而是微信客户端，所以小程序中不存在跨域的问题。

Ajax 技术的核心是依赖于浏览器中的 XMLHttpRequest 这个对象，由于小程序的宿主环境是微信客户端，所以小程序中不能叫做“发起 Ajax 请求”，而是叫做“发起网络数据请求”。

## 2.6 案例 - 本地生活（首页）

①新建项目并梳理项目结构

②配置导航栏效果

③配置 tabBar 效果

④实现轮播图效果

⑤实现九宫格效果

⑥实现图片布局



①获取轮播图数据列表的接口

- 【GET】https://www.escook.cn/slides

②获取九宫格数据列表的接口

- 【GET】https://www.escook.cn/categories

### 2.6.1 基本配置

#### 1 在project.config.json中添加以下代码，消除 sitemap 的警告信息

```json
"checkSiteMap": false,
```

#### 2 app.json 配置

```json
{
  "pages": [
    "pages/home/home",
    "pages/message/message",
    "pages/contact/contact",
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#2b4b6b",
    "navigationBarTitleText": "本地生活",
    "navigationBarTextStyle": "white"
  },
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/home/home",
        "text": "首页",
        "iconPath": "/images/tabs/home.png",
        "selectedIconPath": "/images/tabs/home-active.png"
      },
      {
        "pagePath": "pages/message/message",
        "text": "消息",
        "iconPath": "/images/tabs/message.png",
        "selectedIconPath": "/images/tabs/message-active.png"
      },
      {
        "pagePath": "pages/contact/contact",
        "text": "联系我们",
        "iconPath": "/images/tabs/contact.png",
        "selectedIconPath": "/images/tabs/contact-active.png"
      }
    ]
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json"
}
```

### 2.6.2 获取图片数据

```JavaScript
// pages/home/home.js
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    // 存放轮播图数据的列表
    swiperList: [],
    // 存放九宫格数据的列表
    gridList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getGridList()
  },

  // 获取轮播图数据的方法
  getSwiperList() {
    wx.request({
      url: 'https://www.escook.cn/slides',
      method: 'GET',
      success: (res) => {
        this.setData({
          swiperList: res.data
        })
      }
    })
  },

  // 获取九宫格数据的方法
  getGridList() {
    wx.request({
      url: 'https://www.escook.cn/categories',
      method: 'GET',
      success: (res) => {
        this.setData({
          gridList: res.data
        })
      }
    })
  },
})
```

![image-20220906162130939](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209061621972.png)

### 2.6.3 实现轮播图效果

```JavaScript
<!--pages/home/home.wxml-->
<!-- 轮播图区域 -->
<swiper indicator-dots circular>
  <swiper-item wx:for="{{swiperList}}" wx:key="id">
    <image src="{{item.image}}"></image>
  </swiper-item>
</swiper>

/* pages/home/home.wxss */
swiper {
  height: 350rpx;
}

swiper image {
  width: 100%;
  height: 100%;
}
```

### 2.6.4 实现九宫图效果

```JavaScript
<!--pages/home/home.wxml-->
<!-- 九宫格区域 -->
<view class="grid-list">
  <view class="grid-item" wx:for="{{gridList}}" wx:key="id">
    <image src="{{item.icon}}"></image>
    <text>{{item.name}}</text>
  </view>
</view>

/* pages/home/home.wxss */
.grid-list {
  display: flex;
  flex-wrap: wrap;
  border-left: 1rpx solid #efefef;
  border-top: 1rpx solid #efefef;
}

.grid-item {
  width: 33.33%;
  height: 200rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1rpx solid #efefef;
  border-bottom: 1rpx solid #efefef;
  box-sizing: border-box;
}

.grid-item image {
  width: 60rpx;
  height: 60rpx;
}

.grid-item text {
  font-size: 24rpx;
  margin-top: 10rpx;
}
```

### 2.6.5 图片区域

```javascript
<!-- 图片区域 -->
<view class="img-box">
  <image src="/images/link-01.png" mode="widthFix"></image>
  <image src="/images/link-02.png" mode="widthFix"></image>
</view>

/* pages/home/home.wxss */
.img-box {
  display: flex;
  padding: 20rpx 10rpx;
  justify-content: space-around;
}

.img-box image {
  width: 45%;
}
```

# 3 视图与逻辑

## 3.1 页面导航

### 3.1.1 定义

页面导航指的是页面之间的相互跳转。例如，浏览器中实现页面导航的方式有如下两种：

①<a> 链接

②location.href

### 3.1.2 小程序中实现页面导航的两种方式

① 声明式导航

- 在页面上声明一个 <navigator> 导航组件

- 通过点击 <navigator> 组件实现页面跳转

② 编程式导航

- 调用小程序的导航 API，实现页面的跳转

### 3.1.3 声明式导航

#### 1 导航到 tabBar 页面

tabBar 页面指的是被配置为 tabBar 的页面。

在使用 <navigator> 组件跳转到指定的 tabBar 页面时，需要指定 url 属性和 open-type 属性，其中：

- url 表示要跳转的页面的地址，必须以 / 开头

- open-type 表示跳转的方式，必须为 switchTab

示例代码如下：

```javascript
<navigator url="/pages/message/message" open-type="switchTab">导航到消息页面</navigator>
```

#### 2 导航到非 tabBar 页面

非 tabBar 页面指的是没有被配置为 tabBar 的页面。

在使用 <navigator> 组件跳转到普通的非 tabBar 页面时，则需要指定 url 属性和 open-type 属性，其中：

- url 表示要跳转的页面的地址，必须以 / 开头

- open-type 表示跳转的方式，必须为 navigate

示例代码如下：

```javascript
<navigator url="/pages/info/info" open-type="navigate">导航到info页面</navigator>
```

注意：为了简便，在导航到非 tabBar 页面时，open-type="navigate" 属性可以省略。

#### 3 后退导航

如果要后退到上一页面或多级页面，则需要指定 open-type 属性和 delta 属性，其中：

- open-type 的值必须是 navigateBack，表示要进行后退导航

- delta 的值必须是数字，表示要后退的层级

示例代码如下：

```javascript
<navigator open-type="navigateBack",delta='1'>返回上一页</navigator>
```

注意：为了简便，如果只是后退到上一页面，则可以省略 delta 属性，因为其默认值就是 1。

### 3.1.4 导航传参

#### 1 声明式导航传参

navigator 组件的 url 属性用来指定将要跳转到的页面的路径。同时，路径的后面还可以携带参数：

- 参数与路径之间使用 ? 分隔

- 参数键与参数值用 = 相连

- 不同参数用 & 分隔

代码示例如下：

```javascript
<navigator url="/pages/info/info?name=zs&age=20">跳转到info页面</navigator>
```

#### 2 编程式导航传参

调用 wx.navigateTo(Object object) 方法跳转页面时，也可以携带参数，代码示例如下：

```JavaScript
// 页面结构
<button bindtop="gotoInfo2">跳转到info页面</button>

// 通过编程式导航，跳转到 info 页面，并携带参数
gotoInfo2() {
  wx.navigateTo({
    url: '/pages/info/info?name=ls&gender=男'
  })
}
```

#### 3 在 onLoad 中接收导航参数

通过声明式导航传参或编程式导航传参所携带的参数，可以直接在 onLoad 事件中直接获取到，示例代码如下：

```JavaScript
// 声明周期函数----监听页面加载
onLoad: function(options) {
  // options 就是导航传递过来的参数对象
  console.log(options)
}
```

## 3.2 页面事件

### 3.2.1 下拉刷新事件

下拉刷新是移动端的专有名词，指的是通过手指在屏幕上的下拉滑动操作，从而**重新加载页面数据**的行为。

#### 1 启用

启用下拉刷新有两种方式：

①全局开启下拉刷新

- 在 app.json 的 window 节点中，将 enablePullDownRefresh 设置为 true

②局部开启下拉刷新

- 在页面的 .json 配置文件中，将 enablePullDownRefresh 设置为 true



在实际开发中，推荐使用第 2 种方式，为需要的页面单独开启下拉刷新的效果。

#### 2 配置下拉刷新窗口的样式

在全局或页面的 .json 配置文件中，通过 backgroundColor 和 backgroundTextStyle 来配置下拉刷新窗口的样式，其中：

- backgroundColor 用来配置下拉刷新窗口的背景颜色，仅支持16 进制的颜色值

- backgroundTextStyle 用来配置下拉刷新 loading 的样式，仅支持 dark 和 light

#### 3 监听页面的下拉刷新事件

在页面的 .js 文件中，通过 onPullDownRefresh() 函数即可监听当前页面的下拉刷新事件。

例如，在页面的 wxml 中有如下的 UI 结构，点击按钮可以让 count 值自增 +1：

```javascript
//
<view>count值为：{{count}}</view>
<button bindtap="countAdd">+1</button>

// +1 按钮的点击事件处理函数
countAdd() {
  this.setData({
    count: this.data.count + 1
  })
}
```

在触发页面的下拉刷新事件的时候，如果要把 count 的值重置为 0，示例代码如下：

```javascript
// 页面相关事件函数--监听用户下拉动作 
onPullDownRefresh: function() {
   this.setData({
     count: 0;
   })
 }
```

#### 4 停止下拉刷新的效果

当处理完下拉刷新后，下拉刷新的 loading 效果会一直显示，不会主动消失，所以需要手动隐藏下拉刷新的 loading 效果。此时，调用 wx.stopPullDownRefresh() 可以停止当前页面的下拉刷新。示例代码如下：

```
// 页面相关事件函数--监听用户下拉动作 
onPullDownRefresh: function() {
   this.setData({
     count: 0;
   })
   // 当数据重置成功之后，调用次函数，关闭下拉刷新的效果
   wx.stopPullDownRefresh()
 }
```

### 3.2.2 上拉触底事件

上拉触底是移动端的专有名词，通过手指在屏幕上的上拉滑动操作，从而**加载更多数据**的行为。

#### 1 监听页面的上拉触底事件

在页面的 .js 文件中，通过 onReachBottom() 函数即可监听当前页面的上拉触底事件。示例代码如下：

```JavaScript
// 页面上拉触底事件的处理函数
onReachBottom: function() {
  console.log('触发了上拉触底的事件')
}
```

#### 2 设置上拉触底距离

上拉触底距离指的是触发上拉触底事件时，滚动条距离页面底部的距离。

可以在全局或页面的 .json 配置文件中，通过 onReachBottomDistance 属性来配置上拉触底的距离。

小程序默认的触底距离是 50px，在实际开发中，可以根据自己的需求修改这个默认值。

#### 3 案例

①定义获取随机颜色的方法

```javascript
data: {
  colorList: [] // 随机颜色的列表
},

getColors() {
  wx.request({
    url: 'https://www.escook.cn/api/color',
    method: 'GET',
    success: ({ data:res }) => {
      this.setData({
        colorList: [...this.data.colorList,...res.data]  // 旧数据展开后，新数据拼接进去
      })
    }
  })
}
```

②在页面加载时获取初始数据

```javascript
// 声明周期函数----监听页面加载
onLoad: function(options) {
  this.getColors()
}
```

③渲染 UI 结构并美化页面效果

```javascript
// wxml 的结构
<view wx:for="{{colorList}}" wx:key="index" class="num-item" style="background-color:rgba{{item}};">{{item}}</view>

// wxss 样式
.num-item {
    border: 1rpx solid #efefef;
    border-radius: 8rpx;
    line-height: 200rpx;
    margin: 15rpx;
    text-align: center;
    text-shadow: 0rpx 0rpx 5prx #fff;
    box-shadow: 1rpx 1rpx 6rpx #aaa;
}
```

④在上拉触底时调用获取随机颜色的方法

```javascript
// 页面上拉触底事件的处理函数
onReachBottom: function() {
  // 调用获取随机颜色的方法
  this.getColors()
}
```

⑤添加 loading 提示效果

```JavaScript
getColors() {
  wx.showLoading({ title: '数据加载中... '})  // 1. 展示loading效果
  // 发起请求，获取随机颜色值的数组
  wx.request({
    url: 'https://www.escook.cn/api/color',
    method: 'GET',
    success: ({ data:res }) => {
      this.setData({
        colorList: [...this.data.colorList,...res.data]
      })
    }
    complete: () => {
      wx.hideLoading()  //2. 展示 loading 效果
    }
  })
}
```

⑥对上拉触底进行节流处理

①在 data 中**定义** isloading 节流阀

- false 表示当前没有进行任何数据请求

- true 表示当前正在进行数据请求

②在 getColors() 方法中**修改** isloading 节流阀的值

- 在刚调用 getColors 时将节流阀设置 true

- 在网络请求的 complete 回调函数中，将节流阀重置为 false

③在 onReachBottom 中**判断**节流阀的值，从而对数据请求进行节流控制

- 如果节流阀的值为 true，则阻止当前请求
- 如果节流阀的值为 false，则发起数据请求

```
data: {
  colorList: [] // 随机颜色的列表
  isloding:false
},

getColors() {
  this.setData({
    isloding: true
  })
  wx.showLoading({ title: '数据加载中... '})  // 1. 展示loading效果
  // 发起请求，获取随机颜色值的数组
  wx.request({
    url: 'https://www.escook.cn/api/color',
    method: 'GET',
    success: ({ data:res }) => {
      this.setData({
        colorList: [...this.data.colorList,...res.data]
      })
    }
    complete: () => {
      wx.hideLoading()  //2. 展示 loading 效果
      this.setData({
        isloding: false
      })
    }
  })
}

// 页面上拉触底事件的处理函数
onReachBottom: function() {
  if (this.dat.isloding) return
  // 调用获取随机颜色的方法
  this.getColors()
}
```



### 3.2.3 自定义编译模式

![image-20220905234825253](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209052348053.png)

![image-20220905234828485](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209052348747.png)

## 3.3 生命周期

### 3.3.1 分类

在小程序中，生命周期分为两类，分别是：

① 应用生命周期

- 特指小程序从启动 -> 运行 -> 销毁的过程

② 页面生命周期

- 特指小程序中，每个页面的加载 -> 渲染 -> 销毁的过程



其中，页面的生命周期范围较小，应用程序的生命周期范围较大，如图所示：

![image-20220906072136516](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209060721636.png)

### 3.3.2 生命周期函数

生命周期函数：是由小程序框架提供的内置函数，会伴随着生命周期，自动按次序执行。



生命周期函数的作用：允许程序员在特定的时间点，执行某些特定的操作。例如，页面刚加载的时候，可以在 onLoad 生命周期函数中初始化页面的数据。



注意：生命周期强调的是时间段，生命周期函数强调的是时间点。



### 3.3.3 生命周期函数分类

小程序中的生命周期函数分为两类，分别是：

① 应用的生命周期函数

- 特指小程序从启动 -> 运行 -> 销毁期间依次调用的那些函数

② 页面的生命周期函数

- 特指小程序中，每个页面从加载 -> 渲染 -> 销毁期间依次调用的那些函数

### 3.3.4 应用的生命周期函数

小程序的应用生命周期函数需要在 app.js 中进行声明，示例代码如下：

```JavaScript
App({
  // 小程序初始化完成时，执行次函数，全局只触发一次。可以做一些初始化工作
  onLaunch: function(options) { },
  // 小程序启动，或从后台进入前台显示时触发
  onShow: function(options) { },
  // 小程序从前台进入后台时触发
  onHide: function() { }
})
```

### 3.3.5 页面的生命周期

小程序的页面生命周期函数需要在页面的 .js 文件中进行声明，示例代码如下：

```JavaScript
Page({
  onLoad: function(options) {}, // 监听页面加载，一个页面只调用一次
  onShow: function() {},        // 监听页面显示
  onReady: function() {},       // 监听页面初次渲染完成，一个页面只调用一次
  onHide:function() {},         // 监听页面隐藏
  onUnload: function() {}       // 监听页面卸载，一个页面只调用一次
})
```

## 3.4 WXS 脚本

### 3.4.1 定义

WXS（WeiXin Script）是小程序独有的一套脚本语言，结合 WXML，可以构建出页面的结构。

### 3.4.2 应用场景

wxml 中无法调用在页面的 .js 中定义的函数，但是，wxml 中可以调用 wxs 中定义的函数。因此，小程序中 wxs 的典型应用场景就是“过滤器”。

### 3.4.3 wxs和JavaScript关系

虽然 wxs 的语法类似于 JavaScript，但是 wxs 和 JavaScript 是完全不同的两种语言：

①wxs 有自己的数据类型

- number 数值类型、string 字符串类型、boolean 布尔类型、object 对象类型、

- function 函数类型、array 数组类型、  date 日期类型、   regexp 正则

②wxs 不支持类似于 ES6 及以上的语法形式

- 不支持：let、const、解构赋值、展开运算符、箭头函数、对象属性简写、etc...

- 支持：var 定义变量、普通 function 函数等类似于 ES5 的语法

③wxs 遵循 CommonJS 规范

- module 对象

- require() 函数

- module.exports 对象

### 3.4.3 基础语法

#### 1 内嵌wxs脚本

wxs 代码可以编写在 wxml 文件中的 <wxs> 标签内，就像 Javascript 代码可以编写在 html 文件中的 <script> 标签内一样。

wxml 文件中的每个 <wxs></wxs> 标签，必须提供 module 属性，用来指定当前 wxs 的模块名称，方便在 wxml 中访问模块中的成员：

```JavaScript
<view>{{m1.toUpper(username)}}</view>

<wxs module="m1">
  // 将文本转写为大写形式
  module.exports.toUpper = function(str) {
    return str.toUpperCase()
  }
</wxs>
```

#### 2 定义外联的wxs脚本

wxs 代码还可以编写在以 .wxs 为后缀名的文件内，就像 javascript 代码可以编写在以 .js 为后缀名的文件中一样。示例代码如下：

```JavaScript
// tools.wsx 文件
function toLower(str) {
  return str.toLowerCase()
}

module.exports = {
  toLower: toLower
}
```

#### 3 使用外联的wsx脚本

在 wxml 中引入外联的 wxs 脚本时，必须为 <wxs> 标签添加 module 和 src 属性，其中：

- module 用来指定模块的名称

- src 用来指定要引入的脚本的路径，且必须是相对路径

示例代码如下：

```javascript
<!-- 调用m2模块中的方法-->
<view>{{m2.toLower(country)}}</view>
<!-- 引用外联的tools.wxs脚本，并命名为m2-->
<wxs src="../../utils/tools.wsx" module="m2"></wxs>
```

### 3.4.4 wxs特点

#### 1 与JavaScript不同

为了降低 wxs（WeiXin Script）的学习成本， wxs 语言在设计时借大量鉴了 JavaScript 的语法。但是本质上，wxs 和 JavaScript 是完全不同的两种语言！

#### 2 不能作为组件的回调函数

wxs 典型的应用场景就是“过滤器”，经常配合 Mustache 语法进行使用，例如：

```javascript
<view>{{m2.toLower(country)}}</view>
```

但是，在 wxs 中定义的函数不能作为组件的事件回调函数。例如，下面的用法是错误的：

```javascript
<button bindtap="m2.toLower">按钮</button>
```

#### 3 隔离性

隔离性指的是 wxs 的运行环境和其他 JavaScript 代码是隔离的。体现在如下两方面：

①wxs 不能调用 js 中定义的函数

②wxs 不能调用小程序提供的 API

#### 4 性能好

- 在 iOS 设备上，小程序内的 WXS 会比 JavaScript 代码快 2 ~ 20 倍

- 在 android 设备上，二者的运行效率无差异

## 3.5 案例 - 本地生活（列表页面）

### 3.5.1 准备

#### 1主要功能

- 页面导航并传参

- 上拉触底时加载下一页数据

- 下拉刷新列表数据

#### 2 列表页面的API接口

以分页的形式，加载指定分类下商铺列表的数据：

①接口地址

- https://www.escook.cn/categories/:cate_id/shops

- URL 地址中的 :cate_id 是动态参数，表示分类的 Id

②请求方式

- GET 请求

③请求参数

- _page 表示请求第几页的数据

- _limit 表示每页请求几条数据

#### 3 判断是否还有下一页

如果下面的公式成立，则证明没有下一页数据了：

页码值 * 每页显示多少条数据 >= 总数据条数

page * pageSize >= total



案例1：总共有 77 条数据，如果每页显示 10 条数据，则总共分为 8 页，其中第 8 页只有 7 条数据

page（7）* pageSize（10） >= total（77）

page（8）* pageSize（10） >= total（77）



案例2：总共有 80 条数据，如果每页显示 10 条数据，则总共分为 8 页，其中第 8 页面有 10 条数据

page（7）* pageSize（10） >= total（80）

page（8）* pageSize（10） >= total（80）

### 3.5.2 导航跳转与传参

```javascript
<!-- home.wxml -->
<!-- 九宫格区域 -->
<view class="grid-list">
  <navigator class="grid-item" wx:for="{{gridList}}" wx:key="id" url="/pages/shoplist/shoplist?id={{item.id}}&title={{item.name}}">
    <image src="{{item.icon}}"></image>
    <text>{{item.name}}</text>
  </navigator>
</view>
```

### 3.5.3 设置标题内容

```javascript
// pages/shoplist/shoplist.js
Pages({
  data: {
    query: {},
    shopList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      query: options // 由于onReady生命周期无法得到外部数据，需要在data中保存导航传递的参数
    })
  },
   /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.query.title
    })
  },
})
```

### 3.5.4 添加编译模式

![image-20220906224141114](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209062241321.png)

### 3.5.5 获得商铺列表数据

```javascript
Pages({
  data: {
    query: {},
    shopList: [],
    page: 1,
    pageSize: 10,
    total: 0
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      query: options
    })
    this.getShopList()
  },
    
  getShopList() {
    wx.request({
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method: 'GET',
      data: {
        _page: this.data.page,
        _limit: this.data.pageSize
      },
      success: (res) => {
        this.setData({
          shopList: [...this.data.shopList, ...res.data],
          total: res.header['X-Total-Count'] - 0
        })
      },
    })
  }
})
```

### 3.5.6 渲染商铺列表数据


```html
<!--pages/shoplist/shoplist.wxml-->

<view class="shop-item" wx:for="{{shopList}}" wx:key="id">
  <view class="thumb">
    <image src="{{item.images[0]}}"></image>
  </view>
  <view class="info">
    <text class="shop-title">{{item.name}}</text>
    <text>电话：{{item.phone}}</text>
    <text>地址：{{item.address}}</text>
    <text>营业时间：{{item.businessHours}}</text>
  </view>
</view>

<wxs src="../../utils/tools.wxs" module="tools"></wxs>

```

```css
/* pages/shoplist/shoplist.wxss */
.shop-item {
  display: flex;
  padding: 15rpx;
  border: 1rpx solid #efefef;
  border-radius: 8rpx;
  margin: 15rpx;
  box-shadow: 1rpx 1rpx 15rpx #ddd;
}

.thumb image {
  width: 250rpx;
  height: 250rpx;
  display: block;
  margin-right: 15rpx;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 24rpx;
}

.shop-title {
  font-weight: bold;
}
```

### 3.5.7 实现上拉加载效果

```javascript
// 以分页的形式获取商铺列表数据的方法
  getShopList() {
    // 展示 loading 效果
    wx.showLoading({
      title: '数据加载中...'
    })

    wx.request({
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method: 'GET',
      data: {
        _page: this.data.page,
        _limit: this.data.pageSize
      },
      success: (res) => {
        this.setData({
          shopList: [...this.data.shopList, ...res.data],
          total: res.header['X-Total-Count'] - 0
        })
      },
      complete: () => {
        // 隐藏 loading 效果
        wx.hideLoading()
      }
    })
  },
```

```json
// shoplist.json
{
  "usingComponents": {},
  "onReachBottomDistance": 200,
}
```

```javascript
 Pages({
   /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.page * this.data.pageSize >= this.data.total) {
      // 证明没有下一页的数据了
      return wx.showToast({
        title: '数据加载完毕！',
        icon: 'none'
      })
    }
    // 判断是否正在加载其他数据
    if (this.data.isloading) return
    // 页码值 +1
    this.setData({
      page: this.data.page + 1
    })

    // 获取下一页数据
    this.getShopList()
  },
)}
```

```javascript
// 设置节流阀
Pages({
   /**
   * 页面的初始数据
   */
  data: {
    ...
    isloading: false
  },
  getShopList() {
    this.setData({
      isloading: true
    })
    ...
    wx.request({
      ...
      complete: () => {
      // 隐藏 loading 效果
      wx.hideLoading()
      this.setData({ isloading: false })
      }
    })
  }
})
```

### 3.5.8 下拉刷新效果

```javascript
Pages({
   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 需要重置关键的数据
    this.setData({
      page: 1,
      shopList: [],
      total: 0
    })
    // 重新发起数据请求
    this.getShopList(() => {
      wx.stopPullDownRefresh()
    })
  },
})
```

```json
// shoplist.json
{
  "usingComponents": {},
  "onReachBottomDistance": 200,
  "enablePullDownRefresh": true,
  "backgroundColor": "#efefef",
  "backgroundTextStyle": "dark"
}
```

### 3.5.9 优化下拉刷新效果

当使用监听用户下拉动作的时候，传入一个回调函数。

当getShopList接收到回调函数的时候，就会触发这个回调函数

```javascript
// 以分页的形式获取商铺列表数据的方法
  getShopList(cb) {
    ...
    wx.request({
      ...
      complete: () => {
        // 隐藏 loading 效果
        wx.hideLoading()
        this.setData({ isloading: false })
        // wx.stopPullDownRefresh()
        cb && cb()
      }
    })
  },
  
   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    ...
    // 重新发起数据请求
    this.getShopList(() => {
      wx.stopPullDownRefresh()
    })
  },
```

### 3.5.10 wxs处理手机号

```javascript
utils/tools.wxs
function splitPhone(str) {
  if(str.length !== 11) return str

  var arr = str.split('')

  arr.splice(3, 0, '-')
  arr.splice(8, 0, '-')

  return arr.join('')
}

module.exports = {
  splitPhone: splitPhone
}
```

```javascript
<!--pages/shoplist/shoplist.wxml-->
<text>电话：{{tools.splitPhone(item.phone)}}</text>

<wxs src="../../utils/tools.wxs" module="tools"></wxs>
```



# 4 组件与包

## 4.1 自定义组件

### 4.1.1 组件的创建与引用

#### 1 创建组件

①在项目的根目录中，鼠标右键，创建 components -> test 文件夹

②在新建的 components -> test 文件夹上，鼠标右键，点击“新建 Component”

③键入组件的名称之后回车，会自动生成组件对应的 4 个文件，后缀名分别为 .js，.json， .wxml 和 .wxss



注意：为了保证目录结构的清晰，建议把不同的组件，存放到单独目录中，例如：

![image-20220906074915010](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209060749057.png)

#### 2 引用组件

组件的引用方式分为“局部引用”和“全局引用”，顾名思义：

- 局部引用：组件只能在当前被引用的页面内使用

- 全局引用：组件可以在每个小程序页面中使用

#### 3 局部引用组件

在页面的 .json 配置文件中引用组件的方式，叫做“局部引用”。示例代码如下：

```JavaScript
// 在页面.json文件中，引入组件
{
  "usingComponents": {
    "my-test1": "/components/test1/test1"
  }
}
// 在页面的.wxml文件中使用组件
<my-test1></my-test1>
```

#### 4 全局引用组件

在 app.json 全局配置文件中引用组件的方式，叫做“全局引用”。示例代码如下：

```JavaScript
// 在app.json文件中，引入组件
{
  "pages": []
  "window": []
  "usingComponents": {
    "my-test2":"/component/test2/test2"
  }
}
// 在页面的 .wxml 文件中使用组件
<my-test2></my-test2>
```

#### 5 对比

根据组件的使用频率和范围，来选择合适的引用方式：

- 如果某组件在多个页面中经常被用到，建议进行“全局引用”

- 如果某组件只在特定的页面中被用到，建议进行“局部引用”

#### 6 组件和页面的区别

从表面来看，组件和页面都是由 .js、.json、.wxml 和 .wxss 这四个文件组成的。但是，组件和页面的 .js 与 .json 文件有明显的不同：

- 组件的 .json 文件中需要声明 "component": true 属性

- 组件的 .js 文件中调用的是 Component() 函数

- 组件的事件处理函数需要定义到 methods 节点中

### 4.1.2 样式

#### 1 组件样式隔离

默认情况下，自定义组件的样式只对当前组件生效，不会影响到组件之外的 UI 结构，如图所示：

- 组件 A 的样式不会影响组件 C 的样式

- 组件 A 的样式不会影响小程序页面的样式

- 小程序页面的样式不会影响组件 A 和 C 的样式

好处：

①防止外界的样式影响组件内部的样式

②防止组件的样式破坏外界的样式

![image-20220906075703766](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209060757300.png)

#### 2 组件样式隔离的注意点

- app.wxss 中的全局样式对组件无效

- 只有 class 选择器会有样式隔离效果，id 选择器、属性选择器、标签选择器不受样式隔离的影响

建议：在组件和引用组件的页面中建议使用 class 选择器，**不要使用** id、属性、标签选择器！

#### 3 修改组件的样式隔离选项

默认情况下，自定义组件的样式隔离特性能够防止组件内外样式互相干扰的问题。但有时，我们希望在外界能够控制组件内部的样式，此时，可以通过 styleIsolation 修改组件的样式隔离选项，用法如下：

```JavaScript
// 在组件的.js文件中新增如下配置
Component({
  options: {
    styleIsolation: 'isolated'
  }
})
// 或在组件的.json文件中新增如下配置
{
  "styleIsolation": "isolated"
}
```

#### 4 styleIsolation的可选项

| **可选值**   | **默认值** | **描述**                                                     |
| ------------ | ---------- | ------------------------------------------------------------ |
| isolated     | 是         | 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响 |
| apply-shared | 否         | 表示页面 wxss  样式将影响到自定义组件，但自定义组件  wxss  中指定的样式不会影响页面 |
| shared       | 否         | 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件 |

### 4.1.3 数据、方法和属性

#### 1 data 数据

在小程序组件中，用于组件模板渲染的私有数据，需要定义到 data 节点中，示例如下：

```JavaScript
Component({
  // 组件的初始数据
  data: {
    count:0
  }
})
```

#### 2 methods方法

在小程序组件中，事件处理函数和自定义方法需要定义到 methods 节点中，示例代码如下：

```JavaScript
Component({
  methods: {      // 组件的方法列表【包含事件处理函数和自定义方法】
    addCount() {  // 事件处理函数
      this.setData({ count:this.data.count + 1 })
      this._showCount()// 通过 this 直接调用自定义方法
    },
    _showCount() {
      wx.showToast({
        title: 'count值为：' + this.data.count,
        icon: 'none'
      })
    }
  }
})
```

#### 3 properties 属性

在小程序组件中，properties 是组件的对外属性，用来接收外界传递到组件中的数据，示例代码如下：

```JavaScript
Component({
  // 属性定义
  properties: {
    max: {          // 完整定义属性的方法【当需要指定属性默认值时，建议使用此方式】
      type: Number, // 属性值的数据类型
      value: 10     // 属性默认值
    },
    max: Number     // 简化定义属性的方式【不需指定属性默认值时，可以使用简化方式】
  }
})

<my-test1 max="10"></my-test1>
```

#### 4 data 和 properties 区别

在小程序的组件中，properties 属性和 data 数据的用法相同，它们都是可读可写的，只不过：

- data 更倾向于存储组件的私有数据

- properties 更倾向于存储外界传递到组件中的数据

```javascript
Component({
  methods: {
    showInfo() {
      console.log(this.data)       // 输出结果： {count:0, max:10}
      console.log(this.properties) // 输出结果： {count:0, max:10}
      // 结果为 true 证明data数据和properties属性在本质上是一样的，都是可读可写的
      console.log(this.data === this.properties)
    }
  }
})
```

#### 5 使用 setData 修改 properties 值

由于 data 数据和 properties 属性在本质上没有任何区别，因此 properties 属性的值也可以用于页面渲染，或使用 setData 为 properties 中的属性重新赋值，示例代码如下：

```JavaScript
//在组件的.wxml文件中使用properties属性的值
<view>max属性的值为：{{max}}</view>

Component({
  properties: { max: Number }, //定义属性
  methods: {
    addCount() {
      this.setData({ max: this.properties.max + 1 }) // 使用setData修改属性的值
    }
  }
})
```

### 4.1.4 数据监听器

#### 1 定义

数据监听器用于监听和响应任何属性和数据字段的变化，从而执行特定的操作。它的作用类似于 vue 中的 watch 侦听器。在小程序组件中，数据监听器的基本语法格式如下：

```javascript
Component({
  observers: {
    '字段A,字段B':function(字段A的新值,字段B的新值) {
      // do something
    }
  }
})
```

#### 2 数据监听器的基本用法

组件的 UI 结构如下：

```javascript
// 组件的UI结构
<view>{{n1}} + {{n2}}  = {{sum}}</view>
<button size="mini" bindtap="addN1">n1自增</button>
<button size="mini" bindtap="addN2">n2自增</button>
```

组件的 .js 文件代码如下：

```JavaScript
Component({
  data: {n1:0,n2:0,sum:0},            // 数据节点
  methods: {                          // 方法列表
    addN1() { this.setData({ n1:this.data.n1 + 1})},
    addN2() { this.setData({ n2:this.data.n2 + 1})}
  },
  observers: {                        // 数据监听节点
    'n1,n2':function(newN1,newN2) {         // 监听 n1 和 n2 数据的变化
      this.setData({ sum: newN1 + newN2 })  // 通过监听器，自动计算 sum 的值
    }
  }
})
```

#### 3 监听对象属性的变化

数据监听器支持监听对象中单个或多个属性的变化，示例语法如下：
```JavaScript
Component({
  observers: {
    '对象.属性A，对象.属性B':function(属性A的新值，属性B的新值) {
      // 触发此监听器的 3种情况：
      // 【为属性A赋值】使用 setData 设置 this.data.对象.属性A 时触发
      // 【为属性B赋值】使用 setData 设置 this.data.对象.属性B 时触发
      // 【直接为对象赋值】使用 setData 设置 this.data.对象 时触发
      // do something
    }
  }
})
```

### 4.1.5 案例

#### 1 案例效果

![image-20220906084442658](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209060844637.png)

```JavaScript
Component({
  data: {
    rgb: {
      r: 0,
      g: 0,
      b: 0
    },
    fullColor: '0, 0, 0'  // 根据 rgb 对象的三个对象，动态计算 fullColor 的值
  }
})
```

#### 2 渲染UI结构

```javascript
// .wxml 结构
<view style="background-color:rgb({{fullColor}});" class="colorBox">颜色值：{{fullColor}}</view>
<button size="mini" bindtap="changeR" type="default">R</button>
<button size="mini" bindtap="changeG" type="primary">G</button>
<button size="mini" bindtap="changeB" type="warn">B</button>

// .wxss 样式
.colorBox {
  line-height: 200rpx;
  font-size: 24rpx;
  color: white;
  text-shawdow: 0rpx 0rpx 2rpx black;
  text-align: center;
}
```

#### 3 定义button的事件处理函数

```javascript
meethods:{
  changeR() {  // 修改 rgb 对象上 r 属性的值
    this.setData({
      'rgb.r': this.data.rgb.r + 5 > 255 ? 255 : this.data.rgb.r + 5
    })
  },
  changeG(){  // 修改 rgb 对象上 g 属性的值
    this.setData({
      'rgb.g': this.data.rgb.g + 5 > 255 ? 255 : this.data.rgb.g + 5
    })
  },
  changeB(){ // 修改 rgb 对象上 b 属性的值
    this.setData({
      'rgb.b': this.data.rgb.b + 5 > 255 ? 255 : this.data.rgb.g + 5
    })
  },  
}
```

#### 4 监听对象中指定属性的变化

```JavaScript
observers: {
  // 监听 rgb 对象上 r g b 三个子属性的变化
  'rgb.r,rgb.g,rgb.b': function(r,g,b) {
    this.setData({
      // 为 data 中的 fullColor 重新赋值
      fullColor: `${r},${g},${b}`
    })
  }
}
```

#### 5 监听对象中所有属性的变化

如果某个对象中需要被监听的属性太多，为了方便，可以使用通配符 ** 来监听对象中所有属性的变化，示例代码如下：

```JavaScript
observers: {
  // 使用通配符 ** 监听对象上所有属性的变化
  'rgb.**':function(obj) {
    this.setData({
      fullColor: `${obj.r},${obj.g},${obj.b}`
    })
  }
}
```

### 4.1.6 纯数据字段

#### 1 定义

概念：纯数据字段指的是那些不用于界面渲染的 data 字段。



应用场景：例如有些情况下，某些 data 中的字段既不会展示在界面上，也不会传递给其他组件，仅仅在当前组件内部使用。带有这种特性的 data 字段适合被设置为纯数据字段。



好处：纯数据字段有助于提升页面更新的性能。

#### 2 使用规则

在 Component 构造器的 options 节点中，指定 pureDataPattern 为一个正则表达式，字段名符合这个正则表达式的字段将成为纯数据字段，示例代码如下：

```JavaScript
Component({
  options: {
    //
    pureDataPattern: /^_/
  },
  data: {
    a: true,   // 普通数据字段
    _b: true,  // 纯数据字段
  }
})
```

#### 3 使用纯数据字段改造数据监听器案例

```JavaScript
Component({
  options: {
    // 指定所有 _ 开头的数据字段为纯数据字段
    pureDataPattern: /^_/
  },
  data: {
    // 将 rgb 改造为以_开头的纯数据字段
    _rgb: {
      r: 0,
      g: 0,
      b: 0
    },
    fullColor: '0, 0, 0'
  },
})
```

### 4.1.7 组件的生命周期

小程序组件可用的全部生命周期如下表所示：

#### 1 组件全部的生命周期函数

| **生命周期函数** | **参数**     | **描述说明**                             |
| ---------------- | ------------ | ---------------------------------------- |
| created          | 无           | 在组件实例刚刚被创建时执行               |
| attached         | 无           | 在组件实例进入页面节点树时执行           |
| ready            | 无           | 在组件在视图层布局完成后执行             |
| moved            | 无           | 在组件实例被移动到节点树另一个位置时执行 |
| detached         | 无           | 在组件实例被从页面节点树移除时执行       |
| error            | Object Error | 每当组件方法抛出错误时执行               |

#### 2 组件主要的生命周期函数

在小程序组件中，最重要的生命周期函数有 3 个，分别是 created、**attached**、detached。它们各自的特点如下：

① 组件实例刚被创建好的时候，created 生命周期函数会被触发

- 此时还不能调用 setData

- 通常在这个生命周期函数中，只应该用于给组件的 this 添加一些自定义的属性字段

② 在组件完全初始化完毕、进入页面节点树后， attached 生命周期函数会被触发

- 此时， this.data 已被初始化完毕

- 这个生命周期很有用，绝大多数初始化的工作可以在这个时机进行（例如发请求获取初始数据）

③ 在组件离开页面节点树后， detached 生命周期函数会被触发

- 退出一个页面时，会触发页面内每个自定义组件的 detached 生命周期函数

- 此时适合做一些清理性质的工作

#### 3 lifetimes 节点

在小程序组件中，生命周期函数可以直接定义在 Component 构造器的第一级参数中，可以在 lifetimes 字段内进行声明（这是推荐的方式，其优先级最高）。示例代码如下：

```JavaScript
Component({
  // 推荐用法
  lifetimes: {
    attached() {}, // 在组件实例进入页面节点树时执行
    detached() {}, // 在组件实例被从页面节点树移除时执行
  },
  // 以下是旧式的定义方式
  attached() {},   // 在组件实例进入页面节点树时执行
  detached() {},   // 在组件实例被从页面节点树移除时执行
})
```

### 4.1.8 组件所在页面的生命周期

#### 1 定义

有时，自定义组件的行为依赖于页面状态的变化，此时就需要用到组件所在页面的生命周期。

例如：每当触发页面的 show 生命周期函数的时候，我们希望能够重新生成一个随机的 RGB 颜色值。

在自定义组件中，组件所在页面的生命周期函数有如下 3 个，分别是：

| **生命周期函数** | **参数**    | **描述**                     |
| ---------------- | ----------- | ---------------------------- |
| show             | 无          | 组件所在的页面被展示时执行   |
| hide             | 无          | 组件所在的页面被隐藏时执行   |
| resize           | Object Size | 组件所在的页面尺寸变化时执行 |

#### 2 pageLifetimes 节点

组件所在页面的生命周期函数，需要定义在 pageLifetimes 节点中，示例代码如下：

```JavaScript
Component({
  pageLifetimes: {
    show: function() { },  // 页面被展示
    hide: function() { },  // 页面被隐藏
    resize: function() { } // 页面尺寸变化
  }
})
```

#### 3 生成随机的RGB颜色值

```javascript
Component({
  methods: {
    // 定义随机生成 RGB 颜色函数
    _randomColor() {
      this.setData({
        _rgb: {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256)
        }
      })
    }
  },
  pageLifetimes: {
    // 在组件的生命周期函数，当组件的页面被展示就调用该函数
    show: function(){
      this._randomColor()
    }
  }
})
```

### 4.1.9 插槽

#### 1 定义

在自定义组件的 wxml 结构中，可以提供一个 <slot> 节点（插槽），用于承载组件使用者提供的 wxml 结构。

![image-20220906101723541](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209061017950.png)

#### 2 单个插槽

在小程序中，默认每个自定义组件中只允许使用一个 <slot> 进行占位，这种个数上的限制叫做单个插槽。

```JavaScript
<!-- pages/components/test>
<!-- 组件的封装者 -->
<view class="wrapper">
  <view> 这里是组件的内部节点 </view>
  <!-- 对于不确定的内容，可以使用<slot>进行占位，具体的内容由组件的使用者决定 -->
  <slot></slot>
</view>
<!-- 组件的使用者 -->
<component-tag-name>
  <!-- 这部分内容将被放置在组件<slot>的位置上 -->
  <view>这里是插入到组件slot中的内容</view>
</component-tag-name>
```

#### 3 启用多个插槽

在小程序的自定义组件中，需要使用多 <slot> 插槽时，可以在组件的 .js 文件中，通过如下方式进行启用。

示例代码如下：

```javascript
Component({
  options: {
    multipleSlots: true  // 在组件定义时的选项中启用多 slot 支持
  },
  properties: {},
  methods: {}
})
```

#### 4 定义多个插槽

可以在组件的 .wxml 中使用多个 <slot> 标签，以不同的 name 来区分不同的插槽。示例代码如下：

```JavaScript
<!-- 组件模板 -->
<view class="wrapper">
  <!-- name为before的第一个slot插槽 -->
  <slot name="before"></slot>
  <view></view>
  <!-- name为after的第二个slot插槽 -->
  <slot name="after"></slot>
</view>
```

#### 5 使用多个插槽

在使用带有多个插槽的自定义组件时，需要用 slot 属性来将节点插入到不同的 <slot> 中。示例代码如下：

```javascript
<!-- 引用组件的页面模板 -->
<component-tag-name>
  <!-- 这部分内容将被放置在组件<slot name="before">的位置上-->
  <view slot="before">这里是插入到组件slot name="before"中的内容</view>
  <!-- 这部分内容将被放置在组件<slot name="after">的位置上 -->
  <view slot="after">这里是插入到组件slot name="after"中的内容</view>
</component-tag-name>
```

### 4.1.10 父子组件之间的通信

#### 1 父子组件之间通信的3种方式

①属性绑定

- 用于父组件向子组件的指定属性设置数据，仅能设置 JSON 兼容的数据

②事件绑定

- 用于子组件向父组件传递数据，可以传递任意数据

③获取组件实例

- 父组件还可以通过 this.selectComponent() 获取子组件实例对象

- 这样就可以直接访问子组件的任意数据和方法

#### 2 属性绑定

属性绑定用于实现父向子传值，而且只能传递普通类型的数据，无法将方法传递给子组件。父组件的示例代码如下：

```javascript
// 父组件的 data 节点
data: {
  count: 0
}

// 父组件的 wxml 结构
<my-test3 count="{{count}}"></my-test3>
<view>----</view>
<view>父组件中，count值为：{{count}}</view>
```

子组件在 properties 节点中声明对应的属性并使用。示例代码如下：

```JavaScript
// 子组件的 properties 节点
properties: {
  count: Number
}

// 子组件的 wxml 结构
<text>子组件中，count值为：{{count}}</text>
```

#### 3 事件绑定

事件绑定用于实现子向父传值，可以传递任何类型的数据。使用步骤如下：

①在父组件的 js 中，定义一个函数，这个函数即将通过自定义事件的形式，传递给子组件

```JavaScript
// 在父组件中定义 syncCount 方法
// 将来，这个方法会被传递给子组件，供子组件进行调用
syncCount() {
  console.log('syncCount')
},
```

②在父组件的 wxml 中，通过自定义事件的形式，将步骤 1 中定义的函数引用，传递给子组件

```JavaScript
<!-- 使用bind：自定义事件名称（推荐：结构清晰）-->
<my-test3 count="{{count}}" bind:sync="syncCount"></my-test3>
<!-- 或在bind后面直接写上自定义事件名称 -->
<my-test3 count="{{count}}" bindsync="syncCount"></my-test3>
```

③在子组件的 js 中，通过调用 this.triggerEvent('自定义事件名称', { /* 参数对象 */ }) ，将数据发送到父组件

```JavaScript
// 子组件的wxml结构
<text>子组件中，count值为：{{count}}</text>
<button type="primary" bindtap="addCount">+1</button>

// 子组件的js代码
methods: {
  addCount() {
    this.setData({
      cout: this.properties.count + 1
    })
    // 触发自定义事件，将数值通过给父组件
    this.triggerEvent('sync', { value: this.properties.count })
  }
}
```

④在父组件的 js 中，通过 e.detail 获取到子组件传递过来的数据

```javascript
syncCount(e) {
  this.setData({
    count:e.detail.value
  })
}
```

#### 4 获取组件实例

可在父组件里调用 this.selectComponent("id或class选择器") ，获取子组件的实例对象，从而直接访问子组件的任意数据和方法。调用时需要传入一个选择器，例如 this.selectComponent(".my-component")。

```JavaScript
// wxml结构
<my-test3 count="{{count}}" bind:sync="syncCount" class="customA" id="cA"></my-test3>
<button bindtap="getChild">获取子元素</button>

getChild() { // 按键的 tap 事件处理函数
  // 切记下面参数不能传递标签选择器 'my-test3',不然返回的是 null
  const child = this.selectComponent('.customA') // 也可以传递id选择器 #cA
  child.setData({ count:child.properties.count + 1}) // 调用子组件的 setData 方法
  child.addCount() // 调用子组件的 addCount 方法
}
```

### 4.1.11 behavior

#### 1 定义

behaviors 是小程序中，用于实现组件间代码共享的特性，类似于 Vue.js 中的 “mixins”。

![image-20220906154754766](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209061547959.png)

#### 2 工作方式

每个 behavior 可以包含一组属性、数据、生命周期函数和方法。组件引用它时，它的属性、数据和方法会被合并到组件中。

每个组件可以引用多个 behavior，behavior 也可以引用其它 behavior。

#### 3 创建

调用 Behavior(Object object) 方法即可创建一个共享的 behavior 实例对象，供所有的组件使用：

```JavaScript
// behavior/my-behavior.js
// 调用behavior（）方法，创建实例对象
// 并使用 module.exports 将 behavior 实例对象共享出去
module.exports = Behavior({
  //
  properties: {},
  //
  data: { usename: 'zs' },
  //
  methods:{}
})
```

#### 4 导入并使用

在组件中，使用 require() 方法导入需要的 behavior，挂载后即可访问 behavior 中的数据或方法，示例代码如下：

```JavaScript
// 1.使用 require()导入需要的自定义behavior模块
const myBehavior = require('../../behavior/my-behavior')

Component({
  // 2.将导入的behavior实例对象，挂载到behavior数组节点中，即可生效
  behaviors: [myBehavior],
  // 组件的其他节点
})
```

#### 5 所有可用的节点

| **可用的节点** | **类型**     | **是否必填** | **描述**            |
| -------------- | ------------ | ------------ | ------------------- |
| **properties** | Object Map   | 否           | 同组件的属性        |
| data           | Object       | 否           | 同组件的数据        |
| **methods**    | Object       | 否           | 同自定义组件的方法  |
| **behaviors**  | String Array | 否           | 引入其它的 behavior |
| created        | Function     | 否           | 生命周期函数        |
| attached       | Function     | 否           | 生命周期函数        |
| ready          | Function     | 否           | 生命周期函数        |
| moved          | Function     | 否           | 生命周期函数        |
| detached       | Function     | 否           | 生命周期函数        |

#### 6 同名字段的覆盖和组合规则*

组件和它引用的 behavior 中可以包含同名的字段，此时可以参考如下 3 种同名时的处理规则：

①同名的数据字段 (data)

②同名的属性 (properties) 或方法 (methods)

③同名的生命周期函数



关于详细的覆盖和组合规则，大家可以参考微信小程序官方文档给出的说明：

https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html

## 4.2 使用 npm 包

### 4.2.1 小程序对npm的支持与限制

目前，小程序中已经支持使用 npm 安装第三方包，从而来提高小程序的开发效率。但是，在小程序中使用 npm 包有如下 3 个限制：

①不支持依赖于 Node.js 内置库的包

②不支持依赖于浏览器内置对象的包

③不支持依赖于 C++ 插件的包

总结：虽然 npm 上的包有千千万，但是能供小程序使用的包却“为数不多”。

### 4.2.2 Vant Weapp

Vant Weapp 是有赞前端团队开源的一套小程序 UI 组件库，助力开发者快速搭建小程序应用。它所使用的是 MIT 开源许可协议，对商业使用比较友好。

官方文档地址 https://youzan.github.io/vant-weapp



扫描下方的小程序二维码，体验组件库示例：

![image-20220906160452347](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209061604275.png)

#### 1 安装Vant组件库

在小程序项目中，安装 Vant 组件库主要分为如下 3 步：

①通过 npm 安装（建议指定版本为@1.3.3）

```bash
# 通过 npm 安装
npm i @vant/weapp -S --production

# 通过 yarn 安装
yarn add @vant/weapp --production

# 安装 0.x 版本
npm i vant-weapp -S --production

```

②修改 app.json

将 app.json 中的 `"style": "v2"` 去除，小程序的[新版基础组件](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#style)强行加上了许多样式，难以覆盖，不关闭将造成部分组件样式混乱。

③修改 project.config.json

开发者工具创建的项目，`miniprogramRoot` 默认为 `miniprogram`，`package.json` 在其外部，npm 构建无法正常工作。

需要手动在 `project.config.json` 内添加如下配置，使开发者工具可以正确索引到 npm 依赖的位置。

```json
{
  ...
  "setting": {
    ...
    "packNpmManually": true,
    "packNpmRelationList": [
      {
        "packageJsonPath": "./package.json",
        "miniprogramNpmDistDir": "./miniprogram/"
      }
    ]
  }
}
```

④构建 npm 包

打开微信开发者工具，点击 **工具 -> 构建 npm**，并勾选 **使用 npm 模块** 选项，构建完成后，即可引入组件。

![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209061615693.png)

⑤ typescript 支持

如果你使用 typescript 开发小程序，还需要做如下操作，以获得顺畅的开发体验。

安装 miniprogram-api-typings

```bash
# 通过 npm 安装
npm i -D miniprogram-api-typings

# 通过 yarn 安装
yarn add -D miniprogram-api-typings
```

在 tsconfig.json 中增加如下配置，以防止 tsc 编译报错

请将`path/to/node_modules/@vant/weapp`修改为项目的 `node_modules` 中 @vant/weapp 所在的目录。

```json
{
  ...
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "types": ["miniprogram-api-typings"],
    "paths": {
      "@vant/weapp/*": ["path/to/node_modules/@vant/weapp/dist/*"]
    },
    "lib": ["ES6"]
  }
}
```

详细的操作步骤，大家可以参考 Vant 官方提供的快速上手教程：

[https://youzan.github.io/vant-weapp/#/quickstart#an-zhuang](https://youzan.github.io/vant-weapp/)

#### 2  使用vant组件

安装完 Vant 组件库之后，可以在 app.json 的 usingComponents 节点中引入需要的组件，即可在 wxml 中直接使用组件。示例代码如下：

```javascript
//app.json
"UsingComponents":{
  "van-button": "@vant/weapp/button/index"
}

// 页面 wxml结构
<van-button type="primary">按钮</van-button>
```

#### 3 定制全局主题样式

Vant Weapp 使用 CSS 变量来实现定制主题。 关于 CSS 变量的基本用法，请参考 MDN 文档：

https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties

在 app.wxss 中，写入 CSS 变量，即可对全局生效：

```JavaScript
// app.wxss
Page {
  // 定制警告按钮的背景颜色和边框颜色
  --button-danger-background-color: #C00000;
  --button-danger-border-color: #D60000;
}
```

```css
// 使用
.box {
  background-color: var(--button-danger-border-color)
}
```

### 4.2.3 API Promise化

#### 1 基于回调函数的异步API缺点

默认情况下，小程序官方提供的异步 API 都是基于回调函数实现的，例如，网络请求的 API 需要按照如下的方式调用：

```JavaScript
wx.request({
  method: '',
  url:'',
  data: {},
  sucess: () => {},  // 请求成功的回调函数
  fail: () => {},    // 请求失败的回调函数
  complete: () => {} // 请求完成的回调函数
})
```

缺点：容易造成回调地狱的问题，代码的可读性、维护性差！

#### 2 API Promise 化定义

API Promise化，指的是通过额外的配置，将官方提供的、基于回调函数的异步 API，升级改造为基于 Promise 的异步 API，从而提高代码的可读性、维护性，避免回调地狱的问题。

#### 3 实现 API Promise 化

在小程序中，实现 API Promise 化主要依赖于 miniprogram-api-promise 这个第三方的 npm 包。它的安装和使用步骤如下：

```bash
npm install --save miniprogram-api-promise@1.0.4
```

```JavaScript
// 在小程序入口文件中（app.js）只需要调用一次 promisefyAll()方法
// 即可实现异步 API 的 Promise 化
import { promisefyAll } from 'miniprogram-api-promise'

const wxp= wx.p = {}
// promisefy all wx's api
promisefyAll(wx,wxp)
```

#### 4 调用 API Promise 化之后的异步API

```javascript
// 页面的 wxml结构
<van-button type="danger" bindtap="getInfo">vant按钮</van-button>

// 在页面的 js文件中，定义对应的tap事件处理函数
async getInfo() {
  const { data: res } = await wx.p.request({
    method:'GET',
    url:'https://wwww.escook.cn/api/get',
    data: { name: 'zs', age:20 }
  })
  console.log(res)
}
```

## 4.3 全局数据共享

### 4.3.1 定义

全局数据共享（又叫做：状态管理）是为了解决组件之间数据共享的问题。

开发中常用的全局数据共享方案有：Vuex、Redux、MobX 等。

![image-20220906170417811](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209061704566.png)

### 4.3.2 小程序中的全局数据共享方案

在小程序中，可使用 mobx-miniprogram 配合 mobx-miniprogram-bindings 实现全局数据共享。其中：

lmobx-miniprogram 用来创建 Store 实例对象

lmobx-miniprogram-bindings 用来把 Store 中的共享数据或方法，绑定到组件或页面中使用

### 4.3.3 MobX

#### 1 安装

在项目中运行如下的命令，安装 MobX 相关的包：

```bash
npm install --save mbx-miniprogram@4.13.2 mobx-miniprogram-bindings@1.2.1
```

注意：MobX 相关的包安装完毕之后，记得删除 miniprogram_npm 目录后，重新构建 npm。

#### 2 创建 MobX 的 Store 实例

```JavaScript
import { observale,action } from 'mobx-miniprogram'

export const store = observable({
  // 数据字段
  numA: 1,
  numB: 2,
  // 计算属性
  get sum() {
    return this.numA + this.numB
  }
  // actions 方法，用来修改 store 中的数据
  updateNum1: action(function(step) {
    this.numA += step
  }),
  updateNum2: action(function(step) {
    this.numB += step
  })
})
```

#### 3 将 Store 中的成员绑定到页面中

```JavaScript
// message页面的js文件
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'

Page({
  onLoad: function () { // 生命周期函数--监听页面加载
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['numA','numB','sum'],
      actions: ['updateNum1']
    })
  },
  onUnload: function () {  // 生命周期函数--监听页面卸载
    this.storeBindings.destoryStoreBindings()
  }
})
```

#### 4 在页面上使用Store中的成员

```JavaScript
// 页面的 wxml 结构
<view>{{numA}} + {{numB}} = {{sum}} </view>
<van-button type="primary" bindtap="btnHandler" data-step="{{1}}"> numA + 1 </van-button>
<van-button type="danger" bindtap="btnHandler" data-step="{{-1}}"> numA - 1 </van-button>

// 按钮 tap 事件的处理函数
btnHandler(e) {
  this.updateNum1(e.target.dataset.step)
}
```

#### 5 将Store中的成员绑定到组件中

```JavaScript
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'

Component({
  behaviors: [storeBindingsBehavior],  //通过 storeBindingsBehavior 来实现自动绑定

  storeBindings: {
    store,     // 指定要绑定的 Store
    fields: {  // 指定要绑定的字段数据
      numA: () => store.numA,       // 绑定字段的第1种方式
      numB: (store) => store.numB,  // 绑定字段的第2种方式
      sum: 'sum'                    // 绑定字段的第3种方式
    },
    actions: {  // 指定要绑定的方法
      updataNum2: 'updataNum2'
    }
  }
})
```

#### 6 在组件中使用 Store 中的成员

```javascript
// 页面的 wxml 结构
<view>{{numA}} + {{numB}} = {{sum}}</view>
<van-button type="primary" bindtap="btnHandler1" data-step="{{1}}"> numA + 1 </van-button>
<van-button type="danger" bindtap="btnHandler2" data-step="{{-1}}"> numA - 1 </van-button>

// 组件的方法列表
method: {
  btnHandler2(e) {
    this.updateNum2(e.target.dataset.step)
  }
}
```

## 4.4 分包

### 4.4.1 定义

分包指的是把一个完整的小程序项目，按照需求划分为不同的子包，在构建时打包成不同的分包，用户在使用时按需进行加载。

### 4.4.2 好处

对小程序进行分包的好处主要有以下两点：

- 可以优化小程序首次启动的下载时间

- 在多团队共同开发时可以更好的解耦协作

### 4.4.3 分包前项目

分包前，小程序项目中所有的页面和资源都被打包到了一起，导致整个项目体积过大，影响小程序首次启动的下载时间。

![image-20220906200710829](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209062007070.png)

### 4.4.4 分包后项目的构成

分包后，小程序项目由 1 个主包 + 多个分包组成：

- 主包：一般只包含项目的启动页面或 TabBar 页面、以及所有分包都需要用到的一些公共资源

- 分包：只包含和当前分包有关的页面和私有资源

![image-20220906200744016](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209062007985.png)

### 4.4.5 分包的加载规律

①在小程序启动时，默认会下载主包并启动主包内页面

- tabBar 页面需要放到主包中

②当用户进入分包内某个页面时，客户端会把对应分包下载下来，下载完成后再进行展示

- 非 tabBar 页面可以按照功能的不同，划分为不同的分包之后，进行按需下载

### 4.4.6 分包的体积限制

目前，小程序分包的大小有以下两个限制：

- 整个小程序所有分包大小不超过 16M（主包 + 所有分包）

- 单个分包/主包大小不能超过 2M

### 4.4.7 使用分包

#### 1 配置方法

![image-20220906201159656](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209062012286.png)

#### 2 打包原则

①小程序会按 subpackages 的配置进行分包，subpackages 之外的目录将被打包到主包中

②主包也可以有自己的 pages（即最外层的 pages 字段）

③**tabBar 页面必须在主包内**

④分包之间不能互相嵌套

#### 3 引用原则

①主包无法引用分包内的私有资源

②分包之间不能相互引用私有资源

③分包可以引用主包内的公共资源

### 4.4.8 独立分包

#### 1 定义

独立分包本质上也是分包，只不过它比较特殊，可以独立于主包和其他分包而单独运行。

![image-20220906201242907](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209062012829.png)

#### 2 区别

最主要的区别：是否依赖于主包才能运行

- 普通分包必须依赖于主包才能运行

- 独立分包可以在不下载主包的情况下，独立运行

#### 3 应用场景

开发者可以按需，将某些具有一定功能独立性的页面配置到独立分包中。原因如下：

- 当小程序从普通的分包页面启动时，需要首先下载主包

- 而独立分包不依赖主包即可运行，可以很大程度上提升分包页面的启动速度



注意：一个小程序中可以有多个独立分包。

#### 4 配置方法

![image-20220906201423768](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209062014506.png)

#### 5 引用原则

独立分包和普通分包以及主包之间，是相互隔绝的，不能相互引用彼此的资源！例如：

①主包无法引用独立分包内的私有资源

②独立分包之间，不能相互引用私有资源

③独立分包和普通分包之间，不能相互引用私有资源

④**特别注意：**独立分包中不能引用主包内的公共资源

### 4.4.9 分包预下载

#### 1 定义

分包预下载指的是：在进入小程序的某个页面时，由框架自动预下载可能需要的分包，从而提升进入后续分包页面时的启动速度。

#### 2 配置

预下载分包的行为，会在进入指定的页面时触发。在 app.json 中，使用 preloadRule 节点定义分包的预下载规则，示例代码如下：

```JavaScript
{
  "preloadRule": {
    "Pages/contact/contact": {
      // network 表示在指定的网络模式下进行预下载
      // 可选值为：all（不限网络）和 wifi（仅wifi模式下进行预下载）
      // 默认值为：wifi
      "network": "all",
      // packages 表示进入页面后，预下载哪些分包
      // 可以通过 root 或 name 指定预下载哪些分包
      "packages": ["pkgA"]
    }
  }
}
```

#### 3 分包预下载的限制

同一个分包中的页面享有共同的预下载大小限额 2M，例如：

![image-20220906201859248](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209062019310.png)



## 4.5 案例 - 自定义 tabBar

自定义 tabBar 分为 3 大步骤，分别是：

①配置信息

```JavaScript
{
  ... // 其中list不能删除
  "tabBar": {
    "custom": true,
    "list": [
      {
        "pagePath": "pages/home/home",
        "text": "首页",
        "iconPath": "/images/tabs/home.png",
        "selectedIconPath": "/images/tabs/home-active.png"
      },
      {
        "pagePath": "pages/message/message",
        "text": "消息",
        "iconPath": "/images/tabs/message.png",
        "selectedIconPath": "/images/tabs/message-active.png"
         info: 0
      },
      {
        "pagePath": "pages/contact/contact",
        "text": "联系我们",
        "iconPath": "/images/tabs/contact.png",
        "selectedIconPath": "/images/tabs/contact-active.png"
      }
    ]
  }
}
```

②添加 tabBar 代码文件

在代码根目录下添加入口文件:

```text
custom-tab-bar/index.js
custom-tab-bar/index.json
custom-tab-bar/index.wxml
custom-tab-bar/index.wxss
```

③编写 tabBar 代码

用自定义组件的方式编写即可，该自定义组件完全接管 tabBar 的渲染。另外，自定义组件新增 `getTabBar` 接口，可获取当前页面下的自定义 tabBar 组件实例。

```javascript
<!--custom-tab-bar/index.wxml-->
<van-tabbar active="{{active}}" bind:change="onChange" active-color="#13A7A0">
	<van-tabbar-item wx:for="{{list}}" wx:key="index" info="{{item.info ? item.info : ''}}">
		<image slot="icon" src="{{item.iconPath}}" mode="aspectFit" style="width: 25px; height: 25px;" />
		<image slot="icon-active" src="{{item.selectedIconPath}}" mode="aspectFit" style="width: 25px; height: 25px;" />
		{{item.text}}
	</van-tabbar-item>
</van-tabbar>

<!-- app.json-->
  "usingComponents": {
    "van-tabbar": "@vant/weapp/tabbar/index",
    "van-tabbar-item": "@vant/weapp/tabbar-item/index"
  }
```

```javascript
// custom-tab-bar/index.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../store/store'

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      sum: 'sum',
      active: 'activeTabBarIndex'
    },
    actions: {
      updateActive: 'updateActiveTabBarIndex'
    },
  },
  observers: {
    'sum': function (val) {
      this.setData({
        'list[1].info': val
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    "list": [
      {
        "pagePath": "/pages/home/home",
        "text": "首页",
        "iconPath": "/images/tabs/home.png",
        "selectedIconPath": "/images/tabs/home-active.png"
      },
      {
        "pagePath": "/pages/message/message",
        "text": "消息",
        "iconPath": "/images/tabs/message.png",
        "selectedIconPath": "/images/tabs/message-active.png",
        info: 0
      },
      {
        "pagePath": "/pages/contact/contact",
        "text": "联系我们",
        "iconPath": "/images/tabs/contact.png",
        "selectedIconPath": "/images/tabs/contact-active.png"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      // this.setData({ active: event.detail })
      this.updateActive(event.detail)
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })
    },
  }
})
```

徽标显示：

```javascript
<van-tabbar-item wx:for="{{list}}" wx:key="index" info="{{item.info ? item.info : ''}}">
    
/* custom-tab-bar/index.wxss */
// 防止徽标超出tabBar范围
.van-tabbar-item {
  --tabbar-item-margin-bottom: 0;
}
// custom-tab-bar/index.js
Component({
  options: {
    styleIsolation: 'shared'
  },
})
```

动态绑定徽标：

```javascript
// custom-tab-bar/index.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../store/store'

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      sum: 'sum',
      active: 'activeTabBarIndex'
    }
  },
  observers: {
    'sum': function (val) {
      this.setData({
        'list[1].info': val
      })
    }
  }
})
```

实现页面切换：

```javascript
// custom-tab-bar/index.js
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      // this.setData({ active: event.detail })
      this.updateActive(event.detail)
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })
    },
  }
```

```javascript
// 在这个 JS 文件中，专门来创建 Store 的实例对象
import { observable, action } from 'mobx-miniprogram'

export const store = observable({
  activeTabBarIndex: 0,
  updateActiveTabBarIndex: action(function(index) {
    this.activeTabBarIndex = index
  })
})

// custom-tab-bar/index.js
  storeBindings: {
    store,
    fields: {
      sum: 'sum',
      active: 'activeTabBarIndex'
    },
    actions: {
      updateActive: 'updateActiveTabBarIndex'
    },
  },
```



详细步骤，可以参考小程序官方给出的文档：

https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html



# 5 项目

## 5.1 基础知识

### 5.1.1 uni-app 简介

uni-app 是一个使用 Vue.js 开发所有前端应用的框架。开发者编写一套代码，可发布到 iOS、Android、 H5、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。

![image-20220908074602223](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209080806773.png)

> 详细的 uni-app 官方文档，请翻阅 https://uniapp.dcloud.net.cn

### 5.1.2 开发工具

uni-app 官方推荐使用 HBuilderX 来开发 uni-app 类型的项目。主要好处： 

- 模板丰富 
- 完善的智能提示 
- 一键运行

> 当然，你依然可以根据自己的喜好，选择使用 VS Code、Sublime、记事本... 等自己喜欢的编辑器！

#### 1 下载 HBuilderX

1. 访问 HBuilderX 的官网首页 https://www.dcloud.io/hbuilderx.html  
2. 点击首页的 DOWNLOAD 按钮 
3. 选择下载 正式版 -> App 开发版

#### 2 安装 HBuilderX

1. 将下载的 zip包 进行解压缩 
2. 将解压之后的文件夹，存放到纯英文的目录中（且不能包含括号等特殊字符） 
3. 双击 HBuilderX.exe 即可启动 HBuilderX

#### 3 安装 scss/sass 编译

为了方便编写样式（例如：<style lang="scss"></style> ），建议安装 scss/sass 编译 插 件。插件下载地址：

> https://ext.dcloud.net.cn/plugin?name=compile-node-sass

进入插件下载页面之后，点击右上角的 使用 HBuilderX 导入插件 按钮进行自动安装，截图如下：

![image-20220908075451098](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209080754098.png)

#### 4 快捷键方案切换

操作步骤：工具 -> 预设快捷键方案切换 -> VS Code

#### 5 修改编辑器的基本设置

操作步骤：工具 -> 设置 -> 打开 Settings.json 按需进行配置

```javascript
{
  "editor.colorScheme": "Default",
  "editor.fontSize": 12,
  "editor.fontFamily": "Consolas",
  "editor.fontFmyCHS": "微软雅黑 Light",
  "editor.insertSpaces": true,
  "editor.lineHeight": "1.5",
  "editor.minimap.enabled": false,
  "editor.mouseWheelZoom": true,
  "editor.onlyHighlightWord": false,
  "editor.tabSize": 2,
  "editor.wordWrap": true,
  "explorer.iconTheme": "vs-seti",
  "editor.codeassist.px2rem.enabel": false,
  "editor.codeassist.px2upx.enabel": false
}
```

>  Tips：可以使用 Ctrl + 鼠标滚轮 缩放编辑器

5.1.3  新建 uni-app 项目

#### 1 文件 -> 新建 -> 项目

#### 2 填写项目基本信息

![image-20220908080436711](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209080804444.png)

#### 3 项目创建成功

![image-20220908080527669](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209080805389.png)



### 5.1.3 目录结构

一个 uni-app 项目，默认包含如下目录及文件：

```text
┌─components            uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置小程序的全局样式、生命周期函数等
├─manifest.json         配置应用名称、appid、logo、版本等打包信息
└─pages.json            配置页面路径、页面窗口样式、tabBar、navigationBar 等页面类信息
```

### 5.1.4 把项目运行到微信开发者工具

#### 1 填写自己的微信小程序的 AppID

![image-20220908081033384](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209080810647.png)

#### 2 在 HBuilderX 中，配置“微信开发者工具”的**安装路径**

![image-20220908081046028](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209080810449.png)



#### 3 在微信开发者工具中，通过 `设置 -> 安全设置` 面板，开启“微信开发者工具”的**服务端口**

#### 4 在 HBuilderX 中，点击菜单栏中的 `运行 -> 运行到小程序模拟器 -> 微信开发者工具`，将当前 uni-app 项目编译之后，自动运行到微信开发者工具中，从而方便查看项目效果与调试

### 5.1.5 使用 Git 管理项目

#### 1 本地管理

在项目根目录中新建 `.gitignore` 忽略文件，并配置如下：

```text
# 忽略 node_modules 目录
/node_modules
/unpackage/dist
```

> 注意：由于我们忽略了 unpackage 目录中**仅有的** dist 目录，因此默认情况下， unpackage 目录不会被 Git 追踪

> 此时，为了让 Git 能够正常追踪 unpackage 目录，按照惯例，我们可以在 unpackage 目录下创建一个叫做 `.gitkeep` 的文件进行占位

打开终端，切换到项目根目录中，运行如下的命令，初始化本地 Git 仓库：

```bash
git init
```

将所有文件都加入到暂存区

```bash
git add .
```

本地提交更新：

```bash
git commit -m "init project"
```

#### 2 把项目托管到码云

1. 注册并激活码云账号（ 注册页面地址：https://gitee.com/signup ）
2. 生成并配置 SSH 公钥
3. 创建空白的码云仓库
4. 把本地项目上传到码云对应的空白仓库中

## 5.2 tabBar

### 5.2.0 创建 tabBar 分支

运行如下的命令，基于 master 分支在本地创建 tabBar 子分支，用来开发和 tabBar 相关的功能：

```bash
git checkout -b tabbar
```

### 5.2.1 创建 tabBar 页面

在 `pages` 目录中，创建首页(home)、分类(cate)、购物车(cart)、我的(my) 这 4 个 tabBar 页面。在 HBuilderX 中，可以通过如下的两个步骤，快速新建页面：

1. 在 `pages` 目录上鼠标右键，选择**新建页面**

2. 在弹出的窗口中，填写**页面的名称**、**勾选 scss 模板**之后，点击创建按钮。截图如下：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209080940645.png)

###  5.2.2 效果

1. 将 `资料` 目录下的 `static 文件夹` 拷贝一份，替换掉项目根目录中的 `static 文件夹`

2. 修改项目根目录中的 `pages.json` 配置文件，新增 `tabBar` 的配置节点如下：

   ```json
   {
     "tabBar": {
       "selectedColor": "#C00000",
       "list": [
         {
           "pagePath": "pages/home/home",
           "text": "首页",
           "iconPath": "static/tab_icons/home.png",
           "selectedIconPath": "static/tab_icons/home-active.png"
         },
         {
           "pagePath": "pages/cate/cate",
           "text": "分类",
           "iconPath": "static/tab_icons/cate.png",
           "selectedIconPath": "static/tab_icons/cate-active.png"
         },
         {
           "pagePath": "pages/cart/cart",
           "text": "购物车",
           "iconPath": "static/tab_icons/cart.png",
           "selectedIconPath": "static/tab_icons/cart-active.png"
         },
         {
           "pagePath": "pages/my/my",
           "text": "我的",
           "iconPath": "static/tab_icons/my.png",
           "selectedIconPath": "static/tab_icons/my-active.png"
         }
       ]
     }
   }
   ```

### 5.2.3 删除默认的 index 首页

1. 在 HBuilderX 中，把 `pages` 目录下的 `index首页文件夹` 删除掉
2. 同时，把 `page.json` 中记录的 `index 首页` 路径删除掉
3. 为了防止小程序运行失败，在微信开发者工具中，手动删除 `pages` 目录下的 `index 首页文件夹`
4. 同时，把 `components` 目录下的 `uni-link 组件文件夹` 删除掉

### 5.2.4 修改导航条的样式效果

1. 打开 `pages.json` 这个全局的配置文件

2. 修改 `globalStyle` 节点如下：

   ```json
   {
     "globalStyle": {
       "navigationBarTextStyle": "white",
       "navigationBarTitleText": "黑马优购",
       "navigationBarBackgroundColor": "#C00000",
       "backgroundColor": "#FFFFFF"
     }
   }
   ```

### 5.2.5 分支的提交与合并

1. 将本地的 tabbar 分支进行本地的 commit 提交：

```bash
git add .
git commit -m "完成了 tabBar 的开发"
```

1. 将本地的 tabbar 分支推送到远程仓库进行保存：

```bash
git push -u origin tabbar
```

1. 将本地的 tabbar 分支合并到本地的 master 分支：

```bash
git checkout master
git merge tabbar
```

1. 删除本地的 tabbar 分支：

```bash
git branch -d tabbar
```

## 5.3 首页

### 5.3.0 创建 home 分支

运行如下的命令，基于 master 分支在本地创建 home 子分支，用来开发和 home 首页相关的功能：

```bash
git checkout -b home
```

### 5.3.1 配置网络请求

由于平台的限制，小程序项目中**不支持 axios**，而且原生的 `wx.request()` API 功能较为简单，**不支持拦截器**等全局定制的功能。因此，建议在 uni-app 项目中使用 `@escook/request-miniprogram` 第三方包发起网络数据请求。

> 请参考 **@escook/request-miniprogram** 的官方文档进行安装、配置、使用

> 官方文档：https://www.npmjs.com/package/@escook/request-miniprogram

最终，在项目的 `main.js` 入口文件中，通过如下的方式进行配置：

```js
import { $http } from '@escook/request-miniprogram'

uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}
```

### 5.3.2 轮播图区域

#### 1 请求轮播图的数据

实现步骤：

1. 在 data 中定义轮播图的数组
2. 在 onLoad 生命周期函数中调用获取轮播图数据的方法
3. 在 methods 中定义获取轮播图数据的方法

示例代码：

```js
export default {
  data() {
    return {
      // 1. 轮播图的数据列表，默认为空数组
      swiperList: [],
    }
  },
  onLoad() {
    // 2. 在小程序页面刚加载的时候，调用获取轮播图数据的方法
    this.getSwiperList()
  },
  methods: {
    // 3. 获取轮播图数据的方法
    async getSwiperList() {
      // 3.1 发起请求
      const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
      // 3.2 请求失败
      if (res.meta.status !== 200) {
        return uni.showToast({
          title: '数据请求失败！',
          duration: 1500,
          icon: 'none',
        })
      }
      // 3.3 请求成功，为 data 中的数据赋值
      this.swiperList = res.message
    },
  },
}
```

#### 2 渲染轮播图的 UI 结构

1. 渲染 UI 结构：

   ```xml
   <template>
     <view>
       <!-- 轮播图区域 -->
       <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
         <!-- 循环渲染轮播图的 item 项 -->
         <swiper-item v-for="(item, i) in swiperList" :key="i">
           <view class="swiper-item">
             <!-- 动态绑定图片的 src 属性 -->
             <image :src="item.image_src"></image>
           </view>
         </swiper-item>
       </swiper>
     </view>
   </template>
   ```

2. 美化 UI 结构：

   ```scss
   <style lang="scss">
   swiper {
    height: 330rpx;
   
    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
   }
   </style>
   ```

#### 3 配置小程序分包

> 分包可以减少小程序首次启动时的加载时间

为此，我们在项目中，把 tabBar 相关的 4 个页面放到主包中，其它页面（例如：商品详情页、商品列表页）放到分包中。在 uni-app 项目中，配置分包的步骤如下：

1. 在项目根目录中，创建分包的根目录，命名为 `subpkg`

2. 在 `pages.json` 中，和 `pages` 节点平级的位置声明 `subPackages` 节点，用来定义分包相关的结构：

   ```json
   {
     "pages": [
       {
         "path": "pages/home/home",
         "style": {}
       },
       {
         "path": "pages/cate/cate",
         "style": {}
       },
       {
         "path": "pages/cart/cart",
         "style": {}
       },
       {
         "path": "pages/my/my",
         "style": {}
       }
     ],
     "subPackages": [
       {
         "root": "subpkg",
         "pages": []
       }
     ]
   }
   ```

3. 在 `subpkg` 目录上鼠标右键，点击 `新建页面` 选项，并填写页面的相关信息：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209080940653.png)

#### 4 点击轮播图跳转到商品详情页面

将 `<swiper-item></swiper-item>` 节点内的 `view` 组件，改造为 `navigator` 导航组件，并动态绑定 `url 属性` 的值。

1. 改造之前的 UI 结构：

   ```xml
   <swiper-item v-for="(item, i) in swiperList" :key="i">
     <view class="swiper-item">
       <!-- 动态绑定图片的 src 属性 -->
       <image :src="item.image_src"></image>
     </view>
   </swiper-item>
   ```

2. 改造之后的 UI 结构：

   ```xml
   <swiper-item v-for="(item, i) in swiperList" :key="i">
       <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
         <!-- 动态绑定图片的 src 属性 -->
         <image :src="item.image_src"></image>
       </navigator>
   </swiper-item>
   ```

#### 5 封装 uni.$showMsg() 方法

当数据请求失败之后，经常需要调用 `uni.showToast({ /* 配置对象 */ })` 方法来提示用户。此时，可以在全局封装一个 `uni.$showMsg()` 方法，来简化 `uni.showToast()` 方法的调用。具体的改造步骤如下：

1. 在 `main.js` 中，为 `uni` 对象挂载自定义的 `$showMsg()` 方法：

   ```js
   // 封装的展示消息提示的方法
   uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
     uni.showToast({
       title,
       duration,
       icon: 'none',
     })
   }
   ```

2. 今后，在需要提示消息的时候，直接调用 `uni.$showMsg()` 方法即可：

   ```js
   async getSwiperList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
      if (res.meta.status !== 200) return uni.$showMsg()
      this.swiperList = res.message
   }
   ```

### 5.3.3 分类导航区域

#### 1 获取分类导航的数据

实现思路：

1. 定义 data 数据
2. 在 onLoad 中调用获取数据的方法
3. 在 methods 中定义获取数据的方法

示例代码如下：

```js
export default {
  data() {
    return {
      // 1. 分类导航的数据列表
      navList: [],
    }
  },
  onLoad() {
    // 2. 在 onLoad 中调用获取数据的方法
    this.getNavList()
  },
  methods: {
    // 3. 在 methods 中定义获取数据的方法
    async getNavList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
      if (res.meta.status !== 200) return uni.$showMsg()
      this.navList = res.message
    },
  },
}
```

#### 2 渲染分类导航的 UI 结构

1. 定义如下的 UI 结构：

   ```xml
   <!-- 分类导航区域 -->
   <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
   </view>
   ```

2. 通过如下的样式美化页面结构：

   ```scss
   .nav-list {
     display: flex;
     justify-content: space-around;
     margin: 15px 0;
   
     .nav-img {
       width: 128rpx;
       height: 140rpx;
     }
   }
   ```

#### 3 点击第一项，切换到分类页面

1. 为 `nav-item` 绑定点击事件处理函数：

   ```js
   <!-- 分类导航区域 -->
   <view class="nav-list">
     <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
       <image :src="item.image_src" class="nav-img"></image>
     </view>
   </view>
   ```

2. 定义 `navClickHandler` 事件处理函数：

   ```js
   // nav-item 项被点击时候的事件处理函数
   navClickHandler(item) {
     // 判断点击的是哪个 nav
     if (item.name === '分类') {
       uni.switchTab({
         url: '/pages/cate/cate'
       })
     }
   }
   ```

### 5.3.4 楼层区域

#### 1 获取楼层数据

实现思路：

1. 定义 data 数据
2. 在 onLoad 中调用获取数据的方法
3. 在 methods 中定义获取数据的方法

示例代码如下：

```js
export default {
  data() {
    return {
      // 1. 楼层的数据列表
      floorList: [],
    }
  },
  onLoad() {
    // 2. 在 onLoad 中调用获取楼层数据的方法
    this.getFloorList()
  },
  methods: {
    // 3. 定义获取楼层列表数据的方法
    async getFloorList() {
      const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
      if (res.meta.status !== 200) return uni.$showMsg()
      this.floorList = res.message
    },
  },
}
```

#### 2 渲染楼层的标题

1. 定义如下的 UI 结构：

   ```xml
   <!-- 楼层区域 -->
   <view class="floor-list">
     <!-- 楼层 item 项 -->
     <view class="floor-item" v-for="(item, i) in floorList" :key="i">
       <!-- 楼层标题 -->
       <image :src="item.floor_title.image_src" class="floor-title"></image>
     </view>
   </view>
   ```

2. 美化楼层标题的样式：

   ```scss
   .floor-title {
     height: 60rpx;
     width: 100%;
     display: flex;
   }
   ```

#### 3 渲染楼层里的图片

1. 定义楼层图片区域的 UI 结构：

   ```xml
   <!-- 楼层图片区域 -->
   <view class="floor-img-box">
     <!-- 左侧大图片的盒子 -->
     <view class="left-img-box">
       <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
     </view>
     <!-- 右侧 4 个小图片的盒子 -->
     <view class="right-img-box">
       <view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
         <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
       </view>
     </view>
   </view>
   ```

2. 美化楼层图片区域的样式：

   ```scss
   .right-img-box {
     display: flex;
     flex-wrap: wrap;
     justify-content: space-around;
   }
   
   .floor-img-box {
     display: flex;
     padding-left: 10rpx;
   }
   ```

#### 4 点击楼层图片跳转到商品列表页

1. 在 `subpkg` 分包中，新建 `goods_list` 页面

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209080940211.png)

2. 楼层数据请求成功之后，通过双层 `forEach` 循环，处理 URL 地址：

   ```js
   // 获取楼层列表数据
   async getFloorList() {
     const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
     if (res.meta.status !== 200) return uni.$showMsg()
   
     // 通过双层 forEach 循环，处理 URL 地址
     res.message.forEach(floor => {
       floor.product_list.forEach(prod => {
         prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
       })
     })
   
     this.floorList = res.message
   }
   ```

3. 把图片外层的 `view` 组件，改造为 `navigator` 组件，并动态绑定 `url 属性` 的值：

   ```xml
   <!-- 楼层图片区域 -->
   <view class="floor-img-box">
     <!-- 左侧大图片的盒子 -->
     <navigator class="left-img-box" :url="item.product_list[0].url">
       <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
     </navigator>
     <!-- 右侧 4 个小图片的盒子 -->
     <view class="right-img-box">
       <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
         <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
       </navigator>
     </view>
   </view>
   ```

### 5.3.5 分支的合并与提交

1. 将本地的 home 分支进行本地的 commit 提交：

   ```bash
   git add .
   git commit -m "完成了 home 首页的开发"
   ```

2. 将本地的 home 分支推送到远程仓库进行保存：

   ```bash
   git push -u origin home
   ```

3. 将本地的 home 分支合并到本地的 master 分支：

   ```bash
   git checkout master
   git merge home
   ```

4. 删除本地的 home 分支：

   ```bash
   git branch -d home
   ```

## 5.4 分类

### 5.4.0 创建 cate 分支

运行如下的命令，基于 master 分支在本地创建 cate 子分支，用来开发分类页面相关的功能：

```bash
git checkout -b cate
```

### 5.4.1 渲染分类页面的基本结构

1. 定义页面结构如下：

   ```xml
   <template>
     <view>
       <view class="scroll-view-container">
         <!-- 左侧的滚动视图区域 -->
         <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
           <view class="left-scroll-view-item active">xxx</view>
           <view class="left-scroll-view-item">xxx</view>
           <view class="left-scroll-view-item">xxx</view>
           <view class="left-scroll-view-item">xxx</view>
           <view class="left-scroll-view-item">xxx</view>
           <view class="left-scroll-view-item">多复制一些节点，演示纵向滚动效果...</view>
         </scroll-view>
         <!-- 右侧的滚动视图区域 -->
         <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}">
           <view class="left-scroll-view-item">zzz</view>
           <view class="left-scroll-view-item">zzz</view>
           <view class="left-scroll-view-item">zzz</view>
           <view class="left-scroll-view-item">zzz</view>
           <view class="left-scroll-view-item">多复制一些节点，演示纵向滚动效果</view>
         </scroll-view>
       </view>
     </view>
   </template>
   ```

2. 动态计算窗口的剩余高度：

   ```js
   <script>
     export default {
       data() {
         return {
           // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
           wh: 0
         };
       },
       onLoad() {
         // 获取当前系统的信息
         const sysInfo = uni.getSystemInfoSync()
         // 为 wh 窗口可用高度动态赋值
         this.wh = sysInfo.windowHeight
       }
     }
   </script>
   ```

3. 美化页面结构：

   ```scss
   .scroll-view-container {
     display: flex;
   
     .left-scroll-view {
       width: 120px;
   
       .left-scroll-view-item {
         line-height: 60px;
         background-color: #f7f7f7;
         text-align: center;
         font-size: 12px;
   
         // 激活项的样式
         &.active {
           background-color: #ffffff;
           position: relative;
   
           // 渲染激活项左侧的红色指示边线
           &::before {
             content: ' ';
             display: block;
             width: 3px;
             height: 30px;
             background-color: #c00000;
             position: absolute;
             left: 0;
             top: 50%;
             transform: translateY(-50%);
           }
         }
       }
     }
   }
   ```

### 5.4.2 获取分类数据

1. 在 data 中定义分类数据节点：

   ```js
   data() {
     return {
       // 分类数据列表
       cateList: []
     }
   }
   ```

2. 调用获取分类列表数据的方法：

   ```js
   onLoad() {
     // 调用获取分类列表数据的方法
     this.getCateList()
   }
   ```

3. 定义获取分类列表数据的方法：

   ```js
   methods: {
     async getCateList() {
       // 发起请求
       const { data: res } = await uni.$http.get('/api/public/v1/categories')
       // 判断是否获取失败
       if (res.meta.status !== 200) return uni.$showMsg()
       // 转存数据
       this.cateList = res.message
     }
   }
   ```

### 5.4.3 动态渲染左侧的一级分类列表

1. 循环渲染列表结构：

   ```xml
   <!-- 左侧的滚动视图区域 -->
   <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
     <block v-for="(item, i) in cateList" :key="i">
       <view class="left-scroll-view-item">{{item.cat_name}}</view>
     </block>
   </scroll-view>
   ```

2. 在 data 中定义默认选中项的索引：

   ```js
   data() {
     return {
       // 当前选中项的索引，默认让第一项被选中
       active: 0
     }
   }
   ```

3. 循环渲染结构时，为选中项动态添加 `.active` 类名：

   ```xml
   <block v-for="(item, i) in cateList" :key="i">
     <view :class="['left-scroll-view-item', i === active ? 'active' : '']">{{item.cat_name}}</view>
   </block>
   ```

4. 为一级分类的 Item 项绑定点击事件处理函数 `activeChanged`：

   ```xml
   <block v-for="(item, i) in cateList" :key="i">
     <view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">{{item.cat_name}}</view>
   </block>
   ```

5. 定义 `activeChanged` 事件处理函数，动态修改选中项的索引：

   ```js
   methods: {
     // 选中项改变的事件处理函数
     activeChanged(i) {
       this.active = i
     }
   }
   ```

### 5.4.4 动态渲染右侧的二级分类列表

1. 在 `data` 中定义二级分类列表的数据节点：

   ```js
   data() {
     return {
       // 二级分类列表
       cateLevel2: []
     }
   }
   ```

2. 修改 `getCateList` 方法，在请求到数据之后，为二级分类列表数据赋值：

   ```js
   async getCateList() {
     const { data: res } = await uni.$http.get('/api/public/v1/categories')
     if (res.meta.status !== 200) return uni.$showMsg()
     this.cateList = res.message
     // 为二级分类赋值
     this.cateLevel2 = res.message[0].children
   }
   ```

3. 修改 `activeChanged` 方法，在一级分类选中项改变之后，为二级分类列表数据重新赋值：

   ```js
   activeChanged(i) {
     this.active = i
     // 为二级分类列表重新赋值
     this.cateLevel2 = this.cateList[i].children
   }
   ```

4. 循环渲染右侧二级分类列表的 UI 结构：

   ```xml
   <!-- 右侧的滚动视图区域 -->
   <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}">
     <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
       <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
     </view>
   </scroll-view>
   ```

5. 美化二级分类的标题样式：

   ```scss
   .cate-lv2-title {
     font-size: 12px;
     font-weight: bold;
     text-align: center;
     padding: 15px 0;
   }
   ```

### 5.4.5 动态渲染右侧的三级分类列表

1. 在二级分类的 `<view>` 组件中，循环渲染三级分类的列表结构：

   ```xml
   <!-- 右侧的滚动视图区域 -->
   <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}">
     <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
       <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
       <!-- 动态渲染三级分类的列表数据 -->
       <view class="cate-lv3-list">
         <!-- 三级分类 Item 项 -->
         <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3">
           <!-- 图片 -->
           <image :src="item3.cat_icon"></image>
           <!-- 文本 -->
           <text>{{item3.cat_name}}</text>
         </view>
       </view>
     </view>
   </scroll-view>
   ```

2. 美化三级分类的样式：

   ```scss
   .cate-lv3-list {
     display: flex;
     flex-wrap: wrap;
   
     .cate-lv3-item {
       width: 33.33%;
       margin-bottom: 10px;
       display: flex;
       flex-direction: column;
       align-items: center;
   
       image {
         width: 60px;
         height: 60px;
       }
   
       text {
         font-size: 12px;
       }
     }
   }
   ```

### 5.4.6 切换一级分类后重置滚动条的位置

1. 在 data 中定义 `滚动条距离顶部的距离`：

   ```js
   data() {
     return {
       // 滚动条距离顶部的距离
       scrollTop: 0
     }
   }
   ```

2. 动态为右侧的 `<scroll-view>` 组件绑定 `scroll-top` 属性的值：

   ```xml
   <!-- 右侧的滚动视图区域 -->
   <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop"></scroll-view>
   ```

3. 切换一级分类时，动态设置 `scrollTop` 的值：

   ```js
   // 选中项改变的事件处理函数
   activeChanged(i) {
     this.active = i
     this.cateLevel2 = this.cateList[i].children
   
     // 让 scrollTop 的值在 0 与 1 之间切换
     this.scrollTop = this.scrollTop === 0 ? 1 : 0
   
     // 可以简化为如下的代码：
     // this.scrollTop = this.scrollTop ? 0 : 1
   }
   ```

### 5.4.7 点击三级分类跳转到商品列表页面

1. 为三级分类的 Item 项绑定点击事件处理函数如下：

   ```xml
   <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
     <image :src="item3.cat_icon"></image>
     <text>{{item3.cat_name}}</text>
   </view>
   ```

2. 定义事件处理函数如下：

   ```js
   // 点击三级分类项跳转到商品列表页面
   gotoGoodsList(item3) {
     uni.navigateTo({
       url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
     })
   }
   ```

### 5.4.8 分支的合并与提交

1. 将 `cate` 分支进行本地提交：

   ```bash
   git add .
   git commit -m "完成了分类页面的开发"
   ```

2. 将本地的 `cate` 分支推送到码云：

   ```bash
   git push -u origin cate
   ```

3. 将本地 `cate` 分支中的代码合并到 `master` 分支：

   ```bash
   git checkout master
   git merge cate
   git push
   ```

4. 删除本地的 `cate` 分支：

   ```bash
   git branch -d cate
   ```

## 5.5 搜索

### 5.5.0 创建 search 分支

运行如下的命令，基于 master 分支在本地创建 search 子分支，用来开发搜索相关的功能：

```bash
git checkout -b search
```

### 5.5.1 自定义搜索组件

#### 1 自定义 my-search 组件

1. 在项目根目录的 `components` 目录上，鼠标右键，选择 `新建组件`，填写组件信息后，最后点击 `创建` 按钮：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209080931115.png)

2. 在分类页面的 UI 结构中，直接以标签的形式使用 `my-search` 自定义组件：

   ```xml
   <!-- 使用自定义的搜索组件 -->
   <my-search></my-search>
   ```

3. 定义 `my-search` 组件的 UI 结构如下：

   ```xml
   <template>
     <view class="my-search-container">
       <!-- 使用 view 组件模拟 input 输入框的样式 -->
       <view class="my-search-box">
         <uni-icons type="search" size="17"></uni-icons>
         <text class="placeholder">搜索</text>
       </view>
     </view>
   </template>
   ```

   > 注意：在当前组件中，我们使用 view 组件模拟 input 输入框的效果；并不会在页面上渲染真正的 input 输入框

4. 美化自定义 search 组件的样式：

   ```scss
   .my-search-container {
     background-color: #c00000;
     height: 50px;
     padding: 0 10px;
     display: flex;
     align-items: center;
   }
   
   .my-search-box {
     height: 36px;
     background-color: #ffffff;
     border-radius: 15px;
     width: 100%;
     display: flex;
     align-items: center;
     justify-content: center;
   
     .placeholder {
       font-size: 15px;
       margin-left: 5px;
     }
   }
   ```

5. 由于自定义的 `my-search` 组件高度为 `50px`，因此，需要重新计算分类页面窗口的可用高度：

   ```js
   onLoad() {
     const sysInfo = uni.getSystemInfoSync()
     // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
     this.wh = sysInfo.windowHeight - 50
   }
   ```

#### 2 通过自定义属性增强组件的通用性

为了增强组件的通用性，我们允许使用者自定义搜索组件的 `背景颜色` 和 `圆角尺寸`。

1. 通过 `props` 定义 `bgcolor` 和 `radius` 两个属性，并指定值类型和属性默认值：

   ```js
   props: {
     // 背景颜色
     bgcolor: {
       type: String,
       default: '#C00000'
     },
     // 圆角尺寸
     radius: {
       type: Number,
       // 单位是 px
       default: 18
     }
   }
   ```

2. 通过属性绑定的形式，为 `.my-search-container` 盒子和 `.my-search-box` 盒子动态绑定 `style` 属性：

   ```xml
   <view class="my-search-container" :style="{'background-color': bgcolor}">
     <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
       <uni-icons type="search" size="17"></uni-icons>
       <text class="placeholder">搜索</text>
     </view>
   </view>
   ```

3. 移除对应 `scss` 样式中的 `背景颜色` 和 `圆角尺寸`：

   ```scss
   .my-search-container {
     // 移除背景颜色，改由 props 属性控制
     // background-color: #C00000;
     height: 50px;
     padding: 0 10px;
     display: flex;
     align-items: center;
   }
   
   .my-search-box {
     height: 36px;
     background-color: #ffffff;
     // 移除圆角尺寸，改由 props 属性控制
     // border-radius: 15px;
     width: 100%;
     display: flex;
     align-items: center;
     justify-content: center;
   
     .placeholder {
       font-size: 15px;
       margin-left: 5px;
     }
   }
   ```

#### 3 为自定义组件封装 click 事件

1. 在 `my-search` 自定义组件内部，给类名为 `.my-search-box` 的 `view` 绑定 `click` 事件处理函数：

   ```xml
   <view class="my-search-box" :style="{'border-radius': radius + 'px'}" @click="searchBoxHandler">
     <uni-icons type="search" size="17"></uni-icons>
     <text class="placeholder">搜索</text>
   </view>
   ```

2. 在 `my-search` 自定义组件的 `methods` 节点中，声明事件处理函数如下：

   ```js
   methods: {
     // 点击了模拟的 input 输入框
     searchBoxHandler() {
       // 触发外界通过 @click 绑定的 click 事件处理函数
       this.$emit('click')
     }
   }
   ```

3. 在分类页面中使用 `my-search` 自定义组件时，即可通过 `@click` 为其绑定点击事件处理函数：

   ```xml
   <!-- 使用自定义的搜索组件 -->
   <my-search @click="gotoSearch"></my-search>
   ```

   同时在分类页面中，定义 `gotoSearch` 事件处理函数如下：

   ```js
   methods: {
      // 跳转到分包中的搜索页面
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
   }
   ```

#### 4 实现首页搜索组件的吸顶效果

1. 在 home 首页定义如下的 UI 结构：

   ```xml
   <!-- 使用自定义的搜索组件 -->
   <view class="search-box">
     <my-search @click="gotoSearch"></my-search>
   </view>
   ```

2. 在 home 首页定义如下的事件处理函数：

   ```js
   gotoSearch() {
     uni.navigateTo({
       url: '/subpkg/search/search'
     })
   }
   ```

3. 通过如下的样式实现吸顶的效果：

   ```scss
   .search-box {
     // 设置定位效果为“吸顶”
     position: sticky;
     // 吸顶的“位置”
     top: 0;
     // 提高层级，防止被轮播图覆盖
     z-index: 999;
   }
   ```

### 5.5.2 搜索建议

#### 1 渲染搜索页面的基本结构

1. 定义如下的 UI 结构：

   ```xml
   <view class="search-box">
     <!-- 使用 uni-ui 提供的搜索组件 -->
     <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
   </view>
   ```

2. 修改 `components -> uni-search-bar -> uni-search-bar.vue` 组件，将默认的白色搜索背景改为 `#C00000` 的红色背景：

   ```css
   .uni-searchbar {
     /* #ifndef APP-NVUE */
     display: flex;
     /* #endif */
     flex-direction: row;
     position: relative;
     padding: 16rpx;
     /* 将默认的 #FFFFFF 改为 #C00000 */
     background-color: #c00000;
   }
   ```

3. 实现搜索框的吸顶效果：

   ```scss
   .search-box {
     position: sticky;
     top: 0;
     z-index: 999;
   }
   ```

4. 定义如下的 input 事件处理函数：

   ```js
   methods: {
     input(e) {
       // e.value 是最新的搜索内容
       console.log(e.value)
     }
   }
   ```

#### 2 实现搜索框自动获取焦点

1. 修改 `components -> uni-search-bar -> uni-search-bar.vue` 组件，把 data 数据中的 `show` 和 `showSync` 的值，从默认的 `false` 改为 `true` 即可：

   ```js
   data() {
     return {
       show: true,
       showSync: true,
       searchVal: ""
     }
   }
   ```

2. 使用手机扫码预览，即可在真机上查看效果。

#### 3 实现搜索框的防抖处理

1. 在 data 中定义防抖的延时器 timerId 如下：

   ```js
   data() {
     return {
       // 延时器的 timerId
       timer: null,
       // 搜索关键词
       kw: ''
     }
   }
   ```

2. 修改 `input` 事件处理函数如下：

   ```js
   input(e) {
     // 清除 timer 对应的延时器
     clearTimeout(this.timer)
     // 重新启动一个延时器，并把 timerId 赋值给 this.timer
     this.timer = setTimeout(() => {
       // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
       this.kw = e.value
       console.log(this.kw)
     }, 500)
   }
   ```

#### 4 根据关键词查询搜索建议列表

1. 在 data 中定义如下的数据节点，用来存放搜索建议的列表数据：

   ```js
   data() {
     return {
       // 搜索结果列表
       searchResults: []
     }
   }
   ```

2. 在防抖的 `setTimeout` 中，调用 `getSearchList` 方法获取搜索建议列表：

   ```js
   this.timer = setTimeout(() => {
     this.kw = e.value
     // 根据关键词，查询搜索建议列表
     this.getSearchList()
   }, 500)
   ```

3. 在 `methods` 中定义 `getSearchList` 方法如下：

   ```js
   // 根据搜索关键词，搜索商品建议列表
   async getSearchList() {
     // 判断关键词是否为空
     if (this.kw === '') {
       this.searchResults = []
       return
     }
     // 发起请求，获取搜索建议列表
     const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
     if (res.meta.status !== 200) return uni.$showMsg()
     this.searchResults = res.message
   }
   ```

#### 5 渲染搜索建议列表

1. 定义如下的 UI 结构：

   ```xml
   <!-- 搜索建议列表 -->
   <view class="sugg-list">
     <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
       <view class="goods-name">{{item.goods_name}}</view>
       <uni-icons type="arrowright" size="16"></uni-icons>
     </view>
   </view>
   ```

2. 美化搜索建议列表：

   ```scss
   .sugg-list {
     padding: 0 5px;
   
     .sugg-item {
       font-size: 12px;
       padding: 13px 0;
       border-bottom: 1px solid #efefef;
       display: flex;
       align-items: center;
       justify-content: space-between;
   
       .goods-name {
         // 文字不允许换行（单行文本）
         white-space: nowrap;
         // 溢出部分隐藏
         overflow: hidden;
         // 文本溢出后，使用 ... 代替
         text-overflow: ellipsis;
         margin-right: 3px;
       }
     }
   }
   ```

3. 点击搜索建议的 Item 项，跳转到商品详情页面：

   ```js
   gotoDetail(goods_id) {
     uni.navigateTo({
       // 指定详情页面的 URL 地址，并传递 goods_id 参数
       url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
     })
   }
   ```

### 5.5.3 搜索历史

#### 1 渲染搜索历史记录的基本结构

1. 在 data 中定义搜索历史的`假数据`：

   ```js
   data() {
     return {
       // 搜索关键词的历史记录
       historyList: ['a', 'app', 'apple']
     }
   }
   ```

2. 渲染搜索历史区域的 UI 结构：

   ```xml
   <!-- 搜索历史 -->
   <view class="history-box">
     <!-- 标题区域 -->
     <view class="history-title">
       <text>搜索历史</text>
       <uni-icons type="trash" size="17"></uni-icons>
     </view>
     <!-- 列表区域 -->
     <view class="history-list">
       <uni-tag :text="item" v-for="(item, i) in historyList" :key="i"></uni-tag>
     </view>
   </view>
   ```

3. 美化搜索历史区域的样式：

   ```scss
   .history-box {
     padding: 0 5px;
   
     .history-title {
       display: flex;
       justify-content: space-between;
       align-items: center;
       height: 40px;
       font-size: 13px;
       border-bottom: 1px solid #efefef;
     }
   
     .history-list {
       display: flex;
       flex-wrap: wrap;
   
       .uni-tag {
         margin-top: 5px;
         margin-right: 5px;
       }
     }
   }
   ```

#### 2 实现搜索建议和搜索历史的按需展示

1. 当搜索结果列表的长度`不为 0`的时候（`searchResults.length !== 0`），需要展示搜索建议区域，隐藏搜索历史区域

2. 当搜索结果列表的长度`等于 0`的时候（`searchResults.length === 0`），需要隐藏搜索建议区域，展示搜索历史区域

3. 使用 `v-if` 和 `v-else` 控制这两个区域的显示和隐藏，示例代码如下：

   ```xml
   <!-- 搜索建议列表 -->
   <view class="sugg-list" v-if="searchResults.length !== 0">
     <!-- 省略其它代码... -->
   </view>
   
   <!-- 搜索历史 -->
   <view class="history-box" v-else>
     <!-- 省略其它代码... -->
   </view>
   ```

#### 3 将搜索关键词存入 historyList

1. 直接将搜索关键词 `push` 到 `historyList` 数组中即可

   ```js
   methods: {
     // 根据搜索关键词，搜索商品建议列表
     async getSearchList() {
       // 省略其它不必要的代码...
   
       // 1. 查询到搜索建议之后，调用 saveSearchHistory() 方法保存搜索关键词
       this.saveSearchHistory()
     },
     // 2. 保存搜索关键词的方法
     saveSearchHistory() {
       // 2.1 直接把搜索关键词 push 到 historyList 数组中
       this.historyList.push(this.kw)
     }
   }
   ```

2. 上述实现思路存在的问题：

   - 关键词**前后顺序**的问题（可以调用数组的 `reverse() 方法`对数组进行反转）
   - 关键词**重复**的问题（可以使用 [Set 对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)进行**去重操作**）

#### 4 解决关键字前后顺序的问题

1. data 中的 `historyList` 不做任何修改，依然使用 push 进行**末尾追加**

2. 定义一个计算属性 `historys`，将 `historyList` 数组 `reverse` 反转之后，就是此计算属性的值：

   ```js
   computed: {
     historys() {
       // 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
       // 而是应该新建一个内存无关的数组，再进行 reverse 反转
       return [...this.historyList].reverse()
     }
   }
   ```

3. 页面中渲染搜索关键词的时候，不再使用 data 中的 `historyList`，而是使用计算属性 `historys`：

   ```xml
   <view class="history-list">
     <uni-tag :text="item" v-for="(item, i) in historys" :key="i"></uni-tag>
   </view>
   ```

#### 5 解决关键词重复的问题

1. 修改 `saveSearchHistory` 方法如下：

   ```js
   // 保存搜索关键词为历史记录
   saveSearchHistory() {
     // this.historyList.push(this.kw)
   
     // 1. 将 Array 数组转化为 Set 对象
     const set = new Set(this.historyList)
     // 2. 调用 Set 对象的 delete 方法，移除对应的元素
     set.delete(this.kw)
     // 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
     set.add(this.kw)
     // 4. 将 Set 对象转化为 Array 数组
     this.historyList = Array.from(set)
   }
   ```

#### 6 将搜索历史记录持久化存储到本地

1. 修改 `saveSearchHistory` 方法如下：

   ```js
   // 保存搜索关键词为历史记录
   saveSearchHistory() {
     const set = new Set(this.historyList)
     set.delete(this.kw)
     set.add(this.kw)
     this.historyList = Array.from(set)
     // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
     uni.setStorageSync('kw', JSON.stringify(this.historyList))
   }
   ```

2. 在 `onLoad` 生命周期函数中，加载本地存储的搜索历史记录：

   ```js
   onLoad() {
     this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
   }
   ```

#### 7 清空搜索历史记录

1. 为清空的图标按钮绑定 `click` 事件：

   ```xml
   <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
   ```

2. 在 `methods` 中定义 `cleanHistory` 处理函数：

   ```js
   // 清空搜索历史记录
   cleanHistory() {
     // 清空 data 中保存的搜索历史
     this.historyList = []
     // 清空本地存储中记录的搜索历史
     uni.setStorageSync('kw', '[]')
   }
   ```

#### 8 点击搜索历史跳转到商品列表页面

1. 为搜索历史的 Item 项绑定 `click` 事件处理函数：

   ```xml
   <uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
   ```

2. 在 `methods` 中定义 `gotoGoodsList` 处理函数：

   ```js
   // 点击跳转到商品列表页面
   gotoGoodsList(kw) {
     uni.navigateTo({
       url: '/subpkg/goods_list/goods_list?query=' + kw
     })
   }
   ```

### 5.5.4 分支的合并与提交

1. 将 `search` 分支进行本地提交：

   ```bash
   git add .
   git commit -m "完成了搜索功能的开发"
   ```

2. 将本地的 `search` 分支推送到码云：

   ```bash
   git push -u origin search
   ```

3. 将本地 `search` 分支中的代码合并到 `master` 分支：

   ```bash
   git checkout master
   git merge search
   git push
   ```

4. 删除本地的 `search` 分支：

   ```bash
   git branch -d search
   ```

## 5.6 商品列表

### 5.6.0 创建 goodslist 分支

运行如下的命令，基于 master 分支在本地创建 goodslist 子分支，用来开发商品列表相关的功能：

```bash
git checkout -b search
```

### 5.6.1 定义请求参数对象

1. 为了方便发起请求获取商品列表的数据，我们要根据接口的要求，事先定义一个**请求参数对象**：

   ```js
   data() {
     return {
       // 请求参数对象
       queryObj: {
         // 查询关键词
         query: '',
         // 商品分类Id
         cid: '',
         // 页码值
         pagenum: 1,
         // 每页显示多少条数据
         pagesize: 10
       }
     }
   }
   ```

2. 将页面跳转时**携带的参数**，转存到 `queryObj` 对象中：

   ```js
   onLoad(options) {
     // 将页面参数转存到 this.queryObj 对象中
     this.queryObj.query = options.query || ''
     this.queryObj.cid = options.cid || ''
   }
   ```

3. 为了方便开发商品分类页面，建议大家通过**微信开发者工具**，新建商品列表页面的**编译模式**：

   ![image-20220908093135435](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209080931435.png)

### 5.6.2 获取商品列表数据

1. 在 data 中新增如下的数据节点：

   ```js
   data() {
     return {
       // 商品列表的数据
       goodsList: [],
       // 总数量，用来实现分页
       total: 0
     }
   }
   ```

2. 在 `onLoad` 生命周期函数中，调用 `getGoodsList` 方法获取商品列表数据：

   ```js
   onLoad(options) {
     // 调用获取商品列表数据的方法
     this.getGoodsList()
   }
   ```

3. 在 `methods` 节点中，声明 `getGoodsList` 方法如下：

   ```js
   methods: {
     // 获取商品列表数据的方法
     async getGoodsList() {
       // 发起请求
       const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
       if (res.meta.status !== 200) return uni.$showMsg()
       // 为数据赋值
       this.goodsList = res.message.goods
       this.total = res.message.total
     }
   }
   ```

### 5.6.3 渲染商品列表结构

1. 在页面中，通过 `v-for` 指令，循环渲染出商品的 UI 结构：

   ```xml
   <template>
     <view>
       <view class="goods-list">
         <block v-for="(goods, i) in goodsList" :key="i">
           <view class="goods-item">
             <!-- 商品左侧图片区域 -->
             <view class="goods-item-left">
               <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
             </view>
             <!-- 商品右侧信息区域 -->
             <view class="goods-item-right">
               <!-- 商品标题 -->
               <view class="goods-name">{{goods.goods_name}}</view>
               <view class="goods-info-box">
                 <!-- 商品价格 -->
                 <view class="goods-price">￥{{goods.goods_price}}</view>
               </view>
             </view>
           </view>
         </block>
       </view>
     </view>
   </template>
   ```

2. 为了防止某些商品的图片不存在，需要在 data 中定义一个默认的图片：

   ```js
   data() {
     return {
       // 默认的空图片
       defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
     }
   }
   ```

   并在页面渲染时按需使用：

   ```xml
   <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
   ```

3. 美化商品列表的 UI 结构：

   ```scss
   .goods-item {
     display: flex;
     padding: 10px 5px;
     border-bottom: 1px solid #f0f0f0;
   
     .goods-item-left {
       margin-right: 5px;
   
       .goods-pic {
         width: 100px;
         height: 100px;
         display: block;
       }
     }
   
     .goods-item-right {
       display: flex;
       flex-direction: column;
       justify-content: space-between;
   
       .goods-name {
         font-size: 13px;
       }
   
       .goods-price {
         font-size: 16px;
         color: #c00000;
       }
     }
   }
   ```

### 5.6.4 把商品 item 项封装为自定义组件

1. 在 `components` 目录上鼠标右键，选择 `新建组件`：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209080931113.png)

2. 将 `goods_list` 页面中，关于商品 item 项相关的 UI 结构、样式、data 数据，封装到 `my-goods` 组件中：

   ```html
   <template>
     <view class="goods-item">
       <!-- 商品左侧图片区域 -->
       <view class="goods-item-left">
         <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
       </view>
       <!-- 商品右侧信息区域 -->
       <view class="goods-item-right">
         <!-- 商品标题 -->
         <view class="goods-name">{{goods.goods_name}}</view>
         <view class="goods-info-box">
           <!-- 商品价格 -->
           <view class="goods-price">￥{{goods.goods_price}}</view>
         </view>
       </view>
     </view>
   </template>
   
   <script>
     export default {
       // 定义 props 属性，用来接收外界传递到当前组件的数据
       props: {
         // 商品的信息对象
         goods: {
           type: Object,
           defaul: {},
         },
       },
       data() {
         return {
           // 默认的空图片
           defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
         }
       },
     }
   </script>
   
   <style lang="scss">
     .goods-item {
       display: flex;
       padding: 10px 5px;
       border-bottom: 1px solid #f0f0f0;
   
       .goods-item-left {
         margin-right: 5px;
   
         .goods-pic {
           width: 100px;
           height: 100px;
           display: block;
         }
       }
   
       .goods-item-right {
         display: flex;
         flex-direction: column;
         justify-content: space-between;
   
         .goods-name {
           font-size: 13px;
         }
   
         .goods-price {
           font-size: 16px;
           color: #c00000;
         }
       }
     }
   </style>
   ```

3. 在 `goods_list` 组件中，循环渲染 `my-goods` 组件即可：

   ```xml
   <view class="goods-list">
     <block v-for="(item, i) in goodsList" :key="i">
       <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
       <my-goods :goods="item"></my-goods>
     </block>
   </view>
   ```

### 5.6.5 使用过滤器处理价格

1. 在 `my-goods` 组件中，和 `data` 节点平级，声明 `filters` 过滤器节点如下：

   ```js
   filters: {
     // 把数字处理为带两位小数点的数字
     tofixed(num) {
       return Number(num).toFixed(2)
     }
   }
   ```

2. 在渲染商品价格的时候，通过管道符 `|` 调用过滤器：

   ```xml
   <!-- 商品价格 -->
   <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
   ```

### 5.6.6 上拉加载更多

#### 1 初步实现上拉加载更多

1. 打开项目根目录中的 `pages.json` 配置文件，为 `subPackages` 分包中的 `goods_list` 页面配置上拉触底的距离：

   ```js
    "subPackages": [
      {
        "root": "subpkg",
        "pages": [
          {
            "path": "goods_detail/goods_detail",
            "style": {}
          },
          {
            "path": "goods_list/goods_list",
            "style": {
              "onReachBottomDistance": 150
            }
          },
          {
            "path": "search/search",
            "style": {}
          }
        ]
      }
    ]
   ```

2. 在 `goods_list` 页面中，和 `methods` 节点平级，声明 `onReachBottom` 事件处理函数，用来监听页面的上拉触底行为：

   ```js
   // 触底的事件
   onReachBottom() {
     // 让页码值自增 +1
     this.queryObj.pagenum += 1
     // 重新获取列表数据
     this.getGoodsList()
   }
   ```

3. 改造 `methods` 中的 `getGoodsList` 函数，当列表数据请求成功之后，进行新旧数据的拼接处理：

   ```js
   // 获取商品列表数据的方法
   async getGoodsList() {
     // 发起请求
     const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
     if (res.meta.status !== 200) return uni.$showMsg()
   
     // 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
     this.goodsList = [...this.goodsList, ...res.message.goods]
     this.total = res.message.total
   }
   ```

#### 2 通过节流阀防止发起额外的请求

1. 在 data 中定义 `isloading` 节流阀如下：

   ```js
   data() {
     return {
       // 是否正在请求数据
       isloading: false
     }
   }
   ```

2. 修改 `getGoodsList` 方法，在请求数据前后，分别打开和关闭节流阀：

   ```js
   // 获取商品列表数据的方法
   async getGoodsList() {
     // ** 打开节流阀
     this.isloading = true
     // 发起请求
     const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
     // ** 关闭节流阀
     this.isloading = false
   
     // 省略其它代码...
   }
   ```

3. 在 `onReachBottom` 触底事件处理函数中，根据节流阀的状态，来决定是否发起请求：

   ```js
   // 触底的事件
   onReachBottom() {
     // 判断是否正在请求其它数据，如果是，则不发起额外的请求
     if (this.isloading) return
   
     this.queryObj.pagenum += 1
     this.getGoodsList()
   }
   ```

#### 3 判断数据是否加载完毕

1. 如果下面的公式成立，则证明没有下一页数据了：

   ```text
   当前的页码值 * 每页显示多少条数据 >= 总数条数
   pagenum * pagesize >= total
   ```

2. 修改 `onReachBottom` 事件处理函数如下：

   ```js
   // 触底的事件
   onReachBottom() {
     // 判断是否还有下一页数据
     if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
   
     // 判断是否正在请求其它数据，如果是，则不发起额外的请求
     if (this.isloading) return
   
     this.queryObj.pagenum += 1
     this.getGoodsList()
   }
   ```

### 5.6.7 下拉刷新

1. 在 `pages.json` 配置文件中，为当前的 `goods_list` 页面单独开启下拉刷新效果：

   ```js
   "subPackages": [{
     "root": "subpkg",
     "pages": [{
       "path": "goods_detail/goods_detail",
       "style": {}
     }, {
       "path": "goods_list/goods_list",
       "style": {
         "onReachBottomDistance": 150,
         "enablePullDownRefresh": true,
         "backgroundColor": "#F8F8F8"
       }
     }, {
       "path": "search/search",
       "style": {}
     }]
   }]
   ```

2. 监听页面的 `onPullDownRefresh` 事件处理函数：

   ```js
   // 下拉刷新的事件
   onPullDownRefresh() {
     // 1. 重置关键数据
     this.queryObj.pagenum = 1
     this.total = 0
     this.isloading = false
     this.goodsList = []
   
     // 2. 重新发起请求
     this.getGoodsList(() => uni.stopPullDownRefresh())
   }
   ```

3. 修改 `getGoodsList` 函数，接收 `cb` 回调函数并按需进行调用：

   ```js
   // 获取商品列表数据的方法
   async getGoodsList(cb) {
     this.isloading = true
     const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
     this.isloading = false
     // 只要数据请求完毕，就立即按需调用 cb 回调函数
     cb && cb()
   
     if (res.meta.status !== 200) return uni.$showMsg()
     this.goodsList = [...this.goodsList, ...res.message.goods]
     this.total = res.message.total
   }
   ```

## 5.6.8 点击商品 item 项跳转到详情页面

1. 将循环时的 `block` 组件修改为 `view` 组件，并绑定 `click` 点击事件处理函数：

   ```xml
   <view class="goods-list">
     <view v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
       <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
       <my-goods :goods="item"></my-goods>
     </view>
   </view>
   ```

2. 在 `methods` 节点中，定义 `gotoDetail` 事件处理函数：

   ```js
   // 点击跳转到商品详情页面
   gotoDetail(item) {
     uni.navigateTo({
       url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
     })
   }
   ```

### 5.6.9 分支的合并与提交

1. 将 `goodslist` 分支进行本地提交：

   ```bash
   git add .
   git commit -m "完成了商品列表页面的开发"
   ```

2. 将本地的 `goodslist` 分支推送到码云：

   ```bash
   git push -u origin goodslist
   ```

3. 将本地 `goodslist` 分支中的代码合并到 `master` 分支：

   ```bash
   git checkout master
   git merge goodslist
   git push
   ```

4. 删除本地的 `goodslist` 分支：

   ```bash
   git branch -d goodslist
   ```

## 5.7 商品详情

### 5.7.0 创建 goodsdetail 分支

运行如下的命令，基于 master 分支在本地创建 goodsdetail 子分支，用来开发商品详情页相关的功能：

```bash
git checkout -b goodsdetail
```

### 5.7.1 添加商品详情页的编译模式

1. 在微信开发者工具中，点击工具栏上的编译模式下拉菜单，选择 `添加编译模式` 选项：

   ![image-20220908093100310](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209080931127.png)

2. 勾选 `启动页面` 的路径，并填写了 `启动参数` 之后，点击 `确定` 按钮，添加详情页面的编译模式：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209080929750.png)

### 5.7.2 获取商品详情数据

1. 在 `data` 中定义商品详情的数据节点：

   ```js
   data() {
     return {
       // 商品详情对象
       goods_info: {}
     }
   }
   ```

2. 在 `onLoad` 中获取商品的 Id，并调用请求商品详情的方法：

   ```js
   onLoad(options) {
     // 获取商品 Id
     const goods_id = options.goods_id
     // 调用请求商品详情数据的方法
     this.getGoodsDetail(goods_id)
   }
   ```

3. 在 `methods` 中声明 `getGoodsDetail` 方法：

   ```js
   methods: {
     // 定义请求商品详情数据的方法
     async getGoodsDetail(goods_id) {
       const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
       if (res.meta.status !== 200) return uni.$showMsg()
       // 为 data 中的数据赋值
       this.goods_info = res.message
     }
   }
   ```

### 5.7.3 渲染商品详情页的 UI 结构

#### 1 渲染轮播图区域

1. 使用 `v-for` 指令，循环渲染如下的轮播图 UI 结构：

   ```xml
   <!-- 轮播图区域 -->
   <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
     <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
       <image :src="item.pics_big"></image>
     </swiper-item>
   </swiper>
   ```

2. 美化轮播图的样式：

   ```scss
   swiper {
     height: 750rpx;
   
     image {
       width: 100%;
       height: 100%;
     }
   }
   ```

#### 2 实现轮播图预览效果

1. 为轮播图中的 `image` 图片绑定 `click` 事件处理函数：

   ```xml
   <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
     <!-- 把当前点击的图片的索引，传递到 preview() 处理函数中 -->
     <image :src="item.pics_big" @click="preview(i)"></image>
   </swiper-item>
   ```

2. 在 `methods` 中定义 `preview` 事件处理函数：

   ```js
   // 实现轮播图的预览效果
   preview(i) {
     // 调用 uni.previewImage() 方法预览图片
     uni.previewImage({
       // 预览时，默认显示图片的索引
       current: i,
       // 所有图片 url 地址的数组
       urls: this.goods_info.pics.map(x => x.pics_big)
     })
   }
   ```

#### 3 渲染商品信息区域

1. 定义商品信息区域的 UI 结构如下：

   ```xml
   <!-- 商品信息区域 -->
   <view class="goods-info-box">
     <!-- 商品价格 -->
     <view class="price">￥{{goods_info.goods_price}}</view>
     <!-- 信息主体区域 -->
     <view class="goods-info-body">
       <!-- 商品名称 -->
       <view class="goods-name">{{goods_info.goods_name}}</view>
       <!-- 收藏 -->
       <view class="favi">
         <uni-icons type="star" size="18" color="gray"></uni-icons>
         <text>收藏</text>
       </view>
     </view>
     <!-- 运费 -->
     <view class="yf">快递：免运费</view>
   </view>
   ```

2. 美化商品信息区域的样式：

   ```scss
   // 商品信息区域的样式
   .goods-info-box {
     padding: 10px;
     padding-right: 0;
   
     .price {
       color: #c00000;
       font-size: 18px;
       margin: 10px 0;
     }
   
     .goods-info-body {
       display: flex;
       justify-content: space-between;
   
       .goods-name {
         font-size: 13px;
         padding-right: 10px;
       }
       // 收藏区域
       .favi {
         width: 120px;
         font-size: 12px;
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         border-left: 1px solid #efefef;
         color: gray;
       }
     }
   
     // 运费
     .yf {
       margin: 10px 0;
       font-size: 12px;
       color: gray;
     }
   }
   ```

#### 4 渲染商品详情信息

1. 在页面结构中，使用 `rich-text` 组件，将带有 HTML 标签的内容，渲染为小程序的页面结构：

   ```xml
   <!-- 商品详情信息 -->
   <rich-text :nodes="goods_info.goods_introduce"></rich-text>
   ```

2. 修改 `getGoodsDetail` 方法，从而解决图片底部 `空白间隙` 的问题：

   ```js
   // 定义请求商品详情数据的方法
   async getGoodsDetail(goods_id) {
     const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
     if (res.meta.status !== 200) return uni.$showMsg()
   
     // 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
     res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ')
     this.goods_info = res.message
   }
   ```

3. 解决 `.webp` 格式图片在 `ios` 设备上无法正常显示的问题：

   ```js
   // 定义请求商品详情数据的方法
   async getGoodsDetail(goods_id) {
     const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
     if (res.meta.status !== 200) return uni.$showMsg()
   
     // 使用字符串的 replace() 方法，将 webp 的后缀名替换为 jpg 的后缀名
     res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
     this.goods_info = res.message
   }
   ```

#### 5 解决商品价格闪烁的问题

1. 导致问题的原因：在商品详情数据请求回来之前，data 中 `goods_info` 的值为 `{}`，因此初次渲染页面时，会导致 `商品价格、商品名称` 等闪烁的问题。

2. 解决方案：判断 `goods_info.goods_name` 属性的值是否存在，从而使用 `v-if` 指令控制页面的显示与隐藏：

   ```xml
   <template>
     <view v-if="goods_info.goods_name">
      <!-- 省略其它代码 -->
     </view>
   </template>
   ```

### 5.7.4 渲染详情页底部的商品导航区域

#### 1 渲染商品导航区域的 UI 结构

> 基于 uni-ui 提供的 [GoodsNav](https://ext.dcloud.net.cn/plugin?id=865) 组件来实现商品导航区域的效果

1. 在 data 中，通过 `options` 和 `buttonGroup` 两个数组，来声明商品导航组件的按钮配置对象：

   ```js
   data() {
     return {
       // 商品详情对象
       goods_info: {},
       // 左侧按钮组的配置对象
       options: [{
         icon: 'shop',
         text: '店铺'
       }, {
         icon: 'cart',
         text: '购物车',
         info: 2
       }],
       // 右侧按钮组的配置对象
       buttonGroup: [{
           text: '加入购物车',
           backgroundColor: '#ff0000',
           color: '#fff'
         },
         {
           text: '立即购买',
           backgroundColor: '#ffa200',
           color: '#fff'
         }
       ]
     }
   }
   ```

2. 在页面中使用 `uni-goods-nav` 商品导航组件：

   ```xml
   <!-- 商品导航组件 -->
   <view class="goods_nav">
     <!-- fill 控制右侧按钮的样式 -->
     <!-- options 左侧按钮的配置项 -->
     <!-- buttonGroup 右侧按钮的配置项 -->
     <!-- click 左侧按钮的点击事件处理函数 -->
     <!-- buttonClick 右侧按钮的点击事件处理函数 -->
     <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
   </view>
   ```

3. 美化商品导航组件，使之固定在页面最底部：

   ```scss
   .goods-detail-container {
     // 给页面外层的容器，添加 50px 的内padding，
     // 防止页面内容被底部的商品导航组件遮盖
     padding-bottom: 50px;
   }
   
   .goods_nav {
     // 为商品导航组件添加固定定位
     position: fixed;
     bottom: 0;
     left: 0;
     width: 100%;
   }
   ```

#### 2 点击跳转到购物车页面

1. 点击商品导航组件左侧的按钮，会触发 `uni-goods-nav` 的 `@click` 事件处理函数，事件对象 `e` 中会包含当前点击的按钮相关的信息：

   ```js
   // 左侧按钮的点击事件处理函数
   onClick(e) {
     console.log(e)
   }
   ```

   打印的按钮信息对象如下：

   ![img](data:image/png;base64,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)

2. 根据 `e.content.text` 的值，来决定进一步的操作：

   ```js
   // 左侧按钮的点击事件处理函数
   onClick(e) {
     if (e.content.text === '购物车') {
       // 切换到购物车页面
       uni.switchTab({
         url: '/pages/cart/cart'
       })
     }
   }
   ```

### 5.7.5 分支的合并与提交

1. 将 `goodsdetail` 分支进行本地提交：

   ```bash
   git add .
   git commit -m "完成了商品详情页面的开发"
   ```

2. 将本地的 `goodsdetail` 分支推送到码云：

   ```bash
   git push -u origin goodsdetail
   ```

3. 将本地 `goodsdetail` 分支中的代码合并到 `master` 分支：

   ```bash
   git checkout master
   git merge goodsdetail
   git push
   ```

4. 删除本地的 `goodsdetail` 分支：

   ```bash
   git branch -d goodsdetail
   ```

## 5.8 加入购物车

### 5.8.0 创建 cart 分支

运行如下的命令，基于 master 分支在本地创建 cart 子分支，用来开发购物车相关的功能：

```bash
git checkout -b cart
```

### 5.8.1 配置 vuex

1. 在项目根目录中创建 `store` 文件夹，专门用来存放 vuex 相关的模块

2. 在 `store` 目录上鼠标右键，选择 `新建 -> js文件`，新建 `store.js` 文件：

   ![img](data:image/png;base64,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)

3. 在 `store.js` 中按照如下 4 个步骤**初始化 Store 的实例对象**：

   ```js
   // 1. 导入 Vue 和 Vuex
   import Vue from 'vue'
   import Vuex from 'vuex'
   
   // 2. 将 Vuex 安装为 Vue 的插件
   Vue.use(Vuex)
   
   // 3. 创建 Store 的实例对象
   const store = new Vuex.Store({
     // TODO：挂载 store 模块
     modules: {},
   })
   
   // 4. 向外共享 Store 的实例对象
   export default store
   ```

4. 在 `main.js` 中导入 `store` 实例对象并挂载到 Vue 的实例上：

   ```js
   // 1. 导入 store 的实例对象
   import store from './store/store.js'
   
   // 省略其它代码...
   
   const app = new Vue({
     ...App,
     // 2. 将 store 挂载到 Vue 实例上
     store,
   })
   app.$mount()
   ```

### 5.8.2 创建购物车的 store 模块

1. 在 `store` 目录上鼠标右键，选择 `新建 -> js文件`，创建购物车的 store 模块，命名为 `cart.js`：

   ![img](data:image/png;base64,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)

2. 在 `cart.js` 中，初始化如下的 vuex 模块：

   ```js
   export default {
     // 为当前模块开启命名空间
     namespaced: true,
   
     // 模块的 state 数据
     state: () => ({
       // 购物车的数组，用来存储购物车中每个商品的信息对象
       // 每个商品的信息对象，都包含如下 6 个属性：
       // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
       cart: [],
     }),
   
     // 模块的 mutations 方法
     mutations: {},
   
     // 模块的 getters 属性
     getters: {},
   }
   ```

3. 在 `store/store.js` 模块中，导入并挂载购物车的 vuex 模块，示例代码如下：

   ```js
   import Vue from 'vue'
   import Vuex from 'vuex'
   // 1. 导入购物车的 vuex 模块
   import moduleCart from './cart.js'
   
   Vue.use(Vuex)
   
   const store = new Vuex.Store({
     // TODO：挂载 store 模块
     modules: {
       // 2. 挂载购物车的 vuex 模块，模块内成员的访问路径被调整为 m_cart，例如：
       //    购物车模块中 cart 数组的访问路径是 m_cart/cart
       m_cart: moduleCart,
     },
   })
   
   export default store
   ```

### 5.8.3 在商品详情页中使用 Store 中的数据

1. 在 `goods_detail.vue` 页面中，修改 `<script></script>` 标签中的代码如下：

   ```js
   // 从 vuex 中按需导出 mapState 辅助方法
   import { mapState } from 'vuex'
   
   export default {
     computed: {
       // 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
       // ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
       ...mapState('m_cart', ['cart']),
     },
     // 省略其它代码...
   }
   ```

   > 注意：今后无论映射 mutations 方法，还是 getters 属性，还是 state 中的数据，都需要指定模块的名称，才能进行映射。

2. 在页面渲染时，可以直接使用映射过来的数据，例如：

   ```xml
   <!-- 运费 -->
   <view class="yf">快递：免运费 -- {{cart.length}}</view>
   ```

### 5.8.4 实现加入购物车的功能

1. 在 store 目录下的 `cart.js` 模块中，封装一个将商品信息加入购物车的 mutations 方法，命名为 `addToCart`。示例代码如下：

   ```js
   export default {
     // 为当前模块开启命名空间
     namespaced: true,
   
     // 模块的 state 数据
     state: () => ({
       // 购物车的数组，用来存储购物车中每个商品的信息对象
       // 每个商品的信息对象，都包含如下 6 个属性：
       // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
       cart: [],
     }),
   
     // 模块的 mutations 方法
     mutations: {
       addToCart(state, goods) {
         // 根据提交的商品的Id，查询购物车中是否存在这件商品
         // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
         const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
   
         if (!findResult) {
           // 如果购物车中没有这件商品，则直接 push
           state.cart.push(goods)
         } else {
           // 如果购物车中有这件商品，则只更新数量即可
           findResult.goods_count++
         }
       },
     },
   
     // 模块的 getters 属性
     getters: {},
   }
   ```

2. 在商品详情页面中，通过 `mapMutations` 这个辅助方法，把 vuex 中 `m_cart` 模块下的 `addToCart` 方法映射到当前页面：

   ```js
   // 按需导入 mapMutations 这个辅助方法
   import { mapMutations } from 'vuex'
   
   export default {
     methods: {
       // 把 m_cart 模块中的 addToCart 方法映射到当前页面使用
       ...mapMutations('m_cart', ['addToCart']),
     },
   }
   ```

3. 为商品导航组件 `uni-goods-nav` 绑定 `@buttonClick="buttonClick"` 事件处理函数：

   ```js
   // 右侧按钮的点击事件处理函数
   buttonClick(e) {
      // 1. 判断是否点击了 加入购物车 按钮
      if (e.content.text === '加入购物车') {
   
         // 2. 组织一个商品的信息对象
         const goods = {
            goods_id: this.goods_info.goods_id,       // 商品的Id
            goods_name: this.goods_info.goods_name,   // 商品的名称
            goods_price: this.goods_info.goods_price, // 商品的价格
            goods_count: 1,                           // 商品的数量
            goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
            goods_state: true                         // 商品的勾选状态
         }
   
         // 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
         this.addToCart(goods)
   
      }
   }
   ```

### 5.8.5 动态统计购物车中商品的总数量

1. 在 `cart.js` 模块中，在 `getters` 节点下定义一个 `total` 方法，用来统计购物车中商品的总数量：

   ```js
   // 模块的 getters 属性
   getters: {
      // 统计购物车中商品的总数量
      total(state) {
         let c = 0
         // 循环统计商品的数量，累加到变量 c 中
         state.cart.forEach(goods => c += goods.goods_count)
         return c
      }
   }
   ```

2. 在商品详情页面的 `script` 标签中，按需导入 `mapGetters` 方法并进行使用：

   ```js
   // 按需导入 mapGetters 这个辅助方法
   import { mapGetters } from 'vuex'
   
   export default {
     computed: {
       // 把 m_cart 模块中名称为 total 的 getter 映射到当前页面中使用
       ...mapGetters('m_cart', ['total']),
     },
   }
   ```

3. 通过 `watch` 侦听器，监听计算属性 `total` 值的变化，从而**动态为购物车按钮的徽标赋值**：

   ```js
   export default {
     watch: {
       // 1. 监听 total 值的变化，通过第一个形参得到变化后的新值
       total(newVal) {
         // 2. 通过数组的 find() 方法，找到购物车按钮的配置对象
         const findResult = this.options.find((x) => x.text === '购物车')
   
         if (findResult) {
           // 3. 动态为购物车按钮的 info 属性赋值
           findResult.info = newVal
         }
       },
     },
   }
   ```

### 5.8.6 持久化存储购物车中的商品

1. 在 `cart.js` 模块中，声明一个叫做 `saveToStorage` 的 mutations 方法，此方法负责将购物车中的数据持久化存储到本地：

   ```js
   // 将购物车中的数据持久化存储到本地
   saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
   }
   ```

2. 修改 `mutations` 节点中的 `addToCart` 方法，在处理完商品信息后，调用步骤 1 中定义的 `saveToStorage` 方法：

   ```js
   addToCart(state, goods) {
      // 根据提交的商品的Id，查询购物车中是否存在这件商品
      // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
   
      if (!findResult) {
         // 如果购物车中没有这件商品，则直接 push
         state.cart.push(goods)
      } else {
         // 如果购物车中有这件商品，则只更新数量即可
         findResult.goods_count++
      }
   
      // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
      this.commit('m_cart/saveToStorage')
   }
   ```

3. 修改 `cart.js` 模块中的 `state` 函数，读取本地存储的购物车数据，对 cart 数组进行初始化：

   ```js
   // 模块的 state 数据
   state: () => ({
      // 购物车的数组，用来存储购物车中每个商品的信息对象
      // 每个商品的信息对象，都包含如下 6 个属性：
      // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
      cart: JSON.parse(uni.getStorageSync('cart') || '[]')
   }),
   ```

### 5.8.7 优化商品详情页的 total 侦听器

1. 使用**普通函数的形式**定义的 watch 侦听器，**在页面首次加载后不会被调用**。因此导致了商品详情页在首次加载完毕之后，不会将商品的总数量显示到商品导航区域：

   ```js
   watch: {
      // 页面首次加载完毕后，不会调用这个侦听器
      total(newVal) {
         const findResult = this.options.find(x => x.text === '购物车')
         if (findResult) {
            findResult.info = newVal
         }
      }
   }
   ```

2. 为了防止这个上述问题，可以使用**对象的形式**来定义 watch 侦听器（详细文档请参考 Vue 官方的 [watch 侦听器](https://cn.vuejs.org/v2/api/#watch)教程），示例代码如下：

   ```js
   watch: {
      // 定义 total 侦听器，指向一个配置对象
      total: {
         // handler 属性用来定义侦听器的 function 处理函数
         handler(newVal) {
            const findResult = this.options.find(x => x.text === '购物车')
            if (findResult) {
               findResult.info = newVal
            }
         },
         // immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
         immediate: true
      }
   }
   ```

### 5.8.8 动态为 tabBar 页面设置数字徽标

> 需求描述：从商品详情页面导航到购物车页面之后，需要为 tabBar 中的购物车动态设置数字徽标。

1. 把 Store 中的 total 映射到 `cart.vue` 中使用：

   ```js
   // 按需导入 mapGetters 这个辅助方法
   import { mapGetters } from 'vuex'
   
   export default {
     data() {
       return {}
     },
     computed: {
       // 将 m_cart 模块中的 total 映射为当前页面的计算属性
       ...mapGetters('m_cart', ['total']),
     },
   }
   ```

2. 在页面刚显示出来的时候，立即调用 `setBadge` 方法，为 tabBar 设置数字徽标：

   ```js
   onShow() {
      // 在页面刚展示的时候，设置数字徽标
      this.setBadge()
   }
   ```

3. 在 `methods` 节点中，声明 `setBadge` 方法如下，通过 `uni.setTabBarBadge()` 为 tabBar 设置数字徽标：

   ```js
   methods: {
      setBadge() {
         // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
         uni.setTabBarBadge({
            index: 2, // 索引
            text: this.total + '' // 注意：text 的值必须是字符串，不能是数字
         })
      }
   }
   ```

### 5.8.9 将设置 tabBar 徽标的代码抽离为 mixins

> 注意：除了要在 cart.vue 页面中设置购物车的数字徽标，还需要在其它 3 个 tabBar 页面中，为购物车设置数字徽标。

> 此时可以使用 Vue 提供的 [mixins](https://cn.vuejs.org/v2/guide/mixins.html) 特性，提高代码的可维护性。

1. 在项目根目录中新建 `mixins` 文件夹，并在 `mixins` 文件夹之下新建 `tabbar-badge.js` 文件，用来把设置 tabBar 徽标的代码封装为一个 mixin 文件：

   ```js
   import { mapGetters } from 'vuex'
   
   // 导出一个 mixin 对象
   export default {
     computed: {
       ...mapGetters('m_cart', ['total']),
     },
     onShow() {
       // 在页面刚展示的时候，设置数字徽标
       this.setBadge()
     },
     methods: {
       setBadge() {
         // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
         uni.setTabBarBadge({
           index: 2,
           text: this.total + '', // 注意：text 的值必须是字符串，不能是数字
         })
       },
     },
   }
   ```

2. 修改 `home.vue`，`cate.vue`，`cart.vue`，`my.vue` 这 4 个 tabBar 页面的源代码，分别导入 `@/mixins/tabbar-badge.js` 模块并进行使用：

   ```js
   // 导入自己封装的 mixin 模块
   import badgeMix from '@/mixins/tabbar-badge.js'
   
   export default {
     // 将 badgeMix 混入到当前的页面中进行使用
     mixins: [badgeMix],
     // 省略其它代码...
   }
   ```



## 5.9 购物车页面

### 5.9.0 创建购物车页面的编译模式

1. 打开微信开发者工具，点击工具栏上的“编译模式”下拉菜单，选择“添加编译模式”：

   ![img](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAScAAADOCAMAAABLuDSNAAADAFBMVEUAAABSpueLi4v/AAACvXIJnWIPhVZSAIS8vLxFRUX/x4T//+dC1Zq0tLT09PTT09Orq6unp6fF8uAAAISlVQAnJyed6cvk5OR+fn5kZGRx4LNycnLr6+un7NCkVVLZ2dmEAAAAgsYTExMGq2nFxcWEx/+EggBMTEwAAFLn/+f//8ZSAAAAVaXnplJd26kAx3cNjFlSgoQRflJSVaX/46VbW1vG//9SgsYEtm6l4/+kgQCQ58Senp6EAFLFxoPMzMylpoQLlF3r+/TG/8bb9+wuLi6lglL6+vry/Pi88NuEAIQOiVcHp2eEglLn46WDg4MyMjLV9ultbW1/4rqVlZUJoGPFgVLn///GggCy7tYQglTn/8YDuG8ZGRnk+fHd+O1VVVUHqGfN9OSC5Lzg+O8AAABY7AAAdnEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAChbdIP4HcAAMAAtgAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQAAACIAAAAutYAAAcAAAATAAAABwDAC5AP4AB4AMAAuta2AAAAAACMAAAAGfWc3LYCeXcAd58AAAAAAAAAAAAAAAAAAAAAAACU5gAd9t92ZCQZ9kAkOwAAdmQAAAAAAAAAAABkwAB2ZCQAAGAAAAAAAAAAAAAAAAUAgAB0wBAAAAUAAIAAAAACAAAAAAAAAAAAjADgAI4AwA8AAAAAAADgAAAAwA8AAAAG0ABGALn235cAAAAAGAAAAAAAAAAZ9dQAQAAAAAAAAAAZ9jAAAAAAAAAAAAAAAAAAAACQAAAAuD1o58AAZHcAAAAAAAAAAAwAAgABAABkkcaiAAAAAWJLR0RHYL3JewAAAAlwSFlzAAASdAAAEnQB3mYfeAAADb1JREFUeNrtnQ172sgRx3Wu7QofSJA7JHGQKjnLbXoJ4N7FV6fZHrUbKlRfD8vnXBI3YBL6/T9DZ2ZXL9gYCWIcbM88jzGSVivtj//MDi8aaTZbHtMYQW5Ohn+LzV76HobidKsx3QAnAgWcfOaUtQdzYk7MKc+obeaUOWpDFAaDwXHdZk6zRu0dD0482yuPBmtzcTLNOTg9f7oDj82vfoTH7/7+wt/SlH0BK94+xiZvaaP/3b9/TLY+Xh1OZrWm1pWq9bycvBpKcFCoeXk4xcNGAxpbSKQJDJqE6fkPb54/VVufvfG3nrwgWIDs0c7KcDKqtWT0UxV1mZNdH5wIzzA8cTKY5q3T/O7Lr3f8LaBA1gQ89lspJv/LP7zwn//+Rym7H95Igtj0+dMvVsfvnGoqby4P7BycytURuJzY2xOgxlG1nM0JMChOW48jP4w9q/nFd4/+kuYkNfjkP9rOCsWngkgvVUX2HuUBktnr9vvdPXgiBuVsPW09+zNx+gU4fPk1+B4KCDXTfAyL2rNfYr/77yP0TOII/nczVulnjtoYpKLxmlEbrRkZe5SqJaTThdV2V8QrZnH6Oh2fwNkAUkpPtKj0JMX3z0cYpxCodhOe52laJYuTN0htqhb61UEpY48CxbA9egn6e4S3MGdeoMBIPfn+bxif/iixPYljVRrdUq1RheN2MkZdrk5MfQOt7C+D01stPdNP6glmwyf/ePavF82d53/FlIGCWTL9Ld3+hAfqzuN3ACrbUxfwO+AUheTm40t6aoKGmpOcblRPi8Rxw88Tx8XccfyynlJ+R5nm27TfbWmfPdG8lBccG3Pu4Vcm84JKjvxpUk/NaL77m6btSB/b+S2lp592Vk9PRnU09zsdG9JLmWdCwpkrz5zQU/Orny5M+c1nbxJOWzIhWDFOEJOilLrk5H5/N9/7lkk9Uf79NJUm0BqY9GRmFbniqnHyzeNBvWR7YlRd4vvgu/C5SkOMUBt7/LlK9qhd/pxuMmzby9+DOc3FqcGcMt4wSU5u49Z+02kYhrv0PRquKzmZeolthukmcTJLt/yr86W7dslETrrNLDLiuI6cSqymLEWViBODyDLk5DKnbE4uc8rJyWVOeTm12TKMOTEn5sScmBNzYk5szIk5MSfmxJyYE3Nim5/T2Lfa7eIwgKetYasdqg9kQthy2IKVQQ8f26EFLZWN7x2ncfqzKqsdDIvt4oMirA4JTXEYU2v1rHbxHAlho3unp/F5sXU4Lg4t1BKppvjR94nE+CPIzKJWVkgtEVZxGN5Lvxt/JE4Pz5UzBZGCimErODxMvFACQ9XdQ05h2u/+NwQhBeBih2NQELrky2FEBfA9HBIv2EVGrHs834FvBYmCID6dn8ulYVG5IHrfvfS7WFEoEuQU6akNz4CTZQVWAOuBUxzVg/vISXkWxfG0nlo9kNFhmhPraaqeMGwPH6T8LkkixvdcT5aK4w/ItwBhGCR6eveQ9ST1FPSGSQ4JeToIK8WJVHSHORlGTj1BxhSnTyQoK2gH9KYG83HKQ+8uJyODExtzYk7MiTkxJ+bEnNiYE3NiTszpFnFy2TJMcuLf0Wf+zp45MSfmxJyYE3NiTmzMiTkxJ+bEnJgTc2L7JE6N2sUq1Xrhcg0bUcsqvDW1hVmYXm5Q75rRDtOO9gk92wWR42SXxcku6P6njibdIOF0+fDz95w+4c/LKftFn49TsnyVLhbllE/8uTiZXQ06ps7gCMDJ0TRYsAulmqY58rA6PsH1p3RMx0GgsBWf2AVNozODjjS5GbZgf7palmcPrXQcjcDmuDf0ifuqQ8jR4OPCPWMzHdvARtUzKv96OGFPdinFCQ7VqOEQwBlQtrDSxFrUDvHCZvjiNWrwTMCp0DZB28AZHVgbNcRmZicejC67xBZC/fmndnQIuYwns3DP6L24hfSker4+TkqxCSdHStem4tWwGl6qghPFJDxbaku7YWNaAyqUO0KruOGE/h1HxiHazx6ZydnDFj0l6IV7lhHDEYnfOc41cgIBOROchIQnTwrW6N2CE3u99AsROb3jqHjmOLI9LMYNQfpiMvJDt7osJKzOXrlfzAnHvGjP6Glxb37s2Pq1xXFwazGbEx444UTPcoyGIod+kVP0YguKgWJCTySlRXuOJ2FsFvV8nZyUd9kUDKb5nVtLHA2jRCwvG5RGS+QdQp510jByingaFeB3XT3hRJ2kOMW+t0jP8szVqUU9X2N8KlOHeP5mV8VxGQExLMJaYlZrqPCKotd9ORCYWqZE27ihrqeyDEG9YRzHV9tpyF0w+iZ+FwFZsGdqtibjedTzNepJpgE0XZeR0yl4tsDTLRdI3BRbJUGYlJ3osBgOhCNSk7ZOEUFlDDRsuayGo2ZvXCsVAxsdmQEoTsonF+0Zn+AJw9ZaQ/V8vX53Vb4wBapIJ6KNmu5foznOsnq+QU6NukkaR0XjZrxhmFO4zvKlKnQtoeeb5JRkx/EsqdWWUoZ6eT2v8OcqKqtZhhc5Kl+6Pk4Nrseag5PNnJgTc/rMnAy2lE3lxFhmwYo4MY/ZpCQnZpFFCjiVK4pTg+2SRaCAU79fkpRstkumSCm/M02z0/E8ne2CeV6nY6LJ+0i02+u/Y5tiH7b336/TdRuS0zpzmmobr7f319dTnPaZyTQ7IFCSk9kpS05Hm2dnZ5ubR2xgm5tniORg40PEqdIvr7/fhpWb33///dnm0S4b2BFx2tw9eL2NEQo4lerl9X3kdIaYdncP2MB2dzcRydGBdDzg1OnHnM6Odg82NjZe33sDCAe7FziZpxEnUBMErg/bbNsfXm8cSE4bESe7ojhtIqaft/fZwLZ/3pDxKeFUijgd7eI0+H6dbf39/vbri5w8xQmDE8yClFfdcwMI+x8kkjg+2WaKk8yq2NoxkoSTy5zm5fT6Kk6//sqc7BycLIs5fTKnIGjHNWutizUPQ6rw3qNatrglVejdwiqTsHNqh+L5OFiJMsrL4PSyF8ZE2hc4wYIVfbkzphruVMoVy7ojp7g8pxVz+sZahULvS/E7rGQbVdCMOBGBoP1x3Fbjpmr3WI4TYFlUlDStpyD9reIKKGoZnFK3TfCDsRopEQmsoNULEz1JzQypID41/NibkFNS1/QucnqABMa9cSAdD2QyPlScsAZw7Eetnj98SLzGpLVwWFQiDG89p7FF9uqV/D+9EjQWR+4F0e0SkNN5UXKi+DSMRaOQSRiI7ZtoU0s+CYPgDnNCJwogSMlpLc2JanAPw1b4TYgKs4ZxVO+1gsPhw2FKTxTXrHBVOXn6J8fx8EFvDMH8PERXQnXFnDA8n09wirG0hu/A71LxiTitSiHli5y8a4hPKJrx4fjw3SHeDge9L/E7XH6X9rs4qh++k9Qm50nsi6bPOxjHLSxnDy72EohYdJugVHxCPik9vWslwdoatob+xfw0DNWNhu4eJxga5ERYtT20emPUFEQZmT+FWAG/lXCSd3qJOaGAeh+VoChRgBgXBmH7TnLC3Bonr6Ka+0KUR+R3xbDVCot0C5xxW81mMaeXlFNikHql7jJEPVl3kxO/D07m/TFzysOJP6djTjk5VSrMKQ+nfp8/H5/X75hTTk78/Z2kNOX7u47J3wfn+T74VPDvC/L8vqB/wr9XyfN7lX5NcWK7ZOnfPzGn3JwatstMplmlrHdcu2EYMj4Bp45XqlSEEBU2ZQSj5MWcTvslo2GbHb1Uhq1lNmUIo6R3TMSEnDwTOblmx9NLbBOmex3TjTjZeP0dgep4bBPWiTAZ0XWKeFWZ65psE+a60ZVlyXWKfP1dxvV36jpFvp4z43pOvj443/XBfL157uvNuX5B3voFXA8jbz0MNq5Ds3ROJ1iU61vPwLpfJ1e20p2oMpim6VSqTpYadKbUd6UaiaYTlVvVZN0vqlUqS4jSI5ahE6rHz1BlbW5OGr4hPHY8/K/NLreNpTYFllAzR3aKUzRaWQTNrDeoyq6QZRGdqGwqcAO+MWxZhpca56g5fkOcPG8WJ3hATq4/gxO9/O5IU3V1hYjhXCxMiGCwcCqCiYoX6iRIXxdUAVl2IP+oGLW+Gn7nzazjl3ByZ3GKnGiyJt9lvwOFOPWkJTVATgAFyDm1RE9RMb6brwC5UL1DxcmuojaubNXVBAYeDDCOTkWI18ypnNZMs35KVd1FVFwSwxn+YT11U+kJqRd0qquuKqqvOqdvj8G0vm97nmdc3YsQaT2BQii0XOKENWNtZy1qSbXl3YIK1hifarUokqkgJ4R/K/TkOWD9zF5ESk/Kk5yp892pLVdTgd76yNTVZAb/YZVdq5tCF7pOnLCiKFrXXH1OOe2SnvyGY0/hhArSoyCv22lOHaBSH6U53SY9zcFpUk8zBini+ISc6jQtrsn7RDhOyu/iSXMVEqgMTs5gsOaLAdmMcOooTnV0ElnNGbxmisNghDqd4NSI2KEixVqip5J5i/SknfYH/nH9FO3qvKBWK4hUzd61VJHkVJoJGGpdM1klcC5TnBwH7yIxshNOXamw28KpfAqcHPqe5mpOa0n6pHUrTmppWvoTh61IT0LFaiHzCboPhO74tyk+nWCsUBP5yb1+H8z3K2NOzIk5MSfmxJzYmBNzYk7MiTkxJ+bExpwW5WTz7zBycLJRTwaDmG0G+Z1nM4nZZnvIyS3ZrKhZarJLLnIyXI+v0ZhlnmsQJ/7tePavyP8PA7/pHlZuhGkAAAAASUVORK5CYII=)

2. 勾选“启动页面的路径”之后，点击“确定”按钮，新增购物车页面的编译模式：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209080956201.png)

### 5.9.1 商品列表区域

#### 1 渲染购物车商品列表的标题区域

1. 定义如下的 UI 结构：

   ```xml
   <!-- 购物车商品列表的标题区域 -->
   <view class="cart-title">
     <!-- 左侧的图标 -->
     <uni-icons type="shop" size="18"></uni-icons>
     <!-- 描述文本 -->
     <text class="cart-title-text">购物车</text>
   </view>
   ```

2. 美化样式：

   ```scss
   .cart-title {
     height: 40px;
     display: flex;
     align-items: center;
     font-size: 14px;
     padding-left: 5px;
     border-bottom: 1px solid #efefef;
     .cart-title-text {
       margin-left: 10px;
     }
   }
   ```

#### 2 渲染商品列表区域的基本结构

1. 通过 `mapState` 辅助函数，将 Store 中的 `cart` 数组映射到当前页面中使用：

   ```js
   import badgeMix from '@/mixins/tabbar-badge.js'
   // 按需导入 mapState 这个辅助函数
   import { mapState } from 'vuex'
   
   export default {
     mixins: [badgeMix],
     computed: {
       // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
       ...mapState('m_cart', ['cart']),
     },
     data() {
       return {}
     },
   }
   ```

2. 在 UI 结构中，通过 `v-for` 指令循环渲染自定义的 `my-goods` 组件：

   ```xml
   <!-- 商品列表区域 -->
   <block v-for="(goods, i) in cart" :key="i">
     <my-goods :goods="goods"></my-goods>
   </block>
   ```

#### 3 为 my-goods 组件封装 radio 勾选状态

1. 打开 `my-goods.vue` 组件的源代码，为商品的左侧图片区域添加 `radio` 组件：

   ```xml
   <!-- 商品左侧图片区域 -->
   <view class="goods-item-left">
     <radio checked color="#C00000"></radio>
     <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
   </view>
   ```

2. 给类名为 `goods-item-left` 的 `view` 组件添加样式，实现 `radio` 组件和 `image` 组件的左右布局：

   ```css
   .goods-item-left {
     margin-right: 5px;
     display: flex;
     justify-content: space-between;
     align-items: center;
   
     .goods-pic {
       width: 100px;
       height: 100px;
       display: block;
     }
   }
   ```

3. 封装名称为 `showRadio` 的 `props` 属性，来控制当前组件中是否显示 radio 组件：

   ```js
   export default {
     // 定义 props 属性，用来接收外界传递到当前组件的数据
     props: {
       // 商品的信息对象
       goods: {
         type: Object,
         default: {},
       },
       // 是否展示图片左侧的 radio
       showRadio: {
         type: Boolean,
         // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
         default: false,
       },
     },
   }
   ```

4. 使用 `v-if` 指令控制 `radio` 组件的按需展示：

   ```xml
   <!-- 商品左侧图片区域 -->
   <view class="goods-item-left">
     <!-- 使用 v-if 指令控制 radio 组件的显示与隐藏 -->
     <radio checked color="#C00000" v-if="showRadio"></radio>
     <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
   </view>
   ```

5. 在 `cart.vue` 页面中的商品列表区域，指定 `:show-radio="true"` 属性，从而显示 radio 组件：

   ```xml
   <!-- 商品列表区域 -->
   <block v-for="(goods, i) in cart" :key="i">
     <my-goods :goods="goods" :show-radio="true"></my-goods>
   </block>
   ```

6. 修改 `my-goods.vue` 组件，动态为 `radio` 绑定选中状态：

   ```xml
   <!-- 商品左侧图片区域 -->
   <view class="goods-item-left">
     <!-- 存储在购物车中的商品，包含 goods_state 属性，表示商品的勾选状态 -->
     <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio"></radio>
     <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
   </view>
   ```

#### 4 为 my-goods 组件封装 radio-change 事件

1. 当用户点击 radio 组件，**希望修改当前商品的勾选状态**，此时用户可以为 `my-goods` 组件绑定 `@radio-change` 事件，从而获取当前商品的 `goods_id` 和 `goods_state`：

   ```xml
   <!-- 商品列表区域 -->
   <block v-for="(goods, i) in cart" :key="i">
     <!-- 在 radioChangeHandler 事件处理函数中，通过事件对象 e，得到商品的 goods_id 和 goods_state -->
     <my-goods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler"></my-goods>
   </block>
   ```

   定义 `radioChangeHandler` 事件处理函数如下：

   ```js
   methods: {
     // 商品的勾选状态发生了变化
     radioChangeHandler(e) {
       console.log(e) // 输出得到的数据 -> {goods_id: 395, goods_state: false}
     }
   }
   ```

2. 在 `my-goods.vue` 组件中，为 `radio` 组件绑定 `@click` 事件处理函数如下：

   ```xml
   <!-- 商品左侧图片区域 -->
   <view class="goods-item-left">
     <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
     <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
   </view>
   ```

3. 在 `my-goods.vue` 组件的 methods 节点中，定义 `radioClickHandler` 事件处理函数：

   ```js
   methods: {
     // radio 组件的点击事件处理函数
     radioClickHandler() {
       // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
       // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
       this.$emit('radio-change', {
         // 商品的 Id
         goods_id: this.goods.goods_id,
         // 商品最新的勾选状态
         goods_state: !this.goods.goods_state
       })
     }
   }
   ```

#### 5 修改购物车中商品的勾选状态

1. 在 `store/cart.js` 模块中，声明如下的 `mutations` 方法，用来修改对应商品的勾选状态：

   ```js
   // 更新购物车中商品的勾选状态
   updateGoodsState(state, goods) {
     // 根据 goods_id 查询购物车中对应商品的信息对象
     const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
   
     // 有对应的商品信息对象
     if (findResult) {
       // 更新对应商品的勾选状态
       findResult.goods_state = goods.goods_state
       // 持久化存储到本地
       this.commit('m_cart/saveToStorage')
     }
   }
   ```

2. 在 `cart.vue` 页面中，导入 `mapMutations` 这个辅助函数，从而将需要的 mutations 方法映射到当前页面中使用：

   ```js
   import badgeMix from '@/mixins/tabbar-badge.js'
   import { mapState, mapMutations } from 'vuex'
   
   export default {
     mixins: [badgeMix],
     computed: {
       ...mapState('m_cart', ['cart']),
     },
     data() {
       return {}
     },
     methods: {
       ...mapMutations('m_cart', ['updateGoodsState']),
       // 商品的勾选状态发生了变化
       radioChangeHandler(e) {
         this.updateGoodsState(e)
       },
     },
   }
   ```

#### 6 为 my-goods 组件封装 NumberBox

> 注意：[NumberBox](https://ext.dcloud.net.cn/plugin?id=31) 组件是 uni-ui 提供的

1. 修改 `my-goods.vue` 组件的源代码，在类名为 `goods-info-box` 的 view 组件内部渲染 `NumberBox` 组件的基本结构：

   ```xml
   <view class="goods-info-box">
     <!-- 商品价格 -->
     <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
     <!-- 商品数量 -->
     <uni-number-box :min="1"></uni-number-box>
   </view>
   ```

2. 美化页面的结构：

   ```scss
   .goods-item-right {
     display: flex;
     flex: 1;
     flex-direction: column;
     justify-content: space-between;
   
     .goods-name {
       font-size: 13px;
     }
   
     .goods-info-box {
       display: flex;
       align-items: center;
       justify-content: space-between;
     }
   
     .goods-price {
       font-size: 16px;
       color: #c00000;
     }
   }
   ```

3. 在 `my-goods.vue` 组件中，动态为 `NumberBox` 组件绑定商品的数量值：

   ```xml
   <view class="goods-info-box">
     <!-- 商品价格 -->
     <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
     <!-- 商品数量 -->
     <uni-number-box :min="1" :value="goods.goods_count"></uni-number-box>
   </view>
   ```

4. 在 `my-goods.vue` 组件中，封装名称为 `showNum` 的 `props` 属性，来控制当前组件中是否显示 `NumberBox` 组件：

   ```js
   export default {
     // 定义 props 属性，用来接收外界传递到当前组件的数据
     props: {
       // 商品的信息对象
       goods: {
         type: Object,
         defaul: {},
       },
       // 是否展示图片左侧的 radio
       showRadio: {
         type: Boolean,
         // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
         default: false,
       },
       // 是否展示价格右侧的 NumberBox 组件
       showNum: {
         type: Boolean,
         default: false,
       },
     },
   }
   ```

5. 在 `my-goods.vue` 组件中，使用 `v-if` 指令控制 `NumberBox` 组件的按需展示：

   ```xml
   <view class="goods-info-box">
     <!-- 商品价格 -->
     <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
     <!-- 商品数量 -->
     <uni-number-box :min="1" :value="goods.goods_count" @change="numChangeHandler" v-if="showNum"></uni-number-box>
   </view>
   ```

6. 在 `cart.vue` 页面中的商品列表区域，指定 `:show-num="true"` 属性，从而显示 `NumberBox` 组件：

   ```xml
   <!-- 商品列表区域 -->
   <block v-for="(goods, i) in cart" :key="i">
     <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler"></my-goods>
   </block>
   ```

#### 7 为 my-goods 组件封装 num-change 事件

1. 当用户修改了 `NumberBox` 的值以后，希望将最新的商品数量更新到购物车中，此时用户可以为 `my-goods` 组件绑定 `@num-change` 事件，从而获取当前商品的 `goods_id` 和 `goods_count：`

   ```xml
   <!-- 商品列表区域 -->
   <block v-for="(goods, i) in cart" :key="i">
     <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
   </block>
   ```

   定义 `numberChangeHandler` 事件处理函数如下：

   ```js
   // 商品的数量发生了变化
   numberChangeHandler(e) {
     console.log(e)
   }
   ```

2. 在 `my-goods.vue` 组件中，为 `uni-number-box` 组件绑定 `@change` 事件处理函数如下：

   ```xml
   <view class="goods-info-box">
     <!-- 商品价格 -->
     <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
     <!-- 商品数量 -->
     <uni-number-box :min="1" :value="goods.goods_count" @change="numChangeHandler"></uni-number-box>
   </view>
   ```

3. 在 `my-goods.vue` 组件的 `methods` 节点中，定义 `numChangeHandler` 事件处理函数：

   ```js
   methods: {
     // NumberBox 组件的 change 事件处理函数
     numChangeHandler(val) {
       // 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
       this.$emit('num-change', {
         // 商品的 Id
         goods_id: this.goods.goods_id,
         // 商品的最新数量
         goods_count: +val
       })
     }
   }
   ```

#### 8 解决 NumberBox 数据不合法的问题

> 问题说明：当用户在 NumberBox 中输入字母等非法字符之后，会导致 NumberBox 数据紊乱的问题

1. 打开项目根目录中 `components/uni-number-box/uni-number-box.vue` 组件，修改 `methods` 节点中的 `_onBlur` 函数如下：

   ```js
   _onBlur(event) {
     // 官方的代码没有进行数值转换，用户输入的 value 值可能是非法字符：
     // let value = event.detail.value;
   
     // 将用户输入的内容转化为整数
     let value = parseInt(event.detail.value);
   
     if (!value) {
       // 如果转化之后的结果为 NaN，则给定默认值为 1
       this.inputValue = 1;
       return;
     }
   
     // 省略其它代码...
   }
   ```

2. 修改完毕之后，用户输入**小数**会**被转化为整数**，用户输入**非法字符**会**被替换为默认值 1**

#### 9 完善 NumberBox 的 inputValue 侦听器

> 问题说明：在用户每次输入内容之后，都会触发 inputValue 侦听器，从而调用 this.$emit("change", newVal) 方法。这种做法可能会把不合法的内容传递出去！

1. 打开项目根目录中 `components/uni-number-box/uni-number-box.vue` 组件，修改 `watch` 节点中的 `inputValue` 侦听器如下：

   ```js
   inputValue(newVal, oldVal) {
     // 官方提供的 if 判断条件，在用户每次输入内容时，都会调用 this.$emit("change", newVal)
     // if (+newVal !== +oldVal) {
   
     // 新旧内容不同 && 新值内容合法 && 新值中不包含小数点
     if (+newVal !== +oldVal && Number(newVal) && String(newVal).indexOf('.') === -1) {
       this.$emit("change", newVal);
     }
   }
   ```

2. 修改完毕之后，NumberBox 组件只会把**合法的、且不包含小数点的新值**传递出去

#### 10 修改购物车中商品的数量

1. 在 `store/cart.js` 模块中，声明如下的 mutations 方法，用来修改对应商品的数量：

   ```js
   // 更新购物车中商品的数量
   updateGoodsCount(state, goods) {
     // 根据 goods_id 查询购物车中对应商品的信息对象
     const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
   
     if(findResult) {
       // 更新对应商品的数量
       findResult.goods_count = goods.goods_count
       // 持久化存储到本地
       this.commit('m_cart/saveToStorage')
     }
   }
   ```

2. 在 `cart.vue` 页面中，通过 `mapMutations` 这个辅助函数，将需要的 `mutations` 方法映射到当前页面中使用：

   ```js
   import badgeMix from '@/mixins/tabbar-badge.js'
   import { mapState, mapMutations } from 'vuex'
   
   export default {
     mixins: [badgeMix],
     computed: {
       ...mapState('m_cart', ['cart']),
     },
     data() {
       return {}
     },
     methods: {
       ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount']),
       // 商品的勾选状态发生了变化
       radioChangeHandler(e) {
         this.updateGoodsState(e)
       },
       // 商品的数量发生了变化
       numberChangeHandler(e) {
         this.updateGoodsCount(e)
       },
     },
   }
   ```

#### 11 渲染滑动删除的 UI 效果

> 滑动删除需要用到 uni-ui 的 uni-swipe-action 组件和 uni-swipe-action-item。详细的官方文档请参考[SwipeAction 滑动操作](https://ext.dcloud.net.cn/plugin?id=181)。

1. 改造 `cart.vue` 页面的 UI 结构，将商品列表区域的结构修改如下（可以使用 **uSwipeAction** 代码块快速生成基本的 UI 结构）：

   ```xml
   <!-- 商品列表区域 -->
   <!-- uni-swipe-action 是最外层包裹性质的容器 -->
   <uni-swipe-action>
     <block v-for="(goods, i) in cart" :key="i">
       <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
       <uni-swipe-action-item :options="options" @click="swipeActionClickHandler(goods)">
         <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
       </uni-swipe-action-item>
     </block>
   </uni-swipe-action>
   ```

2. 在 data 节点中声明 `options` 数组，用来定义操作按钮的配置信息：

   ```js
   data() {
     return {
       options: [{
         text: '删除', // 显示的文本内容
         style: {
           backgroundColor: '#C00000' // 按钮的背景颜色
         }
       }]
     }
   }
   ```

3. 在 `methods` 中声明 `uni-swipe-action-item` 组件的 `@click` 事件处理函数：

   ```js
   // 点击了滑动操作按钮
   swipeActionClickHandler(goods) {
     console.log(goods)
   }
   ```

4. 美化 `my-goods.vue` 组件的样式：

   ```scss
   .goods-item {
     // 让 goods-item 项占满整个屏幕的宽度
     width: 750rpx;
     // 设置盒模型为 border-box
     box-sizing: border-box;
     display: flex;
     padding: 10px 5px;
     border-bottom: 1px solid #f0f0f0;
   }
   ```

#### 12 实现滑动删除的功能

1. 在 `store/cart.js` 模块的 `mutations` 节点中声明如下的方法，从而根据商品的 Id 从购物车中移除对应的商品：

   ```js
   // 根据 Id 从购物车中删除对应的商品信息
   removeGoodsById(state, goods_id) {
     // 调用数组的 filter 方法进行过滤
     state.cart = state.cart.filter(x => x.goods_id !== goods_id)
     // 持久化存储到本地
     this.commit('m_cart/saveToStorage')
   }
   ```

2. 在 `cart.vue` 页面中，使用 `mapMutations` 辅助函数，把需要的方法映射到当前页面中使用：

   ```js
   methods: {
     ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
     // 商品的勾选状态发生了变化
     radioChangeHandler(e) {
       this.updateGoodsState(e)
     },
     // 商品的数量发生了变化
     numberChangeHandler(e) {
       this.updateGoodsCount(e)
     },
     // 点击了滑动操作按钮
     swipeActionClickHandler(goods) {
       this.removeGoodsById(goods.goods_id)
     }
   }
   ```

### 5.9.2 收货地址区域

#### 1 创建收货地址组件

1. 在 `components` 目录上鼠标右键，选择 `新建组件`，并填写组件相关的信息：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081001965.png)

2. 渲染收货地址组件的基本结构：

   ```xml
   <view>
   
     <!-- 选择收货地址的盒子 -->
     <view class="address-choose-box">
       <button type="primary" size="mini" class="btnChooseAddress">请选择收货地址+</button>
     </view>
   
     <!-- 渲染收货信息的盒子 -->
     <view class="address-info-box">
       <view class="row1">
         <view class="row1-left">
           <view class="username">收货人：<text>escook</text></view>
         </view>
         <view class="row1-right">
           <view class="phone">电话：<text>138XXXX5555</text></view>
           <uni-icons type="arrowright" size="16"></uni-icons>
         </view>
       </view>
       <view class="row2">
         <view class="row2-left">收货地址：</view>
         <view class="row2-right">河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx </view>
       </view>
     </view>
   
     <!-- 底部的边框线 -->
     <image src="/static/cart_border@2x.png" class="address-border"></image>
   </view>
   ```

3. 美化收货地址组件的样式：

   ```scss
   // 底部边框线的样式
   .address-border {
     display: block;
     width: 100%;
     height: 5px;
   }
   
   // 选择收货地址的盒子
   .address-choose-box {
     height: 90px;
     display: flex;
     align-items: center;
     justify-content: center;
   }
   
   // 渲染收货信息的盒子
   .address-info-box {
     font-size: 12px;
     height: 90px;
     display: flex;
     flex-direction: column;
     justify-content: center;
     padding: 0 5px;
   
     // 第一行
     .row1 {
       display: flex;
       justify-content: space-between;
   
       .row1-right {
         display: flex;
         align-items: center;
   
         .phone {
           margin-right: 5px;
         }
       }
     }
   
     // 第二行
     .row2 {
       display: flex;
       align-items: center;
       margin-top: 10px;
   
       .row2-left {
         white-space: nowrap;
       }
     }
   }
   ```

#### 2 实现收货地址区域的按需展示

1. 在 data 中定义收货地址的信息对象：

   ```js
   export default {
     data() {
       return {
         // 收货地址
         address: {},
       }
     },
   }
   ```

2. 使用 `v-if` 和 `v-else` 实现按需展示：

   ```xml
   <!-- 选择收货地址的盒子 -->
   <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
     <button type="primary" size="mini" class="btnChooseAddress">请选择收货地址+</button>
   </view>
   
   <!-- 渲染收货信息的盒子 -->
   <view class="address-info-box" v-else>
     <!-- 省略其它代码 -->
   </view>
   ```

#### 3 实现选择收货地址的功能

1. 为 `请选择收货地址+` 的 `button` 按钮绑定点击事件处理函数

   ```xml
   <!-- 选择收货地址的盒子 -->
   <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
     <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
   </view>
   ```

2. 定义 `chooseAddress` 事件处理函数，调用小程序提供的 `chooseAddress()` API 实现选择收货地址的功能：

   ```js
   methods: {
     // 选择收货地址
     async chooseAddress() {
       // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
       //    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
       const [err, succ] = await uni.chooseAddress().catch(err => err)
   
       // 2. 用户成功的选择了收货地址
       if (err === null && succ.errMsg === 'chooseAddress:ok') {
         // 为 data 里面的收货地址对象赋值
         this.address = succ
       }
     }
   }
   ```

3. 定义**收货详细地址**的计算属性：

   ```js
   computed: {
     // 收货详细地址的计算属性
     addstr() {
       if (!this.address.provinceName) return ''
   
       // 拼接 省，市，区，详细地址 的字符串并返回给用户
       return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
     }
   }
   ```

4. 渲染收货地址区域的数据：

   ```xml
   <!-- 渲染收货信息的盒子 -->
   <view class="address-info-box" v-else>
     <view class="row1">
       <view class="row1-left">
         <view class="username">收货人：<text>{{address.userName}}</text></view>
       </view>
       <view class="row1-right">
         <view class="phone">电话：<text>{{address.telNumber}}</text></view>
         <uni-icons type="arrowright" size="16"></uni-icons>
       </view>
     </view>
     <view class="row2">
       <view class="row2-left">收货地址：</view>
       <view class="row2-right">{{addstr}}</view>
     </view>
   </view>
   ```

#### 4 将 address 信息存储到 vuex 中

1. 在 `store` 目录中，创建用户相关的 `vuex` 模块，命名为 `user.js`：

   ```js
   export default {
     // 开启命名空间
     namespaced: true,
   
     // state 数据
     state: () => ({
       // 收货地址
       address: {},
     }),
   
     // 方法
     mutations: {
       // 更新收货地址
       updateAddress(state, address) {
         state.address = address
       },
     },
   
     // 数据包装器
     getters: {},
   }
   ```

2. 在 `store/store.js` 模块中，导入并挂载 `user.js` 模块：

   ```js
   // 1. 导入 Vue 和 Vuex
   import Vue from 'vue'
   import Vuex from 'vuex'
   // 导入购物车的 vuex 模块
   import moduleCart from './cart.js'
   // 导入用户的 vuex 模块
   import moduleUser from './user.js'
   
   // 2. 将 Vuex 安装为 Vue 的插件
   Vue.use(Vuex)
   
   // 3. 创建 Store 的实例对象
   const store = new Vuex.Store({
     // TODO：挂载 store 模块
     modules: {
       // 挂载购物车的 vuex 模块，模块内成员的访问路径被调整为 m_cart，例如：
       // 购物车模块中 cart 数组的访问路径是 m_cart/cart
       m_cart: moduleCart,
       // 挂载用户的 vuex 模块，访问路径为 m_user
       m_user: moduleUser,
     },
   })
   
   // 4. 向外共享 Store 的实例对象
   export default store
   ```

3. 改造 `address.vue` 组件中的代码，使用 **vuex 提供的 address 计算属性** 替代 **data 中定义的本地 address 对象**：

   ```js
   // 1. 按需导入 mapState 和 mapMutations 这两个辅助函数
   import { mapState, mapMutations } from 'vuex'
   
   export default {
     data() {
       return {
         // 2.1 注释掉下面的 address 对象，使用 2.2 中的代码替代之
         // address: {}
       }
     },
     methods: {
       // 3.1 把 m_user 模块中的 updateAddress 函数映射到当前组件
       ...mapMutations('m_user', ['updateAddress']),
       // 选择收货地址
       async chooseAddress() {
         const [err, succ] = await uni.chooseAddress().catch((err) => err)
   
         // 用户成功的选择了收货地址
         if (err === null && succ.errMsg === 'chooseAddress:ok') {
           // 3.2 把下面这行代码注释掉，使用 3.3 中的代码替代之
           // this.address = succ
   
           // 3.3 调用 Store 中提供的 updateAddress 方法，将 address 保存到 Store 里面
           this.updateAddress(succ)
         }
       },
     },
     computed: {
       // 2.2 把 m_user 模块中的 address 对象映射当前组件中使用，代替 data 中 address 对象
       ...mapState('m_user', ['address']),
       // 收货详细地址的计算属性
       addstr() {
         if (!this.address.provinceName) return ''
   
         // 拼接 省，市，区，详细地址 的字符串并返回给用户
         return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
       },
     },
   }
   ```

#### 5 将 Store 中的 address 持久化存储到本地

1. 修改 `store/user.js` 模块中的代码如下：

   ```js
   export default {
     // 开启命名空间
     namespaced: true,
   
     // state 数据
     state: () => ({
       // 3. 读取本地的收货地址数据，初始化 address 对象
       address: JSON.parse(uni.getStorageSync('address') || '{}'),
     }),
   
     // 方法
     mutations: {
       // 更新收货地址
       updateAddress(state, address) {
         state.address = address
   
         // 2. 通过 this.commit() 方法，调用 m_user 模块下的 saveAddressToStorage 方法将 address 对象持久化存储到本地
         this.commit('m_user/saveAddressToStorage')
       },
       // 1. 定义将 address 持久化存储到本地 mutations 方法
       saveAddressToStorage(state) {
         uni.setStorageSync('address', JSON.stringify(state.address))
       },
     },
   
     // 数据包装器
     getters: {},
   }
   ```

#### 6 将 addstr 抽离为 getters

> 目的：为了提高代码的复用性，可以把收货的详细地址抽离为 getters，方便在多个页面和组件之间实现复用。

1. 剪切 `my-address.vue` 组件中的 `addstr` 计算属性的代码，粘贴到 `user.js` 模块中，作为一个 getters 节点：

   ```js
   // 数据包装器
   getters: {
     // 收货详细地址的计算属性
     addstr(state) {
       if (!state.address.provinceName) return ''
   
       // 拼接 省，市，区，详细地址 的字符串并返回给用户
       return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
     }
   }
   ```

2. 改造 `my-address.vue` 组件中的代码，通过 `mapGetters` 辅助函数，将 `m_user` 模块中的 `addstr` 映射到当前组件中使用：

   ```js
   // 按需导入 mapGetters 辅助函数
   import { mapState, mapMutations, mapGetters } from 'vuex'
   
   export default {
     // 省略其它代码
     computed: {
       ...mapState('m_user', ['address']),
       // 将 m_user 模块中的 addstr 映射到当前组件中使用
       ...mapGetters('m_user', ['addstr']),
     },
   }
   ```

#### 7 重新选择收货地址

1. 为 class 类名为 `address-info-box` 的盒子绑定 `click` 事件处理函数如下：

   ```xml
   <!-- 渲染收货信息的盒子 -->
   <view class="address-info-box" v-else @click="chooseAddress">
     <!-- 省略其它代码 -->
   </view>
   ```

#### 8 解决收货地址授权失败的问题

> 如果在选择收货地址的时候，用户点击了**取消授权**，则需要进行**特殊的处理**，否则**用户将无法再次选择收货地址**！

1. 改造 `chooseAddress` 方法如下：

   ```js
   // 选择收货地址
   async chooseAddress() {
     // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
     //    返回值是一个数组：第1项为错误对象；第2项为成功之后的收货地址对象
     const [err, succ] = await uni.chooseAddress().catch(err => err)
   
     // 2. 用户成功的选择了收货地址
     if (succ && succ.errMsg === 'chooseAddress:ok') {
       // 更新 vuex 中的收货地址
       this.updateAddress(succ)
     }
   
     // 3. 用户没有授权
     if (err && err.errMsg === 'chooseAddress:fail auth deny') {
       this.reAuth() // 调用 this.reAuth() 方法，向用户重新发起授权申请
     }
   }
   ```

2. 在 `methods` 节点中声明 `reAuth` 方法如下：

   ```js
   // 调用此方法，重新发起收货地址的授权
   async reAuth() {
     // 3.1 提示用户对地址进行授权
     const [err2, confirmResult] = await uni.showModal({
       content: '检测到您没打开地址权限，是否去设置打开？',
       confirmText: "确认",
       cancelText: "取消",
     })
   
     // 3.2 如果弹框异常，则直接退出
     if (err2) return
   
     // 3.3 如果用户点击了 “取消” 按钮，则提示用户 “您取消了地址授权！”
     if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
   
     // 3.4 如果用户点击了 “确认” 按钮，则调用 uni.openSetting() 方法进入授权页面，让用户重新进行授权
     if (confirmResult.confirm) return uni.openSetting({
       // 3.4.1 授权结束，需要对授权的结果做进一步判断
       success: (settingResult) => {
         // 3.4.2 地址授权的值等于 true，提示用户 “授权成功”
         if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
         // 3.4.3 地址授权的值等于 false，提示用户 “您取消了地址授权”
         if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
       }
     })
   }
   ```

#### 9 解决 iPhone 真机上无法重新授权的问题

> 问题说明：在 iPhone 设备上，当用户取消授权之后，再次点击选择收货地址按钮的时候，无法弹出授权的提示框！

1. 导致问题的原因 - 用户取消授权后，再次点击 “选择收货地址” 按钮的时候：

   - 在**模拟器**和**安卓真机**上，错误消息 `err.errMsg` 的值为 `chooseAddress:fail auth deny`
   - 在 **iPhone 真机**上，错误消息 `err.errMsg` 的值为 `chooseAddress:fail authorize no response`

2. 解决问题的方案 - 修改 `chooseAddress` 方法中的代码，进一步完善用户没有授权时的 `if` 判断条件即可：

   ```js
   async chooseAddress() {
     // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
     //    返回值是一个数组：第1项为错误对象；第2项为成功之后的收货地址对象
     const [err, succ] = await uni.chooseAddress().catch(err => err)
   
     // 2. 用户成功的选择了收货地址
     if (succ && succ.errMsg === 'chooseAddress:ok') {
       this.updateAddress(succ)
     }
   
     // 3. 用户没有授权
     if (err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')) {
       this.reAuth()
     }
   }
   ```

### 5.9.3 结算区域

#### 1 把结算区域封装为组件

1. 在 `components` 目录中，新建 `my-settle` 结算组件：

   ![img](https://www.escook.cn/docs-uni-shop/assets/img/9-4.1739d570.png)

2. 初始化 `my-settle` 组件的基本结构和样式：

   ```vue
   <template>
     <!-- 最外层的容器 -->
     <view class="my-settle-container">
       结算组件
     </view>
   </template>
   
   <script>
   export default {
     data() {
       return {}
     },
   }
   </script>
   
   <style lang="scss">
   .my-settle-container {
     /* 底部固定定位 */
     position: fixed;
     bottom: 0;
     left: 0;
     /* 设置宽高和背景色 */
     width: 100%;
     height: 50px;
     background-color: cyan;
   }
   </style>
   ```

3. 在 `cart.vue` 页面中使用自定义的 `my-settle` 组件，并美化页面样式，防止页面底部被覆盖：

   ```vue
   <template>
     <view class="cart-container">
       <!-- 使用自定义的 address 组件 -->
   
       <!-- 购物车商品列表的标题区域 -->
   
       <!-- 商品列表区域 -->
   
       <!-- 结算区域 -->
       <my-settle></my-settle>
     </view>
   </template>
   
   <style lang="scss">
   .cart-container {
     padding-bottom: 50px;
   }
   </style>
   ```

#### 2 渲染结算区域的结构和样式

1. 定义如下的 UI 结构：

   ```xml
   <!-- 最外层的容器 -->
   <view class="my-settle-container">
     <!-- 全选区域 -->
     <label class="radio">
       <radio color="#C00000" :checked="true" /><text>全选</text>
     </label>
   
     <!-- 合计区域 -->
     <view class="amount-box">
       合计:<text class="amount">￥1234.00</text>
     </view>
   
     <!-- 结算按钮 -->
     <view class="btn-settle">结算(0)</view>
   </view>
   ```

2. 美化样式：

   ```scss
   .my-settle-container {
     position: fixed;
     bottom: 0;
     left: 0;
     width: 100%;
     height: 50px;
     // 将背景色从 cyan 改为 white
     background-color: white;
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding-left: 5px;
     font-size: 14px;
   
     .radio {
       display: flex;
       align-items: center;
     }
   
     .amount {
       color: #c00000;
     }
   
     .btn-settle {
       height: 50px;
       min-width: 100px;
       background-color: #c00000;
       color: white;
       line-height: 50px;
       text-align: center;
       padding: 0 10px;
     }
   }
   ```

#### 3 动态渲染已勾选商品的总数量

1. 在 `store/cart.js` 模块中，定义一个名称为 `checkedCount` 的 getters，用来统计已勾选商品的总数量：

   ```js
   // 勾选的商品的总数量
   checkedCount(state) {
     // 先使用 filter 方法，从购物车中过滤器已勾选的商品
     // 再使用 reduce 方法，将已勾选的商品总数量进行累加
     // reduce() 的返回值就是已勾选的商品的总数量
     return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
   }
   ```

2. 在 `my-settle` 组件中，通过 `mapGetters` 辅助函数，将需要的 getters 映射到当前组件中使用：

   ```js
   import { mapGetters } from 'vuex'
   
   export default {
     computed: {
       ...mapGetters('m_cart', ['checkedCount']),
     },
     data() {
       return {}
     },
   }
   ```

3. 将 `checkedCount` 的值渲染到页面中：

   ```xml
   <!-- 结算按钮 -->
   <view class="btn-settle">结算({{checkedCount}})</view>
   ```

#### 4 动态渲染全选按钮的选中状态

1. 使用 `mapGetters` 辅助函数，将**商品的总数量**映射到当前组件中使用，并定义一个叫做 `isFullCheck` 的计算属性：

   ```js
   import { mapGetters } from 'vuex'
   
   export default {
     computed: {
       // 1. 将 total 映射到当前组件中
       ...mapGetters('m_cart', ['checkedCount', 'total']),
       // 2. 是否全选
       isFullCheck() {
         return this.total === this.checkedCount
       },
     },
     data() {
       return {}
     },
   }
   ```

2. 为 radio 组件动态绑定 `checked` 属性的值：

   ```xml
   <!-- 全选区域 -->
   <label class="radio">
     <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
   </label>
   ```

#### 5 实现商品的全选/反选功能

1. 在 `store/cart.js` 模块中，定义一个叫做 `updateAllGoodsState` 的 mutations 方法，用来修改所有商品的勾选状态：

   ```js
   // 更新所有商品的勾选状态
   updateAllGoodsState(state, newState) {
     // 循环更新购物车中每件商品的勾选状态
     state.cart.forEach(x => x.goods_state = newState)
     // 持久化存储到本地
     this.commit('m_cart/saveToStorage')
   }
   ```

2. 在 `my-settle` 组件中，通过 `mapMutations` 辅助函数，将需要的 mutations 方法映射到当前组件中使用：

   ```js
   // 1. 按需导入 mapMutations 辅助函数
   import { mapGetters, mapMutations } from 'vuex'
   
   export default {
     // 省略其它代码
     methods: {
       // 2. 使用 mapMutations 辅助函数，把 m_cart 模块提供的 updateAllGoodsState 方法映射到当前组件中使用
       ...mapMutations('m_cart', ['updateAllGoodsState']),
     },
   }
   ```

3. 为 UI 中的 `label` 组件绑定 `click` 事件处理函数：

   ```xml
   <!-- 全选区域 -->
   <label class="radio" @click="changeAllState">
     <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
   </label>
   ```

4. 在 `my-settle` 组件的 methods 节点中，声明 `changeAllState` 事件处理函数：

   ```js
   methods: {
     ...mapMutations('m_cart', ['updateAllGoodsState']),
     // label 的点击事件处理函数
     changeAllState() {
       // 修改购物车中所有商品的选中状态
       // !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
       this.updateAllGoodsState(!this.isFullCheck)
     }
   }
   ```

#### 6 动态渲染已勾选商品的总价格

1. 在 `store/cart.js` 模块中，定义一个叫做 `checkedGoodsAmount` 的 getters，用来统计已勾选商品的总价格：

   ```js
   // 已勾选的商品的总价
   checkedGoodsAmount(state) {
     // 先使用 filter 方法，从购物车中过滤器已勾选的商品
     // 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
     // reduce() 的返回值就是已勾选的商品的总价
     // 最后调用 toFixed(2) 方法，保留两位小数
     return state.cart.filter(x => x.goods_state)
                      .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
                      .toFixed(2)
   }
   ```

2. 在 `my-settle` 组件中，使用 `mapGetters` 辅助函数，把需要的 `checkedGoodsAmount` 映射到当前组件中使用：

   ```js
   ...mapGetters('m_cart', ['total', 'checkedCount', 'checkedGoodsAmount'])
   ```

3. 在组件的 UI 结构中，渲染已勾选的商品的总价：

   ```xml
   <!-- 合计区域 -->
   <view class="amount-box">
     合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
   </view>
   ```

#### 7 动态计算购物车徽标的数值

1. **问题说明**：当修改购物车中商品的数量之后，tabBar 上的数字徽标不会自动更新。

2. **解决方案**：改造 `mixins/tabbar-badge.js` 中的代码，使用 `watch` 侦听器，监听 `total` 总数量的变化，从而动态为 tabBar 的徽标赋值： 

   ```js
   import { mapGetters } from 'vuex'
   
   // 导出一个 mixin 对象
   export default {
     computed: {
       ...mapGetters('m_cart', ['total']),
     },
     watch: {
       // 监听 total 值的变化
       total() {
         // 调用 methods 中的 setBadge 方法，重新为 tabBar 的数字徽章赋值
         this.setBadge()
       },
     },
     onShow() {
       // 在页面刚展示的时候，设置数字徽标
       this.setBadge()
     },
     methods: {
       setBadge() {
         // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
         uni.setTabBarBadge({
           index: 2,
           text: this.total + '', // 注意：text 的值必须是字符串，不能是数字
         })
       },
     },
   }
   ```

#### 8 渲染购物车为空时的页面结构

1. 将 `资料` 目录中的 `cart_empty@2x.png` 图片复制到项目的 `/static/` 目录中

2. 改造 `cart.vue` 页面的 UI 结构，使用 `v-if` 和 `v-else` 控制**购物车区域**和**空白购物车区域**的按需展示：

   ```xml
   <template>
     <view class="cart-container" v-if="cart.length !== 0">
   
       <!-- 使用自定义的 address 组件 -->
   
       <!-- 购物车商品列表的标题区域 -->
   
       <!-- 商品列表区域 -->
   
       <!-- 结算区域 -->
   
     </view>
   
     <!-- 空白购物车区域 -->
     <view class="empty-cart" v-else>
       <image src="/static/cart_empty@2x.png" class="empty-img"></image>
       <text class="tip-text">空空如也~</text>
     </view>
   </template>
   ```

3. 美化空白购物车区域的样式：

   ```scss
   .empty-cart {
     display: flex;
     flex-direction: column;
     align-items: center;
     padding-top: 150px;
   
     .empty-img {
       width: 90px;
       height: 90px;
     }
   
     .tip-text {
       font-size: 12px;
       color: gray;
       margin-top: 15px;
     }
   }
   ```

### 5.9.4 分支的合并与提交

1. 将 `cart` 分支进行本地提交：

   ```bash
   git add .
   git commit -m "完成了购物车的开发"
   ```

2. 将本地的 `cart` 分支推送到码云：

   ```bash
   git push -u origin cart
   ```

3. 将本地 `cart` 分支中的代码合并到 `master` 分支：

   ```bash
   git checkout master
   git merge cart
   git push
   ```

4. 删除本地的 `cart` 分支：

   ```bash
   git branch -d cart
   ```

## 5.10 登录与支付

### 5.10.0 创建 settle 分支

运行如下的命令，基于 `master` 分支在本地创建 `settle` 子分支，用来开发登录与支付相关的功能：

```bash
git checkout -b settle
```

### 5.10.1 点击结算按钮进行条件判断

> 说明：用户点击了结算按钮之后，需要先后判断**是否勾选了要结算的商品**、**是否选择了收货地址**、**是否登录**。

1. 在 `my-settle` 组件中，为结算按钮绑定点击事件处理函数：

   ```xml
   <!-- 结算按钮 -->
   <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
   ```

2. 在 `my-settle` 组件的 methods 节点中声明 settlement 事件处理函数如下：

   ```js
   // 点击了结算按钮
   settlement() {
     // 1. 先判断是否勾选了要结算的商品
     if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
   
     // 2. 再判断用户是否选择了收货地址
     if (!this.addstr) return uni.$showMsg('请选择收货地址！')
   
     // 3. 最后判断用户是否登录了
     if (!this.token) return uni.$showMsg('请先登录！')
   }
   ```

3. 在 `my-settle` 组件中，使用 `mapGetters` 辅助函数，从 `m_user` 模块中将 `addstr` 映射到当前组件中使用：

   ```js
   export default {
     computed: {
       ...mapGetters('m_cart', ['total', 'checkedCount', 'checkedGoodsAmount']),
       // addstr 是详细的收货地址
       ...mapGetters('m_user', ['addstr']),
       isFullCheck() {
         return this.total === this.checkedCount
       },
     },
   }
   ```

4. 在 `store/user.js` 模块的 `state` 节点中，声明 `token` 字符串：

   ```js
   export default {
     // 开启命名空间
     namespaced: true,
   
     // state 数据
     state: () => ({
       // 收货地址
       address: JSON.parse(uni.getStorageSync('address') || '{}'),
       // 登录成功之后的 token 字符串
       token: '',
     }),
   
     // 省略其它代码
   }
   ```

5. 在 `my-settle` 组件中，使用 `mapState` 辅助函数，从 `m_user` 模块中将 `token` 映射到当前组件中使用：

   ```js
   // 按需从 vuex 中导入 mapState 辅助函数
   import { mapGetters, mapMutations, mapState } from 'vuex'
   
   export default {
     computed: {
       ...mapGetters('m_cart', ['total', 'checkedCount', 'checkedGoodsAmount']),
       ...mapGetters('m_user', ['addstr']),
       // token 是用户登录成功之后的 token 字符串
       ...mapState('m_user', ['token']),
       isFullCheck() {
         return this.total === this.checkedCount
       },
     },
   }
   ```

### 5.10.2 登录

#### 1 定义 my 页面的编译模式

1. 点击 `微信开发者工具` 工具栏上的编译模式下拉菜单，选择 `添加编译模式`：

   ![img](data:image/png;base64,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)

2. 勾选启动页面的路径之后，点击确定按钮：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081009046.png)

#### 2 实现登录和用户信息组件的按需展示

1. 在 `components` 目录中新建**登录组件**：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081009698.png)

2. 在 `components` 目录中新建**用户信息组件**：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081009012.png)

3. 在 `my.vue` 页面中，通过 `mapState` 辅助函数，导入需要的 `token` 字符串：

   ```js
   import badgeMix from '@/mixins/tabbar-badge.js'
   // 1. 从 vuex 中按需导入 mapState 辅助函数
   import { mapState } from 'vuex'
   
   export default {
     mixins: [badgeMix],
     computed: {
       // 2. 从 m_user 模块中导入需要的 token 字符串
       ...mapState('m_user', ['token']),
     },
     data() {
       return {}
     },
   }
   ```

4. 在 `my.vue` 页面中，实现**登录组件**和**用户信息组件**的按需展示：

   ```xml
   <template>
     <view>
   
       <!-- 用户未登录时，显示登录组件 -->
       <my-login v-if="!token"></my-login>
   
       <!-- 用户登录后，显示用户信息组件 -->
       <my-userinfo v-else></my-userinfo>
   
     </view>
   </template>
   ```

#### 3 实现登录组件的基本布局

1. 为 `my-login` 组件定义如下的 UI 结构：

   ```xml
   <template>
     <view class="login-container">
       <!-- 提示登录的图标 -->
       <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
       <!-- 登录按钮 -->
       <button type="primary" class="btn-login">一键登录</button>
       <!-- 登录提示 -->
       <view class="tips-text">登录后尽享更多权益</view>
     </view>
   </template>
   ```

2. 美化登录组件的样式：

   ```scss
   .login-container {
     // 登录盒子的样式
     height: 750rpx;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     background-color: #f8f8f8;
     position: relative;
     overflow: hidden;
   
     // 绘制登录盒子底部的半椭圆造型
     &::after {
       content: ' ';
       display: block;
       position: absolute;
       width: 100%;
       height: 40px;
       left: 0;
       bottom: 0;
       background-color: white;
       border-radius: 100%;
       transform: translateY(50%);
     }
   
     // 登录按钮的样式
     .btn-login {
       width: 90%;
       border-radius: 100px;
       margin: 15px 0;
       background-color: #c00000;
     }
   
     // 按钮下方提示消息的样式
     .tips-text {
       font-size: 12px;
       color: gray;
     }
   }
   ```

#### 4 点击登录按钮获取微信用户的基本信息

> 需求描述：需要获取微信用户的**头像**、**昵称**等基本信息。

1. 为登录的 `button` 按钮绑定 `open-type="getUserInfo"` 属性，表示点击按钮时，希望获取用户的基本信息：

   ```xml
   <!-- 登录按钮 -->
   <!-- 可以从 @getuserinfo 事件处理函数的形参中，获取到用户的基本信息 -->
   <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
   ```

2. 在 `methods` 节点中声明 `getUserInfo` 事件处理函数如下：

   ```js
   methods: {
     // 获取微信用户的基本信息
     getUserInfo(e) {
       // 判断是否获取用户信息成功
       if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
   
       // 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
       console.log(e.detail.userInfo)
     }
   }
   ```

#### 5 将用户的基本信息存储到 vuex

1. 在 `store/user.js` 模块的 state 节点中，声明 `userinfo` 的信息对象如下：

   ```js
   // state 数据
   state: () => ({
     // 收货地址
     // address: {}
     address: JSON.parse(uni.getStorageSync('address') || '{}'),
     // 登录成功之后的 token 字符串
     token: '',
     // 用户的基本信息
     userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
   }),
   ```

2. 在 `store/user.js` 模块的 mutations 节点中，声明如下的两个方法：

   ```js
   // 方法
   mutations: {
     // 省略其它代码...
   
     // 更新用户的基本信息
     updateUserInfo(state, userinfo) {
       state.userinfo = userinfo
       // 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
       this.commit('m_user/saveUserInfoToStorage')
     },
   
     // 将 userinfo 持久化存储到本地
     saveUserInfoToStorage(state) {
       uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
     }
   }
   ```

3. 使用 `mapMutations` 辅助函数，将需要的方法映射到 `my-login` 组件中使用：

   ```js
   // 1. 按需导入 mapMutations 辅助函数
   import { mapMutations } from 'vuex'
   
   export default {
     data() {
       return {}
     },
     methods: {
       // 2. 调用 mapMutations 辅助方法，把 m_user 模块中的 updateUserInfo 映射到当前组件中使用
       ...mapMutations('m_user', ['updateUserInfo']),
       // 获取微信用户的基本信息
       getUserInfo(e) {
         // 判断是否获取用户信息成功
         if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
         // 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
         // console.log(e.detail.userInfo)
   
         // 3. 将用户的基本信息存储到 vuex 中
         this.updateUserInfo(e.detail.userInfo)
       },
     },
   }
   ```

#### 6 登录获取 Token 字符串

> 需求说明：当获取到了微信用户的基本信息之后，还需要进一步**调用登录相关的接口**，从而**换取登录成功之后的 Token 字符串**。

1. 在 `getUserInfo` 方法中，预调用 `this.getToken()` 方法，同时把获取到的用户信息传递进去：

   ```js
   // 获取微信用户的基本信息
   getUserInfo(e) {
     // 判断是否获取用户信息成功
     if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
   
     // 将用户的基本信息存储到 vuex 中
     this.updateUserInfo(e.detail.userInfo)
   
     // 获取登录成功后的 Token 字符串
     this.getToken(e.detail)
   }
   ```

2. 在 `methods` 中定义 `getToken` 方法，调用登录相关的 API，实现登录的功能：

   ```js
   // 调用登录接口，换取永久的 token
   async getToken(info) {
     // 调用微信登录接口
     const [err, res] = await uni.login().catch(err => err)
     // 判断是否 uni.login() 调用失败
     if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
   
     // 准备参数对象
     const query = {
       code: res.code,
       encryptedData: info.encryptedData,
       iv: info.iv,
       rawData: info.rawData,
       signature: info.signature
     }
   
     // 换取 token
     const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
     if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
     uni.$showMsg('登录成功')
   }
   ```

#### 7 将 Token 存储到 vuex

1. 在 `store/user.js` 模块的 `mutations` 节点中，声明如下的两个方法：

   ```js
   mutations: {
     // 省略其它代码...
   
     // 更新 token 字符串
     updateToken(state, token) {
       state.token = token
       // 通过 this.commit() 方法，调用 m_user 模块下的 saveTokenToStorage 方法，将 token 字符串持久化存储到本地
       this.commit('m_user/saveTokenToStorage')
     },
   
     // 将 token 字符串持久化存储到本地
     saveTokenToStorage(state) {
       uni.setStorageSync('token', state.token)
     }
   }
   ```

2. 修改 `store/user.js` 模块的 `state` 节点如下：

   ```js
   // state 数据
   state: () => ({
     // 收货地址
     address: JSON.parse(uni.getStorageSync('address') || '{}'),
     // 登录成功之后的 token 字符串
     token: uni.getStorageSync('token') || '',
     // 用户的基本信息
     userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
   }),
   ```

3. 在 `my-login` 组件中，把 vuex 中的 `updateToken` 方法映射到当前组件中使用：

   ```js
   methods: {
     // 1. 使用 mapMutations 辅助方法，把 m_user 模块中的 updateToken 方法映射到当前组件中使用
     ...mapMutations('m_user', ['updateUserInfo', 'updateToken'])
   
     // 省略其它代码...
   
     // 调用登录接口，换取永久的 token
     async getToken(info) {
       // 调用微信登录接口
       const [err, res] = await uni.login().catch(err => err)
       // 判断是否 uni.login() 调用失败
       if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
   
       // 准备参数对象
       const query = {
         code: res.code,
         encryptedData: info.encryptedData,
         iv: info.iv,
         rawData: info.rawData,
         signature: info.signature
       }
   
       // 换取 token
       const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
       if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
   
       // 2. 更新 vuex 中的 token
       this.updateToken(loginResult.message.token)
     }
   }
   ```

### 5.10.3 用户信息

#### 1 实现用户头像昵称区域的基本布局

1. 在 `my-userinfo` 组件中，定义如下的 UI 结构：

   ```xml
   <template>
     <view class="my-userinfo-container">
   
       <!-- 头像昵称区域 -->
       <view class="top-box">
         <image src="" class="avatar"></image>
         <view class="nickname">xxx</view>
       </view>
   
     </view>
   </template>
   ```

2. 美化当前组件的样式：

   ```scss
   .my-userinfo-container {
     height: 100%;
     // 为整个组件的结构添加浅灰色的背景
     background-color: #f4f4f4;
   
     .top-box {
       height: 400rpx;
       background-color: #c00000;
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
   
       .avatar {
         display: block;
         width: 90px;
         height: 90px;
         border-radius: 45px;
         border: 2px solid white;
         box-shadow: 0 1px 5px black;
       }
   
       .nickname {
         color: white;
         font-weight: bold;
         font-size: 16px;
         margin-top: 10px;
       }
     }
   }
   ```

3. 在 `my.vue` 页面中，为最外层包裹性质的 `view` 容器，添加 `class="my-container"` 的类名，并美化样式如下：

   ```scss
   page,
   .my-container {
     height: 100%;
   }
   ```

#### 2 渲染用户的头像和昵称

1. 在 `my-userinfo` 组件中，通过 `mapState` 辅助函数，将需要的成员映射到当前组件中使用：

   ```js
   // 按需导入 mapState 辅助函数
   import { mapState } from 'vuex'
   
   export default {
     computed: {
       // 将 m_user 模块中的 userinfo 映射到当前页面中使用
       ...mapState('m_user', ['userinfo']),
     },
     data() {
       return {}
     },
   }
   ```

2. 将用户的头像和昵称渲染到页面中：

   ```xml
   <!-- 头像昵称区域 -->
   <view class="top-box">
     <image :src="userinfo.avatarUrl" class="avatar"></image>
     <view class="nickname">{{userinfo.nickName}}</view>
   </view>
   ```

#### 3 渲染第一个面板区域

1. 在 `my-userinfo` 组件中，定义如下的 UI 结构：

   ```xml
   <!-- 面板的列表区域 -->
   <view class="panel-list">
     <!-- 第一个面板 -->
     <view class="panel">
       <!-- panel 的主体区域 -->
       <view class="panel-body">
         <!-- panel 的 item 项 -->
         <view class="panel-item">
           <text>8</text>
           <text>收藏的店铺</text>
         </view>
         <view class="panel-item">
           <text>14</text>
           <text>收藏的商品</text>
         </view>
         <view class="panel-item">
           <text>18</text>
           <text>关注的商品</text>
         </view>
         <view class="panel-item">
           <text>84</text>
           <text>足迹</text>
         </view>
       </view>
     </view>
   
     <!-- 第二个面板 -->
   
     <!-- 第三个面板 -->
   </view>
   ```

2. 美化第一个面板的样式：

   ```scss
   .panel-list {
     padding: 0 10px;
     position: relative;
     top: -10px;
   
     .panel {
       background-color: white;
       border-radius: 3px;
       margin-bottom: 8px;
   
       .panel-body {
         display: flex;
         justify-content: space-around;
   
         .panel-item {
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: space-around;
           font-size: 13px;
           padding: 10px 0;
         }
       }
     }
   }
   ```

#### 4 渲染第二个面板区域

1. 定义第二个面板区域的 UI 结构：

   ```xml
   <!-- 第二个面板 -->
   <view class="panel">
     <!-- 面板的标题 -->
     <view class="panel-title">我的订单</view>
     <!-- 面板的主体 -->
     <view class="panel-body">
       <!-- 面板主体中的 item 项 -->
       <view class="panel-item">
         <image src="/static/my-icons/icon1.png" class="icon"></image>
         <text>待付款</text>
       </view>
       <view class="panel-item">
         <image src="/static/my-icons/icon2.png" class="icon"></image>
         <text>待收货</text>
       </view>
       <view class="panel-item">
         <image src="/static/my-icons/icon3.png" class="icon"></image>
         <text>退款/退货</text>
       </view>
       <view class="panel-item">
         <image src="/static/my-icons/icon4.png" class="icon"></image>
         <text>全部订单</text>
       </view>
     </view>
   </view>
   ```

2. 对之前的 SCSS 样式进行改造，从而美化第二个面板的样式：

   ```scss
   .panel-list {
     padding: 0 10px;
     position: relative;
     top: -10px;
   
     .panel {
       background-color: white;
       border-radius: 3px;
       margin-bottom: 8px;
   
       .panel-title {
         line-height: 45px;
         padding-left: 10px;
         font-size: 15px;
         border-bottom: 1px solid #f4f4f4;
       }
   
       .panel-body {
         display: flex;
         justify-content: space-around;
   
         .panel-item {
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: space-around;
           font-size: 13px;
           padding: 10px 0;
   
           .icon {
             width: 35px;
             height: 35px;
           }
         }
       }
     }
   }
   ```

#### 5 渲染第三个面板区域

1. 定义第三个面板区域的 UI 结构：

   ```xml
   <!-- 第三个面板 -->
   <view class="panel">
     <view class="panel-list-item">
       <text>收货地址</text>
       <uni-icons type="arrowright" size="15"></uni-icons>
     </view>
     <view class="panel-list-item">
       <text>联系客服</text>
       <uni-icons type="arrowright" size="15"></uni-icons>
     </view>
     <view class="panel-list-item">
       <text>退出登录</text>
       <uni-icons type="arrowright" size="15"></uni-icons>
     </view>
   </view>
   ```

2. 美化第三个面板区域的样式：

   ```scss
   .panel-list-item {
     height: 45px;
     display: flex;
     justify-content: space-between;
     align-items: center;
     font-size: 15px;
     padding: 0 10px;
   }
   ```

#### 6 实现退出登录的功能

1. 为第三个面板区域中的 `退出登录` 项绑定 `click` 点击事件处理函数：

   ```xml
   <view class="panel-list-item" @click="logout">
     <text>退出登录</text>
     <uni-icons type="arrowright" size="15"></uni-icons>
   </view>
   ```

2. 在 `my-userinfo` 组件的 `methods` 节点中定义 `logout` 事件处理函数：

   ```js
   // 退出登录
   async logout() {
     // 询问用户是否退出登录
     const [err, succ] = await uni.showModal({
       title: '提示',
       content: '确认退出登录吗？'
     }).catch(err => err)
   
     if (succ && succ.confirm) {
        // 用户确认了退出登录的操作
        // 需要清空 vuex 中的 userinfo、token 和 address
        this.updateUserInfo({})
        this.updateToken('')
        this.updateAddress({})
     }
   }
   ```

3. 使用 `mapMutations` 辅助方法，将需要用到的 mutations 方法映射到当前组件中：

   ```js
   // 按需导入辅助函数
   import { mapState, mapMutations } from 'vuex'
   
   export default {
     methods: {
       ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateAddress']),
     },
   }
   ```

### 5.10.4 三秒后自动跳转

#### 1 三秒后自动跳转到登录页面

> 需求描述：在购物车页面，当用户点击 “结算” 按钮时，**如果用户没有登录，则 3 秒后自动跳转到登录页面**

1. 在 `my-settle` 组件的 `methods` 节点中，声明一个叫做 `showTips` 的方法，专门用来展示倒计时的提示消息：

   ```js
   // 展示倒计时的提示消息
   showTips(n) {
     // 调用 uni.showToast() 方法，展示提示消息
     uni.showToast({
       // 不展示任何图标
       icon: 'none',
       // 提示的消息
       title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
       // 为页面添加透明遮罩，防止点击穿透
       mask: true,
       // 1.5 秒后自动消失
       duration: 1500
     })
   }
   ```

2. 在 `data` 节点中声明倒计时的秒数：

   ```js
   data() {
     return {
       // 倒计时的秒数
       seconds: 3
     }
   }
   ```

3. 改造 `结算` 按钮的 `click` 事件处理函数，如果用户没有登录，则**预调用**一个叫做 `delayNavigate` 的方法，进行倒计时的导航跳转：

   ```js
   // 点击了结算按钮
   settlement() {
     // 1. 先判断是否勾选了要结算的商品
     if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
   
     // 2. 再判断用户是否选择了收货地址
     if (!this.addstr) return uni.$showMsg('请选择收货地址！')
   
     // 3. 最后判断用户是否登录了，如果没有登录，则调用 delayNavigate() 进行倒计时的导航跳转
     // if (!this.token) return uni.$showMsg('请先登录！')
     if (!this.token) return this.delayNavigate()
   },
   ```

4. 定义 `delayNavigate` 方法，初步实现**倒计时的提示功能**：

   ```js
   // 延迟导航到 my 页面
   delayNavigate() {
     // 1. 展示提示消息，此时 seconds 的值等于 3
     this.showTips(this.seconds)
   
     // 2. 创建定时器，每隔 1 秒执行一次
     setInterval(() => {
       // 2.1 先让秒数自减 1
       this.seconds--
       // 2.2 再根据最新的秒数，进行消息提示
       this.showTips(this.seconds)
     }, 1000)
   },
   ```

   > 上述代码的问题：**定时器不会自动停止**，此时秒数会出现等于 0 或小于 0 的情况！

5. 在 `data` 节点中声明定时器的 Id 如下：

   ```js
   data() {
     return {
       // 倒计时的秒数
       seconds: 3,
       // 定时器的 Id
       timer: null
     }
   }
   ```

6. 改造 `delayNavigate` 方法如下：

   ```js
   // 延迟导航到 my 页面
   delayNavigate() {
     this.showTips(this.seconds)
   
     // 1. 将定时器的 Id 存储到 timer 中
     this.timer = setInterval(() => {
       this.seconds--
   
       // 2. 判断秒数是否 <= 0
       if (this.seconds <= 0) {
         // 2.1 清除定时器
         clearInterval(this.timer)
   
         // 2.2 跳转到 my 页面
         uni.switchTab({
           url: '/pages/my/my'
         })
   
         // 2.3 终止后续代码的运行（当秒数为 0 时，不再展示 toast 提示消息）
         return
       }
   
       this.showTips(this.seconds)
     }, 1000)
   },
   ```

   > 上述代码的问题：**seconds 秒数不会被重置**，导致第 2 次，3 次，n 次 的倒计时跳转功能无法正常工作

7. 进一步改造 `delayNavigate` 方法，在执行此方法时，立即将 `seconds` 秒数重置为 `3` 即可：

   ```js
   // 延迟导航到 my 页面
   delayNavigate() {
     // 把 data 中的秒数重置成 3 秒
     this.seconds = 3
     this.showTips(this.seconds)
   
     this.timer = setInterval(() => {
       this.seconds--
   
       if (this.seconds <= 0) {
         clearInterval(this.timer)
         uni.switchTab({
           url: '/pages/my/my'
         })
         return
       }
   
       this.showTips(this.seconds)
     }, 1000)
   }
   ```

#### 2 登录成功之后再返回之前的页面

> 核心实现思路：在自动跳转到登录页面成功之后，把**返回页面的信息存储到 vuex 中**，从而方便登录成功之后，根据返回页面的信息重新跳转回去。

> 返回页面的信息对象，**主要包含 { openType, from } 两个属性**，其中 openType 表示**以哪种方式导航回之前的页面**；from 表示**之前页面的 url 地址**；

1. 在 `store/user.js` 模块的 `state` 节点中，声明一个叫做 `redirectInfo` 的对象如下：

   ```js
   // state 数据
   state: () => ({
     // 收货地址
     address: JSON.parse(uni.getStorageSync('address') || '{}'),
     // 登录成功之后的 token 字符串
     token: uni.getStorageSync('token') || '',
     // 用户的基本信息
     userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
     // 重定向的 object 对象 { openType, from }
     redirectInfo: null
   }),
   ```

2. 在 `store/user.js` 模块的 `mutations` 节点中，声明一个叫做 `updateRedirectInfo` 的方法：

   ```js
   mutations: {
     // 更新重定向的信息对象
     updateRedirectInfo(state, info) {
       state.redirectInfo = info
     }
   }
   ```

3. 在 `my-settle` 组件中，通过 `mapMutations` 辅助方法，把 `m_user` 模块中的 `updateRedirectInfo` 方法映射到当前页面中使用：

   ```js
   methods: {
     // 把 m_user 模块中的 updateRedirectInfo 方法映射到当前页面中使用
     ...mapMutations('m_user', ['updateRedirectInfo']),
   }
   ```

4. 改造 `my-settle` 组件 methods 节点中的 `delayNavigate` 方法，当成功跳转到 `my 页面` 之后，将重定向的信息对象存储到 vuex 中：

   ```js
   // 延迟导航到 my 页面
   delayNavigate() {
     // 把 data 中的秒数重置成 3 秒
     this.seconds = 3
     this.showTips(this.seconds)
   
     this.timer = setInterval(() => {
       this.seconds--
   
       if (this.seconds <= 0) {
         // 清除定时器
         clearInterval(this.timer)
         // 跳转到 my 页面
         uni.switchTab({
           url: '/pages/my/my',
           // 页面跳转成功之后的回调函数
           success: () => {
             // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
             this.updateRedirectInfo({
               // 跳转的方式
               openType: 'switchTab',
               // 从哪个页面跳转过去的
               from: '/pages/cart/cart'
             })
           }
         })
   
         return
       }
   
       this.showTips(this.seconds)
     }, 1000)
   }
   ```

5. 在 `my-login` 组件中，通过 `mapState` 和 `mapMutations` 辅助方法，将 vuex 中需要的数据和方法，映射到当前页面中使用：

   ```js
   // 按需导入辅助函数
   import { mapMutations, mapState } from 'vuex'
   
   export default {
     computed: {
       // 调用 mapState 辅助方法，把 m_user 模块中的数据映射到当前用组件中使用
       ...mapState('m_user', ['redirectInfo']),
     },
     methods: {
       // 调用 mapMutations 辅助方法，把 m_user 模块中的方法映射到当前组件中使用
       ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
     },
   }
   ```

6. 改造 `my-login` 组件中的 `getToken` 方法，当登录成功之后，预调用 `this.navigateBack()` 方法返回登录之前的页面：

   ```js
   // 调用登录接口，换取永久的 token
   async getToken(info) {
     // 省略其它代码...
   
     // 判断 vuex 中的 redirectInfo 是否为 null
     // 如果不为 null，则登录成功之后，需要重新导航到对应的页面
     this.navigateBack()
   }
   ```

7. 在 `my-login` 组件中，声明 `navigateBack` 方法如下：

   ```js
   // 返回登录之前的页面
   navigateBack() {
     // redirectInfo 不为 null，并且导航方式为 switchTab
     if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
       // 调用小程序提供的 uni.switchTab() API 进行页面的导航
       uni.switchTab({
         // 要导航到的页面地址
         url: this.redirectInfo.from,
         // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
         complete: () => {
           this.updateRedirectInfo(null)
         }
       })
     }
   }
   ```

### 5.10.5 微信支付

#### 1 在请求头中添加 Token 身份认证的字段

1. 原因说明：**只有在登录之后才允许调用支付相关的接口**，所以必须为有权限的接口添加身份认证的请求头字段

2. 打开项目根目录下的 `main.js`，改造 `$http.beforeRequest` 请求拦截器中的代码如下：

   ```js
   // 请求开始之前做一些事情
   $http.beforeRequest = function(options) {
     uni.showLoading({
       title: '数据加载中...',
     })
   
     // 判断请求的是否为有权限的 API 接口
     if (options.url.indexOf('/my/') !== -1) {
       // 为请求头添加身份认证字段
       options.header = {
         // 字段的值可以直接从 vuex 中进行获取
         Authorization: store.state.m_user.token,
       }
     }
   }
   ```

#### 2 微信支付的流程

1. **创建订单**
   - 请求创建订单的 API 接口：把（订单金额、收货地址、订单中包含的商品信息）发送到服务器
   - 服务器响应的结果：*订单编号*
2. **订单预支付**
   - 请求订单预支付的 API 接口：把（订单编号）发送到服务器
   - 服务器响应的结果：*订单预支付的参数对象*，里面包含了订单支付相关的必要参数
3. **发起微信支付**
   - 调用 `uni.requestPayment()` 这个 API，发起微信支付；把步骤 2 得到的 “订单预支付对象” 作为参数传递给 `uni.requestPayment()` 方法
   - 监听 `uni.requestPayment()` 这个 API 的 `success`，`fail`，`complete` 回调函数

#### 3 创建订单

1. 改造 `my-settle` 组件中的 `settlement` 方法，当前三个判断条件通过之后，调用实现微信支付的方法：

   ```js
   // 点击了结算按钮
   settlement() {
     // 1. 先判断是否勾选了要结算的商品
     if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
   
     // 2. 再判断用户是否选择了收货地址
     if (!this.addstr) return uni.$showMsg('请选择收货地址！')
   
     // 3. 最后判断用户是否登录了
     // if (!this.token) return uni.$showMsg('请先登录！')
     if (!this.token) return this.delayNavigate()
   
     // 4. 实现微信支付功能
     this.payOrder()
   },
   ```

2. 在 `my-settle` 组件中定义 `payOrder` 方法如下，先实现创建订单的功能：

   ```js
   // 微信支付
   async payOrder() {
     // 1. 创建订单
     // 1.1 组织订单的信息对象
     const orderInfo = {
       // 开发期间，注释掉真实的订单价格，
       // order_price: this.checkedGoodsAmount,
       // 写死订单总价为 1 分钱
       order_price: 0.01,
       consignee_addr: this.addstr,
       goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
     }
     // 1.2 发起请求创建订单
     const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
     if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
     // 1.3 得到服务器响应的“订单编号”
     const orderNumber = res.message.order_number
   
      // 2. 订单预支付
   
      // 3. 发起微信支付
    }
   ```

#### 4 订单预支付

1. 改造 `my-settle` 组件的 `payOrder` 方法，实现订单预支付功能：

   ```js
   // 微信支付
   async payOrder() {
     // 1. 创建订单
     // 1.1 组织订单的信息对象
     const orderInfo = {
       // 开发期间，注释掉真实的订单价格，
       // order_price: this.checkedGoodsAmount,
       // 写死订单总价为 1 分钱
       order_price: 0.01,
       consignee_addr: this.addstr,
       goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
     }
     // 1.2 发起请求创建订单
     const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
     if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
     // 1.3 得到服务器响应的“订单编号”
     const orderNumber = res.message.order_number
   
     // 2. 订单预支付
     // 2.1 发起请求获取订单的支付信息
     const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
     // 2.2 预付订单生成失败
     if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
     // 2.3 得到订单支付相关的必要参数
     const payInfo = res2.message.pay
   
      // 3. 发起微信支付
    }
   ```

#### 5 发起微信支付

1. 改造 `my-settle` 组件的 `payOrder` 方法，实现微信支付的功能：

   ```js
   // 微信支付
   async payOrder() {
     // 1. 创建订单
     // 1.1 组织订单的信息对象
     const orderInfo = {
       // 开发期间，注释掉真实的订单价格，
       // order_price: this.checkedGoodsAmount,
       // 写死订单总价为 1 分钱
       order_price: 0.01,
       consignee_addr: this.addstr,
       goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
     }
     // 1.2 发起请求创建订单
     const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
     if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
     // 1.3 得到服务器响应的“订单编号”
     const orderNumber = res.message.order_number
   
      // 2. 订单预支付
      // 2.1 发起请求获取订单的支付信息
      const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
      // 2.2 预付订单生成失败
      if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
      // 2.3 得到订单支付相关的必要参数
      const payInfo = res2.message.pay
   
      // 3. 发起微信支付
      // 3.1 调用 uni.requestPayment() 发起微信支付
      const [err, succ] = await uni.requestPayment(payInfo)
      // 3.2 未完成支付
      if (err) return uni.$showMsg('订单未支付！')
      // 3.3 完成了支付，进一步查询支付的结果
      const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
      // 3.4 检测到订单未支付
      if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
      // 3.5 检测到订单支付完成
      uni.showToast({
        title: '支付完成！',
        icon: 'success'
      })
    }
   ```

### 5.10.6 分支的合并与提交

1. 将 `settle` 分支进行本地提交：

   ```bash
   git add .
   git commit -m "完成了登录和支付功能的开发"
   ```

2. 将本地的 `settle` 分支推送到码云：

   ```bash
   git push -u origin settle
   ```

3. 将本地 `settle` 分支中的代码合并到 `master` 分支：

   ```bash
   git checkout master
   git merge settle
   git push
   ```

4. 删除本地的 `settle` 分支：

   ```bash
   git branch -d settle
   ```

## 5.11 发布

### 5.11.1 为什么要发布

1. 小程序只有发布之后，才能被用户搜索并使用
2. 开发期间的小程序为了便于调试，含有 sourcemap 相关的文件，并且代码没有被压缩，因此体积较大，不适合直接当作线上版本进行发布
3. 通过执行 “小程序发布”，能够优化小程序的体积，提高小程序的运行性能

### 5.11.2 发布小程序的流程

1. 点击 `HBuilderX` 菜单栏上的 `发行` -> `小程序-微信(仅适用于uni-app)`：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081021836.png)

2. 在弹出框中填写要发布的**小程序的名称**和**AppId**之后，点击发行按钮：

   ![img](data:image/png;base64,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)

3. 在 `HBuilderX` 的控制台中**查看小程序发布编译的进度**：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081021585.png)

4. 发布编译完成之后，会自动打开一个新的**微信开发者工具界面**，此时，点击工具栏上的上传按钮：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081021507.png)

5. 填写**版本号**和**项目备注**之后，点击**上传**按钮：

   ![img](data:image/png;base64,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)

6. 上传完成之后，会出现如下的提示消息，直接点击**确定**按钮即可：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081021640.png)

7. 通过微信开发者工具上传的代码，默认处于**版本管理**的**开发版本**列表中，如图所示：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081021536.png)

8. 将 `开发版本提交审核` -> 再将 `审核通过的版本发布上线`，即可实现小程序的发布和上线：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081021714.png)

### 5.11.3 发布为 Android App 的流程

1. 点击 HBuilderX 状态栏左侧的**未登录**按钮，弹出登录的对话框：

   ![img](data:image/png;base64,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)

2. 在弹出的登录对话框中，填写**账号**和**密码**之后，**点击登录**即可：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081022765.png)

3. 打开项目根目录中的 `manifest.json` 配置文件，在**基础配置**面板中，获取**uni-app 应用标识**，并填写**应用名称**：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081022836.png)

4. 切换到 **App 图标配置**面板，点击**浏览**按钮，选择合适的图片之后，再点击**自动生成所有图标并替换**即可：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081022376.png)

5. 点击菜单栏上的 **发行** -> **原生 App-云打包**：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081022438.png)

6. **勾选打包配置**如下：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081022842.png)

7. 在**控制台**中**查看打包的进度信息**：

   ![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/wechat/202209081022366.png)

8. 点击链接**下载 apk 的安装包**，并**安装到 Android 手机中**查看打包的效果。

> 注意：由于开发期间**没有进行多端适配**，所以有些功能在 App 中无法正常运行，例如：**选择收货地址**、**微信登录**、**微信支付**



