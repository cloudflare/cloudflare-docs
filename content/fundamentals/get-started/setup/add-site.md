---
title: Add a site
pcx-content-type: tutorial
weight: 2
---

# Add site to Cloudflare

When you add a site to Cloudflare, you need to create a new domain within Cloudflare and then perform additional steps to activate that domain.

## Prerequisites

To use Cloudflare, you need to own a domain (`example.com`).

If you do not already own a domain name and plan to use Cloudflare for your [authoritative DNS](/dns/zone-setups/full-setup/), we highly recommend purchasing your domain name through [Cloudflare Registrar](/registrar/get-started/register-domain/).

Using Cloudflare Registrar simplifies your setup process by automatically using Cloudflare for authoritative DNS.

## Step 1 — Add site in Cloudflare

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. In the top navigation bar, click **Add site**.
3. Enter your website’s root domain (`example.com`) and then click **Add Site**.
4. Select your plan level. For more details on features and pricing, refer to [our Plans page](https://www.cloudflare.com/plans/#compare-features).
5. Cloudflare will then automatically scan for your DNS records.
    1. Since this scan is not guaranteed to find all existing DNS records, you need to review your records, paying special attention to the following record types:

        - [Root domain records (`example.com`)](/dns/manage-dns-records/how-to/create-root-domain/)
        - [Subdomain records (`www.example.com` or `blog.example.com`)](/dns/manage-dns-records/how-to/create-subdomain/)
        - [Email records](/dns/manage-dns-records/how-to/email-records/)

        {{<Aside type="note">}}If you activate your domain on Cloudflare *without* setting up the correct DNS records for your domain and subdomain, your visitors may experience [DNS_PROBE_FINISHED_NXDOMAIN](/dns/zone-setups/troubleshooting/dns-probe-finished-nxdomain/) errors.
        {{</Aside>}}

    2. If you find any missing records, [manually add](/dns/manage-dns-records/how-to/create-dns-records/) those records.
    3. Depending on your site setup, you may want to adjust the [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/) for certain `A`, `AAAA`, or `CNAME` records.
    4. Click **Continue**.

6. Click **Done, check nameservers**.

## Step 2 — Complete DNS setup

Before your domain can begin using Cloudflare for DNS resolution, you need to complete your [DNS setup](/dns/zone-setups/).

## Step 3 — Complete SSL/TLS setup

To prevent insecure connections and visitor browser errors, [enable SSL/TLS protection](/ssl/get-started/).