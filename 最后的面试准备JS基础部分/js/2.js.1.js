1. 说一说JS异步发展史
异步最早的解决方案是回调函数， 如事件的回调， setInterval / setTimeout中的回调。 但是回调函数有一个很常见的问题， 就是回调地狱的问题
为了解决回调地狱的问题， 社区提出了Promise解决方案， ES6将其写进了语言标准。
Promise解决了回调地狱的问题， 但是Promise也存在一些问题， 如错误不能被try
catch，
而且使用Promise的链式调用， 其实并没有从根本上解决回调地狱的问题， 只是换了一种写法。
ES6中引入 Generator 函数， Generator是一种异步编程解决方案， Generator 函数是协程在 ES6 的实现，
最大特点就是可以交出函数的执行权， Generator 函数可以看出是异步任务的容器，
需要暂停的地方， 都用yield语句注明。 但是 Generator 使用起来较为复杂。
ES7又提出了新的异步解决方案: async /await， async是 Generator 函数的语法糖， async /await 使得异步代码看起来像同步代码，
异步编程发展的目标就是让异步逻辑的代码看起来像同步一样。

ES7中引入了 async /await 概念。 async其实是一个语法糖， 它的实现就是将Generator函数和自动执行器（ co）， 包装在一个函数中。

手写实现一个my_co:
  function my_co(generator) {
    return new Promise((resolve, reject) => {
      function next(data) {
        const result = generator.next(data)
        if (result.done) {
          resolve(result.value)
        } else {
          next(result.value)
        }
      }
      next()
    })
  }

  function* test() {
    yield new Promise((resolve, reject) => {
        setTimeout(resolve, 100);
    });
    yield new Promise((resolve, reject) => {
        // throw Error(1);
        resolve(10)
    });
    yield 10;
    return 1000;
}

my_co(test()).then(data => {
    console.log(data); //输出1000
}).catch((err) => {
    console.log('err: ', err);
});


  function* test(){
    yield 1
  }
  // const a = test()
  my_co(test()).then(result=>{
    console.log('====output====>>>',result);
  })
  console.log('====output====>>>',a.next());

  function* t(){
    let a = yield 1
    let b = yield a
    let c = yield b
    return c
  }
  const a = t()
  console.log('====output====>>>',a.next());
  console.log('====output====>>>',a.next());
  console.log('====output====>>>',a.next());
  console.log('====output====>>>',a.next());