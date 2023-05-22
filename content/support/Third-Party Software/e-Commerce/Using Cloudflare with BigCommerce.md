---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/5950644218253-Using-Cloudflare-with-BigCommerce
title: Using Cloudflare with BigCommerce
---

# Using Cloudflare with BigCommerce



## Overview

Cloudflare partners with BigCommerce to provide BigCommerce customers’ websites with Cloudflare’s performance and security benefits. Cloudflare’s Enterprise plans are still available for BigCommerce customers that choose to use their own Cloudflare accounts to proxy web traffic. For those customers, enabling Cloudflare with your own account in addition to BigCommerce’s Cloudflare benefits is called Orange-to-Orange (O2O). O2O applies both your and BigCommerce’s security settings.

Website visitor →  End customer Cloudflare (CF) Proxy → BigCommerce CF Proxy → BigCommerce Origin

![In an orange to orange topology, Cloudflare Enterprise customers can apply their own account security settings to BigCommerce.](/support/static/o2o-bigcommerce.png)

### Benefits

O2O benefits include your own version of Cloudflare’s WAF, Bot Management, and Waiting Room. Additionally, O2O routing also enables you to take advantage of Cloudflare zones specifically customized for BigCommerce traffic.

___

## Enabling O2O for your BigCommerce website

Enabling O2O is only available on the Cloudflare Enterprise plan.

To enable O2O on your account, you need to [configure a CNAME DNS record](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) that points your Hostname to the domain **shops.mybigcommerce.com**. Set **Proxy status** to **Proxied**.

___

## Best practices

Certain Cloudflare features, when used with O2O, can interrupt the flow of traffic to your BigCommerce site or display incorrect data to your visitors. Review best practices before using the following features.

### Caching

Customers should disable caching for all hostnames that are routed through BigCommerce’s Cloudflare zones. Traffic for other hostnames that are not CNAME’d to BigCommerce’s zone can remain cached on the customer’s zone.

By default, caching of HTML pages is disabled. Customers should not enable caching of HTML because the HTML content is dynamic.  

### Page Rules

Incorrectly configured [Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/) that match the subdomain used for BigCommerce may block or interfere with the flow of visitors to your website.

### Workers

Similar to Page Rules, [Workers](/workers/) may interfere with the flow of traffic to your website.  Write Workers with caution. It is advisable to exclude the subdomain used with BigCommerce from the Worker route.

### Argo Smart Routing

[Argo Smart Routing](/argo-smart-routing/get-started/) is not compatible for customers that have O2O configured. Traffic for other hostnames that are not CNAME’d to BigCommerce’s zones can receive the benefits of Argo smart routing.

### Load Balancing

[Load Balancing](/load-balancing/) is not compatible with O2O for customers.

___

## For additional help

If you are a BigCommerce customer setting up your own Cloudflare account, contact your Cloudflare account team or [Cloudflare Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/) for help in resolving issues. Cloudflare will turn to BigCommerce if there are technical issues that Cloudflare cannot resolve.
