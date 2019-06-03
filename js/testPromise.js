const PENDING = 'pending';
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

Promise.prototype.then = function (fulfilled, rejected) {
  fulfilled = typeof fulfilled === 'function' ? fulfilled : value => value;
  rejected = typeof rejected === 'function' ? rejected : reason => reason;
  let self = this
  let promise2 = new Promise((resolve, rejected) => {
    if (self.status === FULFILLED) {
      try {
        let x = fulfilled(self.value);
        resolvePromise(promise2, x, resolve, rejected);
      } catch (e) {
        rejected(e)
      }
    } else if (self.status === REJECTED) {
      try {
        let x = rejected(self.reason)
        resolvePromise(promise2, x, resolve, rejected);
      } catch (e) {
        rejected(e)
      }
    } else if (self.status === PENDING) {
      self.onFulfilled.push(() => {
        setTimeout(() => {
          try {
            let x = fulfilled(self.value);
            resolvePromise(promise2, x, resolve, rejected);
          } catch (e) {
            rejected(e)
          }
        });
      });
      self.onRejected.push(() => {
        setTimeout(() => {
          try {
            let x = rejected(self.reason)
            resolvePromise(promise2, x, resolve, rejected);
          } catch (e) {
            rejected(e)
          }
        });
      })
    }
  });
  return promise2;
}

function resolvePromise(promise2, x, resolve, rejected) {
  let self = this
  if (promise2 === x) {
    rejected(new TypeError('chaining cycle'))
  }
  let used = false
  if (x && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then
      if(typeof then === )
    } catch (e) {
      rejected(e)
    }
  } else {
    resolve(x);
    used = true;
  }
}