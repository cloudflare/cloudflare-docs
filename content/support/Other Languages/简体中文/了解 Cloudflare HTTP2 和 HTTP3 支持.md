---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/200168076-%E4%BA%86%E8%A7%A3-Cloudflare-HTTP-2-%E5%92%8C-HTTP-3-%E6%94%AF%E6%8C%81
title: 了解 Cloudflare HTTP2 和 HTTP3 支持
---

# 了解 Cloudflare HTTP/2 和 HTTP/3 支持

## 了解 Cloudflare HTTP/2 和 HTTP/3 支持

_了解 Cloudflare 如何支持 HTTP/2 和 HTTP/3 来加速您的网站，而无需更改现有代码库。_

___

## 概述

HTTP/2 和 HTTP/3 可加快页面加载速度，对所有 [Cloudflare 计划](http://www.cloudflare.com/plans)均免费。HTTP/2 默认启用，需要[在 Cloudflare 的边缘网络上使用 SSL 证书](https://support.cloudflare.com/hc/articles/203295200#h_036e2e20-96d8-4199-bb1f-0fbb41b5cdd0)。通过 Cloudflare **Network** 应用配置 HTTP/2 和 HTTP/3。Free 计划上的域不能禁用 HTTP/2。

浏览器和 Web 服务器会自动协商可用的最高协议。因此，HTTP/3 优先于 HTTP/2。

要确定用于您的连接的协议，请在 Web 浏览器或客户端中输入 _example.com_/cdn-cgi/trace，并将 _example.com_ 替换为您的域名。之后会返回几行数据。如果结果中出现 _http=h2_，则表示连接是通过 HTTP/2 进行的。其他可能的值有 _http=http2+quic/99_（表示 HTTP/3）和 _http=http/1.x_ （表示_HTTP/1.x_）。

___

HTTP/2 通过以下方式改善页面加载时间：

-   连接多路复用 - 在单个网络请求中检索多个资源。资源可用时发送响应，以免减慢页面渲染速度。
-   HTTP 标头压缩 - 压缩标头并简化 HTTP 请求，以避免重新发送标头。
-   HTTP/2 服务器推送 - 为了提高页面加载速度，Cloudflare 提供了其他资源供客户端缓存，而无需等待其他请求。

注意：

-   部分浏览器不支持 HTTP/2，而会使用 HTTP1.x。
-   连接多路复用视具体的域而定。

___

## HTTP/3

HTTP/3 可实现快速、可靠和安全的连接。默认情况下，HTTP/3 使用 Google 开发的名为 QUIC 的协议对互联网传输进行加密。可通过 Cloudflare **Network** 应用启用 HTTP/3。

如需更多信息，请查阅我们的 [HTTP/3 开发人员文档](/http3/)。

___

## 服务器推送

借助服务器推送功能，源 Web 服务器可将资源发送到客户端或 Web 浏览器，不必等待解析 HTML 以获取对其他资产（例如图像、样式表或 JavaScript 等）的引用。服务器推送避免了通常为页面上各个脚本或样式表花费的 HTTP 请求和响应周期。服务器推送面向所有 Cloudflare 计划。

服务器推送从源服务器的 **Link** 标头的 rel=preload 参数提取 URI 引用，然后将这些额外 URI 提供给客户端。示例 **Link** 标头包括：

`Link: </images/image.png>;rel=preload;`

`Link: </css/main.css>;rel=preload;`

服务器推送限制为每页 50 个资产，每个连接 100 个资产。

___

## 相关资源

-   [HTTP/3：过去、现在和未来](https://blog.cloudflare.com/http3-the-past-present-and-future/)
-   [The QUICening](https://blog.cloudflare.com/the-quicening/)
-   [QUIC 和 Rust 浅尝！](https://blog.cloudflare.com/enjoy-a-slice-of-quic-and-rust/)

浏览器支持信息：

-   [HTTP/2](http://caniuse.com/#feat=http2) 
-   [HTTP/3](https://caniuse.com/#feat=http3)
