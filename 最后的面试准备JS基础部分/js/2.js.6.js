1. 跨域的方法有哪些？原理是什么？
知其然知其所以然，在说跨域方法之前，我们先了解下什么叫跨域，浏览器有同源策略，
只有当“协议”、“域名”、“端口号”都相同时，才能称之为是同源，其中有一个不同，即是跨域。
那么同源策略的作用是什么呢？同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。
那么我们又为什么需要跨域呢？一是前端和服务器分开部署，接口请求需要跨域，二是我们可能会加载其它网站的页面作为iframe内嵌。

jsonp：只能支持 get 请求
//前端代码
function jsonp({url, params, cb}) {
  return new Promise((resolve, reject) => {
      //创建script标签
      let script = document.createElement('script');
      //将回调函数挂在 window 上
      window[cb] = function(data) {
          resolve(data);
          //代码执行后，删除插入的script标签
          document.body.removeChild(script);
      }
      //回调函数加在请求地址上
      params = {...params, cb} //wb=b&cb=show
      let arrs = [];
      for(let key in params) {
          arrs.push(`${key}=${params[key]}`);
      }
      script.src = `${url}?${arrs.join('&')}`;
      document.body.appendChild(script);
  });
}
//使用
function sayHi(data) {
  console.log(data);
}
jsonp({
  url: 'http://localhost:3000/users/user',
  params: {
      //code
  },
  cb: 'sayHi'
}).then(data => {
  console.log(data);
});

cors:
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'XXX');
  res.setHeader('Access-Control-Allow-Headers', 'XXX'); //允许返回的头
  res.setHeader('Access-Control-Allow-Methods', 'XXX');//允许使用put方法请求接口
  res.setHeader('Access-Control-Max-Age', 6); //预检的存活时间
  if(req.method === "OPTIONS") {
      res.end(); //如果method是OPTIONS，不做处理
  }
});

nginx 反向代理
在nginx.conf下配置server 
server {
  listen       8090;

  server_name  localhost;

  location / {
      root   /Users/liuyan35/Test/Study/CORS/1-jsonp;
      index  index.html index.htm;
  }
  location /say {
      proxy_pass   http://localhost:3000;
      add_header 'Access-Control-Allow-Origin' '*';
      add_header 'Access-Control-Allow-Credentials' 'true';
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
  }
}

websocket
const ws = new WebSocket('ws://localhost:8090')
ws.onopen = function () {
  ws.send('hello')
}
ws.onmessage = function (result) {
  console.log('====output====>>>', result.data);
}
node 中间件