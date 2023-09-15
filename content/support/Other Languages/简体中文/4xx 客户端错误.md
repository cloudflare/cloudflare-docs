---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF
title: 4xx 客户端错误
---

# 4xx 客户端错误

**概述**

4xx 代码通常指明客户方面出现了问题。也可能是网络问题。  

-   对任何请求方法，都有可能遇到4xx错误

-   源站服务器应包括一条错误信息以及与User-agent关连的解释，对于 `HEAD` 请求除外

Cloudflare 将这类错误从源站转交给您的访问者

-   [400 Bad Request](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_400)  
-   [401 Unauthorized](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_401)
-   [402 Payment Required](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_402)
-   [403 Forbidden](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_403)
-   [404 Not Found](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_404)
-   [405 Method Not Allowed](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_405)
-   [406 Not Acceptable](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_406)
-   [407 Authentication Required](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_407)  
-   [408 Request Timeout](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_408)  
-   [409 Conflict](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_409)
-   [410 Gone](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_410)
-   [411 Length Required](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_411)
-   [412 Precondition Failed](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_412)  
-   [413 Payload Too Large](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_413)
-   [414 URI Too Long](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_414)
-   [415 Unsupported Media Type](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_415)
-   [417 Expectation Failed](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_417)
-   [429 Too Many Requests](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_429)
-   [451 Unavailable For Legal](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_451)
-   [499 Client Close Request](https://support.cloudflare.com/hc/zh-cn/articles/115003014512-4xx-%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%94%99%E8%AF%AF#code_499)

**400 Bad Request**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

服务器无法处理请求，由于某些内容被认为是客户端错误（例如，语法错误、无效的请求消息框架或异常的请求路径）。

**401 Unauthorized (**[**RFC 7235**](https://tools.ietf.org/html/rfc7235)**)**

未使用正确的验证信息发送请求

-   服务器必须根据[第 4.1 节](https://tools.ietf.org/html/rfc7235#section-4.1)以 `WWW-Authenticate` 标头字段的形式质询用户信息
-   客户端可以用相同凭据发送第二个请求，如果质询与之前的相同，则服务器将提供实体以帮助客户端找到所需的验证信息。

**402 Payment Required** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

尚未按照 RFC 标准实施，但保留供将来使用

**403 Forbidden** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

如果您看到没有显示 Cloudflare 字样的 403 错误，则该错误是直接从源站 Web 服务器返回的，而不是 Cloudflare 返回的，该错误通常与您服务器上的权限设置有关。

出现此错误的主要原因是：  
1.您设置的权限配置，或者您设置的 .htaccess 文件中配置的规则  
2.Mod\_security 规则。  
3.IP 拒绝访问限制

由于 Cloudflare 无法直接访问您的源站，因此请与您的服务器提供商联系，以获得有关解决 403 错误和修改规则的帮助。您应确保您的源站没有拦截 [CloudFlare 的 IP](https://www.cloudflare.com/ips)。

如果请求触发了 Cloudflare 上的域名启用的 WAF 规则，Cloudflare 也将发送 403 响应。阅读更多内容：[Web 应用程序防火墙（WAF）的作用是什么？](https://support.cloudflare.com/hc/en-us/articles/200172016) Cloudflare 还可能对任何未被 SSL 证书涵盖的子域/域的请求发出403响应。

如果您看到了一个 403 响应，并且其响应正文中包含 Cloudflare 字样 ，则这是使用我们某些安全功能返回的 HTTP 响应码：

-   Web 应用程序防火墙 Challenge 和 Block 页面
-   基本防护等级质询
-   大多数 1xxx Cloudflare 错误代码
-   浏览器完整性检查
-   如果您尝试使用 Cloudflare 颁发的证书通过 Cloudflare 访问第二级子域（例如 `*.*.example.com`），您会在浏览器中看到 HTTP 403 错误，因为这些主机名并不存在在证书上。

如果您有疑问，请联系 Cloudflare 支持，并且附件您看到的消息的屏幕截图，或将该页面上的所有文本复制到工单中。

**404 Not Found** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

源站服务器无法或不愿找到所请求的资源。这通常意味着主机服务器无法找到资源。 要发送此问题的永久错误消息，应使用 410 错误代码。

这些错误通常在以下情形中发生：有人在您的站点上输错 URL、来自另一页面的链接已被破坏、之前存在的页面已被移动或删除，或者搜索引擎给您站点编制索引时出错。对于典型的网站，这些错误占总页面查看数的 3%，但通常无法由 Google Analytics 等传统的分析平台跟踪。

网站所有者通常会自定义产生该错误时的错误页面。例如，[在 Apache 中实施自定义 404 页面](https://www.digitalocean.com/community/tutorials/how-to-create-a-custom-404-page-in-apache)。

Cloudflare 不会主动生成 404 错误，我们只代理来自源站的错误响应。在您开启的 Cloudflare 网站发现 404 时，应该联系您的主机提供商寻求帮助。

**405 Method Not Allowed** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

源站具有所请求的资源，但不支持用户使用的请求方法。

-   源站服务器必须提供 `Allows` 标头以及该资源支持的目标列表。

例如资源可以设置为不可改变 POST，从而只接受 GET。

**406 Not Acceptable** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

请求的资源的内容特性无法满足请求头中的条件（例如，通过 `Accept-Charset` 和 `Accept-Language` 标头）

此状态代码可以通过提供其他或次要合适的实体来解决。

**407 Authentication Required  (**[**RFC 7235**](https://tools.ietf.org/html/rfc7235)**)**

客户端未随着请求一起发送所需的身份验证。

**408 Request Timeout**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

未在所需的时间内收到完整的请求。

-   表示服务器不希望继续等待。

-   较少使用，因为服务器通常会直接关闭连接。

**409 Conflict** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

由于与资源的当前状态发生冲突，请求未完成。通常发生在 PUT 请求中，其中多个客户端正在尝试编辑相同的资源。

-   服务器_应_生成包含足够信息的负载，以便客户端识别冲突来源。
-   客户端可以而且应该再次重试请求

Cloudflare 将发送 409 响应，并生成 [Error 1001:DNS Resolution Error](https://support.cloudflare.com/hc/articles/360029779472#error1001)。

**410 Gone** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

所请求的资源在源站永久遗失。

-   服务器建议应该删除引用资源的链接。
-   服务器无需使用410来代替 404 响应，也不是一定要进行此响应。

**411 Length Required** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

客户端未在 HTTP 标头中定义请求的 `Content-Length` ，这是获取资源所必需的。

-   客户端可以添加标头字段后重新发送请求。

**412 Precondition Failed  (**[**RFC 7232**](https://tools.ietf.org/html/rfc7232)**)**

服务器拒绝请求，因为资源无法满足客户端指定的条件。

例如，版本控制，客户端正在修改一个现有资源，因此设置 `If-Unmodified-Since` 标头，以匹配客户端下载资源并开始编辑的日期。如果在此日期之后以及上传编辑之前编辑了资源（可能是其他客户），则会生成此响应，因为上次编辑的日期将在 `If-Unmodified-Since` 中根据客户端日期生成。

Cloudflare 将发送此响应。详细信息请参阅：[ETag 标头](https://support.cloudflare.com/hc/en-us/articles/218505467)

**413 Payload Too Large**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

服务器拒绝处理请求，因为从客户端发送的负载大于服务器希望接受的有效负载。服务器可选择关闭连接。

-   如果此拒绝只会暂时发生，那么服务器应发送 `Retry-After` 标头，以指定客户端何时应再次尝试发出请求。

**414 URI Too Long** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

服务器拒绝，因为 URI 太长而无法处理。例如，如果客户端在 POST 之后尝试 GET 请求并使用异常长的 URI，则可能产生安全风险并生成 414。

Cloudflare 将对长度超过 32KB 的 URI 生成此响应

**415 Unsupported Media Type** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

服务器拒绝处理当前负载的格式。识别和解决此问题的一种方法是查看客户端请求中发送的 `Content-Type` 或 `Content-Encoding` 标头。

**417 Expectation Failed** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

服务器未能满足客户请求的 `Expect` 标头中指定的要求。

**429 Too Many Requests (**[**RFC6585**](https://tools.ietf.org/html/rfc6585)**)**

客户端在根据服务器指定的时间内发送了太多请求。429通常会在触发“Rate Limiting (速率限制)”时产生。服务器可以作出响应并提供信息，使请求者在特定时间段之后重试。

当请求被[速率限制](https://www.cloudflare.com/rate-limiting/)时，Cloudflare 将生成并发送此状态代码。如果您网站的访问者收到这些错误代码，您将能够在 [Rate Limiting Analytics](https://support.cloudflare.com/hc/en-us/articles/115003414428-Rate-Limiting-Analytics) 中看到此信息。

**451 Unavailable For Legal Reason (**[**RFC7725**](https://tools.ietf.org/html/rfc7725)**)**

由于法律原因，服务器无法提供资源。

通常，搜索引擎（例如 Google）和 ISP（例如 ATT）受此响应代码影响，而源站不受影响。

-   响应会在响应正文中包括一条解释，其中包含法律要求的详细信息。

**499 Client Close Request**

Nginx 特定响应代码，表明当服务器仍在处理请求时，客户端主动关闭连接，使服务器无法返回状态代码。

-   这项错误将被记录在 [Enterprise Log Share](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-REST-API) 和企业客户的控制面板的status code analytics中。
