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

![Add a www record in the Cloudflare DNS dashboard](/images/pages/how-to//www_subdomain.png)

4. Next, go to **Account Home** > **Bulk Redirects** > **Create a new Bulk Redirects list** > **Create new list**.

![Create a new Bulk redirects list](/images/pages/how-to//create_a_new_bulk_redirect_list.png)

5. In the content type, select **Redirect**. 
6. Add your redirect Source URL and Target URL. Your target URL must include `https://` before the apex domain. 
7. Select **Edit parameters** > select **Preserve query string**, **Subpath matching** and **Preserve path suffix**.

![Follow the steps above to correctly configure your list](/images/pages/how-to//redirect-parameters.png)

8. Select **Add to list**.
9. Go to **Bulk Redirects** > **Create Bulk Redirects** > select your list > **Save and Deploy**.

![Create a new Bulk redirects](/images/pages/how-to//create_new_bulk_redirect.png)

To test that your redirect worked, go to the Target URL and double-click the URL as if to copy it. If the URL does not display `www`, your change has successfully propagated.

## Related resources

* [Handle redirects with Bulk Redirects](/rules/url-forwarding/bulk-redirects/)
