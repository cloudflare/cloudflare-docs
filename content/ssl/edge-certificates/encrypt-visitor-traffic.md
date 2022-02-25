---
pcx-content-type: how-to
order: 3
---

# Enforce HTTPS connections

Even with an active SSL/TLS certificate, visitors can still access resources over unsecured HTTP connections.

It is best to redirect this traffic over HTTPS, as well as ensure other resources (such as images) are also loaded over HTTPS.

## Prerequisites

Before trying to enforce HTTPS connections, make sure that your application has an active [edge certificate](/get-started#step-1--choose-an-edge-certificate). Otherwise, visitors will not be able to access your application at all.

Also, make sure that your [SSL encryption mode](/origin-configuration/ssl-modes) is not set to **Off**. Otherwise, Cloudflare will redirect all visitor connections automatically to HTTP.

## Step 1 — Evaluate existing redirects

To make sure that your visitors do not get stuck in a [redirect loop](https://support.cloudflare.com/hc/articles/115000219871), evaluate existing redirects at your origin server and within the Cloudflare dashboard.

You should generally avoid redirects at your origin server. Not only are you likely to forget about them, but they also reduce application performance. It is much faster for Cloudflare to redirect requests before they ever reach your origin.

Make sure that your redirects within Cloudflare are not forwarding traffic to URLs starting with `http`.

## Step 2 — Rewrite HTTP URLs

If your application contains links or references to HTTP URLs, your visitors might see [mixed content errors](https://support.cloudflare.com/hc/articles/200170476) when accessing an HTTPS page.

To avoid these issues, enable [Automatic HTTPS Rewrites](/edge-certificates/additional-options/automatic-https-rewrites) and pay attention to which HTTP requests are still reaching your origin server.

## Step 3 — Redirect traffic to HTTPS

If your entire application can support HTTPS traffic, enable [Always Use HTTPS](/edge-certificates/additional-options/always-use-https#encrypt-all-visitor-traffic).

If only some parts of your application can support HTTPS traffic, set up [Forwarding Rules](/edge-certificates/additional-options/always-use-https#encrypt-some-visitor-traffic) to redirect specific subfolders or subdomains to HTTPS.
