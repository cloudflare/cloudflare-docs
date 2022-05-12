---
title: Configure Transform Rules
pcx-content-type: how-to
weight: 6
meta:
  title: Configure Transform Rules with Terraform
layout: list
---

# Configure Transform Rules

This page provides examples of creating Transform Rules in a zone using Terraform. The examples cover the following scenarios:

* [Create a URL Rewrite Rule](#create-a-url-rewrite-rule)
* [Create an HTTP Request Header Modification Rule](#create-an-http-request-header-modification-rule)

For more information on Transform Rules, refer to [Transform Rules](/rules/transform/).

## Create a URL Rewrite Rule

The following example creates a URL Rewrite Rule that rewrites requests for `example.com/old-folder` to `example.com/new-folder`:

```tf
resource "cloudflare_ruleset" "transform_url_rewrite" {
  zone_id     = "<ZONE_ID>"
  name        = "Transform Rule performing a static URL rewrite"
  description = ""
  kind        = "zone"
  phase       = "http_request_transform"
  rules {
    action = "rewrite"
    action_parameters {
      uri {
        path {
          value = "/new-folder"
        }
      }
    }
    expression = "(http.host eq \"example.com\" and http.request.uri.path eq \"/old-folder\")"
    description = "Example URL Rewrite Rule"
    enabled = true
  }
}
```

For more information on rewriting URLs, refer to [URL Rewrite Rules](/rules/transform/url-rewrite/).

## Create an HTTP Request Header Modification Rule

The following configuration example performs the following adjustments to HTTP request headers:

* Adds a header `my-header-1` with a static value.
* Adds a header `my-header-2` with a dynamic value defined by an expression.
* Deletes header `existing-header`, if it exists.

```tf
resource "cloudflare_ruleset" "transform_modify_request_headers" {
  zone_id     = "<ZONE_ID>"
  name        = "Transform Rule performing HTTP request header modifications"
  description = ""
  kind        = "zone"
  phase       = "http_request_late_transform"
  rules {
    action = "rewrite"
    action_parameters {
      headers {
        name      = "my-header-1"
        operation = "set"
        value     = "Fixed value"
      }
      headers {
        name       = "my-header-2"
        operation  = "set"
        expression = "cf.zone.name"
      }
      headers {
        name      = "existing-header"
        operation = "remove"
      }
    }
    expression = "true"
    description = "Example HTTP Request Header Modification Rule"
    enabled = true
  }
}
```

For more information on modifying request headers, refer to [HTTP Request Header Modification Rules](/rules/transform/request-header-modification/).
