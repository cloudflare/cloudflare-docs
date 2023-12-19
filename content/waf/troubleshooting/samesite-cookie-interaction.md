---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360038470312-Understanding-SameSite-cookie-interaction-with-Cloudflare
title: SameSite cookie interaction with Cloudflare
weight: 3
---

# SameSite cookie interaction with Cloudflare

[Google Chrome enforces SameSite cookie behavior](https://www.chromium.org/updates/same-site) to protect against marketing cookies that track users and Cross-site Request Forgery (CSRF) that allows attackers to steal or manipulate your cookies.  

The `SameSite` cookie attribute has three different modes:

- **Strict**: Cookies are created by the first party (the visited domain). For example, a first-party cookie is set by Cloudflare when visiting `cloudflare.com`.
- **Lax**: Cookies are only sent to the {{<glossary-tooltip term_id="apex domain">}}apex domain{{</glossary-tooltip>}} (such as `example.com`). For example, if someone (`blog.example.net`) hotlinked an image (`img.example.com/bar.png`), the client does not send a cookie to `img.example.com` since it is neither the first-party nor apex context.
- **None**: Cookies are sent with all requests.

`SameSite` settings for [Cloudflare cookies](/fundamentals/reference/policies-compliances/cloudflare-cookies/) include:

| Cloudflare cookie | SameSite setting        | HTTPS Only |
|-------------------|-------------------------|------------|
| `__cf_bm`         | `SameSite=None; Secure` | Yes        |
| `cf_clearance`    | `SameSite=None; Secure` | Yes        |
| `__cflb`          | `SameSite=Lax`          | No         |

## SameSite in session affinity cookies

Currently, to configure the `SameSite` attribute on the [`__cflb` session affinity cookie](/fundamentals/reference/policies-compliances/cloudflare-cookies/#__cflb-cookie-for-cloudflare-load-balancer-session-affinity) you must use the Cloudflare API (for example, the [Create Load Balancer](/api/operations/load-balancers-create-load-balancer) operation).

To configure the `SameSite` cookie attribute for the session affinity cookie via API, include the `samesite` JSON attribute in your HTTP request, inside the `session_affinity_attributes` object. The value `Auto` is translated to `Lax` if **Always Use HTTPS** is enabled, or `None` if **Always Use HTTPS** is disabled. When using the value `None`, the `secure` JSON attribute cannot be set to `Never`.

**`samesite` attribute**
- Default value: `Auto`
- Valid values: `Auto`, `Lax`, `None`, `Strict`.

**`secure` attribute**
- Default value: `Auto`
- Valid values: `Auto`, `Always`, `Never`.

___

## Known issues with SameSite and `cf_clearance` cookies

When a visitor solves a [challenge](/waf/reference/cloudflare-challenges/) presented due to a [WAF custom rule](/waf/custom-rules/) or an [IP Access rule](/waf/tools/ip-access-rules/), a `cf_clearance` cookie is set in the visitor's browser. The `cf_clearance` cookie has a default lifetime of 30 minutes, which you can configure via [Challenge Passage](/waf/tools/challenge-passage/).

Cloudflare uses `SameSite=None` in the `cf_clearance` cookie so that visitor requests from different hostnames are not met with later challenges or errors. When `SameSite=None` is used, it must be set in conjunction with the `Secure` flag.

Using the `Secure` flag requires sending the cookie via an HTTPS connection. If you use HTTP on any part of your website, the `cf_clearance` cookie defaults to `SameSite=Lax`, which may cause your website not to function properly.

To resolve the issue, move your website traffic to HTTPS. Cloudflare offers two features for this purpose: 

- [Automatic HTTPS Rewrites](/ssl/edge-certificates/additional-options/automatic-https-rewrites/)
- [Always Use HTTPS](/ssl/edge-certificates/additional-options/always-use-https/)

___

## Related resources

- [SameSite cookies explained](https://web.dev/samesite-cookies-explained/) 
- [Cloudflare Cookies](/fundamentals/reference/policies-compliances/cloudflare-cookies/)
- [Cloudflare SSL FAQ](/ssl/troubleshooting/faq/)
- [Automatic HTTPS Rewrites](/ssl/edge-certificates/additional-options/automatic-https-rewrites/)
- [Always Use HTTPS](/ssl/edge-certificates/additional-options/always-use-https/)