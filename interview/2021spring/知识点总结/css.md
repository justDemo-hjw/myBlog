<!--
 * @Date: 2021-03-30 17:00:28
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-23 11:56:32
-->
### CSS
- CSS3新特性
  - 过渡transition
  - transform
  - 选择器比如nth-child、last-chlid
  - 阴影
  - 边框
  - 文字超出显示省略号：
    overflow:hidden;
    white-space:nowrap; 
    text-overflow:ellipsis;
  - flex布局
  - 媒体查询
  
- CSS 的引用
  link 标签和@import
  - 从属关系，link 不仅可以加载 css 还可以设置 RSS，rel 连接属性等，而@import 只能用来导入 css 样式
  - 加载顺序，link 随 dom 加载，@import 则在页面加载完成之后加载
  - dom 操作，link 导入的样式可通过 js 修改，@import 不可
  - 兼容性，@import IE5 之上可用，link 则都支持

- CSS 的优先级
  - !important>行内样式>id 选择器>类选择器、属性选择器、伪类选择器>标签选择器、伪元素选择器>通配符选择器、子选择器、相邻选择器、同胞选择器>继承属性>默认
  - 行内样式1000 id100 类10 标签选择器1 通配符选择器0
  - 比较过程，先比较同级的大小，不同直接得出结果，下一级的再多优先级也是上一级的有效，比如一个id选择器是100那么11个类选择器也吵不过id选择器的优先级，所以要同级比较不能把所有的权重加起来比较

- 盒模型
  - content-box:宽高包含内容部分大小
  - border-box:宽高包括内容部分内边距和内边框的大小
  - padding-box:宽高包含内容部分和内边距大小
  - margin-box:宽高包含内容内边距内边框和外边距

- display=none 和 visibility=hidden 的区别
  display 不占用文档流，visibility 占用文档流
  继承，父类 display=none 子类必被隐藏，而父类 visibility 设置 hidden，子类设置 visible 就会显示出来
  css 计数器，dis 不会被计数，vis 会
  dis 触发回流，vis 不触发回流

- 隐藏元素的方法
  - display=none
  - 脱离文档流，设置位置离开显示区域
  - visibility=hidden

- position 属性
  - static，正常文档流，默认值；
  - relative，相对布局，通过 top、bottom、left、right 可相对元素在文档流中的位置移动；不脱离文档流；
  - absolute，绝对布局，通过 top、bottom、left、right 可相对 position 属性不为 static 的父元素在文档流中的位置移动；脱离文档流；
    - 未配置top等位置属性时脱离文档流的位置和它本身无定位属性的位置和display值有关
    - 如果未设置absolute时是内联元素，则和内联元素在同一行显示，若是块级元素则跨行显示
  - fixed，绝对布局，通过 top、bottom、left、right 可相对浏览器窗口的位置移动；脱离文档流；

- BFC（什么是 BFC，BFC 的特性，BFC 的创建，BFC 的应用）
  - 什么是 BFC
    - 块级格式化上下文，一个 BFC 包含它的所有子元素但不包含创建了新 BFC 的子元素的子元素
  - BFC 的创建
    - html 标签
    - float!==none
    - position（fixed、absolute）
    - overflow!==visible（hidden、scroll、auto）
    - display inline-block flex、grid、flow-root（专门用来设置BFC的）
  - BFC 的特性
    - 同一 BFC 下的块级元素垂直排列
    - 同一 BFC 下的相邻块级元素垂直外边距重叠
    - BFC 中高度计算包含浮动元素的高度
    - BFC 不会与浮动元素重叠
    - 一个 BFC 下的子元素左边 margin 和包含块左边缘（根据盒子类型，conten-tbox是content边缘、border-box是border的边缘、padding-box是padding的边缘）接触
  - BFC 的应用
    - 清除浮动；BFC 中高度计算包含浮动元素的高度
    - 避免垂直外边距重叠；创建新的 BFC 使子元素处于新 BFC 中就不会与之前 BFC 的元素重叠垂直外边距
    - 自适应多栏布局，左右浮动，中间创建 BFC 自适应；因为 BFC 不会与浮动元素重叠

- 元素的浮动（什么是浮动，浮动的作用，怎么触发，缺点，为什么清除浮动，几种清除浮动的方法）
  - 元素设置 float 属性为 left/right，元素脱离文档流，向左/右浮动，直到碰到父元素或其他浮动元素
  - 特点
    1. 元素设置浮动display属性会变成block，并创建新的BFC，宽度不再是沾满父元素，而是包裹效果，宽度有本身大小决定
    2. 行级盒子不能和浮动元素重叠，实现文字环绕
    3. 脱离文档流：在其后面的非浮动块级盒子会和浮动元素重叠，会造成父元素高度塌陷
  - 脱离文档流，若父元素无高度，会造成父元素高度塌陷
  - 清除浮动
    - 加一个空 div，css 属性设置为 clear: both，clear属性有四个参数left,right,both和none，用于块级盒子是否在目标方向可以和浮动元素重叠；原理为创建新元素让他左右没有浮动元素，效果处于浮动元素下方，父元素计算高度会算上这个元素，也就解决了高度塌陷的问题
    - 创建父元素 BFC，BFC 计算高度会把浮动元素包含在内
    - ``` 
    .parent::after{
      content: '',
      clear: both,
      display: block; //注意clear只对块级盒子有效
    }
    ```

- 水平垂直居中方法
  - 水平
    - 行级元素：text-align=center
    - 块级元素：margin=0 auto
    - position=absolute transform=translate（-50%，0）
    - width=fit-content margin=0 auto
    - flex
  - 垂直
    - 行级元素：line-height 和父元素一样
    - position=absolute transform=translate（0，-50%）
  - 水平垂直
    - flex
    - 行级元素：line-height 和父元素一样，text-align=center
    - position=absolute transform=translate（-50%，-50%）

- CSS 宽度尺寸
  - fill-available：宽度充满父元素
  - min-content：宽度以子元素最小宽度最大的宽度为准
  - max-content：宽度以内容最大宽度为准，空间无限大
  - fit-content：子元素浮动元素，可配合 margin：0 auto 使子元素居中
  
- flex 0 1 auto 代表什么
  - flex-grow，当子元素小于父元素时如何分配空间，比如子元素都为 1，那就是等分空间
  - flex-shrink，当子元素大于父元素时如何缩小子元素，0 不缩小，1 等比缩小
  - flex-basis，设置元素在主轴上的占据的空间，auto 为按内容大小占用，设置为固定值就是占用大小等于固定值

- em和rem
  - em大小font-size相对于父级font-size，其他相对于本身的font-size
    - 响应式实现不同屏幕大小下现实不同字体大小
  - rem大小作用于非根元素相对于html根元素font-size，作用于根元素相当于初始大小16px
    - 在设计稿宽度下找一个基准值，让1rem等于100px，然后监听窗口变化，用宽度/设计稿*基准值得出html根元素font-size值，实现自适应
    - 问题是字体会继承，如果不每个字体显示设置就会有问题，可以利用媒体查询不同屏幕大小下body标签设置不同的字体默认大小
    - 配合postcss-px2rem实现，plugins实现