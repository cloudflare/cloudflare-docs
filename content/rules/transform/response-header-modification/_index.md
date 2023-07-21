---
title: Modify response header
pcx_content_type: concept
weight: 3
layout: single
meta:
  title: HTTP response header modification rules
---

# HTTP response header modification rules

You can manipulate the headers included in the HTTP response through HTTP response header modification rules. Through these rules you can:

* Set the value of an HTTP response header to a literal string value, overwriting its previous value or adding a new header to the response if it does not exist.
* Set the value of an HTTP response header according to an expression, overwriting its previous value or adding a new header to the response if it does not exist.
* Add a new HTTP response header with a literal string value without removing any existing headers with the same name.
* Remove an HTTP header from the response.

You can create an HTTP response header modification rule [in the dashboard](/rules/transform/response-header-modification/create-dashboard/) or [via API](/rules/transform/response-header-modification/create-api/).

To modify HTTP headers in the **request**, refer to [HTTP request header modification rules](/rules/transform/request-header-modification/).

## Important remarks

* The response header values are calculated using the field values from the corresponding HTTP request. For example, the value of `ip.src.country` will be the country of the website visitor, not the origin where the response was sent from.

* You cannot modify or remove HTTP response headers whose name starts with `cf-` or `x-cf-`.

* You cannot modify the value of certain headers such as `server`, `eh-cache-tag`, or `eh-cdn-cache-control`.

* Currently you cannot reference [IP Lists](/fundamentals/global-configurations/lists/ip-lists/) in expressions of HTTP response header modification rules.

* The HTTP response header removal operation will remove all response headers with the provided name.

* If you change the value of an existing HTTP response header using an expression that evaluates to an empty string (`""`) or an undefined value, the HTTP response header is **removed**.

* Currently, there is a limited number of HTTP response headers that you cannot change. Cloudflare may remove restrictions for some of these HTTP response headers when presented with valid use cases. [Create a post in the community](https://community.cloudflare.com) for consideration.

* Any response header modifications will also apply to Cloudflare error pages and [custom error pages](https://support.cloudflare.com/hc/articles/200172706).