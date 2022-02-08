---
title: Overview
order: 0
pcx-content-type: overview
type: overview
---

# Cloudflare API Shield

Cloudflare offers a range of products to help identify and address API vulnerabilities.

## Why care about API security?

APIs have become the [backbone of popular web services](https://blog.postman.com/intro-to-apis-history-of-apis/), helping the Internet become more accessible and useful.

As APIs have become more prevalent, however, so have their problems:
- Many companies have [thousands of APIs](products/api-discovery), including ones they do not even know about.
- To support a large base of users, many APIs are protected by a negative security model that makes them vulnerable to credential-stuffing attacks and automated scanning tools.
- With so many endpoints and users, it’s difficult to recognize brute-force attacks against [specific endpoints](products/volumetric-abuse-detection).
- Sophisticated attacks are even harder to recognize, often because even development teams are unaware of common and uncommon [usage patterns](products/sequential-abuse-detection).

## Features

Cloudflare offers the following features to help learn about and secure your APIs:
<DirectoryListing path="/products"/>

For additional details, see our [blog post](https://blog.cloudflare.com/api-abuse-detection/).

## Availability
Cloudflare API Security products are available to Enterprise customers only, though anyone can set up [Mutual TLS](/products/mtls) with a Cloudflare-managed certificate authority.

Additionally, API Discovery, Volumetric Abuse Detection, and Sequential Abuse Detection are currently enabled by request. If you are interested in using these products, contact your account team.
