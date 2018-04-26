---
title: "浅谈vue路由"
categories: "学习笔记类"
date: 2018-4-26 10:47:03
copyright: true
---

> vue中路由的作用就像是在html中的tap栏切换，根据路由规则去加载不用的组件

<!--more-->

​	依赖插件：[vue-router](https://router.vuejs.org/zh-cn/) 

### 创建路由流程

- 创建路由组件

```javascript
 //创建路由组件
  var index =Vue.componrnt('Index',{
    template:`<div></div>`
  })
```

- 声明一个VueRouter存放路由的参数

参数说明：name：用于声明该路由参数名；path：路由的路径，前面要加/；component：路由的名字（要与声明此路由的名字相同）；

```javascript
//存放路由参数
 var routerSetting =new VueRouter({
   routes:[
     {name:'index',path:'/index',component:index}
   ]
 })
```

- 在vue实例中增加router属性

```javascript
var vm = new Vue({
        el: '#app',
        //router:*声明路由参数的名字*
        router:routerSetting,
        data: {
        }
      })
```

- 在vue管辖的范围内通过`router-view`渲染组件

```html
<div id="app">
    <!-- 渲染组件 -->
    <router-view></router-view>
</div>
```

- 对于多路由跳转，可以使用`router-link`标签，里面的`to` 属性能控制跳转的路径

```html
<p>
  <router-link to="/page">跳转到分页</router-link>
</p>
```

​	这时就能完成了一个简单的路由跳转了。

### 其他参数

#### 路由嵌套路由

在需要嵌套的路由的参数设置里增加`children`属性，该属性是一个数组，里面放置一个你要嵌套的子路由的参数

```javascript
{
        name:'page134',
        path:'/page1',
        component:page1,
        children:[
          {name:'son',path:'son',component:son}
        ]
}
```

**注意：在`children`属性里的path是不用加/的**

声明一个子路由实例，然后在路由的模板里增加`riuter-view`标签用作渲染即可。

```javascript
var page1 = Vue.component('page123',{
      template:`<div>
                  页面1
                  <router-view></router-view>
                </div>`
    });
//子路由
    var son =Vue.component('son',{
      template:`<div>{{msg}}</div>`,
      data () {
        return {
          msg:'子路由盒子'
        }
      },
    });
```

#### 路由重定向

定义一个参数设置，通过`redirect`指向要跳转的页面。path设置为*时当点击的链接没有定义的时候，都会跳转到指定页面

```javascript
{name: 'default', path: '*', redirect: '/index' }
```

