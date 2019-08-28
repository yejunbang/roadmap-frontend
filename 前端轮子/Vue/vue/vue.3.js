通信：
都可以使用vuex通信。

父子组件：
1. （主动）父组件调用时，绑定属性，子组件通过props获取
    (不知情)子组件 this.$parent.msg 主动获取值
    父组件通过定义<child ref='zi'>, this.$refs.msg 主动获取子组件属性和方法
    子组件可以通过this.$emit('function',args) 来触发一个事件，并传递参数
    子组件：this.$emit('update:title', newTitle)  父组件<child :title.sync="doc.title"/>


兄弟组件, 孙子组件：
1. 创建一个bus中央消息事件总线
let bus = new Vue()
bus.$emit('function',args)
兄弟组件就监听：bus.$on('function',function(args){})


祖孙组件：
provider/inject：简单的来说就是在父组件中通过provider来提供变量，然后在子组件中通过inject来注入变量。
祖先组件：
export default {
  name: 'Test',
  provide: {
    name: 'Garrett'
  }
}
孙子组件：
export default {
  name: 'Grandson',
  inject: [name] // 用法与props完全相同
}

provide 和 inject 绑定并不是可响应的
name的改变，子组件中name是不会变的
  
// 方法二:使用vue2.6最新API Vue.observable 优化响应式 provide
provide() {
  this.theme = Vue.observable({
    color: "blue"
  });
  return {
    theme: this.theme
  };
},
methods: {
  changeColor(color) {
    if (color) {
      this.theme.color = color;
    } else {
      this.theme.color = this.theme.color === "blue" ? "red" : "blue";
    }
  }
}


子组件中:
{{injections.theme.color}}

export default {
  inject: {
    theme: {
      default:()=>({})
    }
  }
}