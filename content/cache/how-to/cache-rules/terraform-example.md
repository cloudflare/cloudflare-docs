---
title: Terraform example
pcx_content_type: configuration
weight: 5
meta:
  title: Cache Rules — Terraform example
---

# Terraform example

The following example defines a single cache rule for a zone using Terraform. The rule configures several cache settings and sets a custom cache key for incoming requests addressed at `example.net`.

{{<details header="Terraform `cloudflare_ruleset` resource">}}

```tf
# Cache rule configuring cache settings and defining custom cache keys
resource "cloudflare_ruleset" "cache_rules_example" {
  zone_id     = "<ZONE_ID>"
  name        = "Set cache settings"
  description = "Set cache settings for incoming requests"
  kind        = "zone"
  phase       = "http_request_cache_settings"

  rules {
    action = "set_cache_settings"
    action_parameters {
      edge_ttl {
        mode    = "override_origin"
        default = 60
        status_code_ttl {
          status_code = 200
          value       = 50
        }
        status_code_ttl {
          status_code_range {
            from = 201
            to   = 300
          }
          value = 30
        }
      }
      browser_ttl {
        mode = "respect_origin"
      }
      serve_stale {
        disable_stale_while_updating = true
      }
      respect_strong_etags = true
      cache_key {
        ignore_query_strings_order = false
        cache_deception_armor      = true
        custom_key {
          query_string {
            exclude = ["*"]
          }
          header {
            include        = ["habc", "hdef"]
            check_presence = ["habc_t", "hdef_t"]
            exclude_origin = true
          }
          cookie {
            include        = ["cabc", "cdef"]
            check_presence = ["cabc_t", "cdef_t"]
          }
          user {
            device_type = true
            geo         = false
          }
          host {
            resolved = true
          }
        }
      }
      origin_error_page_passthru = false
    }
    expression  = "(http.host eq \"example.net\")"
    description = "Set cache settings and custom cache key for example.net"
    enabled     = true
  }
}
```

{{</details>}}

For additional guidance on using Terraform with Cloudflare, refer to [Terraform](/terraform/).
