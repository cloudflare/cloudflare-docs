---
title: Overview
pcx_content_type: overview
weight: 1
layout: overview
meta:
  description: Cloudflare SSL/TLS offers free Universal SSL alongside advanced and enterprise features to meet your encryption and certificate management needs.
---

# Cloudflare SSL/TLS

{{<description>}}
Encrypt your web traffic to prevent data theft and other tampering.
{{</description>}}

{{<plan type = "all">}}

Through [Universal SSL](/ssl/edge-certificates/universal-ssl/), Cloudflare is the first Internet performance and security company to offer free SSL/TLS protection.
Cloudflare SSL/TLS also provides a number of other features to meet your encryption requirements and certificate management needs.

---

## Features

{{<feature header="Total TLS" href="/ssl/edge-certificates/additional-options/total-tls/">}}
Extending the protection offered by Universal SSL, Total TLS is an easy way to automatically issue certificates for all levels of subdomains that you have.
{{</feature>}}

{{<feature header="Delegated DCV" href="/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/">}}
Even if you use a different provider for authoritative DNS, you can delegate domain control validation (DCV) to Cloudflare, reducing the need of manual intervention.
{{</feature>}}

{{<feature header="Custom TLS settings" href="/ssl/edge-certificates/additional-options/minimum-tls/">}}
Cloudflare also allows you to specify the minimum TLS version that visitors must use to connect to your website or application, and restrict cipher suites according to your security requirements.
{{</feature>}}

<br />

Refer to [features and availability](/ssl/reference/all-features/) for a complete list of SSL/TLS features and their availability according to different Cloudflare plans.

---

## Related products

{{<related header="Cloudflare DNS" href="/dns/" product="dns">}}
When you use Cloudflare DNS, all DNS queries for your domain are answered by Cloudflare’s global anycast network. This network delivers performance and global availability.
{{</related>}}

{{<related header="Cloudflare for SaaS" href="/cloudflare-for-platforms/cloudflare-for-saas/" product="cloudflare-for-platforms">}}
Cloudflare for SaaS allows you to extend the security and performance benefits of Cloudflare’s network to your customers via their own custom or vanity domains.
{{</related>}}