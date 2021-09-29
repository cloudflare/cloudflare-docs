---
order: 1
pcx-content-type: concept
---

import BMBotDetectionEngines from "../_partials/_bm-bot-detection-engines.md"

# Bot scores

A bot score is a score from *1* to *99* that indicates how likely that request came from a bot. For example, a score of 1 means Cloudflare is quite certain the request was automated, while a score of 99 means Cloudflare is quite certain the request came from a human.

Bot scores are available to be used in Firewall fields and with Workers to customize application behavior. For more details, refer to [Bot Management variables](/reference/bot-management-variables). 

<Aside type="note" header="Note:">

Granular bot scores are only available to Enterprise customers who have purchased Bot Management. All other customers can only access this information through [bot groupings](#bot-groupings) in Bot Analytics.

</Aside>

## Bot groupings

Customers with a Pro plan or higher can automatically see bot traffic divided into groups by going to **Firewall** > **Bots**.

- **Automated**: Bot scores of 1.
- **Likely automated**: Bots scores of 2 through 29.
- **Likely human**: Bot scores of 30 through 99.
- **Verified bot**: Non-malicious automated traffic (used to power search engines and other applications).

## How Cloudflare generates bot scores

<Aside type="note" header="Note:">

The following detection engines only apply to Enterprise Bot Management. For specific details about the engines included in your plan, refer to [Plans](/plans).

</Aside>

<BMBotDetectionEngines/>

## Comparison to Threat Score

Bot Score is different from Threat Score. Bot Score identifies bots and Threat Score measures IP reputation across our services. Most customers achieve the best results by relying on bot scores and avoiding IP reputation entirely.