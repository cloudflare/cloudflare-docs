---
pcx_content_type: how-to
title: Setup
weight: 1
layout: single
meta:
    title: Setup - Geo Key Manager
    description: Learn how to set up Geo Key Manager and choose the geographical boundaries of where your private encryption keys are stored.
---

# Setup

{{<beta heading="h2">}} Geo Key Manager v2 {{</beta>}}

{{<Aside type="note">}}

Geo Key Manager v2 is only available through the Cloudflare API.

{{</Aside>}}

Geo Key Manager v2 gives customers flexibility when choosing the geographical boundaries of where their keys are stored.

Using the `policy` field, customers can define policies containing allow and block lists of countries or regions where the private key should be stored. 

To use Geo Key Manager v2 with the API, generally, follow the steps to [upload a custom certificate](/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate).

When sending the [`POST`](/api/operations/custom-ssl-for-a-zone-create-ssl-configuration) request, include the `policy` parameter to define policies containing allow and block lists of countries or regions where the private key should be stored.

{{<Aside type="note">}}

You also have access to the `geo_restrictions` parameter, which is mutually exclusive with the `policy` parameter and is part of [Geo Key Manager v1](#geo-key-manager-v1).

{{</Aside>}}

### Examples

```json
---
header: Store private keys in the E.U. and the U.S.
---
curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/custom_certificates" \
     -H "X-Auth-Email: <EMAIL>" \
     -H "X-Auth-Key: <AUTH_KEY>" \
     -H "Content-Type: application/json" \
     --data '
     {
        "certificate":"certificate",
        "private_key":"<PRIVATE_KEY>",
        "policy":"(country: US) and (region: EU)", 
        "type": "sni_custom"
     }'
```

```json
---
header: Store private keys in the E.U., but not in France
---
curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/custom_certificates" \
     -H "X-Auth-Email: <EMAIL>" \
     -H "X-Auth-Key: <AUTH_KEY>" \
     -H "Content-Type: application/json" \
     --data '
     {
        "certificate":"certificate",
        "private_key":"<PRIVATE_KEY>",
        "policy":"(region: EU) and (not country: FR)", 
        "type": "sni_custom"
     }'
```

{{<Aside type="note">}}

For more information on the `policy` field, refer to [Supported options](/ssl/edge-certificates/geokey-manager/supported-options/).

{{</Aside>}}

## Geo Key Manager v1

{{<render file="_geokey-manager-v1.md">}}

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To use Geo Key Manager in the dashboard:

1. Follow the steps to [upload a custom certificate](/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate).
2. For **Private Key Restriction**, choose one of the following options:
    - **Distribute to all Cloudflare data centers (optimal performance)**
    - **Distribute only to U.S. data centers**
    - **Distribute only to E.U. data centers**
    - **Distribute only to highest security data centers** ([more details](/ssl/edge-certificates/geokey-manager/supported-options/#highest-security-data-centers))
3. Select **Upload Custom Certificate**.

{{</tab>}}

{{<tab label="api" no-code="true">}}

To use Geo Key Manager with the API, generally, follow the steps to [upload a custom certificate](/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate).

When sending the [`POST`](/api/operations/custom-ssl-for-a-zone-create-ssl-configuration) request, include the `geo_restrictions` parameter set to one of the following options:

- `us`
- `eu`
- `highest_security`([more details](/ssl/edge-certificates/geokey-manager/supported-options/#highest-security-data-centers))

{{</tab>}}
{{</tabs>}}
