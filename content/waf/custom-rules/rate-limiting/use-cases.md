---
title: Common use cases
pcx-content-type: configuration
weight: 20
meta:
  title: Common rate limiting use cases
---

# Common rate limiting use cases

{{<Aside type="warning">}}

This feature is only available for selected customers on an Enterprise plan.

{{</Aside>}}

The examples below include sample Rate Limiting rule configurations that address common rate limiting use cases.

## Example 1

The following rule performs rate limiting on incoming requests from the US addressed at the login page, except for one allowed IP address.

{{<example>}}

Expression:<br />
`(http.request.uri.path eq "/login" and ip.geoip.country eq "US" and ip.src ne 192.0.0.1)`

Rule characteristics:

*   *Data center ID* (included by default when creating the rule in the dashboard)
*   *IP Address*

{{</example>}}

## Example 2

The following rule performs rate limiting on incoming requests with a given base URI path, incrementing on the IP address and the provided API key.

{{<example>}}

Expression:<br />
`(http.request.uri.path contains "/product*" and http.request.method eq "POST")`

Rule characteristics:

*   *Data center ID* (included by default when creating the rule in the dashboard)
*   *IP Address*
*   *HTTP Header* > `x-api-key`

{{</example>}}

## Example 3

The following rule performs rate limiting on requests targeting multiple URI paths in two hosts, excluding known bots. The request rate is based on IP address and `User-Agent` values.

{{<example>}}

Expression:<br />
`(http.request.uri.path eq "/store" or http.request.uri.path eq "/prices") and (http.host eq "mystore1.com" or http.host eq "mystore2.com") and not cf.client.bot`

Rule characteristics:

*   *Data center ID* (included by default when creating the rule in the dashboard)
*   *IP Address*
*   *HTTP Header* > `user-agent`

{{</example>}}
