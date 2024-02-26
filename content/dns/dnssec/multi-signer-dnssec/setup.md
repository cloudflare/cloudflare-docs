---
pcx_content_type: how-to
title: Setup
weight: 5
meta:
  title: Set up multi-signer DNSSEC
---

# Set up multi-signer DNSSEC

This page explains how you can enable [multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/) with Cloudflare, using the [model 2](/dns/dnssec/multi-signer-dnssec/about/) as described in [RFC 8901](https://www.rfc-editor.org/rfc/rfc8901.html).

## Before you begin

Note that:

- This process requires that your other DNS provider(s) also support multi-signer DNSSEC.
- Although you can complete a few steps via the dashboard, currently the whole process can only be completed using the API.
- Enabling **DNSSEC** and **Multi-signer DNSSEC** in [**DNS** > **Settings**](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings) only replaces the first step in [1. Set up Cloudflare zone](#1-set-up-cloudflare-zone). You still have to follow the rest of this tutorial to complete the setup.

## 1. Set up Cloudflare zone

### Cloudflare as Primary

If you use Cloudflare as a primary DNS provider, meaning that you manage your DNS records in Cloudflare, do the following:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and zone.
2. Go to **DNS** > **Settings**.
3. Select **Enable DNSSEC** and **Confirm**.

{{<Aside type="note">}}
For the purpose of this tutorial, you will update your registrar with the DS record later, in [Step 3](/dns/dnssec/multi-signer-dnssec/setup/#3-set-up-registrar).
{{</Aside>}}

5. Also enable **Multi-signer DNSSEC** and **Multi-provider DNS**.
6. Go to **DNS** > **Records** and create the following records at your zone apex (meaning you should use `@` in the record **Name** field):
    - a [DNSKEY record](/dns/manage-dns-records/reference/dns-record-types/#ds-and-dnskey) with the ZSK(s) of your external provider(s)
    - a [NS record](/dns/manage-dns-records/reference/dns-record-types/#ns) with your external provider nameservers

{{</tab>}}
{{<tab label="api" no-code="true">}}


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
curl --request POST 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records' \
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
This step is required. Without enabling this setting, Cloudflare will ignore any `NS` records created on the zone apex. This means that responses to DNS queries made to the zone apex and requesting `NS` records will only contain Cloudflare nameservers.
{{</Aside>}}

```bash
$ curl --request PATCH 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_settings/multi
_provider' \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "id": "multi
_provider",
  "value": true
}'
```

{{</tab>}}
{{</tabs>}}

### Cloudflare as Secondary

If you use Cloudflare as a secondary DNS provider, do the following:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

Content.....

{{</tab>}}
{{<tab label="api" no-code="true">}}

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

2. Add the ZSK(s) of your external provider(s) to a DNSKEY record on your primary DNS provider. This record should be transferred successfully to Cloudflare.

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

3. Add your external provider(s) nameservers as NS records on your zone apex on your primary DNS provider. These records should be transferred successfully to Cloudflare.

```bash
curl --request POST 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records' \
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
{{</tab>}}
{{</tabs>}}

## 2. Set up external provider

1. Get Cloudflare's ZSK using either the API or a query from one of the assigned Cloudflare nameservers.

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
