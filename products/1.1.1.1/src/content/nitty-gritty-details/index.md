---
order: 8
---

# The nitty gritty

## ANY

Cloudflare [stopped supporting the ANY query](https://blog.cloudflare.com/deprecating-dns-any-meta-query-type/) in 2015 as ANY queries are more often used to perpetuate large volumetric attacks against the DNS system than valid use. 1.1.1.1 returns NOTIMPL when asked for qtype==ANY.

## DNSSEC

1.1.1.1 is a DNSSEC validating resolver. 1.1.1.1 sends the DO (DNSSEC Ok) bit on every query to convey to the authoritative server that it wishes to receive signed answers if available. 1.1.1.1 supports [all signature algorithms](https://www.iana.org/assignments/dns-sec-alg-numbers/dns-sec-alg-numbers.xhtml) including the newer DS-13, DS-14, and DNS-15.

## EDNS client subnet

1.1.1.1 is a privacy centric resolver so it does not send any client IP information and does not send the EDNS Client Subnet Header to authoritative servers.

## IPv6

It’s not 1995.

1.1.1.1 has full IPv6 support.

## Purge cache

1.1.1.1's Purge Cache tool allows you to refresh 1.1.1.1's DNS cache for domain names. To refresh the cache for a domain name, visit the [Purge Cache page](https://1.1.1.1/purge-cache/).

## Query name minimization

Cloudflare minimizes privacy leakage by only sending minimal query name to authoritative DNS servers. For example, if a client is looking for foo.bar.example.com, the only part of the query 1.1.1.1 discloses to .com is that we want to know who’s responsible for example.com and the zone internals stay hidden.

## Root hints

For decreased latency, reduced privacy leakage of queries and lower load on the DNS system, 1.1.1.1 upstreams to [locally hosted root zone files](https://blog.cloudflare.com/f-root/).

## Whitelisting 1.1.1.1

Authoritative DNS providers may want to whitelist IP's 1.1.1.1 uses to query upstream DNS providers. The comprehensive list of IP's to whitelist is available at [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/).
