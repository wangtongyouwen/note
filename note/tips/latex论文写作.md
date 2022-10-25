# 1 准备工作

<https://github.com/nanmu42/CQUThesis>

下载和部署省略。

1. blankleft：开启此项，并且在 openright 开启的情况下，模板生成的空白页纯粹空白，不含页眉页脚，本选项默认关闭。

2. abstractopenright： 开启此项，双页打印模式时中英文摘要右开，这算是开发中的一个彩蛋。本选项默认关闭。

3. blindtrail：盲审模式开关，盲审模式由宏\secretize 和环境 secretizeEnv 构成，在盲审模式开启时： 

- 宏\secretize 内的内容会被三个星号 *** 替代； 
- 环境 secretizeEnv 的内容会输出为一片空白。 

CquThesis 默认为封面作者及导师姓名配置宏\secretize，为致谢的内容部分配置环境 secretize ，如果您有更多需求，可以自行配置。

![image-20221023224659043](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/springcloud/202210232247306.png)



# 2 重点使用

## 2.1 题注

### 2.1.1 插图的题注中英对照

```lex
\begin{figure}[tbh]
\centering
\includegraphics[width=0.7\linewidth]{figures/TEST}
\bicaption{这是一张测试用图片}{This figure is for test only}
\label{fig:cqubadge}
\end{figure}
```

### 2.1.2 为了防止题注对应的表录（或图录）的条目太长

> 这里的tabularx是表格的宏包

```tex
\begin{tabularx}{cc}
\bicaption[这是表录中的段条目]{这是一个很长很长很长的中文题注，你可以写很多行}%
[This is a really short one.]{Linebreak is for demostration only. It's okay to go without it.}
\label{fig:cqubadge}
我 & 在\\
测 & 试\\
\end{tabularx}
```
### 2.1.3 表格的题注中英对照

实际测试，使用<https://www.tablesgenerator.com/>更加方便

```tex
\begin{center}
    \begin{table}[]
        \centering
        \bicaption{这是一个很长很长很长的中文题注，你可以写很多行}%
        {Linebreak is for demostration only. It's okay to go without it.}
		\label{fig:cqubadge}
        \begin{tabular}{ccccc}
            \hline
            1 & 3 & 4 & 5 & 6 \\ \hline
            1 & 2 & 3 & 4 & 5 \\
            1 & 2 & 3 & 3 & 4 \\
            1 & 2 & 3 & 3 & 4 \\ \hline
        \end{tabular}
    \end{table}
\end{center}
```

![image-20221023214817916](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/springcloud/202210232148423.png)

### 2.1.4 表格中增添其他题注

```tex
这里需要一个题注\footnote{同一页上的题注最多支持到10个}
```

下面是个双语表格题注的实例：

```tex
\begin{table}[htb]
	\centering  % 居中
	\begin{minipage}[t]{0.9\linewidth} % 如果想在表格中使用脚注，minipage是个不错的办法
	\caption[模板文件]{模板文件。如果表格的标题很长，那么在表格索引中就会很不美观，所以要像 chapter 那样在前面用中括号写一个简短的标题。这个标题会出现在索引中。}
	\label{tab:template-files} % 进行交叉引用
	\begin{tabularx}{\linewidth}{lX}
		\toprule
		{\heiti 文件名} & {\heiti 描述} \\
		\midrule
		cquthesis.cls & 模板类文件\footnote{这是一个脚注}\\
		cquthesis.cfg & 模板配置文件\footnote{这是又一个脚注}\\
		cqunumberical.bst & 参考文献 BIB\TeX\ 样式文件。\\
		cquthesis.sty & 常用的包和命令写在这里，减轻主文件的负担。\footnote{同一页上的脚注最多支持到10个}\\
		\bottomrule
		\end{tabularx}
	\end{minipage}
\end{table}
```

### 2.1.5 参考文献引用题注

引用多个参考文献（上浮）：

```tex
\cite{r2,r3,r4,r6}
```

正常：

```tex
\inlinecite{r7,r8,r9,r10}
```

### 2.1.6 交叉引用

适用于表格，公式，图片，章节等

在章节后面加入一行(在图片、表格、公式内部加入):\label{sec:xxx/eq:xxx/fig:xxx/tbl:xxx}

在需要引用的地方加入:\ref{sec:xxx/eq:xxx/fig:xxx/tbl:xxx}

## 2.2 图片

一般图形都是处在浮动环境中。之所以称为浮动是指最终排版效果图形的位置不一定与源文件中的位置对应[^1]，这也是刚使用 LaTeX 同学可能遇到的问题。如果要强制固定浮动图形的位置，请使用float宏包，它提供了[H]参数。

```tex
\begin{figure}[htb] % use float package if you want it here
	\centering
	\includegraphics[height=4cm]{CQUbadge.pdf}
	\bicaption{重庆大学校徽}{Chongqing University badage}
	\label{fig:xfig1}
\end{figure}
```

### 2.2.1 多图

下端对齐：

```tex
\begin{figure}[h]
	\centering%
	\subcaptionbox{第一个小图形\label{fig:subfig1}}[3cm] %标题的长度，超过则会换行，如下一个小图。
	{\includegraphics[height=4cm]{CQUbadge.pdf}}%
	\hspace{4em}%
	\subcaptionbox{第二个小图形，注意这个图略矮些。如果标题很长的话，它会自动换行\label{fig:subfig2}}
	{\includegraphics[height=3cm]{CQUbadge.pdf}}
	\caption{包含子图形的大图形(subcaptionbox示例)}
	\label{fig:big1-subcaptionbox}
\end{figure}
```

上端对齐：

```tex
\begin{figure}[ht]
	\centering%
	\begin{subfigure}{3cm}
		\includegraphics[height=4cm]{CQUbadge.pdf}
		\caption{第一个小图形}
	\end{subfigure}%
	\hspace{4em}%
	\begin{subfigure}{0.5\textwidth}
		\includegraphics[height=3cm]{CQUbadge.pdf}
		\caption{第二个小图形，注意这个图略矮些。subfigure中同一行的子图在顶端对齐。}
	\end{subfigure}
	\caption{包含子图形的大图形(subfigure示例)}
	\label{fig:big1-subfigure}
\end{figure}
```

并排显示:

```tex
\begin{figure}
	\begin{minipage}{0.48\textwidth}
		\centering
		\includegraphics[height=5cm]{CQUbadge.pdf}
		\caption{并排第一个图}
		\label{fig:parallel1}
	\end{minipage}\hfill
	\begin{minipage}{0.48\textwidth}
		\centering
		\includegraphics[height=5cm]{CQUbadge.pdf}
		\caption{并排第二个图}
		\label{fig:parallel2}
	\end{minipage}
\end{figure}
```

> 插图、图片的绘制最好不要在latex下完成，徒增工作量

## 2.3 数学公式

复杂公式手写绘图然后识别，简单公式直接输入

https://www.latexlive.com/##

## 2.4 参考文献

在引用的时候直接复制**BibTeX**格式，然后粘贴到ref/ref.lib中

# 3 使用vscode配置编辑环境

<https://zhuanlan.zhihu.com/p/166523064>

```json
//------------------------------LaTeX 配置----------------------------------
    // 设置是否自动编译
    "latex-workshop.latex.autoBuild.run":"never",
    //右键菜单
    "latex-workshop.showContextMenu":true,
    //从使用的包中自动补全命令和环境
    "latex-workshop.intellisense.package.enabled": true,
    //编译出错时设置是否弹出气泡设置
    "latex-workshop.message.error.show": false,
    "latex-workshop.message.warning.show": false,
    // 编译工具和命令
    "latex-workshop.latex.tools": [
        {
            "name": "xelatex",
            "command": "xelatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOCFILE%"
            ]
        },
        {
            "name": "pdflatex",
            "command": "pdflatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOCFILE%"
            ]
        },
        {
            "name": "latexmk",
            "command": "latexmk",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-pdf",
                "-outdir=%OUTDIR%",
                "%DOCFILE%"
            ]
        },
        {
            "name": "bibtex",
            "command": "bibtex",
            "args": [
                "%DOCFILE%"
            ]
        }
    ],
    // 用于配置编译链
    "latex-workshop.latex.recipes": [
        {
            "name": "XeLaTeX",
            "tools": [
                "xelatex"
            ]
        },
        {
            "name": "PDFLaTeX",
            "tools": [
                "pdflatex"
            ]
        },
        {
            "name": "BibTeX",
            "tools": [
                "bibtex"
            ]
        },
        {
            "name": "LaTeXmk",
            "tools": [
                "latexmk"
            ]
        },
        {
            "name": "xelatex -> bibtex -> xelatex*2",
            "tools": [
                "xelatex",
                "bibtex",
                "xelatex",
                "xelatex"
            ]
        },
        {
            "name": "pdflatex -> bibtex -> pdflatex*2",
            "tools": [
                "pdflatex",
                "bibtex",
                "pdflatex",
                "pdflatex"
            ]
        }
    ],
    //文件清理。此属性必须是字符串数组
    "latex-workshop.latex.clean.fileTypes": [
        "*.aux",
        "*.bbl",
        "*.blg",
        "*.idx",
        "*.ind",
        "*.lof",
        "*.lot",
        "*.out",
        "*.toc",
        "*.acn",
        "*.acr",
        "*.alg",
        "*.glg",
        "*.glo",
        "*.gls",
        "*.ist",
        "*.fls",
        "*.log",
        "*.fdb_latexmk"
    ],
    //设置为onFaild 在构建失败后清除辅助文件
    "latex-workshop.latex.autoClean.run": "onFailed",
    // 使用上次的recipe编译组合
    "latex-workshop.latex.recipe.default": "lastUsed",
    // 用于反向同步的内部查看器的键绑定。ctrl/cmd +点击(默认)或双击
    "latex-workshop.view.pdf.internal.synctex.keybinding": "double-click",



    //使用 SumatraPDF 预览编译好的PDF文件
    // 设置VScode内部查看生成的pdf文件
    "latex-workshop.view.pdf.viewer": "external",
    // PDF查看器用于在\ref上的[View on PDF]链接
    "latex-workshop.view.pdf.ref.viewer":"auto",
    // 使用外部查看器时要执行的命令。此功能不受官方支持。
    "latex-workshop.view.pdf.external.viewer.command": "F:/SumatraPDF/SumatraPDF.exe", // 注意修改路径
    // 使用外部查看器时，latex-workshop.view.pdf.external.view .command的参数。此功能不受官方支持。%PDF%是用于生成PDF文件的绝对路径的占位符。
    "latex-workshop.view.pdf.external.viewer.args": [
        "%PDF%"
    ],
    // 将synctex转发到外部查看器时要执行的命令。此功能不受官方支持。
    "latex-workshop.view.pdf.external.synctex.command": "F:/SumatraPDF/SumatraPDF.exe", // 注意修改路径
    // latex-workshop.view.pdf.external.synctex的参数。当同步到外部查看器时。%LINE%是行号，%PDF%是生成PDF文件的绝对路径的占位符，%TEX%是触发syncTeX的扩展名为.tex的LaTeX文件路径。
    "latex-workshop.view.pdf.external.synctex.args": [
        "-forward-search",
        "%TEX%",
        "%LINE%",
        "-reuse-instance",
        "-inverse-search",
        "\"F:/Microsoft VS Code/Code.exe\" \"F:/Microsoft VS Code/resources/app/out/cli.js\" -r -g \"%f:%l\"", // 注意修改路径
        "%PDF%"
    ]
```

安装插件：LaTex Workshop

# 4 latex最基础的操作



```tex
\usepackage{amsmath, amsthm, amssymb, graphicx} # 宏包
\\ # 另起一行
\newpage # 分页
\tableofcontents # 目录
\section{一级标题}
\subsection{二级标题}
\subsubsection{三级标题}
```

<https://zhuanlan.zhihu.com/p/456055339>



其他宏包：tabularx，longtable，amsmath, subcaption, pstricks，pgf, subcaption





[^1]:这是LaTeX 的一个设计特性。
