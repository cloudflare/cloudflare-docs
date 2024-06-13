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

```json
---
header: Sample output
---
 "botManagement": {
    "jsDetection": {
      "passed": false
    },
    "ja4Signals": {
      "h2h3_ratio_1h": 0.98670762777328,
      "heuristic_ratio_1h": 0,
      "reqs_quantile_1h": 0.99785631895065,
      "uas_rank_1h": 1030,
      "browser_ratio_1h": 0.95027899742126,
      "paths_rank_1h": 699,
      "reqs_rank_1h": 1156,
      "cache_ratio_1h": 0.38930341601372,
      "ips_rank_1h": 730,
      "ips_quantile_1h": 0.99864625930786
    },
    "staticResource": false,
    "corporateProxy": false,
    "ja4": "t13d1512h2_8daaf6152771_ef7df7f74e48",
    "verifiedBot": false,
    "ja3Hash": "25b4882c2bcb50cd6b469ff28c596742",
    "score": 99,
    "detectionIds": {}
  },
```

{{<Aside type="note">}}
This sample was generated using [Workers' Cloudflare Object script](/workers/examples/accessing-the-cloudflare-object/).
{{</Aside>}}

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