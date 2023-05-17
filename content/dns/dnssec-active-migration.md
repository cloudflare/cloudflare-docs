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
This procedure involves cross-importing the zone signing keys (ZSKs) from one provider to the other. To learn more about this, consider this article [about multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/about/) or refer to [RFC 8901](https://www.rfc-editor.org/rfc/rfc8901.html).
{{</Aside>}}

This is an advanced procedure and assume some familiarity with [DNS concepts](/dns/concepts/), [API operations](/fundamentals/api/), and basic setup steps. Assumed knowledge that is not detailed in this tutorial can be referenced through the linked content in each of the steps.

## Requirements
* The provider you are migrating from must allow you to add DNSKEY records and use these in responses to DNS queries.

## Step 1 - Set up Cloudflare

1. [Add your zone to Cloudflare](/fundamentals/get-started/setup/add-site/).

    To add your zone using the API, refer to the [Create Zone endpoint](/api/operations/zones-post).

2. [Review the records found by the automatic scan](/dns/manage-dns-records/how-to/create-dns-records/) or [import your zone file](/dns/manage-dns-records/how-to/import-and-export/).

    To import the zone file using the API, refer [Import DNS Records endpoint](/api/operations/dns-records-for-a-zone-import-dns-records).

3. Go to **DNS**>**Settings**, and select **Enable DNSSEC**. Or use the following API request.

```bash
curl --request PATCH "https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <KEY>" \
--header "Content-Type: application/json" \
--data '{"status": "active"}'
```

4. Enable multi-signer DNSSEC.

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