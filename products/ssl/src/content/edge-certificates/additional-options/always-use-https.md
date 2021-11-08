---
order: 14
pcx-content-type: how-to
---

import AlwaysUseHTTPSDefinition from "../../_partials/_always-use-https-definition.md"

# Always Use HTTPS 

<AlwaysUseHTTPSDefinition/>

## How to redirect all visitors to HTTPS/SSL

You can redirect your domain visitors to HTTP/SSL through SSL/TLS or Page Rules, depending on if you want to redirect traffic for all subdomains or if you do not want your whole site to be redirected to HTTPS.

### SSL/TLS 

To redirect traffic for all subdomains and hosts in your domain:
1. Log into your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
1. Navigate to **SSL/TLS** > **Edge Certificates**.
1. For **Always Use HTTPS**, switch the toggle to **On**.

### Page Rules 

If you do not want your whole site redirected to HTTPS, redirect on a URL basis using Cloudflare [Page Rules](https://support.cloudflare.com/hc/en-us/articles/218411427).

While protecting your site via Cloudflare, it is not recommended to perform redirects at your origin web server:

* Page Rule redirects are processed at the Cloudflare edge resulting in quicker response and reduced requests to your server.
* Origin web server redirects can cause [redirect loop errors](https://support.cloudflare.com/hc/en-us/articles/115000219871).

When configuring Page Rules, the _Always use HTTPS_ action is the simplest method to redirect HTTP requests to HTTPS.  You can also use the _Forwarding URL_ action with a _301_ redirect if you need to redirect to another subdomain in addition to forcing HTTPS. For example, a Page Rule match for

``http://example.com/*``

with a _Forwarding URL_ of

``https://www.example.com/$1``

will redirect requests for the example.com root domain to the www.example.com subdomain while preserving the URL directory.

<Aside type="note">

The _Always Use HTTPS_ action will only appear if your zone has an active Cloudflare SSL certificate.

</Aside>

Forcing HTTPS does not resolve issues with [mixed content](https://support.cloudflare.com/hc/articles/200170476), as browsers check the protocol of included resources before making a request. You will need to use only relative links or HTTPS links on pages that you force to HTTPS. Cloudflare can automatically resolve some mixed-content links using our [Automatic HTTPS Rewrites](/edge-certificates/additional-options/automatic-https-rewrites) functionality.
