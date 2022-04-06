---
pcx-content-type: concept
title: Proxy status
weight: 0
---

# Proxy status

When you _proxy_ an **A**, **AAAA**, or **CNAME** DNS record for your application (also known as _orange-clouding_), DNS queries for these records will resolve to Cloudflare Anycast IPs instead of their original DNS target.

This means that all requests intended for proxied hostnames will go to Cloudflare first and then be forwarded to your origin server. This behavior allows Cloudflare to [optimize, cache, and protect](/fundamentals/get-started/how-cloudflare-works/) all requests for your application.

{{<Aside type="note">}}

Because requests to proxied hostnames go through Cloudflare before reaching your origin server, these requests will appear to be coming from Cloudflare's IP addresses. You may need to adjust your server configuration to [allow Cloudflare IPs](https://support.cloudflare.com/hc/articles/201897700).

{{</Aside>}}

## When to proxy your DNS records

In most cases, you should proxy your **A**, **AAAA**, and **CNAME** records. These are the only records that can be proxied.

Beyond the [performance and caching benefits](/fundamentals/get-started/how-cloudflare-works/), proxying your records hides your origin server's IP address and protects your application from [DDoS attacks](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/).

### Limitations

#### Pending domains

When your [domain status](/dns/zone-setups/reference/domain-status/) is **Pending Nameserver Update**, that domain's DNS records cannot yet be proxied.

This means that pending domains cannot take advantage of Cloudflare caching and other settings — even if the proxy status is enabled for their DNS records — and any requests to your DNS records will return your origin server's IP address and not Cloudflare IP addresses.

#### Windows authentication

Because Microsoft Integrated Windows Authentication, NTLM, and Kerberos violate HTTP/1.1 specifications, they are not compatible with proxied DNS records.

To solve this issue, we recommend using [Cloudflare Zero Trust](/cloudflare-one/).

## When to use unproxied records

In some circumstances, you should not proxy your DNS records.

### A, AAAA, and CNAME records

If you need to connect to your origin using a non-HTTP protocol (SSH, FTP, SMTP) or the traffic targets an [unsupported port](/fundamentals/get-started/network-ports/) at the origin, either leave your records unproxied (DNS-only) or use [Cloudflare Spectrum](/spectrum/).

{{<Aside type="note">}}

If you encounter a **CNAME** record that you cannot proxy — usually associated with another CDN provider — a proxied version of that record will cause connectivity errors. Cloudflare is purposely preventing that record from being proxied to protect you from a misconfiguration.

{{</Aside>}}

### Other record types

Because Cloudflare only supports proxied **A**, **AAAA**, and **CNAME** records, you do not have the option to proxy other record types.
