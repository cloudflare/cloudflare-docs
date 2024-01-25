---
pcx_content_type: overview
title: Overview
weight: 2
layout: overview
---

# Cloudflare DNS

{{<description>}}
Leverage Cloudflare’s global network to deliver excellent performance and reliability to your domain.
{{</description>}}

{{<plan type="all">}}

Cloudflare DNS is a fast, resilient and easy-to-manage authoritative DNS service. It delivers excellent performance and reliability to your domain while also protecting your business from [DDoS attacks](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) and [route leaks and hijacking](https://www.cloudflare.com/learning/security/glossary/bgp-hijacking/).

---

## Features

{{<feature header="DNSSEC" href="/dns/dnssec/">}}
DNS Security Extensions (DNSSEC) adds cryptographic signatures to your DNS records, preventing anyone else from redirecting traffic intended for your domain.

Cloudflare also supports [Multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/).
{{</feature>}}

{{<feature header="CNAME flattening" href="/dns/cname-flattening/">}}
CNAME flattening delivers better performance and allows you to add a CNAME record at your apex domain (`example.com`). Paid accounts can choose to flatten all CNAME records on their domain.
{{</feature>}}

<br />

Refer to [DNS features and availability](/dns/reference/all-features/) for a complete list of features and their availability according to different Cloudflare plans.

---
 
## Related products
 
{{<related header="Registrar" href="/registrar/" product="registrar">}}
Before you can start using Cloudflare DNS you must first have a domain. Buy and renew your domain at cost with Cloudflare Registrar.
{{</related>}}

{{<related header="DNS Resolver" href="/1.1.1.1/" product="1.1.1.1">}}
Cloudflare DNS focuses on businesses and their domain administration. If you are a consumer and want a more private way to browse the Internet, check out 1.1.1.1, Cloudflare's public DNS Resolver.
{{</related>}}
