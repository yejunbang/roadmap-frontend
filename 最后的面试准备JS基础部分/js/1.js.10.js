1. setTimeout倒计时为什么会出现误差？
setTimeout() 只是将事件插入了“任务队列”，必须等当前代码（执行栈）执行完，
主线程才会去执行它指定的回调函数。要是当前代码消耗时间很长，也有可能要等很久，
所以并没办法保证回调函数一定会在 setTimeout() 指定的时间执行。
所以， setTimeout() 的第二个参数表示的是最少时间，并非是确切时间。
HTML5标准规定了 setTimeout() 的第二个参数的最小值不得小于4毫秒，
如果低于这个值，则默认是4毫秒。在此之前。老版本的浏览器都将最短时间设为10毫秒。
另外，对于那些DOM的变动（尤其是涉及页面重新渲染的部分），通常是间隔16毫秒执行。这时使用 requestAnimationFrame() 的效果要好于 setTimeout();

2. requestAnimationFrame的使用场景

requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。
具体一点讲，如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，1000ms / 60 ，约为16.7ms，如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，
换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。
它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。


与setTimeout相比的好处：

CPU节能：使用setTimeout实现的动画，当页面被隐藏或最小化时，
setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，
完全是浪费CPU资源。而requestAnimationFrame则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，
因此跟着系统步伐走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。

function step(timestamp) {
  //code...
  window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);