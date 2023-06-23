---
pcx_content_type: how-to
title: Redirecting *.pages.dev to a Custom Domain
---

# Redirect *.pages.dev to a custom domain


## Background

Learn how to use [Bulk Redirects](/rules/url-forwarding/bulk-redirects/) to redirect your `*.pages.dev` subdomain to your custom domain (`example.com`). You may want to do this to ensure that your site's content is served only on the custom domain, and not the `*.pages.dev` site automatically generated on your first Pages deployment.

## Set up

To set up a redirect to a custom domain:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/pages/view/:pages-project/domains), and select your account.
2. Select **Workers & Pages** and select your Pages application.
3. Go to **Custom domains** and make sure that your custom domain is listed. If it is not, add it by clicking **Set up a custom domain**.
4. Go to **Account Home** > **Bulk Redirects**.
5. Select **Create a new Bulk Redirects list** > **Create new list**.

![Create a new Bulk redirects list](/pages/how-to/media/create_a_new_bulk_redirect_list.png)

6. In the content type, select **Redirect**. 
7. Add your application's `*.pages.dev` subdomain as your source URL.
8. Add your target custom domain URL. Note that you must include `https://` before the apex domain. 
9. Select **Edit parameters** and select **Preserve query string**, **Subpath matching** and **Preserve path suffix**.

*Optional*: Tick the **Include subdomains** box. This will automatically redirect all of the preview URLs to your custom domain.
10. Select **Add to list**.
11. Go to **Bulk Redirects** > **Create Bulk Redirects** > select your list > **Save and Deploy**.

![Create a new Bulk redirects](/pages/how-to/media/create_new_bulk_redirect.png)

To test that your redirect worked, go to your `*.pages.dev` domain and double-click the URL as if to copy it. If the URL is now set to your custom domain, then the rule has propagated.

## Related resources

* [Handle redirects with Bulk Redirects](/rules/url-forwarding/bulk-redirects/)
