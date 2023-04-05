## 1 本机配置

### 1.1 下载FileZilla工具

https://download.filezilla-project.org/client/FileZilla_3.62.0_win64_sponsored-setup.exe

### 1.2 配置

![image-20221102221639109](C:\Users\jyh\AppData\Roaming\Typora\typora-user-images\image-20221102221639109.png)

## 2 服务器配置

### 2.1 配置yum源

```sh
yum install -y  wget
sudo mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bk

cd /etc/yum.repos.d
sudo wget -nc http://mirrors.aliyun.com/repo/Centos-7.repo

sudo mv Centos-7.repo CentOS-Base.repo
sudo yum clean all
sudo yum list
sudo yum makecache
```

### 2.2 开始安装服务端

```sh
yum install openssh-server
systemctl start sshd 
systemctl enable sshd
ifconfig # 查看端口和ip地址
```

