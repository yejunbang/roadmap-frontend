https://mp.weixin.qq.com/s/tALJXon1kVP8JLvyK8K6oA
https://mp.weixin.qq.com/s/4ZhwLilTs6oGA5kTXar-qQ
https://mp.weixin.qq.com/s/Gs_XMGhzB7_9FrZnizCwQA
1. 正向代理:
客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端,
正向代理为客户端服务,正向代理对我们是透明的，对服务端是非透明的，即服务端并不知道自己收到的是来自代理的访问还是来自真实客户端的访问。
2. 反向代理:
接受internet上的连接请求，然后将请求转发给内部网络上的服务器
反向代理为服务端服务,反向代理可以帮助服务器接收来自客户端的请求，帮助服务器做请求转发，负载均衡等。
反向代理对服务端是透明的，对我们是非透明的，即我们并不知道自己访问的是代理服务器，而服务器知道反向代理在为他服务。

3. 最主要nginx.conf
events {
  配置影响nginx服务器或与用户的网络连接。
}
http { //配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
    upstream {
      // 配置后端服务器具体地址，负载均衡配置不可或缺的部分。
    }
    server{  //配置虚拟主机的相关参数
        location path { // 配置请求的路由，以及各种页面的处理情况
        }
        location path {
        }
    }
    server{
      location path {      
      }
      location path {
      }
    }
}

配置中的全局变量：






















