---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/115003011091-3xx-Redirection
title: 3xx Redirection
---

# 3xx Redirection

## 3xx Redirection

**概述**

3xx 代码这一类响应表示，用户代理必须执行另一组操作才能获取完整的所请求资源。

重定向位置应在以下位置之一设置：

1.  响应中的 `Location` 字段，用于自动重定向
2.  响应的有效负载中，通过指向正确位置的超链接（可选）来设置

-   [300 Multiple](https://support.cloudflare.com/hc/zh-cn/articles/115003011091-3xx-Redirection#code_300)
-   [301 Moved Permanently](https://support.cloudflare.com/hc/zh-cn/articles/115003011091-3xx-Redirection#code_301)
-   [302 Found](https://support.cloudflare.com/hc/zh-cn/articles/115003011091-3xx-Redirection#code_302)
-   [303 See Other](https://support.cloudflare.com/hc/zh-cn/articles/115003011091-3xx-Redirection#code_303)
-   [304 Not Modified](https://support.cloudflare.com/hc/zh-cn/articles/115003011091-3xx-Redirection#code_304)
-   [305 Use Proxy](https://support.cloudflare.com/hc/zh-cn/articles/115003011091-3xx-Redirection#code_305)
-   [306 Switch Proxy](https://support.cloudflare.com/hc/zh-cn/articles/115003011091-3xx-Redirection#code_306)
-   [307 Temporary Redirect](https://support.cloudflare.com/hc/zh-cn/articles/115003011091-3xx-Redirection#code_307)
-   [308 Permanent Redirect](https://support.cloudflare.com/hc/zh-cn/articles/115003011091-3xx-Redirection#code_308)

**300 Multiple Choices** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

资源有多个选项可供客户端关注。例如，它可用于提供视频的不同格式选项，列出具有不同[扩展名](https://en.wikipedia.org/wiki/File_extensions)的文件，或用于[词义消歧](https://en.wikipedia.org/wiki/Word_sense_disambiguation)。

**301 Moved Permanently** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

所请求资源的永久 URL 重定向。目标资源已被分配了新的永久 URI，日后引用该资源时都应使用所含的某一个 URI。

Cloudflare 能够生成这些响应，因而能避免需要通过使用页面规则来发送对源站服务器的响应的请求。如需进步一了解 Cloudflare 如何帮助生成重定向，请阅读[页面规则 URL 转发](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/)

**302 Found（亦称为 Temporary Redirect）** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

类似于 301 重定向，但仅适用于临时用途。用户代理可以自动关注 `Location` 标头，但不应用它来取代当前 URI 以成为 301。

Cloudflare 能够生成这些响应，因而能避免需要通过使用页面规则来发送对源站服务器的响应的请求。如需进步一了解 Cloudflare 如何帮助生成重定向，请阅读[页面规则 URL 转发](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/)

**303 See Other（自 HTTP/1.1 起）** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

用户代理应通过 GET 请求来关注此重定向。_注意：与 301 的区别在于，重定向位置的资源不一定要与之前请求的资源相当_

-   设计用在对 `POST/DELETE` 请求的响应中，以提示源站服务器正确接收了数据并允许适当的缓存行为。
-   原始的 303 响应不可缓存，但对第 2 请求（`GET`）的响应可以缓存，因为它是在不同的 URI 下。

**304 Not Modified  (**[**RFC 7232**](https://tools.ietf.org/html/rfc7232)**)**

提醒客户端，请求的资源在缓存中可用并且有效。源站服务器未曾修改请求所查询的资源。客户端可以接收指定资源的有效负载，无需再次连接源站服务器，因此它将重定向请求以使用存储的资源。 [\[RFC7234\] 第 4.3.4 节](https://tools.ietf.org/html/rfc7234#section-4.3.4)中定义了有关可接收 304 响应的缓存的要求。

在这一响应前，客户端发送了有条件 GET 或 HEAD 请求，以指定当前已存储了什么资源。服务器向客户端发出“OK”信号，以将此资源用作最新的版本，从而减少客户端和服务器之间的数据传输量。

-   不得包含消息正文

-   必须包含要在对应的 200 响应之前设置的任何标头：`Cache-Control、Content-Location、Date、ETag、Expires` 或 `Vary`。

如果请求发送到较旧的 Cloudflare，因此必须在源站服务器重新验证，Cloudflare 将发送 304 响应以确认我们缓存中的版本与源站服务器上的版本匹配。响应中将包含 `CF-Cache-Status:REVALIDATED` 标头，Cloudflare 则使用 `If-Modified-Since` 标头来确认版本。 详细信息请参阅：[ETag 标头](https://support.cloudflare.com/hc/en-us/articles/218505467)

**305 Use Proxy（已弃用）****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

请求必须通过 Location 标头字段中的代理 URI 来履行，而不使用源站服务器。此状态代码已因为安全风险而弃用。

**306 Switch Proxy（已弃用）****(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

通知后续请求必须定向到指定的代理。

**307 Temporary Redirect** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

此重定向与 302 响应类似，但区别在于，如果使用重定向，则请求方法（如 GET 和 POST 等）不得与原始请求中所用的方法不同。

-   用户代理可以自动关注 `Location` 标头，但不应取代原始 URI。

**308 Permanent Redirect (**[**RFC 7538**](https://tools.ietf.org/html/rfc7538#section-3)**)**

此永久重定向与 301 类似，但区别在于，如果自动使用重定向，则请求方法（如 GET 和 POST 等）不得与原始请求中所用的方法不同。

-   用户代理不应自动关注 `Location` 标头
-   用户代理应将原始 URI 替换为 Location 或有效负载中的更新 URI
