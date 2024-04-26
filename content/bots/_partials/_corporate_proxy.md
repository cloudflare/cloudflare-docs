---
_build:
  publishResources: false
  render: never
  list: never
---

The Bot Management Corporate Proxy field contains identified cloud-based corporate proxies and secure web gateways that are Enterprise-only, and provide outbound security services to their clients. 

You can access the Corporate Proxy field in [custom rules](/waf/custom-rules/), [rate limiting rules](/waf/rate-limiting-rules/), or [Workers](/workers/) to provide different security rules for traffic from these sources. You can also exempt them from rules using Bot Management scores. 

```txt
---
header: Example 
---

not cf.bot_management.verified_bot 
and not cf.bot_management.static_resource 
and not  cf.bot_management.corporate_proxy
and cf.bot_management.score lt 30
```