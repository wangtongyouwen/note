# BERT： Bidirectional Encoder Representations from Transformers

## 1 先导知识

传统的语言模型：从左往右阅读，预测出下一个单词的出现概率(GPT,ELMo) -----> 但是某些语言学习任务需要双方向的学习顺序

masked language model 受到 Cloze task 的启发：就是随便把某些词元盖住，然后去预测这个词(完形填空)；还有另外一个任务：判断两个随机句子是不是相邻的(用来学习句子之间的信息)

## 2 model

![image-20221116113046395](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221116113046395.png)

三个参数：

- L:the number of layers(Transformer blocks)
- H:hidden size 
- A:the number of self-attention heads

模型大小：

$BERT_{base}(L=12,H=768,A=12,parameter=110M)$

$BERT_{large}(L=24,H=1024,A=16,parameter=340M)$

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221116114532233.png" alt="image-20221116114532233" style="zoom: 33%;" />

### 2.1 如何得到embedding

![image-20221116115028881](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221116115028881.png)

## 3 预训练BERT

### 3.1 Masked LM

we mask 15% of all WordPiece tokens in each sequence at random.

由于预训练中带有[mask]这个token，与后续的fine-tuning数据不同，做法：

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221116115853637.png" alt="image-20221116115853637" style="zoom:50%;" />

### 3.2 Next Sentence Prediction

A句子，B句子。有50%B句子就是在A句子后面，50%B句子就是随机的一个句子

![image-20221116120307866](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221116120307866.png)

### 3.3 数据集

BooksCorpus (800M words)

English Wikipedia (2,500M words)

document-level corpus(Billion Word Benchmark)

## 4 Fine-tuning BERT

we simply plug in the task-specific inputs and outputs into BERT and fine-tune all the parameters end-to-end.

### 4.1 GLUE

General Language Understanding Evaluation

这是一个句子层面的任务

![image-20221116120942140](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221116120942140.png)

### 4.2 SQuAD v1.1

Stanford Question Answering Dataset

学习两个向量：S和E,分别表示回答在一段话中的开始位置和结束位置

### 4.3 SWAG

Situations With Adversarial Generations

用于判断两个句子之间的关系

## 5 Ablation Studies

### 5.1 Effect of Pre-training Tasks 

![image-20221116121748375](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221116121748375.png)



(生成问题处理不太容易处理，bert类似transformer的编码器，能够完成类似完形填空的任务)