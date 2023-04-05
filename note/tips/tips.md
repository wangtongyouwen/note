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



# 6 前端

## 6.1 文本单行显示，超出内容省略

```css
// 文字不允许换行（单行文本）
white-space: nowrap;
// 溢出部分隐藏
overflow: hidden;
// 文本溢出后，使用 ... 代替
text-overflow: ellipsis;
```

## 6.2 常用的字符实体

| 显示结果 | 描述   | 实体名称  | 实体标号 |
| -------- | ------ | --------- | -------- |
|          | 空格   | \&nbsp;   | \&#160;  |
| >        | 大于号 | \&lt;     | \&#60;   |
| <        | 小于号 | \&gt;     | \&#62;   |
| &times;  | 乘号   | \&times;  | \&#215;  |
| &divide; | 除号   | \&divide; | \&#247;  |

## 6.3 谷歌浏览器查看json文件插件

https://github.com/gildas-lormeau/JSONVue

download and plugin(src folder)

# 7 IJ操作

## 7.1 插件安装

![image-20220923163105626](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202209231631287.png)

https://plugins.jetbrains.com/

![image-20220923163512224](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/MyBatisPlus/202210052210026.png)

## 7.2 快捷键

- 查看类图：ctrl+alt+u
- 查看接口所有方法：ctrl+f12
- 查找类：Ctrl + Shift + n   double shift
- 通过类图查看源码：f4
- 快速补齐对象和返回类型：ctrl+enter
- 将对象转换为lamada表达式：ctrl+enter
- 快速生成try catch方法:  ctrl+alt+t
- 查看父方法 ctrl+alt+鼠标左键
- run context configuration ctrl+shift+f10
- 抽取 ctrl+alt+m
- 选中相同的类同时修改：ctrl+shift+f6

## 7.3 查看源码

如果你想看到框架真正的源码。则在项目下，pom.[xml](https://so.csdn.net/so/search?q=xml&spm=1001.2101.3001.7020)同级目录中执行

```bash
mvn dependency:resolve -Dclassifier=sources
```

## 7.4 jdk反射问题

![image-20221008212219767](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/ssm/202210082122139.png)

```text
--add-opens java.base/java.lang=ALL-UNNAMED
```

# 8 git常用代码

```bash
# 第一次初始化(方式1)：
git init
git add .
git commit -m 'first commit'
git remote add origin git@github.com:帐号名/仓库名.git
git pull origin master
git push origin master # -f 强推

# 第一次初始化(方式2)：
git clone git@github.com:git帐号名/仓库名.git

# 平时工作基本操作：
git checkout master # 切到主分支
git fetch origin  # 获取最新变更
git checkout -b dev origin/master # 基于主分支创建dev分支
git add . # 添加到缓存
git commit -m 'xxx' # 提交到本地仓库
git fetch origin # 获取最新变更
git rebase dev origin/master # 合并到主分支
git push origin dev # 推送到远程分支

git chekout master # 切到主分支
git merge dev # 合并开发分支

git clone -b 远程分支 仓库地址 # 本地不存在仓库 拉取远程分支代码
git checkout -b 远程分支 origin/远程分支 # 本地存在仓库，拉取远程分支


# 初始化仓库
git init

# 查看仓库当前状态
git status

# 将文件添加到仓库
git add 文件名 # 将工作区的某个文件添加到暂存区   
git add . # 将当前工作区的所有文件都加入暂存区
git add -u # 添加所有被tracked文件中被修改或删除的文件信息到暂存区，不处理untracked的文件
git add -A # 添加所有被tracked文件中被修改或删除的文件信息到暂存区，包括untracked的文件
git add -i # 进入交互界面模式，按需添加文件到缓存区

# 将暂存区文件提交到本地仓库
git commit -m "提交说明" # 将暂存区内容提交到本地仓库
git commit -a -m "提交说明" # 跳过缓存区操作，直接把工作区内容提交到本地仓库

# 比较文件异同
git diff # 工作区与暂存区的差异
git diff 分支名 #工作区与某分支的差异，远程分支这样写：remotes/origin/分支名
git diff HEAD  # 工作区与HEAD指针指向的内容差异
git diff 提交id 文件路径 # 工作区某文件当前版本与历史版本的差异
git diff --stage # 工作区文件与上次提交的差异(1.6 版本前用 --cached)
git diff 版本TAG # 查看从某个版本后都改动内容
git diff 分支A 分支B # 比较从分支A和分支B的差异(也支持比较两个TAG)
git diff 分支A...分支B # 比较两分支在分开后各自的改动
# 另外：如果只想统计哪些文件被改动，多少行被改动，可以添加 --stat 参数 

# 查看历史记录
git log # 查看所有commit记录(SHA-A校验和，作者名称，邮箱，提交时间，提交说明)
git log -p -次数 # 查看最近多少次的提交记录
git log --stat # 简略显示每次提交的内容更改
git log --name-only # 仅显示已修改的文件清单
git log --name-status # 显示新增，修改，删除的文件清单
git log --oneline # 让提交记录以精简的一行输出
git log –graph –all --online # 图形展示分支的合并历史
git log --author=作者  # 查询作者的提交记录(和grep同时使用要加一个--all--match参数)
git log --grep=过滤信息 # 列出提交信息中包含过滤信息的提交记录
git log -S查询内容 # 和--grep类似，S和查询内容间没有空格
git log fileName # 查看某文件的修改记录，找背锅专用

# 代码回滚
git reset HEAD^ # 恢复成上次提交的版本
git reset HEAD^^ # 恢复成上上次提交的版本，就是多个^，以此类推或用~次数
git reflog
git reset --hard 版本号
--soft：只是改变HEAD指针指向，缓存区和工作区不变；
--mixed：修改HEAD指针指向，暂存区内容丢失，工作区不变；
--hard：修改HEAD指针指向，暂存区内容丢失，工作区恢复以前状态；

# 同步远程仓库
git push -u origin master

# 删除版本库文件
git rm 文件名 

# 版本库里的版本替换工作区的版本
git checkout -- test.txt

# 本地仓库内容推送到远程仓库
git remote add origin git@github.com:帐号名/仓库名.git

# 从远程仓库克隆项目到本地
git clone git@github.com:git帐号名/仓库名.git

# 创建分支
git checkout -b dev
-b表示创建并切换分支
上面一条命令相当于一面的二条：
git branch dev //创建分支
git checkout dev //切换分支

# 查看分支
git branch

# 合并分支
git merge dev  #用于合并指定分支到当前分支
git merge --no-ff -m "merge with no-ff" dev  #加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并

# 删除分支
git branch -d dev

# 查看分支合并图
git log --graph --pretty=oneline --abbrev-commit

# 查看远程库信息
git remote

# git相关配置
# 安装完Git后第一件要做的事，设置用户信息(global可换成local在单独项目生效)：
git config --global user.name "用户名" # 设置用户名
git config --global user.email "用户邮箱"   #设置邮箱
git config --global user.name   # 查看用户名是否配置成功
git config --global user.email   # 查看邮箱是否配置

# 其他查看配置相关
git config --global --list  # 查看全局设置相关参数列表
git config --local --list # 查看本地设置相关参数列表
git config --system --list # 查看系统配置参数列表
git config --list  # 查看所有Git的配置(全局+本地+系统)
git config --global color.ui true //显示git相关颜色

# 撤消某次提交
git revert HEAD # 撤销最近的一个提交
git revert 版本号 # 撤销某次commit

# 拉取远程分支到本地仓库
git checkout -b 本地分支 远程分支 # 会在本地新建分支，并自动切换到该分支
git fetch origin 远程分支:本地分支 # 会在本地新建分支，但不会自动切换，还需checkout
git branch --set-upstream 本地分支 远程分支 # 建立本地分支与远程分支的链接

# 标签
git tag 标签 //打标签命令，默认为HEAD
git tag //显示所有标签
git tag 标签 版本号 //给某个commit版本添加标签
git show 标签 //显示某个标签的详细信息

# 同步远程仓库更新
git fetch  origin master
```



# 9 pytorch 

## 9.1 测试GPU是否可用

```python
import torch
flag = torch.cuda.is_available()
if flag:
    print("CUDA可使用")
else:
    print("CUDA不可用")

ngpu= 1
# Decide which device we want to run on
device = torch.device("cuda:0" if (torch.cuda.is_available() and ngpu > 0) else "cpu")
print("驱动为：",device)
print("GPU型号： ",torch.cuda.get_device_name(0))
```



# 10 anaconda

```bash
# 查看当前存在那些虚拟环境
conda env list

# 创建虚拟环境
conda create -n env_name python=x.x

# 激活或者切换虚拟环境
conda activate env_name

# 退出当前的虚拟环境
conda deactivate

# 删除虚拟环境
conda remove -n env_name --all

# 删除某个虚拟环境中的某个包
conda remove -name $env_name  $pack_name 

# 设置镜像
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/

# 恢复默认的镜像
conda config --remove-key channels
```

# 11 常用报错信息

# 11.1 Spring Boot 

### 1 报错：Web server failed to start. Port 8080 was already in use.

1 查看端口号占用情况，例如查看端口xxxx，得到对应的进程号xxxx

```cmd
netstat -ano | findstr 端口号
```

2 菜单栏 -> 右键 - > 任务管理器 -> 详细信息，根据PID排序找到PID为xxxx的进程，选择后点击结束任务。

1 application.yml文件中输入

```yml
server:
  port: 8014
```

# 11.2 mysql

mysql：8.0

![image-20221029154155350](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/springcloud/202210291541717.png)

mysql：5.0

![image-20221029154213245](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/springcloud/202210291542563.png)

# 12 docker

## 卸装

```
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine \
                  docker-ce
```

## 安装

```bash
# 设置docker镜像源
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo

yum makecache fast

yum install -y docker-ce

# 关闭
systemctl stop firewalld
# 禁止开机启动防火墙
systemctl disable firewalld

systemctl start docker  # 启动docker服务
systemctl stop docker  # 停止docker服务
systemctl restart docker  # 重启docker服务
```

## 常用指令

```sh
docker pull xxx # 拉取镜像
docker images # 查看拉取到的镜像
docker save -o [保存的目标文件名称] [镜像名称]
docker rmi nginx:latest # 删除镜像
docker load -i nginx.tar # 加载本地文件

docker run
docker pause
docker unpause
docker stop
docker start
docker exec # 进入容器执行命令
docker logs # 查看容器运行日志
docker ps # 查看所有运行的容器及状态
docker rm # 删除指定容器

docker run --name containerName -p 80:80 -d nginx   # 冒号左侧是宿主机端口，一般可以任意；右边端口是容器内端口，一般固定
docker -d # 让容器后台运行
docker -p # 指定端口映射
docker logs -f mn # 跟踪日志
docker ps -a # 查看所有容器
docker start mn # 重新启动容器

docker exec -it mn bash # 进入容器
cd /usr/share/nginx/html # 查看DockerHub网站中的nginx页面，可以知道nginx的html目录位置在`/usr/share/nginx/html`
cat index.html # 进入首页
exit # 退出容器
docker rm mn -f # 强制删除运行中的容器



docker volume [COMMAND]
docker volume命令是数据卷操作，根据命令后跟随的command来确定下一步的操作：
- create 创建一个volume
- inspect 显示一个或多个volume的信息
- ls 列出所有的volume
- prune 删除未使用的volume
- rm 删除一个或多个指定的volume

docker run \
  --name mn \
  -v html:/root/html \
  -p 8080:80
  nginx \
`-v html:/root/htm` ：把html数据卷挂载到容器内的/root/html这个目录中      

docker run --name mn -p 80:80 -v html:/usr/share/nginx/html -d nginx
 
```



