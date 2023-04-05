## 1 准备知识

### 1.1 BLEU score

https://www.bilibili.com/video/BV12E411a7Xn?p=183&vd_source=c3c36df311158cd049a5c20e3e2e5beb

### 1.2 layernorm 和batchnorm

BatchNorm是对一个batch-size样本内的每个特征做归一化，LayerNorm是对每个样本的所有特征做归一化。

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221114220413284.png" alt="image-20221114220413284" style="zoom: 33%;" />

其中数据为(batch×seq(n)×feature(d))batchnorm就是竖着切一刀，把它展成一维向量然后归一化；layernorm就是横着切一刀。

在NLP领域，LN就更加合适。因为它抹杀了不同样本间的大小关系，但是保留了一个样本内不同特征之间的大小关系。对于NLP或者序列任务来说，一条样本的不同特征，其实就是时序上字符取值的变化，样本内的特征关系是非常紧密的。



文章最初目标是用这个新模型解决nlp中的机器翻译问题 

transformer模型是第一个进行序列转录，仅仅使用注意力机制而没有使用循环神经网络的模型(muti-headed self-attention)

lstm(long short-term memory)&gru(gated recurrent unit)等rnn传统模型



只用attention的模型的并行度是比较高的

## 2 模型介绍

这些序列模型中，效果比较好的是encoder-decoder结构

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221114214356447.png" alt="image-20221114214356447" style="zoom:50%;" />

一些解释：

1. 左边的是encoder过程，右边的是decoder过程
2. 其中decoder过程是没有输入的，这个outputs表示也是原先在模型中上一个时刻的值，然后在时间序列中往右推移
3. $N_x$表示这个encoder或者decoder的模块到底有多少个层叠在一起(transformer block)
4. transformer block 类似于MLP(multi-layer perceptrons)全连接神经网络
5. 核心点：位置编码+掩码多头注意力机制+如何将编码器输出传递到解码器的网络中

### 2.1 encoder

 每个子层的输出为：
$$
LayerNorm(x+Sublayer(x))
$$
这就是一个简单的mlp，而且其超参数只有这个模块的堆叠个数和模型的维度。

### 2.2 decoder

解码器中加入了第三个子层，解码器采用自回归，即当前的输入是上一个时刻的输出的。但是注意力机制情况下，解码器会关注整个序列，这样和当前时刻的输入仅仅与之前时刻输出相关不符合，所以这里需要进入掩码的机制(在t时刻，不应该让解码器关注到t时刻以后的输入)

### 2.3 attention

![img](https://pic3.zhimg.com/80/v2-3253118aa50731664f9d284600e82002_720w.webp)

第一步： query 和 key 进行相似度计算，得到权值

第二步：将权值进行归一化，得到直接可用的权重

第三步：将权重和 value 进行加权求和

下图黄色和绿色表示两个不同的任务：如果q和(v,k)中的相似度高的时候，输出的权重就会偏高

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221114221230248.png" alt="image-20221114221230248" style="zoom: 50%;" />

本文采用的注意力机制采用下式（Scaled Dot-Product Attention）
$$
Attention(Q,K,V)=softmax(\frac{QK^T}{\sqrt{d_k}})V
$$
其中$q$和$k$的维度是$d_k$，$v$的维度是$d_v$,如果将这两个向量做内积，值越大，说明这两个向量的相似度越高。

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221114222336432.png" alt="image-20221114222336432" style="zoom: 80%;" />

![image-20221114222016112](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221114222016112.png)

>attention的作用是：将序列中的信息提取出来，做一次aggregation

### 2.4 multi-head attention

![image-20221114222851996](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221114222851996.png)
$$
\begin{aligned}
\operatorname{MultiHead}(Q, K, V) &=\operatorname{Concat}\left(\operatorname{head}_{1}, \ldots, \operatorname{head}_{\mathrm{h}}\right) W^{O} \\
\text { where head } &=\operatorname{Attention}\left(Q W_{i}^{Q}, K W_{i}^{K}, V W_{i}^{V}\right)
\end{aligned}
$$

$$
其中W_{i}^{Q} \in \mathbb{R}^{d_{\text {model }} \times d_{k}}, W_{i}^{K} \in \mathbb{R}^{d_{\text {model }} \times d_{k}}, W_{i}^{V} \in \mathbb{R}^{d_{\text {model }} \times d_{v}}  and  W^{O} \in \mathbb{R}^{h d_{v} \times d_{\text {model }}}
$$

### 2.5 feed forward(Position-wise Feed-Forward Networks)

$$
FFN(x)=max(0,xW_1+b_1)W_2+b_2
$$

其中max这个表示relu激活函数

其中$W_1$把输入的维度从512变为了2048，$W_2$将维度重新变为512

这就是一个单隐藏层的MLP，中间隐藏

### 2.6 embeddings and softmax

因为输入的是一个个的单词(token)，而这些单词不能直接输入网络进行训练，需要将其映射为一个个向量，embedding的工作就是这个

### 2.7 positional encoding

显然在attention中，不会存在时序信息，即不会关心key value这个对在序列中的位置究极在何处。顺序会变，但是值不会改变。

transformer的做法是在输入的时候加入位置信息，rnn的做法是每次进入MLP的输入是当前时刻的值和之前某一个时刻的值的组合。
$$
\begin{aligned}
P E_{(\text {pos }, 2 i)} &=\sin \left(p o s / 10000^{2 i / d_{\text {model }}}\right) \\
P E_{(\text {pos }, 2 i+1)} &=\cos \left(p o s / 10000^{2 i / d_{\text {model }}}\right)
\end{aligned}
$$


## 3 为什么要使用attention机制



![image-20221115112537100](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115112537100.png)

- 在attention当中一个query能和所有的key进行比较，所以从一个点跳转到任意距离的一个点的复杂度为o(1)
- 使用卷积对序列处理是，只能在k距离内对信息进行检索，所以maximum path length相对比较小

## 4 实验

### 4.1 数据集

![image-20221115113707058](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115113707058.png)

- byte-pair encodng：保证token量不是很大，找到词根
- 编码器和解码器的embedding是共享权重的

### 4.2 训练硬件和计划

8个 p100 GPU

### 4.3 训练器选择

adam
$$
lrate=d_{model}^{-0.5}\cdot min(step\_num^{-0.5},step\_num\cdot warmup\_steps^{-1.5})
$$
其中$\beta_1=0.9,\beta_2=0.98,\varepsilon=10^{-9},warmup\_steps=4000$

### 4.4 超参数选择

![image-20221115115402893](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115115402893.png)