---
title: "关于REM布局的相关知识"
categories: "学习笔记类"
date: 2018-3-31
password: 
---



#### 先说说目前为止我所学到的长度单位

- **px**——*绝对长度单位*，最基本的长度单位，相对于屏幕分辨率来定义元素的大小。

- **em**——*相对长度单位*，相对于自身的font-size进行定义元素的大小，如果元素自身没有定义font-size，则默认选用浏览器的默认字体大小（浏览器的默认字体大小是16px）。

- 百分比**%**——*百分比单位*，继承父元素的大小，一般用于设置某个盒子的宽度。

- **rem**——*相对长度单位*。

  ​	设置字体长度单位一般使用px，em，rem（在需要适配多种分辨率的页面，如**移动端**，就优先使用rem）。

  <!--more-->


#### rem的定义：

​	  rem是CSS3新增加的一个相对单位，它是相对于HTML根元素的font-size的值来对元素进行设置大小的单位，一般应用于需要适配多种分辨率的移动端页面；使用rem单位设置元素大小，可以方便以后对页面的维护（修改HTML的font-size的值即可）。



```
@media screen and (width:640px) {//这里的width是设计稿的宽度
  html {
    font-size: 100px;//默认基础值设置为100
  }
}
```



#### 关于rem的使用方法：

​	先给HTML的font-size设置一个基础值，为了方便一般设置为100，这个值设置给HTML的font-size。设置为100后，后面的元素大小设置需要缩小一百倍（比如某个盒子的字体的大小是将要设置为font-size：16px，则此时需要设置为font-size：0.16rem）。

​	**注意：rem需要配合媒体查询使用（媒体查询：一种css的语法，可以根据设备屏幕的不同来加载对应的css代码）**

在页面的css顶部，需要加媒体查询（@media）来设置HTML的font-size。

![](/img/关于rem/1.png)

这是有计算公式的：**font-size=要适配的屏幕宽度*基础值/设计稿的宽度**

​	这里有一个转换多个媒体查询的[在线工具](http://mxd.tencent.com/wp-content/uploads/2014/11/rem.html)，只需要提供设计稿宽度以及基础值，即可生成多个不同宽度对应的媒体查询代码，将其引入你的css中即可使你的页面兼容多个不同分辨率的显示（要放在在你编写的css之前）。

![](/img/关于rem/3.png)

​	**目前已知的缺陷（数据源自[Can I use？](https://www.caniuse.com/#search=rem)）：**

- 基于Chrome 31-34和Chrome的Android版本（如4.4）在根元素具有基于百分比的大小时会出现字体大小错误。

- 据报道，Android 4.3版浏览器对于Samsung Note II或Android 4.2上的三星Galaxy Tab 2不起作用。

- 当页面在Chrome中缩小时，以“rem”为尺寸的边框消失。

- 在伪元素（：before和：after）中使用“line-height”属性时，IE 9,10和11不支持rem单元

- 导致通常具有Safari 5.1的iPhone 4上的内容显示和滚动问题。

  **目前为止本人踩过的坑：**

部分css初始化代码里设置了元素的**line-hight**，此时使用rem设置元素大小将会出现布局错乱（行高放大了好几倍）。

![](/img/关于rem/2-1.png)

![](/img/关于rem/2-2.png)

