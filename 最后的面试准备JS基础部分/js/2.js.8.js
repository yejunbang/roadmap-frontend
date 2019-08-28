1. 实现双向绑定 Proxy 与 Object.defineProperty 相比优劣如何?
Object.definedProperty 的作用是劫持一个对象的属性，劫持属性的getter和setter方法，在对象的属性发生变化时进行特定的操作。而 Proxy 劫持的是整个对象。
Proxy 会返回一个代理对象，我们只需要操作新对象即可，而 Object.defineProperty  只能遍历对象属性直接修改。
Object.definedProperty 不支持数组，更准确的说是不支持数组的各种API，因为如果仅仅考虑arry[i] = value 这种情况，
是可以劫持的，但是这种劫持意义不大。而 Proxy 可以支持数组的各种API。
尽管 Object.defineProperty 有诸多缺陷，但是其兼容性要好于 Proxy
