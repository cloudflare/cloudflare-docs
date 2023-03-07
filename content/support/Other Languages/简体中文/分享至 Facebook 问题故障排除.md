---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/217720788-%E5%88%86%E4%BA%AB%E8%87%B3-Facebook-%E9%97%AE%E9%A2%98%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4
title: 分享至 Facebook 问题故障排除
---

# 分享至 Facebook 问题故障排除

## 分享至 Facebook 问题故障排除

了解如何避免通过 Cloudflare **Firewall** 应用阻止 Facebook IP。

___

## 概述

默认情况下，Cloudflare 不阻止或质询来自 Facebook 的请求。但在以下情形中，网站发帖至 Facebook 将返回 _Attention Required_ 错误：

-   安全级别设置为 [I'm Under Attack](https://support.cloudflare.com/hc/search/click?data=BAh7CjoHaWRpBN5a7gs6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiSC9oYy9lbi11cy9hcnRpY2xlcy8yMDAxNzAyMDYtSG93LWRvLUktZW5hYmxlLUktbS1VbmRlci1BdHRhY2stbW9kZS0GOwdGOg5zZWFyY2hfaWRJIik4YjE5YTBmNS0zNDViLTRkZmEtYmEzYy01NDk4NDlhNmZkNjEGOwdGOglyYW5raQ8%3D--12cd9c846382e475f31a1186344911da7ed54d9c)（不论是全局设置还是通过 [Page Rule](https://support.cloudflare.com/hc/articles/200172336) 设置），或者
-   用户定义的防火墙质询或阻止包含 Facebook IP 地址的请求。

若要解决分享至 Facebook 问题，您可以

-   删除质询或阻止 Facebook IP 的相应 IP、ASN 或国家/地区[防火墙规则](https://support.cloudflare.com/hc/articles/360016473712)或 [IP 访问规则](https://support.cloudflare.com/hc/articles/217074967)，或者
-   将 AS32934 和 AS63293 列在您的 [IP 访问规则](https://support.cloudflare.com/hc/articles/217074967)白名单中，以覆盖质询、阻止和 Under Attack 质询。

如果遇到与 Facebook 分享相关的问题，您需要通过 Facebook 的 [Object Debugger](https://developers.facebook.com/tools/debug/og/object/) 的 **Fetch New Scrape Information** 选项重新抓取页面。

如果您仍然有问题，请[联系 Cloudflare 支持](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730)并附上以下详细信息：

-   无法向 Facebook 分享的网站的 URL
-   [Facebook 调试工具](https://developers.facebook.com/tools/debug/og/object/)的输出
-   您已重新抓取 URL 的确认信息
