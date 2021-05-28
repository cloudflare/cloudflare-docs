---
order: 85
pcx-content-type: interim
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