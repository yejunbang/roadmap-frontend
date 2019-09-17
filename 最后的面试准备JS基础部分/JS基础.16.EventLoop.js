1. 原理
2. 为什么setTimeout会不准时
3. requestAnimationFrame区别
https://mp.weixin.qq.com/s/yD2us7iezfZ4uz4oWtpESg 
http://www.ruanyifeng.com/blog/2014/10/event-loop.html

浏览器的EventLoop
答：浏览器中js引擎顺序执行的代码分为同步任务跟异步任务，
所有同步任务都在主线程上运行，形成一个执行栈
主线程之外，还有个任务队列，只有异步任务有了运行结果，就在任务队列中放置一个事件，
一旦执行栈中的所有同步任务执行完毕，系统就会读取任务队列，任务队列中的事件对于的异步任务就进入执行栈，开始执行
主线程不断地重读上面的步骤就是EventLoop


Node.js的EventLoop
答：（1）V8引擎解析JavaScript脚本。

（2）解析后的代码，调用Node API。

（3）libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。

（4）V8引擎再将结果返回给用户。

定义：
process.nextTick方法可以在当前"执行栈"的尾部----下一次Event Loop（主线程读取"任务队列"）之前----触发回调函数。
也就是说，它指定的任务总是发生在所有异步任务之前。
setImmediate方法则是在当前"任务队列"的尾部添加事件，也就是说，它指定的任务总是在下一次Event Loop时执行，这与setTimeout(fn, 0)很像。







