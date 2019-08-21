// new Promise((resolve,reject)=>{})
const p = new Promise((resolve, reject) => {
  resolve('aaa')
})
// console.log('====output====>>>', p);
p.then('sdd')

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

// p.then(result=>{},reason=>{})
Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => reason
  const self = this
  if(self.status===FULFILLED){
    onFulfilled(self.value)
  }else if(self.status === REJECTED){
    onRejected(self.reason)
  }else{
    self.onFulfilled.push(()=>{
      
    })
  }
}