## demo3演示管理输出

在 index.html 文件中手动引入所有资源，然而随着应用程序增长，并且一旦开始 在文件名中使用 hash] 并输出 多个 bundle，如果继续手动管理 index.html 文件，就会变得困难起来。然而，通过一些插件可以使这个过程更容易管控。

1. 添加了两个入口index.js, print.js入口, [name].boundle.js为build成后输出的js name
```
module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

2. 使用html-webpack-plugin解决./dist/index.html写屎的情况, 加入plugin即可默认使用
`<script src="./app.bundle.js"></script>`
```
npm install --save-dev html-webpack-plugin
```
 HtmlWebpackPlugin 还是会默认生成它自己的 index.html 文件。也就是说，它会用新生成的 index.html 文件，替换我们的原有文件

 3. 清理 /dist 文件夹  
 在每次构建前清理 /dist 文件夹, 使用clean-webpack-plugin插件，加入plugin即可默认使用
 ```
 npm install --save-dev clean-webpack-plugin
 ```

 4. manifest  
 webpack 通过 manifest，可以追踪所有模块到输出 bundle 之间的映射。