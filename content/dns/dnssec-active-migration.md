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
This procedure involves cross-importing the zone signing keys (ZSKs) from one provider to the other. To learn more about this, consider this article [about multi-signer DNSSEC] or refer to [RFC 8901](https://www.rfc-editor.org/rfc/rfc8901.html).
{{</Aside>}}

This is an advanced procedure and assume some familiarity with [DNS concepts](/dns/concepts/), [API operations](/fundamentals/api/), and basic setup steps. Assumed knowledge that is not detailed in this tutorial can be referenced through the linked content in each of the steps.

## Requirements
* The provider you are migrating from must allow you to add DNSKEY records and use these records in responses to DNS queries.

## Step 1 - Set up Cloudflare

1. [Add your zone to Cloudflare](/fundamentals/get-started/setup/add-site/).

    To add your zone using the API, refer to the [Create Zone endpoint](/api/operations/zones-post).

2. [Review the records found by the automatic scan](/dns/manage-dns-records/how-to/create-dns-records/) or [import your zone file](/dns/manage-dns-records/how-to/import-and-export/).

    To import the zone file using the API, refer to the [Import DNS Records endpoint](/api/operations/dns-records-for-a-zone-import-dns-records).

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
--data '{"dnssec_multi_signer": true}'
```

## Step 2 - Cross-import ZSKs

1. Add the ZSK of your previous provider to Cloudflare by creating a DNSKEY record on your zone.

```bash
$ curl --request POST 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records' \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <KEY>' \
--header 'Content-Type: application/json' \
--data '{
    "type": "DNSKEY",
    "name": "<ZONE_NAME>",
    "data": { 
      "flags": 256,
      "protocol": 3,
      "algorithm": 13,
      "public_key": "<PUBLIC_KEY>"
    },
    "ttl":3600
   }'
```

2. Get Cloudfare's ZSK using either the API or a query from one of the assigned Cloudflare nameservers.

API example:
```bash
$ curl --request GET 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec/zsk' \
--header 'X-Auth-Email: <EMAIL>'
--header 'X-Auth-Key: <KEY>'
--header 'Content-Type: application/json'
```
Command line query example:
```
$ dig <ZONE_NAME> dnskey @<CLOUDFLARE_NAMESERVER> +noall +answer | grep 256
```
3. Add Cloudflare's ZSK that you fetched in the previous step to your previous provider.

## Step 3 - Set up registrar

1. Add Cloudflare DS record to your registrar. You can see your Cloudflare DS record on the [dashboard](https://dash.cloudflare.com/?to=/:account/:zone/dns) by going to **DNS** > **Settings** > **DS Record**.
2. Add Cloudflare assigned nameservers to your registrar. You can see your Cloudflare nameservers by going to **DNS** > **Records**.

At this point your zone is in a multi-signer DNSSEC setup.

## Step 4 - Remove previous provider

1. Remove your previous provider's DS record from your registrar.
2. Remove your previous provider's nameservers from your registrar.