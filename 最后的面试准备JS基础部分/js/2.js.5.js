1. 浏览器事件代理机制的原理是什么？

"DOM2级事件"把事件流分为三个阶段，捕获阶段、目标阶段、冒泡阶段

事件代理又称为事件委托，在祖先级DOM元素绑定一个事件，当触发子孙级DOM元素的事件时，
利用事件冒泡的原理来触发绑定在祖先级DOM的事件。因为事件会从目标元素一层层冒泡至document对象。



减少注册事件的个数: 添加到页面上的事件数量会影响页面的运行性能，如果添加的事件过多，
会导致网页的性能下降。采用事件代理的方式，可以大大减少注册事件的个数。

事件代理的当时，某个子孙元素是动态增加的，不需要再次对其进行事件绑定。

不用担心某个注册了事件的DOM元素被移除后，可能无法回收其事件处理程序，我们只要把事件处理程序委托给更高层级的元素，就可以避免此问题。



addEventListener 接受3个参数，分别是要处理的事件名、处理事件程序的函数和一个布尔值。布尔值默认为false。
表示冒泡阶段调用事件处理程序，若设置为true，表示在捕获阶段调用事件处理程序。

2. js如何自定义事件？
  3种方式：自定义事件有三种方法,一种是使用 new Event(), 另一种是 createEvent('CustomEvent') , 另一种是 new customEvent()

  使用 new Event()：

  let btn = document.querySelector('#btn');
  let ev = new Event('alert', {
      bubbles: true,    //事件是否冒泡;默认值false
      cancelable: true, //事件能否被取消;默认值false
      composed: false
  });
  btn.addEventListener('alert', function (event) {
      console.log(event.bubbles); //true
      console.log(event.cancelable); //true
      console.log(event.detail); //undefined
  }, false);
  btn.dispatchEvent(ev);
  
  使用 createEvent('CustomEvent'):
  要创建自定义事件，可以调用 createEvent('CustomEvent')，返回的对象有 initCustomEvent 方法，接受以下四个参数:

type: 字符串，表示触发的事件类型，如此处的'alert'
bubbles: 布尔值： 表示事件是否冒泡
cancelable: 布尔值，表示事件是否可以取消
detail: 任意值，保存在 event 对象的 detail 属性中

let btn = document.querySelector('#btn');
let ev = btn.createEvent('CustomEvent');
ev.initCustomEvent('alert', true, true, 'button');
btn.addEventListener('alert', function (event) {
    console.log(event.bubbles); //true
    console.log(event.cancelable);//true
    console.log(event.detail); //button
}, false);
btn.dispatchEvent(ev);

使用 new customEvent():
使用起来比 createEvent('CustomEvent') 更加方便
var btn = document.querySelector('#btn');
/*
 * 第一个参数是事件类型
 * 第二个参数是一个对象
 */
var ev = new CustomEvent('alert', {
    bubbles: 'true',
    cancelable: 'true',
    detail: 'button'
});
btn.addEventListener('alert', function (event) {
    console.log(event.bubbles); //true
    console.log(event.cancelable);//true
    console.log(event.detail); //button
}, false);
btn.dispatchEvent(ev);
