---
pcx_content_type: how-to
title: Redirecting www to domain apex
---

# Redirecting www to domain apex

Learn how to redirect a `www` subdomain to your apex domain (`example.com`).

This setup assumes that you already have a [custom domain](/pages/configuration/custom-domains/) attached to your Pages project.

## Setup

To redirect your `www` subdomain to your domain apex:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Bulk Redirects**.
3. [Create a bulk redirect list](/rules/url-forwarding/bulk-redirects/create-dashboard/#1-create-a-bulk-redirect-list) modeled after the following (but replacing the values as appropriate):

  {{<example>}}

  | Source URL | Target URL  | Status | Parameters |
  | ---- | ----- | ------------ | ------------ |
  | `www.example.com`    | `https://example.com` | `301`  | <ul><li>Preserve query string</li><li>Subpath matching</li><li>Preserve path suffix</li><li>Include subdomains</li></ul> |

  {{</example>}}

4. [Create a bulk redirect rule](/rules/url-forwarding/bulk-redirects/create-dashboard/#2-create-a-bulk-redirect-rule) using the list you just created.
5. Go to **DNS**.
6. Create a DNS record for the `www` subdomain. It must either be an `A` record with the `192.0.2.1` value or an `AAAA` record with the `100::` value. The new DNS record must also have Cloudflare's proxy enabled (orange-clouded) so that it can enact the Page Rule behavior that you will create next.

![Add a www record in the Cloudflare DNS dashboard](/images/pages/how-to/www_subdomain.png)

To test that your redirect worked, visit your `www` subdomain. If the URL does not display `www`, your change has successfully propagated.

## Related resources

- [Redirect `*.pages.dev` to a custom domain](/pages/how-to/redirect-to-custom-domain/)
- [Handle redirects with Bulk Redirects](/rules/url-forwarding/bulk-redirects/)
