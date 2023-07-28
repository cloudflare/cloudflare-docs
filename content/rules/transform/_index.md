---
pcx_content_type: concept
title: Transform Rules
weight: 3
layout: single
---

# Transform Rules

Transform Rules allow you to adjust the URI path, query string, and HTTP headers of requests and responses on the Cloudflare global network.

There are several types of Transform Rules:

* [**Rewrite URL rules**](/rules/transform/url-rewrite/): Rewrite the URL path and query string of an HTTP request.
* [**HTTP request header modification rules**](/rules/transform/request-header-modification/): Set the value of an HTTP request header or remove a request header.
* [**HTTP response header modification rules**](/rules/transform/response-header-modification/): Set the value of an HTTP response header or remove a response header.
* [**Managed Transforms**](/rules/transform/managed-transforms/): Perform common adjustments to HTTP request and response headers with the click of a button.

To configure Transform Rules in the dashboard, go to the **Transform Rules** page in Rules.

{{<render file="_rules-requirements.md" withParameters="Transform Rules require">}}

***

## Transform Rules evaluation

Managed Transforms run before other types of Transform Rules that modify HTTP headers:
* Managed Transforms that adjust HTTP request headers run before HTTP request header modification rules.
* Managed Transforms that adjust HTTP response headers run before HTTP response header modification rules.

Transform Rules run in order. Rules that appear later in the list of Transform Rules can overwrite changes done by previous rules. You can define the rule order in the dashboard or via API.

Request and response fields are immutable within each [phase](/ruleset-engine/about/phases/) while evaluating Transform Rules for a request/response. For more information, refer to [Rule evaluation and field values](/ruleset-engine/about/rules/#rule-evaluation-and-field-values).

## Availability

Cloudflare Transform Rules are available to all customers. Support for regular expressions depends on your Cloudflare plan.

This table outlines the Transform Rules features available with each customer plan:

{{<feature-table id="rules.transform_rules">}}

A Cloudflare user must have the [Firewall role](/fundamentals/account-and-billing/members/roles/) or one of the Administrator roles to access Transform Rules.

## Get started

You can create different kinds of Transform Rules in the dashboard or via Cloudflare API. Refer to the following sections for detailed instructions:

* [Rewrite URL rules](/rules/transform/url-rewrite/)
* [HTTP request header modification rules](/rules/transform/request-header-modification/)
* [HTTP response header modification rules](/rules/transform/response-header-modification/create-dashboard/)
* [Managed Transforms](/rules/transform/managed-transforms/)

Refer to [Rules language](/ruleset-engine/rules-language/) for more information on building expressions for Transform Rules.
