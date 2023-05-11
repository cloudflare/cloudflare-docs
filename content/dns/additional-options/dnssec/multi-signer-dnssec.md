---
pcx_content_type: how-to
title: Multi-signer DNSSEC
weight: 4
---

# Multi-signer DNSSEC

Also known as multi-provider DNSSEC, multi-signer DNSSEC consists of two models that allow different authoritative DNS providers to serve the same zone and have DNSSEC enabled at the same time.

This means better compatibility with DNS features that require live-signing of DNS records (at query time), and also being able to transfer zones without having to disable DNSSEC at any moment.

## About

{{<Aside>}}
This is a simplified explanation to give you context and clarify what you will be setting up if you proceed with multi-signer DNSSEC. For technical details refer to [RFC 8901](https://datatracker.ietf.org/doc/html/rfc8901).
{{</Aside>}}

When you setup multi-signer DNSSEC, you adjust:

1. The Zone Signing Keys (ZSK) that your DNS providers have in their DNSKEY record sets.
2. Who is responsible for the Security Entry Point (SEP), Key Signing Keys (KSK) and Delegation Signer (DS) record.

### Model 1

### Model 2

## Set up multi-signer DNSSEC (API only)