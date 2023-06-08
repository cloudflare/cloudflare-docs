---
pcx_content_type: how-to
title: Redirecting *.pages.dev to a Custom Domain
---

# Redirecting *.pages.dev to a Custom Domain

In this guide, you will learn how to redirect your `*.pages.dev` subdomain to your Custom Domain (`example.com`). This is a common question and can be achieved by using [Bulk Redirects](/rules/url-forwarding/bulk-redirects/).

To do this:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/pages/view/:pages-project/domains), and select your account and Pages Project.
2. Ensure that your custom domain is listed in the **Custom domains** section. If it is not, add it by clicking **Set up a custom domain**.

![Ensure custom domain has been added to Pages](/pages/how-to/media/custom-domain-dash.png)

3. Verify that Access has not been enabled on your Pages Project. While you can apply Access policies to your Custom Domain, if you enable them on your `*.pages.dev` domain, then your custom domain will not function. You can view Access Policies by going to the [Zero Trust Dash](https://one.dash.cloudflare.com), selecting your account, and going to **Access** > **Applications**.

![Check whether Access has been enabled for your project](/pages/how-to/media/onedash-access-apps.png)

4. Next, go to **Account Home** > **Bulk Redirects** > **Create a new Bulk Redirects list** > **Create new list**.

![Create a new Bulk redirects list](/pages/how-to/media/create_a_new_bulk_redirect_list.png)

5. In the content type, select **Redirect**. 
6. Add your `*.pages.dev` Project Subdomain as your source URL.
7. Add your target custom domain URL. Note that you must include `https://` before the apex domain. 
8. Select **Edit parameters** > select **Preserve query string**, **Subpath matching** and **Preserve path suffix**.
9. *Optional*: Tick the **Include subdomains** box. This will automatically redirect all of the preview URLs to your custom domain.

![Follow the steps above to correctly configure your list](/pages/how-to/media/pages-dev-redirect-parameters.png)

10. Select **Add to list**.
11. Go to **Bulk Redirects** > **Create Bulk Redirects** > select your list > **Save and Deploy**.

![Create a new Bulk redirects](/pages/how-to/media/create_new_bulk_redirect.png)

To test that your redirect worked, go to your `*.pages.dev` domain and double-click the URL as if to copy it. If the URL is now set to your custom domain, then the rule has propagated.

## Related resources

* [Handle redirects with Bulk Redirects](/rules/url-forwarding/bulk-redirects/)
