---
title: Create rule using Terraform
pcx_content_type: configuration
weight: 4
meta:
  title: Create a redirect rule using Terraform
---

# Create a redirect rule using Terraform

The following example defines a single redirect rule for a zone using Terraform. The rule creates a static URL redirect for visitors requesting the contacts page using an old URL.

```tf
# Single Redirects resource
resource "cloudflare_ruleset" "single_redirects_example" {
  zone_id     = "<ZONE_ID>"
  name        = "redirects"
  description = "Redirects ruleset"
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