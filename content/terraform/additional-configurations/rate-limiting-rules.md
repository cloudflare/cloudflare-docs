---
title: Rate limiting rules
pcx_content_type: how-to
weight: 4
meta:
  title: Configure rate limiting rules with Terraform
---

# Configure rate limiting rules

This page provides an example of creating a rate limiting rule in a zone using Terraform.

For more information on rate limiting rules, refer to [Rate limiting rules](/waf/rate-limiting-rules/) in the Cloudflare WAF documentation.

{{<Aside type="note">}}
For more information on configuring the previous version of rate limiting rules in Terraform, refer to the [`cloudflare_rate_limit` resource](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/rate_limit) in the Terraform documentation.
{{</Aside>}}

## Before you start

### Obtain the necessary account or zone IDs

{{<render file="_find-ids.md">}}

### Import or delete existing rulesets

{{<render file="_import-delete-existing-rulesets.md">}}

---

## Create a rate limiting rule

This example creates a rate limiting rule in zone with ID `<ZONE_ID>` blocking traffic that exceeds the configured rate:

```tf
resource "cloudflare_ruleset" "zone_rl" {
  zone_id     = "<ZONE_ID>"
  name        = "Rate limiting for my zone"
  description = ""
  kind        = "zone"
  phase       = "http_ratelimit"

  rules {
    action = "block"
    ratelimit {
      characteristics = ["cf.colo.id", "ip.src"]
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

{{<render file="_add-new-rule.md" withParameters="rate limiting rule">}}
<br/>

<details>
<summary>Account-level example configuration</summary>
<div>

{{<Aside type="note" header="Before you start">}}
* Account-level rate limiting configuration requires an Enterprise plan with a paid add-on.

* Custom rulesets deployed at the account level will only apply to incoming traffic of zones on an Enterprise plan. The expression of your `execute` rule must end with `and cf.zone.plan eq "ENT"`.
{{</Aside>}}

This example defines a [custom ruleset](/ruleset-engine/custom-rulesets/) with a single rate limiting rule in account with ID `<ACCOUNT_ID>` that blocks traffic for the `/api/` path exceeding the configured rate. The second `cloudflare_ruleset` resource defines an `execute` rule that deploys the custom ruleset for traffic addressed at `example.com`.

```tf
resource "cloudflare_ruleset" "account_rl" {
  account_id  = <ACCOUNT_ID>
  name        = "Rate limiting rules for APIs"
  description = ""
  kind        = "custom"
  phase       = "http_ratelimit"

  rules {
    action = "block"
    ratelimit {
      characteristics = ["cf.colo.id", "ip.src"]
      period = 60
      requests_per_period = 100
      mitigation_timeout = 600
    }
    expression = "http.request.uri.path contains \"/api/\""
    description = "API rule"
    enabled = true
  }
}

# Account-level entry point ruleset for the 'http_ratelimit' phase
resource "cloudflare_ruleset" "account_rl_entrypoint" {
  account_id  = <ACCOUNT_ID>
  name        = "Account-level rate limiting"
  description = ""
  kind        = "root"
  phase       = "http_ratelimit"

  depends_on = [cloudflare_ruleset.account_rl]

  rules {
    # Deploy the previously defined custom ruleset containing a rate limiting rule
    action = "execute"
    action_parameters {
      id = cloudflare_ruleset.account_rl.id
    }
    expression = "cf.zone.name eq \"example.com\" and cf.zone.plan eq \"ENT\""
    description = "Deploy custom ruleset with RL rule"
    enabled = true
  }
}
```

</div>
</details>

## Create an advanced rate limiting rule

This example creates a rate limiting rule in zone with ID `<ZONE_ID>` with:
* A custom counting expression that includes a response field (`http.response.code`).
* A custom JSON response for rate limited requests.

```tf
resource "cloudflare_ruleset" "zone_rl_custom_response" {
  zone_id     = "<ZONE_ID>"
  name        = "Advanced rate limiting rule for my zone"
  description = ""
  kind        = "zone"
  phase       = "http_ratelimit"

  rules {
    action = "block"
    action_parameters {
      response {
        status_code = 429
        content = "{\"response\": \"block\"}"
        content_type = "application/json"
      }
    }
    ratelimit {
      characteristics = ["ip.src", "cf.colo.id"]
      period = 10
      requests_per_period = 5
      mitigation_timeout = 30
      counting_expression = "(http.host eq \"www.example.com\") and (http.request.uri.path matches \"^/status/\") and (http.response.code eq 404)"
    }
    expression = "http.host eq \"www.example.com\" and (http.request.uri.path matches \"^/status/\")"
    description = "Rate limit requests to www.example.com when exceeding the threshold of 404 responses on /status/"
    enabled = true
  }
}
```

{{<render file="_add-new-rule.md" withParameters="rate limiting rule">}}
<br/>