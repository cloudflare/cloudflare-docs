---
pcx_content_type: concept
title: JA3/JA4 Fingerprint
---

# JA3/JA4 Fingerprint

{{<render file="_ja3-fingerprint.md">}} <br />

{{<render file="_ja4-fingerprint.md">}}

{{<Aside type="note">}}
JA3 and JA4 fingerprints are only available to Enterprise customers who have purchased Bot Management.
{{</Aside>}}

{{<render file="_signals-intelligence-and-ja4.md">}}

## Analytics

To get more information about potential bot requests, use these JA3 and JA4 fingerprints in:

- [Bot Analytics](/bots/bot-analytics/bm-subscription/)
- [Security Events](/waf/analytics/security-events/) and [Security Analytics](/waf/analytics/security-analytics/)
- [Analytics GraphQL API](/analytics/graphql-api/), specifically the **HTTP Requests** dataset
- [Logs](/logs/reference/log-fields/zone/http_requests/)

## Actions

To adjust how your application responds to specific fingerprints, use them with:

- [WAF custom rules](/waf/custom-rules/)
- [Transform Rules](/rules/transform/)
- [Cloudflare Workers](/workers/runtime-apis/request/#incomingrequestcfproperties)

## Use cases

### Block or allow certain traffic

A group of similar requests may share the same JA3 fingerprint. For this reason, JA3 may be useful in blocking an incoming threat. For example, if you notice that a bot attack is not caught by existing defenses, create a [custom rule](/waf/custom-rules/) that blocks or challenges the JA3 used for the attack.

Alternatively, if existing defenses are blocking traffic that is actually legitimate, create a [custom rule](/waf/custom-rules/) with the _Skip_ action allowing the JA3 seen across good requests.

JA3 may also be useful if you want to immediately remedy false positives or false negatives with Bot Management.

### Allow mobile traffic

Often, mobile application traffic will produce the same JA3 fingerprint across devices and users. This means you can identify your mobile application traffic by its JA3 fingerprint.

Use the JA3 fingerprint to [allow traffic](/waf/custom-rules/use-cases/challenge-bad-bots/#adjust-for-mobile-traffic) from your mobile application, but block or challenge remaining traffic.