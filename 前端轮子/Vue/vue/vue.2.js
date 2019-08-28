1. 如何创建一个组件：
用Vue.extend()创建
// 构建一个子组件
var todoItem = Vue.extend({
  template: ` <li> {{ text }} </li> `,
  props: {
      text: {
          type: String,
          default: ''
      }
  }
})
手动创建 todoItem 实例，并挂载到一个元素上
new todoItem().$mount('#mount-point')
生成实例，向在哪里插入都可以

全局注册它：Vue.component('todoItem', todoItem);
局部注册它：
new Vue({
  el: '#app1',
  components: {
      'todoItem': todoItem
  }
});

或：
Vue.component('hello',
  template: '<p>{{firstName}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
    }
})
全局注册一个组件

如果使用了vue-cli，webpack的话可以局部：（推荐）
export default {
  components: {
    ComponentA,
    ComponentC
  },
}

data必须为一个函数：
  因为组件可能被用来创建多个实例，如果是一个对象的话，所有的实例将共享这个对象，
  但是变成函数的话，每创建一个实例都会有这个组件数据对象的副本




