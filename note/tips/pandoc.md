---
title: 使用pandoc+typora导出合适的word文档
author: jyh
creator: CQU
subject: Tutorial
keywords: [Pandoc, Tutorial, Export, typora]
---

# 前言

如何合理使用latex工具+typora工具高效解决论文排版问题？

## word直接编辑的问题

1.图片，表格的位置往往在word里直接编辑会发生错位

2.交叉引用高阶操作难度较大

3.修改大纲标题难度较大



# 安装

<https://github.com/jgm/pandoc/releases/tag/2.19.2>

# 配合 typora 使用

![修改导入配置](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/springcloud/202210222325853.png){#fig:2.1}

通过修改Word的模板文件就能事件导出docx文件。

# 如何导出默认模板

```bash
pandoc -o custom-reference.docx --print-default-data-file reference.docx.
```

导出默认模板以后，在此基础上进行修改即可。

```cmd
pandoc example.md -o example.pdf --from markdown --template eisvogel --listings
```

<https://github.com/Wandmalfarbe/pandoc-latex-template>

此时的默认模板中，存在的问题：

#### 表格样式如何修改？

![修改表格样式](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/springcloud/202210222325444.png){#fig:2}

#### 分级标题无法自动更正编号：由于默认word的分级标题会变成编号，导致无法自动识别，可以在导出word后再手动修改。

![如何修改word分级标题](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/springcloud/202210232001327.png){#fig:3}

#### 无法使用交叉引用，下面主要解决这个问题

# 使用Scoop安装pandoc-crossref插件

本方法仅适用于window系统，其他方法详见：

<https://github.com/lierdakil/pandoc-crossref>

## 进入官网进行安装

<https://scoop.sh/#/>

首先设置环境变量，由于使用默认代码会导致自动安装在c盘

```cmd
$env:SCOOP='D:\Scoop'
$env:SCOOP_GLOBAL='D:\Scoop\GlobalScoopApps'
[Environment]::SetEnvironmentVariable('SCOOP_GLOBAL', $env:SCOOP_GLOBAL, 'Machine')
```

再进行安装

```cmd
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser # Optional: Needed to run a remote script the first time
irm get.scoop.sh | iex
```

如果发现还在安装在c盘，把c:\User\scoop下的目录删除，再进行一遍安装

```CMD
scoop config SCOOP_REPO https://gitee.com/squallliu/scoop
scoop update
```



## 安装pandoc-crossref

```cmd
scoop install pandoc-crossref
```

## 使用

```cmd
pandoc --filter pandoc-crossref pandoc.md -o output.docx --reference-doc='C:\\Users\\jyh\\Desktop\\model\\custom-reference.docx'
```

图片交叉使用[@fig:2]

| 是一个表格 | 这是表格的数据 | 这是表格的位置 |
| :--------: | :------------: | :------------: |
|     01     |       1        |      100       |
|     02     |       2        |      200       |

:测试表格 {#tbl:1}

表格交叉使用[@tbl:1]

# 高级

## 分章显示图片

```cmd
pandoc --filter pandoc-crossref -M chapters pandoc.md -o output.docx --reference-doc='C:\\Users\\jyh\\Desktop\\model\\custom-reference.docx'
```

图片交叉使用[@fig:2]

## 代码高亮设置

直接修改模板中的Source code属性，由于默认模板不能添加文字背景，可以在导出word后再进一步修改。

## 其他交叉引用

- 公式：使用`{#eq:id}`和`[@eq:id]`；
- 章节：使用`{#sec:id}`和`[@sec:id]`；

## 修改图表中默认的前缀

默认情况下，图片的名称前面会加上`Figure`，表格则是加上`Table`，正文中进行引用的时候会加上`fig.`和`tbl.`，要是不符合我们心意怎么办。 我们可以指定参数`-M figureTitle="图"`来修改图片中的前缀，`-M figPrefix="图"`来修改正文中引用的前缀；表格则是`-M tableTitle="表"`和`-M tblPrefix="表"`。 **注意，这些参数搭配使用时每一个都需要加上`-M`，不能省略**

```cmd
pandoc --filter pandoc-crossref \
-M chapters \
-M figureTitle="图" -M figPrefix="图" \
-M tableTitle="表" -M tblPrefix="表" \
pandoc.md -o output.docx \
--reference-doc='C:\\Users\\jyh\\Desktop\\model\\custom-reference.docx'
```

单行版本更容易复制

```cmd
pandoc --filter pandoc-crossref -M chapters pandoc.md -o output.docx --reference-doc='C:\\Users\\jyh\\Desktop\\model\\custom-reference.docx'
```





# 模板测试

这是一段平平无奇的问题，其中引用了许多内容，有脚注1：[^1]，有公式1：[@eq:1],有图片1：[@fig:2],有表格1：[@tbl:1]
$$
R=\frac{U}{I} 
$$ {#eq:1}




[^1] 这是一个脚注

可能还存在大量的其他问题需要处理,目前解决的问题主要是交叉引用和模板文档，已经能解决大部分的问题。

<https://support.typora.io/Export/#word-docx>

<https://pandoc.org/MANUAL.html#defaults-files>