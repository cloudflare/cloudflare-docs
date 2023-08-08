---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360038470312-%E4%BA%86%E8%A7%A3-SameSite-Cookie-%E4%B8%8E-Cloudflare-%E7%9A%84%E4%BA%A4%E4%BA%92
title: 了解 SameSite Cookie 与 Cloudflare 的交互
---

# 了解 SameSite Cookie 与 Cloudflare 的交互

## 了解 SameSite Cookie 与 Cloudflare 的交互

_了解 SameSite Cookie 的信息，以及它如何防止跨站点请求伪造（CSRF）。_

### 本文内容

-   [概述](https://support.cloudflare.com/hc/zh-cn/articles/360038470312-%E4%BA%86%E8%A7%A3-SameSite-Cookie-%E4%B8%8E-Cloudflare-%E7%9A%84%E4%BA%A4%E4%BA%92#6sS5uZzzHBvm8wUE8s03PA)
-   [SameSite 和 cf\_clearance Cookie 的已知问题](https://support.cloudflare.com/hc/zh-cn/articles/360038470312-%E4%BA%86%E8%A7%A3-SameSite-Cookie-%E4%B8%8E-Cloudflare-%E7%9A%84%E4%BA%A4%E4%BA%92#4C6RjJMNCGMUpBYm0vCYj1)
-   [相关资源](https://support.cloudflare.com/hc/zh-cn/articles/360038470312-%E4%BA%86%E8%A7%A3-SameSite-Cookie-%E4%B8%8E-Cloudflare-%E7%9A%84%E4%BA%A4%E4%BA%92#2rguRILQN66tN1bPXCQlAr)

___

## 概述

[Google Chrome 的 SameSite Cookie](https://www.chromium.org/updates/same-site) 改变了 Google Chrome 处理 SameSite 控件的方式。Google 强制执行 SameSite，以防止跟踪用户的营销 Cookie 和允许攻击者窃取或操纵您的 Cookie 的跨站点请求伪造（CSRF）。

SameSite Cookie 具有 3 种不同的模式：

-   **Strict**：Cookie 由第一方（所访问的域）创建。例如，在访问 Cloudflare.com 时 Cloudflare 会设置第一方Cookie。
-   **Lax**：Cookie 由域顶端（如 _\*.foo.com_）创建。例如，如果有人（_blog.naughty.com_）热链接了图像（_img.foo.com/bar.png_），客户端不会将 Cookie 发送到 _img.foo.com_，因为它既不是第一方，也不是顶端上下文。
-   **None**：Cookie 与所有请求一起发送。

[Cloudflare Cookie](https://support.cloudflare.com/hc/articles/200170156) 的 SameSite 设置包括：

| Cloudflare Cookie | SameSite 设置 | 仅 HTTPS |
| --- | --- | --- |
| \_\_cfduid | SameSite=Lax | 否 |
| \_\_cf\_bm | SameSite=None; Secure | 是 |
| cf\_clearance | SameSite=None; Secure | 是 |
| \_\_cfruid | SameSite=None; Secure | 是 |
| \_\_cflb | SameSite=Lax | 否 |

___

## SameSite 和 cf\_clearance Cookie 的已知问题

在解决了 [Cloudflare CAPTCHA](https://support.cloudflare.com/hc/articles/200170136) 或 JavaScript 质询（例如对于 [**Firewall Rule**](https://support.cloudflare.com/hc/articles/360016473712) 或 [**IP Access Rule**](https://support.cloudflare.com/hc/articles/217074967)），客户端浏览器中会设置一个 **cf\_clearance** Cookie。_cf\_clearance_ Cookie 的默认寿命是 30 分钟，但可以通过Cloudflare **Firewall** 应用的 **Settings** 选项卡中的 [**Challenge Passage**](https://support.cloudflare.com/hc/articles/200170136#2dwCrNWIMnNJDP6AVjEQ3e) 进行配置。

Cloudflare 自 **cf\_clearance** Cookie 起使用 **SameSite**\=_None_，以便来自不同主机名的访问者请求不会遇到后续的质询或错误。使用 **SameSite**\=_None_ 时，必须与 _Secure_ 标志一同设置。

使用 _Secure_ 标志需要通过 HTTPS 连接发送 Cookie。如果您的网站上有任何部分使用 HTTP，**cf\_clearance** Cookie 会默认为 **SameSite**\=_Lax_，并可能会导致问题。

如果您的网站上有任何部分使用 HTTP，则 **cf\_clearance** Cookie 默认为 **SameSite** =_Lax_，这可能会导致网站无法正常运作。要解决问题，请将您的网站流量迁移到 HTTPS。Cloudflare 提供了两个功能来协助您：

-   [**Automatic HTTPS Rewrites**](https://support.cloudflare.com/hc/articles/227227647)，以及
-   [**Always Use HTTPS**](https://support.cloudflare.com/hc/articles/204144518#h_a61bfdef-08dd-40f8-8888-7edd8e40d156)。

___

## 相关资源

-   [了解有关 SameSite Cookie 的更多信息](https://web.dev/samesite-cookies-explained/)
-   [了解 Cloudflare Cookie](https://support.cloudflare.com/hc/articles/200170156)
-   [Cloudflare DNS 常见问题](https://support.cloudflare.com/hc/articles/204144518#h_999722138611548960019807)
-   [了解 Automatic HTTPS Rewrites](https://support.cloudflare.com/hc/articles/227227647)
