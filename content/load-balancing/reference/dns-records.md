---
title: DNS records
pcx-content-type: reference
weight: 0
meta:
  title: DNS records for load balancing
---

# DNS records for load balancing

When you [create a load balancer](/load-balancing/how-to/create-load-balancer/), Cloudflare automatically creates an LB DNS record for the specified **Hostname**. This functionality allows you to use a hostname with or without an existing DNS record.

## Supported records

For customers on non-Enterprise plans, Cloudflare supports load balancing for `A`, `AAAA`, and `CNAME` records.

For customers on Enterprise plans, Cloudflare supports load balancing for `A`, `AAAA`, `CNAME`, **MX**, **SRV**, and **TXT** records.

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
