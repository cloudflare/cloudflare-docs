---
title: DNS records
pcx_content_type: reference
weight: 0
meta:
  title: DNS records for load balancing
---

# DNS records for load balancing

When you [create a load balancer](/load-balancing/how-to/create-load-balancer/), Cloudflare automatically creates an LB DNS record for the specified **Hostname**. This functionality allows you to use a hostname with or without an existing DNS record.

## Supported records

For customers on non-Enterprise plans, Cloudflare supports load balancing for `A`, `AAAA`, and `CNAME` records.

For customers on Enterprise plans, Cloudflare supports load balancing for `A`, `AAAA`, `CNAME`, **MX**, and **SRV** records.

## Priority order

For hostnames with existing DNS records, the LB record takes precedence when it is more or equally specific:

- **Scenario 1**:

  - **A, AAAA, or CNAME**: `x.example.com`
  - **LB record**: `x.example.com`
  - **Outcome**: LB record takes precedence because it is as specific as the DNS record.

- **Scenario 2**:

  - **A, AAAA, or CNAME**: `y.example.com`
  - **LB record**: `*.example.com` (wildcard record)
  - **Outcome**: DNS record takes precedence because it is more specific.

- **Scenario 3**:

  - **A, AAAA, or CNAME**: `*.example.com`
  - **LB record**: `*.example.com`
  - **Outcome**: LB record takes precedence because it is as specific as the DNS record.

{{<Aside type="note">}}

This behavior only applies to [supported records](#supported-records) (determined by your plan type).

{{</Aside>}}

## Disabling a load balancer

When you disable a load balancer, requests to a specific hostname depend on your existing DNS records:

- If you have existing DNS records, these records will be served.
- If there are no existing records, requests to the hostname will fail.

In both cases, disabling your load balancer prevents traffic from going to any associated origin or fallback pools.

If you already have an existing `A`, `AAAA`, or `CNAME` record, be aware that the change may take some time to propagate due to [Time to Live (TTL)](/dns/manage-dns-records/reference/ttl/) and any record changes is affected, as your local DNS cache may take longer to update.



## SSL/TLS coverage

Due to internal limitations, Cloudflare [Universal SSL certificates](/ssl/edge-certificates/universal-ssl/) do not cover load balancing hostnames by default. This behavior will be corrected in the future.

As a current workaround for a domain or first-level subdomain (`lb.example.com`), create a [proxied `CNAME`/`A`/`AAAA` record](/dns/manage-dns-records/how-to/create-dns-records/) for that hostname.

For example, if your load balancer hostname was `lb.example.com`, you could create the following record solely for the purpose of SSL/TLS coverage.

| Type |  Name | IPv4 address | Proxy status |
| ---- | ----- | ------------ | ------------ |
| A    | `lb` | `192.0.2.1`  | Proxied      |

Based on the [priority order](#priority-order), it would not receive any traffic because it is as equally specific as the LB hostname.

To get coverage for any deeper subdomain (`lb.dev.example.com`), purchase an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/).
