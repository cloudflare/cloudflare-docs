---
pcx_content_type: concept
title: Automatic HTTPS Rewrites
weight: 14
---

# Automatic HTTPS Rewrites

Automatic HTTPS Rewrites prevents end users from seeing "mixed content" errors by rewriting URLs from `http` to `https` for resources or links on your web site that can be served with HTTPS.

## Availability

{{<feature-table id="ssl.automatic_https_rewrites">}}

## Additional details

If your site contains links or references to HTTP URLs that are also available securely via HTTPS, Automatic HTTPS Rewrites can help. If you connect to your site over HTTPS and the lock icon is not present, or has a yellow warning triangle on it, your site may contain references to HTTP assets (“mixed content”).

Mixed content is often due to factors not under the website owner’s control such as embedded third-party content or complex content management systems. By rewriting URLs from “http” to “https”, Automatic HTTPS Rewrites simplifies the task of making your entire website available over HTTPS, helping to eliminate mixed content errors and ensuring that all data loaded by your website is protected from eavesdropping and tampering.

{{<Aside type="note">}}

For security reasons, this feature will run on URLs pointing to `localhost` if the URL is fetching an active resource (script, iframe, link, object, etc.).

{{</Aside>}}

## Enable Automatic HTTPS Rewrites

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To enable **Automatic HTTPS Rewrites** in the dashboard:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Go to **SSL/TLS** > **Edge Certificates**.
3.  For **Automatic HTTPS Rewrites**, switch the toggle to **On**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable or disable **Automatic HTTPS Rewrites** with the API, send a [`PATCH`](/api/operations/zone-settings-change-automatic-https-rewrites-setting) request with the `value` parameter set to your desired setting (`"on"` or `"off"`).
 
{{</tab>}}
{{</tabs>}}

## Limitations

Before a rewrite is applied, Cloudflare checks the HTTP resources to ensure they are accessible via HTTPS. If they are not available over HTTPS, Cloudflare cannot rewrite the URL.

Some resources are loaded by JavaScript or CSS via HTTP when the site is loaded in a browser. You will see mixed content warnings in those situations. To determine which URLs do not have HTTPS support, Cloudflare uses data from [EFF’s HTTPS Everywhere](https://www.eff.org/https-everywhere/faq#how-do-i-add-my-own-site-to-https-everywhere) and [Chrome’s HSTS preload list](https://hstspreload.org). If your zone is not on one of these lists, only active content will be rewritten. Passive content (such as images) will not be rewritten and will still cause mixed content errors.

If a third-party domain supports HTTPS and is not rewritten automatically, you can manually change those links to relative links or HTTPS links. Alternatively, you can ask the third-party domain owner to submit their site for inclusion in the HTTPS Everywhere rulesets, which [accept pull requests on GitHub](https://github.com/EFForg/https-everywhere/). For more information on how to fix mixed content errors, refer to [Troubleshooting mixed content errors](https://support.cloudflare.com/hc/articles/200170476).