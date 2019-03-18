---
title: 高效前端·Web优化
categories: 资料类
tags:
  - 阅读笔记
copyright: true
abbrlink: ac8702bc
date: 2018-09-12 00:00:00
---

> 本文参考[《高效前端：Web高效变成与优化实践》](https://book.douban.com/subject/30170670/)作者：[李银城](https://www.zhihu.com/people/li-yin-cheng-24/activities)。这本书里面讲述了很多关于如何能使前端代码运行起来更加轻巧的方法。目前，我阅读了这本书的前一章，我写这篇文章是当做写这本书的阅读笔记，记录一些以后可能会用到的实用的方法。

<!--more-->

## 第一章：HTML/CSS优化

### 能使用H5/C3解决的问题就不要用Js

#### 导航高亮

“导航高亮”在很多页面上都非常常见，特点为：在正常状态下，导航栏里的每一项都是偏暗的，当鼠标**指向**或**点击**某一项时，那一项会变成高亮且有可能会有额外的下拉菜单显示出来。

```css
/* css */
/* 在正常情况下，给每个导航设置透明度使其变暗 */
nav li {
    opacity:0.5;
}
/* 激活时高亮 */
nav li:hover{
    opacity:1;
}
```

一般每个导航项都是指向一个不同的页面，所以在每个页面的`body`里设置好对应的类名，每一个导航项同样设置好对应的类名。

```html
<!-- home.html -->
<body class="home"></body>
<!-- buy.html -->
<body class="buy"></body>
<!-- 导航项里设置类 -->
<ul class="nav">
    <li class="home"></li>
	<li class="buy"></li>
</ul>
```

当前页面对应的是哪个导航项时，导航项高亮。

```css
/* css */
body.home nav li.home{
    opacity:1;
}
```

当指向某一个导航项时，可能需要显示出一个隐藏的菜单，为了方便，可以将菜单和导航项写成相邻的元素

```html
<!-- html -->
<li class="user">用户</li>
<li class="user-menu">
	<ul>
        <li>设置</li>
        <li>退出</li>
    </ul>
</li>
```

```css
/* css */
/* 当鼠标指向某一个导航项时 */
.user:hover + .menu{
    display:list-item;
}
/* 同时为了避免鼠标从导航项处离开时，菜单会消失，所以菜单也需要加 */
.menu:hover{
    display:list-item;
}
```

此时，菜单和导航是挨在一起的，如果使用定位将他们两个隔开，那么上面设置的`hover`也就失效了，这是，可以使用伪类来实现定位。

```css
/* css */
ui.menu:before{
    content:"";
    position:absolute;
    left:0;
    top:-20px;
    width:100%;
    height:20px;
}
```

这样鼠标下移的时候会触发menu的`hover`上，而且也能保持有适当的间距。

#### 多列等高

多个盒子并排时，可能会因为盒子里的内容不相同而导致每个盒子的高度都不相同。这时，可以利用`table`的自适应特性，让每个盒子都当做一天`td`。

```css
/* css */
/* 无需修改html结构，直接通过css设置table */
.wrapper{
    display:table;
    border-spacing:20px; /* 设置每个td的间距 */
}
.wrapper{
    disaply:table-cell;
    width:1000px; /* 设置总宽度，会自动平分里面的每一项 */
    border-radius:6px; /* 设置圆角，为了美观 */
}
```

#### 根据元素个数的不同显示不同的样式

**需求如下**：*有A和B两个元素，当页面上只有A元素时，显示A元素；当页面有A和B甚至更多的元素时，隐藏A元素*。

这种情况下可能很多人都会选择使用Js来进行动态判断，其实这里用css3的选择器即可实现。

```html
<!-- html -->
<style>
    /* 当第一个item是第一个元素，且是倒数第二个元素时，隐藏之 */
    .item:nth-of-type(1):nth-last-of-type(2){
        display:none;
    }
</style>
<div class="item"></div>
<div class="item"></div>
```

#### 基本的表单验证（巧用css3伪类）

对于验证email输入的格式可以使用CSS3的选择器`valid`和`invalid`。

```html
<!-- html -->
<style>
    /* 如果输入的内容不是email，则套用这个样式 */
  input[type="email"]:invalid+button{
    opacity: 0.5;
    cursor:not-allowed;
    pointer-events:none;
  }
    /* 如果输入的内容是email，则套用这个样式 */
  input[type="email"]:valid+button{
    opacity: 1;
    cursor: pointer;
    pointer-events: auto;
  }
</style>
<body>
  <input type="email">
  <button id="btn">按钮</button>
</body>
```

> [pointer-events](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)：**CSS 属性** 指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的目标。以我个人的理解，就是能让指定元素的事件被阻止。里面有多个属性值，但大部分只适用于`SVG`，只有两个值是可以使用在所有元素：
>
> 1. auto：默认，相当于允许元素的事件被触发；
> 2. none：元素永远不会成为鼠标事件的目标。但是如果这个元素的后代元素的这个属性的值指定为非none时，鼠标事件可以指向后代元素。相当于触发事件冒泡。

#### 对元素hover时显示提示信息

想要用户在鼠标指向某一个元素时显示信息，一般情况下我们可以使用`title`属性，但是效果不是十分理想，这时可以使用css3的attr属性将要展示的文字放在一个属性里。这时，当鼠标指向“伙计”时，就会展示`data-title`里面的内容。

```html
<!-- html -->
<style>
span[data-title] {
    position: relative;
  }
  span[data-title]:hover:before {
    content: attr(data-title);
    position: absolute;
    top: 150%;
    left: 50%;
    width: 50px;
    white-space: nowrap;
    background: #09f;
    padding: 4px;
    border-radius: 2px;
  }
</style>
<p>你好啊,<span data-title="展示出来的内容">伙计</span></p>
```

