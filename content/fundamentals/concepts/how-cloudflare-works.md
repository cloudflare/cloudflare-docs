---
pcx_content_type: concept
title: How Cloudflare works
weight: 2
---

# How Cloudflare works

{{<render file="_how-cloudflare-works.md" productFolder="fundamentals">}}

## Application Services

### How Cloudflare handles DNS queries

In a [full setup](/dns/zone-setups/full-setup/), when you connect your domain to Cloudflare, we become your authoritative DNS provider. When Cloudflare receives a DNS query for your domain, our response is determined by the configuration set in your DNS table, including the value of the record, the record's proxy eligibility and it's proxy status. 

Most importantly, if a records proxy is enabled, Cloudflare will respond with an [anycast IP address](/fundamentals/concepts/cloudflare-ip-addresses/), **not** the value defined in your DNS table. This approach informs the end device that the request should route to Cloudflare's network. In contrast, when a DNS record is 'DNS only', meaning the proxy is off, Cloudflare responds with the value defined in your DNS table, which is the DNS record's actual content, (i.e., an IP address or CNAME record.)

### Proxying traffic

Cloudflare is both an authoritative DNS server and a [reverse proxy](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/) that sits between two distinct networks and depending the proxy status, Cloudflare will respond to the DNS query with different values. This hybrid design is how Cloudflare can respond to both DNS queries and `HTTP/S` traffic depending on the [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/) of the hostname. 

You can find the proxy status of your records on the DNS records page under your domain.

{{<Aside>}}
To proxy `HTTP/S` traffic on non-standard ports or to proxy a `TCP-` or `UDP-` based application, use [Cloudflare Spectrum](/spectrum/). 
{{</Aside>}}

| Type | Name | Content | Proxy status | TTL | Actions |
| :---: |  :---: |  :---: |  :---: |  :---: |  ---: |
| `A` | `blog` | `192.0.2.1` | `Proxy enabled` | `Auto` | `Edit` | 
| `A` | `shop` | `192.0.2.2` | `DNS only` | `Auto` | `Edit` | 

In the table above, there are two subdomain records, one with the proxy enabled, `blog`, and one without, `shop`.

### Proxy eligibility 

Proxy eligibility is based on whether the record serves `HTTP` or `HTTPS` traffic. By default, `A`, `AAAA`, and `CNAME` DNS records that serve `HTTP/S` traffic can be proxied.

The following types of DNS records may be in your DNS configuration, but cannot be proxied:

- `CAA`
- `DKIM`
- `DMARC`
- `DNSKEY`
- `DS`
- `HTTPS`
- `MX`
- `NS`
- `PTR`
- `SOA`
- `SPF`
- `SRV`
- `SVCB`
- `TXT`

#### Proxy enabled example

When the browser initiates a `HTTP/S` request to `blog.example.com`, a DNS resolver will convert the hostname into an IP address. Since the records proxy function is enabled, Cloudflare will return an anycast IP address. Then, the browser initiates a `HTTP/S` request to Cloudflare. When Cloudflare receives this request, it performs a lookup to find the matching domain and account configuration and processes the request according to them. Cloudflare forwards it to the configured origin server, which is `192.0.2.1`.

#### DNS-only example

When the browser initiates a `HTTP/S` request to `shop.example.com`, a DNS resolver will convert the hostname into an IP address. Since the record's proxy status is `DNS only`, Cloudflare will simply return `192.0.2.2`. Then the browser initiates a `HTTP/S` request to the server hosted at `192.0.2.2`.
