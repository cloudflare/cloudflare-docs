---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/218411427-What-do-the-custom-caching-options-mean-in-Page-Rules-#summary-of-page-rules-settings
title: Understanding and configuring Cloudflare Page Rules (Page Rules Tutorial)
---

# Understanding and configuring Cloudflare Page Rules (Page Rules Tutorial)

You can define a page rule to trigger one or more actions whenever a certain URL pattern is matched. Page Rules are available in **Rules** > **Page Rules**.

{{<Aside type="warning">}}
Page Rules require a [proxied](/dns/manage-dns-records/reference/proxied-dns-records)
DNS record for your page rule to work. Page Rules won't apply to hostnames that don't exist in DNS or aren't being directed to Cloudflare.
{{</Aside>}}

The default number of allowed page rules depends on the domain plan as shown below.

{{<feature-table id="rules.page_rules">}}

You can [purchase additional rules](https://www.cloudflare.com/features-page-rules/) (up to a maximum of 100) for domains in the Free, Lite, Pro, Pro Plus, and Business plans.

___

## Before getting started

It is important to understand two basic Page Rules behaviors:

-   Only the highest priority matching page rule takes effect on a request.
-   Page rules are prioritized in descending order in the Cloudflare dashboard, with the highest priority rule at the top.

{{<Aside type="tip">}}
Cloudflare recommends ordering your rules from most specific to least
specific.
{{</Aside>}}

A page rule matches a URL pattern based on the following format (comprised of five segments): `<scheme>://<hostname><:port>/<path>?<query_string>`

An example URL with these four segments looks like:

```
https://www.example.com:443/image.png?parameter1=value1
```

The `scheme` and `port` segments are optional. If omitted, _scheme_ matches both `http://` and `https://` protocols. If no `port` is specified, the rule will match all ports.

Finally, you can disable a page rule at any time. While a rule is disabled, actions won’t trigger, but the rule still appears in the **Rules** app in the **Page Rules** tab, is editable, and counts against the number of rules allowed for your domain. The _Save as Draft_ option creates a page rule that is disabled by default.

___

## Create a page rule

The steps to create a page rule are:

1.  Log in to the Cloudflare dashboard.
2.  Select the domain where you want to add the page rule.
3.  Click the **Rules** app.
4.  In the **Page Rules** tab, click **Create Page Rule**. The _Create Page Rule for <your domain>_ page opens.
5.  Under **If the URL matches**, enter the URL or URL pattern that should match the rule. [_Learn more about wildcard matching_](#referencing-wildcard-matches)
6.  Next, under **Then the settings are:** click **+ Add a Setting** and select the desired setting from the dropdown. You can include more than one setting per rule. Learn more about settings in the [summary below](#summary-of-page-rules-settings).
7.  In the **Order** dropdown, specify the desired order: _First, Last_ or _Custom_.
8.  To save, click one of the following options:
    -   **Save as Draft** to save the rule and leave it disabled.
    -   **Save and Deploy** to save the rule and enable it immediately.

{{<Aside type="note">}}
**Note:** We do not support non-ASCII characters (e.g. punycode/unicode
domain) in Page Rules. Instead, you could URL-encode the string using
[Punycode converter](https://www.punycoder.com/ "Punycode converter"),
for example, and this will work.
{{</Aside>}}

{{<Aside type="tip">}}
Consult [Recommended Page Rules to
Consider](/support/page-rules/recommended-page-rules-to-consider/)
for ideas about the types of page rules you can create.
{{</Aside>}}

___

## Edit a page rule

To modify an existing rule:

1.  Log in to the Cloudflare dashboard.
2.  Select the domain where you want to edit your page rule.
3.  Click the **Rules** app.
4.  In the **Page Rules** tab, locate the rule to edit.
5.  Proceed to make the necessary changes, as follows:
    -   To enable or disable a rule, click the **On/Off** toggle.
    -   To modify the URL pattern, settings, and order, click the **Edit** button (wrench icon). In the dialog, enter the information you’d like to change.
    -   To remove a rule, click the **Delete** button (x icon) and confirm by clicking **OK** in the **Confirm** dialog.

___

## Understand wildcard matching and referencing

You can use the asterisk (\*) in any URL segment to match certain patterns. For example,

```
example.com/t*st
```

Would match:

```
example.com/test
example.com/toast
example.com/trust
```

_example.com/foo/\*_ does not match example.com/foo.  However, _example.com/foo\*_ does.

### Helpful tips

-   To match both `http` and `https`, just write `example.com`. It is not necessary to write `*example.com`.
-   To match every page on a domain, write `example.com/*`. Just writing _example.com_ won’t work.
-   To match every page on a domain and it's subdomains, write `*_example.com/*`. Just writing _example.com_ won’t work.
-   A wildcard (\*) in a Page Rule URL will match even if no characters are present, and may include any part of the URL, including the query string.

### Referencing wildcard matches

You can reference a matched wildcard later using the `$X` syntax. `X` indicates the index of a glob pattern. As such, $1 represents the first wildcard match, $2 the second wildcard match, and so on.

This is specifically useful with the _Forwarding URL_ setting. For example:

You could forward:

```
http://*.example.com/*
```

to:

```
http://example.com/images/$1/$2.jpg
```

This rule would match:

```
http://cloud.example.com/flare.jpg
```

which ends up being forwarded to:

```
http://example.com/images/cloud/flare.jpg
```

To use a literal `$` character in the forwarding URL, escape it by adding a backslash (\\) in front: `\$`.

{{<Aside type="warning">}}
Avoid creating a redirect where the domain points to itself as the
destination. This can cause an infinite redirect error and your site
cannot be served to visitors.
{{</Aside>}}

___

## Summary of Page Rules Settings

Settings control the action Cloudflare takes once a request matches the URL pattern defined in a page rule. You can use settings to enable and disable multiple Cloudflare features across several of the dashboard apps. Note that:

-   Some settings require a Pro, Business or Enterprise domain plan.
-   You can specify more than one setting to apply when the rule triggers.

Below is the full list of settings available, presented in the order that they appear in the **Cloudflare Page Rules** UI.

| **Setting** | **Description** | **Plans** |
| --- | --- | --- |
| [Always Use HTTPS](/ssl/edge-certificates/additional-options/always-use-https/) |  Turn on or off the **Always Use HTTPS** feature. If enabled, any `http://` URL is converted to `https://` through a 301 redirect.<br/><br/>If this option does not appear, you do not have an active **Edge Certificate**. | All |
| [Auto Minify](/support/speed/optimization-file-size/using-cloudflare-auto-minify/) | Indicate which file extensions to minify automatically.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| [Automatic HTTPS Rewrites](/ssl/edge-certificates/additional-options/automatic-https-rewrites/) | Turn on or off **Automatic HTTPS Rewrites**.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| [Browser Cache TTL](/cache/how-to/edge-browser-cache-ttl/) | Control how long resources cached by client browsers remain valid. The Cloudflare UI and API both prohibit setting **Browser Cache TTL** to _0_ for non-Enterprise domains. | All |
| [Browser Integrity Check](/support/firewall/settings/understanding-the-cloudflare-browser-integrity-check/) | Inspect the visitor's browser for headers commonly associated with spammers and certain bots.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| Bypass Cache on Cookie | Bypass Cache and fetch resources from the origin server if a regular expression matches against a cookie name present in the request.<br/>If you add both this setting and the _Cache On Cookie_ setting to the same page rule, _Cache On Cookie_ takes precedence over _Bypass Cache on Cookie_.<br/><br/>Refer to the [Additional details](#additional-details) to learn about limited regular expression support. | Business and Enterprise |
| [Cache By Device Type](/cache/how-to/edge-browser-cache-ttl/create-page-rules/#cache-by-device-type-enterprise-only) | Separate cached content based on the visitor’s device type.  | Enterprise |
| [Cache Deception Armor](/cache/cache-security/cache-deception-armor/) | Protect from web cache deception attacks while still allowing static assets to be cached. This setting verifies that the URL's extension matches the returned _Content-Type_. | All |
| [Cache Key](/cache/how-to/cache-keys/) | Also referred to as _Custom Cache Key_.<br/>Control specifically what variables to include when deciding which resources to cache. This allows customers to determine what to cache based on something other than just the URL. | Enterprise |
| Cache Level | Apply custom caching based on the option selected:<br/><br/>**Bypass** \- Cloudflare does not cache.<br/>**No Query String** - Delivers resources from cache when there is no query string.<br/>**Ignore Query String** \- Delivers the same resource to everyone independent of the query string.<br/>**Standard -** Caches all static content that has a query string.<br/>**Cache Everything** \-  Treats all content as static and caches all file types beyond the [Cloudflare default cached content](/cache/concepts/default-cache-behavior#default-cached-file-extensions).  Respects cache headers from the origin web server unless **Edge Cache TTL** is also set in the Page Rule. When combined with an **Edge Cache TTL** > _0_, **Cache Everything** removes cookies from the origin web server response. | All |
| Cache on Cookie | Apply the _Cache Everything_ option (_Cache Level_ setting) based on a regular expression match against a cookie name.<br/>If you add both this setting and _Bypass Cache on Cookie_ to the same page rule, _Cache On Cookie_ takes precedence over _Bypass Cache on Cookie_. |  Business and above |
| [Cache TTL by Status Code](/cache/how-to/configure-cache-status-code/) | Enterprise customers can set cache time-to-live (TTL) based on the response status from the origin web server. Cache TTL refers to the duration of a resource in the Cloudflare network before being marked as stale or discarded from cache. Status codes are returned by a resource’s origin. Setting cache TTL based on response status overrides the default cache behavior (standard caching) for static files and overrides cache instructions sent by the origin web server. To cache non-static assets, set a Cache Level of Cache Everything using a Page Rule. Setting no-store Cache-Control or a low TTL (using max-age/s-maxage) increases requests to origin web servers and decreases performance. | Enterprise |
| Disable Apps | Turn off all active **Cloudflare Apps**.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| Disable Performance | Turn off [Auto Minify](/support/speed/optimization-file-size/using-cloudflare-auto-minify/), [Rocket Loader](/fundamentals/speed/rocket-loader/), [Mirage](/support/speed/optimization-delivery/configuring-cloudflare-mirage/), and [Polish](/images/polish). | All |
| Disable Railgun (deprecated) | Turn off the **Railgun** feature of the Cloudflare **Speed** app.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | Business and above |
| Disable Security| Turn off [Email Obfuscation](/support/more-dashboard-apps/cloudflare-scrape-shield/what-is-email-address-obfuscation/), [Rate Limiting (previous version)](/support/firewall/tools/configuring-cloudflare-rate-limiting/), [Scrape Shield](/support/more-dashboard-apps/cloudflare-scrape-shield/), [Server Side Excludes](/support/more-dashboard-apps/cloudflare-scrape-shield/what-does-server-side-excludes-sse-do/), [URL (Zone) Lockdown](/waf/tools/zone-lockdown/), and [WAF managed rules (previous version)](/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/). | All |
| Disable Zaraz | Turn off [Zaraz](/zaraz/).{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| Edge Cache TTL | Specify how long to cache a resource in the Cloudflare edge network. _Edge Cache TTL_ isn't visible in response headers. | All |
| [Email Obfuscation](/support/more-dashboard-apps/cloudflare-scrape-shield/what-is-email-address-obfuscation/) | Turn on or off **Email Obfuscation**.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| Forwarding URL | Redirects one URL to another using an `HTTP 301/302 redirect`. _Refer to [Understand wildcard matching and referencing above](#understand-wildcard-matching-and-referencing)._ | All |
| [Host Header Override](/support/page-rules/using-page-rules-to-rewrite-host-headers/) | Apply a specific host header.{{<render file="_origin-rule-promotion.md" productFolder="rules" withParameters="/rules/origin-rules/features/#host-header">}} | Enterprise |
| IP Geolocation Header | Cloudflare adds a _CF-IPCountry_ HTTP header containing the country code that corresponds to the visitor. | All |
| [Mirage](/support/speed/optimization-delivery/configuring-cloudflare-mirage/) | Turn on or off **Mirage**.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | Pro and above |
| [Opportunistic Encryption](/ssl/edge-certificates/additional-options/opportunistic-encryption/) | Turn on or off the **Opportunistic Encryption**.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| [Origin Cache Control](/cache/concepts/cache-control/) | Origin Cache Control is enabled by default for Free, Pro, and Business domains and disabled by default for Enterprise domains. |  All |
| Origin Error Page Pass-thru | Turn on or off Cloudflare error pages generated from issues sent from the origin server. If enabled, this setting triggers error pages issued by the origin. | Enterprise |
| [Polish](/images/polish/) | Apply options from the **Polish** feature of the Cloudflare **Speed** app.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | Pro and above |
| [Query String Sort](/cache/advanced-configuration/query-string-sort/) | Turn on or off the reordering of query strings. When query strings have the same structure, caching improves. | Enterprise |
| [Resolve Override](/support/page-rules/using-resolve-override-in-page-rules/) | Change the origin address to the value specified in this setting. {{<render file="_origin-rule-promotion.md" productFolder="rules" withParameters="/rules/origin-rules/features/#dns-record">}}| Enterprise |
| [Respect Strong ETags](/cache/reference/etag-headers/) | Turn on or off byte-for-byte equivalency checks between the Cloudflare cache and the origin server. | Enterprise |
| Response Buffering | Turn on or off whether Cloudflare should wait for an entire file from the origin server before forwarding it to the site visitor. By default, Cloudflare sends packets to the client as they arrive from the origin server. |  Enterprise |
| [Rocket Loader](/fundamentals/speed/rocket-loader/) | Turn on or off **Rocket Loader** in the Cloudflare **Speed** app.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| [Security Level](/support/firewall/settings/understanding-the-cloudflare-security-level/) | Control options for the **Security Level** feature from the **Security** app. {{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| [Server Side Excludes](/support/more-dashboard-apps/cloudflare-scrape-shield/what-does-server-side-excludes-sse-do/)| Turn on or off the **Server Side Excludes** feature of the Cloudflare **Scrape Shield** app.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} |  All |
| [SSL](/ssl/origin-configuration/ssl-modes/) | Control options for the **SSL** feature of the **Edge Certificates** tab in the Cloudflare **SSL/TLS** app.{{<render file="_configuration-rule-promotion.md" productFolder="rules">}} | All |
| True Client IP Header | Turn on or off the **True-Client-IP Header** feature of the Cloudflare **Network** app. [Learn more](/support/network/understanding-the-true-client-ip-header/). | Enterprise |
| Web Application Firewall (previous version) | Turn on or off **WAF managed rules** as defined in **Security** > **WAF** > **Managed rules**. [Learn more](/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).<br/>You cannot enable or disable individual WAF managed rules via page rules. | Pro and above |

___

## Known Issues

**Page Rule configuration issue leading to "****_Error 500 (Internal server error)_****"**

**Root cause**: This may be due to a configuration issue on a Page Rule. When creating a Page Rule that uses two wildcards, like a _Forwarding URL_ rule, it is possible to create a rule that mentions the second wildcard with the $2 placeholder. Refer to the example below:

![Example Page Rule configuration with two wildcards. The forwarding URL contains a $2 placeholder, which will be replaced with the content matched by the second ](/support/static/page-rule-create.png)

When updating the same rule, you can remove one of the wildcard in the **If the URL matches** field and save it. Refer to the example below:

![Incorrect Page Rule configuration with a single wildcard, but still using the $2 placeholder in the forwarding URL. This configuration causes ](/support/static/page-rule-update.png)

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

-   One of the HTTP/HTTPS ports [compatible with Cloudflare’s proxy](/fundamentals/get-started/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy).
-   A custom port of a [Cloudflare Spectrum](/spectrum/) HTTPS application.

### Using Page Rules with Workers

If the URL of the current request matches both a Page Rule and a [Workers custom route](/workers/platform/triggers/routes/), some Pages Rules settings will not be applied. For details on using Page Rules with Workers, refer to [Workers: Page Rules](/workers/platform/workers-with-page-rules/) in the developers documentation.

___

## Related resources

-   [Recommended Page Rules to Consider](/support/page-rules/recommended-page-rules-to-consider/)
-   [What subdomains are appropriate for orange/grey clouds?](/dns/manage-dns-records/reference/proxied-dns-records/#limitations)
-   [How do I use Cache Everything with Cloudflare?](/cache/concepts/customize-cache/)
-   [How do I cache static HTML?](/cache/concepts/customize-cache/)
-   [Offline error message when updating or accessing the admin section of my content management system](/support/third-party-software/content-management-system-cms/improving-web-security-for-content-management-systems-like-wordpress/)
