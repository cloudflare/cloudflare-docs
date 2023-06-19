---
pcx_content_type: how-to
title: Setup
weight: 5
meta:
  title: Set up multi-signer DNSSEC
---

# Set up multi-signer DNSSEC

This page explains how you can enable [multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/) with Cloudflare, using the [model 2](/dns/dnssec/multi-signer-dnssec/about/) as described in [RFC 8901](https://www.rfc-editor.org/rfc/rfc8901.html).

{{<Aside type="note">}}
Note that this process requires that your other DNS provider(s) also support multi-signer DNSSEC.
{{</Aside>}}

Although you can complete a few steps via the user interface, currently the whole process can only be completed using the API.

## 1. Set up Cloudflare zone

{{<Aside type="note">}}
The following steps also apply if you use [Cloudfare as a secondary DNS provider](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/), with the difference that, in such case, the records in steps 2 and 3 should be transferred from the primary, and step 4 is not necessary.
{{</Aside>}}

1. Use the [Edit DNSSEC Status endpoint](/api/operations/dnssec-edit-dnssec-status) to enable DNSSEC and activate multi-signer DNSSEC for your zone. This is done by setting `status` to `active` and `dnssec_multi_signer` to `true`, as in the following example.

```bash
$ curl --request PATCH 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec' \ 
--header 'X-Auth-Email: <EMAIL>' \ 
--header 'X-Auth-Key: <KEY>' \ 
--header 'Content-Type: application/json' \ 
--data '{
  "status": "active",
  "dnssec_multi_signer": true
}'
```

2. Add the ZSK(s) of your external provider(s) to Cloudflare by creating a DNSKEY record on your zone.

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
  "ttl": 3600
}'
```

3. Add your external provider(s) nameservers as NS records on your zone apex.

```bash
curl --request PATCH 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec' \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <KEY>" \
--header "Content-Type: application/json" \
--data '{
  "type": "NS",    
  "name": "<ZONE_NAME>",
  "content": "<NS_DOMAIN>",
  "ttl": 86400
}'
```

4. Enable the usage of the nameservers you added in the previous step by using an API request, as in the following example.

{{<Aside type="warning">}}
Unless you use [Cloudfare as a secondary DNS provider](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/), this step is required.

Without enabling this setting, Cloudflare always responds with Cloudflare nameservers for DNS queries to the zone apex requesting the NS record type.
{{</Aside>}}

```bash
$ curl --request PATCH 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_settings/use_apex_ns' \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "id": "use_apex_ns",
  "value": true
}'
```

## 2. Set up external provider

1. Get Cloudfare's ZSK using either the API or a query from one of the assigned Cloudflare nameservers.

API example:

```bash
$ curl 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec/zsk' \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <KEY>'
```

Command line query example:

```bash
$ dig <ZONE_NAME> dnskey @<CLOUDFLARE_NAMESERVER> +noall +answer | grep 256
```

2. Add Cloudflare's ZSK that you fetched in the previous step to the DNSKEY record set of your external provider(s).
3. Add Cloudflare's nameservers to the NS record set at your external provider(s).

## 3. Set up registrar

1. Add DS records to your registrar, one for each provider. You can see your Cloudflare DS record on the [dashboard](https://dash.cloudflare.com/?to=/:account/:zone/dns) by going to **DNS** > **Settings** > **DS Record**.

2. Update the nameserver settings at your registrar to include the nameservers of all providers you will be using for your multi-signer DNSSEC setup.
