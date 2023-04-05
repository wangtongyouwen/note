# Swin Transformer: Hierarchical Vision Transformer using Shifted Windows

https://github.com/microsoft/Swin-Transformer

## 1 前言

将transformer直接使用到CV领域遇到的问题：

- 尺度问题：同一张图中代表不用语义信息的block尺度差距很大
- 处理像素问题的计算成本大(形成的序列很长)

本文提出一种hierarchical transformer,主要使用了shifted windows

- 自注意力机制是在这个窗口中计算的，序列长度大大降低
- 通过shifting这个操作能够让相邻的两个窗口之间产生交互，上下层之间有了cross-window-connection

image classification/object detection/semantic segmentation

## 2 结构

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221120204634060.png" alt="image-20221120204634060" style="zoom:50%;" />

- shift操作：

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221120205646916.png" alt="image-20221120205646916" style="zoom:50%;" />

将窗口往右和下分别移动两格，然后再把原来的图片分成四格，这样得到最终的窗口(一个图片默认7*7patch)

- 窗口与窗口之间可以互动

![image-20221120210315247](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221120210315247.png)

- path大小:4*4
- patch merge:类似池化操作
- 窗口注意力机制的复杂度：

$$
\begin{array}{l}
\Omega(\mathrm{MSA})=4 h w C^{2}+2(h w)^{2} C \\
\Omega(\mathrm{W}-\mathrm{MSA})=4 h w C^{2}+2 M^{2} h w C
\end{array}
$$

- 滑动窗口方式

$$
\begin{array}{l}
\hat{\mathbf{z}}^{l}=\mathrm{W}-\operatorname{MSA}\left(\operatorname{LN}\left(\mathbf{z}^{l-1}\right)\right)+\mathbf{z}^{l-1} \\
\mathbf{z}^{l}=\operatorname{MLP}\left(\operatorname{LN}\left(\hat{\mathbf{z}}^{l}\right)\right)+\hat{\mathbf{z}}^{l} \\
\hat{\mathbf{z}}^{l+1}=\operatorname{SW-MSA}\left(\operatorname{LN}\left(\mathbf{z}^{l}\right)\right)+\mathbf{z}^{l} \\
\mathbf{z}^{l+1}=\operatorname{MLP}\left(\operatorname{LN}\left(\hat{\mathbf{z}}^{l+1}\right)\right)+\hat{\mathbf{z}}^{l+1}
\end{array}
$$

 

- 掩码操作

![image-20221120213028206](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221120213028206.png)

<img src="C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221120213953469.png" alt="image-20221120213953469" style="zoom: 80%;" />

```python
import torch

import matplotlib.pyplot as plt


def window_partition(x, window_size):
    """
    Args:
        x: (B, H, W, C)
        window_size (int): window size

    Returns:
        windows: (num_windows*B, window_size, window_size, C)
    """
    B, H, W, C = x.shape
    x = x.view(B, H // window_size, window_size, W // window_size, window_size, C)
    windows = x.permute(0, 1, 3, 2, 4, 5).contiguous().view(-1, window_size, window_size, C)
    return windows


window_size = 7
shift_size = 3
H, W = 14, 14
img_mask = torch.zeros((1, H, W, 1))  # 1 H W 1
h_slices = (slice(0, -window_size),
            slice(-window_size, -shift_size),
            slice(-shift_size, None))
w_slices = (slice(0, -window_size),
            slice(-window_size, -shift_size),
            slice(-shift_size, None))
cnt = 0
for h in h_slices:
    for w in w_slices:
        img_mask[:, h, w, :] = cnt
        cnt += 1

mask_windows = window_partition(img_mask, window_size)  # nW, window_size, window_size, 1
mask_windows = mask_windows.view(-1, window_size * window_size)

attn_mask = mask_windows.unsqueeze(1) - mask_windows.unsqueeze(2)
attn_mask = attn_mask.masked_fill(attn_mask != 0, float(-100.0)).masked_fill(attn_mask == 0, float(0.0))

plt.matshow(img_mask[0, :, :, 0].numpy())
plt.matshow(attn_mask[0].numpy())
plt.matshow(attn_mask[1].numpy())
plt.matshow(attn_mask[2].numpy())
plt.matshow(attn_mask[3].numpy())

plt.show()
```

- 计算复杂度

![image-20221120214559887](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221120214559887.png)