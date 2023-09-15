---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/115003014432-HTTP%E7%8A%B6%E6%80%81%E4%BB%A3%E7%A0%81
title: HTTP状态代码
---

# HTTP状态代码

## HTTP状态代码

这些文档是 Cloudflare 在 HTTP 响应代码方面对 Internet 标准跟踪协议解读。请参考当前版本的“Internet Official Protocol Standards”（STD 1）来获取此协议的标准化状态说明。我们也附上了所有 Cloudflare 自定义错误代码（52x）和其他常见的状态代码。

在这些文章中，我们较多地提及了以下术语。为方便您理解，下方提供了我们对这些术语的定义：

**服务器 -** 接收请求和发送响应的任何一方。可以是源站和中间服务器。

**源/主机服务器** \- 最终的目的地服务器。此服务器真正托管网站的内容。

**代理服务器** \- 介于源站服务器和客户端之间的服务器。例如，Cloudflare 就属于代理服务器。

**客户端** \- 发出请求的一方。通常是通过浏览器访问站点的最终用户，但也可以是 API 客户端或从站点请求资源的任何人。

**后端** - 并非对客户端或从客户端进行的连接，而是介于代理服务器和/或源站服务器之间的连接

**用户代理** - 用于发送请求的机器。可以是发出请求的浏览器或其他程序，如 RESTful API 请求

**有效负载** - 剔除了标头的响应或请求数据。也称为响应/请求正文

**缓存相关注释**： _默认情况下，任何可以缓存的 HTTP 状态代码也视为可被 Cloudflare 缓存（除非方法定义或显式缓存控制另有指示）。 Cloudflare 缓存 HTTP 响应的方式与缓存任何请求的方式类似。Cloudflare 在决定是否要缓存时，会考虑页面规则、边缘 TTL 和源标头。如需更多信息，请参阅[如何告诉 Cloudflare 需要缓存的内容？](https://support.cloudflare.com/hc/en-us/articles/202775670-How-Do-I-Tell-CloudFlare-What-to-Cache-)和[边缘 TTL 是什么意思？](https://support.cloudflare.com/hc/en-us/articles/200168376)_

**HTTP 状态代码：**

**[1xx 信息性](https://support.cloudflare.com/hc/en-us/articles/115003013892/)**

**[2xx 成功](https://support.cloudflare.com/hc/en-us/articles/115003014192)**

**[3xx 重定向](https://support.cloudflare.com/hc/en-us/articles/115003011091/)**

**[4xx 客户端错误](https://support.cloudflare.com/hc/en-us/articles/115003014512/)**

**[5xx 服务器错误](https://support.cloudflare.com/hc/en-us/articles/115003011431/)**
