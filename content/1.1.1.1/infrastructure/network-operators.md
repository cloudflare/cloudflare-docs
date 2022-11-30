---
pcx_content_type: reference
title: Network operators
---

# Network operators

Network operators, including Internet Service Providers (ISPs), device manufacturers, public WiFi networks, municipal broadband providers, and security scanning services can use [1.1.1.1](/1.1.1.1/setup/) and [1.1.1.1 for Families](/1.1.1.1/setup/#1111-for-families) in place of operating their own recursive DNS infrastructure.

Using 1.1.1.1 can improve performance for end-users due to Cloudflare's extensive [global network](https://www.cloudflare.com/network/), as well as provide higher overall cache hit rates due to our regional caches.

The 1.1.1.1 resolver was designed with a privacy-first approach. Refer to our [data and privacy policies](/1.1.1.1/privacy/public-dns-resolver/) for what is logged and retained by 1.1.1.1.

## Configuring 1.1.1.1

There are multiple ways to use 1.1.1.1 as an operator:

* Including a [DNS over HTTPS](/1.1.1.1/encryption/dns-over-https/) or [DNS over TLS](/1.1.1.1/encryption/dns-over-tls/) proxy on end-user routers or devices (best for privacy).
* Pushing 1.1.1.1 to devices via DHCP/PPP within an operator network (recommended; most practical).
* Having a DNS proxy on a edge router make requests to 1.1.1.1 on behalf of all connected devices.

Where possible, we recommend using encrypted transports (DNS over HTTPS or TLS) for queries, as this provides the highest degree of privacy for users over last-mile networks.

## Available Endpoints

{{<Aside type="note">}}

[Cloudflare Zero Trust](https://www.cloudflare.com/products/zero-trust/) supports customizable [DNS policies](/cloudflare-one/policies/filtering/dns-policies/), analytics, additional built-in filtering categories, and custom rate limiting capabilities.

If you require additional controls over our public 1.1.1.1 resolver, [contact us](https://www.cloudflare.com/products/zero-trust/).

{{</Aside>}}

The publicly available endpoints for 1.1.1.1 are detailed in the following table:

{{<table-wrap style="font-size: 85%">}}

Resolver | IPv4 address | IPv6 <br /> address | DNS over <br /> HTTPS endpoint | DNS over <br /> TLS endpoint
--- | --- | --- | --- | ---
1.1.1.1 <br />(unfiltered) | `1.1.1.1` <br /> `1.0.0.1` | `2606:4700:4700::1111` <br /> `2606:4700:4700::1001` | `https://cloudflare-dns.com/dns-query` | `cloudflare-dns.com`
Families <br />(Malware) | `1.1.1.2` <br /> `1.0.0.2` | `2606:4700:4700::1112` <br /> `2606:4700:4700::1002` | `https://security.cloudflare-dns.com/dns-query` | `security.cloudflare-dns.com`
Families <br />(Adult Content + Malware) | `1.1.1.3` <br /> `1.0.0.3` | `2606:4700:4700::1113` <br /> `2606:4700:4700::1003` | `https://family.cloudflare-dns.com/dns-query` | `family.cloudflare-dns.com`

{{</table-wrap>}}

You may wish to provide end users with options to change from the default 1.1.1.1 resolver to one of the [1.1.1.1 for Families](/1.1.1.1/setup/#1111-for-families) endpoints.

## Rate Limiting

Operators using 1.1.1.1 for typical Internet-facing applications and/or users should not encounter any rate limiting for their users. In some rare cases, security scanning use-cases or proxied traffic may be rate limited to protect our infrastructure as well as upstream DNS infrastructure from potential abuse.

Best practices include:

* Avoiding tunneling or proxying all queries from a single IP address at high rates. Distributing queries across multiple public IPs will improve this without impacting cache hit rates (caches are regional).
* A high rate of "uncacheable" responses (such as `SERVFAIL`) against the same domain may be rate limited to protect upstream, authoritative nameservers. Many authoritative nameservers enforce their own rate limits, and we strive to avoid overloading third party infrastructure where possible.

If you are a network operator and still have outstanding questions, contact `resolver@cloudflare.com` with your use case and we will be happy to discuss further.