---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/115003687931-%E5%85%B3%E4%BA%8E%E9%80%9A%E8%BF%87-DNS-%E8%AE%B0%E5%BD%95%E6%9A%B4%E9%9C%B2%E6%BA%90-IP-%E5%9C%B0%E5%9D%80%E7%9A%84%E8%AD%A6%E5%91%8A
title: 关于通过 DNS 记录暴露源 IP 地址的警告
---

# 关于通过 DNS 记录暴露源 IP 地址的警告

## 关于通过 DNS 记录暴露源 IP 地址的警告

_当存在灰色云 DNS 记录时，Cloudflare 可能会警告您，您的 DNS 记录可能会泄露您的源站 IP 地址。这在 A、AAAA、CNAME 和 MX DNS 记录中最常见。_

___

## 概述

当您的 DNS 记录显示橙色云时，Cloudflare 会加速并保护您的网站。

针对橙色云根域的 _dig_ 查询会返回 Cloudflare IP 地址。这样，您的源站 IP 地址仍对公众隐藏。请记住，橙色云优势仅适用于 HTTP 流量。

在特定情况下，如果您存在可能暴露源站 IP 地址的灰色云 **DNS 记录**，Cloudflare 仪表板 **DNS** 应用中的 DNS 记录面板会显示警告。此警告不会阻止或以任何方式影响发送到您网站的流量。

当您的服务器 IP 地址暴露时，您的服务器更容易受到直接攻击。如果将流量代理至 Cloudflare，攻击者仍有可能确定您的源 IP 地址（但难度要大得多）。

在以下两种情况下，您可能会看到 Cloudflare 发出的 IP 暴露警告。

___

如果您看到以下警告：

_`此记录将暴露您的源站 IP 地址。要隐藏源 IP 地址并提高服务器安全性，请单击灰色云将其更改为橙色。`_

Cloudflare 建议对记录进行橙色云处理，以便针对该记录的任何 dig 查询都返回 Cloudflare IP 地址，并且您的源站 IP 地址仍对公众隐藏。

为了利用 Cloudflare 的性能和安全优势，我们建议您将处理 HTTP 流量的 DNS 记录（包括 A、AAAA 和 CNAME）设为橙色云。

___

## 情况 2 - 需要设为灰色云的 DNS 记录

如果您存在灰色云的 _A_、_AAAA_、_CNAME_ 或 _MX_ 记录指向托管您站点的同一源服务器，Cloudflare 会显示以下警告之一：

_`A、AAAA、CNAME 或 MX 记录指向您的源站，将暴露您的原始 IP。`_

_`此记录会暴露您的源站 IP 地址，从而可能会将其暴露给拒绝服务。`_

针对这些记录的 _dig_ 查询会显示您的源站 IP 地址。此信息使潜在攻击者可以更轻松地直接定位您的源站。

但是，有时您的部分 DNS 记录需要保持灰色云状态。示例：

-   当您必须在同一物理服务器上托管多个服务（例如，网站和电子邮件）时

为降低此风险，我们建议您：

-   在无法避免灰色云 DNS 记录的情况下，分析在同一源站上托管多个服务的影响
-   将与根域共享同一源 IP 地址的所有记录设为橙色云，并且可以通过 Cloudflare 安全代理
