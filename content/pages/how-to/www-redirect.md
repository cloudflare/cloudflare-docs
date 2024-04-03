---
pcx_content_type: how-to
title: Redirecting www to domain apex
---

# Redirecting www to domain apex

In this guide, you will learn how to redirect the `www` subdomain to your apex domain (`example.com`). This is a common question and can be achieved by using [Bulk Redirects](/rules/url-forwarding/bulk-redirects/).

To do this:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and website. 
2. Go to **DNS**. 
3. Create a DNS record for the `www` subdomain. It must either be an `A` record with the `192.0.2.1` value or an `AAAA` record with the `100::` value. The new DNS record must also have Cloudflare's proxy enabled (orange-clouded) so that it can enact the Page Rule behavior that you will create next.

![Add a www record in the Cloudflare DNS dashboard](/images/pages/how-to/www_subdomain.png)

4. [Create a bulk redirect list](/rules/url-forwarding/bulk-redirects/create-dashboard/#1-create-a-bulk-redirect-list), making sure to **Edit parameters** and select **Preserve query string**, **Subpath matching**, and **Preserve path suffix**.

5. [Create a bulk redirect rule](/rules/url-forwarding/bulk-redirects/create-dashboard/#2-create-a-bulk-redirect-rule) using the list you just created.

To test that your redirect worked, go to the Target URL and double-click the URL as if to copy it. If the URL does not display `www`, your change has successfully propagated.
