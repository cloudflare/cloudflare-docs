---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/200170056-Cloudflare-%E7%9A%84-Security-Level-%E6%98%AF%E4%BB%80%E4%B9%88%E6%84%8F%E6%80%9D-
title: Cloudflare 的 Security Level 是什么意思？
---

# Cloudflare 的 Security Level 是什么意思？

## Cloudflare 的 Security Level 是什么意思？

**Security Level**参考访问者的 IP 信誉来决定是否提出Challenge。Cloudflare 内部算法会计算 IP 的信誉并分配从 0 到 100 的威胁分数。Security Level 产生 Challenge 的分级标准：  

-   _High_ - 分数高于 _0_
-   _Medium_ - 分数高于 _14_
-   _Low_ - 分数高于 24
-   Essentially Off - 分数高于 49

您可以在 Cloudflare 控制面板的**Firewall**选项中调整域的**Security Level**。

![firewall-app.png](/images/support/firewall-app.png)

Cloudflare 建议从中等安全级别（默认设置）开始，以充分保护您的站点。

**I'm Under Attack 模式**只应在站点遭受 DDoS 攻击时使用。访问者将收到插页式页面大约五秒钟，而 Cloudflare 会分析其流量和行为，以确保其是试图访问您网站的合法访问者。**I'm Under Attack** 模式可能会影响您域上的某些服务，例如 API。通过为该部分创建 [Page Rule](https://support.cloudflare.com/hc/en-us/articles/200172336-How-do-I-create-a-PageRule-)，可以为 API 或域名的其他部分设置自定义安全级别。
