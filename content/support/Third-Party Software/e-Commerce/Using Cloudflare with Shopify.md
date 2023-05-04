---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/203464660-Using-Cloudflare-with-Shopify
title: Using Cloudflare with Shopify
---

# Using Cloudflare with Shopify



## Overview

Cloudflare partners with Shopify to provide all Shopify merchant websites with Cloudflare’s performance and security benefits. Shopify merchants can also use their own Cloudflare account to proxy web traffic through Cloudflare with an Enterprise plan. Enabling Cloudflare with your own account in addition to Shopify’s Cloudflare benefits is called Orange-to-Orange (O2O). O2O applies both your and Shopify’s security settings.

![When you enable Cloudflare on your Shopify account, we apply your Cloudflare settings and Shopify's Cloudflare settings to traffic.](/support/static/hc-ext-shopify_o2o.png)

___

## Enabling O2O for your Shopify website

Enabling O2O is only available on the Cloudflare Enterprise plan.

To enable O2O on your account, you need a CNAME DNS record that points your shop’s domain to the domain shops.myshopify.com. Orange cloud the record.

After adding the DNS record with proxy enabled, contact your account team to enable O2O on your shop domain.

___

## Best practices

When used with O2O, certain Cloudflare features can interrupt the flow of traffic to your Shopify store or display incorrect data to your visitors, meaning you should:

-   Not use the following Cloudflare features:
    -   [HTML caching](/cache/)
    -   [Custom firewall rules](/firewall/)
    -   [Rate limiting](https://support.cloudflare.com/hc/articles/115001635128)
    -   [Argo Smart Routing](https://support.cloudflare.com/hc/articles/115000224552)
    -   [Load Balancing](/load-balancing/)
    -   [IPv6](https://support.cloudflare.com/hc/articles/229666767)
-   Be careful with the following Cloudflare features:
    -   [Page rules](https://support.cloudflare.com/hc/articles/218411427): Incorrectly configured Page Rules that match the subdomain used for Shopify may block or distort the flow of ecommerce visitors to your website.
    -   [Workers](/workers/): Similar to Page Rules, Workers may interrupt the flow of traffic to your website and consequently reduce revenue. Write Workers with caution. It is advisable to exclude the subdomain used with Shopify from the Worker route.
    -   [DNS CAA records](/ssl/edge-certificates/caa-records/): Shopify issues SSL/TLS certificates for merchant domains using Let’s Encrypt. If you add any DNS CAA records, you must select Let’s Encrypt as the Certificate Authority (CA) or HTTPS connections may fail.

{{<Aside type="note">}}
Cloudflare cannot fix any configuration issues with the above features
for O2O.
{{</Aside>}}

___

## For additional help

If you are a Shopify merchant setting up your own Cloudflare account, contact your account team or Cloudflare Support for help in resolving issues. Cloudflare will turn to Shopify if there are technical issues that Cloudflare cannot resolve.

-   [Contacting Cloudflare Support](https://support.cloudflare.com/hc/en-us/articles/200172476-Contacting-Cloudflare-Support)
