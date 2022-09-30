[toc]

# 1 vscode 中导入路径自动补齐

- 先安装 Path Autocomplete 插件

- 再在 settings.json 中加入如下代码

```
    // 导入文件是是否携带文件的扩展名
    "path-autocomplete.extensionOnImport": true,
    // 配置 @ 的路径提示
    "path-autocomplete.pathMappings": {
        "@": "${folder}/src"
    },
```

# 2 VScode 打开文件夹

https://www.jianshu.com/p/e8c29211fba9

- 右击打开文件

1,    `Win+R` 打开运行，输入`regedit`，打开`注册表`，找到`HKEY_CLASSES_ROOT\*\shell`分支，如果没有shell分支，则在*下点击右键，选择“`新建`－`项`”，建立shell分支。

2,    在shell下新建“`VisualCode`”项，在右侧窗口的“**默认**”双击，在数据里输入“`用VSCode打开`”。

3,    在“`VisualCode`”下再新建`Command`项，在右侧窗口的“**默认**”键值栏内输入程序所在的安装路径，我的是：`"D:\Microsoft VS Code\Code.exe" "%1"`。**其中的%1表示要打开的文件参数**。

4,    配置缩略图。在`VisualCode`项上新建`可扩充字符串值`，命名为`Icon`，双击，把`"D:\Microsoft VS Code\Code.exe"`放进数据就可以了。

5,    关闭注册表，即可生效

- 右击打开文件夹

找到`HKEY_CLASSES_ROOT\Directory\shell`分支

- 在空白处打开

找到`HKEY_CLASSES_ROOT\Directory\Background\shell`分支

在“`VisualCode`”下再新建`Command`项，在右侧窗口的“**默认**”键值栏内输入程序所在的安装路径，我的是：`"D:\Microsoft VS Code\Code.exe" "%V"`。

# 3 vue vscode 插件

https://zhuanlan.zhihu.com/p/347926284

# 4 数组方法

## forEach 与 some

```javascript
const arr = ['小红', '你大红', '苏大强', '宝']

// forEach 循环一旦开始，无法在中间被停止
arr.forEach((item, index) => {
  console.log('object')
  if (item === '苏大强') {
    console.log(index)
  }
}) 

arr.some((item, index) => {
  console.log('ok')
  if (item === '苏大强') {
    console.log(index)
    // 在找到对应的项之后，可以通过 return true 固定的语法，来终止 some 循环
    return true
  }
}) 
```

## every

```JavaScript
const arr = [
  { id: 1, name: '西瓜', state: true },
  { id: 2, name: '榴莲', state: false },
  { id: 3, name: '草莓', state: true },
]

// 需求：判断数组中，水果是否被全选了！
const result = arr.every(item => item.state)
console.log(result)
```

## reduce 累加

```JavaScript
const arr = [
  { id: 1, name: '西瓜', state: true, price: 10, count: 1 },
  { id: 2, name: '榴莲', state: false, price: 80, count: 2 },
  { id: 3, name: '草莓', state: true, price: 20, count: 3 },
]

// 需求：把购物车数组中，已勾选的水果，总价累加起来！
let amt = 0 // 总价
    arr.filter(item => item.state).forEach(item => {
      amt += item.price * item.count
    })
    
    console.log(amt) 

// arr.filter(item => item.state).reduce((累加的结果, 当前循环项) => { }, 初始值)
const result = arr.filter(item => item.state).reduce((amt, item) => amt += item.price * item.count, 0)

console.log(result)
```

# 5 leanote mongdb 配置

1. 找到 /www/wwwroot/leanote/mongodb_backup

```bash
mongorestore -h localhost -d leanote --dir leanote_install_data/
```

2. 找到bin文件夹

```bash
nohup bash run.sh &
```

3. 将mongdb内容保存到本地

```bash
mongodump -h localhost -d leanote -o data/
```

4. 如果需要更换服务器，只需要执行一下代码

```bash
mongorestore -h localhost -d leanote --dir data/
```



# 6 css技巧

## 6.1 文本单行显示，超出内容省略

```css
// 文字不允许换行（单行文本）
white-space: nowrap;
// 溢出部分隐藏
overflow: hidden;
// 文本溢出后，使用 ... 代替
text-overflow: ellipsis;
```

# 7 IJ操作

## 7.1 插件安装

![image-20220923163105626](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202209231631287.png)



https://plugins.jetbrains.com/

![image-20220923163512224](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20220923163512224.png)









# 8 java技术























