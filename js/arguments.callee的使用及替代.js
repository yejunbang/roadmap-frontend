// arguments的主要作用是保存函数参数，arguments.callee是返回正在被执行的函数的对象

//arguments.callee经典用法： 阶乘 n!
function calc(n) {
  if (n === 1) {
    return 1;
  } else {
    return n * arguments.callee(n - 1)
  }
}
console.log('====output====>>>', calc(4));
// 不用for循环，输入5，输出[1, 2, 3, 4, 5]
let result = []

function calc1(n) {
  return (function () {
    result.unshift(n)
    n--
    if (n !== 0) {
      arguments.callee();
    }
  })()
}
calc1(5)
console.log('====output====>>>', result);

// 不使用原因：访问arguments这个大对象是歌昂贵的操作，每次递归都需要重新创建，影响性能

// 修改：
let result = []

function calc1(n) {
  return (function fn() {
    result.unshift(n)
    n--
    if (n !== 0) {
      fn();
    }
  })()
}
calc1(5)
console.log('====output====>>>', result);