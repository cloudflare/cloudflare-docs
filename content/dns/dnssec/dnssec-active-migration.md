---
pcx_content_type: concept
title: Migration tutorial
weight: 5
meta: 
    title: DNSSEC migration tutorial
---

# Migrate a zone with DNSSEC enabled

Follow this tutorial to migrate an existing DNS zone to Cloudflare without having to disable DNSSEC.

{{<Aside type="warning">}}
This procedure involves cross-importing the [zone signing keys (ZSKs)](https://www.cloudflare.com/learning/dns/dns-records/dnskey-ds-records/) from one provider to the other. To learn more about this, consider this article [about multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/about/) or refer to [RFC 8901](https://www.rfc-editor.org/rfc/rfc8901.html).
{{</Aside>}}

This is an advanced procedure and assume some familiarity with [DNS concepts](/dns/concepts/), [API operations](/fundamentals/api/), and basic setup steps. Assumed knowledge that is not detailed in this tutorial can be referenced through the linked content in each of the steps.

## Requirement

The provider you are migrating from must allow you to add DNSKEY records on the zone apex and use these records in responses to DNS queries.

## 1. Set up Cloudflare

1. [Add your zone to Cloudflare](/fundamentals/get-started/setup/add-site/).

    To add your zone using the API, refer to the [Create Zone endpoint](/api/operations/zones-post).

2. [Review the records found by the automatic scan](/dns/manage-dns-records/how-to/create-dns-records/) or [import your zone file](/dns/manage-dns-records/how-to/import-and-export/).

    To import the zone file using the API, refer to the [Import DNS Records endpoint](/api/operations/dns-records-for-a-zone-import-dns-records).

3. Go to **DNS** > **Settings**, and select **Enable DNSSEC**. Or use the following [API request](/api/operations/dnssec-edit-dnssec-status).

```bash
curl --request PATCH https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <KEY>' \
--header 'Content-Type: application/json' \
--data '{"status": "active"}'
```

4. Enable multi-signer DNSSEC using the following request. This step can only be achieved via the [API](/api/operations/dnssec-edit-dnssec-status).

```bash
$ curl --request PATCH https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec \ 
--header 'X-Auth-Email: <EMAIL>' \ 
--header 'X-Auth-Key: <KEY>' \ 
--header 'Content-Type: application/json' \ 
--data '{"dnssec_multi_signer": true}'
```

## 2. Cross-import ZSKs

1. Add the [ZSK](https://www.cloudflare.com/learning/dns/dns-records/dnskey-ds-records/) of your previous provider to Cloudflare by creating a DNSKEY record on your zone.

You can do this [on the dashboard](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) or through the [Create DNS Record endpoint](/api/operations/dns-records-for-a-zone-create-dns-record), as in the following example.

```bash
$ curl --request POST https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records \
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
$ curl --request https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec/zsk \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <KEY>'
```

Command line query example:

```bash
$ dig <ZONE_NAME> dnskey @<CLOUDFLARE_NAMESERVER> +noall +answer | grep 256
```

3. Add Cloudflare's ZSK that you fetched in the last step to your previous provider.

{{<Aside type="note">}}

You can check if both providers are responding with both ZSKs by running a `dig` command, as in the following example, or by using this [Dig Web Interface link](https://www.digwebinterface.com/?hostnames=multisigner.info&type=DNSKEY&useresolver=1.1.1.1).

```bash
$ dig multisigner.info dnskey +noall +answer
```
{{</Aside>}}

## 3. Set up registrar

1. Add Cloudflare DS record to your registrar. You can see your Cloudflare DS record on the [dashboard](https://dash.cloudflare.com/?to=/:account/:zone/dns) by going to **DNS** > **Settings** > **DS Record**.
2. Add Cloudflare assigned nameservers to your registrar. You can see your Cloudflare nameservers by going to **DNS** > **Records**.

At this point your zone is in a [multi-signer DNSSEC setup](/dns/dnssec/multi-signer-dnssec/).

## 4. Remove previous provider

1. Remove your previous provider's DS record from your registrar.
2. Remove your previous provider's nameservers from your registrar.
3. After waiting at least one and a half times the [TTL](https://www.cloudflare.com/learning/cdn/glossary/time-to-live-ttl/) of your previous provider DS record, you can remove the DNSKEY record (containing your previous provider ZSK) that you added to your Cloudflare zone in [step 2](#2-cross-import-zsks).

{{<Aside type="note">}}

You can find out the TTL of your previous provider DS record by running a `dig` command, as in the following example, or by using this [Dig Web Interface link](https://www.digwebinterface.com/?hostnames=multisigner.info&type=DS&useresolver=1.1.1.1).


```bash
$ dig multisigner.info ds +noall +answer
multisigner.info.	3600	IN	DS	2371 13 2 227B4C7FF3E1D49D59BAF39BDA54CA0839DE700DD9896076AA3E6AD7 19A0CF55
multisigner.info.	3600	IN	DS	48553 13 2 893709B51A9C53D011A4054B15FC5454BEDF68E739BB3B3FA1E333DA 7B8DACFE
```
In this example, both DS records have a TTL of `3600` seconds. Cloudflare's DS record always has the key tag set to `2371`, so the second line of the response is the DS record of the other provider.

{{</Aside>}}