Vue-router
作为VUE SPA单页应用的路径管理器
为啥不用a标签:
  因为Vue是单页应用, 当项目打包时,dist文件夹里面只有静态资源和一个index.html, 所有a标签不起作用
  还有a标签有跳转路径和描点的默认行为,

SPA(单页面应用程序): 只有一个完整的页面, 它再加载页面时, 不会加载整个页面, 而是只更新某个指定的容器中内容,
  核心是: 只更新视图而不重新请求页面

vue-router有两种模式:
mode: hash模式:(默认)
http://localhost:8080/hello#world
hash通过瞄点值的改变, 根据不同的值, 渲染指定DOM位置的不同数据, hash值改变会触发onhashchange事件
hash只会出现再URL中, 但不会被包含再http请求中, 对后端没有影响

history模式:
利用的是h5的history interface中新增的 pushState() 和 replaceState() 方法, 应用于浏览器记录栈
再原有的back, forward, go基础之上, 提供对历史记录修改的功能




vue-router实现页面跳转:
this.$router.push('路由地址')
<router-link to='路由地址'></router-link>


vue-router传参:
声明式的导航<router-link></router-link>
编程式的导航this.$router.push()

routes: {
  {
    path: '/',
    name: 'Hello',
    component: ()=> import('...')
  }
}

有param传参:
<router-link :to="{name: 'Hello', params: {key:value}}"
this.$router.push({
  name: 'Hello',
  params: {key:value}
})
query传参:
<router-link :to="{name: 'Hello', query: {key:value}}"
this.$router.push({
  name: 'Hello',
  query: {key:value}
})
主要区别式query传参会出现在url上

接收:
this.$route.params.key
this.$route.query.key


利用URL传递参数:
routes: {
  {
    path: '/user/:id',
    name: 'Hello',
    component: ()=> import('...')
  }
}
this.$route.params.id获取


也可以定义多个<router-view></router-view>
<router-view></router-view>
<router-view name='left'></router-view>
<router-view name='right'></router-view>

routes: {
  {
    path: '/user/:id',
    name: 'Hello',
    components: {
      default: ()=>import('...'),
      left: default: ()=>import('...'),
      right: default: ()=>import('...')
    }
  }
}