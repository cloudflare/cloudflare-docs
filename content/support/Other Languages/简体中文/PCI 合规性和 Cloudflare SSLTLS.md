---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/205043158-PCI-%E5%90%88%E8%A7%84%E6%80%A7%E5%92%8C-Cloudflare-SSL-TLS
title: PCI 合规性和 Cloudflare SSLTLS
---

# PCI 合规性和 Cloudflare SSL/TLS

## PCI 合规性和 Cloudflare SSL/TLS

_了解如何配置 Cloudflare 以满足 PCI 扫描要求，并了解 Cloudflare 为早期版本的 TLS/SSL 提供的缓解措施。_

### 本文内容

-   [概述](https://support.cloudflare.com/hc/zh-cn/articles/205043158-PCI-%E5%90%88%E8%A7%84%E6%80%A7%E5%92%8C-Cloudflare-SSL-TLS#4kBCxczA0ijVjWhuqonQ0o)
-   [将最低 TLS 版本设置为 1.2](https://support.cloudflare.com/hc/zh-cn/articles/205043158-PCI-%E5%90%88%E8%A7%84%E6%80%A7%E5%92%8C-Cloudflare-SSL-TLS#5C1eNXjWqBpeXLwYlB0r0I)
-   [Cloudflare 针对已知 TLS 漏洞的缓解措施](https://support.cloudflare.com/hc/zh-cn/articles/205043158-PCI-%E5%90%88%E8%A7%84%E6%80%A7%E5%92%8C-Cloudflare-SSL-TLS#d6HRH9USMPriPWa0o)

___

## 概述

由于已知漏洞的原因，TLS 1.0 和 TLS 1.1 都不足以保护信息。特别是对于 Cloudflare 客户，PCI 的主要影响是 TLS 1.0 和 TLS 1.1 不足以保护与支付卡相关的流量。

PCI 标准建议使用 TLS 1.2 或更高版本。

另请参见 [Cloudflare 针对 TLS 1.0 和 1.1 的漏洞实施的缓解措施](https://support.cloudflare.com/hc/en-us/articles/205043158#h_1TWWDdoBc31LFYj9kVNwlu)。

___

## 将最低 TLS 版本设置为 1.2

将 Cloudflare 域配置为仅允许使用 TLS 1.2 或更新的协议进行连接：

1\. 登录 Cloudflare 仪表板。

2\. 单击相应的 Cloudflare 帐户和应用程序。

4\. 导航到 **SSL/TLS** > **边缘证书**。

5\. 对于**最低 TLS 版本**，请选择 **TLS 1.2** 或更高版本。

___

Cloudflare 针对 1.2 之前的 TLS 版本的已知漏洞执行了多项缓解措施。例如，Cloudflare 不支持：

1.  TLS 中的标头压缩
2.  SPDY 3.1 中的标头压缩
3.  RC4
4.  SSL 3.0
5.  与客户端重新协商
6.  DHE 密码套件
7.  出口级密码

Cloudflare 缓解措施可防御多种攻击：

-   CRIME
-   BREACH
-   POODLE
-   RC4 加密弱点
-   SSL 重新协商攻击
-   协议降级攻击
-   FREAK
-   LogJam
-   TLS 1.1 和 1.2 完全禁用 3DES，而 Cloudflare 对 TLS 1.0 实施了缓解措施

Cloudflare 为以下方面提供了其他缓解措施：

-   Heartbleed
-   Lucky Thirteen
-   CCS 注入漏洞

Cloudflare 已针对这些漏洞修补了所有服务器。此外，有一些 WAF 托管规则可以缓解其中的一些漏洞，包括 Heartbleed 和 ShellShock。

### 布雷琴巴赫 Oracle 威胁重现（Return Of Bleichenbacher's Oracle Threat，ROBOT）

注意到 Cloudflare 上存在 ROBOT 的安全扫描属于误报。Cloudflare 会实时检查填充，如果填充不正确，则切换为随机会话密钥。

### Sweet32（CVE-2016-2183）

在 Transport Layer Security (TLS) 协议中使用 Triple DES (3DES) 加密算法时存在漏洞。Sweet32 目前是一种概念验证攻击，外界还没有已知的示例。 Cloudflare 已通过以下方式手动缓解了 TLS 1.0 的漏洞：

-   攻击者必须从单个 TLS 会话中收集 32GB 数据
-   在收集 32GB 数据之前，Cloudflare 会在受影响的 3DES 密码上强制使用新的 TLS 1.0 会话密钥
