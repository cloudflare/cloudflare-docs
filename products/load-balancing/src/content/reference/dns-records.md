---
title: DNS records
order:
pcx-content-type: reference
---

# DNS records for load balancing

When you [create a load balancer](/how-to/create-load-balancer), we automatically create an LB DNS record for the specified **Hostname**. This functionality allows you to use a hostname with or without an existing DNS record (A, AAAA, CNAME).

## Priority order

For hostnames with existing A, AAAA, or CNAME records, the LB record takes precedence when it is more or equally specific:

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

<Aside type="note">

This behavior only applies to A, AAAA, or CNAME records. An LB record does not take precedence over other types of DNS records (MX, TXT, etc.).

</Aside>

## Disabling a load balancer

When you disable a load balancer, requests to a specific hostname depend on your existing DNS records:

- If you have existing DNS records, these records will be served.
- If there are no existing records, requests to the hostname will fail.

In both cases, disabling your load balancer prevents traffic from going to any associated origin or fallback pools.

## SSL/TLS coverage

Due to internal limitations, Cloudflare [Universal SSL certificates](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl) do not cover load balancing hostnames by default. This behavior will be corrected in the future.

As a current workaround for a domain or first-level subdomain (`lb.example.com`), create a [proxied CNAME/A/AAAA record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records) for that hostname. 

To get coverage for any deeper subdomain (`lb.dev.example.com`), purchase an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager).