---
title: Terraform example
pcx_content_type: configuration
weight: 4
meta:
  title: Dynamic Redirects — Terraform example
---

# Terraform example

The following example defines a single dynamic redirect rule for a zone using Terraform. The rule creates a static redirect for visitors requesting the contacts page using an old URL.

```tf
# Dynamic Redirects resource
resource "cloudflare_ruleset" "dynamic_redirects_example" {
  zone_id     = "<ZONE_ID>"
  name        = "redirects"
  description = "Redirect ruleset"
  kind        = "zone"
  phase       = "http_request_dynamic_redirect"

  rules {
    action = "redirect"
    action_parameters {
      from_value {
        status_code = 301
        target_url {
          value = "/contacts/"
        }
        preserve_query_string = false
      }
    }
    expression  = "(http.request.uri.path matches \"^/contact-us/\")"
    description = "Redirect visitors still using old URL"
    enabled     = true
  }
}
```

{{<render file="_terraform-additional-resources.md">}}