---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/200168236-Cloudflare-IP-%E5%9C%B0%E7%90%86%E4%BD%8D%E7%BD%AE%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8-
title: Cloudflare IP 地理位置有什么作用？
---

# Cloudflare IP 地理位置有什么作用？

1.  [Cloudflare帮助中心](https://support.cloudflare.com/hc/zh-cn)
2.  [网络](https://support.cloudflare.com/hc/zh-cn/categories/360002612832-%E7%BD%91%E7%BB%9C)
3.  [基本知识](https://support.cloudflare.com/hc/zh-cn/sections/360006087752-%E5%9F%BA%E6%9C%AC%E7%9F%A5%E8%AF%86)

## Cloudflare IP 地理位置有什么作用？

您可以启用 IP 地理位置，以便 Cloudflare 将访问者地理定位到您的网站，并以 ISO 3166-1 Alpha 2 格式将国家/地区代码传递给您的源站。 

您将在 Cloudflare 控制面板中的**Network**应用下找到该 IP 地理位置选项。

IP 地理定位的选项位于页面底部：

![](/images/support/IPGeolocation2.png)

启用后，Cloudflare 会将名为“CF-IPCountry”的标头添加到我们向您源站发出的所有请求中。以下是一些如何定位/存储这个值的示例：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$country_code = $_SERVER[&quot;HTTP_CF_IPCOUNTRY&quot;]; // to access in PHP</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$country_code = $ENV{&quot;HTTP_CF_IPCOUNTRY&quot;}; # to access in Perl</span></div></span></span></span></code></pre>{{</raw>}}

Cloudflare 会包含 IPv4 和 IPv6 地址的信息。目前，IPv4 信息会更加精确和全面，但我们希望 IPv6 数据能够快速改进。

_XX_ 表示没有国家/地区数据。T1 是用于 Tor 网络的非标准国家/地区代码。
