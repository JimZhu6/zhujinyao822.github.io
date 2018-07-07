---
title: "常用css/css3代码段"
categories: "资料类"
date: 2018-7-1 16:23:08
---

下面是一些常用的css代码片段，仅供参考

<!--more-->

效果展示测试：[RunJS](https://runjs.cn/code)

### a标签基于不同格式使用不同样式提示

  为了更容易知道链接的目标，有时你想让一些链接看起来和其它的不同。下面的片段在文本链接前添加一个图标，对不同的资源使用不同的图标或图片

```css
a[href^="http://"]{
    padding-right: 20px;
    background: url(external.gif) no-repeat center right;
}
/* emails */
a[href^="mailto:"]{
    padding-right: 20px;
    background: url(email.png) no-repeat center right;
}

/* pdfs */
a[href$=".pdf"]{
    padding-right: 20px;
    background: url(pdf.png) no-repeat center right;
}
```

### 



###背景渐变效果

  `css`中最具诱惑的一个功能是能添加动画效果，除了渐变，你可以给背景色、透明度、元素大小添加动画。目前，你不能为渐变添加动画，但下面的代码可能有帮助。它通过改变背景位置，让它看起来有动画效果。

```css
button {
    background-image: linear-gradient(#5187c4, #1c2f45);
    background-size: auto 200%;
    background-position: 0 100%;
    transition: background-position 0.5s;
}    
button:hover {
    background-position: 0 0;
}
```





### 包裹长文本

  当遇到文本比容器长的时候，文本将会超出容器，这时，只需要添加两行`css` 即可调整文本在容器中的排序

```css
pre {
    white-space: pre-line;
    word-wrap: break-word;
}
```





### 制造模糊文本

  既然可以给盒子添加阴影`box-shadow`，那么文字也是可以添加阴影的

```css
.blurry-text {
   color: transparent;
   text-shadow: 0 0 5px rgba(0,0,0,0.5);
}
```





### 用css动画实现省略号动画

通过添加类的方式添加一段小动画，实现简单的加载状态效果，而不是使用gif图

```css
.loading:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ellipsis 2s infinite;
    content: "\2026"; /* ascii code for the ellipsis character */
}
@keyframes ellipsis {
    from {
        width: 2px;
    }
    to {
        width: 15px;
    }
}
```





##### 图片边框偏光

```css
img.polaroid {
    background:#000; /*Change this to a background image or remove*/
    border:solid #fff;
    border-width:6px 6px 20px 6px;
    box-shadow:1px 1px 5px #333; /* Standard blur at 5px. Increase for more depth */
    -webkit-box-shadow:1px 1px 5px #333;
    -moz-box-shadow:1px 1px 5px #333;
    height:200px; /*Set to height of your image or desired div*/
    width:200px; /*Set to width of your image or desired div*/
}
```





### css3全屏背景

```css
html { 
    background: url('images/bg.jpg') no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
```





##### 段落首字符大字

```css
p:first-letter{
    display: block;
    margin: 5px 0 0 5px;
    float: left;
    color: #ff3366;
    font-size: 5.4em;
    font-family: Georgia, Times New Roman, serif;
}
```





### 三角形列表项目符号

```css
ul {
    margin: 0.75em 0;
    padding: 0 1em;
    list-style: none;
}
li:before { 
    content: "";
    border-color: transparent #111;
    border-style: solid;
    border-width: 0.35em 0 0.35em 0.45em;
    display: block;
    height: 0;
    width: 0;
    left: -1em;
    top: 0.9em;
    position: relative;
}
```





### css固定页脚

```css
#footer {
    position: fixed;
    left: 0px;
    bottom: 0px;
    height: 30px;
    width: 100%;
    background: #444;
}
/* IE 6 */
* html #footer {
    position: absolute;
    top: expression((0-(footer.offsetHeight)+(document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight)+(ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop))+'px');
}
```





### IE6下PNG透明修复

```css
.bg {
    width:200px;
    height:100px;
    background: url(/folder/yourimage.png) no-repeat;
    _background:none;
    _filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/folder/yourimage.png',sizingMethod='crop');
}
/* 1px gif method */
img, .png {
    position: relative;
    behavior: expression((this.runtimeStyle.behavior="none")&&(this.pngSet?this.pngSet=true:(this.nodeName == "IMG" && this.src.toLowerCase().indexOf('.png')>-1?(this.runtimeStyle.backgroundImage = "none",
       this.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.src + "', sizingMethod='image')",
       this.src = "images/transparent.gif"):(this.origBg = this.origBg? this.origBg :this.currentStyle.backgroundImage.toString().replace('url("','').replace('")',''),
       this.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.origBg + "', sizingMethod='crop')",
       this.runtimeStyle.backgroundImage = "none")),this.pngSet=true));
}
```





### input输入边框动画

```css
input[type=text], textarea {
    -webkit-transition: all 0.30s ease-in-out;
    -moz-transition: all 0.30s ease-in-out;
    -ms-transition: all 0.30s ease-in-out;
    -o-transition: all 0.30s ease-in-out;
    outline: none;
    padding: 3px 0px 3px 3px;
    margin: 5px 1px 3px 0px;
    border: 1px solid #ddd;
}
input[type=text]:focus, textarea:focus {
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
    padding: 3px 0px 3px 3px;
    margin: 5px 1px 3px 0px;
    border: 1px solid rgba(81, 203, 238, 1);
}
```





### css悬浮文本提示

  提示文字为对应的a标签内的`data-tooltip`属性的值。

```css
a { 
    border-bottom:1px solid #bbb;
    color:#666;
    display:inline-block;
    position:relative;
    text-decoration:none;
}
a:hover,
a:focus {
    color:#36c;
}
a:active {
    top:1px; 
}
/* Tooltip styling */
a[data-tooltip]:after {
    border-top: 8px solid #222;
    border-top: 8px solid hsla(0,0%,0%,.85);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    content: "";
    display: none;
    height: 0;
    width: 0;
    left: 25%;
    position: absolute;
}
a[data-tooltip]:before {
    background: #222;
    background: hsla(0,0%,0%,.85);
    color: #f6f6f6;
    content: attr(data-tooltip);
    display: none;
    font-family: sans-serif;
    font-size: 14px;
    height: 32px;
    left: 0;
    line-height: 32px;
    padding: 0 15px;
    position: absolute;
    text-shadow: 0 1px 1px hsla(0,0%,0%,1);
    white-space: nowrap;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
}
a[data-tooltip]:hover:after {
    display: block;
    top: -9px;
}
a[data-tooltip]:hover:before {
    display: block;
    top: -41px;
}
a[data-tooltip]:active:after {
    top: -10px;
}
a[data-tooltip]:active:before {
    top: -42px;
}
```





### 灰色圆角按钮

```css
.graybtn {
    -moz-box-shadow:inset 0px 1px 0px 0px #ffffff;
    -webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;
    box-shadow:inset 0px 1px 0px 0px #ffffff;
    background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ffffff), color-stop(1, #d1d1d1) );
    background:-moz-linear-gradient( center top, #ffffff 5%, #d1d1d1 100% );
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#d1d1d1');
    background-color:#ffffff;
    -moz-border-radius:6px;
    -webkit-border-radius:6px;
    border-radius:6px;
    border:1px solid #dcdcdc;
    display:inline-block;
    color:#777777;
    font-family:arial;
    font-size:15px;
    font-weight:bold;
    padding:6px 24px;
    text-decoration:none;
    text-shadow:1px 1px 0px #ffffff;
}
.graybtn:hover {
    background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #d1d1d1), color-stop(1, #ffffff) );
    background:-moz-linear-gradient( center top, #d1d1d1 5%, #ffffff 100% );
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#d1d1d1', endColorstr='#ffffff');
    background-color:#d1d1d1;
}
.graybtn:active {
    position:relative;
    top:1px;
}
```





### 带css3特色的横幅

```css
.featureBanner {
    position: relative;
    margin: 20px;
	padding-left:50px;
}
.featureBanner:before {
    content: "11";
    position: absolute;
    top: 5px;
    left: -8px;
    padding-right: 10px;
    color: #232323;
    font-weight: bold;
    height: 0px;
    border: 15px solid #ffa200;
    border-right-color: transparent;
    line-height: 0px;
    box-shadow: -0px 5px 5px -5px #000;
    z-index: 1;
}
.featureBanner:after {
    content: "";
    position: absolute;
    top: 35px;
    left: -8px;
    border: 4px solid #89540c;
    border-left-color: transparent;
    border-bottom-color: transparent;
}
```



  **本文原帖地址：**[实用的60个CSS代码片段](http://blog.poetries.top/2016/08/13/%E5%AE%9E%E7%94%A8%E7%9A%8460%E4%B8%AACSS%E4%BB%A3%E7%A0%81%E7%89%87%E6%AE%B5/)

