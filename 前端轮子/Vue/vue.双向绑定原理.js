https: //mp.weixin.qq.com/s/oNgLQl2WMfzpEgY3RcvgJg
  https: //github.com/fengshi123/blog/blob/master/articles/%E6%B7%B1%E5%85%A5%E5%89%96%E6%9E%90%EF%BC%9AVue%20%E6%A0%B8%E5%BF%83%E4%B9%8B%E6%95%B0%E6%8D%AE%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A.md
  https: //www.jianshu.com/p/4dff7c2cdaaa

  1. Vue 是如何实现数据双向绑定的？
Vue 数据双向绑定主要是指： 数据变化更新视图， 视图变化更新数据
通过数据劫持， 实现

简答一句话：
Vue 内部通过 Object.defineProperty方法属性拦截的方式， 把 data 对象里每个数据的读写转化成 getter / setter， 当数据变化时通知视图更新。

流程图就是：
数据劫持 / 数据代理-- - > 依赖收集-- - > 发布订阅模式

答： 使用一个监听器Observer， 把对象传进去， 然后使用definedReactive定义一个响应式对象， 为对象添加getter， setter，
其核心是使用Object.defineProperty， 此时能监听到对象数据的变化。
在getter上添加订阅器 Dep， 用来收集依赖， 当我们对响应的数据做了修改， 就会触发setter的逻辑， 通知Warcher的update

Watcher就是想订阅这个数据的变化， 我们每new一个Wather构造函数时， 会传入vm， 想获取的值的结构， 如person.age， 以及回调函数
在构造函数中会手动调用vm data中person.age， 这个响应式对象的getter方法， 目的式为了把自己添加到订阅器中

当响应式对象触发setter时， 订阅器会遍历subs， 调用订阅者的notify方法， 通知订阅者(Watcher实例) 有数据变化
Watcher在之前调用构造函数时已经拿到旧值， 现在数据有变化， 会用新旧值对比， 不同则触发cb回调

一个数据可能有多个Watcher

原理实现：
4 个步骤：
1、 实现一个监听器 Observer， 用来劫持并监听所有属性， 如果属性发生变化， 就通知订阅者；

2、 实现一个订阅器 Dep， 用来收集订阅者， 对监听器 Observer 和 订阅者 Watcher 进行统一管理；

3、 实现一个订阅者 Watcher， 可以收到属性的变化通知并执行相应的方法， 从而更新视图；

4、 实现一个解析器 Compile， 可以解析每个节点的相关指令， 对模板数据和订阅器进行初始化。