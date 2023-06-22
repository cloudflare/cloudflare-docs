---
pcx_content_type: concept
title: DNSSEC options
layout: single
meta:
    title: DNSSEC for Secondary DNS
---

# DNSSEC for incoming zone transfers

[DNS Security Extensions (DNSSEC)](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) increase security by adding cryptographic signatures to DNS records. When you use multiple providers and Cloudflare is secondary, you have a few options to also enable DNSSEC for records served by Cloudflare.

- **[Multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/setup/)**: Both Cloudflare and your primary DNS provider know the signing keys of the other provider and perform their own online signing in accordance with [RFC 8901](https://www.rfc-editor.org/rfc/rfc8901.html).
- **[Hidden primary](#enable-dnssec-for-your-hidden-primary-setup)**: Since Cloudflare secondary nameservers are the only nameservers authoritatively responding to DNS queries, Cloudflare can sign records on the fly.
- **[Pre-signed zones](#set-up-dnssec-for-pre-signed-zones)**: If your primary DNS provider signs records and transfers out the signatures, Cloudflare serves records and DNSSEC signatures as is without doing any signing. Cloudflare only supports NSEC records (and not NSEC3 records) and this setup does not support [Secondary Overrides](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/).

## Set up Multi-signer DNSSEC

## Enable DNSSEC for your hidden primary setup

## Set up DNSSEC for pre-signed zones