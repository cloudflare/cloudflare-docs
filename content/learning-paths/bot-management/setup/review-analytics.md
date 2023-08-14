---
title: Review analytics
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

Before deploying Bot Management on live traffic, use [Bot Analytics](/bots/bot-analytics/bm-subscription/) to determine your domain's sensitivity to bot traffic.

At the end of your analysis, you should have:

- A range of scores you can confidently block or challenge.
- Specific characteristics that identify traffic that you should allow.
- Identified other nuances in your traffic for further investigation.

{{<Aside type="note">}}

If you were a Cloudflare customer before adding Bot Management, you can view past analytics. This means that you will be able to sort through traffic insights immediately.

New customers should give Bot Analytics a few days to gather data.

{{</Aside>}}

## Bot analytics

Go to **Security** > **Bots** and examine the following traffic segments:

- **Automated traffic**: Bot scores of 1
- **Likely automated traffic**: Bots scores of 2 through 29
- **Other traffic groups**: Any additional large spikes in bot scores

### Automated and Likely automated traffic

For **automated** traffic, sort through the IP addresses, ASNs, and other data points at the bottom of the page. 

Look for traffic groups that _should not_ be blocked — commonly API or mobile app traffic. Do the same for **likely automated** traffic.

{{<render file="_bot-analytics-traffic-characteristics.md" productFolder="bots">}}

For more details, refer to [Understand your site's traffic](/learning-paths/bot-management/planning/site-traffic/).

---

### Other traffic groups

Use the slider tool to identify **other traffic groups**. For example, you may find that traffic from your mobile app is routinely scored at 12. 

![Example of a bot score distribution](/images/bots/bot-score-distribution.png)

Note the common characteristics of these requests, looking at the same information as for [automated and likely automated traffic](#automated-and-likely-automated-traffic). These requests may be from sources you do not want to block.

---

## Cloudflare Logs

{{<render file="_bot-log-fields.md" productFolder="bots" >}}

If you [update your Logpush export](/logs/get-started/) to include these new fields, you can perform more detailed analysis of bot-related requests.