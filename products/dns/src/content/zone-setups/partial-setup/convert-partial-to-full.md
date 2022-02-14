---
title: Convert to full setup
order: 2
pcx-content-type: tutorial
---

# Convert partial setup to full setup

If you initially set up a partial domain on Cloudflare, you can later migrate it to a [full setup](/zone-setups/full-setup).

## Step 1 — Prepare Cloudflare SSL/TLS

In the Cloudflare dashboard, either order an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates) or [upload a custom SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading) for your application.

You also should verify that the [status](https://developers.cloudflare.com/ssl/ssl-tls/certificate-statuses) of your SSL certificate is **Active**.

## Step 2 — Update settings in authoritative DNS

At your authoritative DNS provider, you need to delete the previous [zone activation TXT record](/zone-setups/partial-setup/setup#step-1--add-your-domain-to-cloudflare). To locate this value in the Cloudflare dashboard, go to **DNS** and find the **Verification TXT Record**.

After deleting your zone activation TXT record, wait for its Time to Live (TTL) to expire.

At least 24 hours prior to converting your application, disable DNSSEC.

## Step 3 — Convert to full setup

In the Cloudflare dashboard:

1. Go to **Overview** > **Advanced Actions**.
1. Click **Convert to Full DNS setup** (this will not affect how your traffic is proxied).
1. Import your records into Cloudflare DNS and verify that they have been configured correctly. Usually, you will want to import unproxied (gray-clouded) records.

## Step 4 — Activate full setup

Using values from the Cloudflare dashboard, go to your registrar and [update your nameservers](/zone-setups/full-setup/setup).

In the Cloudflare dashboard, we recommend that you also [enable DNSSEC](/additional-options/dnssec) and add the DS record to your registrar.

Once all the DNS TTLs expire, all your DNS queries will be answered by Cloudflare's global edge network.

Start proxying additional hostnames by enabling the [proxy status](/manage-dns-records/reference/proxied-dns-records) (also known as orange-clouding) for specific DNS records. Previously proxied subdomains will continue to be proxied without any interruption.