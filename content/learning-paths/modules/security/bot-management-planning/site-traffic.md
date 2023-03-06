---
title: Understand site traffic
pcx_content_type: learning-unit
weight: 5
layout: learning-unit
---

Another characteristic to consider is your application's traffic. Several aspects of your traffic might affect how you implement Bot management.

## Bot attacks

### Situations

If you are experiencing bot attacks, consider the nature of the attack.

{{<render file="_bot-types-attacks.md" productFolder="bots">}}

### Implementation details

If bots are submitting data through forms, you should likely be creating focused rules to block traffic on specific endpoints.

If bots are viewing data intended for human eyes only, you may want broader rules limiting bot interactions across your application.

---

## Verified bots

### Situations

{{<render file="_verified-bots.md" productFolder="bots" >}}

### Implementation details

Verified bots are blocked by default when you create [firewall rules](/firewall/) using `cf.bot_management.score`.

To allow verified bots, you would need to include `not (cf.botManagement.verifiedBot)` as part of a firewall rule.

---

## Automated traffic

### Situations

By default, Bot management rules will block non-browser traffic.

This can be problematic if your application receives a lot of API traffic, or if you have tools related to:

- Indexing content for search
- Auditing content (links, headers, etc.)
- Monitoring uptime
- Forward proxying traffic, such as secure web gateways

### Implementation details

Depending on your application, you may want to write rules that allow specific types of automated traffic or rules that allow all automated traffic to specific endpoints (`/api`, for example).

In some cases, APIs might be better suited for [API Shield](/api-shield/) than Bot management.

You should also take time to review [Bot analytics](/bots/bot-analytics/bm-subscription/) to make sure you fully understand the automated traffic reaching your site. Often, you might discover services maintained by a different team or other surprises. Pay specific attention to the top non-Mozilla user agents and whether those requests come from a predictable IP address and ASN, or have a similar [JA3 fingerprint](/bots/concepts/ja3-fingerprint/).