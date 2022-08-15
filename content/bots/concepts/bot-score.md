---
pcx_content_type: concept
title: Bot scores
weight: 2
---

# Bot scores

A bot score is a score from _1_ to _99_ that indicates how likely that request came from a bot. For example, a score of 1 means Cloudflare is quite certain the request was automated, while a score of 99 means Cloudflare is quite certain the request came from a human.

Bot scores are available to be used in Firewall fields and with Workers to customize application behavior. For more details, refer to [Bot Management variables](/bots/reference/bot-management-variables/).

{{<Aside type="note" header="Note:">}}

Granular bot scores are only available to Enterprise customers who have purchased Bot Management. All other customers can only access this information through [bot groupings](#bot-groupings) in Bot Analytics.

{{</Aside>}}

## Bot groupings

Customers with a Pro plan or higher can automatically see bot traffic divided into groups by going to **Security** > **Bots**.

| Category | Range |
| ---- | ---- |
| **Not computed** | Bot scores of 0. |
| **Automated** | Bot scores of 1. |
| **Likely automated** | Bot scores of 2 through 29. |
| **Likely human** | Bot scores of 30 through 99. |
| **Verified bot** | Non-malicious automated traffic (used to power search engines and other applications). |

{{<Aside type="note" header="Note:">}}

Bot scores are not computed for requests to paths that are handled by Cloudflare and will never be blocked or forwarded to the origin. 

{{</Aside>}}

## How Cloudflare generates bot scores

{{<Aside type="note" header="Note:">}}

The following detection engines only apply to Enterprise Bot Management. For specific details about the engines included in your plan, refer to [Plans](/bots/plans/).

{{</Aside>}}

{{<render file="_bm-bot-detection-engines.md">}}

## Comparison to Threat Score

Bot Score is different from Threat Score. Bot Score identifies bots and Threat Score measures IP reputation across our services. Most customers achieve the best results by relying on bot scores and avoiding IP reputation entirely.
