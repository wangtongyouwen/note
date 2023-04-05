# Vision Transformer

## 1 准备知识

### 1.1 把transformer应用到视觉领域的难处

如何把2D图片变为1D序列，或者是集合

以分类任务的输入的图片大小大多是224*224，如果把每个像素点都变成1D序列， 序列长度为50776

处理的办法：使用feature map；使用局部可以控制的小窗口(类似卷积操作)；轴注意力机制(分别在H和W上做两次自注意力机制)(stand-alone attention, axial attention)

### 1.2 ViT 的做法

将图片分为每个大小16*16的patch，然后将这些分割好的patch放入序列中，输入到transformer中。

ViT的缺点：在中等大小的数据集上，效果不如CNN的网络(ALexnet,ResNet) 就是缺少了 inductive biases(先验知识)。

一般卷积神经网络有两个inductive biases:locality(在图片相邻的位置有相同的特征)、translation equivariance(平移同变性) f(g(x))=g(f(x))，其中f是卷积，g是平移

## 2 模型介绍

![image-20221118141716460](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221118141716460.png)

patch的个数：
$$
N=\frac{HW}{P^2}
$$
D向量维度：始终保持不变
$$
D=P\times P\times C
$$

### 2.1 class token

![image-20221118145156083](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221118145156083.png)

无论是否使用cls-token，还是使用CNN最后的全局平均池化层，效果近似。

### 2.2 positional embedding

1-D 位置编码：例如3x3共9个patch，patch编码为1到9

2-D 位置编码：patch编码为11,12,13,21,22,23,31,32,33，即同时考虑X和Y轴的信息，每个轴的编码维度是D/2

实际实验结果表明，不管使用哪种位置编码方式，模型的精度都很接近，甚至不适用位置编码，模型的性能损失也没有特别大。原因可能是ViT是作用在image patch上的，而不是image pixel，对网络来说这些patch之间的相对位置信息很容易理解，所以使用什么方式的位置编码影像都不大

![img](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/springcloud/202211181503370.jpeg)

### 2.3 transformer block

$$
\begin{aligned}
\mathbf{z}_{0} &=\left[\mathbf{x}_{\text {class }} ; \mathbf{x}_{p}^{1} \mathbf{E} ; \mathbf{x}_{p}^{2} \mathbf{E} ; \cdots ; \mathbf{x}_{p}^{N} \mathbf{E}\right]+\mathbf{E}_{p o s}, & & \mathbf{E} \in \mathbb{R}^{\left(P^{2} \cdot C\right) \times D}, \mathbf{E}_{p o s} \in \mathbb{R}^{(N+1) \times D} \\
\mathbf{z}_{\ell}^{\prime} &=\operatorname{MSA}\left(\operatorname{LN}\left(\mathbf{z}_{\ell-1}\right)\right)+\mathbf{z}_{\ell-1}, & & \ell=1 \ldots L \\
\mathbf{z}_{\ell} &=\operatorname{MLP}\left(\operatorname{LN}\left(\mathbf{z}_{\ell}^{\prime}\right)\right)+\mathbf{z}_{\ell}^{\prime}, & & \ell=1 \ldots L \\ 
\mathbf{y} &=\operatorname{LN}\left(\mathbf{z}_{L}^{0}\right) & &
\end{aligned}
$$

### 2.4 fine-tuning and higher resolution

如果输入的图片变大，这样patch数量就会变化，位置编码的信息就无用，这里可以采用二维插值的办法。

## 3 实验

![image-20221118152657257](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221118152657257.png)

- 如果要使用ViT，数据集要大

![image-20221118152952109](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221118152952109.png)

- 使用ViT进行小样本学习，有比较大的潜力

![image-20221118153110032](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221118153110032.png)

- 训练成本相对降低

### 3.1 可视化

![image-20221118153320446](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221118153320446.png)

- 第一个图表示最底层提取到的特征与卷积类似
- 第二个图表示位置编码确实学习到了一定的距离信息
- 第三个图表比较浅层的注意力机制也能够学习到距离比较远的一些特征