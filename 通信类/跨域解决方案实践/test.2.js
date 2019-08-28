let a = {
  valueOf: (function() {
      let i = 1;
      //闭包的特性之一：i 不会被回收
      return function() {
          return i++;
      }
  })()
}
console.log(a == 1 && a == 2 && a == 3); //true
console.log('====output====>>>',a.valueOf());