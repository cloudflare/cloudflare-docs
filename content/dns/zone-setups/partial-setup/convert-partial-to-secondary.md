---
title: Convert to secondary setup
pcx_content_type: tutorial
weight: 4
meta:
  title: Convert partial setup to secondary setup
---

# Convert partial setup to secondary setup

If you initially set up a [partial zone](/dns/zone-setups/partial-setup/) on Cloudflare, you can later convert it to use a [secondary setup](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/).

This page will guide you through how to achieve this conversion using [export and import](/dns/manage-dns-records/how-to/import-and-export/) and API calls.

## Before you begin

Make sure you consider the following:

- Proxying traffic with secondary zones requires a setting that is not turned on by default. Refer to [Secondary DNS override](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/) to learn more. The steps below include enabling this setting.
- There are a few options for [DNSSEC with incoming zone transfers](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/dnssec-for-secondary/). If you want to use DNSSEC, plan for which option you will configure and confirm that your other DNS provider(s) support the setup.
- You can prepare SSL/TLS in advance by either ordering an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/) or [uploading a custom certificate](/ssl/edge-certificates/custom-certificates/uploading/). You should confirm that the certificate covers all your proxied hostnames and that the [status of your SSL certificate](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates) is **Active**.

## 1. Prepare a zone file

1. Export a zone file from the authoritatve DNS provider you were using with your partial (CNAME) setup.
2. Edit the zone file to remove any occurrences of the `cdn.cloudflare.net` suffix.

  * If the `CNAME` target is only appending the Cloudflare suffix to the same hostname at which it is created, replace it by the records on the Cloudflare partial zone.

  {{<details header="Example">}}

Original record in authoritative DNS provider:

| Type | Name | Content |
| --- | --- | --- |
| `CNAME` | `www.example.com` | `www.example.com.cdn.cloudflare.net` |

Records in the Cloudflare partial zone:

| Type | Name | Content |
| --- | --- | --- |
| `A` | `www.example.com` | `<IPv4>` |
| `A` | `www.example.com` | `<IPv4>` |

Final records adjusted in the zone file:

| Type | Name | Content |
| --- | --- | --- |
| `A` | `www.example.com` | `<IPv4>` |
| `A` | `www.example.com` | `<IPv4>` |

{{</details>}}

  * If the `CNAME` record points to a different hostname, keep this record but remove the `cdn.cloudflare.net` suffix, and also bring the records from the Cloudflare partial zone.

  {{<details header="Example">}}

Original record in authoritative DNS provider:

| Type | Name | Content |
| --- | --- | --- |
| `CNAME` | `www.example.com` | `other-hostname.example.com.cdn.cloudflare.net` |

Records in the Cloudflare partial zone:

| Type | Name | Content |
| --- | --- | --- |
| `A` | `other-hostname.example.com` | `<IPv4>` |
| `A` | `other-hostname.example.com` | `<IPv4>` |

Final records adjusted in the zone file:

| Type | Name | Content |
| --- | --- | --- |
| `CNAME` | `www.example.com` | `other-hostname.example.com` |
| `A` | `other-hostname.example.com` | `<IPv4>` |
| `A` | `other-hostname.example.com` | `<IPv4>` |

{{</details>}}

## 2. Configure the Cloudflare zone

1. Use the [Import DNS Records endpoint](/api/operations/dns-records-for-a-zone-import-dns-records) with a properly [formatted zone file](/dns/manage-dns-records/how-to/import-and-export/#format-your-zone-file) to import the records into your partial zone.

    Existing and already proxied records will not be overwritten by the import.

2. Use the [Update DNS Settings endpoint](/api/operations/dns-settings-for-a-zone-update-dns-settings) with `secondary_overrides` set to `true`, to enable Secondary DNS Override.

{{<Aside type="warning">}}
This step is essential so that Cloudflare can keep the proxy status of the records after the conversion.
{{</Aside>}}

3. Use the [Edit Zone endpoint](/api/operations/zones-0-patch) with `type` set to `secondary`, to convert the zone type.

    You can verify if it answers as expected by querying the new assigned secondary nameservers. You can find your nameservers in [**DNS** > **Records**](https://dash.cloudflare.com/?to=/:account/:zone/dns/records), and they should follow a format like `ns0123.secondary.cloudflare.com`.

```bash
# Replace ns0123 with your actual Cloudflare nameservers
dig example.com @ns0123.secondary.cloudflare.com
```

4. At your registrar, [update your nameservers](/dns/nameservers/update-nameservers/) to point to the Cloudflare nameservers.

Once the time to live (TTL) of previous `NS` records is expired and this information is evicted from resolvers' cache, your zone will be properly delegated to Cloudflare. In order to update DNS records, you must configure [zone transfers](/dns/zone-setups/zone-transfers/) in the next steps.

## 3. Configure the zone transfers

{{<Aside type="note" header="If you are also changing your primary provider">}}
If you are also migrating to a new primary DNS provider, import the same zone file you prepared in [Step 1](#1-prepare-a-zone-file) onto your new primary zone. Make sure there are no records that still refer `cdn.cloudflare.net`. Otherwise, HTTP traffic for these hostnames will break.
{{</Aside>}}

1. Enable outgoing zone transfers at your primary provider and [create a peer DNS server](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/#2-create-peer-server) on your Cloudflare account.

2. Use the [Update Secondary Zone Configuration endpoint](/api/operations/secondary-dns-(-secondary-zone)-update-secondary-zone-configuration) to link your Cloudflare zone to the peer DNS server you just created.

3. At your secondary zone [**DNS** > **Settings**](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings), confirm the linked peer is listed under **DNS Zone Transfers**, and select **Initiate zone transfer**.