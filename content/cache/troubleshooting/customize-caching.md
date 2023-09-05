---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360021023712-Best-Practices-Speed-up-your-Site-with-Custom-Caching-via-Cloudflare-Page-Rules
title: Customize Caching
---

# Customize Caching with Cloudflare Rules

Caching is a fundamental feature of the Cloudflare Content Delivery Network (CDN). As such, our global network automatically caches a lot of content around the world. When visitors request a cached resource, it is served from the data center closest to them and therefore, the content loads faster.

You can speed up your site’s performance even further thanks to the multiple caching settings available in [Cache rules](/cache/how-to/cache-rules/) or [Page rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/).

___

## Before you begin

Cloudflare does not cache HTML resources automatically. This prevents us from unintentionally caching pages that often contain dynamic elements. For example, the content on certain HTML pages may change based on specific visitor characteristics, such as authentication, personalization, and shopping cart information.

However, you can configure HTML caching through specific Cloudflare Page Rules settings. The degree of HTML caching flexibility varies based on your domain plan as described in the best practice sections below.

When configuring caching settings in the **Page Rules** app, you are essentially manipulating certain options of the **Caching** app. The difference lies in that through **Page Rules**, you apply the caching settings at the URL level (not the entire site), after matching a specific pattern defined in a custom page rule. That way, you have fine-grained control over which specific resources to cache.

For background information on Cloudflare’s caching tools and options, consult:

-   [Which file extensions does Cloudflare cache for static content?](/cache/concepts/default-cache-behavior/)
-   [Getting started with Cloudflare caching](/cache/get-started/)
-   [What are Cloudflare's caching levels?](/cache/how-to/set-caching-levels)

___

## Cache static, anonymous HTML (all domains)

All domain plans can use the _Cache Everything_ setting in the **Page Rules** app.

However, this option caches all HTML regardless of the presence of dynamic content. If you use this approach to cache pages that contain dynamic content, it is quite likely that visitors will get information that is not intended for them.

To add a _Cache Everything_ page rule:

1.  Within an application, go to **Rules >** **Page Rules**.
2.  Click either _Create Page Rule_, or the wrench icon next to an existing page rule.
3.  Fill in the appropriate URL pattern.
4.  Click _Add a Setting_, then select the _Cache Level_ setting name.
5.  Select the _Cache Everything_ setting value.
6.  Save and deploy the rule.

In conclusion, this recommendation is only appropriate for HTML pages that are static and anonymous. To learn more, refer to [How do I use Cache Everything with Cloudflare?](/cache/concepts/customize-cache/)

___

## Cache HTML selectively (Business and Enterprise domains)

Customers with Business and Enterprise domains have additional Page Rules settings that can be combined to selectively cache HTML content based on whether the page contains dynamic information.

Below, we provide links to articles with specific instructions on implementing this recommendation. However, we can summarize the process as follows:

1. Create a new page rule for the desired URL pattern.

2. Add the following three settings:

-   _Cache Level: Cache Everything_ \- to act as catch all for static, anonymous content
-   _Bypass Cache on Cookie_ (available to Business and Enterprise domains only) - to bypass caching everything if the request has a matching cookie
-   _Edge Cache TTL_ \- to specify how long Cloudflare should keep the cached resource in our edge network before asking the origin for it again

3. Save and deploy your new rule

{{<Aside type="note">}}
As an alternative to *Edge Cache TTL*, you could use the [Origin Cache Control](/cache/concepts/cache-control/) setting if you believe the cache-control headers set in your origin server are appropriate.
{{</Aside>}}

To learn more about the technique described, consult:

-   [Caching Anonymous Page Views](https://blog.cloudflare.com/caching-anonymous-page-views/)
-   [Caching Anonymous Page Views with WordPress or WooCommerce](/support/third-party-software/content-management-system-cms/caching-static-html-with-wordpresswoocommerce/)
-   [Caching Anonymous Page Views with Magento 1 and Magento 2](/support/third-party-software/e-commerce/caching-static-html-with-magento-business-and-enterprise-only/)
-   [How do I cache static HTML?](/cache/concepts/customize-cache/)

Note that the Cloudflare **Caching** app allows you to purge the cache so that new requests are sent to the origin for re-fetching. To learn more, refer to [How do I purge my cache?](/cache/how-to/purge-cache/)
