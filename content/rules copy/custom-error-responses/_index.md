---
pcx_content_type: concept
title: Custom error responses
weight: 12
layout: single
meta:
  title: Custom error responses (beta)
---

{{<beta>}} Custom error responses {{</beta>}}

Custom error responses, powered by the [Ruleset Engine](/ruleset-engine/), allow you to define custom responses for errors returned by an origin server or by a Cloudflare product (including Workers). Custom error responses will apply to responses whose HTTP status code is greater than or equal to 400 that match the expression of the custom error response rule.

To configure a custom error response, create a custom error response rule at the zone level. Custom error response rules will override [Custom Pages](https://support.cloudflare.com/hc/articles/200172706) at the zone or account level.

{{<Aside type="note" header="Notes about the beta">}}

During the beta, you can define custom error responses using inline templates and specify the response's content type and HTTP status code.

Additionally, at this stage you can only create custom error response rules [using the API](/rules/custom-error-responses/create-api/).

{{</Aside>}}

## How it works

When a custom error response is triggered, Cloudflare will replace the body and (optionally) the HTTP status code of the response sent to the visitor. Cloudflare will keep any existing HTTP response headers except for `Content-Type` and `Content-Length`.

Additionally, you can configure [HTTP response header modification rules](/rules/transform/response-header-modification/) for error responses to add, change, or remove HTTP headers from the error response.

## Availability

Custom error responses are available in beta to all paid plans. The exact features depend on your Cloudflare plan:

{{<table-wrap>}}
|                                       | Free | Pro | Business | Enterprise |
|---------------------------------------|:----:|:---:|:--------:|:----------:|
| Custom error responses                |  No  | Yes |   Yes    |    Yes     |
| Number of custom error response rules |  —   |  5  |    20    |     50     |
{{</table-wrap>}}
