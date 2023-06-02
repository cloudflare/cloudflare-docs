---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/115000546328-Cloudflare-Rate-Limiting-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4
title: Cloudflare Rate Limiting 故障排除
---

# Cloudflare Rate Limiting 故障排除

## Cloudflare Rate Limiting 故障排除

_对常见的问题进行故障排除，这些问题可妨碍正确的速率限制请求匹配，并造成使用 Cloudflare API 时出现错误。_

___

## 概述

一些常见的 **Rate Limiting** 配置问题会妨碍正确的请求匹配：

-   **在规则模式中包含 HTTP 或 HTTPS 协议方案**（例如 _https://example.com/\*_）。要将规则限制为仅匹配 HTTP 或 HTTPS 流量，请在请求匹配中使用 schemes 数组，例如 _"schemes": \[ "HTTPS" \]_
-   **忘记末尾斜杠字符（/）**。Cloudflare **Rate Limiting** 仅会同等对待对主页的请求（例如 _example.com_ 和 _example.com/_），对于任何其他路径则不会（例如 _example.com/path/_ 和 _example.com/path_）。要同时匹配带有和不带末尾斜杠的请求，请使用通配符匹配（例如，_example.com/path\*_）。
-   **包含查询字符串或锚点**（例如 _example.com/path?foo=bar_ 或 _example.com/path#section1_）。形如 _example.com/path_ 的规则将匹配对 _example.com/path?foo=bar_ 的请求。
-   **使用** [**IP 访问规则**](https://support.cloudflare.com/hc/articles/217074967)**覆盖速率限制。**
-   **包括端口号**（例如 _example.com:8443/api/_）。速率限制产品不考虑规则中的端口号，而这会影响规则。删除 URL 中的端口号后，速率限制规则就会正常触发。

此外，还有一些常见的错误会妨碍从 Cloudflare API 配置 **Rate Limiting**：

-   _解码尚未实施_ - 表示您的请求缺少 _Content-Type: application/json_ 标头。将该标头添加到 API 请求中，即可解决问题。
-   _Ratelimit.api.not\_entitled_ - Enterprise 客户必须联系 Cloudflare 客户团队后，才能添加规则。
-   其他错误请参见 [API 文档](https://api.cloudflare.com/#rate-limits-for-a-zone-errors)。如果不确定某个特定错误，请[联系 Cloudflare支持](https://support.cloudflare.com/hc/articles/200172476)并附上失败的 API 请求（修改 API 密钥后）。

___

## 局限性

速率限制的目的是对超出用户定义速率的流量激增加以限制。该系统的目的并不是为了允许精确数量的请求到达源站服务器。在检测到请求和更新内部计数器之间可能会有延迟。由于存在这种延迟（可能长达几秒钟），因此，在边缘强制执行某操作（例如阻止或质询）之前，仍可能有过多的请求到达源站。

___

## 相关资源

-   [配置 Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128)
