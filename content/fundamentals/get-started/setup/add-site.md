---
title: Add a site
pcx_content_type: tutorial
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

{{<render file="_disable_dnssec.md" productFolder="dns" >}}

## Step 1 — Add site in Cloudflare

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. In the top navigation bar, click **Add site**.
3. Enter your website’s apex domain (`example.com`) and then click **Add Site**.
    
    {{<Aside type="note">}}
If Cloudflare is unable to identify your domain as a registered domain, make sure you are using an existing [top-level domain](https://www.cloudflare.com/learning/dns/top-level-domain/) (`.com`, `.net`, `.biz`, or others).

Additionally, Cloudflare requires your `apex domain` to be one level below a valid TLD defined in the [Public Suffix List (PSL)](https://github.com/publicsuffix/list/blob/master/public_suffix_list.dat).
    {{</Aside>}}
    
4. Select your plan level. For more details on features and pricing, refer to [our Plans page](https://www.cloudflare.com/plans/#compare-features).
5. Review your DNS records.

    {{<render file="_dns-scan-intro.md" productFolder="dns" >}} <br />

    1. {{<render file="_dns-scan-procedure.md" productFolder="dns" >}}

        {{<render file="_dns-nxdomain-warning.md" productFolder="dns" >}}

    2. If you find any missing records, [manually add](/dns/manage-dns-records/how-to/create-dns-records/) those records.
    3. Depending on your site setup, you may want to adjust the [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/) for certain `A`, `AAAA`, or `CNAME` records.
    4. Click **Continue**.

6. Click **Done, check nameservers**.
7. Go through the **Quick Start Guide**, which allows you to:
    
    - **Improve security**: Make sure that your site enforces HTTPS connections using **Always Use HTTPS** and **Automatic HTTPS Rewrites**. For more help, refer to our [detailed guide](/ssl/edge-certificates/encrypt-visitor-traffic/).
    - **Optimize performance**: Speed up your site by enabling [Auto Minify](/speed/optimization/content/auto-minify/) and [Brotli compression](/speed/optimization/content/brotli/).
 8. When you have finished the **Quick Start Guide**, click **Finish**.

## Step 2 — Update nameservers

{{<render file="_nameserver-preamble.md" productFolder="dns" >}}
<br/>

Before your domain can begin using Cloudflare for DNS resolution, you need to [add these nameservers](/dns/zone-setups/full-setup/setup/#update-your-nameservers) at your registrar. Make sure DNSSEC **is disabled** at this point.

{{<render file="_minimize-downtime-tip.md" productFolder="dns" >}}

## Step 3 — Complete SSL/TLS setup

To prevent insecure connections and visitor browser errors, [enable SSL/TLS protection](/ssl/get-started/).

## Step 4 - Go beyond the basics

For suggestions and guidance about getting the most out of your Cloudflare account, refer to our [Solution guides](/fundamentals/get-started/task-guides/).
