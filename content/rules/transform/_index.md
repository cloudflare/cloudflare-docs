---
pcx-content-type: concept
title: Transform Rules
weight: 3
layout: single
---

# Transform Rules

Transform Rules allow you to adjust the URI path, query string, and HTTP headers of requests and responses at the edge.

There are several types of Transform Rules:

* [**Managed Transforms**](/rules/transform/managed-transforms/): Perform common adjustments to HTTP request and response headers with the click of a button.
* [**URL Rewrite Rules**](/rules/transform/url-rewrite/): Rewrite the URL path and query string of an HTTP request.
* [**HTTP Request Header Modification Rules**](/rules/transform/request-header-modification/): Set the value of an HTTP request header or remove a request header.
* [**HTTP Response Header Modification Rules**](/rules/transform/response-header-modification/): Set the value of an HTTP response header or remove a response header.

To configure Transform Rules in the dashboard, use the **Transform Rules** tab in Rules.

***

## Transform Rules evaluation

Managed Transforms run before other types of Transform Rules that modify HTTP headers:
* Managed Transforms that adjust HTTP request headers run before HTTP Request Header Modification Rules.
* Managed Transforms that adjust HTTP response headers run before HTTP Response Header Modification Rules.

Transform Rules run in order. Rules that appear later in the list of Transform Rules can overwrite changes done by previous rules. You can define the rule order in the dashboard or via API.

Request and response fields are immutable within each [phase](/ruleset-engine/about/phases/) while evaluating Transform Rules for a request/response. For more information, refer to [Rule evaluation and field values](/ruleset-engine/about/rules/#rule-evaluation-and-field-values).

## Availability

Cloudflare Transform Rules are available to all customers. Support for regular expressions depends on your Cloudflare plan.

This table outlines the Transform Rules features available with each customer plan:

{{<table-wrap>}}

Feature                                       | Free | Pro | Business | Enterprise
----------------------------------------------|------|-----|----------|-----------
Active Transform Rules                        | 10   | 25  | 50       | 100
Regular expression support                    | No   | No  | Yes      | Yes

{{</table-wrap>}}

A Cloudflare user must have the [Firewall role](https://support.cloudflare.com/hc/articles/205065067#12345682) or one of the Administrator roles to access Transform Rules.

***

## Get started

You can create different kinds of Transform Rules in the dashboard or via Cloudflare API. Refer to the following sections for detailed instructions:

* [Managed Transforms](/rules/transform/managed-transforms/)
* [URL Rewrite Rules](/rules/transform/url-rewrite/)
* [HTTP Request Header Modification Rules](/rules/transform/request-header-modification/)
* [HTTP Response Header Modification Rules](/rules/transform/response-header-modification/create-dashboard/)

Refer to [Rules language](/ruleset-engine/rules-language/) for more information on building expressions for Transform Rules.
