---
title: Override expressions
pcx_content_type: reference
weight: 7
meta:
  title: Override expressions for HTTP DDoS Attack Protection
---

# Override expressions

{{<Aside type="note">}}
Only available to Enterprise customers with the Advanced DDoS Protection subscription.
{{</Aside>}}

Set an override expression for the HTTP DDoS Attack Protection managed ruleset to define a specific scope for [sensitivity level](/ddos-protection/managed-rulesets/http/override-parameters/#sensitivity-level) or [action](/ddos-protection/managed-rulesets/http/override-parameters/#action) adjustments.

For example, you can set different sensitivity levels for different request URI paths: a medium sensitivity level for URI path `A` and a low sensitivity level for URI path `B`.

## Available expression fields

You can use the following fields in override expressions:

- `cf.client.bot`
- `cf.threat_score`
- `http.cookie`
- `http.host`
- `http.referer`
- `http.request.uri`
- `http.request.uri.path`
- `http.request.uri.query`
- `http.request.full_uri`
- `http.request.method`
- `http.request.version`
- `http.request.cookies`
- `http.user_agent`
- `http.x_forwarded_for`
- `ip.geoip.asnum`
- `ip.geoip.continent`
- `ip.geoip.country`
- `ip.geoip.is_in_european_union`
- `ip.src`
- `ssl`
- `cf.tls_client_auth.cert_verified`

Refer to [Fields](/ruleset-engine/rules-language/fields/) in the Rules language documentation for more information.
