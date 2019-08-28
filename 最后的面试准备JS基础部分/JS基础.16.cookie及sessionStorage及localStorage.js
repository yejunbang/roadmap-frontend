https://mp.weixin.qq.com/s/x8ZeCcKFFiWDtPDC9ubk4w
https://mp.weixin.qq.com/s/mlrbcIAxnXTjigGgOIuzEg

Cookie解决http无状态，让服务器记住
Cookie是服务器发给客户端的特殊信息，cookie是以文本的方式保存在客户端，每次请求时都带上它
通常使用cookie方式存储sessionid到客户端，在交互中浏览器按照规则将sessionid发送给服务器

缺点：
大小受限
数量受限
用户可以操作（禁用）cookie，使功能受限，禁用cookie，则要使用URL重写，不安全
每次请求都会携带cookie内容，浪费带宽


sessionStorage：
sessionStorage的生命周期是在仅在当前会话下有效，当关闭浏览器，数据就消失


localStorage:
localStorage的生命周期是永久的，关闭页面或浏览器之后localStorage中的数据也不会消失。localStorage除非主动删除数据，否则数据永远不会消失。

localStorage和sessionStorage的存储数据大小一般都是：5MB


Token:
可扩展
HTTP协议是无状态的，这种无状态意味着程序需要验证每一次请求，从而辨别客户端的身份。
以前时session，但是服务器负担大
基于Token的身份验证是无状态的，我们不将用户信息存在服务器或Session中。

验证过程：
用户通过用户名和密码发送请求。
程序验证。
程序返回一个签名的token 给客户端。
客户端储存token,并且每次用于每次发送请求。
服务端验证token并返回数据。










