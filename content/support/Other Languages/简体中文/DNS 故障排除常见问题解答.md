---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360020296512-DNS-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94
title: DNS 故障排除常见问题解答
---

# DNS 故障排除常见问题解答

## DNS 故障排除常见问题解答

_本文提供了对 Cloudflare DNS 常见问题进行故障排除的指导。_

### 本文内容

-   [我为什么有一个 dc-######### 子域？](https://support.cloudflare.com/hc/zh-cn/articles/360020296512-DNS-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_84167303211544035341530)
-   [为什么 DNS 查询返回错误的结果？](https://support.cloudflare.com/hc/zh-cn/articles/360020296512-DNS-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_62993872051544035354776)
-   [找不到 A、AAAA 或 CNAME 记录？](https://support.cloudflare.com/hc/zh-cn/articles/360020296512-DNS-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_75993570981544035362746)
-   [我收到了一封邮件说“您的域名服务器已更改”，这是为什么？](https://support.cloudflare.com/hc/zh-cn/articles/360020296512-DNS-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_752983037101544035373001)
-   [为什么我不能通过 DNS API 添加某些 TLD？](https://support.cloudflare.com/hc/zh-cn/articles/360020296512-DNS-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_84167303211544035341531)

___

## 我为什么有一个 dc-######### 子域？

添加 dc-##### 子域是为了克服在 SRV 或 _MX 记录_ 解析到配置为代理到 Cloudflare 的域时产生的冲突。

因此，Cloudflare 将创建一个 dc-##### DNS 记录，该记录可解析为原始 IP 地址。dc-##### 记录可确保不会代理您的 MX 或 SRV 记录的流量（它将直接解析为您的原始 IP），而 Cloudflare 代理适用于所有其他流量。

例如，在使用 Cloudflare 之前，假设您的邮件 DNS 记录如下：

`example.com MX example.com``example.com A 192.0.2.1`

使用 Cloudflare 并代理 _A 记录_后，CloudFlare 将使用 Cloudflare IP（以下示例中为 203.0.113.1）提供 DNS 响应：

`example.com MX example.com``example.com A 203.0.113.1`

由于将邮件流量代理到 Cloudflare 会破坏您的邮件服务，Cloudflare 会检测到这种情况并创建一个 dc-##### 记录：

`example.com MX dc-1234abcd.example.com``dc-1234abcd.example.com A 192.0.2.1` `example.com A 203.0.113.1`

只能通过以下方法之一删除 dc-###### 记录：

-   如果没有收到域的邮件，请删除 _MX 记录_。
-   如果收到域的邮件，请更新 _MX 记录_以解析为未由 Cloudflare 代理的邮件子域的单独 _A 记录_：

`example.com MX mail.example.com``mail.example.com A 192.0.2.1``example.com A 203.0.113.1`

___

如果递归 DNS 缓存无法刷新，则第三方工具有时可能无法返回正确的 DNS 结果。在这种情况下，通过以下方法清除您的公共 DNS 缓存：

-   [清除 OpenDNS 中的 DNS 缓存](http://www.opendns.com/support/cache/)
-   [清除 Google 中的 DNS 缓存](https://developers.google.com/speed/public-dns/cache)
-   [清除本地的 DNS 缓存](https://documentation.cpanel.net/display/CKB/How%2BTo%2BClear%2BYour%2BDNS%2BCache)

___

## 找不到 A、AAAA 或 CNAME 记录？

_找不到 A、AAAA 或 CNAME 记录_ 表示 Cloudflare **DNS** 应用缺少适当的 DNS 解析记录。

[将缺少的 DNS 记录添加](/dns/manage-dns-records/how-to/create-dns-records)到您的域中。

___

## 我收到了一封邮件说“您的域名服务器已更改”，这是为什么？

对于 Cloudflare 托管 DNS 的域，Cloudflare 会不断检查域是否使用 Cloudflare 的名称服务器进行 DNS 解析。如果未使用 Cloudflare 的名称服务器，则会在 Cloudflare **Overview** 应用中将域状态从_活动_更新为_已移动_，并向客户发送一封电子邮件。任何处于_已移动_状态超过 7 天的域都会被删除，除非该域重新变为_活动_状态。

解决此问题的步骤需要在您的域名注册商处更新 DNS，以便使用 Cloudflare 域名服务器：

1.  按照我们的[域故障排除文章](https://support.cloudflare.com/hc/en-us/articles/221327488-Why-was-my-domain-deleted-from-Cloudflare-)中的步骤 2 和 3 进行操作。
2.  单击 Cloudflare UI **Overview** 应用中的**立即重新检查**。

___

## 为什么我不能通过 DNS API 添加某些 TLD？

DNS API 不可用于含有 .cf、.ga、.gq、.ml、或 .tkTLD 的域名。请使用 Cloudflare 仪表板来管理此类 TLD。Enterprise 客户可以[联系 Cloudflare 支持部门](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730)来去除此限制。
