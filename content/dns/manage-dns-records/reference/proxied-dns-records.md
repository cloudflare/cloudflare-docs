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

{{<render file="_mix-proxied-and-unproxied.md" productFolder="DNS">}}

{{<render file="_proxied-records-definition.md" productFolder="DNS">}}

### Limitations

{{<render file="_limitations.md" productFolder="DNS">}}

---

## DNS-only records

When an `A`, `AAAA`, or `CNAME` record is **DNS-only** — also known as being gray-clouded — DNS queries for these will resolve to the record's normal IP address. 

{{<render file="_mix-proxied-and-unproxied.md" productFolder="DNS">}}

In addition to potentially exposing your origin IP addresses to bad actors and [DDoS attacks](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/), leaving your records as **DNS-only** means that Cloudflare cannot [optimize, cache, and protect](/fundamentals/concepts/how-cloudflare-works/) requests to your application or provide analytics on those requests.
