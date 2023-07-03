---
pcx_content_type: concept
title: DNSSEC options
weight: 3
meta:
    title: DNSSEC for Secondary DNS
---

# DNSSEC for incoming zone transfers

[DNS Security Extensions (DNSSEC)](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) increase security by adding cryptographic signatures to DNS records. When you use multiple providers and Cloudflare is secondary, you have a few options to enable DNSSEC for records served by Cloudflare.

- **[Multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/setup/)**: Both Cloudflare and your primary DNS provider know the signing keys of each other and perform their own live-signing of DNS records, in accordance with [RFC 8901](https://www.rfc-editor.org/rfc/rfc8901.html).
- **[Hidden primary](#enable-dnssec-for-hidden-primary-setup)**: Your domain is not delegated to your primary provider's nameservers and Cloudflare secondary nameservers are the only nameservers authoritatively responding to DNS queries. If you have this setup, you can enable DNSSEC via the Cloudflare API to allow live-signing of DNS records.
- **[Pre-signed zones](#set-up-dnssec-for-pre-signed-zones)**: Your primary DNS provider signs records and transfers out the signatures. Cloudflare then serves these records and signatures as is, without doing any signing. Cloudflare only supports [NSEC records](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) (and not NSEC3 records) and this setup does not support [Secondary DNS Overrides](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/) nor [Load Balancing](/load-balancing/).

---

## Set up multi-signer DNSSEC

Refer to [Set up multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/setup/) and follow the instructions, considering the note about Cloudflare as Secondary.

---

## Enable DNSSEC for hidden primary setup

If you use Cloudflare secondary nameservers as the only nameservers authoritatively responding to DNS queries, you can enable DNSSEC for your zone by setting a `status` of `active` through the [Edit DNSSEC Status endpoint](/api/operations/dnssec-edit-dnssec-status).

In this setup, DNSSEC on your pirmary DNS provider does not need to be enabled.

---

## Set up DNSSEC for pre-signed zones

{{<Aside type="warning" header="Important: NSEC3 not supported">}}

If your primary DNS provider uses NSEC3 instead of NSEC, Cloudflare will fail to serve the pre-signed zone. Authenticated denial of existence is an essential part of DNSSEC ([RFC 7129](https://www.rfc-editor.org/rfc/rfc7129.html)) and is only supported by Cloudflare through NSEC.
{{</Aside>}}

### Prerequisites

* Your secondary zone in Cloudflare already exists and zone transfers from your primary DNS provider are working correctly.
* Your primary DNS provider supports DNSSEC using NSEC records (and not NSEC3).
* Your primary DNS provider transfers out DNSSEC related records, such as RRSIG, DNSKEY, and NSEC.

### Steps

1. Enable DNSSEC at your primary DNS provider.
2. Use the [Edit DNSSEC Status endpoint](/api/operations/dnssec-edit-dnssec-status) to enable pre-signed DNSSEC on your Cloudflare secondary zone.

```bash
curl --request PATCH https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <KEY>' \
--header 'Content-Type: application/json' \
--data '{
   "dnssec_presigned":true
  }'
```

3. Make sure Cloudflare nameservers are added at your registrar. You can see your Cloudflare nameservers on the dashboard by going to **DNS** > **Records**.

4. Make sure there is a DS record added at your registrar. The DS record is obtained from your primary DNS provider (the signer of the zone). The DS record communicates to resolvers that a zone has DNSSEC enabled.