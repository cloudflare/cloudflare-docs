---
title: DNS records
order:
pcx-content-type: reference
---

# DNS records for load balancing

When you [create a load balancer](/create-load-balancer-ui), we automatically create an LB DNS record for the specified **Hostname**. This functionality allows you to use a hostname with or without an existing DNS record (A, AAAA, CNAME).

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

## Universal SSL

### Proxied domains

If you [changed your nameservers](https://support.cloudflare.com/hc/articles/205195708) to point to Cloudflare, you get an SSL certificate by default. Cloudflare has already issued an [SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl) covering your root domain and up to one level of subdomain (`subdomain.example.com`).

### Non-proxied domains

If your domain is using a [CNAME setup](https://support.cloudflare.com/hc/articles/360020348832) where traffic is not proxied through Cloudflare, you need to take additional actions to get an SSL certificate.

To get an SSL certificate, [create a proxied DNS record](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl#non-authoritative-partial-domains) for the hostname associated with the load balancer. You may also want to add [Domain Control Validation (DCV)](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/changing-dcv-method) records to prevent any downtime.