---
pcx_content_type: example
summary: Create an origin rule using Terraform to override the `Host` header, the resolved hostname, and the destination port of API requests.
product:
  - Origin Rules
title: Define a single origin rule using Terraform
---

# Define a single origin rule using Terraform

The following example defines a single origin rule for a zone using Terraform. The rule overrides the `Host` header, the resolved hostname, and the destination port of API requests.

```tf
# Change origin for API requests
resource "cloudflare_ruleset" "http_origin_example" {
  zone_id     = "<ZONE_ID>"
  name        = "Change origin"
  description = ""
  kind        = "zone"
  phase       = "http_request_origin"

  rules {
    action = "route"
    action_parameters {
      host_header = "example.net"
      origin {
        host = "example.net"
        port = 8000
      }
    }
    expression  = "(http.request.uri.path matches \"^/api/\")"
    description = "Change origin of API requests"
    enabled     = true
  }
}
```

{{<render file="_terraform-additional-resources.md">}}
