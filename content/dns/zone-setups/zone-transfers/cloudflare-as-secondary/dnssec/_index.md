---
pcx_content_type: concept
title: DNSSEC options
layout: single
meta:
    title: DNSSEC for Secondary DNS
---

# DNSSEC for incoming zone transfers

[DNS Security Extensions (DNSSEC)](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) increase security by adding cryptographic signatures to DNS records. When you use multiple providers and Cloudflare is secondary, you have a few options to enable DNSSEC for records served by Cloudflare.

- **[Multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/setup/)**: Both Cloudflare and your primary DNS provider know the signing keys of the other provider and perform their own live-signing of DNS records, in accordance with [RFC 8901](https://www.rfc-editor.org/rfc/rfc8901.html).
- **[Hidden primary](#enable-dnssec-for-your-hidden-primary-setup)**: Your primary provider is unlisted and Cloudflare secondary nameservers are the only nameservers authoritatively responding to DNS queries. If you have this setup, you can enable DNSSEC via the Cloudflare API to allow live-signing of DNS records.
- **[Pre-signed zones](#set-up-dnssec-for-pre-signed-zones)**: Your primary DNS provider signs records and transfers out the signatures. Cloudflare then serves these records and signatures as is, without doing any signing. Cloudflare only supports [NSEC records](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) (and not NSEC3 records) and this setup does not support [Secondary Overrides](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/).

---

## Set up multi-signer DNSSEC

Refer to [Set up multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/setup/) and follow the instructions, considering the note about Cloudflare as Secondary.

---

## Enable DNSSEC for hidden primary setup

If you use Cloudflare secondary nameservers as the only nameservers authoritatively responding to DNS queries, you can enable DNSSEC for your zone by setting a `status` of `active` through the [Edit DNSSEC Status endpoint](/api/operations/dnssec-edit-dnssec-status).

---

## Set up DNSSEC for pre-signed zones

{{<Aside type="warning" header="Important: Cloudflare currently does not support NSEC3">}}

If your primary DNS provider uses NSEC3 instead of NSEC, Cloudflare would correctly serve DNSSEC signatures for existing records but would fail to serve the correct content in NSEC3 records. This content must be served for non-existing DNS records as an authenticated denial of existence, an essential part of DNSSEC ([RFC 7129](https://www.rfc-editor.org/rfc/rfc7129.html)).
{{</Aside>}}

### Prerequisites
* Secondary zone in Cloudflare already exists and zone transfers from primary are working correctly.
* The primary provider supports DNSSEC using NSEC records (and not NSEC3). 

### Steps
1. Enable DNSSEC at your primary DNS provider.
2. Enable pre-signed DNSSEC on your Cloudflare secondary zone.
3. Make sure Cloudflare nameservers are added at your registrar.
4. Make sure there is a DS record added at your registrar.