<!--
 * @Date: 2021-03-30 16:59:33
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-26 10:30:40
-->
### JavaScript
- ES6
   - Promise
     - finally: 不管promise的状态是成功还是失败都会进入finally的回调函数
     - all: 支持传入一个promise数组，当全部都fulfilled才会进入then方法，如果有一个rejected状态就进入catch
     - resolve\reject: 
     - race: 支持传入一个promise数组，当一个状态改变的时候race的状态就会改变，率先改变的promise的返回值会传给race的回调函数
     - allSettled: ES2020新加入，类似all，但是他是所有promise全部resolve或者reject才改变状态
     - any: ES2021引入，支持传入一个promise数组，参数中有一个实例变为fulfilled就会变为fulfilled状态，所有实例变成rejected， any会变成rejected状态
   - proxy
   - Reflect
   - Map
   - Set
   - Symbol
   - let const
   - 箭头函数
   - ES Module

- 模块化
   - 为什么需要模块化，早期都是通过script标签引入js，当项目庞大时容易造成变量污染、依赖顺序问题出错、代码多不好维护
   - CommonJS规范
     - 主要在node中使用，通过一个module.exports导出一个对象，或者通过多个exports导出多个方法，通过require引入
     - 支持动态引入，可以在代码中require
     - 导出的值是拷贝的，可以修改，值变化不会引起导出的值变化
   - ES Module
     - ES6语法，通过export default导出一个对象通过import引入一整个对象，可以更换名称，或者通过多个export导出多个方法通过import解构导入，不能更换函数名
     - 只能生命在文件最顶部，不能动态导入
     - 导出的是值的引用，值变化的时候导出的值也会变化；而且是只读状态的，修改导出的值会报错

- 三种加载模式
  - 正常模式：js加载和执行会阻塞dom渲染
  - async：异步加载，加载完会立即执行
  - defer：异步加载，延迟执行，等待整个文档渲染完成domcontentLoaded执行完之后才会执行js
  
- 几种基本类型
  - null
  - undefined
  - number
  - string
  - boolean
  - symbol
     - 相同的symbol值是不相等的，所以作为对象属性的唯一标识符出现，当需要给不确定对象添加属性时可以使用symbol作为对象的key值
  - bigInt（数字后+n）
     - js中所有数字都是以64位浮点数的形式存储，造就number类型只能安全表示+-(2 53 - 1)以内的数字，超出这个范围的数字会失去精度
     - 创建：数字后+n 或者bigInt构造函数
     - 特点：不能使用+运算、不能隐式转换为number类型、不能在Math的属性方法，这些需要number类型、而且浏览器支持度也不好

- new 操作符
  1.  创建一个空对象 obj
  2.  设置 obj 原型链，指向构造函数的原型
  3.  调用构造函数方法，this 指向 obj（继承方法和属性）
  4.  判断构造函数方法的返回值是不是引用值，是则返回这个引用值，不然返回 obj
  ```
      function newFn(fn, ...args){
          let obj = {}
          Object.setPrototypeOf(obj,fn.prototype)
          let result = fn().apply(obj, args)
          return result instanceof Object ? result : obj
      }
  ```

- 原型/构造函数/实例
  - 原型是一个对象，有 constructor 属性指向构造函数
  - 构造函数有 prototype 属性指向原型对象，可用 new 操作符生成原型对象的实例
  - 实例是使用 new 操作符调用构造函数返回的对象，拥有**proto**属性指向原型对象

- 原型链：js 调用对象属性和方法是一个查找过程，先从自身属性方法中查找，没有就去原型对象中查找，再没有就去原型对象的原型对象查找，直到找到 Object 的原型对象；这个过程就是原型链

- 类型判断
  typeof 判断基本类型，除 null 外都可以（null会判断成object，js中二进制前三位若都是0就会判断为object，null的二进制都为0），判断引用类型时除了 function 都返回 Object 不准确若判断引用类型需要使用 instanceof
  Object.prototype.toString

- 类型转换
  - ToPrimitive(obj,type)将对象转为原始值，转为 String 类型则先调用 toString 在调用 valueOf，转为 Number 类型则相反
  - 在使用运算符时会发生隐式转换
    - \*，/，-，%都是转化为数值再比较
    - +规则
      - 数字 + 字符串 = 字符串
      - 前面加 + 会转化为 Number 类型
      - 数字 + 布尔值/null = 数字
      - 数字 + 对象， 优先调用 ValueOf 之后调用 toString
      - 数字 + undefined = NaN

- == 和 === 的区别
  - === 先判断类型再判断值是否相等
  - == 在判断时若类型相同会进行判断值，若类型不同会进行类型转换在进行判断；类型转换的规则如下
    - 首先判断是不是在比较 null 和 undefined，是的话返回 true
    - 判断是不是 String 和 Number，将 String 转为 Number
    - 判读是否有一方为 Boolean，将 Boolean 转为 Number 再判断
    - 判断是否有一方为对象，且另一方是 Symbol、Number、String；将对象转为 String 类型判断“[object Object]”

- 执行上下文
  - 可以理解为一个对象，包含四部分
    - 变量环境，保存变量提升声明的变量（var 和函数）
    - 词法环境，保存块级作用域变量，是一个栈结构，每一个块结构中的变量都会放到栈顶，使用完会出栈。
    - this 指向，保存 this 指向的对象
    - 作用域链，保存上下文外部指向
  - 类型
    - 全局执行上下文
    - 函数执行上下文
    - eval 执行上下文
  - 执行过程
    - 创建全局上下文
    - 全局上下文自上而下执行，遇到函数调用时将函数执行上下文放入栈顶
    - 执行函数上下文，执行完函数上下文出栈
    - 继续执行全局上下文

- 事件循环
  JS 整个脚本会作为一个宏任务执行，执行过程中遇到 setTimeout 会将其中函数放入宏任务队列，
  promise.then 会放入微任务队列中；执行完本次宏任务会清空微任务队列，之后再执行下一个宏任务；
  - 宏任务创建
    - script 标签
    - setTimeout
    - setInterval
    - setImmediate
  - 微任务创建
    - promise.then
    - promise.nextTick
    - MutationObserver（监听 dom 树发生变化）

- 事件冒泡/捕获
  - 事件委托是利用事件冒泡的特性。将底层元素的响应事件委托到上层元素，因为事件冒泡特性是目标元素触发响应事件后会逐层触发上层的响应事件直到 document；如果一个 div 下面有 100 个按钮，如果都绑定点击事件内存消耗会比较大，可以把点击事件绑定在父级 div 上；事件冒泡和事件捕获通过 addEventListener 的第三个参数控制，true 是捕获，false 是冒泡，默认是 false；
  - 阻止冒泡
  ```
  if(ev && ev.stopPropagation) {
    //非IE浏览器
    ev.stopPropagation();
  } else {
    //IE浏览器(IE11以下)
    ev.cancelBubble = true;
  }
  ```

- 浅/深拷贝
  - 浅拷贝，只复制了指向堆中对象的地址，在修改属性时会修改原对象
  - 实现深拷贝的方式
    - JSON.parse(JSON.stringify())
    - 递归调用
    ```
    function deepCopy(obj) {
       let result = obj instanceof Array ? [] : {}
       if(typeof obj=='object'&&obj!='null') {
          for(let i in obj) {
             result[i] = typeof obj[i]=='object'&&obj[i]!='null' ? deepCopy(obj[i]) : obj[i]
          }
       }else {
          result = obj
       }
       return result
    }
    ```
    - lodash

- this
  - 直接调用指向 window
  - 上下文对象调用指向对象
  - call、bind、apply 改变指向
  - new 操作符调用，指向创建的实例
  - 箭头函数没有 this，和父级作用域的 this 指向一样
  - 匿名函数永远指向window，所以回调函数中拿不到vue实例

- 箭头函数特点
  - 本身无 this，this 继承上层结构体
  - 不可使用 arguments 对象，该参数在箭头函数中不存在，可以使用 rest 参数...
  - 不能使用 apply、bind、call 方法改变 this 指向
  - 不可以使用 yield 命令，不能用作 Generator
  - 不能作为构造函数

- 闭包
  - 使函数能够访问创建它的那个执行上下文的变量和函数，并且即使声明它的执行上下文消失了也可以引用；当创建闭包的执行上下文入栈时，执行过程中在内部有返回函数中调用了其中的变量 js 会认为是闭包，并在堆中创建 closure 对象存放这些被引用的变量，在创建闭包的执行上下文出栈时这个对象也不会被垃圾回收清除；直到它失去引用才会在下次垃圾回收过程中清除；所以滥用闭包会导致内存泄漏
  - 通常以返回函数的方式出现；
  - 应用
    - 封装私有变量，回调函数，其实函数都是闭包

- 基本类型和引用类型的存储
  - 基本类型数据被保存在执行上下文的执行栈中，而引用数据存储在堆中，执行栈中保存的只是执行堆中数据的一个地址；
  
- 继承
  - 寄生组合继承
  ```
    function Parent() {
      this.name = 'parent'
    }
    function child() {
      Parent.call(this)
      this.type = 'child'
    }
    child.prototype = Object.create(Parent.prototype)
    child.prototype.constructor = child
  ```

- 作用域
  - 指程序中定义变量的区域，该位置决定了变量的生命周期；作用域就是变量和函数的可访问范围，控制着变量的可见性和生命周期；块级作用域和函数作用域和全局作用域
  
- 作用域链
  - 当获取一个对象时先从当前作用域查找，找不到会去父级作用域查找，直到全局作用域

- 变量提升
  - 变量创建分为声明和赋值
  - JS引擎将var变量和函数的声明部分提升到代码开头的行为，实际不是将代码位置移到头部，而是在编译过程中将变量和函数的声明放到执行上下文中的变量环境中，并对变量以undefined初始化的过程；
     - 一段代码编译过后会包含执行上下文部分（词法、变量环境、作用域链、this指向）和可执行代码部分（除去提升部分的代码）

- 暂时性死区

```
function test() {
   let result = '111'
   {
      console.log(result)
      let result = '222'
   }
}
test()
//这段代码执行结果
   VM23:4 Uncaught ReferenceError: Cannot access 'result' before initialization
    at test (<anonymous>:4:19)
    at <anonymous>:8:1
```

在 test 函数内部执行到块极作用域时，在函数执行上下文的词法环境栈中，result 的创建已经入栈但还没有赋值，此时访问变量会产生暂时性死区

- 事件流：DOM(文档对象模型)结构是一个树形结构，当一个HTML元素产生一个事件时，该事件会在元素结点与根节点之间按特定的顺序传播，路径所经过的节点都会收到该事件，这个传播过程可称为DOM事件流。
   - 过程
      - 事件捕获（html-目标节点）、目标阶段（捕获的结束，冒泡的开始）、事件冒泡（目标节点-html）
   - 事件
      - 鼠标事件（点击、按下、松开、移入、移出）
      - 焦点事件
      - 滚轮事件
      - 键盘事件
   - 阻止冒泡
      - event.stopPropagation()
      - 事件触发时返回false
      - 判断target和currentTarget是否相同

- apply bind call的区别
  - 都能改变this指向，apply支持传入的是一个参数数组，call支持传入的是一个或多个参数，call/apply是改变了this上下文后执行了函数，bind则是返回了fun的拷贝，并且指定了this指向，但是没有执行；