https://mp.weixin.qq.com/s/Ox2tD2iLuvC2P8HO-J7dHw
https://mp.weixin.qq.com/s/oAlVmZ4Hbt2VhOwFEkNEhw
https://mp.weixin.qq.com/s/EeN7E8uQS4R_JJloPX8fCQ
diff: https://juejin.im/post/5ad6182df265da23906c8627

virtual dom出现原因：
由于真实dom解析的过程：构建dom tree -> 构建CSSOM -> 组合成Render tree -> layout(布局) -> paint(渲染)
一系列过程，当js操作dom时，有10个js操作，更新10个节点，dom解析是不会知道后面还有多少次更新的，只能一次次更新，
从构建dom tree到最后

virtual dom出现后，会把这10次的diff更新统计出来，存在一个js对象中，再把这个js对象attch到Dom tree上，
避免了大量无谓的计算和性能损耗


diff算法主要做两个操作：
新旧节点的对比
所谓的virtual dom，也就是虚拟节点。它通过JS的Object对象模拟DOM中的节点，然后再通过特定的render方法将其渲染成真实的DOM节点
dom diff 则是通过JS层面的计算，返回一个patch对象，即补丁对象，在通过特定的操作解析patch对象，完成页面的重新渲染。

比较只会在同层级进行, 不会跨层级比较。
比较后会出现四种情况：
1、此节点是否被移除 -> 添加新的节点 
2、属性是否被改变 -> 旧属性改为新属性
3、文本内容被改变-> 旧内容改为新内容
4、节点要被整个替换 -> 结构完全不相同 移除整个替换














