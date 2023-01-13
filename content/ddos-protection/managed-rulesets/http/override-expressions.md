---
title: Override expressions
pcx_content_type: reference
weight: 7
meta:
  title: Override expressions for HTTP DDoS Attack Protection
---

# Override expressions

Set an override expression for the HTTP DDoS Attack Protection managed ruleset to define a specific scope for [sensitivity level](/ddos-protection/managed-rulesets/http/override-parameters/#sensitivity-level) or [action](/ddos-protection/managed-rulesets/http/override-parameters/#action) adjustments. For example, you can set different sensitivity levels for different request URI paths: a medium sensitivity level for URI path `A` and a low sensitivity level for URI path `B`.

{{<Aside type="note">}}
Only available to Enterprise customers with the Advanced DDoS Protection subscription.
{{</Aside>}}

## Available expression fields

You can use the following fields in override expressions:

- `http.host`
- `http.referer`
- `http.user_agent`
- `http.cookie`
- `http.x_forwarded_for`
- `http.request.method`
- `http.request.full_uri`
- `http.request.uri`
- `http.request.uri.path`
- `http.request.uri.query`
- `http.request.version`
- `http.request.body.raw`
- `http.request.body.size`
- `ip.src`
- `ip.geoip.asnum`
- `ip.geoip.continent`
- `ip.geoip.country`
- `cf.threat_score`

Refer to [Fields](/ruleset-engine/rules-language/fields/) in the Rules language documentation for more information.
