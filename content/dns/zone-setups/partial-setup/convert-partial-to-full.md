---
title: Convert to full setup
pcx_content_type: tutorial
weight: 3
meta:
  title: Convert partial setup to full setup
---

# Convert partial setup to full setup

If you initially set up a partial domain on Cloudflare, you can later migrate it to a [full setup](/dns/zone-setups/full-setup/).

## Step 1 — Prepare Cloudflare SSL/TLS

In the Cloudflare dashboard, either order an [advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/) or [upload a custom SSL certificate](/ssl/edge-certificates/custom-certificates/uploading/) for your website or application.

You should also verify that the [status](/ssl/reference/certificate-statuses/) of your SSL certificate is **Active**.

{{<Aside type="note">}}

It is possible to use [Universal SSL](/ssl/edge-certificates/universal-ssl/) instead, but you should consider the following:

* Universal certificates can take at least [15 minutes](/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#full-dns-setup) to be issued.
* You should make sure to add Cloudflare nameservers to your registrar within 72 hours of the conversion process.
* Universal SSL only supports first-level subdomains.
* To minimize downtime, it is recommended having a certificate in place beforehand.

{{</Aside>}}

## Step 2 — Update settings in authoritative DNS

At least 24 hours prior to converting your zone, disable DNSSEC at your authoritative DNS provider.

{{<Aside type="note">}}

As a best practice, you should also delete the previous [zone activation TXT record](/dns/zone-setups/partial-setup/setup/#add-your-domain-to-cloudflare) at your authoritative DNS provider. To locate this value in the Cloudflare dashboard, go to **DNS** > **Records** and find the **Verification TXT Record**.

{{</Aside>}}

## Step 3 — Convert to full setup

In the Cloudflare dashboard:

1.  Go to **DNS** > **Settings**.
2.  Select **Convert to Primary DNS** (this will not affect how your traffic is proxied).
3.  Import your records into Cloudflare DNS and verify that they have been configured correctly. Usually, you will want to import [unproxied records](/dns/manage-dns-records/reference/proxied-dns-records/).

## Step 4 — Activate full setup

Get your assigned Cloudflare nameservers from **DNS** > **Records** and [update your nameservers](/dns/nameservers/update-nameservers/) at your registrar.

{{<Aside type="warning">}}

If you are counting on Universal SSL certificates to cover your website or application, make sure to add Cloudflare nameservers to your registrar within 72 hours of the conversion process.

{{</Aside>}}

Cloudflare recommends that you also [enable DNSSEC](/dns/dnssec/) from **DNS** > **Settings** and add the DS record to your registrar.

Once all the DNS TTLs expire, all your DNS queries will be answered by the Cloudflare global network.

Start proxying additional hostnames by enabling the [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/) (also known as orange-clouding) for specific DNS records. Previously proxied subdomains will continue to be proxied without any interruption.