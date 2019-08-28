Vue中的Virtual Dom

vue template模板--> 编译成渲染函数（render）--> 执行渲染函数得到一个虚拟节点树
在进行model操作时，会触发Dep中的Watcher，Watcher会对相关的依赖update视图，主要是将
新旧虚拟节点进行差异对比， 然后根据对比结果进行DOM操作来更新视图


Virtual DOM 其实就是一棵以 JavaScript 对象( VNode 节点)作为基础的树，用对象属性来描述节点


模板→渲染函数→虚拟DOM树→真实DOM

虚拟DOM在Vue.js主要做了两件事：
提供与真实DOM节点所对应的虚拟节点vnode
将虚拟节点vnode和旧虚拟节点oldVnode进行对比，然后更新视图

JS操作快，DOM操作慢，virtual DOM就是这之间的缓冲，收集所有经过diff算法算出的真正需要更新的节点，最大幅度地减少DOM操作，从而显著提高性能










