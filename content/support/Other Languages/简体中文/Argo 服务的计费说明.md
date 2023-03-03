---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/115000224192-Argo-%E6%9C%8D%E5%8A%A1%E7%9A%84%E8%AE%A1%E8%B4%B9%E8%AF%B4%E6%98%8E
title: Argo 服务的计费说明
---

# Argo 服务的计费说明

## Argo 服务的计费说明

_了解有关如何计算 Argo 账单的更多信息。_

___

## 概述

Argo 分析和优化 Web 流量路由决策，以提高您域名的加载速度。

Argo 对每个域名收费，因此您需要为使用 Argo 的每个域名上 Cloudflare 和访问者之间传输的数据量（包括上传和下载带宽）付费。

Argo 也是基于使用情况计费的，因此每张发票都反映了上个月的使用情况。例如，您 9 月份的发票将包含 8 月份的 Argo 使用费用。

___

Argo 账单包括针对缓存命中以及 Cloudflare 网络的请求和响应的费用。

在 Cloudflare 仪表板中启用 Argo 将每月收取 5.00 美元的费用。在 Cloudflare 和您的访问者之间传输的流量超过 1 GB 之后，您需要为每 1 GB 额外支付 0.10 美元。

通过仪表板中的 **Traffic** 应用打开/关闭 Argo 开/关，不会导致多次收费。

但是，如果您在 **Billing** 选项卡下的 _Subscriptions_ 部分中取消并重新启用 Argo 订阅，则会向您收取多次费用。

以下是根据预计流量的一些费用估算：

<table><tbody><tr><td><p><strong>预期流量</strong></p></td><td><p><strong>预期费用（每个域名）</strong></p></td></tr><tr><td><p>&lt; 1 GB</p></td><td><p>5 美元</p></td></tr><tr><td><p>10 GB</p></td><td><p>5.90 美元</p></td></tr><tr><td><p>100 GB</p></td><td><p>$14.90</p></td></tr><tr><td><p>1 TB (1000 GB)</p></td><td><p>$104.90</p></td></tr><tr><td><p>（10 TB）</p></td><td><p>1004.90 美元</p></td></tr></tbody></table>
