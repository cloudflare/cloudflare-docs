---
pcx_content_type: how-to
title: Connect your domain
weight: 3
meta:
    title: Connect your domain
---

# Connect your domain

This guide will walk you through how to connect your domain to Cloudflare using Cloudflare as an Authoritative DNS provider.

## Get started

To get started with Cloudflare as a [reverse proxy](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/), you must first create an account and connect your domain by mapping [DNS](https://www.cloudflare.com/learning/dns/what-is-dns/) records to Cloudflare. For a domain purchased through [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/), we take care of the connection process on your behalf.

{{<Aside type="note">}}
Your domain is always in your control - completing these steps does not mean that you are relinquishing ownership. After connecting your domain, you may [transfer registration](/registrar/get-started/transfer-domain-to-cloudflare/) to be managed at Cloudflare, but you will still remain the owner.
{{</Aside>}}

After creating your account, select add a site and follow the [step-by-step instructions](/fundamentals/setup/account-setup/add-site/) to configure your [DNS records](/dns/manage-dns-records/), which informs Cloudflare where to forward requests.

## Configuring your domain

When you connect your domain to Cloudflare, it is assigned a set of default configurations for our [application services](/products/?product-group=Application+performance%2CApplication+security), based on your domain [plan](https://www.cloudflare.com/plans/). These services determine how Cloudflare treats traffic for your domain.

Your configuration only affects live traffic when the domain status is active and your traffic is proxied. 

Some services, such as [WAF](/waf/), can be set at the account level, to affect all or multiple domains under your account. Account-level configurations are processed before domain-level services.

Use the Cloudflare dashboard or API to modify, test, or [version](/version-management/) your configuration.

## How Cloudflare handles DNS queries

In the full setup, when you connect your domain to Cloudflare, we become your authoritative DNS provider. 

This means that when Cloudflare receives a DNS query for your domain, our response is determined by the values in your DNS table, including the record’s proxy eligibility and proxy status. Your table of DNS records is managed via the Cloudflare dashboard or API.

In addition, if an eligible record is proxied, Cloudflare will respond with an anycast IP address instead of the value defined in your DNS table. This approach ensures that the incoming request is routed to Cloudflare's network. 

In contrast, when a DNS record is “DNS only,” meaning the proxy is off, Cloudflare responds with the value listed in your DNS table, which could be the origin server’s actual IP address, or a CNAME 

## Proxy eligibility 

Proxy eligibility is based on whether the record serves HTTP or HTTPS traffic. By default, `A`, `AAAA`, and `CNAME` DNS records that serve HTTP/S traffic are proxied.

To proxy HTTP/S traffic on non-standard ports or to proxy a TCP- or UDP-based application, use [Cloudflare Spectrum](/spectrum/). 

The following types of DNS records may be in your DNS configuration, but are cannot be proxied:

- `CAA`
- `DKIM`
- `DMARC`
- `DS`, `DNSKEY`
- `MX`
- `NS`
- `PTR`
- `SOA`
- `SPF`
- `SRV`
- `SVCB`, `HTTPS`
- `TXT`

## Proxying traffic

In addition to responding to DNS queries, as described above, Cloudflare also responds to other protocols, such as HTTP. Cloudflare is both a DNS server and a [reverse proxy](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/) that sits between two distinct networks. This hybrid design is how Cloudflare can respond to both DNS queries and HTTP/S traffic depending on the [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/) of the hostname. 

Using the screenshot below as an example, the first network would be a request from your home network to `blog.example.com`, which routes to Cloudflare because `example.com`’s nameservers point to Cloudflare. The second network would be Cloudflare to your origin server at 192.0.2.1.

In the dashboard, find the proxy statuses on the DNS records page under your domain.

| Type | Name | Content | Proxy status | TTL | Actions |
| :---: |  :---: |  :---: |  :---: |  :---: |  ---: |
| `A` | `blog` | `192.0.2.1` | `Proxy enabled` | `Auto` | `Edit` | 
| `A` | `shop` | `192.0.2.2` | `DNS only` | `Auto` | `Edit` | 

In the screenshot above, there are two subdomain records, one with the proxy enabled, `blog`, and one without, `shop`.

When the browser initiates a request to `blog.example.com`, a DNS resolver will convert the hostname into an IP address. Since the records proxy function is enabled, Cloudflare will return an anycast IP address. 

Then, the browser initiates an HTTP/S request to Cloudflare. When Cloudflare receives this request, it’s processed according to the account’s and domain’s configuration, and then forwards it to the configured origin server, which is 192.0.2.1.

## Activating your domain

Your domain will be pending until you update the nameservers at your domain registrar with the Cloudflare nameservers assigned to you. This step is essential to redirect your traffic through Cloudflare, and also to verify that you own the domain.

Registrars take up to 24 hours to process nameserver changes (quicker in most cases). You will receive an email when your domain is active on Cloudflare.

{{<Aside>}}
Note: The activation process involves different steps if you are using a [secondary DNS](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) or [partial (CNAME) setup](/dns/zone-setups/partial-setup/).
{{</Aside>}}

While your domain is pending, your HTTP/S traffic is not proxied yet, but Cloudflare will respond to DNS queries on your assigned nameservers.

## Avoiding downtime

It is essential that you make sure Cloudflare has all of your DNS records before activating your domain. In addition, you may need to:
Turn off DNSSEC…
Allow Cloudflare IPs…
SSL
What to do next
SSL
By default, Cloudflare issues — and renews — free, unshared, publicly trusted SSL certificates to all domains when they are activated. You have several options to customize SSL/TLS.
Caching
Learn about Cloudflare cache and understand default cache behavior.
Security
Follow our learning path to protect your website or application against malicious traffic and bad actors.
Speed
Follow our learning path to optimize site speed and improve performance.

Build with Workers & Pages
Follow our learning path to build or enhance your application with Workers & Pages.

## Related resources

DNS setup types
