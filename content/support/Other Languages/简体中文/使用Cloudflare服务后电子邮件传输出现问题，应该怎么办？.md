---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/200168876-%E4%BD%BF%E7%94%A8Cloudflare%E6%9C%8D%E5%8A%A1%E5%90%8E%E7%94%B5%E5%AD%90%E9%82%AE%E4%BB%B6%E4%BC%A0%E8%BE%93%E5%87%BA%E7%8E%B0%E9%97%AE%E9%A2%98-%E5%BA%94%E8%AF%A5%E6%80%8E%E4%B9%88%E5%8A%9E-
title: 使用Cloudflare服务后电子邮件传输出现问题，应该怎么办？
---

# 使用Cloudflare服务后电子邮件传输出现问题，应该怎么办？

## 使用Cloudflare服务后电子邮件传输出现问题，应该怎么办？

_Cloudflare 的默认配置仅允许代理 HTTP 流量，我们默认不会代理邮件流量。_

___

## 故障排除提示

如果您遵循了 [Cloudflare MX 记录配置方法](https://support.cloudflare.com/hc/zh-cn/articles/200168876-%E4%BD%BF%E7%94%A8Cloudflare%E6%9C%8D%E5%8A%A1%E5%90%8E%E7%94%B5%E5%AD%90%E9%82%AE%E4%BB%B6%E4%BC%A0%E8%BE%93%E5%87%BA%E7%8E%B0%E9%97%AE%E9%A2%98-%E5%BA%94%E8%AF%A5%E6%80%8E%E4%B9%88%E5%8A%9E-#h.sf43uhyy1ztk)，但在发送或接收邮件时仍遇到问题，请执行以下故障排除步骤：

### 邮件 DNS 记录是否缺失？

请与您的邮件管理员联系，确认您添加的邮件 DNS 记录是正确的。如果您在添加或编辑 DNS 记录时需要帮助，请参阅我们有关[管理 Cloudflare 中的 DNS 记录](https://support.cloudflare.com/hc/en-us/articles/360019093151)的指南。

###   
不要将与邮件相关的 DNS 记录代理到 Cloudflare。

如果您有“mail.domain.com”的 _MX 记录_，则“mail.domain.com”的 _A 记录_在 DNS _A 记录_旁必须具有“灰色云”图标，如我们的[管理 Cloudflare 中的 DNS 记录](https://support.cloudflare.com/hc/en-us/articles/360019093151)支持指南中所示。

### 联系您的邮件提供商以获取更多帮助。

如果您的电子邮件在编辑 DNS 记录后不能立即生效，请与您的邮件管理员或邮件提供商联系，以获得有关故障排除的进一步帮助，从而能够向 Cloudflare 技术支持提供有关该问题的信息。

___

请遵循以下指导原则，确保您的邮件可以正常运行：

-   将与您邮件相关的 DNS 记录设置为“灰色云”，这样邮件流量就不会通过 Cloudflare 。
-   为邮件流量和 HTTP/HTTPS 流量使用不同的 IP 地址。Cloudflare 建议使用来自不同 IP 范围的非连续 IP。
-   以上是由于默认情况下 Cloudflare 无法代理邮件流量，因此您邮件服务器的 IP 地址是不受 Cloudflare 保护的。一旦攻击者得知了您的源站 IP 地址的信息，他们将可以绕过 Cloudflare 安全功能，直接攻击您的 Web 服务器。
-   不要为通过 Cloudflare 代理的根域名配置 _MX 记录_。
-   许多主机提供商会要求在 _MX 记录_中指定根域名。使用 Cloudflare 的 DNS 时，建议您为 _MX 记录_指定一个子域名，例如“mail.example.com”，然后为“mail.example.com”创建一个单独的 _A 记录_，以便指向您邮件服务器的 IP 地址。
