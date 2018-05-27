---
title: "浅谈vue组件的生命周期"
categories: "学习笔记类"
date: 2018-4-24
copyright: true
---

![vue生命周期](/img/vue生命周期/lifecycle.png)

<!--more-->

[资料参考：Vue2.0 探索之路——生命周期和钩子函数的一些理解](https://segmentfault.com/a/1190000008010666)

vue组件生命周期分八个阶段：

1. beforeCreate----实例初始化，组件属性运行计算之前；
2. created----实例创建之后；
3. beforeMount----模板挂载之前；
4. mounted----模板挂载之后；
5. beforeUpdate----数据更新时，dom重新渲染之前；
6. updated----数据更新时，dom重新渲染之后；
7. beforeDestroy----实例被摧毁之前，在这一步，实例的组件仍可用；
8. destroyed----实例被摧毁后，所有的子组件，事件都不再受vue实例控制。

详细流程函数：

```javascript
 beforeCreate: function () {
                // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 配置之前被调用。
            },
            created: function () {
                // 在实例创建完成后被立即调用。在这一步，
                //实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。
                //然而，挂载阶段还没开始，dom还未生成，$el 属性目前不可见。
            },
            beforeMount: function () {
                // 模板编译挂载之前调用，首先会判断对象是否有el选项。如果有的话就继续向下编译，
                //如果没有el选项，则停止编译，也就意味着停止了生命周期，直到在该vue实例上调用vm.$mount(el)。
                //接着判断是否有template属性，有的话就以template属性中的值作为模板，如果没有的话，就以el属性指向的作为模板。
                //这里会生成vm.$el。标签里面的指令还未被解析
            },
            mounted: function () {
                // 模板编译挂载之后调用，vm.$el替换掉el指向的dom
            },
            beforeUpdate: function () {
                // 数据变更导致虚拟DOM重新渲染之前调用

            },
            updated: function () {
                // 数据变更导致虚拟DOM重新渲染之后调用
            },
            beforeDestroy: function () {
                // 实例销毁之前调用，在这一步，实例完全可用
            },
            destroyed: function () {
                // vue实例指向的所有东西解除绑定，包括watch、事件、所以的子组件，后续就不再受vue实例控制了
            },
```

