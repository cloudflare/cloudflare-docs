---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/206652947-%E4%BD%BF%E7%94%A8-Page-Rule-%E9%87%8D%E5%86%99-HTTP-host-%E5%A4%B4%E5%AD%97%E6%AE%B5
title: 使用 Page Rule 重写 HTTP host 头字段
---

# 使用 Page Rule 重写 HTTP host 头字段

1.  [Cloudflare帮助中心](https://support.cloudflare.com/hc/zh-cn)
2.  [页面规则](https://support.cloudflare.com/hc/zh-cn/categories/200276257-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99)
3.  [常规](https://support.cloudflare.com/hc/zh-cn/sections/200805137-%E5%B8%B8%E8%A7%84)

## 使用 Page Rule 重写 HTTP host 头字段

现在，Page Rule 中提供了重写host 头字段的功能。此功能目前适用 Enterprise 计划的域名。

此功能的常见用例是您的内容托管在 Amazon S3 bucket上。Amazon 已将其系统设计为仅接受与托管您内容的 bucket 同名的主机头字段。这样，必须将“Host: your-domain.com”的请求重写为“Host: your-bucket.s3.amazonaws.com”，否则请求将被拒绝。

\*注意：在某些情况下，您可以调整 Amazon S3 bucket以接受不是bucket名称的host 头字段。

要确保重写头字段，只需转到 Page Rule，指定此重写将应用的 URI，并写入要更改的主机头字段中。在“Host Header Override”文本框中执行此操作。任何与您指定的 URI 匹配的请求都会将 Host 覆盖到您在“Host Header Override”框中输入的主机头字段。 请参阅下面的示例：

![](/images/support/Screen_Shot_2015-09-03_at_2.56.52_PM.png)
