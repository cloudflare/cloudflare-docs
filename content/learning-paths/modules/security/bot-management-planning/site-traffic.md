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

To allow verified bots, you would need to include `not (cf.bot_management.verified_bot)` as part of a firewall rule.

---

## Automated traffic

### Situations

By default, Bot management rules will block non-browser traffic.

This can be problematic if your application receives a lot of API traffic, or if you have tools related to:

- Indexing content for search.
- Auditing content (links, headers, etc.).
- Monitoring uptime.
- Forward proxying traffic, such as secure web gateways.

### Implementation details

Depending on your application, you may want to write rules that allow specific types of automated traffic or rules that allow all automated traffic to specific endpoints (`/api`, for example).

In some cases, APIs might be better suited for [API Shield](/api-shield/) than Bot Management.

You should also take time to review [Bot analytics](/bots/bot-analytics/bm-subscription/) to make sure you fully understand the automated traffic reaching your site. Often, you might discover services maintained by a different team or other surprises.

{{<render file="_bot-analytics-traffic-characteristics.md" productFolder="bots">}}

---

## Mobile app traffic

Because of how mobile applications send requests, Bot Management has the potential to score mobile traffic differently than browser-based traffic.

### Implementation details

#### Review analytics

Take extra time to review [Bot analytics](/bots/bot-analytics/bm-subscription/) to evaluate how your mobile application traffic is performing.

You can generally identify mobile traffic with common user agent strings, though these strings may differ between iOS and Android. Malicious actors might also try to impersonate your mobile application traffic with user agent strings.

{{<render file="_allow-rules-caveat.md" productFolder="bots">}}
<br/>

#### Adjust rules

If your application [uses mTLS](/api-shield/security/mtls/), you can also integrate that certificate's presence into your firewall rules using the `cf.tls_client_auth.cert_verified` field.

Native or progressive web applications should also only use *Block* as a [firewall rule action](/firewall/cf-firewall-rules/actions/).