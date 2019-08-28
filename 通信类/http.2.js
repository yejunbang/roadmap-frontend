请求行: POST /user HTTP/1.1
有请求方法, 请求URL, Http协议及版本
请求头: Content-Type: application/json ...
请求体: name=pogba


请求方法有: GET, HEAD, POST, PUT, DELETE
GET和POST区别:
GET会被浏览器主动缓存, 请求参数会被完整保留在浏览器历史记录里, 而POST不会
GET请求的参数有长度限制, POST没有

keep-alive:
持久连接: 好处在于减少了TCP连接的重复建立和断开, 减轻了服务器负担, 一个连接可以发多个请求
管线化:
不用等待响应亦可直接发送下一个请求, 做到并发发送请求