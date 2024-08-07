---
_build:
  publishResources: false
  render: never
  list: never
---

{{<table-wrap style="font-size: 87%">}}

Feature | Free | Pro | Business | Enterprise with app security | Enterprise with Advanced Rate Limiting |
---|---|---|---|---|---
Available fields<br/>in rule expression | Path, [Verified Bot](/ruleset-engine/rules-language/fields/#field-cf-bot_management-verified_bot) | Host, URI, Path, Full URI, Query, Verified Bot | Host, URI, Path, Full URI, Query, Method, Source IP, User Agent, Verified Bot | [Standard fields](/ruleset-engine/rules-language/fields/#standard-fields), [request header fields](/ruleset-engine/rules-language/fields/#http-request-header-fields), [dynamic fields](/ruleset-engine/rules-language/fields/#dynamic-fields) (including Verified Bot), other Bot Management fields<sup>1</sup> | [Standard fields](/ruleset-engine/rules-language/fields/#standard-fields), [request header fields](/ruleset-engine/rules-language/fields/#http-request-header-fields), [dynamic fields](/ruleset-engine/rules-language/fields/#dynamic-fields) (including Verified Bot), other Bot Management fields<sup>1</sup>, [request body fields](/ruleset-engine/rules-language/fields/#http-request-body-fields)<sup>2</sup>
Counting characteristics | IP | IP | IP | IP, IP with NAT support | IP, IP with NAT support, Query, Host, Headers, Cookie, ASN, Country, Path, JA3/JA4 Fingerprint<sup>1</sup>, JSON field value<sup>2</sup>, Body<sup>2</sup>, Form input value<sup>2</sup>, Custom
Available fields<br/>in counting expression | N/A | N/A | All rule expression fields, Response code, Response headers | All rule expression fields, Response code, Response headers | All rule expression fields, Response code, Response headers
Counting model | Number of requests | Number of requests | Number of requests | Number of requests | Number of requests,<br/>[complexity score](/waf/rate-limiting-rules/request-rate/#complexity-based-rate-limiting)
Rate limiting<br>action behavior | Perform action during mitigation period | Perform action during mitigation period | Perform action during mitigation period | Perform action during mitigation period,<br>Throttle requests above rate with block action | Perform action during mitigation period,<br>Throttle requests above rate with block action
Counting periods | 10 s | 10 s, 1 min | 10 s, 1 min, 10 min | 10 s, 1 min, 2 min, 5 min, 10 min | 10 s, 1 min, 2 min, 5 min, 10 min, 1 h
Mitigation timeout periods | 10 s | 10 s, 1 min, 1 h | 10 s, 1 min, 1 h, 1 day | 10 s, 1 min, 2 min, 5 min, 10 min, 1 h, 1 day<sup>3</sup> | 10 s, 1 min, 2 min, 5 min, 10 min, 1 h, 1 day<sup>3</sup>
Number of rules | 1 | 2 | 5 | 5 or more<sup>4</sup> | 100

{{</table-wrap>}}

<sup>1</sup> _Only available to Enterprise customers who have purchased [Bot Management](/bots/plans/bm-subscription/)._<br>
<sup>2</sup> _Availability depends on your WAF plan._<br>
<sup>3</sup> _Enterprise customers can specify a custom mitigation timeout period via API._<br>
<sup>4</sup> _Enterprise customers must have application security on their contract to get access to rate limiting rules. The number of rules depends on the exact contract terms._
