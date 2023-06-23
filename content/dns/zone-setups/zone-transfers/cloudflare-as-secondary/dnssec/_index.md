---
pcx_content_type: concept
title: DNSSEC options
layout: single
meta:
    title: DNSSEC for Secondary DNS
---

# DNSSEC for incoming zone transfers

[DNS Security Extensions (DNSSEC)](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) increase security by adding cryptographic signatures to DNS records. When you use multiple providers and Cloudflare is secondary, you have a few options to also enable DNSSEC for records served by Cloudflare.

- **[Multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/setup/)**: Both Cloudflare and your primary DNS provider know the signing keys of the other provider and perform their own live-signing of DNS records, in accordance with [RFC 8901](https://www.rfc-editor.org/rfc/rfc8901.html).
- **[Hidden primary](#enable-dnssec-for-your-hidden-primary-setup)**: Your primary provider is unlisted and Cloudflare secondary nameservers are the only nameservers authoritatively responding to DNS queries. If you have this setup, you can enable DNSSEC via the Cloudflare API to allow live-signing of DNS records.
- **[Pre-signed zones](#set-up-dnssec-for-pre-signed-zones)**: Your primary DNS provider signs records and transfers out the signatures, and Cloudflare serves records and DNSSEC signatures as is without doing any signing. Cloudflare only supports NSEC records (and not NSEC3 records) and this setup does not support [Secondary Overrides](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/).

## Set up Multi-signer DNSSEC

Refer to [Set up multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/setup/) and follow the instructions, considering the note about Cloudflare as Secondary.

## Enable DNSSEC for your hidden primary setup

If you use Cloudflare secondary nameservers as the only nameservers authoritatively responding to DNS queries, you can enable DNSSEC for your zone by setting a `status` of `active` through the [Edit DNSSEC Status endpoint](/api/operations/dnssec-edit-dnssec-status).

## Set up DNSSEC for pre-signed zones