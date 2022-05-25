---
pcx-content-type: concept
title: Dedicated DNS resolver IPs
weight: 2
---

# Dedicated DNS resolver IPs

When you create a location, Gateway assigns IPv4 and IPv6 addresses to that location. These are the IP addresses you send your DNS queries to for Gateway to resolve.

## IPv6 address

A unique, dedicated DNS resolver IPv6 address is provisioned for every location you create. This IPv6 address is how Gateway will identify which account and location to apply DNS filtering rules.

## IPv4 address

For queries over IPv4, the default DNS resolver IP addresses are anycast IP addresses, and they are shared across every Cloudflare Gateway account. The source IPv4 address the query came from is used to determine which account and location should apply DNS policies to the query.

Enterprise customers can request a dedicated IPv4 address to be provisioned for a location in lieu of the default anycast addresses. Like IPv6, queries forwarded to that address will be identified using the dedicated DNS resolver IPv4 address.

## Send queries to the dedicated IP

By default, all queries from a configured location will be sent to the location's assigned IP address and filtered by Gateway. You can configure Gateway to only filter queries originating from specific networks within a location:

1. [Create an IP list](/cloudflare-one/policies/filtering/lists/) with the IPv4 and/or IPv6 addresses that your organization will source queries from.
2. Add a [Source IP](/cloudflare-one/policies/filtering/dns-policies/#source-ip) condition to your DNS policies.

For example, if you want to block security threats and only allow queries from specific networks to a dedicated IPv4 or IPv6 address, you could create the following policy:

**Condition 1**:

| Selector            | Operator | Value                            |
| ------------------- | -------- | -------------------------------- |
| Security Categories | In       | Select all categories that apply |

**Condition 2**:

| Selector  | Operator | Value                                                           |
| --------- | -------- | --------------------------------------------------------------- |
| Source IP | In List  | The name of the IP list containing your organization's networks |

**Action**: Block

DNS queries made from IP addresses that are not in your IP list will not be filtered or populate your organization’s [Gateway activity logs](/cloudflare-one/analytics/logs/activity-log/).
