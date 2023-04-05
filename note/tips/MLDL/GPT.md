## GPT:Generative Pre-Training

先在没有标注的模型中训练一个语言模型用于预训练，然后在有标注的子任务中训练这些微调模型（fine-tuning）

遇到的问题：

- 这个预训练的语言模型应该采用什么损失函数用于优化
- 如何把学习到的文本特征传递到下游的子任务上（nlp的子任务差别特别大）

### 1 Unsupervised pre-training

$$
L_{1}(\mathcal{U})=\sum_{i} \log P\left(u_{i} \mid u_{i-k}, \ldots, u_{i-1} ; \Theta\right)
$$

其中t表示窗口大小，$\Theta$ is the parameters used in the model and trained using stochastic gradient descend

这里的模型是 transformer decoder,如下所示：
$$
\begin{aligned}
h_{0} &=U W_{e}+W_{p} \\
h_{l} &=\operatorname{transformer} \mathrm{block}\left(h_{l-1}\right) \forall i \in[1, n] \\
P(u) &=\operatorname{softmax}\left(h_{n} W_{e}^{T}\right)
\end{aligned}
$$
其中$U=(u_{-k},\dots,u_{-1})$表示当前词与前面k个词，这是一个传统的语言模型，而bert使用的类似完形填空的语言模型，因此可可以使用transformer encoder模型。

GPT的损失函数类似预测未来的过程，显然这个难度要比完形填空困难很多

### 2 Supervised fine-tunng

输入文字$x^1,\dots,x^m$，对应存在标签$y$。
$$
P\left(y \mid x^{1}, \ldots, x^{m}\right)=\operatorname{sof} \operatorname{tmax}\left(h_{l}^{m} W_{y}\right)
$$
the objective to maximize:
$$
L_{2}(\mathcal{C})=\sum_{(x, y)} \log P\left(y \mid x^{1}, \ldots, x^{m}\right)
$$


如果此时同时加入之前训练好的语言模型，这样得到的模型效果更佳：
$$
L_{3}(\mathcal{C})=L_{2}(\mathcal{C})+\lambda * L_{1}(\mathcal{C})
$$

### 3 Task-specific input transformations

如何让分类子任务识别这些标号呢？

![image-20221114193341494](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221114193341494.png)



其中Start,Delim,Extract表示序列中的特殊标号，确保这些在文本中不会出现相同的词。最后的Linear可以看作一个多分类问题

## GPT2(zero-shot)

一个任务对应一个数据集，进行一次训练？为什么这么做：因为现在的模型泛化能力很差

zero-shot：当使用到下游任务的时候，不需要下游任务的任何标注信息，也不需要训练

之前提到的特殊符号这里用prompt来代替（提示）

数据集？reddit 投票产生一个karma

## GPT3

更大的数据集与更大的模型

主要的评价指标：few-shot learning, one-shot learning, zero-shot learning

![image-20221114201644744](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221114201644744.png)

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221114202528156.png" alt="image-20221114202528156"  />

数据集：

1. 将CommonCrawl上面的数据作为负样本（因为存在大量的低质量数据），然后将GPT之前使用的数据作为正样本，做一个简单的二分类，得到更大数据内容的数据集
2. 去重（Lsh算法）information retrieval

