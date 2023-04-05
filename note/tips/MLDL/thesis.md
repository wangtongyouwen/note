# Two-Stream Convolutional Networks for Action Recognition in Videos

https://arxiv.org/pdf/1406.2199.pdf

## 1 介绍

- 视频序列处理

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128164729981.png" alt="image-20221128164729981" style="zoom:67%;" />

- optical flow

![See the source image](https://pic3.zhimg.com/v2-42a6297013f58790c60bf465b8db8328_r.jpg)

- 运动越剧烈的地方颜色越偏向蓝色：描述物体的运动特征信息



- 三大贡献：
  1. 提出双流网络：空间流+时间流；空间流学习空间特征；时间流学习运动特征
  2. 少量光流数据，训练效果也不错
  3. 因对数据不足，提出multitask learning方法

## 2 光流

![image-20221128190146662](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128190146662.png)

240\*320\*3-->240\*320\*2

多个光流图叠加在一起。

![image-20221128190414060](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128190414060.png)

# Evaluating Large Language Models Trained on Code

## 1 结构

- 导言
- 评估框架，以什么样的形式评估用ai写代码的能力，以及数据集介绍
- 主体模型，训练类似GPT模型
- 使用与评估数据集更加接近数据集，微调，提高精度
- 函数的实现，得到对应文档；函数注释和函数签名得到对应的函数实现
- 局限性
- 工作带来影响
- 相关工作
- 结论

## 2 介绍

- 采用GPT模型，使用全新数据集，解决这个生成代码的问题
- python文档的docstrings，三个引号开始，三个引号结束之间的内容；通过单元测试判断是否正确。
- 使用human-eval：164个编程问题
- 微调得到codex-s模型，这个使用的是与评估问题类似的训练数据

![](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128201556902.png)

- pass@k metric k个结果只有有一个通过单元测试就说明通过测试

$$
\text { pass } k:=\underset{\text { Problems }}{\mathbb{E}}\left[1-\frac{\left(\begin{array}{c}
n-c \\
k
\end{array}\right)}{\left(\begin{array}{c}
n \\
k
\end{array}\right)}\right]
$$

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128202141373.png" alt="image-20221128202141373" style="zoom:80%;" />
$$
pass \ k:= 1-\prod_{i=n-c+1}^{n}\frac{i-k}{i} 
$$

## 3 评价指标

使用BLEU score不能区分出预测结果是否正确

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128204035168.png" alt="image-20221128204035168" style="zoom:50%;" />

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128204145767.png" alt="image-20221128204145767" style="zoom:67%;" />

- 蓝线在现实中一般难以出现

# Competition-Level Code Generation with AlphaCode

## 1 介绍

- 数据集
- 基于transformer架构
- 高效的采样方法能够大量生成答案

## 2 问题描述

![image-20221128211916000](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128211916000.png)

![image-20221128211925895](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128211925895.png)

## 3 数据

![image-20221128212107936](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128212107936.png)

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128212113598.png" alt="image-20221128212113598" style="zoom:67%;" />

## 4 模型

![image-20221128212459627](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128212459627.png)

### 4.1 tempering

t=0.2 得到的分布方差更大

### 4.2 value conditioning & prediction

前置+预测

### 4.3 gold

## 5 结果

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128220321204.png" alt="image-20221128220321204" style="zoom:67%;" />

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128220843450.png" alt="image-20221128220843450" style="zoom:67%;" />

- 问题描述是否会影响结果？

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128221026889.png" alt="image-20221128221026889" style="zoom:67%;" />

# Quo Vadis, Action Recognition? A New Model and the Kinetics Dataset

## 1 介绍

新模型+新数据集

400 human action classes with more than 400 examples for each class, each from a unique YouTube video

two-stream inflated 3D convNet 把3\*3卷积变为3\*3*3

![image-20221219232234355](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221219232234355.png)

## 2 Two-Stream Inflated 3D ConvNets

![image-20221219233111939](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221219233111939.png)

![image-20221219233634831](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221219233634831.png)

![image-20221219233805461](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221219233805461.png)

![image-20221219233824712](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221219233824712.png)

## 3 效果

![image-20221219234306227](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221219234306227.png)







# A Comprehensive Study of Deep Video Action Recognition

## 1 介绍

1. Hand-crafted --> CNN
2. Two-Stream
3. 3D CNN
4. Video transformer

![image-20221219235523639](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221219235523639.png)

## 2 Large-scale Video Classification with Convolutional Neural Network

![image-20221220121812033](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221220121812033.png)

![image-20221220122113570](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221220122113570.png)

## 3 Two-Stream Convolutional Networks for Action Recognition in Videos

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128164729981.png" alt="image-20221128164729981" style="zoom: 80%;" />

## 4 Beyond Short Snippets: Deep Networks for Video Classification

![image-20221221002239606](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221221002239606.png)

![image-20221221002313312](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221221002313312.png)

![image-20221221002412621](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221221002412621.png)

## 5 Convolutional Two-Stream Network Fusion for Video Action Recognition

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221221003043908.png" alt="image-20221221003043908" style="zoom:80%;" />

![image-20221221003223538](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221221003223538.png)







# PATHWAYS: ASYNCHRONOUS DISTRIBUTED DATAFLOW FOR ML

https://blog.google/technology/ai/introducing-pathways-next-generation-ai-architecture/
