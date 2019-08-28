1. 防抖和节流的区别是什么？ 防抖和节流的实现。

防抖和节流的作用都是防止函数多次调用。 区别在于，
假设一个用户一直触发这个函数， 且每次触发函数的间隔小于设置的时间， 防抖的情况下只会调用一次， 而节流的情况会每隔一定时间调用一次函数。


防抖(debounce): n秒内函数只会执行一次， 如果n秒内高频事件再次被触发， 则重新计算时间

手写实现

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
  }
}

防抖的应用场景:

  每次 resize / scroll 触发统计事件
文本输入的验证（ 连续输入文字后发送 AJAX 请求进行验证， 验证一次就好）


节流(throttle): 高频事件在规定时间内只会执行一次， 执行一次后， 只有大于设定的执行周期后才会执行第二次。
手写实现
时间戳版：
function throttle(func, wait) {
  let previous = 0;
  return function () {
    let now = Date.now();
    let context = this;
    let args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}
定时器版:
  function throttle(func, wait) {
    let timeout;
    return function () {
      let context = this;
      let args = arguments;
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args)
        }, wait)
      }
    }
  }

函数节流的应用场景有:

  DOM 元素的拖拽功能实现（ mousemove）
射击游戏的 mousedown / keydown 事件（ 单位时间只能发射一颗子弹）
计算鼠标移动的距离（ mousemove）
Canvas 模拟画板功能（ mousemove）
搜索联想（ keyup）
监听滚动事件判断是否到页面底部自动加载更多： 给 scroll 加了 debounce 后，
只有用户停止滚动后， 才会判断是否到了页面底部； 如果是 throttle 的话， 只要页面滚动就会间隔一段时间判断一次