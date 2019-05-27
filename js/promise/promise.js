// let a = new Promise((resolve,reject)=>{...})
// a.then((result, error)=>{...}).catch(e=>{...})

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(executor) {
  let self = this
  self.status = PENDING
  self.onFufilled = []
  self.onRejected = []

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED
      self.value = value
      self.onFufilled.forEach(fn => fn());
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

Promise.prototype.then = function (onFufilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
  let self = this
  let promise2 = new Promise((resolve, reject) => {
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFufilled(self.value)
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e)
        }
      })
    } else if (self.status === REJECTED) {
      try {
        let x = onRejected(self.reason)
        resolvePromise(promise2, x, resolve, reject)
      } catch (e) {
        reject(e)
      }
    } else if (self.status === PENDING) {
      self.onFufilled.push(() => {
        setTimeout(() => {
          try {
            let x = onFufilled(self.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      self.onRejected.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }
  });
  return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {
  let self = this
  if (promise2 === x) {
    reject(new TypeError('chaining cycle'))
  }
  if (x && (typeof x === 'object' || typeof x === 'function')) {
    let used;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (used) return;
          used = true;
          resolvePromise(promise2, x, resolve, reject)
        }, (r) => {
          if (used) return;
          used = true;
          reject(r)
        })
      } else {
        if (used) return;
        used = true;
        resolve(x);
      }
    } catch (e) {
      if (used) return;
      used = true;
      reject(e)
    }
  } else {
    resolve(x)
  }
}


// 测试：
Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

module.exports = Promise