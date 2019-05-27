# promise 核心知识

1. promise有三种状态：pending，fulfilled，rejected
2. 优点：
  - 一旦状态改变，就不会再变
  - 可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
缺点：当处于pending时，无法知道目前进展到哪一个阶段
3. promise中的构造函数时同步的，then中的方法时异步的
