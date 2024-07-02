---
pcx_content_type: reference
source: https://support.cloudflare.com/hc/en-us/articles/200168336-Understanding-Cloudflare-Mobile-Redirect
title: Mobile Redirect
weight: 4
---

{{<heading-pill style="deprecated">}} Mobile Redirect {{</heading-pill>}}

{{<Aside type="warning" header="Deprecation notice">}}
Mobile Redirect is deprecated and will be removed on 2024-06-15. After this date, Mobile Redirect will no longer be available via the Cloudflare dashboard, API, or Terraform.

You should configure [Single Redirects](/rules/url-forwarding/single-redirects/) instead of using Mobile Redirect. Refer to [Perform mobile redirects](/rules/url-forwarding/single-redirects/examples/#perform-mobile-redirects) for examples of performing mobile redirects with Single Redirects.
{{</Aside>}}

Mobile Redirect allows you to automatically redirect mobile device visitors to a mobile-optimized website or subdomain home page. The redirect is done at the edge of Cloudflare's network, improving the user experience by eliminating a roundtrip to your server.

{{<Aside type="note">}}
The mobile redirect service is not available to domains signed up
through hosting partners.
{{</Aside>}}

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

To allow your end users to view the full site on mobile, you will need to set the value of the following cookie _on the apex domain only_ to 0 (zero) at your origin server:

`__cf_mob_redir = 0; domain=.example.com`

In this example, replace .example.com with your apex domain.

To renew the mobile redirect, delete the cookie, or set it to expire after whatever duration you choose.
