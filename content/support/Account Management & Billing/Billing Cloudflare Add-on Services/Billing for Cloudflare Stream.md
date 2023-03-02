---
source: https://support.cloudflare.com/hc/en-us/articles/360016450871-Billing-for-Cloudflare-Stream
title: Billing for Cloudflare Stream
                  9 months ago
---

# Billing for Cloudflare Stream



## Overview

[Cloudflare Stream](https://support.cloudflare.com/hc/en-us/articles/360017801091) is a video-on-demand platform for building video applications. The pricing is based on usage and storage, as outlined below.

Video minutes delivered to users:

-   USD $1.00 per 1,000 minutes per month

Video minutes stored on Cloudflare Stream:

-   USD $5.00 per 1,000 minutes`
-   Billed in advance

___

Cloudflare Stream is billed on a monthly basis. Since Stream is usage-based, you will be billed on the minutes watched and stored for the previous month. For example, your September invoice will include charges for Stream usage in August.

Billed charges round up to the next 1,000 minutes. Below are some pricing estimates based on minutes delivered and stored:

| **Minutes** | **Round up to** | **Charges incurred** |
| --- | --- | --- |
| 1,999 delivered to users | 2,000 minutes | USD $2.00 |
| 3,001 stored on Stream | 4,000 minutes | USD $20.00 |
| Total charges (minutes delivered + minutes stored) for period | USD $22.00 |

___

## Cloudflare Stream billable minutes

Billable minutes represent the time spent delivering video from Cloudflare to your visitors.

If a site visitor loads a video and does not watch it, Cloudflare will still charge for video delivery. However, if the visitor’s browser caches the video locally, Cloudflare does not charge for time spent watching it. In other words, if the visitor watches the video multiple times, we will not charge for subsequent views.

Cloudflare Stream preloading behavior varies by browser. Some browsers pre-load a few seconds of video while others pre-load the entire video. Although preloading is useful in optimizing video availability, consider if it is appropriate for your use case.

You can view your Cloudflare Stream billable minutes in the Cloudflare dashboard to estimate the charge for minutes delivered.

To view your Stream minutes watched, 

1.  Log in to your Cloudflare account.
2.  Under the **My Profile** dropdown, click **Billing**. A list of the domains associated with your Cloudflare account appears.
3.  Choose the domain that has Stream enabled.
4.  In the left navigation, click **Billable Usage**. A graph that displays your current daily traffic appears.
5.  Choose **Previous month** from the dropdown above the graph and click **Month to date** to view your previous month’s usage.

![The Billing tab from the Cloudflare Dashboard showing the Billable Usage section and an increasing amount of usage over three weeks.](/support/static/hc-import-stream_billing_subcriptions_previous_month.png)

___

-   [Cloudflare Stream video platform](https://support.cloudflare.com/hc/en-us/articles/360017801091)
-   [Cloudflare Stream developer documentation](https://developers.cloudflare.com/stream/getting-started/)
