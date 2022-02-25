---
pcx-content-type: reference
title: Pathing status
weight: 123
---

# Pathing status

## Understanding pathing

Cloudflare issues the following **Edge Pathing Statuses**:

*   **EdgePathingSrc** (pathing source): The stage that made the routing decision.
*   **EdgePathingOp** (pathing operation): The specific action or operation taken.
*   **EdgePathingStatus** (pathing status): Additional information complementing the **EdgePathingOp**.

### EdgePathingSrc

**EdgePathingSrc** refers to the system that last handled the request before an error occurred or the request was passed to the cache server. Typically, this will be the macro/reputation list. Possible pathing sources include:

*   `err`
*   `sslv` (SSL verification checker)
*   `bic` (browser integrity check)
*   `hot` (hotlink protection)
*   `macro` (the reputation list)
*   `skip` (Always Online or CDNJS resources)
*   `user` (user firewall rule)

For example:

```bash
$ jq -r .EdgePathingSrc logs.json | sort -n | uniq -c | sort -n | tail
1 err
5 user
93 macro
```

### EdgePathingOp

**EdgePathingOp** indicates how the request was handled. `wl` is a request that passed all checks and went to your origin server. Other possible values are:

*   `errHost` (host header mismatch, DNS errors, etc.)
*   `ban` (blocked by IP address, range, etc.)
*   `tempOk` (challenge successfully completed)
*   `chl` (challenge issued)

For example:

```bash
$ jq -r .EdgePathingOp logs.json | sort -n | uniq -c | sort -n | tail
1 chl
1 errHost
97 wl
```

### EdgePathingStatus

**EdgePathingStatus** is the value **EdgePathingSrc** returns. With a pathing source of `macro`, `user`, or `err`, the pathing status indicates the list where the IP address was found. `nr` is the most common value and it means that the request was not flagged by a security check. Some values indicate the class of user; for example, `se` means search engine. Others indicate whether the visitor saw an error or a captcha, such as, `captchaNew` or `jschlOK`.

For example:

```bash
$ jq -r .EdgePathingStatus logs.json | sort -n | uniq -c | sort -n | tail
1 captchaNew
1 dnsErr
5 ip
92 nr
```

## How does pathing map to Threat Analytics?

Certain combinations of pathing have been labeled in the Cloudflare **Threat Analytics** feature (in the **Analytics** app in the Cloudflare dashboard). The mapping is as follows:

{{<table-wrap>}}

| Pathing | Label |
|---|---|
| `bic.ban.unknown` | Bad browser |
| `hot.ban.unknown` | Blocked hotlink |
| `hot.ban.ip` | |
| `macro.ban.ip` | Bad IP |
| `user.ban.ctry` | Country block |
| `user.ban.ip` | IP block (user) |
| `user.ban.ipr16` | IP range block (/16) |
| `user.ban.ipr24` | IP range block (/24) |
| `macro.chl.captchaErr` | Captcha Error |
| `macro.chl.captchaFail` | Human Challenged |
| `macro.chl.captchaNew` | New CAPTCHA (CF) |
| `macro.chl.jschlFail` | Browser Challenged |
| `macro.chl.jschlNew` | Challenged threat |
| `macro.chl.jschlErr` | Bot request |
| `user.chl.captchaNew` | New CAPTCHA (user) |

{{</table-wrap>}}

## Understanding response fields

The response status appears in three places in a request:

*   **edgeResponse**
*   **cacheResponse**
*   **originResponse**

In your logs, the edge is what first accepts a visitor's request. The cache then accepts the request and either forwards it to your origin or responds from the cache. It is possible to have a request that has only an **edgeResponse** or a request that has an **edgeResponse** and a  **cacheResponse**, but no **originResponse**.

This is how you can see where a request terminates. Requests with only an **edgeResponse** likely hit a security check or processing error. Requests with an **edgeResponse** and a **cacheResponse** either were served from the cache or saw an error contacting your origin server. Requests that have an **originResponse** went all the way to your origin server and errors seen would have been served directly from there.

For example, the following query shows the status code and pathing information for all requests that terminated at the Cloudflare edge:

```bash
$ jq -r 'select(.OriginResponseStatus == null) | select(.CacheResponseStatus == null) |"\(.EdgeResponseStatus) / \(.EdgePathingSrc) / \(.EdgePathingStatus) / \(.EdgePathingOp)"' logs.json | sort -n | uniq -c | sort -n
1 403 / macro / captchaNew / chl
1 403 / macro / nr / wl
1 409 / err / dnsErr / errHost
```

The information stored is broken down based on the following categories:

## Errors

These occur for requests that did not pass any of the validation performed by the Cloudflare network. Example cases include:

*   Whenever Cloudflare is unable to look up a domain or zone.
*   An attempt to improperly use the IP for an origin server.
*   Domain ownership is unclear (for example, the domain is not in Cloudflare).

{{<table-wrap>}}

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| `cyclic` | Cloudflare loop. | `err_host` | | `403` |
| `dns_err` | Unable to resolve. | `err_host` | | `409` |
| `reserved_ip` | DNS points to local or disallowed IP. | `err_host` | | `403` |
| `reserved_ip6` | DNS points to local or disallowed IPv6 address. | `err_host` | | `403` |
| `bad_host` | Bad or no Host header. | `err_host` | | `403` |
| `no_existing_host` | Ownership lookup failed: host possibly not on Cloudflare. | `err_host` | | `409` |

{{</table-wrap>}}

## User-based actions

These occur for actions triggered from users based on the configuration for a specific IP (or IP range).

{{<table-wrap>}}

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| `Asnum`<br/> `ip`<br/> `ipr24`<br/> `ipr16`<br/> `ip6`<br/> `ip6r64`<br/> `ip6r48`<br/> `ip6r32`<br/> `ctry`<br/> | The request was blocked. | `ban` | `user` | `403` |
| `Asnum`<br/> `ip`<br/> `ipr24`<br/> `ipr16`<br/> `ip6`<br/> `ip6r64`<br/> `ip6r48`<br/> `ip6r32`<br/> `ctr`<br/> | <ul><li>The request was allowed.</li><li>WAF will not execute.</li></ul> | `wl` | `user` | |

{{</table-wrap>}}

To understand the behavior of challenge pages, refer to [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Firewall Rules

The Cloudflare **Firewall Rules** app triggers actions based on matching customer-defined rules.

{{<table-wrap>}}

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| `filter_based_firewall` | The request was blocked. | `ban` | | |
| `filter_based_firewall` | The request was allowed. | `wl` | | |

{{</table-wrap>}}

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Zone Lockdown

**Zone Lockdown** blocks visitors to particular URIs where the visitor's IP is not allowlisted.

{{<table-wrap>}}

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| `zl` | Lock down applied. | `ban` | `user` | |

{{</table-wrap>}}

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Firewall User-Agent Block

Challenge (Captcha or JavaScript) or block visitors who use a browser for which the User-Agent name matches a specific string.

{{<table-wrap>}}

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| `ua` | Blocked User-Agent. | `ban` | `user` | |

{{</table-wrap>}}

To understand the behavior of challenge pages, refer to [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Browser Integrity Check

Assert whether the source of the request is illegitimate or the request itself is malicious.

{{<table-wrap>}}

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| <span style="font-weight: 400;">empty</span> | Blocked request. | `ban` | `bic` | |

{{</table-wrap>}}

To understand the behavior of challenge pages, refer to [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Hot Linking

Prevent hot linking from other sites.

{{<table-wrap>}}

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| <span style="font-weight: 400;">empty</span> | Blocked request. | `ban` | `hot` | |

{{</table-wrap>}}

To understand the behavior of challenge pages, see [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## L7-to-L7 DDoS mitigation

Drop DDoS attacks through L7 mitigation.

{{<table-wrap>}}

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| <span style="font-weight: 400;">`l7ddos`</span> | Blocked request. | `ban` | `protect` | |

{{</table-wrap>}}

To understand the behavior of challenge pages, refer to [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## IP Reputation (MACRO)

The macro stage is comprised of many different paths. They are categorized by the reputation of the visitor IP.

{{<table-wrap>}}

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| `nr` | There is no reputation data for the IP and no action is being taken (if IUAM is on, a JS challenge is served). | `wl` | `macro` | |
| `wl` | IP is explicitly allowlisted. | `wl` | `macro` | |
| `scan` | IP is explicitly allowlisted and categorized as a security scanner. | `wl` | `macro` | |
| `mon` | IP is explicitly allowlisted and categorized as a Monitoring Service. | `wl` | `macro` | |
| `bak` | IP is explicitly allowlisted and categorized as a Backup Service. | `wl` | `macro` | |
| `mob` | IP is explicitly allowlisted and categorized as Mobile Proxy Service. | `wl` | `macro` | |
| `se` | IP is explicitly allowlisted as it belongs to a search engine crawler and no action is taken. | `wl` | `macro` | |
| `grey` | IP is greylisted (suspected to be bad) but the request was either for a favicon or security is turned off and as such, it is allowlisted. | `wl` | `macro` | |
| `bad_ok` | The reputation score of the IP is bad (or is a TOR IP) but the request was either for a favicon or security is turned off and as such, it is allowlisted. Alternatively, the threat score of the IP is in the accepted security level. | `wl` | `macro` | |
| `unknown` | The `pathing_status` is unknown and the request is being processed as normal. | `wl` | `macro` | |

{{</table-wrap>}}

All other paths in the MACRO stage issue a challenge. Possible scenarios include:

*   A clean IP (acceptable threat level) with IUAM on will trigger the JS challenge.
*   A greylisted IP triggers the JS challenge (Managed Challenge if IUAM is on).
*   An IP with a bad reputation (also TOR) with a threat level above the accepted threshold triggers a Managed Challenge (JS challenge if IUAM is on).

## Rate Limiting

{{<table-wrap>}}

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| `rate_limit` | Dropped request. | `ban` | `user` | |
| `rate_limit` | IP is explicitly allowlisted. | `simulate` | `user` | |

{{</table-wrap>}}

To understand the behavior of challenge pages, refer to [JavaScript and Captcha Challenge](#javascript-and-captcha-challenge).

## Special cases

{{<table-wrap>}}

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| `ao_crawl` | AO (Always Online) crawler request. | `wl` | `skip` | |
| `cdnjs` | Request to a cdnjs resource. | `wl` | `skip` | |
| | Certain challenge forced by Cloudflare's special headers- | | `forced` | |

{{</table-wrap>}}

## JavaScript and Captcha Challenge

{{<table-wrap>}}

| EdgePathingStatus | Description | EdgePathingOp | EdgePathingSrc | Status Code |
|---|---|---|---|---|
| <ul><li>`captchaNew`</li><li>`jschlNew`</li></ul> | A Captcha/JavaScript challenge was presented. | `chl` | | <ul><li>`403`</li><li>`503`</li></ul> |
| <ul><li>`captchaOk`</li><li>`jschlOk`</li></ul> | A Captcha/JavaScript challenge would have been presented but a clearance cookie was present. | `temp_ok` | | <ul><li>As per request.</li></ul> |
| <ul><li>`captchaSucc`</li><li>`jschlSucc`</li></ul> | A Captcha challenge was solved correctly and a clearance cookie will be issued. | `temp_ok` | `macro` | <ul><li>`302` (Redirect to original URL.)</li></ul> |
| <ul><li>`captchaFail`</li><li>`jschlFail`</li></ul> | A failed attempt at solving the Captcha challenge, no clearance cookie will be issued. | <p>`chl`</p> | `macro` | <ul><li>`302` (Redirect to original URL.)</li></ul> |
| <ul><li>`captchaErr`</li><li>`jschlErr`</li></ul> | A failed attempt at solving the Captcha challenge, no clearance cookie will be issued. Not enough data was provided to solve the challenge. The difference to the previous case is that not all input was provided which is needed to verify the solution. | <p>`chl`</p> | `macro` | <ul><li>`302` (Redirect to original URL.)</li></ul> |
| <ul><li>`tokRedempSucc`</li></ul> | A blinded-token redemption was successful. | <p>`chl`</p> | | <ul><li>As per request.</li></ul> |
| <ul><li>`tokRedempFail`</li></ul> | A blinded-token redemption failed. | `chl` | | <ul><li>As per request.</li></ul> |

{{</table-wrap>}}
