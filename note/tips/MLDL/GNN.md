https://distill.pub/2021/gnn-intro/

# A Gentle Introduction to Graph Neural Networks

## 1 介绍

- 什么样的数据能被表示为图
- 图和别的数据有什么不同，为什么要使用卷积神经网络，而不使用其他网络
- 构建一个GNN，解释常用的GNN
- 提供GNN的playground

### 1.1 图的定义

A graph represents the relations (edge) between a collection of entities (nodes)

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115202455720.png" alt="image-20221115202455720" style="zoom:67%;" />

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115202503353.png" alt="image-20221115202503353" style="zoom:67%;" />

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115202519855.png" alt="image-20221115202519855" style="zoom:67%;" />

不仅关注这些结构，其中attribute表示这些位置的信息，也是我们最关注的内容。如下图所示，这些位置的信息可以用向量来描述(将信息储存在图个各个部分里)

![image-20221115202846621](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115202846621.png)

可以将图分为有向图和无向图：

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115203052319.png" alt="image-20221115203052319"  />

### 1.2 数据是如何表示成图

#### 1.2.1 图片

图片中的每个像素可以表示成图上的每个节点，图片之间是否相邻，可以用图上的边表示

![image-20221115204142551](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115204142551.png)

#### 1.2.2 文本

有向的路

**![image-20221115204330354](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115204330354.png)**

#### 1.2.3 其他数据

##### 1 分子

![image-20221115204714880](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115204714880.png)

##### 2 社会关系

![image-20221115204756192](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115204756192.png)

##### 3 引用图

这是个图示有向边

##### 4 数据大小

![image-20221115205206162](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115205206162.png)

## 2 图定义的问题

三大任务：

- 图层面
- 顶点层面
- 边层面

### 2.1 图层面的问题

![image-20221115205613076](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115205613076.png)

### 2.2 顶点层面的问题

将图片中节点分为两类：与John A关系密切的是一类；与Mr.Hi关系密切的是一类

**![image-20221115205723135](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115205723135.png)**

### 2.3 边层面的问题

![image-20221115205920975](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115205920975.png)

![image-20221115205927622](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115205927622.png)

## 3 使用神经网络在图上的挑战

如何表示图让其能与神经网络兼容？

图中的信息：节点上的信息，边上的信息，全局的信息，节点之间的连接性。其中前三者都能通过向量表示，但是节点之间是否连接应该如何表示呢？

- 这个连接性能通过邻接矩阵表示，但是n个节点就需要n*n维矩阵，这个矩阵稀疏性特别强

- 另外一个问题就是相同连通性的图可能有多个邻接矩阵，这样的输入进入神经网络实际应该表示一个东西

**![image-20221115211403779](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115211403779.png)**

### 3.1 合适的表示方法

![image-20221115212505348](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115212505348.png)

其中的临界列表表示：第i条边连接的是哪两个节点，存储上高效，对顺序无关(节点以顺时针排列)

## 4 图神经网络(Graph Neural Network)

**A GNN is an optimizable transformation on all attributes of the graph (nodes, edges, global-context) that preserves graph symmetries (permutation invariances)**

保存信息，保持图片对称信息(排列不变性)

接下来以“信息传递神经网络”来构建GNN。GNN中的输入和输出都是图(也就是上节提到的表示方法)

### 4.1 最简单的GNN

![image-20221115213414100](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115213414100.png)

信息结构发生变化，但是图的结构没有变化。

如何做预测？

将顶点的向量信息输入全连接层后，softmax得到分类结果（所有顶点共享一个全连接层）

![image-20221115213635360](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115213635360.png)

如果我们没有这个预测顶点的向量信息呢？这个采用一种办法：pooling(汇聚)

![image-20221115214014113](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115214014113.png)

接下来的三个图表示节点，边，全局的预测：

![image-20221115214230536](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115214230536.png)

![image-20221115214241200](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115214241200.png)

![image-20221115214250354](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115214250354.png)

综上，一个最简单的GNN如下图所示：

![image-20221115214506491](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115214506491.png)

使用这样的神经网络有比较大的局限性，就是图的连接信息并没有随着更新进入到训练中，虽然能够保证输入输出的连接属性保持一致，但是这样的图没有涵盖所有信息。

### 4.2 Passing message between parts of the graph

![image-20221115215116032](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115215116032.png)

就是在进行MLP运算前，要把每个点的向量与相邻的向量进行pooling，这样的操作和卷积特别相似(只是对每个像素点的权值都是相同的)

![image-20221115215459507](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115215459507.png)

#### 4.2.1 如何把顶点的信息传递给边，把边的信息传递给顶点

![image-20221115215651043](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115215651043.png)

![image-20221115220052317](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115220052317.png)

这样使用交替更新的方式更加合理。

#### 4.2.2 全局信息

如果图上的某些节点、边之间相距比较远，但是又需要建立他们之间的关系，这里就需要使用全局信息，它是与所有V，E相连的虚拟节点

![image-20221115220403444](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115220403444.png)

#### 4.2.3 预测

![image-20221115220556149](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115220556149.png)

In this view all graph attributes have learned representations, so we can leverage them during pooling by conditioning the information of our attribute of interest with respect to the rest.



## 5 GNN playground

### 5.1 超参数对模型效果的影响

![image-20221115221253129](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115221253129.png)

显然当训练参数变大的时候，AUC的上限会提高，但是如果训练的超参数不佳，效果也会变差。

### 5.2 embedding dimension

![visualization](F:\study\assert\pic\visualization.png)

### 5.3 architectures colored by number of layers

![image-20221115222435700](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115222435700.png)

### 5.4 message passing

![image-20221115222636337](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115222636337.png)

## 6 其他技术信息

### 6.1 Other types of graphs (multigraphs, hypergraphs, hypernodes, hierarchical graphs)

![image-20221115222922522](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115222922522.png)

### 6.2 Sampling Graphs and Batching in GNNs

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115223146448.png" alt="image-20221115223146448" style="zoom:50%;" />

### 6.3 Inductive biases

CNN:空间变换的不变形

RNN：时序的延续性

GNN：图的对称性

### 6.4 Comparing aggregation operations

![image-20221115223555291](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115223555291.png)

在实际中，聚合方法都是差不多的

### 6.5 GCN as subgraph function approximators

![image-20221115223724389](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221115223724389.png)

### 6.6 Edges and the Graph Dual

### 6.7 Graph Attention Networks

### 6.8 Generative modelling

<img src="https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/springcloud/202211292342405.png" alt="image-20221129234223714" style="zoom:50%;" />

<img src="https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/springcloud/202211292342043.png" alt="image-20221129234243362" style="zoom:50%;" />

<img src="https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/springcloud/202211300046262.png" alt="image-20221130004648796" style="zoom:50%;" />