---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360038470312-Understanding-SameSite-cookie-interaction-with-Cloudflare
title: Understanding SameSite cookie interaction with Cloudflare
---

# Understanding SameSite cookie interaction with Cloudflare



## Overview

[Google Chrome’s SameSite cookie](https://www.chromium.org/updates/same-site) changes how Google Chrome handles the SameSite control. Google enforces SameSite to protect against marketing cookies that track users and Cross-site Request Forgery (CSRF) that allows attackers to steal or manipulate your cookies.  

The SameSite cookie has 3 different modes:

-   **Strict**: Cookies are created by the first-party (the visited domain). For example, a first-party cookie is set by Cloudflare when visiting Cloudflare.com.
-   **Lax**: Cookies are only sent to the domain apex (e.g. _\*.foo.com_).  For example, if someone (_blog.naughty.com_) hotlinked an image (_img.foo.com/bar.png_), the client doesn’t send a cookie to _img.foo.com_ since it is neither the first-party nor apex context.
-   **None**: Cookies are sent with all requests.

SameSite settings for [Cloudflare cookies](https://support.cloudflare.com/hc/articles/200170156) include:

| Cloudflare Cookie | SameSite Setting | HTTPS Only |
| --- | --- | --- |
| \_\_cf\_bm | SameSite=None; Secure | Yes |
| cf\_clearance | SameSite=None; Secure | Yes |
| \_\_cflb | SameSite=Lax | No |

When configuring SameSite attributes on session affinity cookies, it is recommended that you set the values. The value `Auto` is translated to `Lax` if **Always Use HTTPS** is enabled, or `None` if **Always Use HTTPS** is disabled. When using the value `None`, the secure attribute cannot be set to `Never`.

- Default value: `Auto`
- Valid values: `Auto`, `Lax`, `None`, `Script`.

___

## Known issues with SameSite and cf\_clearance cookies

When a [Cloudflare Interactive Challenge](https://support.cloudflare.com/hc/articles/200170136) or JavaScript challenge is solved such as for a [**Firewall Rule**](https://support.cloudflare.com/hc/articles/360016473712) or [**IP Access Rule**](https://support.cloudflare.com/hc/articles/217074967), a **cf\_clearance** cookie is set in the client browser. The _cf\_clearance_ cookie has a default lifetime of 30 minutes but is configured via [**Challenge Passage**](https://support.cloudflare.com/hc/articles/200170136#2dwCrNWIMnNJDP6AVjEQ3e) within the **Settings** tab of the Cloudflare **Firewall** app. 

Cloudflare uses **SameSite**\=_None_ in the **cf\_clearance** cookie so that visitor requests from different hostnames are not met with subsequent challenges or errors. When **SameSite**\=_None_ is used, it must be set in conjunction with the _Secure_ flag.

Use of the _Secure_ flag requires sending the cookie via an HTTPS connection.  The **cf\_clearance** cookie defaults to **SameSite**\=_Lax_ if using HTTP on any part of your website and may cause website issues.

If using HTTP on any part of your website, the **cf\_clearance** cookie defaults to **SameSite**\=_Lax_, which may cause your website not to function properly. To resolve the issue, move your website traffic to HTTPS.  Cloudflare offers two features to assist: 

-   [**Automatic HTTPS Rewrites**](/ssl/edge-certificates/additional-options/automatic-https-rewrites) and 
-   [**Always Use HTTPS**](/ssl/edge-certificates/additional-options/always-use-https).

___

## Related resources

-   [Learn more about the SameSite cookie](https://web.dev/samesite-cookies-explained/) 
-   [Cloudflare Cookies](/fundamentals/get-started/reference/cloudflare-cookies/)
-   [Cloudflare SSL FAQ](https://support.cloudflare.com/hc/articles/204144518#h_999722138611548960019807)
-   [Automatic HTTPS Rewrites](/ssl/edge-certificates/additional-options/automatic-https-rewrites/)
