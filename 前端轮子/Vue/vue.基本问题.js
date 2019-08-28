1. v-show和v-if的区别：
答：都是条件渲染语句，v-show无论true or false都会绘制，在dom中占有着位置，只是显不显示
相当于visible:hidden
v-if为true才在dom中，false不会
在频繁切换显不显示时，建议使用v-show，性能好。

2. 指令keep-alive：
在vue-router写着keep-alive，就是把切换出去的组件保留在内存中，保留它的状态和避免重新渲染，提高性能
include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，
exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。


3. 跳转的方式和传参的区别：


4. 指令v-el的使用：
<span v-el:msg>hello</span>
<span v-el:other-msg>world</span>
this.$els.msg.textContent //-> "hello"
this.$els.otherMsg.textContent// -> "world"
this.$els.msg//-><span>hello</span>
像操作dom一样


5. Vue的生命周期?
一般是8个周期。
beforeCreate：组件实例被创建之初，组件的属性生效之前
created：组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用
beforeMount：在挂载开始之前被调用
mounted：el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子，$el可用
在data发生变化的时候，会触发beforeUpdate和updated方法
beforeUpdate: 在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程
updated: 在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作
activited：	keep-alive 专属，组件被激活时调用
deadctivated：	keep-alive 专属，组件被销毁时调用
beforeDestroy: 销毁前。实例可以用，
destroyed：在实例销毁之后

6. Vue 的父组件和子组件生命周期钩子函数执行顺序？
加载渲染过程
父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

子组件更新过程
父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

父组件更新过程
父 beforeUpdate -> 父 updated

销毁过程
父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

7. 在哪个生命周期内调用异步请求？
一般在created、beforeMount、mounted 中进行调用，因为data已创建，推荐created

8. 父组件可以监听到子组件的生命周期吗？
可以，通过@hook 来监听，例如：
<Child @hook:mounted="doSomething" ></Child>
doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},
//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
}
子组件mounted后立刻触发父组件doSomething

9. 组件中 data 为什么是一个函数？
因为组件是可以复用的，相当于可以new多个，假如data是一个对象，所有复用的这个组件都会指向堆中的对象，
一旦某个组件更改了数据，所有用到这个组件的页面都受到影响。一个函数的话，相当于闭包或者new，引用这个组件，相当于创建了一个实例。
data不受影响

10. v-model的原理：
v-model 是一个语法糖，比如一个<input>标签，v-model相当于绑定了value值，并监听输入内容的变化。
在自定义组件中，v-model就是传入属性props的value字段，vm.$emit('update:input')更新值
也可以在组件中model:{}更正字段名，
父：:msg.sync="valueSync" 子：通过this.$emit('update:valueSync','a')更新值
父： v-model='valueSync' 子：通过model:{prop:'valueSync'//更正字段名，event:'input'//事件来触发} this.$emit('input','a')


11. 说说vue ssr的好处？
服务端渲染，
优点：
（1）更好的SEO， 爬虫引擎不会等ajax返回再抓取内容，所以在SPA中抓取不到异步的内容，
SSR是在服务端直接渲染好了的页面，爬虫引擎可以抓取到
（2）加快首屏渲染速度，SPA会等待所有js文件下载完，才开始渲染
缺点：
（1）有些钩子函数用不到：beforeCreated，created
（2）加大服务器负担，ssr需要在服务器渲染完成。

12. vue-router 路由模式有几种？
2种，hash，history模式
hash模式: 
使用 URL hash 值来作路由。支持所有浏览器 // https://www.baidu.com#search
原理：监听onhashchange事件
hash模式会创建hashHistory对象，路由跳转时，onhashchange事件触发
操作历史：HashHistory.push()将访问历史放入栈顶，HasHistory.replace()替换到当前栈顶的路由
也可以通过location.hash来改变路由，
window.onhashchange = function(event){
  let hash = location.hash.slice(1);
  document.body.style.color = hash;
}

history模式：
原理：依赖H5提供的 History API来实现
监听popstate 事件，知道url变化，实现history路由拦截
操作历史：通过pushState、replaceState两个方法

注意：直接调用history.pushState()  或  history.replaceState()的api不会触发popstate事件
只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮


13. 怎么实现vue.$set解决对象新增属性
由于vue在初始化时对data里的属性添加了getter/setter
实现原理：
（1）如果目标是数组，直接使用数组的 splice 方法触发相应式
（2）如果目标是对象，（会先判读属性是否存在、对象是否是响应式）通过调用 defineReactive 方法进行响应式处理，
这个defineReactive方法是初始化时调用的方法，给这个属性添加getter/setter
defineReactive方法就是：Object.defineProperty()的具体实现


14. Vue 中的 key 有什么作用？
比如：
<ul>
  <li v-for='item in arr' :key=""></li>
</ul>
key 是Vue 中虚拟节点 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速
key可以使diff算法快速定位节点的插入位置

答：key 是Vue 中虚拟节点 vnode 的唯一标记，diff算法更新虚拟dom会把新旧节点进行首尾交叉对比（start-end（节点），start-end（节点）），匹配不到会用key
如果key不存在，vue会复用节点，导致拿的时之前节点的状态。key存在就取出相同key的oldNode进行diff比较。（map查找，O(1)的速度）