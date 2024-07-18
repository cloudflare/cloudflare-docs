---
pcx_content_type: example
summary: Create a configuration rule using Terraform to turn off Email Obfuscation and Browser Integrity Check for API requests in a given zone.
product:
  - Configuration Rules
title: Define a single configuration rule using Terraform
---

# Define a single configuration rule using Terraform

The following example defines a single configuration rule for a zone using Terraform. The rule disables Email Obfuscation and Browser Integrity Check for API requests.

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