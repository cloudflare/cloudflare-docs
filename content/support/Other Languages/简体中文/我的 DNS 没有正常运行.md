---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/217912538-%E6%88%91%E7%9A%84-DNS-%E6%B2%A1%E6%9C%89%E6%AD%A3%E5%B8%B8%E8%BF%90%E8%A1%8C
title: 我的 DNS 没有正常运行
---

# 我的 DNS 没有正常运行

## 我的 DNS 没有正常运行

_本文提供了 DNS 没有为您域名工作的原因，并提供了进行故障排除的步骤。_

___

## 问题

在 Safari 或 Chrome 等 Web 浏览器中，有几种常见的 DNS 错误：

-   _无法访问此站点_
-   _此网页无法使用_
-   _err\_name\_not\_resolved_
-   _找不到服务器_
-   [_错误 1001 DNS 解析错误_](https://support.cloudflare.com/hc/articles/360029779472#error1001)

___

## 常见原因和解决方案

以下是 DNS 解析错误的最常见原因以及建议的解决方案。

### 拼写错误的域名子域

请证请求 URL 中的域名子域是否拼写正确。

### 缺少 DNS 记录

确保在 Cloudflare dashboard **DNS** 应用中拥有必要的 DNS 记录。其中包括以下记录：

-   根域（例如 _example.com_）
-   任何现有的子域（例如，_www.example.com、blog.example.com_ 等）

了解有关设置 A 记录和 CNAME [DNS 记录](/dns/manage-dns-records/how-to/create-dns-records)的详细信息。

### 在将域添加到 Cloudflare 之前，未禁用 DNSSEC

如果在将域添加到 Cloudflare 之前，在域提供商处[未禁用 DNSSEC](https://support.cloudflare.com/hc/articles/205359838#h_94453043811540417238269)，则会发生 DNS 解析失败。

### 域名服务器不再指向 Cloudflare

如果您通过 Cloudflare 仪表板中的 **DNS** 应用管理 DNS 记录，但的域名停止指向 Cloudflare 的域名服务器，则 DNS 解析将中断。如果您的域名 registrar 将域的域名服务器切换为指向其默认域名服务器，则可能会发生这种情况。要确认这是否是问题，请[检查您的域是否使用 Cloudflare 的域名服务器](https://support.cloudflare.com/hc/articles/4426809598605)。

### 未解析的 IP 地址

在极少数情况下，请求 URL 的客户端中的 DNS 解析器可能无法将 DNS 记录解析为有效的 IP 地址。请待一段时间后重新加载页面以查看问题是否消失。此问题与 Cloudflare 无关，但使用 [Cloudflare 的 DNS 解析服务](/1.1.1.1/setup/)可能会有所帮助。如需当前 DNS 解析器的其他帮助，请与您的主机提供商联系。
