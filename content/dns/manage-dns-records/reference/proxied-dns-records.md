---
pcx_content_type: concept
title: Proxy status
weight: 1
---

# Proxy status

The **Proxy status** of a DNS record affects how Cloudflare treats incoming traffic to that record. Cloudflare recommends enabling our proxy for all `A`, `AAAA`, and `CNAME` records.

![Proxy status affects how Cloudflare treats traffic intended for specific DNS records](/images/dns/proxy-status-screenshot.png)

---

## Proxied records

{{<render file="_proxied-records-definition.md">}}

{{<render file="_mix-proxied-and-unproxied.md">}}

Because requests to proxied hostnames go through Cloudflare before reaching your origin server, all requests will appear to be coming from Cloudflare's IP addresses (and could potentially be blocked or rate limited). If you use proxied records, you may need to adjust your server configuration to [allow Cloudflare IPs](/fundamentals/get-started/setup/allow-cloudflare-ip-addresses/).

### Limitations

#### Record types

By default, Cloudflare only supports proxied `A`, `AAAA`, and `CNAME` records. You cannot proxy other record types.

If you encounter a `CNAME` record that you cannot proxy — usually associated with another CDN provider — a proxied version of that record will cause connectivity errors. Cloudflare is purposely preventing that record from being proxied to protect you from a misconfiguration.

#### Ports and protocols

By default, Cloudflare only proxies HTTP and HTTPS traffic.

If you need to connect to your origin using a non-HTTP protocol (SSH, FTP, SMTP) or the traffic targets an [unsupported port](/fundamentals/get-started/reference/network-ports/) at the origin, either leave your records [unproxied (DNS-only)](#dns-only-records) or use [Cloudflare Spectrum](/spectrum/).

#### Pending domains

{{<render file="_onboard-warning.md">}}
<br/>

This means that DNS records - even those set to [proxy traffic through Cloudflare](#proxied-records) -- will be [DNS-only](#dns-only-records) until your zone has been activated and any requests to your DNS records will return your origin server's IP address.

If this warning is still present after 24 hours, refer to our [troubleshooting guide](/dns/zone-setups/troubleshooting/nameservers/).

For enhanced security, we recommend rolling your origin IP addresses at your hosting provider after your zone has been activated. This action prevents your origin IPs from being leaked during onboarding.

#### Windows authentication

Because Microsoft Integrated Windows Authentication, NTLM, and Kerberos violate HTTP/1.1 specifications, they are not compatible with proxied DNS records.

---

## DNS-only records

When an `A`, `AAAA`, or `CNAME` record is **DNS-only** — also known as being gray-clouded — DNS queries for these will resolve to the record's normal IP address. 

{{<render file="_mix-proxied-and-unproxied.md">}}

In addition to potentially exposing your origin IP addresses to bad actors and [DDoS attacks](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/), leaving your records as **DNS-only** means that Cloudflare cannot [optimize, cache, and protect](/fundamentals/get-started/concepts/how-cloudflare-works/) requests to your application.
