---
order: 43
pcx-content-type: reference
---

# Limits

Cloudflare limits the number of sites for which you can track web analytics as well as the number of rules allowed for each plan type. Refer to the following tables for more information.

## Site Limits

Cloudflare limits the number of sites for which you can track web analytics. Limits depend on whether a domain uses Cloudflare's proxy.  

<TableWrap>

| Domain type                                    | Site limit (soft)  | Site limit (hard) |
| ---------------------------------------------- | ------------------ | ----------------- |
| Not proxied through Cloudflare                 | 10                 | 1000              |
| Proxied through Cloudflare                     | No limit           | No limi           |

</TableWrap>

## Rules Limits

Cloudflare limits the number of Web Analytics rules you can have by plan type. For plans with a limit of zero, Web Analytics injects the JS snippet on all subdomains.

Rules are only available for domains proxied through Cloudflare.

<TableWrap>

| Plan type      | Rules limit  |
| -------------- | ------------ |
| Free           | 0            |
| Pro            | 5            |
| Business       | 20           |
| Enterprise     | 100          |

</TableWrap>