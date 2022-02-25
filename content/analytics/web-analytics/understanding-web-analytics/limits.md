---
pcx-content-type: reference
title: Limits
weight: 11
---

# Limits

Cloudflare limits the number of sites for which you can track web analytics as well as the number of rules allowed for each plan type. Refer to the following tables for more information.

## Site Limits

Cloudflare limits the number of sites for which you can track web analytics. Limits depend on whether a site uses Cloudflare's proxy.

{{<table-wrap>}}

| Site type                                      | Limit              |
| ---------------------------------------------- | ------------------ |
| Not proxied through Cloudflare                 | 10                 |
| Proxied through Cloudflare                     | No limit           |

{{</table-wrap>}}

## Rules Limits

Cloudflare limits the number of Web Analytics rules you can have by plan type. For plans with a limit of zero, Web Analytics injects the JS snippet on all subdomains.

Rules are only available for sites proxied through Cloudflare.

{{<table-wrap>}}

| Plan type      | Rules limit  |
| -------------- | ------------ |
| Free           | 0            |
| Pro            | 5            |
| Business       | 20           |
| Enterprise     | 100          |

{{</table-wrap>}}
