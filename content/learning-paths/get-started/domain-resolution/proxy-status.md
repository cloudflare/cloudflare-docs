---
title: Proxy status
pcx_content_type: overview
weight: 2
layout: learning-unit
---

The **Proxy status** of a DNS record affects how Cloudflare treats incoming traffic to that record. Cloudflare recommends enabling our proxy for all `A`, `AAAA`, and `CNAME` records.

![Proxy status affects how Cloudflare treats traffic intended for specific DNS records](/images/dns/proxy-status-screenshot.png)

---

## Proxied records

{{<render file="_mix-proxied-and-unproxied.md" productFolder="DNS">}}

{{<render file="_proxied-records-definition.md" productFolder="DNS">}}

## Limitations

{{<render file="_limitations.md" productFolder="DNS">}}
