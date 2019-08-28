MVVM 是 Model-View-ViewModel 的缩写。
Model代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑。
View 代表UI 组件，它负责将数据模型转化成UI 展现出来。
ViewModel 监听模型数据的改变和控制视图行为、处理用户交互，简单理解就是一个同步View 和 Model的对象，连接Model和View。
在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的，
 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。
ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，
因此开发者只需关注业务逻辑，不需要手动操作DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。


实现一个双向数据绑定：
侦测数据的变化
收集视图依赖了哪些数据
数据变化时，自动“通知”需要更新的视图部分，并进行更新

对应专业俗语分别是：
数据劫持 / 数据代理
依赖收集
发布订阅模式


侦测数据的变化（数据劫持）：
使用 Object.defineProperty和ES6的 Proxy
Vue通过设定对象属性的 setter/getter 方法来监听数据的变化，通过getter进行依赖收集，而每个setter方法就是一个观察者，在数据变更的时候通知订阅者更新视图。


// 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上
function observe1(data){
  if(!data||typeof data !=='object'){
    return
  }
  let handler = {
    get(target,key){
      if(typeof target[key]==='object'){
        return new Proxy(target[key],handler)
      }
      return Reflect.get(target,key)
    },
    set(target,key, value){
      reuturn Reflect.set(target,key,value)
    }
  }
  return new Proxy(data,handler)
}

function observe(data){
  if(!obj||typeof data !== 'object'){
    return;
  }
  for(let key in data){
    if(data.hasOwnProperty(key)){
      observe(data[key])
      Object.defineProperty(data,key,{
        enumerable: true,
        get: function(){
          return data[key]
        },
        set:function(value){
          observe(value)
          if(data[key]!==value){
            data[key] = value
          }
        }
      })
    }
  }
}
class Vue {
  constructor(options){
    this._data = options.data
    observe(this._data)
  }
}


收集视图依赖了哪些数据(收集依赖)：
当数据的属性发生变化时，可以通知那些曾经使用了该数据的地方
只有通过收集依赖才能知道哪些地方依赖我的数据，以及数据更新时派发更新。
那依赖收集是如何实现的？其中的核心思想就是“事件发布订阅模式”。接下来我们先介绍两个重要角色-- 订阅者 Dep和观察者 Watcher ，然后阐述收集依赖的如何实现的。

订阅者：
class Dep{
  constructor(){
    this.subs = []
  }
  emit(){
    this.subs.forEach(sub=>sub.update())
  }
  on(sub){
    this.subs.push(sub)
  }
}

class Watcher {
  constructor(obj,key,cb){
    this.obj = obj
    this.key = key
    this.value = obj[key]
    this.cb = cb
  }
  update(){
    this.value = this.obj[this.key]
    this.cb(this.value)  //更新视图
  }
}








