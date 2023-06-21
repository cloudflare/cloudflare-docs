---
title: Transform Rules
pcx_content_type: how-to
weight: 6
meta:
  title: Configure Transform Rules with Terraform
---

# Configure Transform Rules

This page provides examples of creating Transform Rules in a zone using Terraform. The examples cover the following scenarios:

* [Create a Rewrite URL Rule](#create-a-rewrite-url-rule)
* [Create an HTTP Request Header Modification Rule](#create-an-http-request-header-modification-rule)

For more information on Transform Rules, refer to [Transform Rules](/rules/transform/).

## Before you start

### Obtain the necessary account or zone IDs

{{<render file="_find-ids.md">}}

### Import or delete existing rulesets

{{<render file="_import-delete-existing-rulesets.md">}}

---

## Create a Rewrite URL Rule

The following example creates a Rewrite URL Rule that rewrites requests for `example.com/old-folder` to `example.com/new-folder`:

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
    description = "Example Rewrite URL Rule"
    enabled = true
  }
}
```

{{<render file="_add-new-rule.md" withParameters="Rewrite URL Rule">}}
<br/>

For more information on rewriting URLs, refer to [Rewrite URL Rules](/rules/transform/url-rewrite/).

## Create an HTTP Request Header Modification Rule

The following configuration example performs the following adjustments to HTTP request headers:

* Adds a `my-header-1` header to the request with a static value.
* Adds a `my-header-2` header to the request with a dynamic value defined by an expression.
* Deletes the `existing-header` header from the request, if it exists.

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

{{<render file="_add-new-rule.md" withParameters="Request Header Modification Rule">}}
<br/>

For more information on modifying request headers, refer to [HTTP Request Header Modification Rules](/rules/transform/request-header-modification/).

## Create an HTTP Response Header Modification Rule

The following configuration example performs the following adjustments to HTTP response headers:

* Adds a `my-header-1` header to the response with a static value.
* Adds a `my-header-2` header to the response with a dynamic value defined by an expression.
* Deletes the `existing-header` header from the response, if it exists.

```tf
resource "cloudflare_ruleset" "transform_modify_response_headers" {
  zone_id     = "<ZONE_ID>"
  name        = "Transform Rule performing HTTP response header modifications"
  description = ""
  kind        = "zone"
  phase       = "http_response_headers_transform"

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
    description = "Example HTTP Response Header Modification Rule"
    enabled = true
  }
}
```

{{<render file="_add-new-rule.md" withParameters="Response Header Modification Rule">}}
<br/>

For more information on modifying response headers, refer to [HTTP Response Header Modification Rules](/rules/transform/response-header-modification/).
