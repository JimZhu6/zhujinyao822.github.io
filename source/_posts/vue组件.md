---
title: vue小记（组件间的信息传递）
categories: 学习笔记类
copyright: true
abbrlink: 50c39cd3
date: 2018-04-22 20:18:29
---

### vue组件的定义

​	理解为相当于模块，在一个页面上可存在多个组件（模块）

### vue组件的好处

- 便于分工，利于合作
- 代码的复用性强，可维护性强

<!--more-->

### vue组件的创建与使用

> 创建组件的代码要编写在声明vue实例代码的前面

#### 通过Vue.exten()方法和Vue.component()方法创建

​	Vue.exten()方法会返回一个创建组件的构造函数，包含一个参数，是组件的**配置项**

```javascript
var NewAssembly =Vue.extend({
	template:`<div>hello world</div>`
})
```



​	Vue.component()方法是利用上面得到的构造函数去创建**实例对象**。包含两个参数：**组件的名称**和**组件的构造函数**

```javascript
Vue.component("MyAssembly",NewAssembly)
```

#### 直接通过Vue.component()方法创建（推荐）

```javascript
Vue.component("MyAssembly",{
	template:`<div>hello world</div>`
	})
```

#### 通过template标签创建

​	在vue的监管范围以外的地方编写template标签并编写内容，需要绑定id

```html
<template id="assembly">
	<div>这是利用template创建的组件的内容</div>
</template>
```

​	绑定该组件(通过id)

```javascript
Vue.component("MyAssembly",{
  template:"#assembly"
})
```

#### 通过script标签创建

​	创建script标签并编写内容，需要绑定id，注意需要添加**type属性**

```html
<script type="x-template" id="assembly">
	<div>这是利用script创建的组件的内容</div>
</script>
```

> **注意：无论通过哪种方式创建组件，组件内模板只能存在一个根节点**

#### 组件的使用

​	在vue监管的html代码里直接使用**自定义的组件名**（首字母大写）作为**标签名**。

> 注意：标签里不能存在大写字母，如组件名里有大写字母，需要转换小写并且在前面在“-”。首字母直接小写

```html
<div id="app">
  <my-assemnly></my-assemnly>
</div>
```

### 在组件里创建子组件

​	在父组件使用components属性，在里面指定子组件的名字，子组件的语法和父组件的写法相同

```javascript
 Vue.component('BigBox', {
    template: `
    <div>
      父盒子 
      <box-son></box-son>
    </div>
  `,
    components: {
      boxSon: {
        template: `
        <div></div>
      `
      },
    }
  })
```

### 在组件内使用指令

> 组件里创建的data，methods等属性只能在对应的组件内调用，其他地方无法调用

#### 在组件内使用data属性

> 在组件内，为了防止多个组件公用同一个数据，所以data属性的格式必须是函数，并且将其键值对通过return返回

```javascript
data(){
  return{
    msg:'hello world'
	}
}
```

### 组件间传递信息

#### 父传子

- 在子组件中定义一个专门接收从父组件传递过来的数据的容器：props


```javascript
components: {
      boxSon: {
        template: `
        <div>这是子代盒子:{{name}}</div>
      `,
      props: ["name"]
      }
```

- 通过v-bind指令，在父组件的模板里的子组件标签动态绑定属性（子组件容器的名字=父组件data里声明的名字）
- 在子组件里吧props里的数据用插值表达式取出来

![父传子.png](https://i.loli.net/2019/03/11/5c866524a4ae1.png)

```javascript
Vue.component('boxC', {
    template: `
    <div>这是父代盒子：{{sonName}}
      <box-son v-bind:name="sonName"></box-son>
    </div>
  `,
    data() {
      return {
        sonName: "大明",
      }
    },

    components: {
      boxSon: {
        template: `
        <div>这是子代盒子:父盒子传递过来{{onename}}</div>
      `,
        props: ["name"],
        data(){
          return{
            onename:this.name
          }
        }
      }
    }
  })
```



> props里的值不能直接修改，可以通过data来缓存，然后再修改data里对应的值

```javascript
template: `
        <div>这是子代盒子:父盒子传递过来{{onename}}</div>
      `,
        props: ["name"],
        data(){
          return{
            onename:this.name
          }
        }
```

#### 子传父

- 子组件传递数据给父组件需要在子组件用到$emit()方法，需要借助一个函数的包装放置在methods属性里面

```javascript
methods: {
            tellUp() {
              //第一参数：自定义事件名称；第二参数：需要传递给父组件的值的声明
              this.$emit('giveUp', this.text)
            }
          }
```

- 在父组件里的子组件标签通过v-on指令去监听子组件传递上来的事件名称，监听到之后，可以执行一个通过参数传递子组件数据的函数
- 通过这个函数的默认参数，取到从子组件传递过来的值，然后再在data里定义一个变量接收传过来的值

![子传父1.png](https://i.loli.net/2019/03/11/5c86652606e45.png)

```javascript
Vue.component('boxC', {
      template: `
    <div>
      这是父盒子：{{mysonname}}
      <box-son @giveUp="getUp"></box-son>
    </div>
  `,
      data() {
        return {
          mysonname: '',
        }
      },
      methods: {
        getUp(name) {
          this.mysonname = name
        }
      },

      components: {
        //子
        boxSon: {
          template: `
        <div>这是子盒子:{{text}}
            点击传递给父组件<button @click='tellUp'>按钮</button>
        </div>
      `,
          data() {
            return {
              text: "小明"
            }
          },
          methods: {
            tellUp() {
              this.$emit('giveUp', this.text)
            }
          }
        }
      }
    });
```



#### 兄弟组件之间的传递

- 兄弟组件之间传递信息需要用到**事件总线** ，事件总线是一个空的vue实例，将来作为兄弟组件信息传递的桥梁

```javascript
var evtBus = new Vue()
```

- 在需要传递出去数据的兄弟元素里的methods属性通过事件总线.$emit一个事件，并携带上参数

```javascript
methods: {
            giveBro() {
              evtBus.$emit('emitGiveBro', this.twoname);
            }
          }
```

- 在兄弟元素中，通过mounted钩子监听其他兄弟元素发射过来的事件名和值；
- 监听兄弟元素传递过来的值需要借助于事件总线的$on()方法

> $on()方法有两个参数：1.监听事件的名称。2.函数，带一个默认参数，接收传递过来的值

- 获取到值后可以在data中声明一个变量来存储取到的值，再渲染到页面上

![兄弟之间的传递.png](https://i.loli.net/2019/03/11/5c8665264755c.png)

```javascript
var evtBus = new Vue();//创建一个事件总线
    Vue.component('bigBox', {
      template: `
    <div>
      大盒子
      <box-one></box-one>
      <box-two></box-two>
    </div>
  `,
      components: {
        //子
        boxOne: {
          template: `
        <div>子盒子one，下面的盒子叫{{name}}</div>
      `,
          data() {
            return {
              name: '???'
            }
          },
          mounted() {
            evtBus.$on('emitGiveBro', name => {
              this.name = name
              console.log(name);
            })
          }
        },
        boxTwo: {
          template: `
        <div>子盒子two,我是{{twoname}}
          <button @click="giveBro">按钮</button>
        </div>
      `,
          data() {
            return {
              twoname: "小红"
            }
          },
          methods: {
            giveBro() {
              evtBus.$emit('emitGiveBro', this.twoname);
            }
          }
        },
      }
    });
```

