---
title: Add a site
pcx_content_type: overview
weight: 3
layout: learning-unit
---

In clientless ZTWA deployments, users connect to internal applications via public hostnames. You will need to own a domain, add it to Cloudflare, and configure Cloudflare as the [authoritative DNS provider](#update-your-nameservers) for that domain. Enterprise customers who cannot change their authoritative DNS provider have the option to configure a [partial (`CNAME`) setup](/dns/zone-setups/partial-setup/).

## Add site to Cloudflare

{{<render file="_add-site.md" productFolder="fundamentals">}}

## Update your nameservers

{{<render file="_update-nameservers.md" productFolder="fundamentals" >}}

