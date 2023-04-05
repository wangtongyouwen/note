## 变分推断

我们已经知道概率模型可以分为，频率派的优化问题和贝叶斯派的积分问题。从贝叶斯角度来看推断，对于 $\hat{x}$ 这样的新样本，需要得到：
$$
p(\hat{x}|X)=\int_\theta p(\hat{x},\theta|X)d\theta=\int_\theta p(\theta|X)p(\hat{x}|\theta,X)d\theta
$$
如果新样本和数据集独立，那么推断就是概率分布依参数后验分布的期望。

我们看到，推断问题的中心是参数后验分布的求解，推断分为：

1.  精确推断
2.  近似推断-参数空间无法精确求解
    1.  确定性近似-如变分推断
    2.  随机近似-如 MCMC，MH，Gibbs

## 基于平均场假设的变分推断

我们记 $Z$ 为隐变量和参数的集合，$Z_i$ 为第 $i$ 维的参数，于是，回顾一下 EM 中的推导：
$$
\log p(X)=\log p(X,Z)-\log p(Z|X)=\log\frac{p(X,Z)}{q(Z)}-\log\frac{p(Z|X)}{q(Z)}
$$
左右两边分别积分：
$$
Left:\int_Zq(Z)\log p(X)dZ=\log p(X)\\
Right:\int_Z[\log \frac{p(X,Z)}{q(Z)}-\log \frac{p(Z|X)}{q(Z)}]q(Z)dZ=ELBO+KL(q,p)
$$
第二个式子可以写为变分和 KL 散度的和：
$$
L(q)+KL(q,p)
$$
由于这个式子是常数，于是寻找 $q\simeq p$ 就相当于对 $L(q)$ 最大值。
$$
\hat{q}(Z)=\mathop{argmax}_{q(Z)}L(q)
$$
假设 $q(Z)$ 可以划分为 $M$ 个组（平均场近似）：
$$
q(Z)=\prod\limits_{i=1}^Mq_i(Z_i)
$$
因此，在 $\mathcal{L}(q)=\int_Zq(Z)\log p(X,Z)dZ-\int_Zq(Z)\log{q(Z)}$ 中，看 $p(Z_j)$ ，

第一项：
$$
\begin{align}\int_Zq(Z)\log p(X,Z)dZ&=\int_Z\prod\limits_{i=1}^Mq_i(Z_i)\log p(X,Z)dZ\nonumber\\
&=\int_{Z_j}q_j(Z_j)\int_{Z-Z_{j}}\prod\limits_{i\ne j}q_i(Z_i)\log p(X,Z)dZ\nonumber\\
&=\int_{Z_j}q_j(Z_j)\mathbb{E}_{\prod\limits_{i\ne j}q_i(Z_i)}[\log p(X,Z)]dZ_j
\end{align}
$$

第二项：
$$
\int_Zq(Z)\log q(Z)dZ=\int_Z\prod\limits_{i=1}^Mq_i(Z_i)\sum\limits_{i=1}^M\log q_i(Z_i)dZ
$$
展开求和项第一项为：
$$
\int_Z\prod\limits_{i=1}^Mq_i(Z_i)\log q_1(Z_1)dZ=\int_{Z_1}\log q_1(Z_1)dZ_1\cdot \int_{Z_2}q_2dZ_2\cdot\int_{Z_3}q_2dZ_3\dots =\int_{Z_1}q_1(Z_1)\log q_1(Z_1)dZ_1
$$
所以：
$$
\int_Zq(Z)\log q(Z)dZ=\sum\limits_{i=1}^M\int_{Z_i}q_i(Z_i)\log q_i(Z_i)dZ_i=\int_{Z_j}q_j(Z_j)\log q_j(Z_j)dZ_j+Const
$$
两项相减，令 $\mathbb{E}_{\prod\limits_{i\ne j}q_i(Z_i)}[\log p(X,Z)]=\log \hat{p}(X,Z_j)$ 可以得到：


$$
\int_{Z_j}q_j(Z_j)\log\frac{q_j(Z_j)}{\hat{p}(X,Z_j)}dZ_j\le 0
$$
得到目标函数：
$$
\hat{q}(Z)=\mathop{argmin}_{q(Z)}KL(q,p)=\mathop{argmax}_{q(Z)}L(q)
$$


于是最大的 $q_j(Z_j)=\hat{p}(X,Z_j)$ 才能得到最大值。我们看到，对每一个 $q_j$，都是固定其余的 $q_i$，求这个值，于是可以使用坐标上升的方法进行迭代求解，上面的推导针对单个样本，但是对数据集也是适用的。
$$
\left\{\begin{array}{l}
\log \hat{q}_{1}\left(Z_{1}\right)=\int_{q_{2}} \cdot \int_{q_{m}}  q_{2} \ldots q_{n}\left[\log P_ \theta\left(x^{(i)}, z\right)\right] d q_{2} \cdots d q_{m} \\
\log \hat{q}_{2}\left(Z_{2}\right)=\int_{q_{1}}  \int_{q_{3}}  \dots \int_{q_{m}}  \hat{q}_{1} q_{3} \cdot q_{m}\left[\log P_{\theta}\left(x^{(i)}, z\right)\right] d \hat{q}_{1} d q_{3} \cdots d q_{m} \\
\vdots \\
\log \hat{q}_{m}(Z_m)=\int_{\hat{q}_{1}}  \int _{\hat{q}_{m-1}} \hat{q}_{1} \ldots \hat{q}_{m-1}\left[\log P_{\theta}\left(x^{(i)}, z\right)\right] d \hat{q}_{1} \cdots d \hat{q}_{m-1}
\end{array}\right.
$$


基于平均场假设的变分推断存在一些问题：

1.  假设太强，$Z$ 非常复杂的情况下，假设不适用，如果其中的隐变量是神经网络
2.  期望中的积分，可能无法计算

## SGVI

从 $Z$ 到 $X$ 的过程叫做生成过程或译码，反过来的额过程叫推断过程或编码过程，基于平均场的变分推断可以导出坐标上升的算法，但是这个假设在一些情况下假设太强，同时积分也不一定能算。我们知道，优化方法除了坐标上升，还有梯度上升的方式，我们希望通过梯度上升来得到变分推断的另一种算法。

我们的目标函数：
$$
\hat{q}(Z)=\mathop{argmin}_{q(Z)}KL(q,p)=\mathop{argmax}_{q(Z)}L(q)
$$
假定 $q(Z)=q_\phi(Z)$，是和 $\phi$ 这个参数相连的概率分布。于是 $\mathop{argmax}_{q(Z)}L(q)=\mathop{argmax}_{\phi}L(\phi)$，其中 $L(\phi)=\mathbb{E}_{q_\phi}[\log p_\theta(x^i,z)-\log q_\phi(z)]$，这里 $x^i$ 表示第 $i$ 个样本。
$$
\begin{align}\nabla_\phi \mathcal{L}(\phi)&=\nabla_\phi\mathbb{E}_{q_\phi}[\log p_\theta(x^i,z)-\log q_\phi(z)]\nonumber\\
&=\nabla_\phi\int q_\phi(z)[\log P_\theta(x^i,z)-\log q_\phi(z)]dz\nonumber\\
&=\int\nabla_\phi q_\phi(z)[\log P_\theta(x^i,z)-\log q_\phi(z)]dz+\int q_\phi(z)\nabla_\phi [\log p_\theta(x^i,z)-\log q_\phi(z)]dz\nonumber\\
&=\int\nabla_\phi q_\phi(z)[\log P_\theta(x^i,z)-\log q_\phi(z)]dz-\int q_\phi(z)\nabla_\phi \log q_\phi(z)dz\nonumber\\
&=\int\nabla_\phi q_\phi(z)[\log P_\theta(x^i,z)-\log q_\phi(z)]dz-\int \nabla_\phi q_\phi(z)dz\nonumber\\
&=\int\nabla_\phi q_\phi(z)[\log P_\theta(x^i,z)-\log q_\phi(z)]dz\nonumber\\
&=\int q_\phi(\nabla_\phi\log q_\phi)(\log P_\theta(x^i,z)-\log q_\phi(z))dz\nonumber\\
&=\mathbb{E}_{q_\phi}[(\nabla_\phi\log q_\phi)(\log P_\theta(x^i,z)-\log q_\phi(z))]
\end{align}
$$
这个期望可以通过蒙特卡洛采样来近似，从而得到梯度，然后利用梯度上升的方法来得到参数：
$$
z^l\sim q_\phi(z)\\
\mathbb{E}_{q_\phi}[(\nabla_\phi\log q_\phi)(\log p_\theta(x^i,z)-\log q_\phi(z))]\sim \frac{1}{L}\sum\limits_{l=1}^L(\nabla_\phi\log q_\phi)(\log p_\theta(x^i,z)-\log q_\phi(z))
$$
但是由于求和符号中存在一个对数项，于是直接采样的方差很大，需要采样的样本非常多。为了解决方差太大的问题，我们采用 Reparameterization 的技巧。

考虑：
$$
\nabla_\phi \mathcal{L}(\phi)=\nabla_\phi\mathbb{E}_{q_\phi}[\log P_\theta(x^i,z)-\log q_\phi(z)]
$$
将Z表示的随机分布与$\phi$这一随机变量分离开，解耦。

我们取：$z=g_\phi(\varepsilon,x^i),\varepsilon\sim p(\varepsilon)$，于是对后验：$z\sim q_\phi(z|x^i)$，有 $|q_\phi(z|x^i)dz|=|p(\varepsilon)d\varepsilon|$。代入上面的梯度中：
$$
\begin{align}
\nabla_\phi \mathcal{L}(\phi)&=\nabla_\phi\mathbb{E}_{q_\phi}[\log p_\theta(x^i,z)-\log q_\phi(z)]\nonumber\\
&=\nabla_\phi \mathcal{L}(\phi)=\nabla_\phi\int[\log P_\theta(x^i,z)-\log q_\phi(z)]q_\phi dz\nonumber\\
&=\nabla_\phi\int[\log P_\theta(x^i,z)-\log q_\phi(z)]p_\varepsilon d\varepsilon\nonumber\\
&=\mathbb{E}_{p(\varepsilon)}[\nabla_\phi[\log P_\theta(x^i,z)-\log q_\phi(z)]]\nonumber\\
&=\mathbb{E}_{p(\varepsilon)}[\nabla_z[\log P_\theta(x^i,z)-\log q_\phi(z)]\nabla_\phi z]\nonumber\\
&=\mathbb{E}_{p(\varepsilon)}[\nabla_z[\log P_\theta(x^i,z)-\log q_\phi(z)]\nabla_\phi g_\phi(\varepsilon,x^i)]
\end{align}
$$
对这个式子进行蒙特卡洛采样，然后计算期望，得到梯度。
$$
\varepsilon^{(l)} \sim p(\varepsilon) ,l=1,2,\dots,L \\
\nabla_\phi \mathcal{L}(\phi)\approx\frac{1}{L}\sum_{l=1}^{L}\nabla_z[logP_\theta(x^{(i)},z)-logq_{\phi}(z|x^{(i)}]\cdot \nabla_\phi g_\phi(\varepsilon^{(l)},x^{(i)})
$$
最终得到算法：SGVI(authorized inference)
$$
\phi^{(t+1)} \longleftarrow\phi^{(t)}+\lambda^{(t)}\nabla_\phi \mathcal{L}(\phi)
$$


## VAE模型介绍：概率图+神经网络

Latent Variable Model

GMM(高斯混合模型)：k个高斯分布混合 $Z\sim Categorical\ \ Dist$  $X|Z \sim N(x|\mu_i,\Sigma_i)$ 只能完成聚类，分类的任务，对数据集的认识是及其肤浅的

VAE：无限个高斯分布混合 $Z\sim N(0,I)$ $X|Z\sim N(\mu_{\theta}(z),\Sigma_{\theta}(z))$ 使用神经网络去逼近这个概率分布，而不是直接求解
$$
P_{\theta}(x)=\int_{z}P_{\theta}(x,z)dz=\int_{z}P_{\theta}(z)\cdot P_{\theta}(x|z)dz \\intractable\ P_{\theta}(x)\\
P_{\theta}(z|x)=\frac{P_{\theta}(z)\cdot P_{\theta}(x|z)}{P_{\theta}(x)}
$$
这里使用$q_{\phi}(z|x)$去逼近无法求解的$P_{\theta}(z|x)$
$$
\begin{align}<\hat\theta,\hat\phi> &= agrminKL(q_{\phi}(z|x)||P_{\theta}(z|x))\nonumber\\\
&= argmaxELBO\nonumber\\
&= argmaxE_{q_{\phi}(z|x)}[logP_{\theta}(x,z)]+H[q_{\phi}]\nonumber\\
&= argmaxE_{q_{\phi}(z|x)}[logP_{\theta}(x,z)]-KL(q_{\phi}(z|x)||P(z))\\
\end{align}
$$




采用SGVI/SGVB/SVI/Amortized Inference方法得到：

<img src="file:///C:\Users\jyh\Documents\Tencent Files\1069468761\Image\C2C\60B6056A5DC6496AF30E493C55001202.jpg" alt="img" style="zoom: 25%;" />

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221114163105092.png" alt="image-20221114163105092" style="zoom: 80%;" />

## VQ-VAE

### VAE存在的问题

- posterior collapse: have a powerful decoder, but latents are ignored.

### 解决方法

- vector quantisation：不能将所有的模拟量都用二进制码进行编码，这样消耗大量内存。这里采用baseline+biar（差分编码）

![img](https://mqasem.net/vectorquantization/figure1.gif)

类似k-means的方法，用几个样本点代替原有的随机变量，这些样本点作为baseline



### 网络结构上的改进



![image-20221114163223635](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221114163223635.png)
$$
\underset{\text { (Deterministic) }}{q(z=k \mid x)}=\left\{\begin{array}{ll}
1 & \text { for } \mathrm{k}=\operatorname{argmin}_{j}\left\|z_{e}(x)-e_{j}\right\|_{2} \\
0 & \text { otherwise }
\end{array}\right.
$$

$$
z_{q}(x)=e_{k}, \quad \text { where } \quad k=\operatorname{argmin}_{j}\left\|z_{e}(x)-e_{j}\right\|_{2}
$$

### loss function

1. ELBO ----> Reconstruction Loss
2. VQ update(L2 distance (+EMA)) 训练embedding，让其能够更上encoder和decoder的训练
3. Commitment loss(L2) 类似正规化

$$
L=\log p\left(x \mid z_{q}(x)\right)+\left\|\operatorname{sign}\left[z_{e}(x)\right]-e\right\|_{2}^{2}+\beta\left\|z_{e}(x)-\operatorname{sign}[e]\right\|_{2}^{2}\   \beta =0.25
$$

- 在q这个过程为什么梯度能够传递？

作者直接把左右两边的导数复制过去，只是更新了函数值

- 为什么ELBO能够简化？

$$
\begin{align}
L(\theta, \phi ; x) &= E_{q_{\phi}(z \mid x)}\left[\log \left(p_{\theta}(x \mid z)\right)\right]-D_{K L}\left(q_{\phi}(z \mid x) \| p_{\theta}(z)\right)\nonumber\\
&= Reconstruction Loss - Regularization Loss
\end{align}
$$

1. Assume a uniform prior for z
2. The posterier $q_{\phi}(z|x)$ is deterministic



