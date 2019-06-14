// new Promise((resolve,reject)=>{})
// 
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECCTED = 'rejected';

function Promise(executor) {
  const self = this;
  self.status = PENDING;
  self.onFulfilled = [];
  self.onRejected = [];

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilled.forEach(fn => fn());
    }
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECCTED;
      self.reason = reason;
      self.onRejected.forEach(fn => fn())
    }
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => reason;

  const self = this
  let promise2 = new Promise((resolve, reject) => {
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    } else if (self.status === REJECCTED) {
      setTimeout(() => {
        try {
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else if (self.status === PENDING) {
      self.onFulfilled.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        })
      });
      self.onRejected.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  });
  return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {
  let self = this
  if (promise2 === x) {
    throw new TypeError('chaining cycle')
  }
  if (x && typeof x === 'object' || typeof x === 'function') {
    let used;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (used) return;
          used = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
          if (used) return;
          used = true;
          reject(r);
        })
      } else {
        if (used) return;
        used = true;
        resolve(x);
      }
    } catch (e) {
      if (used) return;
      used = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

module.exports = Promise;



var a = 2;
(function test() { console.log('====output====>>>', a); })()

for (var i = 0; i < 10; i++) {
  (function ar(a) { setTimeout(function t() { console.log('====output====>>>', a) }, 100) })(i);
}

for (let k = 0; k < 10; k++) {
  setTimeout(function ffs() { console.log('====output====>>>', k); })
}

let a = function fn(i) {
  console.log('====output====>>>', i);
}
a(2)


function foo() {
  var a = 2
  this.bar();
}

function bar() {
  console.log('====output====>>>', this.a);
}
window.foo();

console.log('====output====>>>',Window);