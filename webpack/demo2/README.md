# demo2演示 import css， 加载images图像， 加载fonts字体， 加载数据

1. css安装loader: npm install --save-dev style-loader css-loader

2. images图像loader: npm install --save-dev file-loader 使图像等混合到 CSS 中  

3. loader 会识别这是一个本地文件，并将 './test.png' 路径，替换为 output 目录中图像的最终路径。而 html-loader 以相同的方式处理 <img src="./test.png" />。

4. 压缩和优化你的图像。查看 image-webpack-loader 和 url-loader，以了解更多关于如果增强加载处理图像功能。


5. fonts字体：
通过一个 @font-face 声明将其混合。本地的 url(...) 指令会被 webpack 获取处理，就像它处理图片一样
```
 @font-face {
   font-family: 'MyFont';
   src: url('./my-font.woff2') format('woff2'),  // 字体路径
     url('./my-font.woff') format('woff');
   font-weight: 600;
   font-style: normal;
 }

 .hello {
   color: red;
   font-family: 'MyFont';
 }
```

6. 加载数据  
可以加载的有用资源还有数据，如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 import Data from './data.json' 默认将正常运行。要导入 CSV、TSV 和 XML，你可以使用 csv-loader 和 xml-loader。让我们处理加载这三类文件：
```
npm install --save-dev csv-loader xml-loader
```

## 压缩和优化你的图像
