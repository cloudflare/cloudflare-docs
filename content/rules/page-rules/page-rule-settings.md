---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/218411427-What-do-the-custom-caching-options-mean-in-Page-Rules-#summary-of-page-rules-settings
title: Page Rule Settings
weight: 3
---

## Summary of Page Rules Settings

Settings control the action Cloudflare takes once a request matches the URL pattern defined in a page rule. You can use settings to enable and disable multiple Cloudflare features across several of the dashboard apps. Note that:

-   Some settings require a Pro, Business or Enterprise domain plan.
-   You can specify more than one setting to apply when the rule triggers.

Below is the full list of settings available, presented in the order that they appear in the **Cloudflare Page Rules** UI.

| **Setting** | **Description** | **Plans** |
| --- | --- | --- |
| [Always Use HTTPS](/ssl/edge-certificates/additional-options/always-use-https/) | Enable **Always Use HTTPS** feature. If enabled, any `http://` URL is converted to `https://` through a 301 redirect.<br/><br/>If this option does not appear, you do not have an active **Edge Certificate**. | All |
| [Auto Minify](/speed/optimization/content/auto-minify/) | Indicate which file extensions to minify automatically.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| [Automatic HTTPS Rewrites](/ssl/edge-certificates/additional-options/automatic-https-rewrites/) | Turn on or off **Automatic HTTPS Rewrites**.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| [Browser Cache TTL](/cache/how-to/edge-browser-cache-ttl/) | Control how long resources cached by client browsers remain valid. The Cloudflare UI and API both prohibit setting **Browser Cache TTL** to _0_ for non-Enterprise domains. | All |
| [Browser Integrity Check](/waf/tools/browser-integrity-check/) | Inspect the visitor's browser for headers commonly associated with spammers and certain bots.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| Bypass Cache on Cookie | Bypass Cache and fetch resources from the origin server if a regular expression matches against a cookie name present in the request.<br/>If you add both this setting and the _Cache On Cookie_ setting to the same page rule, _Cache On Cookie_ takes precedence over _Bypass Cache on Cookie_.<br/><br/>Refer to the [Additional details](#additional-details) to learn about limited regular expression support. | Business and Enterprise |
| [Cache By Device Type](/cache/how-to/edge-browser-cache-ttl/create-page-rules/#cache-by-device-type-enterprise-only) | Separate cached content based on the visitor’s device type.  | Enterprise |
| [Cache Deception Armor](/cache/cache-security/cache-deception-armor/) | Protect from web cache deception attacks while still allowing static assets to be cached. This setting verifies that the URL's extension matches the returned _Content-Type_. | All |
| [Cache Key](/cache/how-to/cache-keys/) | Also referred to as _Custom Cache Key_.<br/>Control specifically what variables to include when deciding which resources to cache. This allows customers to determine what to cache based on something other than just the URL. | Enterprise |
| Cache Level | Apply custom caching based on the option selected:<br/><br/>**Bypass** \- Cloudflare does not cache.<br/>**No Query String** - Delivers resources from cache when there is no query string.<br/>**Ignore Query String** \- Delivers the same resource to everyone independent of the query string.<br/>**Standard -** Caches all static content that has a query string.<br/>**Cache Everything** \-  Treats all content as static and caches all file types beyond the [Cloudflare default cached content](/cache/concepts/default-cache-behavior#default-cached-file-extensions).  Respects cache headers from the origin web server unless **Edge Cache TTL** is also set in the Page Rule. When combined with an **Edge Cache TTL** > _0_, **Cache Everything** removes cookies from the origin web server response. | All |
| Cache on Cookie | Apply the _Cache Everything_ option (_Cache Level_ setting) based on a regular expression match against a cookie name.<br/>If you add both this setting and _Bypass Cache on Cookie_ to the same page rule, _Cache On Cookie_ takes precedence over _Bypass Cache on Cookie_. |  Business and above |
| [Cache TTL by Status Code](/cache/how-to/configure-cache-status-code/) | Enterprise customers can set cache time-to-live (TTL) based on the response status from the origin web server. Cache TTL refers to the duration of a resource in the Cloudflare network before being marked as stale or discarded from cache. Status codes are returned by a resource’s origin. Setting cache TTL based on response status overrides the default cache behavior (standard caching) for static files and overrides cache instructions sent by the origin web server. To cache non-static assets, set a Cache Level of Cache Everything using a Page Rule. Setting no-store Cache-Control or a low TTL (using max-age/s-maxage) increases requests to origin web servers and decreases performance. | Enterprise |
| Disable Apps | Turn off all active **Cloudflare Apps**.<br>Note: This setting will not disable [Apps with Workers](https://cloudflareapps.com/apps/developer/docs/workers). These apps request permission to add a Worker when you are installing them. {{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| Disable Performance | Turn off [Auto Minify](/speed/optimization/content/auto-minify/), [Rocket Loader](/speed/optimization/content/rocket-loader/), [Mirage](/speed/optimization/images/mirage/), and [Polish](/images/polish). | All |
| Disable Railgun (deprecated) | Turn off the **Railgun** feature of the Cloudflare **Speed** app.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | Business and above |
| Disable Security| Turn off [Email Obfuscation](/support/more-dashboard-apps/cloudflare-scrape-shield/what-is-email-address-obfuscation/), [Rate Limiting (previous version)](/waf/reference/legacy/old-rate-limiting/), [Scrape Shield](/support/more-dashboard-apps/cloudflare-scrape-shield/), [Server Side Excludes](/support/more-dashboard-apps/cloudflare-scrape-shield/what-does-server-side-excludes-sse-do/), [URL (Zone) Lockdown](/waf/tools/zone-lockdown/), and [WAF managed rules (previous version)](/waf/reference/legacy/old-waf-managed-rules/). | All |
| Disable Zaraz | Turn off [Zaraz](/zaraz/).{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| Edge Cache TTL | Specify how long to cache a resource in the Cloudflare edge network. _Edge Cache TTL_ isn't visible in response headers. | All |
| [Email Obfuscation](/support/more-dashboard-apps/cloudflare-scrape-shield/what-is-email-address-obfuscation/) | Turn on or off **Email Obfuscation**.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| Forwarding URL | Redirects one URL to another using an `HTTP 301/302 redirect`. _Refer to [Understand wildcard matching and referencing above](#understand-wildcard-matching-and-referencing)._ | All |
| [Host Header Override](/rules/page-rules/tutorials/using-page-rules-to-rewrite-host-headers/) | Apply a specific host header.{{<render file="_origin-rule-promotion.md" productFolder="rules" withParameters="/rules/origin-rules/features/#host-header">}} | Enterprise |
| IP Geolocation Header | Cloudflare adds a _CF-IPCountry_ HTTP header containing the country code that corresponds to the visitor. | All |
| [Mirage](/speed/optimization/images/mirage/) | Turn on or off **Mirage**.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | Pro and above |
| [Opportunistic Encryption](/ssl/edge-certificates/additional-options/opportunistic-encryption/) | Turn on or off the **Opportunistic Encryption**.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| [Origin Cache Control](/cache/concepts/cache-control/) | Origin Cache Control is enabled by default for Free, Pro, and Business domains and disabled by default for Enterprise domains. |  All |
| Origin Error Page Pass-thru | Turn on or off Cloudflare error pages generated from issues sent from the origin server. If enabled, this setting triggers error pages issued by the origin. | Enterprise |
| [Polish](/images/polish/) | Apply options from the **Polish** feature of the Cloudflare **Speed** app.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | Pro and above |
| [Query String Sort](/cache/advanced-configuration/query-string-sort/) | Turn on or off the reordering of query strings. When query strings have the same structure, caching improves. | Enterprise |
| [Resolve Override](/rules/page-rules/tutorials/using-resolve-override-in-page-rules/) | Change the origin address to the value specified in this setting. {{<render file="_origin-rule-promotion.md" productFolder="rules" withParameters="/rules/origin-rules/features/#dns-record">}}| Enterprise |
| [Respect Strong ETags](/cache/reference/etag-headers/) | Turn on or off byte-for-byte equivalency checks between the Cloudflare cache and the origin server. | Enterprise |
| Response Buffering | Turn on or off whether Cloudflare should wait for an entire file from the origin server before forwarding it to the site visitor. By default, Cloudflare sends packets to the client as they arrive from the origin server. |  Enterprise |
| [Rocket Loader](/speed/optimization/content/rocket-loader/) | Turn on or off **Rocket Loader** in the Cloudflare **Speed** app.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| [Security Level](/waf/tools/security-level/) | Control options for the **Security Level** feature from the **Security** app. {{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| [Server Side Excludes](/support/more-dashboard-apps/cloudflare-scrape-shield/what-does-server-side-excludes-sse-do/)| Turn on or off the **Server Side Excludes** feature of the Cloudflare **Scrape Shield** app.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} |  All |
| [SSL](/ssl/origin-configuration/ssl-modes/) | Control options for the **SSL** feature of the **Edge Certificates** tab in the Cloudflare **SSL/TLS** app.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| True Client IP Header | Turn on or off the **True-Client-IP Header** feature of the Cloudflare **Network** app. [Learn more](/support/network/understanding-the-true-client-ip-header/). | Enterprise |
| Web Application Firewall (previous version) | Turn on or off **WAF managed rules** as defined in **Security** > **WAF** > **Managed rules**. [Learn more](/waf/reference/legacy/old-waf-managed-rules/).<br/>You cannot enable or disable individual WAF managed rules via page rules. | Pro and above |

___

## Known Issues

**Page Rule configuration issue leading to "****_Error 500 (Internal server error)_****"**

**Root cause**: This may be due to a configuration issue on a Page Rule. When creating a Page Rule that uses two wildcards, like a _Forwarding URL_ rule, it is possible to create a rule that mentions the second wildcard with the $2 placeholder. Refer to the example below:

![Example Page Rule configuration with two wildcards. The forwarding URL contains a $2 placeholder, which will be replaced with the content matched by the second ](/images/support/page-rule-create.png)

When updating the same rule, you can remove one of the wildcard in the **If the URL matches** field and save it. Refer to the example below:

![Incorrect Page Rule configuration with a single wildcard, but still using the $2 placeholder in the forwarding URL. This configuration causes ](/images/support/page-rule-update.png)

If you do so, the $2 placeholder reference a wildcard that does not exist anymore, and as such, an "_Error 500 (Internal server error)"_ is thrown when a URL triggers the page rule.

**Resolution**: Update the Page Rule and remove the reference `$2` to the second wildcard. If there is only one wildcard, then only `$1` can be used.

___

## Additional details

### Bypass Cache on Cookie setting

This setting is available to business and enterprise customers.

The **Bypass Cache on Cookie** setting supports basic regular expressions (regex) as follows:

-   A pipe operator (represented by |) to match multiple cookies using _OR_ boolean logic. For example, `bypass=.*|PHPSESSID=.*` would bypass the cache if either a cookie called bypass or PHPSESSID were set, regardless of the cookie's value.
-   The wildcard operator (represented by .\*), such that a rule value of `t.*st=` would match both a cookie called test and one called teeest.

Limitations include:

-   150 chars per cookie regex
-   12 wildcards per cookie regex
-   1 wildcard in between each | in the cookie regex

To learn how to configure **Bypass Cache on Cookie** with a variety of platforms, review these articles:

-   [Caching Anonymous Page Views with WordPress or WooCommerce](/support/third-party-software/content-management-system-cms/caching-static-html-with-wordpresswoocommerce/)
-   [Caching Anonymous Page Views with Magento 1 and Magento 2](/support/third-party-software/e-commerce/caching-static-html-with-magento-business-and-enterprise-only/)
-   [How do I cache static HTML?](/cache/concepts/customize-cache/)

**Note:** If you add both this setting and the enterprise-only _Cache On Cookie_ setting to the same page rule, _Cache On Cookie_ takes precedence over _Bypass Cache on Cookie_.

### Zone name occurrences must end with a slash

When saving a Page Rule, Cloudflare will ensure that there is a slash after each occurrence of the current zone name in the **If the URL matches** field. For example, if the current zone name is `example.com`, then:

-   `example.com` will be saved as `example.com/`
-   `example.com/path/example.com` will be saved as `example.com/path/example.com/`

Note that `example.com/some-path/cloudflare.com` will be saved _without_ a final slash, since the zone name is not `cloudflare.com`.

### Network ports supported by Page Rules

If you specify a port in the **If the URL matches** field of a Page Rule, it must be one of the following:

-   One of the HTTP/HTTPS ports [compatible with Cloudflare’s proxy](/fundamentals/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy).
-   A custom port of a [Cloudflare Spectrum](/spectrum/) HTTPS application.

### Using Page Rules with Workers

If the URL of the current request matches both a Page Rule and a [Workers custom route](/workers/configuration/routing/routes/), some Pages Rules settings will not be applied. For details on using Page Rules with Workers, refer to [Workers: Page Rules](/workers/configuration/workers-with-page-rules/) in the developers documentation.

### Page Rules are case-insensitive

The pattern entered under **If the URL matches** will not consider upper and lower case differences.

`example.com/path`, `example.com/Path` and `example.com/PATH` will be triggered the same way.

If you need your rules to consider case sensitivity, you might want to use [Cloudflare Rules](/rules/) instead.

___

## Related resources

-   [Recommended Page Rules to Consider](/rules/page-rules/tutorials/recommended-page-rules-to-consider/)
-   [What subdomains are appropriate for orange/grey clouds?](/dns/manage-dns-records/reference/proxied-dns-records/#limitations)
-   [How do I use Cache Everything with Cloudflare?](/cache/concepts/customize-cache/)
-   [How do I cache static HTML?](/cache/concepts/customize-cache/)
-   [Offline error message when updating or accessing the admin section of my content management system](/support/third-party-software/content-management-system-cms/improving-web-security-for-content-management-systems-like-wordpress/)
