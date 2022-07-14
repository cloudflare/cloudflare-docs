---
pcx-content-type: how-to
title: Custom domains
---

# Custom domains

When deploying your Pages project, you may wish to point custom domains (or subdomains) to your site. 

## Add a custom domain

To add a custom domain:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account in **Account Home** > **Pages**.
3. Select your Pages project > **Custom domains**.
4. Select **Set up a domain**.
5. Provide the domain that you would like to serve your Cloudflare Pages site on and select **Continue**.

![Adding a custom domain for your Pages project through the Cloudflare dashboard](/pages/platform/media/domains.png)

If you are deploying to an apex domain (for example, `example.com`), then you will need to add your site as a Cloudflare zone and [configure your nameservers](/#configure-nameservers). 

If you are deploying to a subdomain, it is not necessary for your site to be a Cloudflare zone. You will need to [add a custom CNAME record](/#add-a-custom-cname-record) to point the domain to your Cloudflare Pages site.

### Configure nameservers

To use a custom apex domain (for example, `example.com`) with your Pages project, [configure your nameservers to point to Cloudflare's nameservers](/dns/zone-setups/full-setup/setup/). If your nameservers are successfully pointed to Cloudflare, Cloudflare will proceed by creating a CNAME record for you.

### Add a custom CNAME record 

If you do not want to point your nameservers to Cloudflare, you must create a custom CNAME record to use a subdomain with Cloudflare Pages. After logging in to your DNS provider, add a CNAME record for your desired subdomain, for example, `shop.example.com`. This record should point to your custom Pages subdomain, for example, `<YOUR_SITE>.pages.dev`.

| Type    | Name               | Content                 |
| ------- | ------------------ | ----------------------- |
| `CNAME` | `shop.example.com` | `<YOUR_SITE>.pages.dev` |

If your site is already managed as a Cloudflare zone, the CNAME record will be added automatically after you confirm your DNS record.

{{<Aside type="note">}}

To ensure a custom domain is added successfully, you must go through the [Add a custom domain](/pages/platform/custom-domains/#add-a-custom-domain) process described above. Manually adding a custom CNAME record pointing to your Cloudflare Pages site - without first associating the domain (or subdomains) in the Cloudflare Pages dashboard - will result in your domain failing to resolve at the CNAME record address, and display a [`522` error](https://support.cloudflare.com/hc/en-us/articles/115003011431-Troubleshooting-Cloudflare-5XX-errors#522error).

{{</Aside>}}

## Delete a custom domain

To detach a custom domain from your Pages project, you must modify your zone's DNS records.

First, log in to the Cloudflare dashboard > select your account in **Account Home** > select your website > **DNS**.

Then, in **DNS**:

1.  Locate your Pages project's CNAME record.
2.  Select **Edit**.
3.  Select **Delete**.

Next, in the **Pages** dashboard:

1.  Select **your Pages project**.
2.  Go to **Custom domains**.
3.  Select the **three dot icon** next to your custom domain > **Remove domain**.

After completing these steps, your Pages project will only be accessible through the `*.pages.dev` subdomain you chose when creating your project.