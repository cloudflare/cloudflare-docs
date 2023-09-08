---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/200170166-%E6%9C%80%E4%BD%B3%E5%81%9A%E6%B3%95-DDoS-%E9%A2%84%E9%98%B2%E6%8E%AA%E6%96%BD
title: 最佳做法：DDoS 预防措施
---

# 最佳做法：DDoS 预防措施

## 最佳做法：DDoS 预防措施

_了解防止启用了 Cloudflare 的站点遭受 DDoS 工具的最佳做法。_

___

## 概述

加入 Cloudflare 之后，请遵循以下建议，确保您的站点充分准备好防御潜在的 DDoS 攻击。

### 将您的 DNS 记录代理到 Cloudflare

攻击者试图识别您的原始 IP 地址，以直接攻击没有 Cloudflare 保护的源站 Web 服务器。通过将流量代理到 Cloudflare 隐藏您的原始 IP 地址，使其免受直接攻击。

通过以下步骤设置您的 DNS 记录，以获得最大程度的保护：

1.  [启用 Cloudflare 代理（橙色云）](https://support.cloudflare.com/hc/articles/200169626)
2.  删除用于 FTP 或 SSH 的 DNS 记录，改为使用您的原始 IP 直接执行 FTP 或 SSH 请求。或者，通过 [Cloudflare Spectrum](/spectrum/getting-started/) 代理 FTP 和 SSH。
3.  [将与您邮件服务器对应的 A、AAAA 或 CNAME 记录列入灰色云](https://support.cloudflare.com/hc/articles/200168876)
4.  删除 Free、Pro 或 Business 域中的通配符记录，因为它们会暴露您的原始 IP 地址。[Cloudflare 仅保护 Enterprise 计划中的通配符记录](https://support.cloudflare.com/hc/articles/360017421192#CloudflareDNSFAQ-DoesCloudflaresupportwildcardDNSentries)。

### 不要限制或阻止来自 Cloudflare IP 的请求

将流量代理到 Cloudflare 之后，对源站 Web 服务器的连接将来自 [Cloudflare 的 IP 地址](http://www.cloudflare.com/ips)。因此，源站 Web 服务器务必要将 [Cloudflare IP 列入白名单](https://support.cloudflare.com/hc/articles/201897700)，并且明确阻止并非来自 Cloudflare 或您信任的合作伙伴、供应商或应用程序 IP 地址的流量。

### 在源站日志中恢复原始访问者 IP

若要查看攻击背后的真实 IP，请在您的源站日志中[恢复原始访问者 IP](https://support.cloudflare.com/hc/sections/200805497)。否则，所有流量都会在您的日志中列出 Cloudflare 的 IP。Cloudflare 始终在请求中包含原始访问者 IP 地址，[作为 HTTP 标头](https://support.cloudflare.com/hc/articles/200170986)。告知您的主机提供商，您将使用反向代理，并在查看当前连接时所有流量都将来自 Cloudflare 的 IP。

### 将站点移至 Cloudflare 后更改服务器 IP 地址

对于代理到 Cloudflare 的流量，Cloudflare 会隐藏您的源站服务器 IP 地址。作为额外的安全预防措施，建议您与主机提供商联系，并请求新的源站 IP。

### 使用 Rate Limiting 来防止暴力破解和第 7 层 DDoS 攻击

为阻止伪装成正常 HTTP 请求的攻击，Rate Limiting 允许网站管理员在期望其 Web 服务器接收的负载上指定细粒度的阈值。只需点击一下，即可设置基本速率限制，[防止您的登录页面遭受暴力攻击](https://support.cloudflare.com/hc/articles/115001635128#3UWQC5PrVScHgEGRMobRMm)。

Cloudflare Free、Pro 和 Business 计划每月包含 10000 个免费请求。有关更多详细信息，请参阅 [Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128) 指南。

___

## 相关资源

-   [了解 Cloudflare DDOS 防护](https://support.cloudflare.com/hc/articles/200172676)
-   [响应 DDoS 攻击](/ddos-protection/best-practices/respond-to-ddos-attacks/)
-   [什么是 DDoS 攻击？](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
