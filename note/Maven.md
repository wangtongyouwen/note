# 1 Maven基础

## 1.1 简介

### 1.1.1 定义

本质是一个项目管理工具，将项目开发和管理过程抽象成一个项目对象模型（POM）

POM（Project Object Model）：项目对象模型

![image-20220923082346932](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202209230826587.png)

### 1.1.2 作用

- 项目构建：提供标准的、跨平台的自动化项目构建方式
- 依赖环境：方便快捷的管理项目依赖的资源（jar包），避免资源间的版本冲突问题
- 统一开发结构：提供标准的、统一的项目结构

## 1.2 环境配置

![image-20220923085027450](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202209230850938.png)

![image-20220923085048821](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202209230850664.png)



## 1.3 概念

### 1.3.1 仓库

用于存储资源，包括各种jar包

仓库分类：

- 本地仓库：自己电脑上的仓库，为本地仓库提供资源
- 远程仓库：
  - 中央仓库：Maven团队维护，存储所有资源提供资源
  - 私服：部门，公司范围内存储资源的仓库，从中央仓库获取资源
- 私服的作用：
  - 保存具有版权的资源，包括购买或自主研发的jar
  - 中央仓库中jar包都是开源的，不能存储具有版权的资源
  - 一定范围内共享资源，仅对内部开放，不对外共享

### 1.3.2 坐标

用于描述仓库中资源的位置

[Central Repository: (maven.org)](https://repo1.maven.org/maven2/)

- 坐标的组成：

​			groupId：定义当前Maven项目隶属组织名称（通常是域名反写）

​			artifactId：定义当前Maven项目名称（通常是模块名称，例如CRM、SMS）

​			version：定义当前项目版本号

- 作用：

​			使用唯一标识，唯一性定位资源位置，通过该标识可以将资源的识别与下载工作交由机器完成

### 1.3.3 仓库配置

#### 1 本地仓库配置

修改D:\apache-maven-3.6.3\conf\settings.xml 文件

```xml
 <localRepository>D:\apache-maven-3.6.3\repository</localRepository>
```

#### 2 远程仓库配置

```xml
<repositories>
  <repository>
    <id>central</id>
    <name>Central Repository</name>
    <url>https://repo.maven.apache.org/maven2</url>
    <layout>default</layout>
    <snapshots>
      <enabled>false</enabled>
    </snapshots>
  </repository>
</repositories>
```

#### 3 镜像仓库配置

```xml
<mirrors>
   <mirror>
    <id>nexus-aliyun</id>
    <mirrorOf>central</mirrorOf>
    <name>Nexus-aliyun</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public</url>
  </mirror>
</mirrors>
```

### 1.3.4 全局setting与用户setting区别

全局setting定义了当前计算器中Maven的公共配置

用户setting定义了当前用户的配置

## 1.4 手工制作Maven项目

![image-20220923091753715](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202209230917255.png)

### 手动创建

在src同层目录下创建pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project 
  xmlns="http://maven.apache.org/POM/4.0.0" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.itheima</groupId>
  <artifactId>project-java</artifactId>
  <version>1.0</version>
  <packaging>jar</packaging>
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
    </dependency>
  </dependencies>
</project>
```

Maven 项目构建命令

```bash
mvn compile   # 编译
mvn clean     # 清理
mvn test      # 测试
mvn package   # 打包
mvn install   # 安装到本地仓库
```

### 插件创建工程

- 创建工程

```bash
mvn archetype:generate
-DgroupId={project-packaging} 
-DartifactId={project-name} 
-DarchetypeArtifactId=maven-archetype-quickstart
-DinteractiveMode=false


```

- 创建java工程

```bash
mvn archetype:generate -DgroupId=com.itheima -DartifactId=java-project -
DarchetypeArtifactId=maven-archetype-quickstart -Dversion=0.0.1-snapshot -
DinteractiveMode=false
```

- 创建web工程

```bash
mvn archetype:generate -DgroupId=com.itheima -DartifactId=web-project -
DarchetypeArtifactId=maven-archetype-webapp -Dversion=0.0.1-snapshot -
DinteractiveMode=false
```

![image-20220923143538996](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202209231435879.png)

### idea生成

![image-20220923144350034](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202209231443759.png)

原型创建Java项目

![image-20220923161917800](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202209231619513.png)

原型创建Web项目

![image-20220923163722919](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202209231637643.png)

Web运行需要的插件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <!--指定pom的模型版本-->
  <modelVersion>4.0.0</modelVersion>
  <!--打包方式，web工程打包为war，java工程打包为jar-->
  <packaging>war</packaging>

  <!--组织id-->
  <groupId>com.itheima</groupId>
  <!--项目id-->
  <artifactId>web01</artifactId>
  <!--版本号:release,snapshot-->
  <version>1.0-SNAPSHOT</version>

  <!--设置当前工程的所有依赖-->
  <dependencies>
    <!--具体的依赖-->
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
    </dependency>
  </dependencies>

  <!--构建-->
  <build>
    <!--设置插件-->
    <plugins>
      <!--具体的插件配置-->
      <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
        <version>2.1</version>
        <configuration>
          <port>80</port>
          <path>/</path>
        </configuration>
      </plugin>
    </plugins>
  </build>

</project>

```

## 1.5 依赖配置

依赖指当前项目运行所需的jar，一个项目可以设置多个依赖

### 1.5.1 依赖传递

- 依赖具有传递性
  - 直接依赖：在当前项目中通过依赖配置建立的依赖关系
  - 间接依赖：被资源的资源如果依赖其他资源，当前项目间接依赖其他资源
- 依赖传递冲突问题

  - 路径优先：当依赖中出现相同的资源时，层次越深，优先级越低，层级越浅，优先级越高
  - 声明优先：当资源在相同层级被依赖时，配置顺序靠前的覆盖配置顺序靠后的
  - 特殊优先：当同级配置了相同资源的不同版本，后配置的覆盖先配置的
- 可选依赖：可选依赖指定对外隐藏当前所依赖的资源——不透明

```xml
<optional>true</optional>
```

- 排除依赖：

```xml
<exclusions>
  <exclusion>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
  </exclusion>
</exclusions>
```

### 1.5.2 依赖范围

依赖的jar默认情况可以在任何地方使用，可以通过scope标签设定其作用范围

作用范围：

- 主程序范围有效（main文件夹范围内）
- 测试程序范围有效（test文件夹范围内）
- 是否参与打包（package指令范围内）

| scope           | 主代码 | 测试代码 | 打包 | 范例        |
| --------------- | ------ | -------- | ---- | ----------- |
| compile（默认） | Y      | Y        | Y    | log4j       |
| test            |        | Y        |      | junit       |
| provided        | Y      | Y        |      | servlet-api |
| runtime         |        |          | Y    | jdbc        |

- 带有依赖范围的资源在进行传递时，作用范围将收到影响

|                     | compile(直接依赖) | test | provided | runtime |
| ------------------- | ----------------- | ---- | -------- | ------- |
| compile（间接依赖） | compile           | test | provided | runtime |
| test                |                   |      |          |         |
| provided            |                   |      |          |         |
| runtime             | runtime           | test | provided | runtime |

## 1.6 生命周期与插件

### 1.6.1 生命周期

Maven构建生命周期描述的是一次构建过程经历了多少个事件

compile---->test-compile---->test---->package---->install

- Maven对项目构建的生命周期划分为3套
  - clean：清理工作
    - pre-clean：执行一些需要在clean之前完成的工作
    - clean：移除所有上一次构建生成的文件
    - post-clean：执行一些需要在clean之后立即完成的工作
  - default：核心工作，例如编译，测试，打包，部署等
    - validate（校验） 校验项目是否正确并且所有必要的信息可以完成项目的构建过程。  
    - initialize（初始化） 初始化构建状态，比如设置属性值。  
    - generate-sources（生成源代码） 生成包含在编译阶段中的任何源代码。 
    - process-sources（处理源代码） 处理源代码，比如说，过滤任意值。 
    - generate-resources（生成资源文件） 生成将会包含在项目包中的资源文件。
    - process-resources （处理资源文件） 复制和处理资源到目标目录，为打包阶段最好准备。  
    - **compile（编译） 编译项目的源代码。**  
    - process-classes（处理类文件） 处理编译生成的文件，比如说对Java class文件做字节码改善优化。  
    - generate-test-sources（生成测试源代码） 生成包含在编译阶段中的任何测试源代码。  
    - process-test-sources（处理测试源代码） 处理测试源代码，比如说，过滤任意值。  
    - generate-test-resources（生成测试资源文件） 为测试创建资源文件。 
    -  process-test-resources（处理测试资源文件） 复制和处理测试资源到目标目录。  
    - **test-compile（编译测试源码） 编译测试源代码到测试目标目录.**  
    - process-test-classes（处理测试类文件） 处理测试源码编译生成的文件。  
    - **test（测试） 使用合适的单元测试框架运行测试（Juint是其中之一）。**  
    - prepare-package（准备打包） 在实际打包之前，执行任何的必要的操作为打包做准备。  
    - **package（打包） 将编译后的代码打包成可分发格式的文件，比如JAR、WAR或者EAR文件。**  
    - pre-integration-test（集成测试前） 在执行集成测试前进行必要的动作。比如说，搭建需要的环境。 
    - integration-test（集成测试） 处理和部署项目到可以运行集成测试环境中。 
    - post-integration-test（集成测试后） 在执行集成测试完成后进行必要的动作。比如说，清理集成测试环境。  
    - verify （验证） 运行任意的检查来验证项目包有效且达到质量标准。 
    - **install（安装） 安装项目包到本地仓库，这样项目包可以用作其他本地项目的依赖。** 
    - deploy（部署） 将最终的项目包复制到远程仓库中与其他开发者和项目共享。
  - site：产生报告，发布站点等
    -  pre-site 执行一些需要在生成站点文档之前完成的工作  
    - site 生成项目的站点文档  
    - post-site 执行一些需要在生成站点文档之后完成的工作，并且为部署做准备  
    - site-deploy 将生成的站点文档部署到特定的服务器上

### 1.6.2 插件

- 插件与生命周期内的阶段绑定，在执行到对应生命周期时执行对应的插件功能
- 默认Maven在各个生命周期上绑定有预设的功能
- 通过插件可以自定义其他功能

```xml
<build>
  <plugins>
      <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-source-plugin</artifactId>
          <version>2.2.1</version>
          <executions>
              <execution>
                  <goals>
                      <goal>jar</goal>
                      <goal>test-jar</goal>
                  </goals>
                  <phase>generate-test-resources</phase>
              </execution>
          </executions>
      </plugin>
  </plugins>
</build>
```

# 2 Maven高级

**今日目标**

> * 理解并实现分模块开发
> * 能够使用聚合工程快速构建项目
> * 能够使用继承简化项目配置
> * 能够根据需求配置生成、开发、测试环境，并在各个环境间切换运行
> * 了解Maven的私服

## 2.1 分模块开发

### 2.1.1 分模块开发设计

(1)按照功能拆分

我们现在的项目都是在一个模块中，比如前面的SSM整合开发。虽然这样做功能也都实现了，但是也存在了一些问题，我们拿银行的项目为例来聊聊这个事。

* 网络没有那么发达的时候，我们需要到银行柜台或者取款机进行业务操作
* 随着互联网的发展,我们有了电脑以后，就可以在网页上登录银行网站使用U盾进行业务操作
* 再来就是随着智能手机的普及，我们只需要用手机登录APP就可以进行业务操作

上面三个场景出现的时间是不相同的，如果非要把三个场景的模块代码放入到一个项目，那么当其中某一个模块代码出现问题，就会导致整个项目无法正常启动，从而导致银行的多个业务都无法正常班理。所以我们会==按照功能==将项目进行拆分。

(2)按照模块拆分

比如电商的项目中，有订单和商品两个模块，订单中需要包含商品的详细信息，所以需要商品的模型类，商品模块也会用到商品的模型类，这个时候如果两个模块中都写模型类，就会出现重复代码，后期的维护成本就比较高。我们就想能不能将它们公共的部分抽取成一个独立的模块，其他模块要想使用可以像添加第三方jar包依赖一样来使用我们自己抽取的模块，这样就解决了代码重复的问题,这种拆分方式就说我们所说的==按照模块==拆分。

![1630768703430](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041835776.png)

经过两个案例的分析，我们就知道:

* 将原始模块按照功能拆分成若干个子模块，方便模块间的相互调用，接口共享。

刚刚我们说了可以将domain层进行拆分，除了domain层，我们也可以将其他的层也拆成一个个对立的模块，如:

![1630768869208](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041835397.png)

这样的话，项目中的每一层都可以单独维护，也可以很方便的被别人使用。关于分模块开发的意义，我们就说完了，说了这么多好处，那么该如何实现呢?

### 2.1.2 分模块开发实现

前面我们已经完成了SSM整合，接下来，咱们就基于SSM整合的项目来实现对项目的拆分。

#### 1 环境准备

将`资料\maven_02_ssm`部署到IDEA中，将环境快速准备好，部署成功后，项目的格式如下:

![1630769969416](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041835934.png)

#### 2 抽取domain层

##### 步骤1:创建新模块

创建一个名称为`maven_03_pojo`的jar项目,为什么项目名是从02到03这样创建，原因后面我们会提到，这块的名称可以任意。

![1630771178137](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041836387.png)

##### 步骤2:项目中创建domain包

在`maven_03_pojo`项目中创建`com.itheima.domain`包，并将`maven_02_ssm`中Book类拷贝到该包中

![1630771371487](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041836529.png)

##### 步骤3:删除原项目中的domain包

删除后，`maven_02_ssm`项目中用到`Book`的类中都会有红色提示，如下:

![1630771505703](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041836489.png)

**说明:**出错的原因是`maven_02_ssm`中已经将Book类删除，所以该项目找不到Book类，所以报错

要想解决上述问题，我们需要在`maven_02_ssm`中添加`maven_03_pojo`的依赖。

##### 步骤4:建立依赖关系

在`maven_02_ssm`项目的pom.xml添加`maven_03_pojo`的依赖

```xml
<dependency>
    <groupId>com.itheima</groupId>
    <artifactId>maven_03_pojo</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

因为添加了依赖，所以在`maven_02_ssm`中就已经能找到Book类，所以刚才的报红提示就会消失。

##### 步骤5:编译`maven_02_ssm`项目

编译`maven_02_ssm`你会在控制台看到如下错误

![1630771987325](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041836998.png)

错误信息为：不能解决`maven_02_ssm`项目的依赖问题，找不到`maven_03_pojo`这个jar包。

为什么找不到呢?

原因是Maven会从本地仓库找对应的jar包，但是本地仓库又不存在该jar包所以会报错。

在IDEA中是有`maven_03_pojo`这个项目，所以我们只需要将`maven_03_pojo`项目安装到本地仓库即可。

##### 步骤6:将项目安装本地仓库

将需要被依赖的项目`maven_03_pojo`，使用maven的install命令，把其安装到Maven的本地仓库中。

![1630773180969](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041836958.png)

安装成功后，在对应的路径下就看到安装好的jar包

![1630773262441](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041836258.png)

**说明:**具体安装在哪里，和你们自己电脑上Maven的本地仓库配置的位置有关。

当再次执行`maven_02_ssm`的compile的命令后，就已经能够成功编译。

#### 3 抽取Dao层

##### 步骤1:创建新模块

创建一个名称为`maven_04_dao`的jar项目

![1630773580067](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041836182.png)

##### 步骤2:项目中创建dao包

在`maven_04_dao`项目中创建`com.itheima.dao`包，并将`maven_02_ssm`中BookDao类拷贝到该包中

![1630773695062](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041842218.png)

在`maven_04_dao`中会有如下几个问题需要解决下:

![1630773958756](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041842893.png)

* 项目`maven_04_dao`的BookDao接口中Book类找不到报错

  * 解决方案在`maven_04_dao`项目的pom.xml中添加`maven_03_pojo`项目

    ```xml
    <dependencies>
        <dependency>
            <groupId>com.itheima</groupId>
            <artifactId>maven_03_pojo</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>
    ```

* 项目`maven_04_dao`的BookDao接口中，Mybatis的增删改查注解报错

  * 解决方案在`maven_04_dao`项目的pom.xml中添加`mybatis`的相关依赖

    ```xml
    <dependencies>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.6</version>
        </dependency>
    
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
        </dependency>
    </dependencies>
    ```

##### 步骤3:删除原项目中的dao包

删除Dao包以后，因为`maven_02_ssm`中的BookServiceImpl类中有使用到Dao的内容，所以需要在`maven_02_ssm`的pom.xml添加`maven_04_dao`的依赖

```xml
<dependency>
    <groupId>com.itheima</groupId>
    <artifactId>maven_04_dao</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

此时在`maven_02_ssm`项目中就已经添加了`maven_03_pojo`和`maven_04_dao`包

![1630774696344](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041842047.png)

再次对`maven_02_ssm`项目进行编译，又会报错，如下:

![1630774780211](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041842278.png)

和刚才的错误原因是一样的，maven在仓库中没有找到`maven_04_dao`,所以此时我们只需要将`maven_04_dao`安装到Maven的本地仓库即可。

##### 步骤4:将项目安装到本地仓库

将需要被依赖的项目`maven_04_dao`，使用maven的install命令，把其安装到Maven的本地仓库中。

![1630774917743](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041842159.png)

安装成功后，在对应的路径下就看到了安装好对应的jar包

![1630774946856](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041842571.png)

当再次执行`maven_02_ssm`的compile的指令后，就已经能够成功编译。

#### 4 运行测试并总结

将抽取后的项目进行运行，测试之前的增删改查功能依然能够使用。

所以对于项目的拆分，大致会有如下几个步骤:

(1) 创建Maven模块

(2) 书写模块代码

分模块开发需要先针对模块功能进行设计，再进行编码。不会先将工程开发完毕，然后进行拆分。拆分方式可以按照功能拆也可以按照模块拆。

(3)通过maven指令安装模块到本地仓库(install 指令)

团队内部开发需要发布模块功能到团队内部可共享的仓库中(私服)，私服我们后面会讲解。

## 2.2 依赖管理

我们现在已经能把项目拆分成一个个独立的模块，当在其他项目中想要使用独立出来的这些模块，只需要在其pom.xml使用<dependency>标签来进行jar包的引入即可。

<dependency>其实就是依赖，关于依赖管理里面都涉及哪些内容，我们就一个个来学习下:

* 依赖传递
* 可选依赖
* 排除依赖

我们先来说说什么是依赖:

依赖指当前项目运行所需的jar，一个项目可以设置多个依赖。

格式为:

```xml
<!--设置当前项目所依赖的所有jar-->
<dependencies>
    <!--设置具体的依赖-->
    <dependency>
        <!--依赖所属群组id-->
        <groupId>org.springframework</groupId>
        <!--依赖所属项目id-->
        <artifactId>spring-webmvc</artifactId>
        <!--依赖版本号-->
        <version>5.2.10.RELEASE</version>
    </dependency>
</dependencies>
```

### 2.2.1 依赖传递与冲突问题

回到我们刚才的项目案例中，打开Maven的面板，你会发现:

![](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041843891.png)

在项目所依赖的这些jar包中，有一个比较大的区别就是**有的依赖前面有箭头`>`,有的依赖前面没有。**

那么这个箭头所代表的含义是什么?

打开前面的箭头，你会发现这个jar包下面还包含有其他的jar包

![1630819455928](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041843362.png)

你会发现有两个`maven_03_pojo`的依赖被加载到Dependencies中，那么`maven_04_dao`中的`maven_03_pojo`能不能使用呢?

要想验证非常简单，只需要把`maven_02_ssm`项目中pom.xml关于`maven_03_pojo`的依赖注释或删除掉

![1630819768305](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041843090.png)

在Dependencies中移除自己所添加`maven_03_pojo`依赖后，打开BookServiceImpl的类，你会发现Book类依然存在，可以被正常使用

![1630819826163](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041843694.png)

这个特性其实就是我们要讲解的==依赖传递==。

依赖是具有传递性的:

- 路径优先：当依赖中出现先沟通的资源时，层级越深，优先级越低，层级越浅，优先级越高
- 声明优先：当资源在相同层级被依赖时，配置顺序靠前的覆盖配置顺序靠后的
- 特殊优先：当同级配置了相同资源的不同版本，后配置的覆盖先配置的

![1630853726532](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041843283.png)

**说明:**A代表自己的项目；B,C,D,E,F,G代表的是项目所依赖的jar包；D1和D2 E1和E2代表是相同jar包的不同版本

(1) A依赖了B和C,B和C有分别依赖了其他jar包，所以在A项目中就可以使用上面所有jar包，这就是所说的依赖传递

(2) 依赖传递有直接依赖和间接依赖

* 相对于A来说，A直接依赖B和C,间接依赖了D1,E1,G，F,D2和E2
* 相对于B来说，B直接依赖了D1和E1,间接依赖了G
* 直接依赖和间接依赖是一个相对的概念

(3)因为有依赖传递的存在，就会导致jar包在依赖的过程中出现冲突问题，具体什么是冲突?Maven是如何解决冲突的?

这里所说的==依赖冲突==是指项目依赖的某一个jar包，有多个不同的版本，因而造成类包版本冲突。

情况一: 在`maven_02_ssm`的pom.xml中添加两个不同版本的Junit依赖:

```xml
<dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>

    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>
</dependencies>
```

![1630820964663](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041843934.png)

通过对比，会发现一个结论

* 特殊优先：当同级配置了相同资源的不同版本，后配置的覆盖先配置的。

情况二: 路径优先：当依赖中出现相同的资源时，层级越深，优先级越低，层级越浅，优先级越高

* A通过B间接依赖到E1
* A通过C间接依赖到E2
* A就会间接依赖到E1和E2,Maven会按照层级来选择，E1是2度，E2是3度，所以最终会选择E1

情况三: 声明优先：当资源在相同层级被依赖时，配置顺序靠前的覆盖配置顺序靠后的

* A通过B间接依赖到D1
* A通过C间接依赖到D2
* D1和D2都是两度，这个时候就不能按照层级来选择，需要按照声明来，谁先声明用谁，也就是说B在C之前声明，这个时候使用的是D1，反之则为D2

但是对应上面这些结果，大家不需要刻意去记它。因为不管Maven怎么选，最终的结果都会在Maven的`Dependencies`面板中展示出来，展示的是哪个版本，也就是说它选择的就是哪个版本，如:

![1630853443920](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041843103.png)

如果想更全面的查看Maven中各个坐标的依赖关系，可以点击Maven面板中的`show Dependencies`

![1630853519736](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041843725.png)

在这个视图中就能很明显的展示出jar包之间的相互依赖关系。

### 2.2.2 可选依赖和排除依赖

依赖传递介绍完以后，我们来思考一个问题，

![1630854436435](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041843770.png)

* maven_02_ssm 依赖了 maven_04_dao
* maven_04_dao 依赖了 maven_03_pojo
* 因为现在有依赖传递，所以maven_02_ssm能够使用到maven_03_pojo的内容
* 如果说现在不想让maven_02_ssm依赖到maven_03_pojo，有哪些解决方案?

**说明:**在真实使用的过程中，maven_02_ssm中是需要用到maven_03_pojo的，我们这里只是用这个例子描述我们的需求。因为有时候，maven_04_dao出于某些因素的考虑，就是不想让别人使用自己所依赖的maven_03_pojo。

#### 方案一:可选依赖

* 可选依赖指对外隐藏当前所依赖的资源---不透明

在`maven_04_dao`的pom.xml,在引入`maven_03_pojo`的时候，添加`optional`

```xml
<dependency>
    <groupId>com.itheima</groupId>
    <artifactId>maven_03_pojo</artifactId>
    <version>1.0-SNAPSHOT</version>
    <!--可选依赖是隐藏当前工程所依赖的资源，隐藏后对应资源将不具有依赖传递-->
    <optional>true</optional>
</dependency>
```

此时BookServiceImpl就已经报错了,说明由于maven_04_dao将maven_03_pojo设置成可选依赖，导致maven_02_ssm无法引用到maven_03_pojo中的内容，导致Book类找不到。

![1630854923484](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041843146.png)

#### 方案二:排除依赖

* 排除依赖指主动断开依赖的资源，被排除的资源无需指定版本---不需要

前面我们已经通过可选依赖实现了阻断maven_03_pojo的依赖传递，对于排除依赖，则指的是已经有依赖的事实，也就是说maven_02_ssm项目中已经通过依赖传递用到了maven_03_pojo，此时我们需要做的是将其进行排除，所以接下来需要修改maven_02_ssm的pom.xml

```xml
<dependency>
    <groupId>com.itheima</groupId>
    <artifactId>maven_04_dao</artifactId>
    <version>1.0-SNAPSHOT</version>
    <!--排除依赖是隐藏当前资源对应的依赖关系-->
    <exclusions>
        <exclusion>
            <groupId>com.itheima</groupId>
            <artifactId>maven_03_pojo</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

这样操作后，BookServiceImpl中的Book类一样也会报错。

当然`exclusions`标签带`s`说明我们是可以依次排除多个依赖到的jar包，比如maven_04_dao中有依赖junit和mybatis,我们也可以一并将其排除。

```xml
<dependency>
    <groupId>com.itheima</groupId>
    <artifactId>maven_04_dao</artifactId>
    <version>1.0-SNAPSHOT</version>
    <!--排除依赖是隐藏当前资源对应的依赖关系-->
    <exclusions>
        <exclusion>
            <groupId>com.itheima</groupId>
            <artifactId>maven_03_pojo</artifactId>
        </exclusion>
        <exclusion>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
        </exclusion>
        <exclusion>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

介绍我这两种方式后，简单来梳理下，就是

* `A依赖B,B依赖C`,`C`通过依赖传递会被`A`使用到，现在要想办法让`A`不去依赖`C`
* 可选依赖是在B上设置`<optional>`,`A`不知道有`C`的存在，
* 排除依赖是在A上设置`<exclusions>`,`A`知道有`C`的存在，主动将其排除掉。

## 2.3 聚合和继承

我们的项目已经从以前的单模块，变成了现在的多模块开发。项目一旦变成了多模块开发以后，就会引发一些问题，在这一节中我们主要会学习两个内容`聚合`和`继承`，用这两个知识来解决下分模块后的一些问题。

### 2.3.1 聚合

![1630858596147](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041844475.png)

* 分模块开发后，需要将这四个项目都安装到本地仓库，目前我们只能通过项目Maven面板的`install`来安装，并且需要安装四个，如果我们的项目足够多，那么一个个安装起来还是比较麻烦的
* 如果四个项目都已经安装成功，当ssm_pojo发生变化后，我们就得将ssm_pojo重新安装到maven仓库，但是为了确保我们对ssm_pojo的修改不会影响到其他项目模块，我们需要对所有的模块进行重新编译，那又需要将所有的模块再来一遍

项目少的话还好，但是如果项目多的话，一个个操作项目就容易出现漏掉或重复操作的问题，所以我们就想能不能抽取一个项目，把所有的项目管理起来，以后我们要想操作这些项目，只需要操作这一个项目，其他所有的项目都走一样的流程，这个不就很省事省力。

这就用到了我们接下来要讲解的==聚合==，

* 所谓聚合:将多个模块组织成一个整体，同时进行项目构建的过程称为聚合
* 聚合工程：通常是一个不具有业务功能的"空"工程（有且仅有一个pom文件）
* 作用：使用聚合工程可以将多个工程编组，通过对聚合工程进行构建，实现对所包含的模块进行同步构建
  * 当工程中某个模块发生更新（变更）时，必须保障工程中与已更新模块关联的模块同步更新，此时可以使用聚合工程来解决批量模块同步构建的问题。

关于聚合具体的实现步骤为:

#### 步骤1:创建一个空的maven项目

![1630859532119](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041844107.png)

#### 步骤2:将项目的打包方式改为pom

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.itheima</groupId>
    <artifactId>maven_01_parent</artifactId>
    <version>1.0-RELEASE</version>
    <packaging>pom</packaging>
    
</project>
```

**说明:**项目的打包方式，我们接触到的有三种，分别是

* jar:默认情况，说明该项目为java项目
* war:说明该项目为web项目
* pom:说明该项目为聚合或继承(后面会讲)项目

#### 步骤3:pom.xml添加所要管理的项目

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.itheima</groupId>
    <artifactId>maven_01_parent</artifactId>
    <version>1.0-RELEASE</version>
    <packaging>pom</packaging>
    
    <!--设置管理的模块名称-->
    <modules>
        <module>../maven_02_ssm</module>
        <module>../maven_03_pojo</module>
        <module>../maven_04_dao</module>
    </modules>
</project>
```

#### 步骤4:使用聚合统一管理项目

![1630859797123](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041844423.png)

测试发现，当`maven_01_parent`的`compile`被点击后，所有被其管理的项目都会被执行编译操作。这就是聚合工程的作用。

**说明：**聚合工程管理的项目在进行运行的时候，会按照项目与项目之间的依赖关系来自动决定执行的顺序和配置的顺序无关。

聚合的知识我们就讲解完了，最后总结一句话就是，**聚合工程主要是用来管理项目**。

### 2.3.2 继承

我们已经完成了使用聚合工程去管理项目，聚合工程进行某一个构建操作，其他被其管理的项目也会执行相同的构建操作。那么接下来，我们再来分析下，多模块开发存在的另外一个问题，`重复配置`的问题，我们先来看张图:

![1630860344968](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041844442.png)

* `spring-webmvc`、`spring-jdbc`在三个项目模块中都有出现，这样就出现了重复的内容
* `spring-test`只在ssm_crm和ssm_goods中出现，而在ssm_order中没有，这里是部分重复的内容
* 我们使用的spring版本目前是`5.2.10.RELEASE`,假如后期要想升级spring版本，所有跟Spring相关jar包都得被修改，涉及到的项目越多，维护成本越高

面对上面的这些问题，我们就得用到接下来要学习的==继承==

* 所谓继承:描述的是两个工程间的关系，与java中的继承相似，子工程可以继承父工程中的配置信息，常见于依赖关系的继承。
* 作用：
  - 简化配置
  - 减少版本冲突

接下来，我们到程序中去看看继承该如何实现?

#### 步骤1:创建一个空的Maven项目并将其打包方式设置为pom

因为这一步和前面maven创建聚合工程的方式是一摸一样，所以我们可以单独创建一个新的工程，也可以直接和聚合公用一个工程。实际开发中，聚合和继承一般也都放在同一个项目中，但是这两个的功能是不一样的。

#### 步骤2:在子项目中设置其父工程

分别在`maven_02_ssm`,`maven_03_pojo`,`maven_04_dao`的pom.xml中添加其父项目为`maven_01_parent`

```xml
<!--配置当前工程继承自parent工程-->
<parent>
    <groupId>com.itheima</groupId>
    <artifactId>maven_01_parent</artifactId>
    <version>1.0-RELEASE</version>
    <!--设置父项目pom.xml位置路径-->
    <relativePath>../maven_01_parent/pom.xml</relativePath>
</parent>
```

#### 步骤3:优化子项目共有依赖导入问题

1. 将子项目共同使用的jar包都抽取出来，维护在父项目的pom.xml中

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.itheima</groupId>
    <artifactId>maven_01_parent</artifactId>
    <version>1.0-RELEASE</version>
    <packaging>pom</packaging>
    
    <!--设置管理的模块名称-->
    <modules>
        <module>../maven_02_ssm</module>
        <module>../maven_03_pojo</module>
        <module>../maven_04_dao</module>
    </modules>
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>5.2.10.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.2.10.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>5.2.10.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.2.10.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.6</version>
        </dependency>

        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>1.3.0</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
        </dependency>

        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.16</version>
        </dependency>

        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.9.0</version>
        </dependency>
    </dependencies>
</project>
```

2. 删除子项目中已经被抽取到父项目的pom.xml中的jar包，如在`maven_02_ssm`的pom.xml中将已经出现在父项目的jar包删除掉

```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.itheima</groupId>
  <artifactId>maven_02_ssm</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>war</packaging>

  <!--配置当前工程继承自parent工程-->
  <parent>
    <groupId>com.itheima</groupId>
    <artifactId>maven_01_parent</artifactId>
    <version>1.0-RELEASE</version>
    <relativePath>../maven_01_parent/pom.xml</relativePath>
  </parent>
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>

    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>

    <dependency>
      <groupId>com.itheima</groupId>
      <artifactId>maven_04_dao</artifactId>
      <version>1.0-SNAPSHOT</version>
      <!--排除依赖是隐藏当前资源对应的依赖关系-->
      <exclusions>
        <exclusion>
          <groupId>log4j</groupId>
          <artifactId>log4j</artifactId>
        </exclusion>
        <exclusion>
          <groupId>org.mybatis</groupId>
          <artifactId>mybatis</artifactId>
        </exclusion>
      </exclusions>
    </dependency>

  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat7-maven-plugin</artifactId>
        <version>2.1</version>
        <configuration>
          <port>80</port>
          <path>/</path>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>


```

删除完后，你会发现父项目中有依赖对应的jar包，子项目虽然已经将重复的依赖删除掉了，但是刷新的时候，子项目中所需要的jar包依然存在。

当项目的`<parent>`标签被移除掉，会发现多出来的jar包依赖也会随之消失。

3. 将`maven_04_dao`项目的pom.xml中的所有依赖删除，然后添加上`maven_01_parent`的父项目坐标

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.itheima</groupId>
    <artifactId>maven_04_dao</artifactId>
    <version>1.0-SNAPSHOT</version>

    <!--配置当前工程继承自parent工程-->
    <parent>
        <groupId>com.itheima</groupId>
        <artifactId>maven_01_parent</artifactId>
        <version>1.0-RELEASE</version>
        <relativePath>../maven_01_parent/pom.xml</relativePath>
    </parent>
</project>
```

刷新并查看Maven的面板，会发现maven_04_dao同样引入了父项目中的所有依赖。

![1630862406709](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041844170.png)

这样我们就可以解决刚才提到的第一个问题，将子项目中的公共jar包抽取到父工程中进行统一添加依赖，这样做的可以简化配置，并且当父工程中所依赖的jar包版本发生变化，所有子项目中对应的jar包版本也会跟着更新。

![1630943390187](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041844844.png)

#### 步骤4:优化子项目依赖版本问题

如果把所有用到的jar包都管理在父项目的pom.xml，看上去更简单些，但是这样就会导致有很多项目引入了过多自己不需要的jar包。如上面看到的这张图:

![](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041845722.png)

如果把所有的依赖都放在了父工程中进行统一维护，就会导致ssm_order项目中多引入了`spring-test`的jar包，如果这样的jar包过多的话，对于ssm_order来说也是一种"负担"。

那针对于这种部分项目有的jar包，我们该如何管理优化呢?

1. 在父工程mavne_01_parent的pom.xml来定义依赖管理

```xml
<!--定义依赖管理-->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

2. 将maven_02_ssm的pom.xml中的junit依赖删除掉，刷新Maven

![1630944335419](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041845134.png)

刷新完会发现，在maven_02_ssm项目中的junit依赖并没有出现，所以我们得到一个结论:

==`<dependencyManagement>`标签不真正引入jar包，而是配置可供子项目选择的jar包依赖==

子项目要想使用它所提供的这些jar包，需要自己添加依赖，并且不需要指定`<version>`

3. 在maven_02_ssm的pom.xml添加junit的依赖

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <scope>test</scope>
</dependency>
```

**注意：这里就不需要添加版本了，这样做的好处就是当父工程dependencyManagement标签中的版本发生变化后，子项目中的依赖版本也会跟着发生变化**

4. 在maven_04_dao的pom.xml添加junit的依赖

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <scope>test</scope>
</dependency>
```

这个时候，maven_02_ssm和maven_04_dao这两个项目中的junit版本就会跟随着父项目中的标签dependencyManagement中junit的版本发生变化而变化。不需要junit的项目就不需要添加对应的依赖即可。

至此继承就已经学习完了，总结来说，继承可以帮助做两件事

* 将所有项目公共的jar包依赖提取到父工程的pom.xml中，子项目就可以不用重复编写，简化开发
* 将所有项目的jar包配置到父工程的dependencyManagement标签下，实现版本管理，方便维护
  * ==dependencyManagement标签不真正引入jar包，只是管理jar包的版本==
  * 子项目在引入的时候，只需要指定groupId和artifactId，不需要加version
  * 当dependencyManagement标签中jar包版本发生变化，所有子项目中有用到该jar包的地方对应的版本会自动随之更新

最后总结一句话就是，**父工程主要是用来快速配置依赖jar包和管理项目中所使用的资源**。

**小结**

继承的实现步骤:

* 创建Maven模块，设置打包类型为pom

  ```xml
  <packaging>pom</packaging>
  ```

* 在父工程的pom文件中配置依赖关系(子工程将沿用父工程中的依赖关系),一般只抽取子项目中公有的jar包

  ```xml
  <dependencies>
      <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-webmvc</artifactId>
          <version>5.2.10.RELEASE</version>
      </dependency>
      ...
  </dependencies>
  ```

* 在父工程中配置子工程中可选的依赖关系

  ```xml
  <dependencyManagement>
      <dependencies>
          <dependency>
              <groupId>com.alibaba</groupId>
              <artifactId>druid</artifactId>
              <version>1.1.16</version>
          </dependency>
      </dependencies>
      ...
  </dependencyManagement>
  ```

* 在子工程中配置当前工程所继承的父工程

  ```xml
  <!--定义该工程的父工程-->
  <parent>
      <groupId>com.itheima</groupId>
      <artifactId>maven_01_parent</artifactId>
      <version>1.0-RELEASE</version>
      <!--填写父工程的pom文件,可以不写-->
      <relativePath>../maven_01_parent/pom.xml</relativePath>
  </parent>
  ```

* 在子工程中配置使用父工程中可选依赖的坐标

  ```xml
  <dependencies>
      <dependency>
          <groupId>com.alibaba</groupId>
          <artifactId>druid</artifactId>
      </dependency>
  </dependencies>
  ```

  注意事项:

  1.子工程中使用父工程中的可选依赖时，仅需要提供群组id和项目id，无需提供版本，版本由父工程统一提供，避免版本冲突

  2.子工程中还可以定义父工程中没有定义的依赖关系,只不过不能被父工程进行版本统一管理。

### 2.3.3 聚合与继承的区别

#### 1 聚合与继承的区别

两种之间的作用:

* 聚合用于快速构建项目，对项目进行管理
* 继承用于快速配置和管理子项目中所使用jar包的版本

聚合和继承的相同点:

* 聚合与继承的pom.xml文件打包方式均为pom，可以将两种关系制作到同一个pom文件中
* 聚合与继承均属于设计型模块，并无实际的模块内容

聚合和继承的不同点:

* 聚合是在当前模块中配置关系，聚合可以感知到参与聚合的模块有哪些
* 继承是在子模块中配置关系，父模块无法感知哪些子模块继承了自己

相信到这里，大家已经能区分开什么是聚合和继承，但是有一个稍微麻烦的地方就是聚合和继承的工程构建，需要在聚合项目中手动添加`modules`标签，需要在所有的子项目中添加`parent`标签，万一写错了咋办?

#### 2 IDEA构建聚合与继承工程

其实对于聚合和继承工程的创建，IDEA已经能帮助我们快速构建，具体的实现步骤为:

##### 步骤1:创建一个Maven项目

创建一个空的Maven项目，可以将项目中的`src`目录删除掉，这个项目作为聚合工程和父工程。

![1630946592924](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041845670.png)

##### 步骤2:创建子项目

该项目可以被聚合工程管理，同时会继承父工程。

![1630947082716](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041845549.png)

创建成功后，maven_parent即是聚合工程又是父工程，maven_web中也有parent标签，继承的就是maven_parent,对于难以配置的内容都自动生成。

按照上面这种方式，大家就可以根据自己的需要来构建分模块项目。

## 2.4 属性

在这一章节内容中，我们将学习两个内容，分别是

* 属性
* 版本管理

属性中会继续解决分模块开发项目存在的问题，版本管理主要是认识下当前主流的版本定义方式。

### 2.4.1 属性

#### 1 问题分析

讲解内容之前，我们还是先来分析问题:

前面我们已经在父工程中的dependencyManagement标签中对项目中所使用的jar包版本进行了统一的管理，但是如果在标签中有如下的内容:

![1630947403475](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041845663.png)

你会发现，如果我们现在想更新Spring的版本，你会发现我们依然需要更新多个jar包的版本，这样的话还是有可能出现漏改导致程序出问题，而且改起来也是比较麻烦。

问题清楚后，我们需要解决的话，就可以参考咱们java基础所学习的变量，声明一个变量，在其他地方使用该变量，当变量的值发生变化后，所有使用变量的地方，就会跟着修改，即:

![1630947749661](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041845019.png)

#### 2 解决步骤

##### 步骤1:父工程中定义属性

```xml
<properties>
    <spring.version>5.2.10.RELEASE</spring.version>
    <junit.version>4.12</junit.version>
    <mybatis-spring.version>1.3.0</mybatis-spring.version>
</properties>
```

##### 步骤2:修改依赖的version

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>${spring.version}</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>${spring.version}</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>${spring.version}</version>
</dependency>
```

此时，我们只需要更新父工程中properties标签中所维护的jar包版本，所有子项目中的版本也就跟着更新。当然除了将spring相关版本进行维护，我们可以将其他的jar包版本也进行抽取，这样就可以对项目中所有jar包的版本进行统一维护，如:

```xml
<!--定义属性-->
<properties>
    <spring.version>5.2.10.RELEASE</spring.version>
    <junit.version>4.12</junit.version>
    <mybatis-spring.version>1.3.0</mybatis-spring.version>
</properties>
```

### 2.4.2 配置文件加载属性

Maven中的属性我们已经介绍过了，现在也已经能够通过Maven来集中管理Maven中依赖jar包的版本。但是又有新的需求，就是想让Maven对于属性的管理范围能更大些，比如我们之前项目中的`jdbc.properties`，这个配置文件中的属性，能不能也来让Maven进行管理呢?

答案是肯定的，具体的实现步骤为:

##### 步骤1:父工程定义属性

```xml
<properties>
   <jdbc.url>jdbc:mysql://127.1.1.1:3306/ssm_db</jdbc.url>
</properties>
```

##### 步骤2:jdbc.properties文件中引用属性

在jdbc.properties，将jdbc.url的值直接获取Maven配置的属性

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=${jdbc.url}
jdbc.username=root
jdbc.password=root
```

##### 步骤3:设置maven过滤文件范围

Maven在默认情况下是从当前项目的`src\main\resources`下读取文件进行打包。现在我们需要打包的资源文件是在maven_02_ssm下,需要我们通过配置来指定下具体的资源目录。

```xml
<build>
    <resources>
        <!--设置资源目录-->
        <resource>
            <directory>../maven_02_ssm/src/main/resources</directory>
            <!--设置能够解析${}，默认是false -->
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
```

**说明:**directory路径前要添加`../`的原因是maven_02_ssm相对于父工程的pom.xml路径是在其上一层的目录中，所以需要添加。

修改完后，注意maven_02_ssm项目的resources目录就多了些东西，如下:

![1630977419627](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041845199.png)



##### 步骤4:测试是否生效

测试的时候，只需要将maven_02_ssm项目进行打包，然后观察打包结果中最终生成的内容是否为Maven中配置的内容。

![1630977885030](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041846373.png)

上面的属性管理就已经完成，但是有一个问题没有解决，因为不只是maven_02_ssm项目需要有属性被父工程管理，如果有多个项目需要配置，该如何实现呢?

方式一:

```xml
<build>
    <resources>
        <!--设置资源目录，并设置能够解析${}-->
        <resource>
            <directory>../maven_02_ssm/src/main/resources</directory>
            <filtering>true</filtering>
        </resource>
        <resource>
            <directory>../maven_03_pojo/src/main/resources</directory>
            <filtering>true</filtering>
        </resource>
        ...
    </resources>
</build>
```

可以配，但是如果项目够多的话，这个配置也是比较繁琐

方式二:

```xml
<build>
    <resources>
        <!--
			${project.basedir}: 当前项目所在目录,子项目继承了父项目，
			相当于所有的子项目都添加了资源目录的过滤
		-->
        <resource>
            <directory>${project.basedir}/src/main/resources</directory>
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
```

**说明:**打包的过程中如果报如下错误:

![1630948929828](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041846202.png)

原因就是Maven发现你的项目为web项目，就会去找web项目的入口web.xml[配置文件配置的方式]，发现没有找到，就会报错。

解决方案1：在maven_02_ssm项目的`src\main\webapp\WEB-INF\`添加一个web.xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">
</web-app>
```

解决方案2: 配置maven打包war时，忽略web.xml检查

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>3.2.3</version>
            <configuration>
                <failOnMissingWebXml>false</failOnMissingWebXml>
            </configuration>
        </plugin>
    </plugins>
</build>
```

上面我们所使用的都是Maven的自定义属性，除了${project.basedir},它属于Maven的内置系统属性。

在Maven中的属性分为:

- 自定义属性（常用）
- 内置属性
- Setting属性
- Java系统属性
- 环境变量属性

![1630981519370](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041846101.png)

具体如何查看这些属性:

在cmd命令行中输入`mvn help:system`

![1630981585748](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041849167.png)

具体使用，就是使用 `${key}`来获取，key为等号左边的，值为等号右边的，比如获取红线的值，对应的写法为 `${java.runtime.name}`。

### 2.4.3 版本管理

关于这个版本管理解决的问题是，在Maven创建项目和引用别人项目的时候，我们都看到过如下内容:

![1630982018031](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041849777.png)

这里面有两个单词，SNAPSHOT和RELEASE，它们所代表的含义是什么呢?

我们打开Maven仓库地址`https://mvnrepository.com/`

![1630983148662](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041849412.png)

在我们jar包的版本定义中，有两个工程版本用的比较多:

- SNAPSHOT（快照版本）
  - 项目开发过程中临时输出的版本，称为快照版本
  - 快照版本会随着开发的进展不断更新
- RELEASE（发布版本）
  - 项目开发到一定阶段里程碑后，向团队外部发布较为稳定的版本，这种版本所对应的构件文件是稳定的
  - 即便进行功能的后续开发，也不会改变当前发布版本内容，这种版本称为发布版本

除了上面的工程版本，我们还经常能看到一些发布版本:

* alpha版:内测版，bug多不稳定内部版本不断添加新功能
* beta版:公测版，不稳定(比alpha稳定些)，bug相对较多不断添加新功能
* 纯数字版

对于这些版本，大家只需要简单认识下即可。

## 2.5 多环境配置与应用

这一节中，我们会讲两个内容，分别是`多环境开发`和`跳过测试`

### 2.5.1 多环境开发

![1630983617755](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850227.png)

* 我们平常都是在自己的开发环境进行开发，
* 当开发完成后，需要把开发的功能部署到测试环境供测试人员进行测试使用，
* 等测试人员测试通过后，我们会将项目部署到生成环境上线使用。
* 这个时候就有一个问题是，不同环境的配置是不相同的，如不可能让三个环境都用一个数据库，所以就会有三个数据库的url配置，
* 我们在项目中如何配置?
* 要想实现不同环境之间的配置切换又该如何来实现呢?

maven提供配置多种环境的设定，帮助开发者在使用过程中快速切换环境。具体实现步骤:

#### 步骤1:父工程配置多个环境,并指定默认激活环境

```xml
<profiles>
    <!--开发环境-->
    <profile>
        <id>env_dep</id>
        <properties>
            <jdbc.url>jdbc:mysql://127.1.1.1:3306/ssm_db</jdbc.url>
        </properties>
        <!--设定是否为默认启动环境-->
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
    </profile>
    <!--生产环境-->
    <profile>
        <id>env_pro</id>
        <properties>
            <jdbc.url>jdbc:mysql://127.2.2.2:3306/ssm_db</jdbc.url>
        </properties>
    </profile>
    <!--测试环境-->
    <profile>
        <id>env_test</id>
        <properties>
            <jdbc.url>jdbc:mysql://127.3.3.3:3306/ssm_db</jdbc.url>
        </properties>
    </profile>
</profiles>
```

#### 步骤2:执行安装查看env_dep环境是否生效

![1630983967960](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850098.png)

查看到的结果为:

![](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850322.png)

#### 步骤3:切换默认环境为生产环境

```xml
<profiles>
    <!--开发环境-->
    <profile>
        <id>env_dep</id>
        <properties>
            <jdbc.url>jdbc:mysql://127.1.1.1:3306/ssm_db</jdbc.url>
        </properties>
    </profile>
    <!--生产环境-->
    <profile>
        <id>env_pro</id>
        <properties>
            <jdbc.url>jdbc:mysql://127.2.2.2:3306/ssm_db</jdbc.url>
        </properties>
        <!--设定是否为默认启动环境-->
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
    </profile>
    <!--测试环境-->
    <profile>
        <id>env_test</id>
        <properties>
            <jdbc.url>jdbc:mysql://127.3.3.3:3306/ssm_db</jdbc.url>
        </properties>
    </profile>
</profiles>
```

#### 步骤4:执行安装并查看env_pro环境是否生效

查看到的结果为`jdbc:mysql://127.2.2.2:3306/ssm_db`

![](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850649.png)

虽然已经能够实现不同环境的切换，但是每次切换都是需要手动修改，如何来实现在不改变代码的前提下完成环境的切换呢?

#### 步骤5:命令行实现环境切换

![1630984476202](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850321.png)

#### 步骤6:执行安装并查看env_test环境是否生效

查看到的结果为`jdbc:mysql://127.3.3.3:3306/ssm_db`

![](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850959.png)

所以总结来说，对于多环境切换只需要两步即可:

* 父工程中定义多环境

  ```xml
  <profiles>
  	<profile>
      	<id>环境名称</id>
          <properties>
          	<key>value</key>
          </properties>
          <activation>
          	<activeByDefault>true</activeByDefault>
          </activation>
      </profile>
      ...
  </profiles>
  ```

* 使用多环境(构建过程)

  ```
  mvn 指令 -P 环境定义ID[环境定义中获取]
  ```

### 2.5.2 跳过测试

前面在执行`install`指令的时候，Maven都会按照顺序从上往下依次执行，每次都会执行`test`,

对于`test`来说有它存在的意义，

* 可以确保每次打包或者安装的时候，程序的正确性，假如测试已经通过在我们没有修改程序的前提下再次执行打包或安装命令，由于顺序执行，测试会被再次执行，就有点耗费时间了。
* 功能开发过程中有部分模块还没有开发完毕，测试无法通过，但是想要把其中某一部分进行快速打包，此时由于测试环境失败就会导致打包失败。

遇到上面这些情况的时候，我们就想跳过测试执行下面的构建命令，具体实现方式有很多：

#### 方式一:IDEA工具实现跳过测试

![1630985300814](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850279.png)

图中的按钮为`Toggle 'Skip Tests' Mode`,

Toggle翻译为切换的意思，也就是说在测试与不测试之间进行切换。

点击一下，出现测试画横线的图片，如下:

![1630985411766](F:\study\graduate\java\SSM\课程笔记\基础框架8笔记\Maven高级笔记\assets\1630985411766.png)

说明测试已经被关闭，再次点击就会恢复。

这种方式最简单，但是有点"暴力"，会把所有的测试都跳过，如果我们想更精细的控制哪些跳过哪些不跳过，就需要使用配置插件的方式。

#### 方式二:配置插件实现跳过测试

在父工程中的pom.xml中添加测试插件配置

```xml
<build>
    <plugins>
        <plugin>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.12.4</version>
            <configuration>
                <skipTests>false</skipTests>
                <!--排除掉不参与测试的内容-->
                <excludes>
                    <exclude>**/BookServiceTest.java</exclude>
                </excludes>
            </configuration>
        </plugin>
    </plugins>
</build>
```

skipTests:如果为true，则跳过所有测试，如果为false，则不跳过测试

excludes：哪些测试类不参与测试，即排除，针对skipTests为false来设置的

includes: 哪些测试类要参与测试，即包含,针对skipTests为true来设置的

#### 方式三:命令行跳过测试

![1630986926124](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850776.png)

使用Maven的命令行，`mvn 指令 -D skipTests`

注意事项:

* 执行的项目构建指令必须包含测试生命周期，否则无效果。例如执行compile生命周期，不经过test生命周期。
* 该命令可以不借助IDEA，直接使用cmd命令行进行跳过测试，需要注意的是cmd要在pom.xml所在目录下进行执行。

## 2.6 私服

这一节，我们主要学习的内容是:

* 私服简介
* 私服仓库分类
* 资源上传与下载

首先来说一说什么是私服?

### 2.6.1 私服简介

团队开发现状分析

![1630987192620](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850918.png)

(1)张三负责ssm_crm的开发，自己写了一个ssm_pojo模块，要想使用直接将ssm_pojo安装到本地仓库即可

(2)李四负责ssm_order的开发，需要用到张三所写的ssm_pojo模块，这个时候如何将张三写的ssm_pojo模块交给李四呢?

(3)如果直接拷贝，那么团队之间的jar包管理会非常混乱而且容器出错，这个时候我们就想能不能将写好的项目上传到中央仓库，谁想用就直接联网下载即可

(4)Maven的中央仓库不允许私人上传自己的jar包,那么我们就得换种思路，自己搭建一个类似于中央仓库的东西，把自己的内容上传上去，其他人就可以从上面下载jar包使用

(5)这个类似于中央仓库的东西就是我们接下来要学习的==私服==

所以到这就有两个概念，一个是私服，一个是中央仓库

私服:公司内部搭建的用于存储Maven资源的服务器

远程仓库:Maven开发团队维护的用于存储Maven资源的服务器

所以说:

* 私服是一台独立的服务器，用于解决团队内部的资源共享与资源同步问题

搭建Maven私服的方式有很多，我们来介绍其中一种使用量比较大的实现方式:

* Nexus
  * Sonatype公司的一款maven私服产品
  * 下载地址：https://help.sonatype.com/repomanager3/download

### 2.6.2 私服安装

#### 步骤1:下载解压

将`资料\latest-win64.zip`解压到一个空目录下。

![1630988572349](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850612.png)

#### 步骤2:启动Nexus

![1630988673245](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850124.png)

使用cmd进入到解压目录下的`nexus-3.30.1-01\bin`,执行如下命令:

```
nexus.exe /run nexus
```

看到如下内容，说明启动成功。

![1630988939301](F:\study\graduate\java\SSM\课程笔记\基础框架8笔记\Maven高级笔记\assets\1630988939301.png)

#### 步骤3:浏览器访问

访问地址为:

```
http://localhost:8081
```

![1630988857125](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850831.png)

#### 步骤4:首次登录重置密码

![1630988983159](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850358.png)

输入用户名和密码进行登录，登录成功后，出现如下页面

![1630989052183](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850753.png)

点击下一步，需要重新输入新密码，为了和后面的保持一致，密码修改为`admin`

![1630989094756](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850301.png)

设置是否运行匿名访问

![1630989122737](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850709.png)

点击完成

![1630989136097](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850194.png)

至此私服就已经安装成功。如果要想修改一些基础配置信息，可以使用:

- 修改基础配置信息
  - 安装路径下etc目录中nexus-default.properties文件保存有nexus基础配置信息，例如默认访问端口。
- 修改服务器运行配置信息
  - 安装路径下bin目录中nexus.vmoptions文件保存有nexus服务器启动对应的配置信息，例如默认占用内存空间。

### 2.6.3 私服仓库分类

私服资源操作流程分析:

![1630989320979](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850753.png)

(1)在没有私服的情况下，我们自己创建的服务都是安装在Maven的本地仓库中

(2)私服中也有仓库，我们要把自己的资源上传到私服，最终也是放在私服的仓库中

(3)其他人要想使用你所上传的资源，就需要从私服的仓库中获取

(4)当我们要使用的资源不是自己写的，是远程中央仓库有的第三方jar包，这个时候就需要从远程中央仓库下载，每个开发者都去远程中央仓库下速度比较慢(中央仓库服务器在国外)

(5)私服就再准备一个仓库，用来专门存储从远程中央仓库下载的第三方jar包，第一次访问没有就会去远程中央仓库下载，下次再访问就直接走私服下载

(6)前面在介绍版本管理的时候提到过有`SNAPSHOT`和`RELEASE`，如果把这两类的都放到同一个仓库，比较混乱，所以私服就把这两个种jar包放入不同的仓库

(7)上面我们已经介绍了有三种仓库，一种是存放`SNAPSHOT`的，一种是存放`RELEASE`还有一种是存放从远程仓库下载的第三方jar包，那么我们在获取资源的时候要从哪个仓库种获取呢?

(8)为了方便获取，我们将所有的仓库编成一个组，我们只需要访问仓库组去获取资源。

所有私服仓库总共分为三大类:

宿主仓库hosted 

- 保存无法从中央仓库获取的资源
  - 自主研发
  - 第三方非开源项目,比如Oracle,因为是付费产品，所以中央仓库没有

代理仓库proxy 

- 代理远程仓库，通过nexus访问其他公共仓库，例如中央仓库

仓库组group 

- 将若干个仓库组成一个群组，简化配置
- 仓库组不能保存资源，属于设计型仓库

![1630990244010](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850351.png)

### 2.6.4 本地仓库访问私服配置

* 我们通过IDEA将开发的模块上传到私服，中间是要经过本地Maven的
* 本地Maven需要知道私服的访问地址以及私服访问的用户名和密码
* 私服中的仓库很多，Maven最终要把资源上传到哪个仓库?
* Maven下载的时候，又需要携带用户名和密码到私服上找对应的仓库组进行下载，然后再给IDEA

![1630990538229](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850877.png)

上面所说的这些内容，我们需要在本地Maven的配置文件`settings.xml`中进行配置。

#### 步骤1:私服上配置仓库

![1630991211000](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850244.png)

**说明:**

第5，6步骤是创建itheima-snapshot仓库

第7，8步骤是创建itheima-release仓库

#### 步骤2:配置本地Maven对私服的访问权限

```xml
<servers>
    <server>
        <id>itheima-snapshot</id>
        <username>admin</username>
        <password>admin</password>
    </server>
    <server>
        <id>itheima-release</id>
        <username>admin</username>
        <password>admin</password>
    </server>
</servers>
```

#### 步骤3:配置私服的访问路径

```xml
<mirrors>
    <mirror>
        <!--配置仓库组的ID-->
        <id>maven-public</id>
        <!--*代表所有内容都从私服获取-->
        <mirrorOf>*</mirrorOf>
        <!--私服仓库组maven-public的访问路径-->
        <url>http://localhost:8081/repository/maven-public/</url>
    </mirror>
</mirrors>
```

为了避免阿里云Maven私服地址的影响，建议先将之前配置的阿里云Maven私服镜像地址注释掉，等练习完后，再将其恢复。

![1630991535107](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850374.png)

至此本地仓库就能与私服进行交互了。

### 2.6.5 私服资源上传与下载

本地仓库与私服已经建立了连接，接下来我们就需要往私服上上传资源和下载资源，具体的实现步骤为:

#### 步骤1:配置工程上传私服的具体位置

```xml
 <!--配置当前工程保存在私服中的具体位置-->
<distributionManagement>
    <repository>
        <!--和maven/settings.xml中server中的id一致，表示使用该id对应的用户名和密码-->
        <id>itheima-release</id>
         <!--release版本上传仓库的具体地址-->
        <url>http://localhost:8081/repository/itheima-release/</url>
    </repository>
    <snapshotRepository>
        <!--和maven/settings.xml中server中的id一致，表示使用该id对应的用户名和密码-->
        <id>itheima-snapshot</id>
        <!--snapshot版本上传仓库的具体
地址-->
        <url>http://localhost:8081/repository/itheima-snapshot/</url>
    </snapshotRepository>
</distributionManagement>
```

#### 步骤2:发布资源到私服

![1630992305191](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850611.png)

或者执行Maven命令

```
mvn deploy
```

**注意:**

要发布的项目都需要配置`distributionManagement`标签，要么在自己的pom.xml中配置，要么在其父项目中配置，然后子项目中继承父项目即可。

发布成功，在私服中就能看到:

![1630992513299](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850624.png)

现在发布是在itheima-snapshot仓库中，如果想发布到itheima-release仓库中就需要将项目pom.xml中的version修改成RELEASE即可。

如果想删除已经上传的资源，可以在界面上进行删除操作:

![1630992952378](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850368.png)

如果私服中没有对应的jar，会去中央仓库下载，速度很慢。可以配置让私服去阿里云中下载依赖。

![1630993028454](https://picgo-1259245122.cos.ap-shanghai.myqcloud.com/img/note/Maven/202210041850866.png)

至此私服的搭建就已经完成，相对来说有点麻烦，但是步骤都比较固定，后期大家如果需要的话，就可以参考上面的步骤一步步完成搭建即可。











