> webpack会在内部构建一个 依赖图(dependency graph)，此依赖图会映射项目所需的每个模块，并生成一个或多个 bundle。
# 核心概念
## 入口(entry)
## 输出(output)
## loader
## 插件(plugin)
## 模式(mode)
## 浏览器兼容性(browser compatibility)
引用官网[核心概念](https://webpack.docschina.org/concepts/)


## 入口(entry)
入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。  
默认值是 ./src/index.js  
可修改:  webpack.config.js  
```
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```
## 输出(output)
output 属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件  
默认值是 ./dist/main.js  
可修改:  webpack.config.js  
```
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

## loader
webpack 只能理解 JavaScript 和 JSON 文件。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。  
在 webpack 的配置中 loader 有两个属性：

test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。  
use 属性，表示进行转换时，应该使用哪个 loader。
```
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};
```
> “嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先 使用 raw-loader 转换一下。”

**当有多个loader时:**  
```
  [
    { 
      test: /\.css$/, 
      use: [{loader:'style-loader' },
            {loader:'css-loader' }]
    }
  ]
```
loader会从下到上解析, 先使用css-loader解析，解析后的数据传给style-loader解析

## 插件(plugin)
loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。  
想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。  
```
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```
## 模式(mode)
通过选择 development, production 或 none 之中的一个，来设置 mode 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 production。
```
module.exports = {
  mode: 'production'
};
```