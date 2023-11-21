---
title: Troubleshooting
pcx_content_type: troubleshooting
weight: 1
meta:
  title: Rules troubleshooting
  description: Review common troubleshooting scenarios for Rules features.
---

# Rules troubleshooting

## Interaction between managed challenges and Rules features

If you are using a [managed challenge](/firewall/cf-firewall-rules/cloudflare-challenges/#managed-challenge-recommended) on a given URI path that has one or more Rules features enabled, you should exclude URI paths starting with `/cdn-cgi/challenge-platform/` in your rule expressions to avoid challenge loops.

For example, define a compound expression for your rule using the `and` operator and the [`starts_with()`](/ruleset-engine/rules-language/functions/#function-starts_with) function:

```txt
<OTHER_RULE_CONDITIONS> and not starts_with(http.request.uri, "/cdn-cgi/")
```