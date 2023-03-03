---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/115003013892-1xx-%E4%BF%A1%E6%81%AF%E6%80%A7
title: 1xx 信息性
---

# 1xx 信息性

## 1xx 信息性

**概述**

1xx 通常是用于共享连接状态信息的中间响应。不适用于最终的请求或响应操作。服务器的要求：

-   响应都以状态行后的第一个空行结束

-   不适用于 HTTP 1.0。源站服务器绝不会向 HTTP 1.0 客户端发送 1xx 响应

Cloudflare 会转发所有这些响应，而且永不会生成这种响应。

-   [100 Continue](https://support.cloudflare.com/hc/zh-cn/articles/115003013892-1xx-%E4%BF%A1%E6%81%AF%E6%80%A7#code_100)
-   [101 Switching Protocols](https://support.cloudflare.com/hc/zh-cn/articles/115003013892-1xx-%E4%BF%A1%E6%81%AF%E6%80%A7#code_101)
-   [102 Processing](https://support.cloudflare.com/hc/zh-cn/articles/115003013892-1xx-%E4%BF%A1%E6%81%AF%E6%80%A7#code_102)

**100 Continue ([RFC7231](https://tools.ietf.org/html/rfc7231))**

确认初始请求以发送响应正文。源站服务器愿意接受请求（根据请求标头）。这通常在客户端发送响应正文之前返回。这可防止客户端发送不必要或无用的数据。服务器的要求：如果客户端发送 `Expect:100-continue` 标头，服务器必须立即以 `100 Continue` 响应，并继续读取输入流或发送其他响应代码。Cloudflare 使用 Keep-Alive 连接，所以应该不需要此响应。

**101 Switching Protocols ([RFC7231](https://tools.ietf.org/html/rfc7231))**

源站服务器接受客户端切换协议的请求。客户端请求在标头字段中包含 `Upgrade`，或者此连接上使用的应用程序协议发生了变化。如果使用 Upgrade 标头字段，则服务器已同意升级到客户端优先级列表上排名高于当前所用协议的协议。源站服务器必须也以 `Upgrade` 标头字段响应，以指明连接要切换到的新协议。这假设此切换对客户端和服务器均有危险性。最常见的用例是 Websocket。如需有关 Cloudflare 的 Websocket 的更多信息，请参阅：[Cloudflare 现在支持 Websocket](https://blog.cloudflare.com/cloudflare-now-supports-websockets/)

**102 Processing ([RFC2518](https://tools.ietf.org/html/rfc2518))**

服务器收到了客户端的完整响应，但预计要花费更多时间来处理（例如，超过 20 秒）。服务器必须在请求完成后发送最终响应。仅适用于 HTTP 1.1 及更高版本。

如果 Cloudflare 没有在 102 后的 100 秒以内收到响应，则会生成 [Error 522:Connection Timed Out](https://support.cloudflare.com/hc/articles/115003011431#522error) 错误。102 响应可用于防止 [Error 524:A timeout error](https://support.cloudflare.com/hc/articles/115003011431#524error).
