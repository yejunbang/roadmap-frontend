分为：
1. 代码层面的优化：

（1）正确使用v-if 和 v-show：
v-if 适用于不频繁切换条件的场景；v-show 适用于频繁切换条件的场景。
因为v-if 切换true/false 会重新渲染，性能消耗

（2）适当使用computed
因为computed具有缓存的特性

（3）v-for带key

（4）当一个大的数组列表要渲染时，如果只是展示，可以禁止vue劫持这个数据，不用进行双向绑定，性能就快了 (Object.freeze())
export default {
  data: () => ({
    users: {}
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users);
  }
};

（5）图片资源懒加载
当图片过多时，可以使用懒加载，等滚动到可视区域时才加载
实现：使用vue-lazyload 插件，放入vue实例中使用：
<img v-lazy="/static/img/1.png"/>

（6） 组件懒加载
当组件被访问时才加载，而不是全部组件打包在一起
const router = new VueRouter({
  routes: [
    { path: '/foo', component: ()=>import('./foo')) }
  ]
})

2. webpack层面的优化：

（1）第三方插件按需引入
比如element-ui:
借助 babel-plugin-component
修改.babelrc:
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
在main.js中按需引入
import { Button, Select } from 'element-ui';
Vue.use(Button)
Vue.use(Select)

（2）使用webpack对图片进行压缩：
url-loader对小于limit的图片转化为base64，大的图片加载会慢，
借助image-webpack-loader插件进行压缩，
{
  loader: 'image-webpack-loader',
  options: {
    bypassOnDebug: true,
  }
}

（3）减少webpack打包出来的js的体积
比如：去掉console.log，注释等无用语句
es6转es5时，babel会产生很多辅助函数，对一些辅助的函数进行抽离：
借助babel-plugin-transform-runtime插件（这个插件依赖babel-polyfill）
修改.babelrc：
"plugins": [
  "transform-runtime"
]

（4） 使用webpack-bundle-analyzer对构建结果分析，可视化，快速定位构建体积大的文件

3. 基于web技术：

（1）开启gzip压缩，需要客户端，服务器同时支持
node服务器借助compression插件：
npm install compression --save
var compression = require('compression');
var app = express();
app.use(compression())

（2）浏览器缓存
看缓存详解

（3）CDN的使用
流程：
用户输入url，浏览器调用域名解析










