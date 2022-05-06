---
title: Configure rate limiting rules
pcx-content-type: how-to
weight: 4
meta:
  title: Configure rate limiting rules with Terraform
layout: list
---

# Configure rate limiting rules

This page provides an example of creating a rate limiting rule in a zone using Terraform.

For more information on rate limiting rules, refer to [Rate limiting rules](/waf/rate-limiting-rules/) in the Cloudflare WAF documentation.

{{<Aside type="note">}}
For guidance on configuring the previous version of rate limiting rules in Terraform, refer to the [`cloudflare_rate_limit` resource](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/rate_limit) in the Terraform documentation.
{{</Aside>}}

## Create a rate limiting rule

This example creates a rate limiting rule in zone with ID `<ZONE_ID>` blocking traffic that exceeds the configured rate:

```tf
resource "cloudflare_ruleset" "zone_rl_custom_firewall" {
  zone_id     = "<ZONE_ID>"
  name        = "Rate limiting for my zone"
  description = ""
  kind        = "zone"
  phase       = "http_ratelimit"
 
  rules {
    action = "block"
    ratelimit {
      characteristics = ["cf.colo.id", "ip.src", "http.request.headers[\"x-api-key\"]"]
      period = 60
      requests_per_period = 100
      mitigation_timeout = 600
    }
    expression = "(http.request.uri.path matches \"^/api/\")"
    description = "My rate limiting rule"
    enabled = true
  }
}
```