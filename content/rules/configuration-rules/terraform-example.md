---
title: Terraform example
pcx_content_type: configuration
weight: 5
meta:
  title: Configuration Rules — Terraform example
---

# Terraform example

The following example defines a single Configuration Rule for a zone using Terraform. The rule disables Email Obfuscation and Browser Integrity Check for API requests.

```tf
# Disable a couple of Cloudflare settings for API requests
resource "cloudflare_ruleset" "http_config_rules_example" {
  zone_id     = "<ZONE_ID>"
  name        = "Config rules ruleset"
  description = "Set configuration rules for incoming requests"
  kind        = "zone"
  phase       = "http_config_settings"

  rules {
    action = "set_config"
    action_parameters {
      email_obfuscation = false
      bic               = false
    }
    expression  = "(http.request.uri.path matches \"^/api/\")"
    description = "Disable email obfuscation and BIC for API requests"
    enabled     = true
  }
}
```

{{<render file="_terraform-additional-resources.md">}}