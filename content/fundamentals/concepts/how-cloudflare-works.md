---
pcx_content_type: concept
title: How Cloudflare works
weight: 2
---

# How Cloudflare works

Cloudflare is a large network of servers that can improve the security, performance, and reliability of anything connected to the Internet, such as your website, SaaS applications or your corporate network.

## Application Services

To optimize your website or web application, Cloudflare acts as a DNS provider for your domain, and a [reverse proxy](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/) for your web traffic. We support both [full DNS](/dns/zone-setups/full-setup/) and [partial DNS](/dns/zone-setups/partial-setup/) setup. 

### How Cloudflare works as a DNS provider

In a full DNS setup, when you [connect a domain](/fundamentals/setup/manage-domains/connect-your-domain/) to Cloudflare, we become the authoritative DNS provider for that domain. When Cloudflare receives a DNS query for your domain, our response is determined by the configuration [set in your DNS table](/dns/manage-dns-records/how-to/create-dns-records/), including the value of the record, the record's [proxy eligibility](/dns/manage-dns-records/reference/proxied-dns-records/#proxy-eligibility), and it's [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/). 

If the [domain's status](/dns/zone-setups/reference/domain-status/) is active and a DNS record is proxied, Cloudflare responds with an [anycast IP address](/fundamentals/concepts/cloudflare-ip-addresses/), **not** the value defined in your DNS table. This approach informs the requesting entity that the request should route to Cloudflare's network, instead of directly to the origin server. In contrast, when a DNS record is set to `DNS only`, meaning the proxy is off, Cloudflare responds with the value defined in your DNS table (i.e., an IP address or CNAME record). This means `HTTP/S` requests route directly to the origin server and are not processed or protected by Cloudflare.

### How Cloudflare works as a reverse proxy

All requests to and from your origin will flow through Cloudflare and — as these requests pass through our network — we can apply various rules and optimizations to improve security, performance, and reliability. 

In the Cloudflare dashboard, you can the proxy status of your records, within each of your domains, on the DNS records page.

{{<Aside>}}

To proxy `HTTP/S` traffic on [non-standard ports](/fundamentals/reference/network-ports/) or to proxy a `TCP-` or `UDP-` based application, use [Cloudflare Spectrum](/spectrum/).

{{</Aside>}}

| Type | Name | Content | Proxy status | TTL | Actions |
| :---: |  :---: |  :---: |  :---: |  :---: |  ---: |
| `A` | `blog` | `192.0.2.1` | `Proxy on` | `Auto` | `Edit` | 
| `A` | `shop` | `192.0.2.2` | `DNS only` | `Auto` | `Edit` | 

In the table above, there are two DNS records, one with the proxy on, `blog`, and one with the proxy off, `shop`, (i.e. DNS only).

#### Proxy enabled example

When the browser initiates a `HTTP/S` request to `blog.example.com`, a DNS resolver will convert the hostname into an IP address. Since this domain is using Cloudflare as its Authoritative DNS provider, the DNS query will be routed to Cloudflare and because the proxy is on, Cloudflare will answer with an anycast IP address. Subsequently, the browser initiates a `HTTP/S` request back to Cloudflare. When Cloudflare receives this request, it performs a lookup to find the matching domain and account configuration and processes the request according to them. Cloudflare forwards it to the configured origin server, which is `192.0.2.1`.

#### DNS-only example

When the browser initiates a `HTTP/S` request to `shop.example.com`, a DNS resolver will convert the hostname into an IP address. Since this domain is using Cloudflare as its Authoritative DNS provider, the DNS query will be routed to Cloudflare and because the proxy is off (i.e. `DNS only`), Cloudflare will answer with `192.0.2.2`. Finally, the browser initiates a `HTTP/S` request to the server hosted at `192.0.2.2`.
