---
title: Transform Rules configuration using Terraform
pcx_content_type: how-to
sidebar:
  order: 6
  label: Transform Rules
head:
  - tag: title
    content: Transform Rules configuration using Terraform
---

import { Render } from "~/components";

This page provides examples of creating [Transform Rules](/rules/transform/) in a zone using Terraform. The examples cover the following scenarios:

- [Create a URL rewrite rule](#create-a-url-rewrite-rule)
- [Create a request header transform rule](#create-a-request-header-transform-rule)
- [Create a response header transform rule](#create-a-response-header-transform-rule)
- [Configure Managed Transforms](#configure-managed-transforms)

If you are using the Cloudflare API, refer to the following resources:

- [Create a URL rewrite rule via API](/rules/transform/url-rewrite/create-api/)
- [Create a request header transform rule via API](/rules/transform/request-header-modification/create-api/)
- [Create a response header transform rule via API](/rules/transform/response-header-modification/create-api/)
- [Configure Managed Transforms](/rules/transform/managed-transforms/configure/)

## Before you start

### Obtain the necessary account or zone IDs

<Render file="find-ids" product="terraform" />

### Import or delete existing rulesets

<Render file="import-delete-existing-rulesets" product="terraform" />

---

## Create a URL rewrite rule

The following example creates a URL rewrite rule that rewrites requests for `example.com/old-folder` to `example.com/new-folder`:

<Render file="v4-code-snippets" product="terraform" />

```tf
resource "cloudflare_ruleset" "transform_url_rewrite" {
  zone_id     = "<ZONE_ID>"
  name        = "Transform Rule performing a static URL rewrite"
  description = ""
  kind        = "zone"
  phase       = "http_request_transform"

  rules {
    ref         = "url_rewrite_old_folder"
    description = "Example URL rewrite rule"
    expression  = "(http.host eq \"example.com\" and http.request.uri.path eq \"/old-folder\")"
    action      = "rewrite"
    action_parameters {
      uri {
        path {
          value = "/new-folder"
        }
      }
    }
  }
}
```

<Render file="terraform-use-ref-field" product="rules" />

<Render
	file="add-new-rule"
	product="terraform"
	params={{ ruleType: "URL rewrite rule" }}
/>
<br />

For more information on rewriting URLs, refer to [URL Rewrite Rules](/rules/transform/url-rewrite/).

## Create a request header transform rule

The following configuration example performs the following adjustments to HTTP request headers:

- Adds a `my-header-1` header to the request with a static value.
- Adds a `my-header-2` header to the request with a dynamic value defined by an expression.
- Deletes the `existing-header` header from the request, if it exists.

<Render file="v4-code-snippets" product="terraform" />

```tf
resource "cloudflare_ruleset" "transform_modify_request_headers" {
  zone_id     = "<ZONE_ID>"
  name        = "Transform Rule performing HTTP request header modifications"
  description = ""
  kind        = "zone"
  phase       = "http_request_late_transform"

  rules {
    ref         = "modify_request_headers"
    description = "Example request header transform rule"
    expression  = "true"
    action      = "rewrite"
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
  }
}
```

<Render file="terraform-use-ref-field" product="rules" />

<Render
	file="add-new-rule"
	product="terraform"
	params={{ ruleType: "request header transform rule" }}
/>

For more information on modifying request headers, refer to [Request Header Transform Rules](/rules/transform/request-header-modification/).

## Create a response header transform rule

The following configuration example performs the following adjustments to HTTP response headers:

- Adds a `my-header-1` header to the response with a static value.
- Adds a `my-header-2` header to the response with a dynamic value defined by an expression.
- Deletes the `existing-header` header from the response, if it exists.

<Render file="v4-code-snippets" product="terraform" />

```tf
resource "cloudflare_ruleset" "transform_modify_response_headers" {
  zone_id     = "<ZONE_ID>"
  name        = "Transform Rule performing HTTP response header modifications"
  description = ""
  kind        = "zone"
  phase       = "http_response_headers_transform"

  rules {
    ref         = "modify_response_headers"
    description = "Example response header transform rule"
    expression  = "true"
    action      = "rewrite"
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
  }
}
```

<Render file="terraform-use-ref-field" product="rules" />

<Render
	file="add-new-rule"
	product="terraform"
	params={{ ruleType: "response header transform rule" }}
/>

For more information on modifying response headers, refer to [Response Header Transform Rules](/rules/transform/response-header-modification/).

## Configure Managed Transforms

<Render file="v4-code-snippets" product="terraform" />

<Render file="transform/terraform-managed-transforms-example" product="rules" />

For more information on Managed Transforms, refer to [Managed Transforms](/rules/transform/managed-transforms/).
