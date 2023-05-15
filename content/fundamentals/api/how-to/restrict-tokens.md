---
title: Restrict tokens
pcx_content_type: concept
weight: 13
---

# Restrict token use

API tokens can be restricted at runtime in two ways:

- [Client IP address range filtering](#client-ip-address-range-filtering)
- [Time To Live (TTL) constraints](#time-to-live-ttl-constraints)

## Client IP address range filtering

Client IP address restrictions control which IP addresses can make API requests with this token. By default, if no filtering is applied, all IP addresses can use the token. Once an `Is in` rule is applied, the token can only be used from the defined IP addresses. Define ranges with [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation). To allow an IP range with exceptions, define `Is not in` to exempt specific IPs or smaller ranges.

![IP Address filtering options](/images/fundamentals/api/ip-filter.png)

## Time to live (TTL) constraints

By default, tokens do not expire and are long lived. Defining a TTL sets when a token starts being valid and when a token is no longer valid. This is often referred to as `notBefore` and `notAfter`. Setting these timestamps limits the lifetime of the token to the defined period. Not setting the start date or `notBefore` means the token is active as soon as it is created. Not setting the end date or `notAfter` means the token does not expire.

{{<Aside type="note">}}

Dates selected are defined as 00:00 UTC of that day. For finer grained time selection, use the [API](/fundamentals/api/).

{{</Aside>}}

![Time to Live selection calendar](/images/fundamentals/api/ttl.png)