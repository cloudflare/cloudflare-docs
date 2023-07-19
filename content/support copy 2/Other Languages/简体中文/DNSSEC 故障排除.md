---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360021111972-DNSSEC-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4
title: DNSSEC 故障排除
---

# DNSSEC 故障排除

## DNSSEC 故障排除

_DNSSEC 可保护 DNS。  本文讨论如何检测影响 DNS 解析的 DNSSEC 问题。_

### 本文内容

-   [使用 Dig 测试 DNSSEC](https://support.cloudflare.com/hc/zh-cn/articles/360021111972-DNSSEC-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#TroubleshootingDNSSEC-DNSSECinPracticewithDig)
-   [使用 Dig 查看 DNSSEC 信任链](https://support.cloudflare.com/hc/zh-cn/articles/360021111972-DNSSEC-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#TroubleshootingDNSSEC-ViewingtheDNSSECChainofTrustwithDig)
-   [使用 Dig 对 DNSSEC 验证进行故障排除](https://support.cloudflare.com/hc/zh-cn/articles/360021111972-DNSSEC-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationwithDig)
-   [使用 DNSViz 对 DNSSEC 验证进行故障排除](https://support.cloudflare.com/hc/zh-cn/articles/360021111972-DNSSEC-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationusingDNSViz)
-   [后续步骤](https://support.cloudflare.com/hc/zh-cn/articles/360021111972-DNSSEC-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#TroubleshootingDNSSEC-What'sNext?)
-   [相关资源](https://support.cloudflare.com/hc/zh-cn/articles/360021111972-DNSSEC-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#h_388049682151546042422637)

___

## 使用 Dig 测试 DNSSEC

_Dig_ 是一个命令行工具，用于查询 DNS 记录的域名服务器。例如，_dig_ 可以向 DNS 解析器请求 _www.cloudflare.com_ 的 IP 地址（选项 _\+ short_ 仅输出结果）_：_


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +short198.41.215.162198.41.214.162</span></div></span></span></span></code></pre>{{</raw>}}

使用 _dig_ 验证 DNSSEC 记录。  在下面的示例中，


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +dnssec +short198.41.214.162198.41.215.162A 13 3 300 20180927180434 20180925160434 35273 cloudflare.com.DYYZ/bhHSAIlpvu/HEUsxlzkC9NsswbCQ7dcfcuiNBrbhYV7k3AI8t46 QMnOlfhwT6jqsfN7ePV6Fwpym3B0pg==</span></div></span></span></span></code></pre>{{</raw>}}

查询根域的公共密钥，而不是子域的公共密钥： 


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig DNSKEY cloudflare.com +short257 3 13 mdsswUyr3DPW132mOi8V9xESWE8jTo0dxCjjnopKl+GqJxpVXckHAeF+ KkxLbxILfDLUT0rAK9iUzy1L53eKGQ==256 3 13 koPbw9wmYZ7ggcjnQ6ayHyhHaDNMYELKTqT+qRGrZpWSccr/lBcrm10Z 1PuQHB3Azhii+sb0PYFkH1ruxLhe5g==</span></div></span></span></span></code></pre>{{</raw>}}

DNS 响应包括两个记录：

-   _DNSKEY 记录_ **256** 是名为“区域签名密钥”的公共密钥，用于验证 _A、MX、CNAME、SRV_ 等的 DNS 记录签名。

当 _\+ short_ 选项未与 _dig_ 一起使用时，如果响应标头中出现 **ad** 标志，则 DNS 响应将通过 DNSSEC 进行身份验证：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com[...];; -&gt;&gt;HEADER&lt;&lt;- opcode:QUERY, status:NOERROR, id:65326;; flags: qr rd ra ad; QUERY:1, ANSWER:2, AUTHORITY:0, ADDITIONAL:1 [...] ;; QUESTION SECTION: ;www.cloudflare.com.        IN  A [...] ;; ANSWER SECTION: www.cloudflare.com.15  IN  A   198.41.215.162 www.cloudflare.com.15  IN  A   198.41.214.162</span></div></span></span></span></code></pre>{{</raw>}}

___

## 使用 Dig 查看 DNSSEC 信任链

域签名（例如：_cloudflare.com_）的完整验证涉及验证顶级域（例如：_.com_）的密钥签名密钥。  然后

启用 DNSSEC 后，注册商的 DNS 需要 _DS 记录_。_DS 记录_包含公共密钥签名密钥的哈希以及密钥的元数据。

使用 _dig_ 查找 _DS 记录_：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig +short DS cloudflare.com2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span></span></span></code></pre>{{</raw>}}

_dig_ 将确认答案是 返回：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig DS cloudflare.com +trace[...]cloudflare.com.     86400   IN  DS  2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9[...]com.            172800  IN  NS  e.gtld-servers.net.[...];; Received 1213 bytes from 2001:502:1ca1::30#53(e.gtld-servers.net) in 37 ms</span></div></span></span></span></code></pre>{{</raw>}}

与手动运行上述所有步骤相比，更简单的替代方法是使用 [DNSViz 在线工具](http://dnsviz.net/)。请参阅[使用 DNSViz 对 DNSSEC 验证进行故障排除](https://support.cloudflare.com/hc/zh-cn/articles/360021111972-DNSSEC-%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationusingDNSViz)的详细信息或[通过 DNSViz 获取 cloudflare.com 的 DNSSEC 结果](http://dnsviz.net/d/cloudflare.com/dnssec/)的示例。

___

## 使用 Dig 对 DNSSEC 验证进行故障排除

如果更改权威 DNS 提供商而不更新或删除注册商中的旧 DNSSEC 记录，则会出现问题：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig A brokendnssec.net @1.0.0.1;; flags: qr rd ra; QUERY:1, ANSWER:0, AUTHORITY:0, ADDITIONAL:0;; -&gt;&gt;HEADER&lt;&lt;- opcode:QUERY, status:SERVFAIL, id:10663</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig A brokendnssec.net @1.0.0.1 +dnssec +cd +short104.20.49.61104.20.48.61</span></div></span></span></span></code></pre>{{</raw>}}

在上面的示例中，如果在使用 _+cd_ 选项时收到正确的 DNS 响应，但使用 DNSSEC 的查询返回 _SERVFAIL_ 响应_，则说明 DNSSEC 配置错误。_ 当权威域名服务器发生更改但 _DS 记录_未更新时，通常会发生此问题。  如果攻击者试图伪造对查询的响应，也会发生此问题。 

___

## 使用 DNSViz 对 DNSSEC 验证进行故障排除

1.  浏览到 [http://dnsviz.net/](http://dnsviz.net/)
2.  在显示的文本字段中输入域名。
3.  如果 DNSViz 之前从未分析过该站点，则单击显示的**分析**按钮。
4.  如果 DNSViz 之前已分析过该站点，

![Screen_Shot_2018-09-18_at_10.31.54_AM.png](/images/support/Screen_Shot_2018-09-18_at_10.31.54_AM.png)

![Screen_Shot_2018-10-16_at_2.png](/images/support/Screen_Shot_2018-10-16_at_2.png)

![Screen_Shot_2018-09-18_at_10.25.49_AM.png](/images/support/Screen_Shot_2018-09-18_at_10.25.49_AM.png)

___

## 后续步骤 

如果在 DNSSEC 实施中发现问题，请与域名注册商联系，确认 _DS 记录_与权威 DNS 提供商指定的内容相匹配。如果 Cloudflare 是权威 DNS 提供商，请按照[使用 Cloudflare 配置 DNSSEC](https://support.cloudflare.com/hc/articles/360006660072) 的说明进行操作。

___

## 相关资源

-   [DNSSEC 如何运作](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) 
-   [DNS 安全](https://www.cloudflare.com/learning/dns/dns-security/)
-   [使用 Cloudflare 配置 DNSSEC](https://support.cloudflare.com/hc/articles/360006660072)
