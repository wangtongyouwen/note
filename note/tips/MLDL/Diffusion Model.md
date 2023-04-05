GAN的问题：需要训练两个网络，容易不收敛，多样性比较差，只关注能骗过判别器

# Diffusion

![image-20221112164034826](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221112164034826.png)

## 前向过程

不断往数据中加入噪声，最后得到了纯噪声（扩散过程）

每个时刻都要添加高斯噪声，后一时刻都是有前一时刻增加噪声得到的；

其实这个过程可以看作不断**构建标签**（噪声）的过程

### 第一个公式，如何得到$X_t$时刻的分布（前向过程）？

$$
\alpha _t = 1- \beta_t
$$

式（1）中$\beta$表示图像的加入噪声的程度，随着训练的进行要逐渐增大，论文中从0.0001到0.002扩大。
$$
x_t=\sqrt{\alpha_t}x_{t-1}+\sqrt{1-\alpha_t}z_1
$$
式(2)中$z_1$表示噪声（高斯噪声）
$$
\begin{align}
          x_t & = \sqrt{\alpha _t}(\sqrt{\alpha_{t-1}}x_{t-2}+\sqrt{1-\alpha_{t-1}}z_{2})+\sqrt{1-\alpha_t}z_1 \\
           & = \sqrt{\alpha_t\alpha_{t-1}}x_{t-2}+\sqrt{1-\alpha_t\alpha_{t-1}}\bar z_2 \\
           & = \sqrt{\bar \alpha_t}x_0+\sqrt{1-\bar \alpha_t} z_t
          \end{align}
$$
其中$z_1和z_2$分别表示$N(0,1-\alpha_t)和N(0,\alpha_t(1-\alpha_{t-1}))$，独立同分布可相加得到，最后的$\bar z_2$

其中$\bar \alpha_t$表示累乘$\bar \alpha_t=\alpha_1\cdot \alpha_2 \cdot \dots \alpha_{t-1}\cdot \alpha_{t}$

## 逆向过程

![image-20221112171756756](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221112171756756.png)
$$
q(X_{t-1}|X_t,X_0)=q(X_t|X_{t-1},X_0)\frac{q(X_{t-1}|X_0)}{q((X_t|X_0))}
$$

$$
q(X_{t-1}|X_0)\Longrightarrow	 \sqrt{\bar \alpha_{t-1}}x_0+\sqrt{1-\bar \alpha_{t-1}}z \sim N(\sqrt{\bar \alpha_{t-1}}x_0,1-\bar \alpha_{t-1})
$$


$$
q(X_{t}|X_0)\Longrightarrow	 \sqrt{\bar \alpha_{t}}x_0+\sqrt{1-\bar \alpha_{t}}z \sim N(\sqrt{\bar \alpha_{t}}x_0,1-\bar \alpha_{t})
$$

$$
q(X_{t}|X_{t-1},X_0)\Longrightarrow	 \sqrt{ \alpha_{t}}x_{t-1}+\sqrt{1- \alpha_{t}}z \sim N(\sqrt{ \alpha_{t}}x_0,1- \alpha_{t})
$$

将式(7~9)代入式(6)得：
$$
q(X_{t-1}|X_t,X_0)\propto \exp \left(-\frac{1}{2}\left(\frac{\left(\mathbf{x}_{t}-\sqrt{\alpha_{t}} \mathbf{x}_{t-1}\right)^{2}}{\beta_{t}}+\frac{\left(\mathbf{x}_{t-1}-\sqrt{\bar{\alpha}_{t-1}} \mathbf{x}_{0}\right)^{2}}{1-\bar{\alpha}_{t-1}}-\frac{\left(\mathbf{x}_{t}-\sqrt{\bar{\alpha}_{t}} \mathbf{x}_{0}\right)^{2}}{1-\bar{\alpha}_{t}}\right)\right)
$$

$$
\begin{array}{l}
=\exp \left(-\frac{1}{2}\left(\frac{\mathbf{x}_{t}^{2}-2 \sqrt{\alpha_{t}} \mathbf{x}_{t} \mathbf{x}_{t-1}+\alpha_{t} \mathbf{x}_{t-1}^{2}}{\beta_{t}}+\frac{\mathbf{x}_{t-1}^{2}-2 \sqrt{\bar{\alpha}_{t-1}} \mathbf{x}_{0} \mathbf{x}_{t-1}+\bar{\alpha}_{t-1} \mathbf{x}_{0}^{2}}{1-\bar{\alpha}_{t-1}}-\frac{\left(\mathbf{x}_{t}-\sqrt{\bar{\alpha}_{t}} \mathbf{x}_{0}\right)^{2}}{1-\bar{\alpha}_{t}}\right)\right) \\
=\exp \left(-\frac{1}{2}\left(\left(\frac{\alpha_{t}}{\beta_{t}}+\frac{1}{1-\bar{\alpha}_{t-1}}\right) \mathbf{x}_{t-1}^{2}-\left(\frac{2 \sqrt{\alpha_{t}}}{\beta_{t}} \mathbf{x}_{t}+\frac{2 \sqrt{\bar{\alpha}_{t-1}}}{1-\bar{\alpha}_{t-1}} \mathbf{x}_{0}\right) \mathbf{x}_{t-1}+C\left(\mathbf{x}_{t}, \mathbf{x}_{0}\right)\right)\right) 
\end{array}
$$


$$
\exp \left(-\frac{(x-\mu)^{2}}{2 \sigma^{2}}\right)=\exp \left(-\frac{1}{2}\left(\frac{1}{\sigma^{2}} x^{2}-\frac{2 \mu}{\sigma^{2}} x+\frac{\mu^{2}}{\sigma^{2}}\right)\right)
$$
由式(12)可知：
$$
\begin{cases}
\bar\sigma_t=\sqrt{(\frac{\alpha_t}{\beta_t})+\frac{1}{1-\bar \alpha_{t-1}}} \\
\bar\mu_t(X_t,X_0)=\frac{\sqrt{\alpha_{t}}\left(1-\bar{\alpha}_{t-1}\right)}{1-\bar{\alpha}_{t}} \mathbf{x}_{t}+\frac{\sqrt{\bar{\alpha}_{t-1}} \beta_{t}}{1-\bar{\alpha}_{t}} \mathbf{x}_{0} \\

\end{cases}
$$

其中:
$$
x_0=\frac{1}{\sqrt{\bar\alpha_t}}(x_t-\sqrt{1-\bar \alpha_t}z_t)
$$
最终得到$\tilde{\mu}_{t}$



$$
\tilde{\mu}_{t}=\frac{1}{\sqrt{a_{t}}}\left(x_{t}-\frac{\beta_{t}}{\sqrt{1-\bar{a}_{t}}} {z}_{t}\right)
$$
其中$z_t$是什么？是估计的每个时刻的噪声，即$X_T$时刻的噪声

- 虽然无法直接求解，但是能通过训练一个模型进行计算
- 采用Unet模型
- 模型的输入参数为当前时刻的分布和时刻t
- 模型的真实结果其实是由前向过程中添加的noise标签（显然是已知的）

## 最终算法

![image-20221112194234255](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221112194234255.png)

 









