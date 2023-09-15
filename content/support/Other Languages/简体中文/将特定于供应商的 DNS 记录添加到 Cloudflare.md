---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360020991331-%E5%B0%86%E7%89%B9%E5%AE%9A%E4%BA%8E%E4%BE%9B%E5%BA%94%E5%95%86%E7%9A%84-DNS-%E8%AE%B0%E5%BD%95%E6%B7%BB%E5%8A%A0%E5%88%B0-Cloudflare
title: 将特定于供应商的 DNS 记录添加到 Cloudflare
---

# 将特定于供应商的 DNS 记录添加到 Cloudflare

-   [委派 Cloudflare 之外的子域](https://support.cloudflare.com/hc/zh-cn/articles/360021357131-%E5%A7%94%E6%B4%BE-Cloudflare-%E4%B9%8B%E5%A4%96%E7%9A%84%E5%AD%90%E5%9F%9F "委派 Cloudflare 之外的子域")
-   [将特定于供应商的 DNS 记录添加到 Cloudflare](https://support.cloudflare.com/hc/zh-cn/articles/360020991331-%E5%B0%86%E7%89%B9%E5%AE%9A%E4%BA%8E%E4%BE%9B%E5%BA%94%E5%95%86%E7%9A%84-DNS-%E8%AE%B0%E5%BD%95%E6%B7%BB%E5%8A%A0%E5%88%B0-Cloudflare "将特定于供应商的 DNS 记录添加到 Cloudflare")

## 将特定于供应商的 DNS 记录添加到 Cloudflare

_本文介绍如何将 DNS 记录添加到 Cloudflare，以支持各种第三方软件，包括 Google Cloud、Amazon S3、Microsoft Azure、ClickFunnels、WPEngine 和 Zoho。_

___

本文需要通过 Cloudflare 仪表板预先了解 DNS 记录管理。  要了解更多信息，请参阅 Cloudflare 关于[管理 DNS 记录](https://support.cloudflare.com/hc/en-us/articles/360019093151)的文章。

  
**Google**

添加以下 MX 记录：

| **Name** | **TTL** | **Record Type** | **Priority**  | **Target** |
| --- | --- | --- | --- | --- |
| @ | Auto | MX | 1 | ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 5 | ALT1.ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 5 | ALT2.ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 10 | ALT3.ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 10 | ALT4.ASPMX.L.GOOGLE.COM |

添加后，DNS 记录在 Cloudflare 的 **DNS** 应用中显示如下：

[测试 Google Apps 电子邮件配置](https://toolbox.googleapps.com/apps/checkmx/check)。

将 Google App Engine 的 _CNAME 记录_添加到 Cloudflare DNS。

例如，如果域为 _www.example.com_，则 _CNAME 记录_如下所示：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www  CNAME  ghs.googlehosted.com</span></div></span></span></span></code></pre>{{</raw>}}

要为 Google Apps 域配置重定向，请参阅 [Google 的 URL 转发指南](https://support.google.com/a/answer/53340?hl=en)。

**Amazon**

AWS 客户必须更新其域名服务器，以指向 Cloudflare 仪表板的 **Overview** 应用中列出的 Cloudflare 域名服务器：

1.  登录 AWS。
2.  单击导航栏右上角的**我的账户**。
3.  从下拉列表中选择 **AWS 管理控制台**。
4.  单击**服务**，然后选择**路由 53**。
5.  在以下两个位置更新域名服务器：
    
    -   单击**托管区域**，然后选择要使用 Cloudflare 域名服务器进行更新的域。
    -   编辑域名服务器以指向 Cloudflare 域名服务器。
    
      
    -   单击**已注册的域名**。
    -   选择要使用 Cloudflare 域名服务器进行更新的域。
    -   单击**添加或编辑域名服务器**。

请参阅 Amazon 的文档，了解如何[创](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html)[建 Amazon S3 存储桶](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html)。

请记录分配给存储桶的完整主机 URL。

在 Cloudflare DNS 中为 AWS 存储桶添加 _CNAME 记录_。例如，如果存储桶的完整主机 URL 为 _files.example.com_，则添加如下所示的 _CNAME 记录_：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">files  CNAME  files.example.com.s3.amazonaws.com</span></div></span></span></span></code></pre>{{</raw>}}

请参阅 Amazon 关于 [SES 和验证设置](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/easy-dkim.html)的文档。

找到 Amazon 提供的 _TXT_ 和 _CNAME_ 验证记录。

将这些记录添加到 Cloudflare DNS。  例如，如果 Cloudflare 域为 _example.com_，则 DNS 记录如下所示：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  TXT  &quot;fmxqxT/icOYx4aA/bEUrDPMeax9/s3frblS+niixmqk=&quot;verificationstring._domainkey.example.com  CNAME  verificationstring.dkim.amazonses.com</span></div></span></span></span></code></pre>{{</raw>}}

有关 Amazon 上 ELB 配置的指导，请参阅 [Amazon ELB 帮助内容](http://docs.amazonwebservices.com/ElasticLoadBalancing/latest/DeveloperGuide/using-domain-names-with-elb.html)。

1.  针对主机名向 Cloudflare 添加 _CNAME 记录_；例如，_elb_
2.  在 Cloudflare **DNS** 应用中，将**域名**替换为 ELB 目标：  
    _  
    <AWS hostname>.<region>._elb.amazonaws.com 是正确的 _CNAME_ 目标格式  
    （例如，_my-cool-cachepp-1344276401.eu-west-1._elb.amazonaws.com）。
3.  联系 AWS 支持人员以确定 _AWS 主机名_或_区域_。

**Microsoft**

按照 Microsoft 有关[配置 Azure DNS 设置](https://www.windowsazure.com/en-us/develop/net/common-tasks/custom-dns-web-site/)的说明进行操作。

将 Azure 所需的记录添加到 Cloudflare DNS。

例如，如果域为 _example.com_，则记录格式如下所示：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  A  203.0.113.1www.example.com  CNAME  example.azurewebsites.net</span></div></span></span></span></code></pre>{{</raw>}}

有关验证记录，请参阅 Azure 关于[创建域验证记录](https://docs.microsoft.com/en-us/office365/admin/dns/create-dns-records-for-azure-dns-zones?view=o365-worldwide#add-a-txt-record-for-verification)的文档。

**杂项供应商**

要向 Cloudflare 添加适当的 Zoho DNS 记录，请参见下面的示例。在所有示例中，用实际域名替换 _example.com_：

-   添加 Zoho _MX 记录_：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  MX  mx.zohomail.com (set Priority to 10)example.com  MX  mx2.zohomail.com (set Priority to 20)</span></div></span></span></span></code></pre>{{</raw>}}

-   （可选）添加 _SPF 记录_：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  TXT  v=spf1 mx include:zoho.com ~all</span></div></span></span></span></code></pre>{{</raw>}}

-   （可选）要通过[自定义 Zoho URL](https://adminconsole.wiki.zoho.com/domains/CustomURL.html) 访问邮件，请添加 _CNAME 记录_：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">mail  CNAME  business.zoho.com</span></div></span></span></span></code></pre>{{</raw>}}

-   （可选）添加 [Zoho 域验证记录](https://www.zoho.com/mail/help/adminconsole/domain-verification.html)：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">zb******** CNAME  business.zoho.com</span></div></span></span></span></code></pre>{{</raw>}}

通常，DNS 记录类似于下面的列表。用实际域名替换 _example.com_：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">email  CNAME  sendgrid.netexample.com  SPF  v=spf1 a mx include:sendgrid.net ~allexample.com  TXT  v=spf1 a mx include:sendgrid.net ~allmtpapi._domainkey.EXAMPLE.com  CNAME  dkim.sendgrid.net.smtpapi._domainkey.e.EXAMPLE.COM  CNAME  dkim.sendgrid.net</span></div></span></span></span></code></pre>{{</raw>}}

-   有关 DNS 配置的信息，请参阅 [WPEngine 的文档](http://wpengine.com/support/how-to-configure-your-dns/)。
-   确定是否向 Cloudflare DNS 添加 _A_ 或 _CNAME 记录_：  
    [在 WPengine 中查找您的 IP 地址](http://wpengine.com/support/find-ip/)

  

-   有关添加记录的详细信息，请参阅 Cloudflare 关于[管理 DNS 记录](https://support.cloudflare.com/hc/en-us/articles/360019093151)的文档。

请参阅 Ning 关于[自定义域和 DNS 条目](http://www.ning.com/help/?p%3D2870)的文档。

如果 Ning 自定义域为 _www.example.com_，则添加 _CNAME_ 和 _A 记录_，如下所示：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www.example.com  CNAME  example.ning.com.example.ning.com  A  208.82.16.68</span></div></span></span></span></code></pre>{{</raw>}}

在 Ning 验证域后，将 Ning DNS 记录的灰色云图标更改为橙色云，以便流量可以代理到 Cloudflare。

有关 DNS 记录要求的最新详细信息，请参阅 SmugMug 文档。通常，为 SmugMug 添加如下所示的 _CNAME 记录_：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">photo  CNAME  domains.smugmug.comphotos  CNAME  domains.smugmug.com</span></div></span></span></span></code></pre>{{</raw>}}

在 SmugMug 验证域后，将 SmugMug DNS 记录的灰色云图标更改为橙色云，以便流量可以代理到 Cloudflare。

有关 DNS 记录要求的最新详细信息，请参阅 [Mandrill 关于 DNS 记录的文章](http://help.mandrill.com/entries/22030056-How-do-I-add-DNS-records-for-my-sending-domains-)。

Mandrill 需要添加 _SPF_ 和 _DKIM 记录_。从 Mandrill 获取 DNS 记录值。

在 Cloudflare DNS 应用中添加 _SPF_ 和 _DKIM 记录_作为 _TXT 记录_。

例如，如果 _example.com_ 是 Mandrill 域，则添加如下所示的 DNS 记录。


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  TXT  v=spf1 include:spf.mandrillapp.com ?allmandrill._domainkey.example.com  TXT  v=DKIM1\; (values from Mandrill)</span></div></span></span></span></code></pre>{{</raw>}}

通过 _CNAME 记录_配置 Rackspace CloudFiles。请参阅 [Rackspace CloudFiles 文档](http://www.rackspace.com/knowledge_center/article/how-can-i-use-cnames-with-a-cloud-files-container)[。](http://www.rackspace.com/knowledge_center/article/how-can-i-use-cnames-with-a-cloud-files-container)

与 Rackspace 支持人员确认正确的 _CNAME_ 的目标。

_CNAME 记录_示例如下所示：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">rack  CNAME  e0978.r18.cf2.rackcdn.com</span></div></span></span></span></code></pre>{{</raw>}}

如果 _example.com_ 是自定义域，请将 DNS 记录添加到 Cloudflare，如下所示：


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com  A  66.6.44.4www.example.com  CNAME  domains.tumblr.com</span></div></span></span></span></code></pre>{{</raw>}}

___

## 相关资源

[管理 Cloudflare DNS 记录](https://support.cloudflare.com/hc/en-us/articles/360019093151)

[CNAME Flattening](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root)
