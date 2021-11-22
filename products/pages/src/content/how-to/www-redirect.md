---
pcx-content-type: how-to
---

# Redirecting www to domain apex

In this tutorial, you will learn how to redirect the `www` subdomain to your apex domain (`example.com`). This is a common question and can be achieved by using [Page Rules](https://support.cloudflare.com/hc/en-us/articles/218411427).

To do this, you will need a proxied (orange-clouded) `www` record. You need to create the record so that DNS can look it up and it will need to be proxied so that Cloudflare can handle the redirect.

Firstly, create a DNS record for your `www` subdomain. It is recommended that this is either an A or AAAA with the value of `192.0.2.1` or `100::` respectively.

![www record](./media/www_subdomain.png)

Next, make the Page Rule which will handle the redirect. For this, you will make it so all paths get redirected and it is done with a 301 (Permanent Redirect). Matching all paths allows for someone visiting `www.example.com/blog/category/example` to be redirected to `example.com/blog/category/example`.

To do this, navigate to [Page Rules in the dashboard](https://dash.cloudflare.com?to=/:account/:zone/rules) and click "Create Page Rule". Then set the target to `www.example.com/*`, the `/*` is what matches all paths. Pick "Forwarding URL" from the dropdown and select the "301 - Permanent Redirect" option from the status code dropdown. Finally, for the Forwarding URL location, we want to set it to `example.com/$1`, the `$1` will be replaced by our wildcard match in target (the `*`).

![Page Rule redirect](./media/www_redirect_pagerule.png)

Finally, click "Save" and wait a few seconds for your rule to propagate!