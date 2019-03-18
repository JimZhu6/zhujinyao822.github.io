---
title: vscode插件Settings Sync使用介绍
categories: 资料类
copyright: true
tags:
  - 笔记
  - vsCode
abbrlink: 91b27d98
date: 2018-06-27 21:24:52
---

> Settings Sync是一个能通过github同步电脑里vscode插件的插件，方便更换电脑时同步vscode里的插件

<!--more-->

#### 下载

​	在vscode的扩展商店里搜索Settings Sync安装

![1-1.扩展搜索页.png](https://i.loli.net/2019/03/11/5c8663b38cd8c.png)

#### 安装（上传数据）

​	插件安装完成后，按alt+shift+U键，vscode里会跳出窗口让你输入内容，同时还会打开github的个人令牌页面。点击**generate new token**创建新的个人令牌

![1-2.按A+S+U跳转页面.png](https://i.loli.net/2019/03/11/5c8663b379044.png)

------

​	**提示**：若此时你没有登录github，请先登录，然后进入设置，进入个人令牌页面

![5-1设置.png](https://i.loli.net/2019/03/11/5c86647ce6452.png)

![5-2.png](https://i.loli.net/2019/03/11/5c86647971fa1.png)

---

​	令牌的名字随意，自己能分辨出来就好。下面的选项只勾选**gist**一个

![1-3.git设置.png](https://i.loli.net/2019/03/11/5c8663b36a22e.png)

​	点击下方的**generate token** ，创建个人令牌。

​	然后github会生成一段代码，请**记录好这段代码** 。将这段代码复制到vscode的弹窗里。

![1-4.复制生成的代码.png](https://i.loli.net/2019/03/11/5c8663b38ed78.png)

​	按回车键，稍等片刻。

![1-5读取信息中.png](https://i.loli.net/2019/03/11/5c8663b39bfeb.png)

​	直到vscode弹出提示信息，请**记录好这段提示信息** 。

![1-6.保存生成的gistID.png](https://i.loli.net/2019/03/11/5c8663b3ad9b8.png)

​	截止目前，你的vscode里所有的插件信息已经保存到github。

#### 安装（下载/同步数据）

​	在你需要同步的vscode里下载Settings Sync。安装完成后，按alt+shift+D键，跳出提示框。根据提示，先输入github的令牌地址，也就是在github网页上复制的那行代码。

![2-1.新下载插件后按ASD先输入accessID.png](https://i.loli.net/2019/03/11/5c86647bca574.png)

​	然后再输入gistID，也就是在vscode弹出提示里的那段代码。

![2-2再输入gistID.png](https://i.loli.net/2019/03/11/5c866476a1839.png)

​	然后稍等片刻，同步完成。

![2-3完成.png](https://i.loli.net/2019/03/11/5c866476338eb.png)

> 上图是本地插件列表与github上的插件无区别的提示

---

#### 重置

​	如果中途发现输错id，可以使用重置功能

![重置.png](https://i.loli.net/2019/03/11/5c866475e5023.png)