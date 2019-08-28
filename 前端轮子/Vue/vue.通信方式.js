1. 通信方式有几种？
通信组件有：父子组件通信、隔代组件通信、兄弟组件通信
6种
（1）props / $emit 适用 父子组件通信

（2）ref 与 $parent / $children 适用父子组件通信
父：
<Child ref="child"></Child>
this.msgFromChild=this.$refs.childItemId.childMsg; // 获取值

<Child></Child>
this.msgFromChild=this.$children[0].childMsg; // 子组件数组

子：
this.$parent.parentMsg="子组件中可以修改父组件的内容，这是通过子组件修改所得"
this.msgFromParent=this.$parent.parentMsg;

ref不能再created中使用，还没创建dom

（3）EventBus （$emit / $on）消息事件总线，适应父子，兄弟，隔代
Vue.prototype.$bus=new Vue() // 创建一个空的vue实例
this.$bus.$on('customEvent',function(data){
  this.msg = data
})
this.$bus.$emit('customEvent','自定义事件值')

（4）$attrs/$listeners， inheritAttrs: false  适应隔代
父：
<Child :msg='msg' @doSomething='doSomething1'></Child>

子：
<grandson v-bind='$attrs' v-on='$listeners'></grandson> // 继续传入孙子组件
inheritAttrs:false, // inheritAttrs的默认值为true，默认会继承所有的attrs

注意： $attrs是指再子组件中，除了子的props外的字段，传给孙子

孙子：
<div>{{msg}}</div>
props:{
  msg: {
    type: String
  },
}，
methods: {
  do() {
      this.$emit('doSomething', 'aaa')  // 传回给祖父值
  }
}

（5）provide / inject  适应隔代
父组件中通过provider来提供变量，然后在子组件中通过inject来注入变量。
相当于发布，订阅模式
父：
provide() {
  return {
    msg: '来自父的消息'
  }
}

子/孙子：
inject: ['msg'] //接收消息，msg也可以是一个方法

（6）Vuex 适应父子，兄弟，隔代