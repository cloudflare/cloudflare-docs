---
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


**101 Switching Protocols ([RFC7231](https://tools.ietf.org/html/rfc7231))**


**102 Processing ([RFC2518](https://tools.ietf.org/html/rfc2518))**

服务器收到了客户端的完整响应，但预计要花费更多时间来处理（例如，超过 20 秒）。服务器必须在请求完成后发送最终响应。仅适用于 HTTP 1.1 及更高版本。

如果 Cloudflare 没有在 102 后的 100 秒以内收到响应，则会生成 [Error 522:Connection Timed Out](https://support.cloudflare.com/hc/articles/115003011431#522error) 错误。102 响应可用于防止 [Error 524:A timeout error](https://support.cloudflare.com/hc/articles/115003011431#524error).
