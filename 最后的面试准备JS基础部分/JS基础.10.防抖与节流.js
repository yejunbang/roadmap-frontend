1. 防抖：
n秒内， 函数只会执行一次， 一般在common的组件，需要访问远程api时添加

手写实现：

function debounce(fn, wait) {
  let timer
  return function () {
    let self = this // 执行时，this指向不变
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(self, args)
    }, wait)
  }
}

2. 节流： 保证一定时间段内只调用一次事件处理函数, 一般在滚动事件添加

function throttle(fn, wait) {
  let timer
  return function () {
    let self = this
    let args = arguments
    if (!timer) {
      setTimeout(() => {
        fn.apply(self, args)
        timer = null
      }, wait)
    }
  }
}

用时间实现：
function throttle(fn, wait) {
  let pre = 0
  return function () {
    let self = this
    let args = arguments
    let now = new Date()
    if (now - pre > wait) {
      fn.apply(self, args)
      pre = now
    }
  }
}