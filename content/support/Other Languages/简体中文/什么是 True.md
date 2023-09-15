---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/206776727-%E4%BB%80%E4%B9%88%E6%98%AF-True-Client-IP-
title: 什么是 True-Client
---

# 什么是 True-Client-IP？ – Cloudflare帮助中心

1.  [Cloudflare帮助中心](https://support.cloudflare.com/hc/zh-cn)
2.  [网络](https://support.cloudflare.com/hc/zh-cn/categories/360002612832-%E7%BD%91%E7%BB%9C)
3.  [基本知识](https://support.cloudflare.com/hc/zh-cn/sections/360006087752-%E5%9F%BA%E6%9C%AC%E7%9F%A5%E8%AF%86)

## 什么是 True-Client-IP？

什么是 True-Client-IP？  
如果启用了 True-Client-IP，Cloudflare 将在发送给源服务器的请求（带有最终用户 IP 地址）中添加一个 True-Client-IP 标头。

从 Cloudflare 到源站的连接来自 Cloudflare IP。使用 True-Client-IP 解决方案，Cloudflare 用户可以查看用户客户端的 IP 地址，即使直接从 Cloudflare 发送到源站的流量也是如此。

此功能是 Cloudflare 当前的 CF-Connecting-IP 和 X-Forwarded-For 标头的补充。

如何开启 True-Client-IP 功能？  
True-Client-IP 位于 Cloudflare 控制面板的“Network”应用中。

![](/images/support/Screen_Shot_2015-06-30_at_3.55.04_PM.png)

True-Client-IP 适用于哪些客户？  
True-Client-IP 适用于所有 Enterprise 企业版客户。 要升级到 Enterprise，[请联系 Cloudflare 团队](https://www.cloudflare.com/enterprise-service-request)。
