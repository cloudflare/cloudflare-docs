---
pcx_content_type: concept
title: How Cloudflare works
weight: 2
---

# How Cloudflare works

The [Cloudflare global network](https://www.cloudflare.com/network/) can improve the security, performance, reliability, and privacy of anything connected to the Internet, such as your website, SaaS application, or corporate network.

## Application Services

To optimize your website or web application, Cloudflare acts as a [DNS provider](https://www.cloudflare.com/learning/dns/what-is-dns/) for your domain, and a [reverse proxy](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/) for your web traffic. 

### How Cloudflare works as a DNS provider

We support a few different [setups](/dns/zone-setups/) for using Cloudflare as a DNS provider. A [full DNS setup](/dns/zone-setups/full-setup/) is the most common, where Cloudflare becomes the primary authoritative DNS provider for your domain, after you [connect your domain to Cloudflare](/fundamentals/setup/manage-domains/connect-your-domain/). This means we respond to DNS queries for your domain, and you [manage its DNS records](/dns/manage-dns-records/how-to/create-dns-records/) via the Cloudflare dashboard or API.

When Cloudflare receives a DNS query for your domain, our response is determined by the configuration [set in your DNS table](/dns/manage-dns-records/how-to/create-dns-records/), including the value of the record, the record's [proxy eligibility](/dns/manage-dns-records/reference/proxied-dns-records/#proxy-eligibility), and it's [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/). 

If the [domain's status](/dns/zone-setups/reference/domain-status/) is active and the queried DNS record is set to `proxied`, then Cloudflare responds with an [anycast IP address](/fundamentals/concepts/cloudflare-ip-addresses/), **instead of** the value defined in your DNS table. This effectively re-routes the `HTTP/S` requests to the Cloudflare network, instead of directly reaching the targeted the [origin server](https://www.cloudflare.com/learning/cdn/glossary/origin-server/).

In contrast, if the queried DNS record is set to `DNS only`, meaning the proxy is off, then Cloudflare responds with the value defined in your DNS table (i.e., an IP address or CNAME record). This means `HTTP/S` requests route directly to the origin server and are not processed or protected by Cloudflare.

### How Cloudflare works as a reverse proxy

All DNS records in your DNS table have a [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/), indicating whether or not `HTTP/S` traffic for that record will route through Cloudflare on its way between the client and the origin server. If the [domain's status](/dns/zone-setups/reference/domain-status/) is active, all `HTTP/S` requests for [proxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/#proxied-records) route through Cloudflare.

As these requests pass through our network, they are processed according to your [configuration](/fundamentals/setup/manage-domains/connect-your-domain/#domain-configurations). Subsequently, legitimate requests are forwarded to the origin server. 

Refer to our [Load Balancing reference architecture](/reference-architecture/architectures/load-balancing/) to learn more about advanced ways to forward traffic to your origins, as well as our [CDN reference architecture](/reference-architecture/architectures/cdn/) to learn more about how Cloudflare processes and optimizes your web traffic.

{{<Aside>}}
Proxying is on by default for records that serve HTTP/S traffic (`A`, `AAAA`, and `CNAME` records). To proxy `HTTP/S` traffic on [non-standard ports](/fundamentals/reference/network-ports/) or to proxy a `TCP-` or `UDP-` based application, use [Cloudflare Spectrum](/spectrum/).
{{</Aside>}}

In the Cloudflare dashboard, find out which DNS records are proxied by selecting your domain and navigating to the **DNS records** tab.

#### Example DNS table 

| Type | Name | Content | Proxy status | TTL | Actions |
| :---: |  :---: |  :---: |  :---: |  :---: |  ---: |
| `A` | `blog` | `192.0.2.1` | `Proxied` | `Auto` | `Edit` | 
| `A` | `shop` | `192.0.2.2` | `DNS only` | `Auto` | `Edit` | 

In the example DNS table above, there are two DNS records, one with the proxy on, `blog`, and one with the proxy off, `shop`, (i.e. `DNS only`).

#### Proxied DNS record example

When the browser initiates a `HTTP/S` request to `blog.example.com`, a DNS resolver will convert the hostname into an IP address. Since this domain is using Cloudflare as its Authoritative DNS provider, the DNS query will be routed to Cloudflare and because the proxy is on, Cloudflare will answer with an anycast IP address. Subsequently, the browser initiates a `HTTP/S` request back to Cloudflare. When Cloudflare receives this request, it performs a lookup to find the matching domain and account configuration and processes the request accordingly. Cloudflare forwards it to the configured origin server, which is `192.0.2.1`.

#### DNS only record example

When the browser initiates a `HTTP/S` request to `shop.example.com`, a DNS resolver will convert the hostname into an IP address. Since this domain is using Cloudflare as its Authoritative DNS provider, the DNS query will be routed to Cloudflare but since the proxy is off (i.e., `DNS only`), Cloudflare will answer with `192.0.2.2`. Finally, the browser initiates a `HTTP/S` request to the server hosted at `192.0.2.2`.
