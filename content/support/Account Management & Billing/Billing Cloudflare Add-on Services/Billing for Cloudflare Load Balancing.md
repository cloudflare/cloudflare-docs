---
source: https://support.cloudflare.com/hc/en-us/articles/115005254367-Billing-for-Cloudflare-Load-Balancing
title: Billing for Cloudflare Load Balancing
---

# Billing for Cloudflare Load Balancing

## Overview

**Cloudflare Load Balancing** provides DNS-based load balancing and active health checks against origin web servers and pools. When enabled, Cloudflare Load Balancing is billed at the account level. In addition to the monthly subscription, we will count the number of DNS requests ("queries") for each configured Load Balancer, per month.

The first 500,000 queries, shared across all Load Balancers in your account, are free: additional usage beyond this is charged at 50 cents per 500,000 queries, rounded up to the next 500k queries.

For example:

-   81,451 DNS queries = subscription + $0 in usage.
-   511,881 DNS queries = subscription + $0.50 in usage
-   2,994,155 DNS queries = subscription + $2.50 in usage

Note that the first 500,000 queries are based on all active Load Balancers in your account, not per site (domain), as Load Balancers can be shared across sites by configuring a CNAME record.

___

You can configure Load Balancing to fit your specific requirements based on the number of origins, health check frequency, the number of regions checked from, and geo-routing.

The $5 subscription allows you to configure 2 origins per Cloudflare account, 5 origins per pool, 60-second health checks, and checks from one (1) region: ideal for straightforward load balancing or failover. Different pools containing the same origin IP address count as distinct origins for an account.

For larger configurations, contact [our sales team](https://www.cloudflare.com/lp/dashboard-ss-load-balancing/).

___

## Load Balancing billable usage

Usage is counted as authoritative [DNS queries](https://en.wikipedia.org/wiki/Domain_Name_System) against Cloudflare's nameservers for each of the Load Balanced hostnames you have configured.

You can reduce the number of authoritative DNS queries by configuring your Load Balancer as "proxied" (orange cloud) for your HTTP(S) services, which will set the external DNS TTL to 5 minutes, maintain failover performance equivalent with very short DNS TTLs. [Read more about the benefits of proxied (orange cloud) vs. unproxied (grey cloud).](https://support.cloudflare.com/hc/en-us/articles/115005138088-Load-Balancing-TTLs-and-Orange-vs-Grey-Cloud)

### Billing for Enterprise customers

Enterprise customers are billed based on discussions with the Cloudflare Enterprise Sales team. Enterprise customers also have access to additional features, including:

-   Running health checks from [every Cloudflare datacenter](https://www.cloudflare.com/network/) (for increased failover granularity)
-   Per-data center steering (override the origins a specific location should use, and in which order)
-   Five-second health check intervals
-   Support for more than 20 origin servers
-   Cloudflare Enterprise Support (including 24x7 email, phone, and a named Solutions Engineer)
