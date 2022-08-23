# 实现 http 服务

## 总结

这个项目使用 Node.js 的 net 模块中的 tcp 服务器，实现了一个可以处理 http 协议的服务器。

为了实现该服务需要构建一个 tcp 服务，使其能够按照 http 协议理解报文。

![请求报文格式](https://user-images.githubusercontent.com/36471625/186146225-8c2b32a1-2b45-4f75-9811-eb3e699c1fda.png)

![响应报文格式](https://user-images.githubusercontent.com/36471625/186146110-d79e4850-5c53-422c-b88b-7f8074879be0.png)

所以我们需要按照上边的报文格式去理解请求什么以及我该如何给他返回数据。

在我们收到 http 请求报文时，需要把他解析成人类友好的格式，并将原始 socket 保留，以便向他返回响应报文，浏览器收到响应后，也需要按照Http响应报文的格式去解读.

缺点：Ts 类型还不太会写，在请求对象和响应对象上的各函数做了简化

## 额外补充：

在 Node.js 中，各服务有以下的对应
- net -> tcp 服务
- dgram -> udp 服务
- http -> http 服务
- https -> https 服务
