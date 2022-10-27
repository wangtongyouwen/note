# 使用finalshell工具配置虚拟机的ssm服务

###### 1 下载VMware

https://customerconnect.vmware.com/en/downloads/details?downloadGroup=WKST-PLAYER-1624&productId=1039

###### 2 下载CentOS镜像

http://mirrors.aliyun.com/centos/7/isos/x86_64/ 

##### 3 下载finalshell

http://www.hostbuf.com/t/988.html

这个下载真是太慢了

##### 4 记住如下ip地址和子网掩码

![image-20221025230112905](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221025230112905.png)

或者在虚拟机中输入，找到ens33下的 net 和 netmask

```cmd
ifconfig 
```

![image-20221025230240994](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221025230240994.png)

##### 5 找到 etc/syconfig/network-scripts

使用gnome界面能快速找到这个目录（毕竟不想用黑框操作）在计算机的目录下

```
su vim ifcfg-ens33
```

按i 进入输入模式

修改

```
BOOTPROTO=static
ONBOOT=yes
IPADDR=192.168.120.200
NETMASK=255.255.255.0
GATEWAY=192.168.120.2
```

按esc退出编辑模式 

按shift+:,再输入wq保存退出

再重启服务

```
systemctl restart network
```

##### 6 进入finalshell配置

![image-20221025231100823](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221025231100823.png)

![image-20221025231238445](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221025231238445.png)

###### 7 配置ipv4

```
vim /etc/sysctl.conf
```

同上数vim操作输入一行内容

```
net.ipv4.ip_forward = 1
```

保存退出

这一步可以帮助未来使用 docker中 的 nginx 服务

##### 8 问题

为什么不能直接修改上述提到的conf配置？

默认gnome的用户是sudo用户，需要su用户才能进行编辑，这里就需要用到vim编辑器

为什么vim编辑器不能直接输入？

vim编辑器需要先敲入i，进入insert模式才能修改文件，退出的时候需要：wq，才能完成保存



























