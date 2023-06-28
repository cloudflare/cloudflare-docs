---
title: Rule examples
pcx_content_type: configuration
weight: 20
meta:
  title: Rate limiting rule examples
---

# Rate limiting rule examples

The examples below include sample rate limiting rule configurations.

## Example 1

The following rule performs rate limiting on incoming requests from the US addressed at the login page, except for one allowed IP address.

{{<example>}}

Expression:<br />
`(http.request.uri.path eq "/login" and ip.geoip.country eq "US" and ip.src ne 192.0.0.1)`

Rule characteristics:

- _Data center ID_ (included by default when creating the rule in the dashboard)
- _IP Address_

{{</example>}}

## Example 2

The following rule performs rate limiting on incoming requests with a given base URI path, incrementing on the IP address and the provided API key.

{{<example>}}

Expression:<br />
`(http.request.uri.path contains "/product" and http.request.method eq "POST")`

Rule characteristics:

- _Data center ID_ (included by default when creating the rule in the dashboard)
- _IP Address_
- _HTTP Header_ > `x-api-key`

{{</example>}}

## Example 3

The following rule performs rate limiting on requests targeting multiple URI paths in two hosts, excluding known bots. The request rate is based on IP address and `User-Agent` values.

{{<example>}}

Expression:<br />
`(http.request.uri.path eq "/store" or http.request.uri.path eq "/prices") and (http.host eq "mystore1.com" or http.host eq "mystore2.com") and not cf.client.bot`

Rule characteristics:

- _Data center ID_ (included by default when creating the rule in the dashboard)
- _IP Address_
- _HTTP Header_ > `user-agent`

{{</example>}}
