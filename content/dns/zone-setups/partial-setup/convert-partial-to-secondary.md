---
title: Convert to secondary setup
pcx_content_type: tutorial
weight: 4
meta:
  title: Convert partial setup to secondary setup
---

# Convert partial setup to secondary setup

If you initially set up a [partial zone](/dns/zone-setups/partial-setup/) on Cloudflare, you can later convert it to use a [secondary setup](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/).

This page will guide you through this conversion using [export and import](/dns/manage-dns-records/how-to/import-and-export/) and API calls.

## Before you begin

Make sure you consider the following:

- Proxying traffic with secondary zones requires a setting that is not turned on by default. Refer to [Secondary DNS override](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/) to learn more. The steps below include enabling this setting.
- There are a few options for [DNSSEC with incoming zone transfers](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/dnssec-for-secondary/). If you want to use DNSSEC, plan for which option you will configure and confirm that your other DNS provider(s) support the setup.
- You can prepare SSL/TLS in advance by either ordering an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/) or [uploading a custom certificate](/ssl/edge-certificates/custom-certificates/uploading/). You should confirm that the certificate covers all your proxied hostnames and that the [status of your SSL certificate](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates) is **Active**.

## 1. Prepare a zone file

1. Export a zone file from the authoritative DNS provider you were using with your partial (CNAME) setup.
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

    {{<render file="_zone-file-size-limit.md">}} Existing and already proxied records will not be overwritten by the import.

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

1. Remove all references to `cdn.cloudflare.net` from your primary DNS provider. You can do this by importing the same zone file you prepared in [Step 1](#1-prepare-a-zone-file) onto your primary zone.

{{<Aside type="warning">}}
If you keep any DNS records that still refer `cdn.cloudflare.net`, HTTP traffic for the respective hostnames will break.
{{</Aside>}}

2. Enable outgoing zone transfers at your primary provider and create a peer DNS server on your Cloudflare account.

{{<render file="_create-peer-server.md">}}

3. Link your Cloudflare zone to the peer DNS server you just created.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Go to **DNS** > **Records**.
2. Under **DNS Zone Transfers**, select **Manage linked peers**.
3. Choose a value for **Zone refresh**, which controls the number of seconds between zone updates from your primary DNS server.
    {{<Aside type="warning">}}Cloudflare will not use the REFRESH value inside the SOA record that is served by your primary provider. Instead the value of zone refresh configured for your secondary zone on Cloudflare will be used to determine the interval after which the SOA serial of the primary zone will be checked for changes.
    {{</Aside>}}
4. Select the peer server you previously created. If needed, you can link more than one peer server to a zone.
5. Select **Save** to confirm.

{{</tab>}}
{{<tab label="api" no-code="true">}}

Use the [Update Secondary Zone Configuration endpoint](/api/operations/secondary-dns-(-secondary-zone)-update-secondary-zone-configuration) to link your Cloudflare zone to the peer DNS server.

{{</tab>}}
{{</tabs>}}

4. In [**DNS** > **Settings**](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings), confirm the linked peer is listed under **DNS Zone Transfers**, and select **Initiate zone transfer**. Alternatively, you can use the [Force AXFR endpoint](/api/operations/secondary-dns-(-secondary-zone)-force-axfr).