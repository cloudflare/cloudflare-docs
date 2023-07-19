---
title: Overview
pcx_content_type: overview
type: overview
weight: 1
layout: list
meta:
  title: Cloudflare API Shield
---

# Cloudflare API Shield

Cloudflare offers a range of products to help identify and address API vulnerabilities.

{{<render file="_non-contract-enablement.md" productFolder="fundamentals" >}}

## Why care about API security?

APIs have become the [backbone of popular web services](https://blog.postman.com/intro-to-apis-history-of-apis/), helping the Internet become more accessible and useful.

As APIs have become more prevalent, however, so have their problems:

*   Many companies have [thousands of APIs](/api-shield/security/api-discovery/), including ones they do not even know about.
*   To support a large base of users, many APIs are protected by a negative security model that makes them vulnerable to credential-stuffing attacks and automated scanning tools.
*   With so many endpoints and users, it’s difficult to recognize brute-force attacks against [specific endpoints](/api-shield/security/volumetric-abuse-detection/).
*   Sophisticated attacks are even harder to recognize, often because even development teams are unaware of common and uncommon [usage patterns](/api-shield/security/sequence-analytics/).

## Features

Cloudflare offers the following features to help secure your APIs: 

- [Security](/api-shield/security/)
- [Management, Monitoring, and more](/api-shield/api-gateway/)

## Availability

Cloudflare API Security products are available to Enterprise customers only, though anyone can set up [Mutual TLS](/api-shield/security/mtls/) with a Cloudflare-managed certificate authority.

## Related products

{{<related header="DDoS Protection" href="/ddos-protection/" product="ddos-protection">}}
Cloudflare DDoS protection secures websites, applications, and entire networks while ensuring the performance of legitimate traffic is not compromised.
{{</related>}}
