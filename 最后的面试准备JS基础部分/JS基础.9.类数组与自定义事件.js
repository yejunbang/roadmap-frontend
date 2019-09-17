1. 类数组：（ 1） 拥有length属性， 其它属性（ 索引） 为非负整数（ 对象中的索引会被当做字符串来处理）;（
2） 不具有数组所具有的方法；
类数组是一个普通对象， 而真实的数组是Array类型。

常见类数组： arguments, document.querySelectorAll() 回来

类数组转数组：
  (1) 扩展运算符（...）
  (2) Array.prototype.slice.call(arguments)
  (3) Array.from(arguments)
Array.from: 能将两类对象转为真正的数组： 类似数组的对象（ array - like object） 和可遍历（ iterable） 的对象。


2. 自定义事件：
传统的事件不能满足我们的需求， 所以我们需要自定义事件， 比如传统的事件有单击， 双击， 但是突然某一天我想要三击 那就要用到自定义事件了
主要解决观察者模式：（ 发布者 - 订阅者模式）

2.1 如何创建自定义事件？

  (1)
创建事件对象：
let ev = document.createEvent('CustomEvent')
初始化事件对象：
ev.initCustomEvent('ev', false, true, { b: 2 })
type
事件的类型名称.
bubbles
一个布尔值, 表明该事件是否会冒泡.
cancelable
一个布尔值, 表明该事件是否可以被取消.
detail
当事件初始化时传递的数据.

分派事件：
document.dispatchEvent(ev)
监听事件：
document.addEventListener('ev', e => {
  console.log(e)
  console.log(e.detail.b) // 2
})


(2)
document.addEventListener('customClick', function (e) {
  console.log('====output====>>>>', e);
  console.log('====output====>>>>', e.detail.a);
})

function customClick() {
  // const customEvent = document.createEvent('CustomEvent')
  // customEvent.initCustomEvent('customClick', false, true, { a: 1 })
  // document.dispatchEvent(customEvent)

  const cu = new CustomEvent('customClick', { detail: { a: 1 } })
  document.dispatchEvent(cu)
}