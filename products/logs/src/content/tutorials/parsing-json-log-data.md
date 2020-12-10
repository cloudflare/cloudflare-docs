---
title: Parse Cloudflare Logs JSON data
order: 85
---

# Parse Cloudflare Logs JSON data

## Overview

After downloading your Cloudflare Logs data, you can use different tools to parse and analyze your logs.

In this tutorial, you will learn how to parse your JSON log data using *jq*.  To get started with *jq*, visit the [*jq* official site](https://stedolan.github.io/jq/).

<Aside type="note" header="Note">

*jq* is a powerful command line for parsing JSON data and performing certain types of analysis. To perform more detailed analysis, consider a full-fledged data analysis system, such as *Kibana*.
</Aside>

## Aggregating fields

To aggregate a field appearing in the log, such as by IP address, URI, or referrer, you can use several *jq* commands. This is useful to identify any patterns in traffic; for example, to identify your most popular pages or to block an attack.

The three examples below match on a field name and provides a count of each field instance, sorted in ascending order by count.

```bash
$ jq -r .ClientRequestURI logs.json | sort -n | uniq -c | sort -n | tail
2 /nginx-logo.png
2 /poweredby.png
2 /testagain
3 /favicon.ico
3 /testing
3 /testing123
6 /test
7 /testing1234
10 /cdn-cgi/nexp/dok3v=1613a3a185/cloudflare/rocket.js
54 /
```

```bash
$ jq -r .ClientRequestUserAgent logs.json | sort -n | uniq -c | sort -n | tail
1 python-requests/2.9.1
2 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17
4 Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36
5 curl/7.47.2-DEV
36 Mozilla/5.0 (X11; Linux x86_64; rv:44.0) Gecko/20100101 Firefox/44.0
51 curl/7.46.0-DEV
```

```bash
$ jq -r .ClientRequestReferer logs.json | sort -n | uniq -c | sort -n | tail
2 http://example.com/testagain
3 http://example.com/testing
5 http://example.com/
5 http://example.com/testing123
7 http://example.com/testing1234
77 null
```

## Filtering fields

Another common use case involves filtering data for a specific field value and then aggregating after that. This helps answer questions like *Which URLs saw the most 502 errors?*. For example:

```bash
$ jq 'select(.OriginResponseStatus == 502) | .ClientRequestURI' logs.json | sort -n | uniq -c | sort -n | tail
1 "/favicon.ico"
1 "/testing"
3 "/testing123"
6 "/test"
6 "/testing1234"
18 "/"
```

To see the top IP addresses blocked by the Cloudflare WAF:

```bash
$ jq -r 'select(.WAFAction == "drop") | .ClientIP' logs.json | sort -n | uniq -c | sort -n
1 127.0.0.1
```

## Understanding pathing

The three pathing fields stored in Cloudflare Logs are:

* *EdgePathingSrc* (pathing source)
* *EdgePathingOp* (pathing operation)
* *EdgePathingStatus* (pathing status)

***EdgePathingSrc*** refers to the system that last handled the request before an error occurred or the request was passed to the cache server. Typically, this will be the macro/reputation list. Possible pathing sources include:

* *err*
* *sslv* (SSL verification checker)
* *bic* (browser integrity check)
* *hot* (hotlink protection)
* *macro* (the reputation list)
* *skip* (Always Online or CDNJS resources)
* *user* (user firewall rule)

For example:

```bash
$ jq -r .EdgePathingSrc logs.json | sort -n | uniq -c | sort -n | tail
1 err
5 user
93 macro
```

***EdgePathingOp*** indicates how the request was handled. *wl* is a request that passed all checks and went to your origin server. Other possible values are:

* *errHost* (host header mismatch, DNS errors, etc.)
* *ban* (blocked by IP address, range, etc.)
* *tempOk* (challenge successfully completed)
* *chl* (challenge issued)

For example:

```bash
$ jq -r .EdgePathingOp logs.json | sort -n | uniq -c | sort -n | tail
1 chl
1 errHost
97 wl
```

***EdgePathingStatus*** is the value *EdgePathingSrc* returns. With a pathing source of *macro*, *user*, or *err*, the pathing status indicates the list where the IP address was found. *nr* is the most common value and it means that the request was not flagged by a security check. Some values indicate the class of user; for example, *se* means search engine. Others indicate whether the visitor saw an error or a captcha, such as, *captchaNew* or *jschlOK*.

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

<TableWrap>

| Pathing | Label |
|---|---|
| bic.ban.unknown | Bad browser |
| hot.ban.unknown | Blocked hotlink |
| hot.ban.ip | |
| macro.ban.ip | Bad IP |
| user.ban.ctry | Country block |
| user.ban.ip | IP block (user) |
| user.ban.ipr16 | IP range block (/16) |
| user.ban.ipr24 | IP range block (/24) |
| macro.chl.captchaErr | Captcha Error |
| macro.chl.captchaFail | Human Challenged |
| macro.chl.captchaNew | New CAPTCHA (CF) |
| macro.chl.jschlFail | Browser Challenged |
| macro.chl.jschlNew | Challenged threat |
| macro.chl.jschlErr | Bot request |
| user.chl.captchaNew | New CAPTCHA (user) |

</TableWrap>

## Understanding response fields

The response status appears in three places in a request:

* *edgeResponse*
* *cacheResponse*
* *originResponse*

In your logs, the edge is what first accepts a visitor's request. The cache then accepts the request and either forwards it to your origin or responds from the cache. It's possible to have a request that has only an *edgeResponse* or a request that has an *edgeResponse* and a  *cacheResponse*, but no *originResponse*.

This is how you can see where a request terminates. Requests with only an *edgeResponse* likely hit a security check or processing error. Requests with an *edgeResponse* and a *cacheResponse* either were served from the cache or saw an error contacting your origin server. Requests that have an *originResponse* went all the way to your origin server and errors seen would have been served directly from there.

For example, the following query shows the status code and pathing information for all requests that terminated at the Cloudflare edge:

```bash
$ jq -r 'select(.OriginResponseStatus == null) | select(.CacheResponseStatus == null) |"\(.EdgeResponseStatus) / \(.EdgePathingSrc) / \(.EdgePathingStatus) / \(.EdgePathingOp)"' logs.json | sort -n | uniq -c | sort -n
1 403 / macro / captchaNew / chl
1 403 / macro / nr / wl
1 409 / err / dnsErr / errHost
```

## Showing cached requests

To see your cache ratios, try the following query:

```bash
$ jq -r '.CacheCacheStatus' logs.json | sort -n | uniq -c | sort -n
3 hit
3 null
3 stale
4 expired
6 miss
81 unknown
```

## Showing TLS versions

To see what TLS versions your visitors are using &mdash; for example, to decide if you can disable TLS versions that are older than 1.2 &mdash; use the following query:

```bash
$ jq -r '.ClientSSLProtocol' logs.json | sort -n | uniq -c | sort -n
42 none
58 TLSv1.2
```