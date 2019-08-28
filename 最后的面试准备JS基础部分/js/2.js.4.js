1. js模块的发展史


2. ES6模块和CommonJS模块的差异？
ES6模块在编译时，就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 模块，运行时加载。
ES6 模块自动采用严格模式，无论模块头部是否写了 "use strict";
require 可以做动态加载，import 语句做不到，import 语句必须位于顶层作用域中。
ES6 模块中顶层的 this 指向 undefined，CommonJS 模块的顶层 this 指向当前模块。
CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。