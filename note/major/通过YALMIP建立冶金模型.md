# 通过[YALMIP](https://yalmip.github.io/)建立冶金模型

# 1 准备工作

## 1 安装

https://github.com/yalmip/yalmip/archive/master.zip

解压放置到：

```bash
D:\MATLAB\toolbox
```

![image-20220914223309794](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/postgraduate/major/note/202209142233778.png)

## 2 测试

```matlab
yalmiptest
which sdpvar
```

![image-20220914223500335](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/postgraduate/major/note/202209142235775.png)

## 3 使用

### 3.1 线性规划

```matlab
%% Generate data
blues = randn(2,25);
greens = randn(2,25)+2;
plot(greens(1,:),greens(2,:),'g*')
hold on
plot(blues(1,:),blues(2,:),'b*')

%% Define and solve model
a = sdpvar(2,1);
b = sdpvar(1);
u = sdpvar(1,25);
v = sdpvar(1,25);
Constraints = [a'*greens+b >= 1-u, a'*blues+b <= -(1-v), u >= 0, v >= 0]
Objective = sum(u)+sum(v)
Constraints = [Constraints, -1 <= a <= 1];
optimize(Constraints,Objective)

%% Plotting using lazy YALMIP code
x = sdpvar(2,1);
P1 = [-5<=x<=5, value(a)'*x+value(b)>=0];
P2 = [-5<=x<=5, value(a)'*x+value(b)<=0];
clf
plot(P1);hold on
plot(P2);
plot(greens(1,:),greens(2,:),'g*')
plot(blues(1,:),blues(2,:),'b*')
```

![Separated with linear classifier](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/postgraduate/major/note/202209152344869.png)

### 3.2 二次规划

```matlab
%% Create data
x = [1 2 3 4 5 6]';
t = (0:0.02:2*pi)';
A = [sin(t) sin(2*t) sin(3*t) sin(4*t) sin(5*t) sin(6*t)];
e = (-4+8*rand(length(t),1));
e(100:115) = 30;
y = A*x+e;

%% Various estimates
xhat = sdpvar(6,1);
e = y-A*xhat;

bound = sdpvar(length(e),1);
Constraints = [-bound <= e <= bound];
optimize(Constraints,sum(bound));
x_L1 = value(xhat);

optimize(Constraints,e'*e);
x_L2 = value(xhat);

bound = sdpvar(1,1);
Constraints  = [-bound <= e <= bound];

optimize(Constraints,bound);
x_Linf = value(xhat);
         
bound = sdpvar(length(e),1);
Constraints = [-bound <= e <= bound];         
optimize(Constraints,e'*e + sum(bound));
x_L2L1 = value(xhat);

%% Evaluate
plot(t,[y A*x_L1 A*x_L2 A*x_Linf A*x_L2L1]);
legend('y','L1','L2','Linf','L2/L1')
```



## 2 代码

```matlab
[c]=xlsread('C:\Users\jyh\Desktop\work\study\note\major\rawdata.xlsx', 1);
[d]=xlsread('C:\Users\jyh\Desktop\work\study\note\major\rawdata.xlsx', 2);
g=5;
t=3;
psu = 19;
q = 220;
psl = 171;
i = 15;
j = 30;
k = 3;
x = binvar(i,j);
y = binvar(i,k);
z = binvar(i,j,k);
dj_zij = reshape(reshape(z,i*k,j)*d,i,k);

t1 = sum(x(1:g),1);
t2 = sum(x(g+1,2*g),1);
t3 = sum(x(2*g+1,3*g),1);

Objective = sum(repmat(d,1,i).*(c.*x)','all') + sum(psu*q*y,'all') - psu*d'*(sum(x,1))' + psl*d'*(1-sum(x,1))';
Constraints = [sum(sum(z,3),1) <= ones(1,j),...
               dj_zij <= q*y,...
               x == sum(z,3),...
               sum(t1,2) <= 11,...
               sum(t1,2) >= 8,...
               sum(t2,2) >= 8,...
               sum(t2,2) <= 11,...
               sum(t3,2) >= 6,...
               sum(t3,2) <= 9,...
               ];
optimize(Constraints,Objective);           
```

问题分析：

模型的约束条件存在问题，惩罚矩阵存在问题，由于缺乏数据，随机产生的数据通过测试后会陷入局部最优，不是正确的答案。

对流程分析机理不够透彻，不能准确的建立目标函数的约束条件















