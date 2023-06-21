---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200170076-Understanding-Cloudflare-Under-Attack-mode-advanced-DDOS-protection-
title: Understanding Cloudflare Under Attack mode (advanced DDOS protection)
---

# Understanding Cloudflare Under Attack mode (advanced DDOS protection)



## Overview

{{<Aside type="note">}}
The Under Attack mode requires your browser to support Javascript to
display and pass the interstitial page, it is expected to observe impact
on third party analytics tools.
{{</Aside>}}

Cloudflare **Under Attack Mode** performs additional security checks to help mitigate Layer 7 DDoS attacks. Validated users access your website and suspicious traffic is blocked. It is designed to be used as one of the last resorts when a zone is under attacked (and will temporarily pause access to your site and impact your site analytics).

When enabled, visitors receive an interstitial page.

{{<Aside type="tip">}}
To preview what **I\'m Under Attack** mode looks like for your visitors,
go to your [Custom
pages](https://dash.cloudflare.com/?to=/:account/configurations/custom-pages).
Then, next to **I\'m Under Attack Mode™ Challenge**, click **Custom
Pages** \> **View default**.
{{</Aside>}}

The "_Checking your browser before accessing_..." challenge determines whether to block or allow a visitor within 5 seconds.  After passing the challenge, the visitor does not observe another challenge until the duration configured in **Challenge Passage**, in **Security** > **Settings**.

___

Depending on your needs, there are a couple of possible configurations:

-   Enable **I'm Under Attack** mode outright for the entire site:
    -   Log in to your Cloudflare account.
    -   Select the domain to protect.
    -   Navigate to **Security** > **Settings**.
    -   Under **Security Level**, select **I'm Under Attack!**.
-   Enable **I'm Under Attack** mode for specific web pages or sections of your site using a [page rule](https://support.cloudflare.com/hc/en-us/articles/200172336-How-do-I-create-a-Page-Rule-).
-   Conversely, use a [page rule](https://support.cloudflare.com/hc/en-us/articles/200172336-How-do-I-create-a-Page-Rule-) to _disable_ **I'm Under Attack** mode (by setting **Security Level** to **Off**) for areas of your site broken by **I'm Under Attack** mode or known to not be attacked.
-   Enable **I'm Under Attack** mode (or other challenges) for specific ASNs (hosts/ISPs that own IP addresses — for example, Amazon has an ASN, Cloudflare has an ASN, Comcast has an ASN, etc.; this is useful if a majority of attack traffic comes from a specific host), countries, or IP ranges using [IP Access Rules](https://support.cloudflare.com/hc/en-us/articles/217074967-How-do-I-control-access-to-my-site-).

___

## Related resources

-   [Challenge Passage](https://support.cloudflare.com/hc/articles/200170136)
