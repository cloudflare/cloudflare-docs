---
order: 14
pcx-content-type: how-to
---

import AlwaysUseHTTPSDefinition from "../../_partials/_always-use-https-definition.md"

# Always Use HTTPS 

<AlwaysUseHTTPSDefinition/>

## How to redirect all visitors to HTTPS/SSL

You can redirect your domain visitors to HTTPS through SSL/TLS or Page Rules, depending on if you want to redirect traffic for all subdomains or only specific subdomains. While protecting your site via Cloudflare, it is not recommended to perform redirects at your origin web server, as this can cause [redirect loop errors](https://support.cloudflare.com/hc/articles/115000219871).

### SSL/TLS 

To redirect traffic for all subdomains and hosts in your domain:
1. Log into your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
1. Navigate to **SSL/TLS** > **Edge Certificates**.
1. For **Always Use HTTPS**, switch the toggle to **On**.

<Aside type="note">

The _Always Use HTTPS_ action will only appear if your zone has an active Cloudflare SSL certificate.

</Aside>

### Page Rules 

If you only want specific subdomains redirected to HTTPS, redirect on a URL basis using Cloudflare [Page Rules](https://support.cloudflare.com/hc/articles/218411427).

1. Navigate to **Rules** > **Page Rules** > **Create Page Rules** 
1. Enter the URL, for example ``http://example.com/*``
1. Choose _Forwarding URL_ from the drop down menu.
1. Click _Select Status Code_ and choose _301_ (Permanent Redirect) or _302_ (Temporary Redirect).
1. Enter the destination URL (``https://www.example.com/$1``).

This rule will redirect requests for the example.com root domain to the www.example.com subdomain while preserving the URL directory.

### Limitations

Forcing HTTPS does not resolve issues with [mixed content](https://support.cloudflare.com/hc/articles/200170476), as browsers check the protocol of included resources before making a request. You will need to use only relative links or HTTPS links on pages that you force to HTTPS. Cloudflare can automatically resolve some mixed-content links using our [Automatic HTTPS Rewrites](/edge-certificates/additional-options/automatic-https-rewrites) functionality.
