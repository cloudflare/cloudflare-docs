---
pcx_content_type: concept
title: Migration tutorial
weight: 2
meta: 
    title: DNSSEC migration turorial
---

# Migrate a zone with DNSSEC enabled

Follow this tutorial to migrate an existing DNS zone to Cloudflare without having to disable DNSSEC.

{{<Aside type="warning">}}
This procedure involves cross-importing the zone signing keys (ZSKs) from one provider to the other. If you are not familiar with this, consider this article [about multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/about/) or refer to [RFC 8901](https://www.rfc-editor.org/rfc/rfc8901.html)
{{</Aside>}}

## Step 1 - Set up Cloudflare

1. Add zone to Cloudflare import DNS records, and enable DNSSEC on Cloudflare
2. Enable multi signer DNSSEC.

```bash
$ curl --request PATCH 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec' \ 
--header 'X-Auth-Email: <EMAIL>' \ 
--header 'X-Auth-Key: <KEY>' \ 
--header 'Content-Type: application/json' \ 
--data '{"dnssec_multi_model": 2}'
```

## Step 2 - Cross-import ZSKs

1. Import DNSKEY including Cloudflare's ZSK (KSK optional but good to have) at old provider, so that old provider responds with all DNSKEY including their own KSK/ZSK and Cloudflare's ZSK.
2. Import DNSKEYs including ZSK of the old provider at Cloudflare (KSK optional), so that Cloudflare responds with DNSKEY including ZSK of both providers.

## Step 3 - Set up registrar

1. Add Cloudflare DS record to your registrar.
2. Add Cloudflare assigned nameservers to your registrar.

At this point you're in a multi-signer setup.

## Step 4 - Remove previous provider

1. Remove previous provider's DS record from your registrar.
2. Remove previous provider's nameservers from your registrar.