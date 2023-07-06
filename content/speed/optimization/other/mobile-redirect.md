---
pcx_content_type: reference
source: https://support.cloudflare.com/hc/en-us/articles/200168336-Understanding-Cloudflare-Mobile-Redirect
title: Mobile Redirect
weight: 4
---

# Mobile Redirect

Mobile Redirect allows you to automatically redirect mobile device visitors to a mobile-optimized website or subdomain home page. The redirect is done at the edge of Cloudflare's network, improving the user experience by eliminating a roundtrip to your server.

You must have Cloudflare's performance service enabled (["orange clouded"](https://support.cloudflare.com/hc/articles/200169626) in the **DNS** Settings) for the redirect to be active.

{{<Aside type="note">}}
The mobile redirect service is not available to domains signed up
through hosting partners initially. Want to be notified when it is? [Let
us know](https://support.cloudflare.com/requests/new).
{{</Aside>}}
___

## Enable Mobile Redirect

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and zone.
3. Go to **Speed** > **Optimization** > **Other**.
4. For **Mobile Redirect**, select the subdomain that you would like to redirect from the drop down list.
5. Choose **Keep Path** or **Drop Path**.

    {{<Aside type="note">}}
**Keep Path** will redirect all mobile requests to the same resource hosted on your mobile-optimized website. **Drop Path** will redirect all mobile requests to your mobile-optimized website homepage.
    {{</Aside>}}

6. Toggle switch to **On**.

___

## Compatible mobile devices

Browsers from the following mobile devices are redirected to the mobile-optimized subdomain:

-   iPhone
-   Android
-   iPod
-   Blackberry
-   Palm
-   Mobile
-   Windows CE
-   Opera mini
-   AvantGo
-   Docomo

{{<Aside type="note">}}
The iPad and Android tablet user agents will not match and trigger the mobile redirect feature.
{{</Aside>}}

___

## Allow full site view

To allow your end users to view the full site on mobile, you'll need to set the value of the following cookie _on the root domain only_ to 0 (zero) at your origin server:

`__cf_mob_redir = 0; domain=.example.com`

In this example, replace .example.com with your root domain.

To renew the mobile redirect, delete the cookie, or set it to expire after whatever duration you choose.

___

## Relevant resources

-   [Identifying subdomains compatible with Cloudflare's proxy](https://support.cloudflare.com/hc/articles/200169626)