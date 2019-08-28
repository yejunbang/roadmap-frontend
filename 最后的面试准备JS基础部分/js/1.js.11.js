1. promise 有几种状态, Promise 有什么优缺点 ?

  promise有三种状态 : fulfilled, rejected, pending.

Promise 的优点:
  一旦状态改变， 就不会再变， 任何时候都可以得到这个结果
可以将异步操作以同步操作的流程表达出来， 避免了层层嵌套的回调函数

Promise 的缺点:
  无法取消 Promise
当处于pending状态时， 无法得知目前进展到哪一个阶段

Promise构造函数是同步还是异步执行， then中的方法呢 ? promise如何实现then处理 ?
  Promise的构造函数是同步执行的。 then 中的方法是异步执行的。

2. promise的所有使用场景
const promise = new Promise((resolve, reject) => {})
promise.then(result => {}, err => {})
promise.catch(err => {}) // 用于指定出错时的回调，是特殊的then方法，catch之后，可以继续 .then
promise.finally(() => {}) // 不管成功还是失败，都会走到finally中,并且finally之后，还可以继续then。并且会将值原封不动的传递给后面的then.
const all = Promise.all([promise, promise])
const race = Promise.race([promise, promise])
const resolve = Promise.resolve(123) // value本身就是promise对象,原封不动地返回这个promise对象，否则，返回以该值为成功状态的promise对象
const reject = Promise.reject(123) // Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数

Promise.all:
  参数是一个空的可迭代对象， 那么此promise对象回调完成(resolve), 只有此情况， 是同步执行的， 其它都是异步返回的。
传入的参数不包含任何 promise， 则返回一个异步完成.
参数中有一个promise失败， 那么Promise.all返回的promise对象失败
任何情况下， Promise.all 返回的 promise 的完成状态的结果都是一个数组

Promise.race:
  传的参数数组是空， 则返回的 promise 将永远等待
可以是完成（ resolves）， 也可以是失败（ rejects）， 这要取决于第一个完成的方式是两个中的哪个。
迭代包含一个或多个非承诺值和 / 或已解决 / 拒绝的承诺， 则 Promise.race 将解析为迭代中找到的第一个值。

3. 手写Promise实现
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(executor) {
  let self = this
  self.status = PENDING
  self.onFulfilled = []
  self.onRejected = []

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED
      self.value = value
      self.onFulfilled.forEach(fn => fn())
    }
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED
      self.reason = reason
      self.onRejected.forEach(fn => fn())
    }
  }
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => reason
  const self = this
  const promise2 = new Promise((resolve, reject) => {
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          const re = onFulfilled(self.value)

        } catch (e) {
          reject(e)
        }
      })
    } else if (self.status === REJECTED) {
      try {
        const re = onRejected(self.reason)
      } catch (e) {
        reject(e)
      }
    } else {

    }
  })
  return promise2
}


Promise.all = function (arr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) {
      throw new TypeError('not a iterator')
    }
    if (arr.length === 0) {
      resolve([])
      return
    }
    const result = []
    for (let item of arr) {
      Promise.resolve(item).then(re => {
        result.push(re)
      }, err => {
        reject(err)
        return
      })
    }
    resolve(result)
  })
}

Promise.race = function (arr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) {
      throw new TypeError('not a iterator')
    }
    if (arr.length === 0) {
      return
    }
    for (let item of arr) {
      Promise.resolve(item).then(result => {
        resolve(result)
        return
      }, err => {
        reject(err)
        return
      })
    }
  })
}

Promise.resolve = function (param) {
  if (param instanceof Promise) {
    return param
  }
  return new Promise((resolve, reject) => {
    resolve(param)
  })
}
Promise.reject = function (param) {
  return new Promise((resolve, reject) => {
    reject(param)
  })
}
Promise.prototype.catch = function (reason) {
  return this.then(null, reason)
}
Promise.prototype.finally1 = function (callback) {
  return this.then(result => {
    return Promise.resolve(callback()).then(() => {
      return result
    })
  }, err => {
    return Promise.reject(callback()).then(() => {
      throw err
    })
  })
}

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('test')
  }, 1000)
})
p.then(result=>{
  console.log('====output====>>>',result);
  return result
}).finally1(()=>{
  console.log('====output====>>>finally');
}).then(result=>{
  console.log('====output====>>>',result);
})