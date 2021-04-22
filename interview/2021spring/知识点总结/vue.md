<!--
 * @Date: 2021-03-30 16:57:37
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-18 16:13:53
-->
### 2.0
- vue执行过程
   - init阶段：初始化实例中data、methods、props等初始化生命周期函数，对data中数据进行数据劫持，实现响应式
   - $mounte阶段：挂载阶段
   - complier阶段：
      - parse阶段：利用正则解析template模版中的指令、class、style等数据，形成AST
      - optimize阶段：标记静态节点，后面新旧VNode patch的过程中diff算法会跳过静态节点，减少了比较过程，对patch进行了优化
      - generate阶段：将AST转化成render function字符串的过程；最后得到的结果是render的字符串和staticRenderFns（存放静态节点）中
   - 响应式部分，init阶段进行了数据劫持和依赖收集
      - 渲染render function时会读取对象的值，触发get，会讲watcher放到订阅者Dep的subs中
      - 修改对象时触发set，触发dep中的通知方法，将subs中的watcher执行update来更新视图生成新的VNode
      - 将生成的新VNode和老的VNode进行patch，经过diff算法得出差异，将差异对应的dom进行修改

- 响应式原理
  Vue 响应式利用了数据劫持和发布订阅模式实现；描述一下大体流程，首先当 Vue 实例创建时，会实例化一个观察者包含视图更新方法（同时将 Dep.target 全局变量指向自己），遍历 data 中数据，
  对每个对象的每个属性使用 Object.defineproperty 进行劫持，get 属性用于依赖收集，
  实例化订阅者（包含观察者数组用来存放观察者，以及通知方法触发观察者中的数据更新方法）将观察者存放到订阅者中，
  set 属性将调用订阅者中的通知方法，通知观察者视图更新；这样在数据更新时，视图即可更新；创建新的 virtualDom 树，diff 对比进行对应地方更新；

- 双向绑定原理
  - model-view；采用数据劫持结合发布-订阅模式,通过 Object.defineproperty 来劫持各个属性的 setter,getter,在数据变动时发布消息给订阅者,触发响应的监听回调；
  - view-model，v-model 语法糖；Vue 通过对 view 输入事件监听修改 model；

- 生命周期
  - beforeCreate
    此时获取不到 data、props 以及 methods，这些都在 init 阶段；
  - created
    能够获取到 data、props 和 methods 中的数据，但组件还没有挂载是看不到的；可用于调用接口；
  - beforeMount
    页面已经编译了但还没有渲染，已经生成了 VDOM
  - mounted
    页面渲染完成
  - beforeUpdate
    data 中数据改变，渲染页面之前
  - update
    data 中数据改变，页面渲染完成时调用

- 如何传值
  - 父子
    - 通过 props 传值，子组件通过\$emit 调用父组件方法传值
    - $parent、$children
    - v-model
    - .sync 修饰符
  - 兄弟
    - $parent.$children
  - 多层次
    - provide/reject,父级组件通过 provide 生命的属性子组件可通过 reject 访问
    ```
    // 父组件 A
    export default {
       provide: {
          data: 1
       }
    }
    // 子组件 B
    export default {
       inject: ['data'],
       mounted() {
          // 无论跨几层都能获得父组件的 data 属性
          console.log(this.data) // => 1
       }
    }
    ```
  - 任意组件
    - eventbus，注册一个自定义指令 EventBus，通过$emit和$on 发送和监听数据，在组件销毁时要调用\$off 销毁监听
    - vuex

- watch 和 computed 区别
  - computed 计算属性，是依赖于属性的，会有缓存，再依赖的属性值没有变化时调用会直接返回之前的结果，不会执行函数；经常与 VUEX 一起使用，将要获取的 store 中的数据放在 computed 中，值变化时会更新页面
  - watch，监听属性变化，有新旧两个值，可以在变化时添加业务逻辑；对象的深层次监听需要设置 deep
  
- v-show 和 v-if 区别
  - v-show 切换 display:none
  - v-if 直接创建或删除 dom，为 false 时不会渲染

- nextTick
  在 dom 重新渲染之后触发回调函数，vue 更新 dom 是异步操作，当实例 watcher 被触发时会创建一个队列，在下次事件循环中触发；若同一个 watcher 在一个事件循环中被触发多次，则只会被加入到队列中一次；所以在修改数据导致页面重新渲染时，页面不会立即渲染，若想在渲染后进行业务操作就需要用到 nextTick，它支持传入一个函数，这个函数会被存到队列中（使用 promise、setTimeout、setImmediate），在下一次事件循环中会执行所有的这些函数；
```
   this.$nextTick(function () {
        console.log(this.$el.textContent) // => '已更新'
   })
```

- history 和 hash
  前端路由的核心是改变视图的同时不会向后端发出请求，实现页面的无刷新跳转
  - hash 有个#，在请求服务器时不会带上#，丑一点，但是省事，不需要服务器配置。原理为路由对象将不同 hash 值的回调函数存储，监听 hashChange 事件调用不同 hash 值下的回调函数切换视图；
  - history 借助 html5 的 History API，通过 pushState 向浏览器添加历史记录，replaceState 修改历史记录，所以不会触发刷新；
    缺点在点击刷新时会给服务器发送请求，造成 404，需要配置 404 时指向根目录

- diff

- Virtual Dom
  render fucntion会被转为为VNode节点，Virtual Dom由VNode作为基础的树，用对象属性来描述节点，就是一层对真实dom的抽象，最终可以通过一系列操作映射到真实环境上。由于它基于js对象，所以有了跨平台的能力，也就有了跨平台框架；VNode是一个类，通过它的构造函数生成一个VNode节点，用参数表述节点，包含tag描述标签，text描述文字，children存放子VNode对象，directives放指令、class放class
### 3.0
- Vue3
  - 响应式的区别
    - 基于浏览器对es6中的proxy的全面支持，vue3把Object.defineProperty实现的响应式改为了proxy，变的更加灵活，以前dp只能遍历data创建时的属性劫持，所以对对象的属性新增删除以及对直接改变数组下标的方式监听不到，只能通过对数组的push 等方法的重写实现不完全的响应式；而proxy则是在对象外层增加一层拦截，可以对外界访问进行过滤和改写；set get拦截对对象属性的新增和修改；ownKeys拦截对象属性遍历比如for in Object.keys；deleteProperty拦截对属性的删除；has操作符拦截判断属性是否存在（'a' in obj）
    - 性能方面有所提升，不像vue2会对data中对象所有属性逐层遍历数据劫持，而是先对最外层定义响应式，当真正获取深层属性时才对深层属性定义响应式
  - 新属性
    - temeplate包含多个根标签
    - css部分可以使用变量
    - 组合式api
    - 生命周期去掉了beforeCreate和created，因为setup是在这个时候执行的，beforeMounted mounted beforeupdate updata beforeUnmounted unmounted依然保留，加了on，使用在setup函数中；
  - 组件渲染大数据的优化方法