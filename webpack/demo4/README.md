## demo4演示如何搭建一个development环境, 仅限于用在开发环境
1. 设置 mode 为 'development'。

2. source map（重点）
使用原因：将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会直接指向到 bundle.js。你可能需要准确地知道错误来自于哪个源文件。  
为了更容易地追踪 error 和 warning，JavaScript 提供了 source map 功能，可以将编译后的代码映射回原始源代码。如果一个错误来自于 b.js，source map 就会明确的告诉你  
source map的配置解析[在这里](https://webpack.docschina.org/configuration/devtool)  

**eval-source-map** - 每个模块使用 eval() 执行，并且 source map 转换为 DataUrl 后添加到 eval() 中。初始化 source map 时比较慢，但是会在重新构建时提供比较快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。它会生成用于开发环境的最佳品质的 source map。

生产环境：
1. 不使用source map
2. hidden-source-map：只想 source map 映射那些源自错误报告的错误堆栈跟踪信息，但不想为浏览器开发工具暴露你的 source map

避免在生产中使用 inline-*** 和 eval-***，因为它们会增加 bundle 体积大小，并降低整体性能。

## 使用1：(本例为：inline-source-map)
在webpack.config.js中添加：
```
devtool: 'inline-source-map'
```
inline-source-map， 报错会显示在浏览器中，且还有行号


## 使用2：在代码发生变化后自动编译代码
1. webpack watch mode(webpack 观察模式)
2. webpack-dev-server  （推荐）
3. webpack-dev-middleware



1. webpack watch mode(webpack 观察模式)
```
"scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
      "build": "webpack"
    },
```
```
npm run watch
```
2. webpack-dev-server
提供了一个简单的 web server，并且具有 live reloading(实时重新加载) 功能  
使用：  
2.1 install 包
```
npm install --save-dev webpack-dev-server
```
2.2 修改配置文件，告诉 dev server，从什么位置查找文件：
```
 module.exports = {
    mode: 'development',
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   },
```
**原理：将 bundle 文件保留在内存中，然后将它们 serve 到 server（localhost:8080） 中，就好像它们是挂载在 server 根路径上的真实文件一样**  
2.3 添加运行dev server
```
 {
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
+     "start": "webpack-dev-server --open",
      "build": "webpack"
    },
```
```
npm start
```
最好配合 模块热替换 使用  
3. webpack-dev-middleware
使用在server端：
3.1 安装：
```
npm install --save-dev express webpack-dev-middleware
```
3.2 配置文件：
```
output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
+     publicPath: '/'
    }
```
在 server 脚本使用 publicPath，以确保文件资源能够正确地 serve 在 http://localhost:3000 下  
3.3 自定义 express server
```
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// 告诉 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// 将文件 serve 到 port 3000。
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```
3.4 添加一个 npm script
```
  {
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "watch": "webpack --watch",
      "start": "webpack-dev-server --open",
+     "server": "node server.js",
      "build": "webpack"
    },
```
3.5 运行：
```
npm run server
```