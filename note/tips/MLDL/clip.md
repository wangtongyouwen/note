# Learning Transferable Visual Models From Natural Language Supervision

## 1 介绍

![image-20221128113629947](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128113629947.png)

- 使用对比学习训练模型，其中正样本是对应的正确文本、图片对，有$N$个，负样本的数量为$N^2-N$个
- 需要大量数据，预训练数据为高质量的4亿对图片文本对
- prompt template: a phto of a {object}
- 摆脱了 categorical label 的限制
- clip学习出现的语义特征很强， 迁移能力强
- 从语言模型中获取监督信号，进行图片分类：对图片进行文本配对

### 1.1 基于CLIP的其他工作

视频中判断是否出现某个物体https://github.com/johanmodin/clifs

目标检测https://arxiv.org/pdf/2104.13921.pdf

gan+cliphttps://openaccess.thecvf.com/content/ICCV2021/papers/Patashnik_StyleCLIP_Text-Driven_Manipulation_of_StyleGAN_Imagery_ICCV_2021_paper.pdf

CLIP：Contrastive Language-Image Pre-training

## 2 模型介绍

![image-20221128123037338](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128123037338.png)

### 2.1 prompt engineering 

- polysemy:多义性
- distribution gap 预测时候很少使用一个单词进行预测

### 2.2 prompt ensemble

https://github.com/openai/CLIP/blob/main/notebooks/Prompt_Engineering_for_ImageNet.ipynb

## 3 experiment

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128130810881.png" alt="image-20221128130810881" style="zoom:67%;" />

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128130823659.png" alt="image-20221128130823659" style="zoom:67%;" />

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128131430048.png" alt="image-20221128131430048" style="zoom: 67%;" />

稳定性：

![image-20221128131701402](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221128131701402.png)