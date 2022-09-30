[toc]

# 1 基础知识

## 1.1 API定义

- API是一些预先定义的函数，目的是提供应用程序与开发人员基于某软件或硬件得以访问一组例程编程的能力，而又无需访问源码，或理解内部工作机制的细节。
- web API是浏览器提供的一套操作浏览器功能和页面元素的API（BOM和DOM）

## 1.2 DOM

- DOM：文档对象模型，是W3C组织推荐的处理可扩展标记语言（HTML或者XML）的标准编程接口。

### 1.2.1 获取元素

#### 根据ID获取：使用getElementById()

```html
<p id="para">Some text here</p>
```

```javascript
var elem = document.getElementById('para');
console.log(elem);
console.log(typeof elem); //object
console.dir(elem);        //div#para
```

#### 根据标签名获取

```javascript
var elem1 = document.getElementsByTagName('div');
var elem2 = document.getElementsByTagName('li');   // 获取元素对象的集合，以伪数组的形式存储
//如果没有标签，则返回空的伪数组
//获取父元素内部所有指定标签名的子元素
//父元素必须是单个对象（必须指明是哪个元素对象）获取的时候不包括父元素自己
```

#### 通过HTML5新增的方法获取

```javascript
//根据类名获得某些元素集合
var boxes = document.getElementsByClassName('box');
//根据指定选择器返回第一个元素对象
document.querySelector('选择器');
//#id,.class
//根据指定选择器返回所有元素
document.querySelectorAll('选择器');
```

#### 特殊元素获取

```javascript
//获取body标签
document.body
```

```javascript
//获取html标签
document.documentElement;
```

### 1.2.2 事件

- 事件是能被JavaScript侦测到的行为         触发-----响应机制
- 组成：事件源 事件类型 事件处理程序
  - 事件源：事件被触发的对象
  - 事件类型：如何触发 鼠标点击(onclick)/鼠标经过/键盘按下
  - 事件处理程序：通过一个函数赋值的方式完成

```JavaScript
var btn = document.getElementById('btn');
btn.onclick = function(){
    alert('测试');
}
```

#### 执行事件的步骤：

1. 获取事件源
2. 注册事件（绑定事件）
3. 添加事件处理程序（采取函数赋值形式）

|  鼠标事件   |     触发条件     |
| :---------: | :--------------: |
|   onclick   | 鼠标点击左键触发 |
| onmouseover |   鼠标经过触发   |
| onmouseout  |   鼠标离开触发   |
|   onfocus   | 获得鼠标焦点触发 |
|   onblur    | 失去鼠标焦点触发 |
| onmousemove |   鼠标移动触发   |
|  onmouseup  |   鼠标弹起触发   |
| onmousedown |   鼠标按下触发   |

### 1.2.3 操作元素

#### 改变元素内容

```javascript
element.innerText //从起始位置到终止位置的内容，但去除html标签，同时空格和换行也会去掉（不识别html标签）
element.innerHTMl //起始位置到终止位置的额全部内容，包括html标签，同时保留空格和换行（识别html标签）
```

```javascript
//获取当前时间函数
function getDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dates = date.getDate();
    var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var day = date.getDay();
    return '今天是' + year + '年' + month + '月' + dates + '日' + arr[day];
}
//按钮获取当前时间
var btn = document.querySelector('button');
var div = document.querySelector('div');
btn.onclick = function(){
    div.innerText = getDate();
}

//直接获取时间
var p = document.querySelector('p');
p.innerText = getDate();
```

#### 表单元素的属性操作

```javascript
// type, value, checked, selected, disabled
input.value = '被点击了'; //修改表单里面的内容
this.disabled = true;  //当前使用的按钮禁用
```

```javascript
//切换显示密码，明码
var eye = document.getElementById('eye');
var pwd = document.getElementById('pwd');
var flag = 0;
eye.onclick = function(){
    if (flag == 0){
        pwd.type = 'text';
        eye.src = './images/open.png';
        flag = 1;
    }else{
        pwd.type = 'password';
        eye.src = './images/close.png';
        flg = 0;
    } 
}
```

#### 样式属性操作

```javascript
div.onclick = function(){
    //里面属性采用驼峰命名法
    //js行内样式权重高
    this.style.backgroundColor = 'purple';
}
```

#### 循环添加精灵图（减少代码数量）

```javascript
// 1. 获取元素 所有的小li 
var lis = document.querySelectorAll('li');
for (var i = 0; i < lis.length; i++) {
// 让索引号 乘以 44 就是每个li 的背景y坐标  index就是我们的y坐标
	var index = i * 44;
	lis[i].style.backgroundPosition = '0 -' + index + 'px';
}
```

#### 显示隐藏文本框内容

```JavaScript
// 1.获取元素
var text = document.querySelector('input');
// 2.注册事件 获得焦点事件 onfocus 
text.onfocus = function() {
	// console.log('得到了焦点');
	if (this.value === '手机') {
    	this.value = '';
    }
	// 获得焦点需要把文本框里面的文字颜色变黑
   	this.style.color = '#333';
}
// 3. 注册事件 失去焦点事件 onblur
text.onblur = function() {
	// console.log('失去了焦点');
	if (this.value === '') {
    	this.value = '手机';
    }
	// 失去焦点需要把文本框里面的文字颜色变浅色
    this.style.color = '#999';
}
```

#### 类名样式操作

```JavaScript
var test = document.querySelector('div');
test.onclick = function() {
	this.className = 'first change';
}
//1. 我们可以通过 修改元素的className更改元素的样式 适合于样式较多或者功能复杂的情况
//2. 如果想要保留原先的类名，我们可以这么做 多类名选择器
```

#### 模拟密码提示

```JavaScript
var ipt = document.querySelector('.ipt');
var message = document.querySelector('.message');
//2. 注册事件 失去焦点
ipt.onblur = function() {
	// 根据表单里面值的长度 ipt.value.length
	if (this.value.length < 6 || this.value.length > 16) {
		message.className = 'message wrong';
		message.innerHTML = '您输入的位数不对要求6~16位';
	} else {
		message.className = 'message right';
		message.innerHTML = '您输入的正确';
	}
}
```

### 1.2.4 排他思想

#### 点击按钮变色（其他不变色）

```JavaScript
// 1. 获取所有按钮元素
var btns = document.getElementsByTagName('button');
// btns得到的是伪数组  里面的每一个元素 btns[i]
for (var i = 0; i < btns.length; i++) {
	btns[i].onclick = function() {
		// (1) 我们先把所有的按钮背景颜色去掉
		for (var i = 0; i < btns.length; i++) {
			btns[i].style.backgroundColor = '';
		}
	// (2) 然后才让当前的元素背景颜色为pink 留下我自己
		this.style.backgroundColor = 'pink';
	}
}
//2. 首先先排除其他人，然后才设置自己的样式 这种排除其他人的思想我们成为排他思想
```

#### 换肤

```JavaScript
// 1. 获取元素 
var imgs = document.querySelector('.baidu').querySelectorAll('img');
// console.log(imgs);
// 2. 循环注册事件 
for (var i = 0; i < imgs.length; i++) {
	imgs[i].onclick = function() {
// this.src 就是我们点击图片的路径   images/2.jpg
// console.log(this.src);
// 把这个路径 this.src 给body 就可以了
	document.body.style.backgroundImage = 'url(' + this.src + ')';
	}
}
```

#### 表格隔行变色（选中变色）

```JavaScript
// 1.获取元素 获取的是 tbody 里面所有的行
var trs = document.querySelector('tbody').querySelectorAll('tr');
// 2. 利用循环绑定注册事件
for (var i = 0; i < trs.length; i++) {
	// 3. 鼠标经过事件 onmouseover
	trs[i].onmouseover = function() {
		this.className = 'bg';
	}
	// 4. 鼠标离开事件 onmouseout
	trs[i].onmouseout = function() {
		this.className = '';
	}
}
```

#### 表单全选取消全选

```JavaScript
// 1. 全选和取消全选做法：  让下面所有复选框的checked属性（选中状态） 跟随 全选按钮即可
// 获取元素
var j_cbAll = document.getElementById('j_cbAll'); // 全选按钮
var j_tbs = document.getElementById('j_tb').getElementsByTagName('input'); // 下面所有的复选框
// 注册事件
j_cbAll.onclick = function() {
	// this.checked 它可以得到当前复选框的选中状态如果是true 就是选中，如果是false 就是未选中
	console.log(this.checked);
	for (var i = 0; i < j_tbs.length; i++) {
		j_tbs[i].checked = this.checked;
	}
}
// 2. 下面复选框需要全部选中， 上面全选才能选中做法： 给下面所有复选框绑定点击事件，每次点击，都要循环查看下面所有的复选框是否有没选中的，如果有一个没选中的， 上面全选就不选中。
for (var i = 0; i < j_tbs.length; i++) {
	j_tbs[i].onclick = function() {
	// flag 控制全选按钮是否选中
    	var flag = true;
         // 每次点击下面的复选框都要循环检查者4个小按钮是否全被选中
         for (var i = 0; i < j_tbs.length; i++) {
         	if (!j_tbs[i].checked) {
             	flag = false;
                 break; // 退出for循环 提高执行效率 因为只要有一个没有选中，剩下的就无需循环判断了
             }
         }
         j_cbAll.checked = flag;
      }
}
```

### 1.2.5 自定义属性的操作

```JavaScript
//1.获取属性值
element.getAttribute('属性');  		//可以获得自定义的属性
element.属性
//2.设置属性值
element.属性 = '属性值';
element.setAttribute('属性','值');		//主要针对自定义属性

div.className = 'navs';
div.setAttribute('class','footer');
//3.移除属性
element.removeAttribute('属性');
```

#### tab栏切换（重要）

```JavaScript
// 获取元素
var tab_list = document.querySelector('.tab_list');
var lis = tab_list.querySelectorAll('li');
var items = document.querySelectorAll('.item');
// for循环绑定点击事件
for (var i = 0; i < lis.length; i++) {
	// 开始给5个小li 设置索引号 
	lis[i].setAttribute('index', i);
	lis[i].onclick = function() {
	// 1. 点击某一个，当前这一个底色会是红色，其余不变（排他思想） 修改类名的方式
    // 其余的li清除 class 这个类
    for (var i = 0; i < lis.length; i++) {
         lis[i].className = '';
    }
    // 留下我自己 
    this.className = 'current';
    // 2. 下面的显示内容模块
    var index = this.getAttribute('index');
    // 干掉所有人 让其余的item 这些div 隐藏
    for (var i = 0; i < items.length; i++) {
    	items[i].style.display = 'none';
    }
    // 留下我自己 让对应的item 显示出来
    items[index].style.display = 'block';
    }
}
```

#### 设置H5自定义属性

- h5规定自定义属性：data-属性

```JavaScript
element.setAttribute('data-index','2');	
element.getAttribute('data-index');
// dataset 是一个集合里面存放了所有以data开头的自定义属性
console.log(div.dataset);
console.log(div.dataset.index);
console.log(div.dataset['index']);
```

### 1.2.6 节点操作

#### 父子节点

```javascript
//得到最近的父级节点
var erweima = document.querySelector('.erweima');
console.log(erweima.parentNode);
//子节点
ul.childNodes();
//返回值里面包含了所有的子节点，包括元素节点，文本节点
//firstchild 第一个子节点（不管是文本节点还是元素节点）
//firstElementChild 返回第一个子元素节点
console.log(ol.children[0]);
console.log(ol.children[ol.children.length - 1]);
```

```javascript
// 	下拉菜单代码
// li>(a+ul>li)
// 1. 获取元素
var nav = document.querySelector('.nav');
var lis = nav.children; // 得到4个小li
// 2.循环注册事件
for (var i = 0; i < lis.length; i++) {
	lis[i].onmouseover = function() {
		this.children[1].style.display = 'block';
	}
	lis[i].onmouseout = function() {
		this.children[1].style.display = 'none';
	}
}
```

#### 兄弟节点

```javascript
//下一个兄弟节点：包括文本节点和元素节点
node.nextSibling;
node.nextElementSibling;       //下一个兄弟元素节点
//上一个兄弟节点
node.previousSibling;
node.previousElementSibling;   //上一个兄弟元素节点 兼容性问题
```

```javascript

function getNextElementSibling(element){
	var el = element;
	while (el = el.nextSibling){
		if (el.nodeType === 1){
		return el;
		}
	}
    return null;
}
```

#### 创建，添加节点

```JavaScript
document.createElement('tagName');//动态创造新的元素节点
node.appendChild(child);//将一个节点添加到指定父节点的子节点列表末尾 追加元素 node父级，child子级
node.insertBefore(child,指定元素);//将一个节点添加到父节点的指定子节点前面
```

```JavaScript
//模拟留言发布
// 1. 获取元素
var btn = document.querySelector('button');
var text = document.querySelector('textarea');
var ul = document.querySelector('ul');
// 2. 注册事件
btn.onclick = function() {
	if (text.value == '') {
		alert('您没有输入内容');
		return false;
	} else {
		// (1) 创建元素
		var li = document.createElement('li');
		// 先有li 才能赋值
		li.innerHTML = text.value;
		// (2) 添加元素
        ul.insertBefore(li, ul.children[0]);
    }
}
```

#### 删除节点

```JavaScript
node.removeChild(child);  //删除父节点中的一个子节点，返回删除的节点
```

```JavaScript
//删除留言        
// 1. 获取元素
var btn = document.querySelector('button');
var text = document.querySelector('textarea');
var ul = document.querySelector('ul');
// 2. 注册事件
btn.onclick = function() {
	if (text.value == '') {
		alert('您没有输入内容');
		return false;
	} else {
		// console.log(text.value);
		// (1) 创建元素
		var li = document.createElement('li');
		// 先有li 才能赋值
		li.innerHTML = text.value + "<a href='javascript:;'>删除</a>";
		// (2) 添加元素
		ul.insertBefore(li, ul.children[0]);
		// (3) 删除元素 删除的是当前链接的li  它的父亲
		var as = document.querySelectorAll('a');
		for (var i = 0; i < as.length; i++) {
			as[i].onclick = function() {
			// node.removeChild(child); 删除的是 li 当前a所在的li  this.parentNode;
			ul.removeChild(this.parentNode);
            }
		}
	}
}
```

#### 复制节点

```javascript
node.cloneNode();  //返回该方法的节点的一个副本。也称为克隆节点/拷贝节点
```

- 如果括号参数为空或者为false，则为浅拷贝，只克隆复制节点本身，不可隆里面的子节点。

#### 创建元素方式区别

```JavaScript
for (var i = 0; i <= 100; i++ ){
 	arr.push('<a href="#">百度</a>');   
}
inner.innerHTML = arr.join('');
```

- document.write 是直接将内容写入页面的内容流，但是文档执行完毕，则会导致页面全部重绘
- innerHTML 是将内容写入某个DOM节点，不会导致页面全部重绘
- innerHTML创建多个元素效率更高（不要拼接字符串，采取数组形式拼接）结构稍微复杂
- createElement()创建多个元素效率稍低一些，但是结构更清晰

### 1.2.7 DOM核心

- 创建、增、删、改、查、属性操作、事件操作
- 创建：document.write; innerHTML; createElement
- 增：appendChild; insertBefore
- 删：removeChild
- 改：
  1. 修改元素属性：src, href, titile
  2. 修改普通元素内容: innerHTML, innerText
  3. 修改表单元素：value, type, disabled
  4. 修改元素样式：style, className
- 查：
  1. DOM提供的API方法：getElementById, getElementsByTagName
  2. H5提供的新方法：querySelector, querySelecorAll
  2. 利用节点操作获取元素：父(parentNote), 子(children), 兄(previousElementSibling, nextElementSibling)

- 属性操作：

  1. setAttribute：设置dom的属性值
  2. getAttribute：得到dom的属性值
  3. removeAttribute：移除属性

- 事件操作：事件源.事件类型 = 事件处理程序

  |  鼠标事件   |     触发条件     |
  | :---------: | :--------------: |
  |   onclick   | 鼠标点击左键触发 |
  | onmouseover |   鼠标经过触发   |
  | onmouseout  |   鼠标离开触发   |
  |   onfocus   | 获得鼠标焦点触发 |
  |   onblur    | 失去鼠标焦点触发 |
  | onmousemove |   鼠标移动触发   |
  |  onmouseup  |   鼠标弹起触发   |
  | onmousedown |   鼠标按下触发   |

## 1.3 事件高级

### 1.3.1 注册事件（绑定时间）

传统注册方式：

- 利用on开头的事件 onclick
- <button onclick = "alert('hi')"></button>

- btn.onclick = function(){}
- 特点：注册事件的唯一性

方法监听注册方式：

- w3c标准
- addEventListener()是一个方法
- 同一个元素同一个事件可以注册多个监听器



eventTarget.addEventListener(type, listener[, useCapture])

- type：事件类型字符串，比如click, mouseover
- listener: 事件处理函数，事件发生时，会调用该监听函数
- useCapture:可选参数，是一个布尔值，默认是false

```JavaScript
btns[1].addEventListener('click',function(){
    alert(1);
})
```

- 注册事件兼容性解决方案

```javascript
function addEventListener(element, eventName, fn){
    //判断当前浏览器是否支持addEventListener 方法
    if (element.addEventListener){
       element.addEventListener(eventName,fn);
    }else if (element.attachEvent){
        element.attachEvent('on' + eventName, fn);
    } else {
        element['on' + eventName] = fn;
    }
}
```

### 1.3.2 删除事件（解绑事件）

- eventTarget.onclick = null;

- eventTaget.removeEventListener(type, listener[, useCapture]);

```javascript
//只有点击第一次出效果
divs[1].addEventListener('click',fn);
function fn(){ 
```

- 删除事件兼容性解决方案

```javascript
function removeEventListener(element, eventName, fn){
    //判断当前浏览器是否支持removeEventListener 方法
    if (element.removeEventListener){
       element.removeEventListener(eventName,fn);
    }else if (element.detachEvent){
        element.detachEvent('on' + eventName, fn);
    } else {
        element['on' + eventName] = fn;
    }
}
```

### 1.3.3 DOM事件流

- 事件流描述的是从页面中接受事件的顺序
- 事件发生时会在元素节点之间按照特定的顺序传播，这个传播过程就是DOM事件流

DOM事件流三个阶段：

1. 捕获阶段：由DOM最顶层节点开始，然后逐级向下传播到最具体的元素接受的过程
2. 当前目标阶段
3. 冒泡阶段：事件开始时由最具体的元素接收，然后逐级向上传播到DOM最顶层节点的过程

注意事项：

1. JS代码中只能执行捕获或者冒泡其中一个阶段
2. onclick和attachEvent（ie）只能得到冒泡阶段
3. 捕获阶段： 如果addEventListener 第三个参数是true则处于捕获阶段

4. 有些事件没有冒泡，比如onblur, onfocus, onmouseenter, onmouseleave

### 1.3.4 事件对象

1. event就是事件对象，通常写在侦听函数中的小括号里面，当形参来看
2. 事件对象只有事件才会存在，系统自动创建
3. 事件对象获取的是事件的一系列相关数据集合
4. 兼容性问题，通过window.event获取

```JavaScript
div.onclick = function(e){
    e = e || window.event;
}
```

| 事件对象属性方法        | 说明                                                     |
| ----------------------- | -------------------------------------------------------- |
| **e.target**            | **返回触发事件的对象 标准**                              |
| e.srcElement            | 返回触发事件的对象 非标准 ie6-8使用                      |
| e.type                  | 返回事件的类型 比如click mouseover 不带on                |
| e.cancelBubble          | 该属性阻止冒泡 非标准 ie6-8使用                          |
| e.returnValue           | 该属性 防止默认事件（默认行为）非标准 ie6-8使用          |
| **e.preventDefault()**  | **该方法 阻止默认事件（默认行为）标准 比如不让链接跳转** |
| **e.stopPropagation()** | **防止冒泡 标准**                                        |

- this返回的是绑定时间的对象（元素） e.target 返回的是触发事件的对象

```JavaScript
//禁止链接跳转
var a = docoment.querySelector('a');
a.addEventListener('click',function(e){
    e.preventDefault(); //dom标准写法
})
a. onclick = function(e){
	//普通浏览器
    e.preventDefault(); 
    //低版本浏览器 ie678
    e.returnValue;
    // 没有兼容性问题，return后面代码无法执行
    // 只限于传统的注册行为
    return false;
}
```

### 1.3.5 阻止冒泡

```javascript
if(e && e.stopPropagation){
    e.stopPropagation();
}else{
    window.event.cancelBubble = true;
}
```

### 1.3.6 事件委托(代理、委派)

事件委托原理：将事件监听器添加到其父节点上，然后利用冒泡原理影响设置的每个子节点上

案例：给ul注册点击事件，利用事件对象的target来找到当前点击的li：因为点击li事件会冒泡到ul上，ul有注册事件，就会触发事件监听器

```javascript
//事件委托的核心原理：给父节点添加侦听器，利用事件冒泡影响每一个子节点
var ul = document.querySelector('ul');
ul.addEventListener('click', function(e){
    e.target.style.backgroundColor = 'pink';
})
```

### 1.3.7 常用鼠标事件

#### 1 禁止鼠标右键菜单

- contextmenu主要控制应该何时显示上下文菜单，主要用于程序员取消默认的上下文菜单

```JavaScript
document.addEventListener('contextmenu',function(e){
    e.preventDefault();
})
```

#### 2 禁止鼠标选中

```JavaScript
document.addEventListener('selectstart',function(e){
    e.preventDefault();
})
```

#### 3 鼠标事件对象

| 鼠标事件对象 | 说明                                        |
| ------------ | ------------------------------------------- |
| e.clientX    | 返回鼠标相对于浏览器窗口可视区的X坐标       |
| e.clientY    | 返回鼠标相对于浏览器窗口可视区的Y坐标       |
| e.pageX      | 返回鼠标相对于文档页面的X坐标      IE9+支持 |
| e.pageY      | 返回鼠标相对于文档页面的Y坐标      IE9+支持 |
| e.screenX    | 返回鼠标相对于电脑屏幕的X坐标               |
| e.screenY    | 返回鼠标相对于电脑屏幕的Y坐标               |

#### 4 图片跟随鼠标移动效果

```html
<style>
        img{
            position: absolute;
        }
</style>
<script>
    var pic = document.querySelector('img');
    document.addEventListener('mousemove',function(e){
        var x = e.pageX;
        var y = e.pageY;
        console.log(x);
        pic.style.left = x + "px";
        pic.style.top = y + "px";
    });
</script>
```

#### 5 键盘事件

| 键盘事件 | 触发条件                                                     |
| -------- | ------------------------------------------------------------ |
| keyup    | 某个键盘案件被松开时触发                                     |
| keydown  | 某个键盘按键被按下时触发                                     |
| keypress | 某个键盘按键被按下时触发     但是不识别功能键比如ctrl，shift，箭头等 |

#### 6 键盘事件对象

- keypress区分字母大小写，keydown和keyup不区大小写

- keycode：返回该按键的ASCII值
- 输入S光标聚焦到搜素框

```javascript
  var search = document.querySelector('input');
  document.addEventListener('keyup',function(e){
    console.log(e.keyCode);
    if(e.keyCode === 83){
        search.focus();
    }
  })
```

## 1.4 BOM

- BOM是浏览器对象模型，提供了独立于内容而与**浏览器窗口进行交互的对象**，其核心对象是window

DOM：

- 文档对象模型
- DOM就是把文档当做一个对象来看待
- DOM的顶级对象是document
- DOM主要学习的是操作页面元素
- DOM是W3C标准规范

BOM：

- 浏览器对象模型
- 把浏览器当做一个对象来看待
- BOM的顶级对象是window
- BOM学习的是浏览器窗口交互的一些对象
- BOM是浏览器厂商在各自浏览器上定义的，兼容性较差

### 1.4.1 窗口加载事件

```javascript
window.onload = function(){};
window.addEventListener('load',function(){});
```

- window.onload是窗口(页面)加载事件，当文档内容完全加载完成会触发该事件(包括图像、脚本文件、CSS文件等)，就调用的处理函数

- window.onload传统注册事件方式只能写一次，如果有多个，会以最后一个window.onload为准
- 如果使用addEventListener则没有限制

```JavaScript
document.addEventListener('DOMContentLoaded',function(){})
```

- DOMContentLoaded事件触发时，仅当DOM加载完成，不包括样式表，图片，flash等等
- 如果页面的图片很多，从用户访问到onload触发可能需要较长的时间，交互效果就不能实现

#### 1 调整窗口大小事件

```javascript
window.onresize = function(){}
window.addEventListener('resize',function(){})
```

- 主要窗口大小发生像素变化，就会触发这个事件

- 利用这个事件完成响应式布局：window.innerWidth 当前屏幕的宽度

#### 2 定时器 setTimeout

```JavaScript
setTimeout(function(){},2000); //2s后调用函数
//省略延时事件默认为0
```

- 回调函数
- 停止定时器

```JavaScript
window.clearTimeout(timeoutID)
```

#### 3 定时器setInterval

```JavaScript
window.setInterval(回调函数，[间隔的毫秒数]) //每隔一段时间就进行调用函数
```

### 1.4.2 this指向问题

1. 全局作用域或普通函数中的this指向全局对象window(定时器里面的this指向window)
2. 方法调用中谁调用this指向谁

```javascript
btn.onclick = function(){
	console.log(this);  //指向btn
}
var  o{
	sayHi: function(){
		console.log(this); //指向o这个对象
    }
}
```

3. 构造函数中this指向构造函数的实例

```JavaScript
function Fun(){
	console.log(this); //指向的是fun实例对象
}
var fun = new Fun();
```

### 1.4.3 JS执行机制：单线程

#### 1 同步任务和异步任务

- 同步任务：同步任务都在主线程上执行，形成一个执行栈
- 异步任务：JS的异步任务通过回调函数实现，异步任务相关的回调函数添加到任务队列中

1. 普通事件：如click，resize等
2. 资源加载：如load，error等
3. 定时器：包括setInterval，setTimeout等

2 执行过程：先同步任务再异步任务

### 1.4.4 location对象

- 用于获取或设置窗体的URL，可以用于解析URL
- URL的一般语法格式：

protocol://host[:port]/path/[?query]#fragment

| 组成     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| protocol | 通信协议 常用的http,ftp.maito等                              |
| host     | 主机(域名) www.itheima.com                                   |
| port     | 端口号                                                       |
| path     | 路径 由零或多个'/'符号隔开的字符串，一般用来表示主机上的一个目录或文件地址 |
| query    | 参数 以键值对的形式，通过&符号分割开来                       |
| fragment | 片段 #后面内容 常见于链接 锚点                               |

| location对象属性  | 返回值                             |
| ----------------- | ---------------------------------- |
| location.href     | 获取或者设置整个URL                |
| location.host     | 返回主机(域名)                     |
| location.port     | 返回端口号 如果未写 返回空字符串   |
| location.pathname | 返回路径                           |
| location.search   | 返回参数                           |
| location.hash     | 返回片段 #后面内容 常见于链接 锚点 |

```JavaScript
location.assign()//跳转到目标地址，记录浏览记录
location.replace()//跳转当前页面，不记录浏览记录
location.reload()//重新加载页面 ctrl+F5强制刷新
```

#### 1 navigator对象

navigator对象包含有关浏览器的信息，最常用的是userAgent,该属性可以返回由客户机发送服务器的user-agent头部的值

#### 2 history对象

| history对象方法 | 作用                                            |
| --------------- | ----------------------------------------------- |
| back()          | 可以后退功能                                    |
| forward()       | 前进功能                                        |
| go(参数)        | 前进后退功能(1是前进一个页面，-1是后退一个页面) |

## 1.5 PC端网页特效

### 1.5.1 offset

- 偏移量：可以动态的得到该元素的位置(偏移)、大小等

- 获得元素距离带有定位父元素的位置
- 获得元素自身的大小
- 返回的数值都不带单位

| offset系列属性       | 作用                                                         |
| -------------------- | ------------------------------------------------------------ |
| element.offsetParent | 返回作为该元素带有定位的父级元素 如果父级都没有定位则返回body |
| element.offsetTop    | 返回元素相对带有定位父元素上方的偏移                         |
| element.offsetLeft   | 返回元素相对带有定位父元素左边框的偏移                       |
| element.offsetWidth  | 返回自身包括padding、边框、内容区的宽度，返回数值不带单位    |
| element.offsetHeight | 返回自身包括padding、边框、内容区的高度，返回数值不带单位    |

- element.parentNode 返回最近一级的父级元素，无需定位

- offset与style区别

offset：

- offset 可以得到任意样式表中的样式值
- offset系列获得的数值是没有单位的
- offsetWidth包含padding+border+width
- offsetWidth等属性是只读属性，只能获取不能赋值
- 如果为了获取元素大小位置，用offset更合适

style：

- style只能得到行内样式表中的样式值
- style.width获得的是带有单位的字符串
- style.width获得不包含padding和border的值
- style.width是可读写属性，可以获取也可以赋值
- 如果给元素更改值，需要使用style

### 1.5.2 元素可视区client系列

- 通过client系列的相关属性可以动态的得到该元素的边框大小、元素大小

| client系列属性       | 作用                                                         |
| -------------------- | ------------------------------------------------------------ |
| element.clientTop    | 返回元素上边框的大小                                         |
| element.clientLeft   | 返回元素左边框的大小                                         |
| element.clientWidth  | 返回自身包括padding、内容区的宽度，不含边框，返回数值不带单位 |
| element.clientHeight | 返回自身包括padding、内容区的高度，不含边框，返回数值不带单位 |

### 1.5.3 立即执行函数

- 不需要调用，能立马自己执行的函数
- 也能传递参数

```javascript
1、(function name(){})()
2、(function name(){}())
```

### 1.5.4 元素滚动scroll系列

- 可以动态得到该元素的大小、滚动距离等
- overflow = auto 增加滚动条

| scroll系列属性       | 作用                                                       |
| -------------------- | ---------------------------------------------------------- |
| element.scrollTop    | 返回被卷去的上侧距离，返回数值不带单位                     |
| element.scrollLeft   | 返回被卷去的左侧距离，返回数值不带单位                     |
| element.scrollWidth  | 返回自身实际的宽度（内容宽度），不含边框。返回数值不带单位 |
| element.scrollHeight | 返回自身实际的高度（内容高度），不含边框。返回数值不带单位 |

```JavaScript
//1. 获取元素
        var sliderbar = document.querySelector('.slider-bar');
        var banner = document.querySelector('.banner');
        // banner.offestTop 就是被卷去头部的大小 一定要写到滚动的外面
        var bannerTop = banner.offsetTop
            // 当我们侧边栏固定定位之后应该变化的数值
        var sliderbarTop = sliderbar.offsetTop - bannerTop;
        // 获取main 主体元素
        var main = document.querySelector('.main');
        var goBack = document.querySelector('.goBack');
        var mainTop = main.offsetTop;
        // 2. 页面滚动事件 scroll
        document.addEventListener('scroll', function() {
            // console.log(11);
            // window.pageYOffset 页面被卷去的头部
            // console.log(window.pageYOffset);
            // 3 .当我们页面被卷去的头部大于等于了 172 此时 侧边栏就要改为固定定位
            if (window.pageYOffset >= bannerTop) {
                sliderbar.style.position = 'fixed';
                sliderbar.style.top = sliderbarTop + 'px';
            } else {
                sliderbar.style.position = 'absolute';
                sliderbar.style.top = '300px';
            }
            // 4. 当我们页面滚动到main盒子，就显示 goback模块
            if (window.pageYOffset >= mainTop) {
                goBack.style.display = 'block';
            } else {
                goBack.style.display = 'none';
            }

```

需要注意的是，页面被卷去的头部，有兼容性问题，因此被卷去的头部通常有如下几种写法：

1. 声明了 DTD，使用 document.documentElement.scrollTop

2. 未声明 DTD，使用 document.body.scrollTop

3. 新方法 window.pageYOffset 和 window.pageXOffset，IE9 开始支持

```JavaScript
function getScroll() {
    return {
      left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft||0,
      top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };
 } 
使用的时候  getScroll().left

```

### 1.5.5 对比

1. offset系列 经常用于获得元素位置  offsetLeft offsetTop

2. client 经常用于获取元素大小 clientWidth clientHeight

3. scroll 经常用于获取滚动距离 scrollTop scrollLeft 

4. 注意页面滚动的距离通过 window.pageXOffset  获得



### 1.5.6 mouseenter 和mouseover的区别

- 当鼠标移动到元素上时就会触发 mouseenter 事件
- 类似 mouseover，它们两者之间的差别是：
- **mouseover 鼠标经过自身盒子会触发，经过子盒子还会触发。 mouseenter 只会经过自身盒子触发**
- 之所以这样，就是因为mouseenter不会冒泡
- 跟mouseenter搭配 鼠标离开 mouseleave 同样不会冒泡



## 1.6 动画函数封装

### 1.6.1 动画实现原理

核心原理：通过定时器 setInterval() 不断移动盒子位置。

实现步骤：

1. 获得盒子当前位置

2. 让盒子在当前位置加上1个移动距离

3. 利用定时器不断重复这个操作

4. 加一个结束定时器的条件

5. **注意此元素需要添加定位**，才能使用element.style.left

```JavaScript
			var div = document.querySelector('div');
			var timer = setInterval(function() {
             if (div.offsetLeft >= 400) {
                // 停止动画 本质是停止定时器
                clearInterval(timer);
            }
            div.style.left = div.offsetLeft + 1 + 'px';
        }, 30);
```

### 1.6.2 **动画函数简单封装** 

- 注意函数需要传递2个参数，动画对象和移动到的距离。

```JavaScript
 // 简单动画函数封装obj目标对象 target 目标位置
        function animate(obj, target) {
            var timer = setInterval(function() {
                if (obj.offsetLeft >= target) {
                    // 停止动画 本质是停止定时器
                    clearInterval(timer);
                }
                obj.style.left = obj.offsetLeft + 1 + 'px';

            }, 30);
        }

        var div = document.querySelector('div');
        var span = document.querySelector('span');
        // 调用函数
        animate(div, 300);
        animate(span, 200);
```

### 1.6.3 动画函数给不同元素记录不同定时器

如果多个元素都使用这个动画函数，每次都要var 声明定时器。我们可以给不同的元素使用不同的定时器（自己专门用自己的定时器）。

核心原理：利用 JS 是一门动态语言，可以很方便的给当前对象添加属性。

```JavaScript
        // var obj = {};
        // obj.name = 'andy';
        // 简单动画函数封装obj目标对象 target 目标位置
        // 给不同的元素指定了不同的定时器
        function animate(obj, target) {
            // 当我们不断的点击按钮，这个元素的速度会越来越快，因为开启了太多的定时器
            // 解决方案就是 让我们元素只有一个定时器执行
            // 先清除以前的定时器，只保留当前的一个定时器执行
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                if (obj.offsetLeft >= target) {
                    // 停止动画 本质是停止定时器
                    clearInterval(obj.timer);
                }
                obj.style.left = obj.offsetLeft + 1 + 'px';

            }, 30);
        }

        var div = document.querySelector('div');
        var span = document.querySelector('span');
        var btn = document.querySelector('button');
        // 调用函数
        animate(div, 300);
        btn.addEventListener('click', function() {
            animate(span, 200);
        })
```

### 1.6.4 缓动效果原理

缓动动画函数封装obj目标对象 target 目标位置
思路：

1. 让盒子每次移动的距离慢慢变小， 速度就会慢慢落下来。
2. 核心算法：(目标值 - 现在的位置) / 10 做为每次移动的距离 步长
3. 停止的条件是： 让当前盒子位置等于目标位置就停止定时器

```JavaScript
        function animate(obj, target) {
            // 先清除以前的定时器，只保留当前的一个定时器执行
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                // 步长值写到定时器的里面
                var step = (target - obj.offsetLeft) / 10;
                if (obj.offsetLeft == target) {
                    // 停止动画 本质是停止定时器
                    clearInterval(obj.timer);
                }
                // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
                obj.style.left = obj.offsetLeft + step + 'px';

            }, 15);
        }
        var span = document.querySelector('span');
        var btn = document.querySelector('button');

        btn.addEventListener('click', function() {
                // 调用函数
                animate(span, 500);
            })
            // 匀速动画 就是 盒子是当前的位置 +  固定的值 10 
            // 缓动动画就是  盒子当前的位置 + 变化的值(目标值 - 现在的位置) / 10）
```

### 1.6.5 动画函数多个目标值之间移动 

当我们点击按钮时候，判断步长是正值还是负值

1. 如果是正值，则步长 往大了取整

2. 如果是负值，则步长 向小了取整

```javascript
step = step > 0 ? Math.ceil(step) : Math.floor(step);
```

```JavaScript
        // 缓动动画函数封装obj目标对象 target 目标位置
        // 思路：
        // 1. 让盒子每次移动的距离慢慢变小， 速度就会慢慢落下来。
        // 2. 核心算法：(目标值 - 现在的位置) / 10 做为每次移动的距离 步长
        // 3. 停止的条件是： 让当前盒子位置等于目标位置就停止定时器
        function animate(obj, target) {
            // 先清除以前的定时器，只保留当前的一个定时器执行
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                // 步长值写到定时器的里面
                // 把我们步长值改为整数 不要出现小数的问题
                // var step = Math.ceil((target - obj.offsetLeft) / 10);
                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target) {
                    // 停止动画 本质是停止定时器
                    clearInterval(obj.timer);
                }
                // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
                obj.style.left = obj.offsetLeft + step + 'px';

            }, 15);
        }
        var span = document.querySelector('span');
        var btn500 = document.querySelector('.btn500');
        var btn800 = document.querySelector('.btn800');

        btn500.addEventListener('click', function() {
            // 调用函数
            animate(span, 500);
        })
        btn800.addEventListener('click', function() {
                // 调用函数
                animate(span, 800);
            })
            // 匀速动画 就是 盒子是当前的位置 +  固定的值 10 
            // 缓动动画就是  盒子当前的位置 + 变化的值(目标值 - 现在的位置) / 10）
```

### 1.6.6 动画函数添加回调函数

回调函数原理：函数可以作为一个参数。将这个函数作为参数传到另一个函数里面，当那个函数执行完之后，再执行传进去的这个函数，这个过程就叫做回调。

回调函数写的位置：定时器结束的位置。 

```javascript
function animate(obj, target, callback){
...
                    // 回调函数写到定时器结束里面
                    if (callback) {
                        // 调用函数
                        callback();
                    }
}
btn800.addEventListener('click', function() {
                // 调用函数
                animate(span, 800, function() {
                    // alert('你好吗');
                    span.style.backgroundColor = 'red';
                });
```

### 1.6.7 动画函数封装到单独JS文件里面

因为以后经常使用这个动画函数，可以单独封装到一个JS文件里面，使用的时候引用这个JS文件即可。

1. 单独新建一个JS文件。

2. HTML文件引入 JS 文件。

```html
<script src="animate.js"></script>
<script>
        // 1. 获取元素
        var sliderbar = document.querySelector('.sliderbar');
        var con = document.querySelector('.con');
        // 当我们鼠标经过 sliderbar 就会让 con这个盒子滑动到左侧
        // 当我们鼠标离开 sliderbar 就会让 con这个盒子滑动到右侧
        sliderbar.addEventListener('mouseenter', function() {
            // animate(obj, target, callback);
            animate(con, -160, function() {
                // 当我们动画执行完毕，就把 ← 改为 →
                sliderbar.children[0].innerHTML = '→';
            });

        })
        sliderbar.addEventListener('mouseleave', function() {
            // animate(obj, target, callback);
            animate(con, 0, function() {
                sliderbar.children[0].innerHTML = '←';
            });

        })
    </script>
```

### 1.6.8 轮播图

轮播图也称为焦点图，是网页中比较常见的网页特效。

功能需求：

1. 鼠标经过轮播图模块，左右按钮显示，离开隐藏左右按钮。

2. 点击右侧按钮一次，图片往左播放一张，以此类推， 左侧按钮同理。

3. 图片播放的同时，下面小圆圈模块跟随一起变化。

4. 点击小圆圈，可以播放相应图片。

5. 鼠标不经过轮播图， 轮播图也会自动播放图片。

6. 鼠标经过，轮播图模块， 自动播放停止。

```html
<div class="focus fl">
                <!-- 左侧按钮 -->
                <a href="javascript:;" class="arrow-l">
                    &lt;
                 </a>
                <!-- 右侧按钮 -->
                <a href="javascript:;" class="arrow-r">  </a>
                <!-- 核心的滚动区域 -->
                <ul>
                    <li>
                        <a href="#"><img src="upload/focus.jpg" alt=""></a>
                    </li>
                    <li>
                        <a href="#"><img src="upload/focus1.jpg" alt=""></a>
                    </li>
                    <li>
                        <a href="#"><img src="upload/focus2.jpg" alt=""></a>
                    </li>
                    <li>
                        <a href="#"><img src="upload/focus3.jpg" alt=""></a>
                    </li>
                </ul>
                <!-- 小圆圈 -->
                <ol class="circle">

                </ol>
            </div>
```

```javascript
window.addEventListener('load', function() {
    // 1. 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            //手动调用点击事件
            arrow_r.click();
        }, 2000);
    });
    // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li 
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做 
        li.setAttribute('index', i);
        // 把小li插入到ol 里面
        ol.appendChild(li);
        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            // 干掉所有人 把所有的小li 清除 current 类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己  当前的小li 设置current 类名
            this.className = 'current';
            // 5. 点击小圆圈，移动图片 当然移动的是 ul 
            // 当我们点击了某个小li 就拿到当前小li 的索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
            circle = index;
            // num = circle = index;
            // console.log(focusWidth);
            // console.log(index);
            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].className = 'current';
    // 6. 克隆第一张图片(li)放到ul 最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7. 点击右侧按钮， 图片滚动一张
    var num = 0;
    // circle 控制小圆圈的播放
    var circle = 0;
    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; // 关闭节流阀
            // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; // 打开节流阀
            });
            // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    });

    // 9. 左侧按钮做法
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 调用函数
            circleChange();
        }
    });

    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 10. 自动播放轮播图
    var timer = setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);

})
```

### 1.6.9 节流阀

- 防止轮播图按钮连续点击造成播放过快。

- 节流阀目的：当上一个函数动画内容执行完毕，再去执行下一个函数动画，让事件无法连续触发。

- 核心实现思路：利用回调函数，添加一个变量来控制，锁住函数和解锁函数。

1. 开始设置一个变量 var flag = true;

2. If(flag) {flag = false; do something}    关闭水龙头

3. 利用回调函数 动画执行完毕， flag = true   打开水龙头

```JavaScript
            // 回调函数写到定时器结束里面
            // if (callback) {
            //     // 调用函数
            //     callback();
            // }
            callback && callback();
```

### 1.6.10 返回顶部

- 滚动窗口至文档中的特定位置。

- window.scroll(x, y) 

- 注意，里面的x和y 不跟单位，直接写数字

```JavaScript
        goBack.addEventListener('click', function() {
            // 里面的x和y 不跟单位的 直接写数字即可
            // window.scroll(0, 0);
            // 因为是窗口滚动 所以对象是window
            animate(window, 0);
        });
        // 动画函数
        function animate(obj, target, callback) {
            // console.log(callback);  callback = function() {}  调用的时候 callback()

            // 先清除以前的定时器，只保留当前的一个定时器执行
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                // 步长值写到定时器的里面
                // 把我们步长值改为整数 不要出现小数的问题
                // var step = Math.ceil((target - obj.offsetLeft) / 10);
                var step = (target - window.pageYOffset) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (window.pageYOffset == target) {
                    // 停止动画 本质是停止定时器
                    clearInterval(obj.timer);
                    // 回调函数写到定时器结束里面
                    // if (callback) {
                    //     // 调用函数
                    //     callback();
                    // }
                    callback && callback();
                }
                // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
                // obj.style.left = window.pageYOffset + step + 'px';
                window.scroll(0, window.pageYOffset + step);
            }, 15);
```

### 1.6.11 筋斗云

```JavaScript
            // 鼠标经过某个小li， 筋斗云跟这到当前小li位置
            // 鼠标离开这个小li， 筋斗云复原为原来的位置
            // 鼠标点击了某个小li， 筋斗云就会留在点击这个小li 的位置
            // 1. 获取元素
            var cloud = document.querySelector('.cloud');
            var c_nav = document.querySelector('.c-nav');
            var lis = c_nav.querySelectorAll('li');
            // 2. 给所有的小li绑定事件 
            // 这个current 做为筋斗云的起始位置
            var current = 0;
            for (var i = 0; i < lis.length; i++) {
                // (1) 鼠标经过把当前小li 的位置做为目标值
                lis[i].addEventListener('mouseenter', function() {
                    animate(cloud, this.offsetLeft);
                });
                // (2) 鼠标离开就回到起始的位置 
                lis[i].addEventListener('mouseleave', function() {
                    animate(cloud, current);
                });
                // (3) 当我们鼠标点击，就把当前位置做为目标值
                lis[i].addEventListener('click', function() {
                    current = this.offsetLeft;
                });
            }
```

## 1.7 移动端特效

### 1.7.1 触屏事件

| 触屏touch事件 | 说明                          |
| ------------- | ----------------------------- |
| touchstart    | 手指触摸到一个DOM元素时触发   |
| touchmove     | 手指在一个DOM元素上滑动时触发 |
| touchend      | 手指从一个DOM元素上移开时触发 |

### 1.7.2 触摸事件对象（TouchEvent）

| 触摸列表       | 说明                                             |
| -------------- | ------------------------------------------------ |
| touches        | 正在触摸屏幕的所有手指的一个列表                 |
| targetTouches  | 正在触摸当前DOM元素上的手指的一个列表            |
| changedTouches | 手指状态发生了改变的列表，从无到有，从有到无变化 |

### 1.7.3 移动端拖动元素

1. touchstart、touchmove、touchend 可以实现拖动元素

2. 但是拖动元素需要当前手指的坐标值 我们可以使用 targetTouches[0] 里面的pageX 和 pageY 

3. 移动端拖动的原理：  手指移动中，计算出手指移动的距离。然后用盒子原来的位置 + 手指移动的距离

4. 手指移动的距离：  手指滑动中的位置 减去 手指刚开始触摸的位置

拖动元素三步曲：

（1） 触摸元素 touchstart： 获取手指初始坐标，同时获得盒子原来的位置

（2） 移动手指 touchmove： 计算手指的滑动距离，并且移动盒子

（3） 离开手指 touchend:

注意： 手指移动也会触发滚动屏幕所以这里要阻止默认的屏幕滚动 e.preventDefault();

```JavaScript
        // （1） 触摸元素 touchstart：  获取手指初始坐标，同时获得盒子原来的位置
        // （2） 移动手指 touchmove：  计算手指的滑动距离，并且移动盒子
        // （3） 离开手指 touchend:
        var div = document.querySelector('div');
        var startX = 0; //获取手指初始坐标
        var startY = 0;
        var x = 0; //获得盒子原来的位置
        var y = 0;
        div.addEventListener('touchstart', function(e) {
            //  获取手指初始坐标
            startX = e.targetTouches[0].pageX;
            startY = e.targetTouches[0].pageY;
            x = this.offsetLeft;
            y = this.offsetTop;
        });

        div.addEventListener('touchmove', function(e) {
            //  计算手指的移动距离： 手指移动之后的坐标减去手指初始的坐标
            var moveX = e.targetTouches[0].pageX - startX;
            var moveY = e.targetTouches[0].pageY - startY;
            // 移动我们的盒子 盒子原来的位置 + 手指移动的距离
            this.style.left = x + moveX + 'px';
            this.style.top = y + moveY + 'px';
            e.preventDefault(); // 阻止屏幕滚动的默认行为
        });
```

### 1.7.4 移动端轮播图

```html
    <!-- 焦点图模块 -->
    <div class="focus">
        <ul>
            <li><img src="upload/focus3.jpg" alt=""></li>
            <li><img src="upload/focus1.jpg" alt=""></li>
            <li><img src="upload/focus2.jpg" alt=""></li>
            <li><img src="upload/focus3.jpg" alt=""></li>
            <li><img src="upload/focus1.jpg" alt=""></li>
        </ul>
        <!-- 小圆点 -->
        <ol>
            <li class="current"></li>
            <li></li>
            <li></li>
        </ol>
    </div>
```

```css
.focus {
    position: relative;
    padding-top: 44px;
    overflow: hidden;
}

.focus img {
    width: 100%;
}

.focus ul {
    overflow: hidden;
    width: 500%;
    margin-left: -100%;
}

.focus ul li {
    float: left;
    width: 20%;
}

.focus ol {
    position: absolute;
    bottom: 5px;
    right: 5px;
    margin: 0;
}

.focus ol li {
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: #fff;
    list-style: none;
    border-radius: 2px;
    transition: all .3s;
}

.focus ol li.current {
    width: 15px;
}
```

```javascript
window.addEventListener('load', function() {
    // alert(1);
    // 1. 获取元素 
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    // 获得focus 的宽度
    var w = focus.offsetWidth;
    var ol = focus.children[1];
    // 2. 利用定时器自动轮播图图片
    var index = 0;
    var timer = setInterval(function() {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    // 等着我们过渡完成之后，再去判断 监听过渡完成的事件 transitionend 
    ul.addEventListener('transitionend', function() {
        // 无缝滚动
        if (index >= 3) {
            index = 0;
            // console.log(index);
            // 去掉过渡效果 这样让我们的ul 快速的跳到目标位置
            ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 3. 小圆点跟随变化
        // 把ol里面li带有current类名的选出来去掉类名 remove
        ol.querySelector('.current').classList.remove('current');
        // 让当前索引号 的小li 加上 current   add
        ol.children[index].classList.add('current');
    });

    // 4. 手指滑动轮播图 
    // 触摸元素 touchstart： 获取手指初始坐标
    var startX = 0;
    var moveX = 0; // 后面我们会使用这个移动距离所以要定义一个全局变量
    var flag = false;
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        // 手指触摸的时候就停止定时器
        clearInterval(timer);
    });
    // 移动手指 touchmove： 计算手指的滑动距离， 并且移动盒子
    ul.addEventListener('touchmove', function(e) {
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子：  盒子原来的位置 + 手指移动的距离 
        var translatex = -index * w + moveX;
        // 手指拖动的时候，不需要动画效果所以要取消过渡效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true; // 如果用户手指移动过我们再去判断否则不做判断效果
        e.preventDefault(); // 阻止滚动屏幕的行为
    });
    // 手指离开 根据移动距离去判断是回弹还是播放上一张下一张
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            // (1) 如果移动距离大于50像素我们就播放上一张或者下一张
            if (Math.abs(moveX) > 50) {
                // 如果是右滑就是 播放上一张 moveX 是正值
                if (moveX > 0) {
                    index--;
                } else {
                    // 如果是左滑就是 播放下一张 moveX 是负值
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                // (2) 如果移动距离小于50像素我们就回弹
                var translatex = -index * w;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        // 手指离开的时候就重新开启定时器
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);
    });


    // 返回顶部模块制作
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    })
})
```

### 1.7.5 classList 属性

- 添加类：element.classList.add（’类名’）；

- 移除类：element.classList.remove（’类名’）;

- 切换类：element.classList.toggle（’类名’）；

### 1.7.6 **click** 延时解决方案

- 移动端click事件会有300ms的延时，原因是移动端屏幕双击会缩放（double tap to zoom）页面

解决方案：

1. 禁用缩放。浏览器禁用默认的双击缩放行为并且去掉300ms的点击延迟

```html
  <meta name="viewport" content="user-scalable=no">
```

2. 利用touch事件自己封装这个事件解决 300ms 延迟。

   原理就是：

   1. 当我们手指触摸屏幕，记录当前触摸时间

   2. 当我们手指离开屏幕， 用离开的时间减去触摸的时间

   3. 如果时间小于150ms，并且没有滑动过屏幕， 那么我们就定义为点击

   ```javascript
   //封装tap，解决click 300ms 延时
   function tap (obj, callback) {
           var isMove = false;
           var startTime = 0; // 记录触摸时候的时间变量
           obj.addEventListener('touchstart', function (e) {
               startTime = Date.now(); // 记录触摸时间
           });
           obj.addEventListener('touchmove', function (e) {
               isMove = true;  // 看看是否有滑动，有滑动算拖拽，不算点击
           });
           obj.addEventListener('touchend', function (e) {
               if (!isMove && (Date.now() - startTime) < 150) {  // 如果手指触摸和离开时间小于150ms 算点击
                   callback && callback(); // 执行回调函数
               }
               isMove = false;  //  取反 重置
               startTime = 0;
           });
   }
   //调用  
     tap(div, function(){   // 执行代码  });
   ```

   3. 使用插件。 fastclick 插件解决 300ms 延迟。 

​			[https://](https://github.com/ftlabs/fastclick)[github.com/ftlabs/fastclick](https://github.com/ftlabs/fastclick)

### 1.7.7 常见插件

- Swiper 插件https://www.swiper.com.cn/

- superslide： http://www.superslide2.com/

- iscroll： https://github.com/cubiq/iscroll

## 1.8 本地存储

### 1.8.1 特性

1. 数据存储在用户浏览器中

2. 设置、读取方便、甚至页面刷新不丢失数据

3. 容量较大，sessionStorage约5M、localStorage约20M

4. 只能存储字符串，可以将对象JSON.stringify() 编码后存储

### 1.8.2 window.sessionStorage

1. 生命周期为关闭浏览器窗口
2. 在同一个窗口(页面)下数据可以共享

3. 以键值对的形式存储使用

- 储存数据：sessionStorage.setItem(key, value)
- 获取数据：sessionStorage.getItem(key)
- 删除数据：sessionStorage.removeItem(key)
- 删除所有数据：sessionStorage.clear()

### 1.8.3 window.localStorage

1. 声明周期永久生效，除非手动删除 否则关闭页面也会存在
2. 可以多窗口（页面）共享（同一浏览器可以共享）

3. 以键值对的形式存储使用

- 储存数据：localStorage.setItem(key, value)
- 获取数据：localStorage.getItem(key)
- 删除数据：localStorage.removeItem(key) 
- 删除所有数据：localStorage.clear()

### 1.8.4 记住用户名

```html
<input type="text" id="username"> <input type="checkbox" name="" id="remember"> 记住用户名
    <script>
        var username = document.querySelector('#username');
        var remember = document.querySelector('#remember');
        if (localStorage.getItem('username')) {
            username.value = localStorage.getItem('username');
            remember.checked = true;
        }
        remember.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('username', username.value)
            } else {
                localStorage.removeItem('username');
            }
        })
    </script>
```









