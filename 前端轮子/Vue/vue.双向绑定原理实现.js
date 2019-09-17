// https://www.cnblogs.com/chenjg/p/9541291.html
// https://github.com/fengshi123/mvvm_example/blob/master/src/observer.js
// 1. 首先定义一个监听器， 监听对象属性
function Observer(obj) {
  if (!obj || typeof obj !== 'object') return
  const keys = Object.keys(obj)
  keys.forEach(key => {
    defineReactive(obj, key, obj[key])
  })
  return obj
}

function defineReactive(obj, key, value) {
  Observer(value)
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return value
    },
    set(newValue) {
      if (newValue === value) return
      Observer(newValue)
      value = newValue
      dep.notify();
    }
  })
}

// 2. 订阅器 Dep 实现
// 实现发布 - 订阅模式， 好比如： 购买者在售楼处登记了电话， 有新楼盘推出， 售楼MM就遍历电话列表， 依次发短信通知他们

// 先把依赖收集起来， 依赖收集容器即订阅器Dep

function Dep() {
  this.subs = []
}
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub)
}
Dep.prototype.notify = function () {
  this.subs.forEach(sub => {
    sub.update()
  })
}
Dep.target = null


// 最主要是一个Watcher：
function Watcher(vm, exp, cb) {
  this.vm = vm
  this.exp = exp
  this.cb = cb
  this.value = this.get()
}
Watcher.prototype = {
  get() {
    Dep.target = this
    let value = this.getValueByExp() // 手动调用响应式数据的getter，把自己加进订阅器里
    Dep.target = null
    return value
  },
  update() {
    let value = this.getValueByExp()
    let oldValue = this.value
    if (value !== oldValue) {
      this.value = value
      this.cb.call(this.vm, value, oldValue)
    }
  },
  getValueByExp() {
    const arr = this.exp.split('.')
    let value = this.vm.data
    arr.forEach(key => {
      value = value[key]
    })
    return value
  }
}

// 运行看看：

// 这样就可以监听对象了
let person = { name: 'pogba', age: 12 }

let MVVM = { data: { person } }
// 变成响应式对象
Observer(MVVM)

// 添加订阅者
new Watcher(MVVM, 'person.age', (newValue, oldValue) => {
  console.log('====output===newValue=>>>>', newValue);
  console.log('====output===oldValue=>>>>', oldValue);
})

person.age = 25