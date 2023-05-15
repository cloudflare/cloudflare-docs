---
pcx_content_type: concept
title: Multi-signer DNSSEC
weight: 4
---

# Multi-signer DNSSEC

Also known as multi-provider DNSSEC, multi-signer DNSSEC consists of two models that allow different authoritative DNS providers to serve the same zone and have DNSSEC enabled at the same time.

This means better compatibility with DNS features that require live-signing of DNS records (at query time), and also being able to transfer zones without having to disable DNSSEC at any moment.

Cloudflare allows you to [set up multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/setup//) using either one of the models.

## Other resources

* [About multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/about/) 