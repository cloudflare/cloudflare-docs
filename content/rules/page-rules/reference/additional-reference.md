---
pcx_content_type: reference
source: https://support.cloudflare.com/hc/en-us/articles/218411427-What-do-the-custom-caching-options-mean-in-Page-Rules-#summary-of-page-rules-settings
title: Additional reference
meta:
    title: Additional reference | Page Rules
weight: 4
---

# Additional reference

{{<render file="_page-rules-migration.md">}}

## Bypass Cache on Cookie setting

This setting is available to Business and Enterprise customers.

The **Bypass Cache on Cookie** setting supports basic regular expressions (regex) as follows:

-   A pipe operator (represented by `|`) to match multiple cookies using _OR_ boolean logic. For example, `bypass=.*|PHPSESSID=.*` would bypass the cache if either a cookie called `bypass` or `PHPSESSID` were set, regardless of the cookie's value.
-   The wildcard operator (represented by `.*`), such that a rule value of `t.*st=` would match both a cookie called `test` and one called `teeest`.

Limitations include:

-   150 characters per cookie regex
-   12 wildcards per cookie regex
-   1 wildcard in between each `|` in the cookie regex

To learn how to configure **Bypass Cache on Cookie** with a variety of platforms, review these articles:

- [Caching Static HTML with WordPress/WooCommerce](/support/third-party-software/content-management-system-cms/caching-static-html-with-wordpresswoocommerce/)
- [Caching Static HTML with Magento (Business and Enterprise only)](/support/third-party-software/e-commerce/caching-static-html-with-magento-business-and-enterprise-only/)
- [Customize cache](/cache/concepts/customize-cache/)

{{<Aside type="note">}}

If you add both this setting and the enterprise-only _Cache On Cookie_ setting to the same page rule, _Cache On Cookie_ takes precedence over _Bypass Cache on Cookie_.

{{</Aside>}}

## Zone name occurrences must end with a slash

When saving a page rule, Cloudflare will ensure that there is a slash after each occurrence of the current zone name in the **If the URL matches** field. For example, if the current zone name is `example.com`, then:

-   `example.com` will be saved as `example.com/`
-   `example.com/path/example.com` will be saved as `example.com/path/example.com/`

Note that `example.com/some-path/cloudflare.com` will be saved _without_ a final slash, since the zone name is not `cloudflare.com`.

## Network ports supported by Page Rules

If you specify a port in the **If the URL matches** field of a page rule, it must be one of the following:

-   One of the HTTP/HTTPS ports [compatible with Cloudflare’s proxy](/fundamentals/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy).
-   A custom port of a [Cloudflare Spectrum](/spectrum/) HTTPS application.

## Using Page Rules with Workers

If the URL of the current request matches both a page rule and a [Workers custom route](/workers/configuration/routing/routes/), some Pages Rules settings will not be applied. For more details, refer to [Workers and Page Rules](/workers/configuration/workers-with-page-rules/).

## Page Rules are case-insensitive

The pattern entered under **If the URL matches** will not consider upper and lower case differences — `example.com/path`, `example.com/Path`, and `example.com/PATH` will be triggered the same way.

If you need your rules to consider case sensitivity, you might want to use alternative [Rules](/rules/) options instead.
