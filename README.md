# 实现 http 服务

这个项目使用 Node.js 的 net 模块中的 tcp 服务器，实现了一个可以处理 http 协议的服务器。

为了实现该服务需要构建一个 tcp 服务，使其能够按照 http 协议理解报文。


额外补充：

在 Node.js 中，各服务有以下的对应
- net -> tcp 服务
- dgram -> udp 服务
- http -> http 服务
- https -> https 服务
