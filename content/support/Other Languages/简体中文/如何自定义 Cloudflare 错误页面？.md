---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/200172706-%E5%A6%82%E4%BD%95%E8%87%AA%E5%AE%9A%E4%B9%89-Cloudflare-%E9%94%99%E8%AF%AF%E9%A1%B5%E9%9D%A2-
title: 如何自定义 Cloudflare 错误页面？
---

# 如何自定义 Cloudflare 错误页面？

## 如何自定义 Cloudflare 错误页面？

目录

1.  [概述](https://support.cloudflare.com/hc/zh-cn/articles/200172706-%E5%A6%82%E4%BD%95%E8%87%AA%E5%AE%9A%E4%B9%89-Cloudflare-%E9%94%99%E8%AF%AF%E9%A1%B5%E9%9D%A2-#section1)
2.  [自定义错误页面](https://support.cloudflare.com/hc/zh-cn/articles/200172706-%E5%A6%82%E4%BD%95%E8%87%AA%E5%AE%9A%E4%B9%89-Cloudflare-%E9%94%99%E8%AF%AF%E9%A1%B5%E9%9D%A2-#section2)

1.  [可用的自定义错误 token](https://support.cloudflare.com/hc/zh-cn/articles/200172706-%E5%A6%82%E4%BD%95%E8%87%AA%E5%AE%9A%E4%B9%89-Cloudflare-%E9%94%99%E8%AF%AF%E9%A1%B5%E9%9D%A2-#section2.1)
2.  [设计样式](https://support.cloudflare.com/hc/zh-cn/articles/200172706-%E5%A6%82%E4%BD%95%E8%87%AA%E5%AE%9A%E4%B9%89-Cloudflare-%E9%94%99%E8%AF%AF%E9%A1%B5%E9%9D%A2-#section2.2)
3.  [发布](https://support.cloudflare.com/hc/zh-cn/articles/200172706-%E5%A6%82%E4%BD%95%E8%87%AA%E5%AE%9A%E4%B9%89-Cloudflare-%E9%94%99%E8%AF%AF%E9%A1%B5%E9%9D%A2-#section2.3)
4.  [更新](https://support.cloudflare.com/hc/zh-cn/articles/200172706-%E5%A6%82%E4%BD%95%E8%87%AA%E5%AE%9A%E4%B9%89-Cloudflare-%E9%94%99%E8%AF%AF%E9%A1%B5%E9%9D%A2-#section2.4)

4.  [解决自定义错误页面的问题](https://support.cloudflare.com/hc/zh-cn/articles/200172706-%E5%A6%82%E4%BD%95%E8%87%AA%E5%AE%9A%E4%B9%89-Cloudflare-%E9%94%99%E8%AF%AF%E9%A1%B5%E9%9D%A2-#section3)

概述

![](/images/support/Screenshot_2015-04-16_15.08.04.png)

Cloudflare 拥有多种[错误代码](https://support.cloudflare.com/hc/en-us/sections/200820298-Error-Pages)，用于区分特定问题。默认情况下，这些错误页面会提到 Cloudflare；但是，[作为付费客户](https://www.cloudflare.com/plans)，您可以自定义和标记这些错误页面。拥有自定义错误页面有助于为用户提供页面一致性的体验，即使在页面加载错误的情况下也是如此。

可自定义的错误页面分为两组：

**Challenge：**

-   Basic security
-   Web Application Firewall
-   IP Firewall (Country block, Country challenge, IP (range) block)

**Cloudflare 错误：**

-   502, 504, and CF 52X errors
-   10XX errors
-   Always Online

**_注意：_** _500、501、503 和 505 响应不会触发自定义错误页面，以避免破坏特定的 API 端点和其他 Web 应用程序。对于源服务器无法返回请求响应的情况（520-526 错误），应保留自定义错误页面。_

自定义错误页面  
下面是一个基本的自定义错误模板，您可以在此基础上构建。在创建自定义错误模板时，请注意最大页面大小为 1.5 MB，页面不能为空。此外，所有外部资源都使用 base64 编码内联，发布时大小大约会增加 50%。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;head&gt;&lt;/head&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;body&gt;::[REPLACE WITH TOKEN NAME]::</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/body&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;/html&gt;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

可用的自定义错误 token  
某些类型的自定义错误页面必须在自定义错误页面的 HTML 中的任何位置包含以下 token 之一。 每个错误页面可能只存在一个页面特定的令牌，因此如果您希望自定义每个错误，则需要为包含相应令牌的每个错误创建一个自定义错误页面。

<table><tbody><tr><td><strong>自定义页面类型</strong></td><td><strong>token</strong></td></tr><tr><td>所有页面</td><td>::CLIENT_IP::</td></tr><tr><td>所有页面</td><td>::RAY_ID::</td></tr><tr><td>Basic Security (CAPTCHA Challenge)</td><td>::CAPTCHA_BOX::</td></tr><tr><td>WAF (CAPTCHA Challenge)</td><td>::CAPTCHA_BOX::</td></tr><tr><td>Country Challenge (CAPTCHA Challenge)</td><td>::CAPTCHA_BOX::</td></tr><tr><td>I'm Under Attack Mode (Interstitial Page)</td><td>::IM_UNDER_ATTACK_BOX::</td></tr><tr><td>5XX Errors</td><td>::CLOUDFLARE_ERROR_500S_BOX::</td></tr><tr><td>1XXX Errors</td><td>::CLOUDFLARE_ERROR_1000S_BOX::</td></tr><tr><td>Always Online</td><td>::ALWAYS_ONLINE_NO_COPY_BOX::</td></tr></tbody></table>

设计样式  
每个标记都有一个唯一的类，以用来设置单个错误代码的样式。可以使用 CSS 对 div/span/section 中的标记设置样式，因为它们都具有类 ID。请注意，每个页面（challenge、5xx 错误）将使用不同的 ID，因此您应使用预览选项获取正确的 ID。

发布  
完成自定义错误页面后，您需要将其发布到我们的服务器。这可以通过按下每个可自定义错误旁边的“Customize”按钮来完成。按“Customize”按钮后，将显示一个弹出窗口，要求您提供自定义错误页面的 URL。

![](/images/support/2016-08-12-160547_517x352_scrot.png)

当您输入自定义错误页面的 URL 并点击“发布”按钮时，我们会一次性请求自定义错误页面，然后将其存储在我们的服务器上。

更新  
可以通过重新发布错误页面来更新错误页面。请注意，如果 Cloudflare 无法加载您的网站，或者您已在 Cloudflare 防火墙中阻止了美国，则发布和预览错误页面将不起作用。

解决自定义错误页面的问题

-   如果您在尝试预览或发布自定义错误页面时遇到错误，请通过 [HTML 验证程序](https://validator.w3.org/)运行该页面并确保其没有错误。
-   确保页面大小大于 0。您需要向页面添加内容。
-   确保您发送带有 200 状态代码的自定义错误页面。
-   如果 Cloudflare 无法加载您的网站，或者您已在 IP 防火墙中阻止了美国，则发布和预览错误页面将不起作用。
