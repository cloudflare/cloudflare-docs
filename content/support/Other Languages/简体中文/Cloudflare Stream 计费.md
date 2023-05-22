---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360016450871-Cloudflare-Stream-%E8%AE%A1%E8%B4%B9
title: Cloudflare Stream 计费
---

# Cloudflare Stream 计费

## Cloudflare Stream 计费

_了解有关 Cloudflare Stream 定价以及如何计算费用的更多信息。_

### 本文内容

-   [Cloudflare Stream 定价](https://support.cloudflare.com/hc/zh-cn/articles/360016450871-Cloudflare-Stream-%E8%AE%A1%E8%B4%B9#pricing)
-   [Cloudflare Stream 计费](https://support.cloudflare.com/hc/zh-cn/articles/360016450871-Cloudflare-Stream-%E8%AE%A1%E8%B4%B9#billing)
-   [Cloudflare Stream 计费分钟](https://support.cloudflare.com/hc/zh-cn/articles/360016450871-Cloudflare-Stream-%E8%AE%A1%E8%B4%B9#billable-minutes)
-   [相关资源](https://support.cloudflare.com/hc/zh-cn/articles/360016450871-Cloudflare-Stream-%E8%AE%A1%E8%B4%B9#related-resources)

___

[Cloudflare Stream](https://support.cloudflare.com/hc/en-us/articles/360017801091) 是用于构建视频应用程序的视频点播平台。 价格基于使用情况和存储空间计算，如下所述。

传输给用户的视频分钟：

-   每月每 1000 分钟 1.00 美元

存储在 Cloudflare Stream 上的视频分钟：

-   每月每 1000 分钟 5.00 美元
-   提前计费

___

## Cloudflare Stream 计费

Cloudflare Stream 按月计费。由于 Stream 是基于使用情况计费，因此您需要按照上个月观看和存储的分钟数计费。 例如，您 9 月份的发票将包含 8 月份的 Argo 使用费用。

计费费用会舍入到下一个 1000 分钟。以下是根据传输和存储的分钟数估算的价格：

| **分钟** | **舍入至** | **产生的费用** |
| --- | --- | --- |
| 
传输给用户 1999 分钟

 | 

2000 分钟

 | 

2.00 美元

 |
| 

在 Stream 上存储 3001 分钟

 | 

4000 分钟

 | 

20 .00美元

 |
| 周期总收费 | 

22.00 美元

 |

要使用 Stream，您的 Cloudflare 帐户必须有有效的付款方式记录在案。 当我们检测到付款失败时，Cloudflare Stream 将停止提供视频服务。如果您不继续付款，您上传的 Stream 视频将在 30 天后删除。

___

## Cloudflare Stream 计费分钟

计费分钟数表示从 Cloudflare 向您的访问者传输视频所花费的时间。

如果网站访问者加载了视频却没有观看，Cloudflare 仍会为视频传输付费。但是，如果访问者的浏览器在本地缓存视频，则 Cloudflare 不会为观看视频的时间计费。换句话说，如果访问者多次观看视频，我们不会收取后续观看费用。

如果您在嵌入代码中使用 _preload_ 属性（在 Stream [API 文档](/stream/video-playback/player-api/)中进行了描述），我们将对预加载视频花费的时间计费。请注意，预加载行为因浏览器而异。一些浏览器会预加载几秒钟的视频，而其他浏览器会预加载整个视频。尽管预加载对于优化视频可用性很有用，但请考虑它是否适合您的用例。

您可以在 Cloudflare 管理面板中查看 Cloudflare Stream 计费分钟，以估算传输分钟的费用。

要查看您的 Stream 观看分钟， 

1.  登录您的 Cloudflare 帐户。
2.  在 **My Profile** 下拉菜单下，单击 **Billing**。您将看到与您的 Cloudflare 帐户关联的域名的列表。
3.  选择已启用 Argo 的域名。
4.  在左侧导航栏中，单击 **Billable Usage**。您将看到一个显示您当前每日流量的图表。
5.  从图表上方的下拉列表中选择 **Previous month** ，然后单击 **Month to date**，以查看上个月的使用情况。![stream_billing_subcriptions_previous_month.png](/support/static/stream_billing_subcriptions_previous_month.png)

___

-   [Cloudflare Stream 视频平台](https://support.cloudflare.com/hc/en-us/articles/360017801091)
-   [Cloudflare Stream 开发人员文档](/stream/getting-started/)
