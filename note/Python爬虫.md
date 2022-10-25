# Python爬虫

# 1 UrlLib

## 1.1 get请求方式：urllib.parse.quote

```python
import urllib.request
import urllib.parse

base_url = 'https://www.baidu.com/s?wd='
# 将周杰伦三个字变成unicode编码的格式
# 我们需要依赖于urllib.parse
name = urllib.parse.quote('周杰伦')
url = base_url + name

# 请求对象的定制为了解决反爬的第一种手段
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}
# 请求对象的定制
request = urllib.request.Request(url=url,headers=headers)
# 模拟浏览器向服务器发送请求
response = urllib.request.urlopen(request)
# 获取响应的内容
content = response.read().decode('utf-8')
# 打印数据
print(content)
```

## 1.2 get请求方式：urllib.parse.urlencode

```PYTHON
import urllib.request
import urllib.parse

base_url = 'https://www.baidu.com/s?'
data = {
    'wd':'周杰伦',
    'sex':'男',
    'location':'中国台湾省'
}
new_data = urllib.parse.urlencode(data)
# 请求资源路径
url = base_url + new_data

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}
# 请求对象的定制
request = urllib.request.Request(url=url,headers=headers)
# 模拟浏览器向服务器发送请求
response = urllib.request.urlopen(request)
# 获取网页源码的数据
content = response.read().decode('utf-8')
# 打印数据
print(content)
```

## 1.3 post请求方式

```python
import urllib.request
import urllib.parse

url = 'https://fanyi.baidu.com/sug'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}
data = {
    'kw':'spider'
}

# post请求的参数 必须要进行编码
data = urllib.parse.urlencode(data).encode('utf-8')

# post的请求的参数 是不会拼接在url的后面的,而是需要放在请求对象定制的参数中
# post请求的参数 必须要进行编码
request = urllib.request.Request(url=url,data=data,headers=headers)

# 模拟浏览器向服务器发送请求
response = urllib.request.urlopen(request)
# 获取响应的数据
content = response.read().decode('utf-8')

# 字符串--》json对象
import json
obj = json.loads(content)
print(obj)
```

1：get请求方式的参数必须编码，参数是拼接到url后面，编码之后不需要调用encode方法

2：post请求方式的参数必须编码，参数是放在请求对象定制的方法中，编码之后需要调用encode方法

```python
import urllib.request
import urllib.parse

url = 'https://fanyi.baidu.com/v2transapi?from=en&to=zh'
headers = {
    # 'Accept': '*/*',
    # 'Accept-Encoding': 'gzip, deflate, br',
    # 'Accept-Language': 'zh-CN,zh;q=0.9',
    # 'Connection': 'keep-alive',
    # 'Content-Length': '135',
    # 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': 'BIDUPSID=DAA8F9F0BD801A2929D96D69CF7EBF50; PSTM=1597202227; BAIDUID=DAA8F9F0BD801A29B2813502000BF8E9:SL=0:NR=10:FG=1; __yjs_duid=1_c19765bd685fa6fa12c2853fc392f8db1618999058029; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; BDUSS=R2bEZvTjFCNHQxdUV-cTZ-MzZrSGxhbUYwSkRkUWk2SkxxS3E2M2lqaFRLUlJoRVFBQUFBJCQAAAAAAAAAAAEAAAA3e~BTveK-9sHLZGF5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFOc7GBTnOxgaW; BDUSS_BFESS=R2bEZvTjFCNHQxdUV-cTZ-MzZrSGxhbUYwSkRkUWk2SkxxS3E2M2lqaFRLUlJoRVFBQUFBJCQAAAAAAAAAAAEAAAA3e~BTveK-9sHLZGF5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFOc7GBTnOxgaW; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BAIDUID_BFESS=DAA8F9F0BD801A29B2813502000BF8E9:SL=0:NR=10:FG=1; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; PSINO=2; H_PS_PSSID=34435_31660_34405_34004_34073_34092_26350_34426_34323_22158_34390; delPer=1; BA_HECTOR=8185a12020018421b61gi6ka20q; BCLID=10943521300863382545; BDSFRCVID=boDOJexroG0YyvRHKn7hh7zlD_weG7bTDYLEOwXPsp3LGJLVJeC6EG0Pts1-dEu-EHtdogKK0mOTHv8F_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF=tR3aQ5rtKRTffjrnhPF3-44vXP6-hnjy3bRkX4Q4Wpv_Mnndjn6SQh4Wbttf5q3RymJ42-39LPO2hpRjyxv4y4Ldj4oxJpOJ-bCL0p5aHl51fbbvbURvD-ug3-7qqU5dtjTO2bc_5KnlfMQ_bf--QfbQ0hOhqP-jBRIE3-oJqC8hMIt43f; BCLID_BFESS=10943521300863382545; BDSFRCVID_BFESS=boDOJexroG0YyvRHKn7hh7zlD_weG7bTDYLEOwXPsp3LGJLVJeC6EG0Pts1-dEu-EHtdogKK0mOTHv8F_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF_BFESS=tR3aQ5rtKRTffjrnhPF3-44vXP6-hnjy3bRkX4Q4Wpv_Mnndjn6SQh4Wbttf5q3RymJ42-39LPO2hpRjyxv4y4Ldj4oxJpOJ-bCL0p5aHl51fbbvbURvD-ug3-7qqU5dtjTO2bc_5KnlfMQ_bf--QfbQ0hOhqP-jBRIE3-oJqC8hMIt43f; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1629701482,1629702031,1629702343,1629704515; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1629704515; __yjs_st=2_MDBkZDdkNzg4YzYyZGU2NTM5NzBjZmQ0OTZiMWRmZGUxM2QwYzkwZTc2NTZmMmIxNDJkYzk4NzU1ZDUzN2U3Yjc4ZTJmYjE1YTUzMTljYWFkMWUwYmVmZGEzNmZjN2FlY2M3NDAzOThhZTY5NzI0MjVkMmQ0NWU3MWE1YTJmNGE5NDBhYjVlOWY3MTFiMWNjYTVhYWI0YThlMDVjODBkNWU2NjMwMzY2MjFhZDNkMzVhNGMzMGZkMWY2NjU5YzkxMDk3NTEzODJiZWUyMjEyYTk5YzY4ODUyYzNjZTJjMGM5MzhhMWE5YjU3NTM3NWZiOWQxNmU3MDVkODExYzFjN183XzliY2RhYjgz; ab_sr=1.0.1_ZTc2ZDFkMTU5ZTM0ZTM4MWVlNDU2MGEzYTM4MzZiY2I2MDIxNzY1Nzc1OWZjZGNiZWRhYjU5ZjYwZmNjMTE2ZjIzNmQxMTdiMzIzYTgzZjVjMTY0ZjM1YjMwZTdjMjhiNDRmN2QzMjMwNWRhZmUxYTJjZjZhNTViMGM2ODFlYjE5YTlmMWRjZDAwZGFmMDY4ZTFlNGJiZjU5YzE1MGIxN2FiYTU3NDgzZmI4MDdhMDM5NTQ0MjQxNDBiNzdhMDdl',
    # 'Host': 'fanyi.baidu.com',
    # 'Origin': 'https://fanyi.baidu.com',
    # 'Referer': 'https://fanyi.baidu.com/?aldtype=16047',
    # 'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    # 'sec-ch-ua-mobile': '?0',
    # 'Sec-Fetch-Dest': 'empty',
    # 'Sec-Fetch-Mode': 'cors',
    # 'Sec-Fetch-Site': 'same-origin',
    # 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    # 'X-Requested-With': 'XMLHttpRequest',
}

data = {
    'from': 'en',
    'to': 'zh',
    'query': 'love',
    'transtype': 'realtime',
    'simple_means_flag': '3',
    'sign': '198772.518981',
    'token': '5483bfa652979b41f9c90d91f3de875d',
    'domain': 'common',
}
# post请求的参数  必须进行编码 并且要调用encode方法
data = urllib.parse.urlencode(data).encode('utf-8')
# 请求对象的定制
request = urllib.request.Request(url = url,data = data,headers = headers)
# 模拟浏览器向服务器发送请求
response = urllib.request.urlopen(request)
# 获取响应的数据
content = response.read().decode('utf-8')

import json
obj = json.loads(content)
print(obj)
```

## 1.4 ajax的get请求

```python

# get请求
# 获取豆瓣电影的第一页的数据 并且保存起来

import urllib.request

url = 'https://movie.douban.com/j/chart/top_list?type=5&interval_id=100%3A90&action=&start=0&limit=20'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}

# (1) 请求对象的定制
request = urllib.request.Request(url=url,headers=headers)

# （2）获取响应的数据
response = urllib.request.urlopen(request)
content = response.read().decode('utf-8')

# (3) 数据下载到本地
# open方法默认情况下使用的是gbk的编码  如果我们要想保存汉字 那么需要在open方法中指定编码格式为utf-8
# encoding = 'utf-8'
# fp = open('douban.json','w',encoding='utf-8')
# fp.write(content)

with open('douban1.json','w',encoding='utf-8') as fp:
    fp.write(content)
```

较为完善的项目，以爬取豆瓣电影top50为例：

```python

# page    1  2   3   4
# start   0  20  40  60

# start （page - 1）*20

# 下载豆瓣电影前10页的数据
# （1） 请求对象的定制
# （2） 获取响应的数据
# （3） 下载数据

import urllib.parse
import urllib.request

def create_request(page):
    base_url = 'https://movie.douban.com/j/chart/top_list?type=5&interval_id=100%3A90&action=&'
    data = {
        'start':(page - 1) * 20,
        'limit':20
    }
    data = urllib.parse.urlencode(data)
    url = base_url + data
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
    }
    request = urllib.request.Request(url=url,headers=headers)
    return request

def get_content(request):
    response = urllib.request.urlopen(request)
    content = response.read().decode('utf-8')
    return content

def down_load(page,content):
    with open('douban_' + str(page) + '.json','w',encoding='utf-8')as fp:
        fp.write(content)

# 程序的入口
if __name__ == '__main__':
    start_page = int(input('请输入起始的页码'))
    end_page = int(input('请输入结束的页面'))

    for page in range(start_page,end_page+1):
#         每一页都有自己的请求对象的定制
        request = create_request(page)
#         获取响应的数据
        content = get_content(request)
#         下载
        down_load(page,content)
```

## 1.5 ajax的post请求

```python
# 1页
# http://www.kfc.com.cn/kfccda/ashx/GetStoreList.ashx?op=cname
# post
# cname: 北京
# pid:
# pageIndex: 1
# pageSize: 10


# 2页
# http://www.kfc.com.cn/kfccda/ashx/GetStoreList.ashx?op=cname
# post
# cname: 北京
# pid:
# pageIndex: 2
# pageSize: 10

import urllib.request
import urllib.parse

def create_request(page):
    base_url = 'http://www.kfc.com.cn/kfccda/ashx/GetStoreList.ashx?op=cname'

    data = {
        'cname': '北京',
        'pid':'',
        'pageIndex': page,
        'pageSize': '10'
    }

    data = urllib.parse.urlencode(data).encode('utf-8')

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
    }

    request = urllib.request.Request(url=base_url,headers=headers,data=data)

    return request

def get_content(request):
    response = urllib.request.urlopen(request)
    content = response.read().decode('utf-8')
    return content


def down_load(page,content):
    with open('kfc_' + str(page) + '.json','w',encoding='utf-8')as fp:
        fp.write(content)



if __name__ == '__main__':
    start_page = int(input('请输入起始页码'))
    end_page = int(input('请输入结束页码'))

    for page in range(start_page,end_page+1):
        # 请求对象的定制
        request = create_request(page)
        # 获取网页源码
        content = get_content(request)
        # 下载
        down_load(page,content)

```

## 1.6 cookies登陆

```python
# 适用的场景：数据采集的时候 需要绕过登陆 然后进入到某个页面
# 个人信息页面是utf-8  但是还报错了编码错误  因为并没有进入到个人信息页面 而是跳转到了登陆页面
# 那么登陆页面不是utf-8  所以报错

# 什么情况下访问不成功？
# 因为请求头的信息不够  所以访问不成功

import urllib.request

url = 'https://weibo.cn/6451491586/info'

headers = {
# ':authority': 'weibo.cn',
# ':method': 'GET',
# ':path': '/6451491586/info',
# ':scheme': 'https',
'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
# 'accept-encoding': 'gzip, deflate, br',
'accept-language': 'zh-CN,zh;q=0.9',
'cache-control': 'max-age=0',
#     cookie中携带着你的登陆信息   如果有登陆之后的cookie  那么我们就可以携带着cookie进入到任何页面
'cookie': '_T_WM=24c44910ba98d188fced94ba0da5960e; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WFxxfgNNUmXi4YiaYZKr_J_5NHD95QcSh-pSh.pSKncWs4DqcjiqgSXIgvVPcpD; SUB=_2A25MKKG_DeRhGeBK7lMV-S_JwzqIHXVv0s_3rDV6PUJbktCOLXL2kW1NR6e0UHkCGcyvxTYyKB2OV9aloJJ7mUNz; SSOLoginState=1630327279',
# referer  判断当前路径是不是由上一个路径进来的    一般情况下 是做图片防盗链
'referer': 'https://weibo.cn/',
'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
'sec-ch-ua-mobile': '?0',
'sec-fetch-dest': 'document',
'sec-fetch-mode': 'navigate',
'sec-fetch-site': 'same-origin',
'sec-fetch-user': '?1',
'upgrade-insecure-requests': '1',
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
}
# 请求对象的定制
request = urllib.request.Request(url=url,headers=headers)
# 模拟浏览器向服务器发送请求
response = urllib.request.urlopen(request)
# 获取响应的数据
content = response.read().decode('utf-8')

# 将数据保存到本地
with open('weibo.html','w',encoding='utf-8')as fp:
    fp.write(content)
```

## 1.7 Handler处理器

```python
# 需求 使用handler来访问百度  获取网页源码
import urllib.request
url = 'http://www.baidu.com'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}
request = urllib.request.Request(url = url,headers = headers)

# handler   build_opener  open
# （1）获取hanlder对象
handler = urllib.request.HTTPHandler()
# （2）获取opener对象
opener = urllib.request.build_opener(handler)
# (3) 调用open方法
response = opener.open(request)
content = response.read().decode('utf-8')
print(content)
```

## 1.8 代理服务器

1. 创建Reuqest对象 

2. 创建ProxyHandler对象 

3. 用handler对象创建opener对象 

4. 使用opener.open函数发送请求

```python
import urllib.request
url = 'http://www.baidu.com/s?wd=ip'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}
# 请求对象的定制
request = urllib.request.Request(url = url,headers= headers)
# 模拟浏览器访问服务器
# response = urllib.request.urlopen(request)
proxies = {
    'http':'118.24.219.151:16817'
}
# handler  build_opener  open
handler = urllib.request.ProxyHandler(proxies = proxies)
opener = urllib.request.build_opener(handler)
response = opener.open(request)
# 获取响应的信息
content = response.read().decode('utf-8')
# 保存
with open('daili.html','w',encoding='utf-8')as fp:
    fp.write(content)
```

## 1.9 代理池

```python
import urllib.request
proxies_pool = [
    {'http':'118.24.219.151:16817'},
    {'http':'118.24.219.151:16817'},
]

import random
proxies = random.choice(proxies_pool)

url = 'http://www.baidu.com/s?wd=ip'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}

request = urllib.request.Request(url = url,headers=headers)
handler = urllib.request.ProxyHandler(proxies=proxies)
opener = urllib.request.build_opener(handler)
response = opener.open(request)
content = response.read().decode('utf-8')
with open('daili.html','w',encoding='utf-8')as fp:
    fp.write(content)
```

# 2 解析

## 2.1 xpath插件

快捷键：ctrl+shift+X

```text
xpath基本语法：
1.路径查询
//：查找所有子孙节点，不考虑层级关系
/ ：找直接子节点
2.谓词查询
//div[@id]
//div[@id="maincontent"]
3.属性查询
//@class
4.模糊查询
//div[contains(@id, "he")]
//div[starts‐with(@id, "he")]
5.内容查询
//div/h1/text()
6.逻辑运算
//div[@id="head" and @class="s_down"]
//title | //price
```

```python
from lxml import etree

# xpath解析
# （1）本地文件                                                etree.parse
# （2）服务器响应的数据  response.read().decode('utf-8') *****   etree.HTML()

# xpath解析本地文件
tree = etree.parse('070_尚硅谷_爬虫_解析_xpath的基本使用.html')

#tree.xpath('xpath路径')

# 查找ul下面的li
# li_list = tree.xpath('//body/ul/li')


# 查找所有有id的属性的li标签
# text()获取标签中的内容
# li_list = tree.xpath('//ul/li[@id]/text()')

# 找到id为l1的li标签  注意引号的问题
# li_list = tree.xpath('//ul/li[@id="l1"]/text()')

# 查找到id为l1的li标签的class的属性值
# li = tree.xpath('//ul/li[@id="l1"]/@class')

# 查询id中包含l的li标签
li_list = tree.xpath('//ul/li[contains(@id,"l")]/text()')

# 查询id的值以l开头的li标签
# li_list = tree.xpath('//ul/li[starts-with(@id,"c")]/text()')

#查询id为l1和class为c1的
# li_list = tree.xpath('//ul/li[@id="l1" and @class="c1"]/text()')

# li_list = tree.xpath('//ul/li[@id="l1"]/text() | //ul/li[@id="l2"]/text()')

# 判断列表的长度
print(li_list)
print(len(li_list))

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Title</title>
</head>
<body>
    <ul>
        <li id="l1" class="c1">北京</li>
        <li id="l2">上海</li>
        <li id="c3">深圳</li>
        <li id="c4">武汉</li>
    </ul>

<!--    <ul>-->
<!--        <li>大连</li>-->
<!--        <li>锦州</li>-->
<!--        <li>沈阳</li>-->
<!--    </ul>-->
</body>
</html>
```

```python
# （1） 获取网页的源码
# （2） 解析   解析的服务器响应的文件  etree.HTML
# (3)  打印

import urllib.request
url = 'https://www.baidu.com/'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}

# 请求对象的定制
request = urllib.request.Request(url = url,headers = headers)
# 模拟浏览器访问服务器
response = urllib.request.urlopen(request)
# 获取网页源码
content = response.read().decode('utf-8')

# 解析网页源码 来获取我们想要的数据
from lxml import etree
# 解析服务器响应的文件
tree = etree.HTML(content)
# 获取想要的数据  xpath的返回值是一个列表类型的数据
result = tree.xpath('//input[@id="su"]/@value')[0]
print(result)
```

## 2.2 站长素材图片抓取并且下载

```python
# 1 请求对象的定制
# 2 获取网页的源码
# 3 下载
# 需求 下载的前十页的图片
# https://sc.chinaz.com/tupian/qinglvtupian.html   1
# https://sc.chinaz.com/tupian/qinglvtupian_page.html

import urllib.request
from lxml import etree

def create_request(page):
    if(page == 1):
        url = 'https://sc.chinaz.com/tupian/qinglvtupian.html'
    else:
        url = 'https://sc.chinaz.com/tupian/qinglvtupian_' + str(page) + '.html'

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    }

    request = urllib.request.Request(url = url, headers = headers)
    return request

def get_content(request):
    response = urllib.request.urlopen(request)
    content = response.read().decode('utf-8')
    return content


def down_load(content):
#     下载图片
    # urllib.request.urlretrieve('图片地址','文件的名字')
    tree = etree.HTML(content)

    name_list = tree.xpath('//div[@id="container"]//a/img/@alt')

    # 一般设计图片的网站都会进行懒加载
    src_list = tree.xpath('//div[@id="container"]//a/img/@src2')

    for i in range(len(name_list)):
        name = name_list[i]
        src = src_list[i]
        url = 'https:' + src

        urllib.request.urlretrieve(url=url,filename='./loveImg/' + name + '.jpg')


if __name__ == '__main__':
    start_page = int(input('请输入起始页码'))
    end_page = int(input('请输入结束页码'))

    for page in range(start_page,end_page+1):
        # (1) 请求对象的定制
        request = create_request(page)
        # （2）获取网页的源码
        content = get_content(request)
        # （3）下载
        down_load(content)

```

## 2.3 jsonpath

```json
{ "store": {
    "book": [
      { "category": "修真",
        "author": "六道",
        "title": "坏蛋是怎样练成的",
        "price": 8.95
      },
      { "category": "修真",
        "author": "天蚕土豆",
        "title": "斗破苍穹",
        "price": 12.99
      },
      { "category": "修真",
        "author": "唐家三少",
        "title": "斗罗大陆",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      { "category": "修真",
        "author": "南派三叔",
        "title": "星辰变",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "author": "老马",
      "color": "黑色",
      "price": 19.95
    }
  }
}
```

```python

import json
import jsonpath


obj = json.load(open('073_尚硅谷_爬虫_解析_jsonpath.json','r',encoding='utf-8'))

# 书店所有书的作者
# author_list = jsonpath.jsonpath(obj,'$.store.book[*].author')
# print(author_list)

# 所有的作者
# author_list = jsonpath.jsonpath(obj,'$..author')
# print(author_list)

# store下面的所有的元素
# tag_list = jsonpath.jsonpath(obj,'$.store.*')
# print(tag_list)

# store里面所有东西的price
# price_list = jsonpath.jsonpath(obj,'$.store..price')
# print(price_list)

# 第三个书
# book = jsonpath.jsonpath(obj,'$..book[2]')
# print(book)

# 最后一本书
# book = jsonpath.jsonpath(obj,'$..book[(@.length-1)]')
# print(book)

# 	前面的两本书
# book_list = jsonpath.jsonpath(obj,'$..book[0,1]')
# book_list = jsonpath.jsonpath(obj,'$..book[:2]')
# print(book_list)

# 条件过滤需要在（）的前面添加一个？
# 	 过滤出所有的包含isbn的书。
# book_list = jsonpath.jsonpath(obj,'$..book[?(@.isbn)]')
# print(book_list)


# 哪本书超过了10块钱
book_list = jsonpath.jsonpath(obj,'$..book[?(@.price>10)]')
print(book_list)
```

[JSONPath-简单入门_jimiStephen的博客-CSDN博客](https://blog.csdn.net/luxideyao/article/details/77802389)

## 2.4 BeautifulSoup

### 2.4.1 基本介绍

- 简称： bs4 

- 什么是BeatifulSoup？ BeautifulSoup，和lxml一样，是一个html的解析器，主要功能也是解析和提取数据 
- 优缺点？ 缺点：效率没有lxml的效率高 优点：接口设计人性化，使用方便

### 2.4.2 使用

```python
# 服务器响应的文件生成对象 
soup = BeautifulSoup(response.read().decode(), 'lxml') 
# 本地文件生成对象 
soup = BeautifulSoup(open('1.html'), 'lxml') 注意：默认打开文件的编码格式gbk所以需要指定打开编码格式
```

### 2.4.3 节点定位

1. 根据标签名查找节点

   soup.a 只能找到第一个a

   soup.a.name

   soup.a.attrs

2. 函数

   1. find(返回一个对象)

      find('a')：只找到第一个a标签

      find('a', title='名字')

      find('a', class_='名字')

   2. find_all(返回一个列表)

      find_all('a') 查找到所有的a 

      find_all(['a', 'span']) 返回所有的a和span 

      find_all('a', limit=2) 只找前两个a

   3. select(根据选择器得到节点对象) 推荐

      - element                      eg:p
      - .class                           eg:.firstname
      - #id                               eg:#firstname
      - 属性选择器
        - [attribute]            eg:li = soup.select('li[class]')
        - [attribute=value] eg:li = soup.select('li[class="hengheng1"]')
      - 层级选择器
        - element element
        - element>element
        - element,element

### 2.4.4 节点信息

1. 获取节点内容：适用于标签中嵌套标签的结构
   1. obj.string
   2. obj.get_text()  √

1. 节点的属性
   1. tag.name 获取标签名
   2. tag.attrs 将属性值作为一个字典返回
2. 获取节点属性
   1. obj.attrs.get('titile')√
   2. obj.get('titile')
   3. obj['titile']

### 2.4.5 演示

```python
from bs4 import BeautifulSoup

# 通过解析本地文件 来将bs4的基础语法进行讲解
# 默认打开的文件的编码格式是gbk 所以在打开文件的时候需要指定编码
soup = BeautifulSoup(open('075_尚硅谷_爬虫_解析_bs4的基本使用.html',encoding='utf-8'),'lxml')
# 根据标签名查找节点
# 找到的是第一个符合条件的数据
# print(soup.a)
# 获取标签的属性和属性值
# print(soup.a.attrs)

# bs4的一些函数
# （1）find
# 返回的是第一个符合条件的数据
# print(soup.find('a'))

# 根据title的值来找到对应的标签对象
# print(soup.find('a',title="a2"))

# 根据class的值来找到对应的标签对象  注意的是class需要添加下划线
# print(soup.find('a',class_="a1"))


# （2）find_all  返回的是一个列表 并且返回了所有的a标签
# print(soup.find_all('a'))

# 如果想获取的是多个标签的数据 那么需要在find_all的参数中添加的是列表的数据
# print(soup.find_all(['a','span']))

# limit的作用是查找前几个数据
# print(soup.find_all('li',limit=2))


# （3）select（推荐）
# select方法返回的是一个列表  并且会返回多个数据
# print(soup.select('a'))

# 可以通过.代表class  我们把这种操作叫做类选择器
# print(soup.select('.a1'))

# print(soup.select('#l1'))


# 属性选择器---通过属性来寻找对应的标签
# 查找到li标签中有id的标签
# print(soup.select('li[id]'))

# 查找到li标签中id为l2的标签
# print(soup.select('li[id="l2"]'))


# 层级选择器
#  后代选择器
# 找到的是div下面的li
# print(soup.select('div li'))

# 子代选择器
#  某标签的第一级子标签
# 注意：很多的计算机编程语言中 如果不加空格不会输出内容  但是在bs4中 不会报错 会显示内容
# print(soup.select('div > ul > li'))


# 找到a标签和li标签的所有的对象
# print(soup.select('a,li'))

# 节点信息
#    获取节点内容
# obj = soup.select('#d1')[0]
# 如果标签对象中 只有内容 那么string和get_text()都可以使用
# 如果标签对象中 除了内容还有标签 那么string就获取不到数据 而get_text()是可以获取数据
# 我们一般情况下  推荐使用get_text()
# print(obj.string)
# print(obj.get_text())

# 节点的属性
# obj = soup.select('#p1')[0]
# name是标签的名字
# print(obj.name)
# 将属性值左右一个字典返回
# print(obj.attrs)

# 获取节点的属性
obj = soup.select('#p1')[0]
print(obj.attrs.get('class'))
print(obj.get('class'))
print(obj['class'])
```

### 2.4.6 案例

```python
import urllib.request
url = 'https://www.starbucks.com.cn/menu/'
response = urllib.request.urlopen(url)
content = response.read().decode('utf-8')

from bs4 import BeautifulSoup
soup = BeautifulSoup(content,'lxml')
# //ul[@class="grid padded-3 product"]//strong/text()
name_list = soup.select('ul[class="grid padded-3 product"] strong')
for name in name_list:
    print(name.get_text())
```

# 3 Selenium

## 3.1 定义

（1）Selenium是一个用于Web应用程序测试的工具。 

（2）Selenium 测试直接运行在浏览器中，就像真正的用户在操作一样。 

（3）支持通过各种driver（FirfoxDriver，IternetExplorerDriver，OperaDriver，ChromeDriver）驱动 真实浏览器完成测试。 

（4）selenium也是支持无界面浏览器操作的。

功能：模拟浏览器功能，自动执行网页中的js代码，实现动态加载

## 3.2 安装

（1）操作谷歌浏览器驱动下载地址 http://chromedriver.storage.googleapis.com/index.html 

（2）谷歌驱动和谷歌浏览器版本之间的映射表 http://blog.csdn.net/huilan_same/article/details/51896672 

（3）查看谷歌浏览器版本 谷歌浏览器右上角‐‐>帮助‐‐>关于 

（4）pip install selenium

















