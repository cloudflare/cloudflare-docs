---
title: Add a site
pcx-content-type: tutorial
weight: 2
---

# Add site to Cloudflare

When you add a site to Cloudflare, you need to create a new domain within Cloudflare and then perform additional steps to activate that domain.

{{<Aside type="note">}}

These instructions are tailored to customers using a full setup for Cloudflare DNS (the most common configuration). If you are using a [partial setup](/dns/zone-setups/partial-setup/) or [secondary setup](/dns/zone-setups/zone-transfers/), your setup process will be different.

{{</Aside>}}

## Prerequisites

To use Cloudflare, you need to own a domain (`example.com`).

If you do not already own a domain name and plan to use Cloudflare for your [authoritative DNS](/dns/zone-setups/full-setup/), we highly recommend purchasing your domain name through [Cloudflare Registrar](/registrar/get-started/register-domain/).

Using Cloudflare Registrar simplifies your setup process by automatically using Cloudflare for authoritative DNS.

## Step 1 — Add site in Cloudflare

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. In the top navigation bar, click **Add site**.
3. Enter your website’s root domain (`example.com`) and then click **Add Site**.
    
    {{<Aside type="note">}}For help with `not a registered domain` errors, refer to [Unregistered domains](/fundamentals/get-started/setup/troubleshooting/unregistered-domains/).
    {{</Aside>}}
    
4. Select your plan level. For more details on features and pricing, refer to [our Plans page](https://www.cloudflare.com/plans/#compare-features).
5. Cloudflare will then automatically scan for your DNS records.
    1. {{<render file="../../dns/_partials/_dns-scan-procedure.md">}}

    2. If you find any missing records, [manually add](/dns/manage-dns-records/how-to/create-dns-records/) those records.
    3. Depending on your site setup, you may want to adjust the [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/) for certain `A`, `AAAA`, or `CNAME` records.
    4. Click **Continue**.

6. Click **Done, check nameservers**.
7. Go through the **Quick Start Guide**, which allows you to:
    
    - **Improve security**: Make sure that your site enforces HTTPS connections using **Always Use HTTPS** and **Automatic HTTPS Rewrites**. For more help, refer to our[detailed guide](/ssl/edge-certificates/encrypt-visitor-traffic/).
    - **Optimize performance**: Speed up your site by enabling [Auto Minify](https://support.cloudflare.com/hc/en-us/articles/200168196) and [Brotli compression](https://support.cloudflare.com/hc/en-us/articles/200168396).
 8. When you have finished the **Quick Start Guide**, click **Finish**.

## Step 2 — Update nameservers

Before your domain can begin using Cloudflare for DNS resolution, you need to update your nameservers at your registrar.

{{<Aside type="note">}}

If your domain is particularly sensitive to downtime, review our suggestions to [minimize downtime](/fundamentals/get-started/setup/minimize-downtime/).

{{</Aside>}}

{{<render file="../../dns/_partials/_update-nameservers.md">}}

## Step 3 — Complete SSL/TLS setup

To prevent insecure connections and visitor browser errors, [enable SSL/TLS protection](/ssl/get-started/).

## Step 4 - Go beyond the basics

For suggestions and guidance about getting the most out of your Cloudflare account, refer to our [Solution guides](/fundamentals/get-started/task-guides/).