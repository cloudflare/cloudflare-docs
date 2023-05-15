---
pcx_content_type: how-to
title: Set up multi-signer DNSSEC
weight: 5
---

# Set up multi-signer DNSSEC

This page describes how you can enable [multi-signer DNSSEC](/dns/additional-options/dnssec/multi-signer-dnssec/) with Cloudflare DNS.

{{<Aside type="note">}}
Note that this process requires that your other DNS provider(s) also support multi-signer DNSSEC.
{{</Aside>}}

Although a few steps can also be completed via the user interface, currently the whole process can only be completed using the API.

## Step 1 - Configure Cloudflare

1. Use the [Edit DNSSEC Status endpoint](/api/operations/dnssec-edit-dnssec-status/) to enable multi-signer DNSSEC. This is done by specifying a value for `dnssec_multi_model`, as in the following example.

```bash
$ curl --request PATCH 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec' \ 
--header 'X-Auth-Email: <EMAIL>' \ 
--header 'X-Auth-Key: <KEY>' \ 
--header 'Content-Type: application/json' \ 
--data '{"dnssec_multi_model": 2}'
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
    "ttl":3600
   }'
```

3. Enable DNSSEC for your zone.

```bash
curl --request PATCH "https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <KEY>" \
--header "Content-Type: application/json" \
--data '{"status": "active"}'
```

4. Add your external provider(s) nameservers as NS records on your zone apex.

```bash
curl --request PATCH "https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <KEY>" \
--header "Content-Type: application/json" \
--data '{
    "type":"NS",    
    "name":"<ZONE_NAME>",
    "content": "<NS_DOMAIN",
    "ttl":86400
   }'
```

5. Enable the usage of the nameservers you added in the previous step by using the following API request.

```bash
$ curl --request PATCH 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_settings/use_apex_ns' \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <KEY>' \
--header 'Content-Type: application/json' \
-data '{
    "id": "use_apex_ns",
    "value": true
  }'
```
## Step 2 - Configure external provider

1. Get Cloudfare's ZSK using either the API or a query from one of the assigned Cloudflare nameservers.

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
2. Add Cloudflare's ZSK to your external provider(s).
3. Add Cloudflare's nameservers to your external provider(s).

## Step 3 - Configure your registrar

1. Add DS records at your registrar, one for each provider.
2. Update the nameserver settings at your registrar to include the nameservers of all providers you will be using for your multi-signer DNSSEC setup.