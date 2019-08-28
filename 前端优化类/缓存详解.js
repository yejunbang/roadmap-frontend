https://mp.weixin.qq.com/s/QeR5UWZLrRHtk9pD4c3MrA
https://juejin.im/post/5c93ba526fb9a070ca103898

强缓存：
不与服务器交互，借助Expires和Cache-Control,
Expires使用的时间是服务端的时间，HTTP/1 的产物，会跟客户端系统时间对比，
Cache-Control: HTTP/1.1产物，Cache-Control:max-age=300 是相对时间（单位：秒）
Cache-Control优先级高于Expires
扩展：
Cache-Control作为请求头：
Cache-Control: no-cache 告诉服务器不接收缓存的内容
Cache-Control: no-store 表示请求回的资源不会缓存，下次还会访问服务器
还有public: 允许所有用户使用缓存 private特定用户

Cache-Control作为响应头：
Cache-Control: no-cache 每次客户端请求都要向服务器确认资源有效性，资源没改返回304
Cache-Control: no-store 不对响应的资源进行缓存，即用户下次请求还是返回 200，返回资源本身。 

协商缓存
与服务器交互，借助Last-Modified和Etag,
Last-Modified: 
Fri,22Jul 201601:47:00GMT 时间是服务器最后修改资源的时间
当下一次请求时，浏览器检测到有Last-Modified这个Header，会新增If-Modified-Since的header，值是Last-Modified的值，
服务器会根据If-Modified-Since的值与服务器资源最后修改时间做对比，如果没变化，返回304和空响应体，让其中缓存中取，
弊端，可在浏览器打开缓存资源，但是Last-Modified时间会变，造成重获取

Etag:
HTTP / 1.1
是在服务器响应时，给资源的一个唯一标识，只要有变化Etag就会重新生成，
当下一次请求时，Etag值放在If-None-Match里，与服务器资源进行比较，ETag是一致的，则直接返回304知会客户端直接使用本地缓存即可。
