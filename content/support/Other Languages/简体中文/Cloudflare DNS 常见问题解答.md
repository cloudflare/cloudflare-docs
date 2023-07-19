---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94
title: Cloudflare DNS 常见问题解答
---

# Cloudflare DNS 常见问题解答

_Cloudflare DNS 应用常见问题求救。_

### 本文内容

-   [在哪里可以了解有关 DNS 的更多信息？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_GceQe7yLNteKL7WN8Fo2V)
-   [Cloudflare 是免费 DNS（域名服务器）提供商吗？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_5AzfKIrChBLWiegj2LqTBx)
-   [Cloudflare 会否对 DNS 查询收费或限制 DNS 查询？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_2hngeJgVJQtBClJB3cVQgq)
-   [我在哪里更改我的域名服务器以指向 Cloudflare？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_6gPUYJL7OXyKn7OEaAwipE)
-   [Cloudflare 是否限制一个域名可拥有的 DNS 记录数量？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#RW4QZK9AQYTX3499R4SG)
-   [Cloudflare 不代理哪些记录类型？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_6mb72z48vZY69qLaqRO7we)
-   [我可以将不在 Cloudflare 上的域名设置 CNAME 到 Cloudflare 上的域吗？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_5o8rP75kFhX9g6jaDNSoTQ)
-   [Cloudflare 支持通配符 DNS 条目吗？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_2C7rPZioPs5FIMJgvWiPST)
-   [我的 DNS 更改需要多久才生效？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_14OysgtO7JgA3N8KAtdZCn)
-   [Cloudflare 提供域名掩码吗？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_1POmiVdco4wE6nwRTmsJsf)
-   [为什么我不能对 Cloudflare DNS 服务器进行任何查询？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_7DVKxAlJIDkVgdAiBdpFqs)
-   [为什么我在注册 Cloudflare 时必须删除我的 DS 记录？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_3yslZOSrNhsasnFQz7E8T1)
-   [删除 DS 记录后会发生什么吗？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_6yAiPswlhUgChycYuyLwvw)
-   [Cloudflare 支持 EDNS0（DNS 的扩展机制）吗？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_1sl0Bnvuv1fPoO6NkqWlI4)
-   [如果我更改服务器 IP 地址或主机提供商，我该怎么办？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_48mRDrZWcDoNy86Vh430dJ)
-   [我在哪里可以找到我的 Cloudflare 域名服务器？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_4DQSdKPOf5WeRRGX4UoSrG)
-   [为什么我在域名的 DNS 响应中看到 Cloudflare A 或 AAAA 记录 / IP 地址？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_2hZzaAXD1FZ85LaoygALPE)
-   [我该设置 DNS 记录旁边的云图标为橙色还是灰色呢？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_4KiZSEaZkCCJXEDGuD9Htf)
-   [可以将子域名直接添加到 Cloudflare 吗？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_2TF12dhvaLH91R6POBV0el)
-   [使用 Terraform 创建 DNS 记录时出现 403 身份验证错误](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_7db6AC21wyy5Xuq8vk17lY)
-   [为什么我在添加域名后看到数百条随机的 DNS 记录？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_1lFKZFkAFRGtDPNZetRq52)
-   [对于已停放域名 / 仅重定向 / 无来源设置，应使用什么 IP？](https://support.cloudflare.com/hc/zh-cn/articles/360017421192-Cloudflare-DNS-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#h_5mPkNqCpR3dklDjTvbASCI)

___

请访问 [Cloudflare 学习中心 DNS 指南](https://www.cloudflare.com/learning/dns/what-is-dns/)。

___

## Cloudflare 是免费 DNS（域名服务器）提供商吗？

是的，Cloudflare 为所有计划的客户提供[免费 DNS 服务](https://www.cloudflare.com/dns)。请注意：

1.  您无需更改主机提供商即可使用 Cloudflare。
2.  您无需改换注册商。您对注册商所做的唯一更改是将权威域名服务器指向 Cloudflare 域名服务器。

自 2018 年 10 月起，您可以将域名转移到 [Cloudflare 注册商](https://www.cloudflare.com/products/registrar/)。

___

## Cloudflare 会否对 DNS 查询收费或限制 DNS 查询？

Cloudflare 绝不会对 DNS 查询设置上限或封顶，但定价取决于您的计划级别。

对于 Free、Pro 和 Business 计划客户，Cloudflare 不对 DNS 查询收费。

对于 Enterprise 计划客户，Cloudflare 会将每月 DNS 查询次数作为定价依据，生成自定义报价。不会收取任何超额费用。

___

## 我在哪里更改我的域名服务器以指向 Cloudflare？

在您的注册商处进行更改，其也有可能与您的主机是同一个供应商。如果您不知道您的域名注册商是谁，您可以通过 [WHOis 搜索](http://www.whois.net/)找到此信息。按照[将域名服务器更改成 Cloudflare](/dns/zone-setups/full-setup/setup) 中的说明操作。

___

## Cloudflare 是否限制一个域名可拥有的 DNS 记录数量？

是的。目前，Free、Pro 和 Business 客户可创建的 DNS 记录数量有限制。

Enterprise 客户如果需要更多 DNS 记录，可以联系客户团队。

___

## Cloudflare 不代理哪些记录类型？

Cloudflare 不代理以下记录类型：

-   LOC
-   MX
-   NS
-   SPF
-   TXT
-   SRV
-   CAA

___

## 我可以将不在 Cloudflare 上的域名设置 CNAME 到 Cloudflare 上的域吗？

不是。如果您想为不在 Cloudflare 上的网站进行重定向，请在您的源站 Web 服务器上设置一个传统的 301 或 302 重定向。

通过 CNAME 记录对非 Cloudflare 网站进行重定向，会导致发生 DNS 解析错误。由于 Cloudflare 是 Cloudflare 上的域名的反向代理，因此，（不在 Cloudflare 上）的域名的 CNAME 重定向不知道要将流量发送到哪里。

___

## Cloudflare 支持通配符 DNS 条目吗？

Cloudflare 的所有客户计划都支持在 DNS 管理中代理通配符 '\*' 记录。这在过去只提供给 Enterprise 计划。

___

## 我的 DNS 更改需要多久才生效？

默认情况下，您对 Cloudflare 区域文件所做的任何更改或添加都将在 5 分钟或更短时间内生效。请注意，您的本地 DNS 缓存可能需要更长时间才能更新；因此，完全完成传播可能需要超过 5 分钟。

该设置是由 [DNS 记录](/dns/manage-dns-records/how-to/create-dns-records)中的生存时间 (TTL) 值控制的。代理的记录会在 300 秒内更新（自动），而非代理记录的 TTL 可以自定义。

___

## Cloudflare 提供域名掩码吗？

不，Cloudflare 不提供域名掩码或 DNS 重定向服务（您的主机提供商可能会为您提供此服务）。但我们通过[批量重定向](/rules/url-forwarding/bulk-redirects/)提供 URL 转发。

___

## 为什么我不能对 Cloudflare DNS 服务器进行任何查询？

ANY 查询都很特殊，经常被误解。通常用于获取 DNS 名称上可用的所有记录类型，但返回的只是递归解析器缓存中的任何类型。当用于调试时，这可能会引起混淆。

由于 Cloudflare 的许多高级 DNS 功能（如 CNAME flattening），对 ANY 查询给出正确答案可能很复杂甚至不可能。例如，当 DNS 记录动态地建立和删除或远程存储时，同时获得所有结果可能会很费力甚至不可能。

ANY 很少用于正式版吗，但通常用于 DNS 反射攻击，以利用 ANY 返回的冗长答案。

Cloudflare 客户可以通过登录并检查其 DNS 设置检查自己的 DNS 记录，而不是使用 ANY 查询来列出记录。

2015 年 9 月起，我们停止对所有权威 DNS 的 ANY 查询，这决定不会影响任何虚拟 DNS 客户。

您可以在 Cloudflare 博客中阅读[弃用 DNS ANY 元查询类型](https://blog.cloudflare.com/deprecating-dns-any-meta-query-type/)。

___

## 为什么我在注册 Cloudflare 时必须删除我的 DS 记录？

Cloudflare 支持 DNSSEC。如果您在注册 Cloudflare 时已在注册商那边有 DS 记录，在使用 Google 等DNS 解析程序（resolver）时，您将遇到连接错误，例如 SERVFAIL，以及从非验证解析程序收到 noError。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">下面举例说明错误的具体内容：</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">╰─➤ dig dnssec-failed.org @8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;&lt;&gt;&gt; DiG 9.8.3-P1 &lt;&lt;&gt;&gt; dnssec-failed.org @8.8.8.8</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; global options: +cmd</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; Got answer:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: SERVFAIL, id: 5531</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0 ;; QUESTION SECTION:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;dnssec-failed.org.IN A</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

通过 DNSSEC 支持，Cloudflare 提供了当您为您的域[启用 DNSSEC](https://support.cloudflare.com/hc/articles/360006660072) 时必须上传到 parent 的 DS 记录。

___

## 删除 DS 记录后会发生什么吗？

删除 DS 记录后，将开始失效过程，从而导致您域名的 DNS 记录失效。这一步可以允许您更改您的权威域名服务器。如果您是现有客户，这不会影响 Cloudflare 的使用。新客户需要先完成此步骤，然后才能成功使用 Cloudflare。

___

## Cloudflare 支持 EDNS0（DNS 的扩展机制）吗？

是的，Cloudflare DNS 支持 EDNS0。Cloudflare 为所有客户启用 EDNS0。它是现代 DNS 实施的基础之一，如果 DNS 解析器（递归 DNS 提供程序）支持更大的消息和 DNSSEC，这会增加对信令的支持。

EDNS0 是 [DNS 扩展](http://en.wikipedia.org/wiki/Extension_mechanisms_for_DNS)的第一批经批准的机制，最初发布为 [RFC 2671](https://datatracker.ietf.org/doc/html/rfc2671)。

___

## 如果我更改服务器 IP 地址或主机提供商，我该怎么办？

切换主机提供商或服务器 IP 地址后，请更新 Cloudflare **DNS** 应用中的 IP 地址。您的新主机提供商将为您提供新的 IP 地址。您需要在 **DNS** 应用中修改 DNS 记录内容，请单击 IP 地址，然后输入新的 IP 地址。

___

## 我在哪里可以找到我的 Cloudflare 域名服务器？

在您的 Cloudflare 账户的 **DNS** 应用下，查看 **Cloudflare 域名服务器**。

可以通过 dig 命令或在线托管的第三方 DNS 查找工具（例如 [whatsmydns.net](https://www.whatsmydns.net/)）检索与特定 Cloudflare 域名服务器关联的 IP 地址：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig kate.ns.cloudflare.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">kate.ns.cloudflare.com.68675    IN    A    173.245.58.124.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

___

## 为什么我在域名的 DNS 响应中看到 Cloudflare A 或 AAAA 记录 / IP 地址？

对于代理到 Cloudflare 的 DNS 记录，在 DNS 查询中返回 Cloudflare 的 IP 地址，而不是源服务器 IP 地址。这样可以让 Cloudflare 优化、缓存和保护您网站的所有请求。

___

## 我该设置 DNS 记录旁边的云图标为橙色还是灰色呢？

默认情况下，只有处理 Web 流量（HTTP 和 HTTPS）的 A 和 CNAME 记录才能代理到 Cloudflare。所有其他 DNS 记录应切换为灰色云。若要了解更多详细信息，请参阅我们的[支持指南](/dns/manage-dns-records/reference/proxied-dns-records)。

___

## 可以将子域名直接添加到 Cloudflare 吗？

只有 Enterprise 客户可以通过[子域支持](https://support.cloudflare.com/hc/articles/360026440252)直接向 Cloudflare 添加子域。

___

## 使用 Terraform 创建 DNS 记录时出现 403 身份验证错误

**问题描述**

将 Terraform 与 Cloudflare API 结合使用时，返回了 `Error: failed to create DNS record: HTTP status 403: Authentication error (10000)（错误：创建 DNS 记录失败：HTTP 状态 403：身份验证错误 (10000)）`。

**根本原因**

该错误似乎具有误导性，因为发现该错误存在于客户代码语法中，具体而言是：zone\_id = data.cloudflare\_zones.example\_com.id

**解决方案**

请确保参数是 `zone_id = data.cloudflare_zones.example_com.zones[0].id`。更详细的使用案例可以在[此](https://github.com/cloudflare/terraform-provider-cloudflare/issues/913) GitHub 线程中找到。

___

## 为什么我在添加域名后看到数百条随机的 DNS 记录？

如果您在以前的权威 DNS 上配置了通配符 \* 记录，就有可能发生这种情况。您可以使用 API 批量删除这些记录：/api/operations/dns-records-for-a-zone-delete-dns-record。或者，您也可以从 Cloudflare Dashboard 中删除您的域名，然后从权威 DNS 中删除通配符记录，之后再重新添加该域名

___

## 对于已停放域名 / 仅重定向 / 无来源设置，应使用什么 IP？

如果需要有占位符地址才能进行“无来源”设置，请在您的 Cloudflare DNS 中使用 IPv6 保留地址 **100::** 或 IPv4 保留地址 **192.0.2.0** ，以便在代理模式下创建条目来利用 Cloudflare Page Rules 或 Cloudflare Workers。
