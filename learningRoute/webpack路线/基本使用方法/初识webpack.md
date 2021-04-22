<!--
 * @Date: 2021-04-09 06:36:08
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-04-19 15:50:46
-->
- 构建工具的作用
   - 转化ES6、vue指令、jsx等浏览器无法识别的代码
   - css前缀补全和预编译转化
   - 图片压缩
   - 代码混淆和压缩
- 配置组成
   - entry入口文件
      - webpack根据入口文件遍历出依赖关系图，分模块打包文件
      - 可分为单入口和多入口，分别对应单页应用和多页应用
   - output输出位置
      - 指定webpack打包文件的输出位置
      - 分为filename和path，对应多入口时使用占位符表示名称唯一
   - mode环境
      - 指定环境productiong、development、none
      - 根据环境开启一些对应的插件；设置process.env.NODE_ENV
      - dev，热更新阶段可以打印出哪个文件变化和路径等
      - prd，代码压缩等
   - module-rules数组 配置loaders
      - webpack只支持js和json文件的打包，loader的作用是在打包前将文件转化为js和json，常见的babel-es6、css-loader、less-loader、ts-loader等
      - 通过test指定文件类型，use指定使用哪个loader
   - plugins数组
      - 作用于整个构建环境，提供一些功能
- webpack命令位置
   - ./node-modules/.bin/webpack npm安装依赖后如果有命令会在.bin目录有一个软连接；packgage.json中默认可以获取到.bin目录下命令的
- babel
   - presets，放babel工具比如es6 react
   - plugins