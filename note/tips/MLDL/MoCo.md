# Momentum Contrast for Unsupervised Visual Representation Learning

## 1 准备知识

- 视觉领域使用对比学习的一个里程碑式的工作

- 什么是对比学习

对比式学习着重于学习同类实例之间的共同特征，区分非同类实例之间的不同之处。

与生成式学习比较，对比式学习不需要关注实例上繁琐的细节，只需要在抽象语义级别的特征空间上学会对数据的区分即可，因此模型以及其优化变得更加简单，且泛化能力更强。

> 缩小与正样本距离，扩大与负样本距离

视觉领域可以通过设计一些巧妙的代理任务(pretext task)从而人为的定义一些规则，这些规则能够用来区分哪些图片是相似的还是不相似的，从而可以提供一个监督信号去训练模型。这就是所谓的自监督学习。

### 1.1 instance discrimination：

定义一种规则规定什么是正样本，什么是负样本。把图片裁剪、数据增强的新图片是正样本，其他的图片都是负样本

a query matches a key if they are encoded views (e.g., different crops) of the same image.

### 1.2 momentum contrast

$$
y_t= m\cdot y_{t-1}+(1-m)\cdot x_t
$$

其中$m$表示动量，式（1）表示当前时刻的输出不完全依赖当前时刻的输入，也依赖前一时刻的输出

## 2 结构

把对比学习当做动态字典来看，每个anchor作为query，把通过数据增强的作为positive，把其他图片作为negative。

如果这么做，需要这个字典具有两个特性：

1. 大
2. 训练的时候尽可能的保持一致性

![image-20221118200039429](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221118200039429.png)

- 为什么要用queue代替这个字典？受限于内存大小，如果这个字典过大，需要输入的图片就需要很多。这时候，如果采用一个mini-batch的时候，先把最早进入队列的移除，再移动队列，扩充。
- 这个时候如果不是同个时刻的编码器进行特征提取，这不是与之前说的训练尽可能保持一致性冲突了吗？动量编码器

$$
\theta_k=m\theta_{k-1}+(1-m)\theta_{q}
$$

如果当m很大的时候，动量编码器不会随着输入的变化而产生过大的变化。

## 3 相关工作

- 代理任务(pretext task)：不是被人们所关注的那些任务，只是为了后面学习得到更好的特征

​	Denoising auto-encoder：重建整张图；

​	context auto-encoder: 重建某个patch；

​	colorization: 给图片上色当自监督信号；

​	exempalr:生成伪标签

​	patch orderings:九宫格方法

- loss function：

  最常见的构建方式是将模型的输出以应该得到的固定结果做差值（生成式）

  判别式：eight position， 划分成九宫格，首先确定中间那个位置，然后随意取出一块，判断这块在那个位置上

  对比学习的目标函数：在一个特征空间中，衡量各个样本之间的相似度，目标是让相似的物体之间距离尽可能小，不同的物体之间距离尽可能大。显然这个目标是变化的，会随着抽取出来的字典(queue)变化而变化

  对抗式的目标函数：主要衡量两个概率分布之间的差异

  

## 4 模型细节

### 4.1 infoNCE(noise contrastive estimation)

$$
\mathcal{L}_{q}=-\log \frac{\exp \left(q \cdot k_{+} / \tau\right)}{\sum_{i=0}^{K} \exp \left(q \cdot k_{i} / \tau\right)}
$$

把一个超级多分类的问题，变成多个二分类问题。把噪声样本当做负样本。

其中$\tau$是温度，用来控制分布的形状。$K$表示负样本数量

### 4.2 Momentum Contrast

传统的方法得到的这个动态字典都比较小，为什么使用Momentum Contrast效果就好呢？

![image-20221118210146889](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221118210146889.png)

- 端到端更新：编码器都是可以通过梯度回传来更新模型参数，这个时候的字典大小和mini-batch是等价的，如果字典很大，内存超大
- memory bank：虽然解决了大字典问题，随机抽样，特征一致性就很差。

### 4.3 伪代码

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221118211131700.png" alt="image-20221118211131700" style="zoom:67%;" />

## 5 总结

无监督模型的最重要目标是：学习一个可以迁移的特征，当你在做下游任务微调的时候，用这个预训练模型进行初始化。

## 6 对比学习串烧

### 6.1 百花齐放

#### InstDis(Instance Discrimination)

![image-20221119170740576](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119170740576.png)



- memory bank
- 正样本：256，负样本：4096
- NCEloss

#### InvaSpread(invariant and spreading)

![image-20221119171733932](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119171733932.png)

- 正样本：256，负样本：(256-1)*2

#### CPC(contrastive predicitive coding)

![image-20221119172544393](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119172544393.png)



- 正样本：$z_{t+1}$，负样本:任意其他时刻的输出

#### CMC(contrastive multiview coding)

![image-20221119173312174](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119173312174.png)



### 6.2 CV双雄：MoCo，SimCLR，CPC，CMC

#### SimCLR：

![image-20221119174145662](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119174145662.png)

其中g函数只有在训练的时候使用，在完成下游任务的时候直接舍弃



- 数据增强：

![image-20221119174733399](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119174733399.png)

![image-20221119174855456](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119174855456.png)

消融实验，校验出crop和color的数据增强效果比较好

#### MoCoV2：

![image-20221119175714745](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119175714745.png)

#### SimCLRV2:

![image-20221119185526808](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119185526808.png)

SwAV:

![image-20221119190717977](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119190717977.png)



使用了聚类的思想：deep cluster

multi-crop

![image-20221119191443601](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119191443601.png)



<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119191526437.png" alt="image-20221119191526437" style="zoom:50%;" />





### 6.3 不用负样本：BYOL，SimSiam

#### BYOL：自己学自己

![image-20221119192747764](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119192747764.png)
$$
\mathcal{L}_{\theta, \xi} \triangleq\left\|\overline{q_{\theta}}\left(z_{\theta}\right)-\bar{z}_{\xi}^{\prime}\right\|_{2}^{2}=2-2 \cdot \frac{\left\langle q_{\theta}\left(z_{\theta}\right), z_{\xi}^{\prime}\right\rangle}{\left\|q_{\theta}\left(z_{\theta}\right)\right\|_{2} \cdot\left\|z_{\xi}^{\prime}\right\|_{2}} 
$$
![image-20221119193201584](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119193201584.png)



#### SimSiam:

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119195305147.png" alt="image-20221119195305147" style="zoom: 50%;" />



<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119195407245.png" alt="image-20221119195407245" style="zoom:50%;" />



![image-20221119195935712](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119195935712.png)

![image-20221119200112135](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119200112135.png)

![image-20221119200120008](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119200120008.png)

### 6.4 Transformer：MoCoV3，DINO

#### MoCoV3

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119200840805.png" alt="image-20221119200840805" style="zoom:50%;" />

#### DINO

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119201610841.png" alt="image-20221119201610841" style="zoom:67%;" />

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221119201620909.png" alt="image-20221119201620909" style="zoom: 50%;" />
