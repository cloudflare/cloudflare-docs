---
pcx_content_type: concept
title: Bot scores
weight: 2
---

# Bot scores

{{<render file="_bot-score-definition.md">}}

Bot scores are available to be used in Firewall fields and with Workers to customize application behavior. For more details, refer to [Bot Management variables](/bots/reference/bot-management-variables/).

{{<Aside type="note">}}
Granular bot scores are only available to Enterprise customers who have purchased Bot Management. All other customers can only access this information through [bot groupings](#bot-groupings) in Bot Analytics.
{{</Aside>}}

## Bot groupings

Customers with a Pro plan or higher can automatically see bot traffic divided into groups by going to **Security** > **Bots**.

{{<render file="_bot-groupings.md">}}

{{<Aside type="note">}}
Bot scores are not computed for requests to paths that are handled by Cloudflare and will never be blocked or forwarded to the origin. 
{{</Aside>}}

## How Cloudflare generates bot scores

{{<Aside type="note">}}
The following detection engines only apply to Enterprise Bot Management. For specific details about the engines included in your plan, refer to [Plans](/bots/plans/).
{{</Aside>}}

{{<render file="_bm-bot-detection-engines.md">}}

### Cloudflare service

{{<render file="_bots-cs.md">}}
<br/>

### Not computed

{{<render file="_bots-nc.md">}}

### Notes on detection

{{<render file="_bots-cookie.md">}}

## Comparison to Threat Score

Bot Score is different from Threat Score. Bot Score identifies bots and Threat Score measures IP reputation across our services. Most customers achieve the best results by relying on bot scores and avoiding IP reputation entirely.
