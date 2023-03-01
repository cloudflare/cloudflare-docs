---
source: https://support.cloudflare.com/hc/en-us/articles/218411427-What-do-the-custom-caching-options-mean-in-Page-Rules-#summary-of-page-rules-settings
title: Understanding and configuring Cloudflare Page Rules (Page Rules Tutorial)
---

# Understanding and configuring Cloudflare Page Rules (Page Rules Tutorial)



## Overview

You can define a page rule to trigger one or more actions whenever a certain URL pattern is matched. Page Rules are available in the **Rules** app, in the **Page Rules** tab.

The default number of allowed page rules depends on the domain plan as shown below.

| **Plan** | **Page rules allowed** |
| --- | --- |
| 
Free & Lite

 | 

3

 |
| 

Pro

 | 

20

 |
| 

Pro Plus

 | 

30

 |
| 

Business

 | 

50

 |
| 

Enterprise

 | 

125

 |

You can [purchase additional rules](https://www.cloudflare.com/features-page-rules/) (up to a maximum of 100) for domains in the Free, Lite, Pro, Pro Plus, and Business plans.

___

## Before getting started

It is important to understand two basic Page Rules behaviors:

-   Only the highest priority matching page rule takes effect on a request.
-   Page rules are prioritized in descending order in the Cloudflare dashboard, with the highest priority rule at the top.

A page rule matches a URL pattern based on the following format (comprised of five segments): <scheme>://<hostname><:port>/<path>?<query\_string>

An example URL with these four segments looks like:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://www.example.com:443/image.png?parameter1=value1</span></div></span></span></span></code></pre>{{</raw>}}

The _scheme_ and _port_ segments are optional. If omitted, _scheme_ matches both _http://_ and _https://_ protocols. If no _port_ is specified, the rule will match all ports.

Finally, you can disable a page rule at any time. While a rule is disabled, actions won’t trigger, but the rule still appears in the **Rules** app in the **Page Rules** tab, is editable, and counts against the number of rules allowed for your domain. The _Save as Draft_ option creates a page rule that is disabled by default.

___

## Create a page rule

The steps to create a page rule are:

1.  Log in to the Cloudflare dashboard.
2.  Select the domain where you want to add the page rule.
3.  Click the **Rules** app.
4.  In the **Page Rules** tab**,** click **Create Page Rule**. The _Create Page Rule for <your domain>_ dialog opens.
5.  Under **If the URL matches**, enter the URL or URL pattern that should match the rule. [_Learn more about wildcard matching_](https://support.cloudflare.com/hc/en-us/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_6N5SySNYCjYUUnCKnC1Ea6)
6.  Next, under **Then the settings are:** click **+ Add a Setting** and select the desired setting from the dropdown. You can include more than one setting per rule. Learn more about settings in the [summary below](https://support.cloudflare.com/hc/en-us/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_18YTlvNlZET4Poljeih3TJ).
7.  In the **Order** dropdown, specify the desired order: _First, Last_ or _Custom_.
8.  To save, click one of the following options:
    -   **Save as Draft** to save the rule and leave it disabled.
    -   **Save and Deploy** to save the rule and enable it immediately.

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


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/t*st</span></div></span></span></span></code></pre>{{</raw>}}

Would match:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/test</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/toast</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com/trust</span></div></span></span></span></code></pre>{{</raw>}}

_example.com/foo/\*_ does not match example.com/foo.  However, _example.com/foo\*_ does.

### Helpful tips

-   To match both _http_ and _https_, just write _example.com_. It is not necessary to write _\*example.com_.
-   To match every page on a domain, write _example.com/\*_. Just writing _example.com_ won’t work.
-   To match every page on a domain and it's subdomains, write \*_example.com/\*_. Just writing _example.com_ won’t work.
-   A wildcard (\*) in a Page Rule URL will match even if no characters are present, and may include any part of the URL, including the query string.

### Referencing wildcard matches

You can reference a matched wildcard later using the _$X_ syntax. _X_ indicates the index of a glob pattern. As such, $1 represents the first wildcard match, $2 the second wildcard match, and so on.

This is specifically useful with the _Forwarding URL_ setting. For example:

You could forward:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://*.example.com/*</span></div></span></span></span></code></pre>{{</raw>}}

to:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://example.com/images/$1/$2.jpg</span></div></span></span></span></code></pre>{{</raw>}}

This rule would match:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://cloud.example.com/flare.jpg</span></div></span></span></span></code></pre>{{</raw>}}

which ends up being forwarded to:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http://example.com/images/cloud/flare.jpg</span></div></span></span></span></code></pre>{{</raw>}}

To use a literal _$_ character in the forwarding URL, escape it by adding a backslash (\\) in front: _\\$_.

___

## Summary of Page Rules Settings

Settings control the action Cloudflare takes once a request matches the URL pattern defined in a page rule. You can use settings to enable and disable multiple Cloudflare features across several of the dashboard apps. Note that:

-   Some settings require a Pro, Business or Enterprise domain plan.
-   You can specify more than one setting to apply when the rule triggers.

Below is the full list of settings available, presented in the order that they appear in the **Cloudflare Page Rules** UI.

| 
**Setting**

 | 

**Description**

 | 

**Plans**

 |
| --- | --- | --- |
| 

Always Use HTTPS

 | 

Turn on or off the **[Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https)** feature of the **Edge Certificates** tab in the **Cloudflare SSL/TLS** app. If enabled, any _http://_ URL is converted to _https://_ through a 301 redirect.

If this option does not appear, you do not have an active **Edge Certificate**.

 | 

-   All

 |
| 

Auto Minify

 | 

Indicate which file extensions to minify automatically. [Learn more](https://support.cloudflare.com/hc/articles/200168196).

 | 

-   All

 |
| 

Automatic HTTPS Rewrites

 | 

Turn on or off the **Cloudflare Automatic HTTPS Rewrites** feature of the **Edge Certificates** tab in **Cloudflare SSL/TLS** app. [Learn more](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites).

 | 

-   All

 |
| 

Browser Cache TTL

 | 

Control how long resources cached by client browsers remain valid. The Cloudflare UI and API both prohibit setting **Browser Cache TTL** to _0_ for non-Enterprise domains. [Learn more](https://developers.cloudflare.com/cache/about/edge-browser-cache-ttl).

 | 

-   All

 |
| 

Browser Integrity Check

 | 

Inspect the visitor's browser for headers commonly associated with spammers and certain bots. [Learn more](https://support.cloudflare.com/hc/articles/200170086).

 | 

-   All

 |
| 

Bypass Cache on Cookie

 | 

Bypass Cache and fetch resources from the origin server if a regular expression matches against a cookie name present in the request.

If you add both this setting and the _Cache On Cookie_ setting to the same page rule, _Cache On Cookie_ takes precedence over _Bypass Cache on Cookie_.

_See Additional details below to learn about limited regular expression support._

 | 

-   Business
-   Enterprise

 |
| 

Cache By Device Type

 | 

Separate cached content based on the visitor’s device type. [Learn more.](https://developers.cloudflare.com/cache/how-to/create-page-rules#cache-by-device-type-enterprise-only)

 | 

-   Enterprise

 |
| 

Cache Deception Armor

 | 

Protect from web cache deception attacks while still allowing static assets to be cached. This setting verifies that the URL's extension matches the returned _Content-Type_. [Learn more.](https://developers.cloudflare.com/cache/about/cache-deception-armor)

 | 

-   All

 |
| 

Cache Key

 | 

Also referred to as _Custom Cache Key_.

Control specifically what variables to include when deciding which resources to cache. This allows customers to determine what to cache based on something other than just the URL. [Learn more](https://developers.cloudflare.com/cache/about/cache-keys).

 | 

-   Enterprise

 |
| 

Cache Level

 | 

Apply custom caching based on the option selected:

**Bypass** \- Cloudflare does not cache.

**No Query String** - Delivers resources from cache when there is no query string.

**Ignore Query String** \- Delivers the same resource to everyone independent of the query string.

**Standard -** Caches all static content that has a query string.

**Cache Everything** \-  Treats all content as static and caches all file types beyond the [Cloudflare default cached content](https://developers.cloudflare.com/cache/about/default-cache-behavior#default-cached-file-extensions).  Respects cache headers from the origin web server unless **Edge Cache TTL** is also set in the Page Rule. When combined with an **Edge Cache TTL** > _0_, **Cache Everything** removes cookies from the origin web server response.   


 | 

-   All

 |
| 

Cache on Cookie

 | 

Apply the _Cache Everything_ option (_Cache Level_ setting) based on a regular expression match against a cookie name.

If you add both this setting and _Bypass Cache on Cookie_ to the same page rule, _Cache On Cookie_ takes precedence over _Bypass Cache on Cookie_.

 | 

-   Business
-   Enterprise

 |
| 

Cache TTL by Status Code

 | 

Enterprise customers can set cache time-to-live (TTL) based on the response status from the origin web server. Cache TTL refers to the duration of a resource in the Cloudflare network before being marked as stale or discarded from cache. Status codes are returned by a resource’s origin.   Setting cache TTL based on response status overrides the default cache behavior (standard caching) for static files and overrides cache instructions sent by the origin web server. To cache non-static assets, set a Cache Level of Cache Everything using a Page Rule . Setting no-store Cache-Control or a low TTL (using max-age/s-maxage) increases requests to origin web servers and decreases performance. [Learn more](https://support.cloudflare.com/hc/en-us/articles/360043842472-Configuring-cache-TTL-by-status-code).

 | 

-   Enterprise

 |
| 

Disable Apps

 | 

Turn off all active **Cloudflare Apps**.

 | 

-   All

 |
| 

Disable Performance

 | 

Turn off:

-   [Auto Minify](https://support.cloudflare.com/hc/articles/200168196)
-   [Rocket Loader](https://support.cloudflare.com/hc/articles/200168056)
-   [Mirage](https://support.cloudflare.com/hc/articles/200403554)
-   [Polish](https://support.cloudflare.com/hc/articles/360000607372)

 | 

-   All

 |
| 

Disable Railgun

 | 

Turn off the **Railgun** feature of the Cloudflare **Speed** app.

 | 

-   Business
-   Enterprise

 |
| 

Disable Security

 | 

Turn off:

-   [Email Obfuscation](https://support.cloudflare.com/hc/articles/200170016)
-   [Rate Limiting (previous version)](https://support.cloudflare.com/hc/articles/115001635128)
-   [Scrape Shield](https://support.cloudflare.com/hc/articles/200171036)
-   [Server Side Excludes](https://support.cloudflare.com/hc/articles/200170036)
-   [URL (Zone) Lockdown](https://support.cloudflare.com/hc/articles/115001595131)
-   [WAF managed rules (previous version)](https://support.cloudflare.com/hc/articles/200172016)

 | 

-   All

 |
| 

Edge Cache TTL

 | 

Specify how long to cache a resource in the Cloudflare edge network. _Edge Cache TTL_ isn't visible in response headers.  The minimum _Edge Cache TTL_ depends on plan type:

Free - 2 hours  
Pro - 1 hour  
Business - 1 second  
Enterprise - 1 second

 | 

-   All

 |
| 

Email Obfuscation

 | 

Turn on or off the **Cloudflare Email Obfuscation** feature of the **Cloudflare Scrape Shield** app. [Learn more.](https://support.cloudflare.com/hc/articles/200170016)

 | 

-   All

 |
| 

Forwarding URL

 | 

Redirects one URL to another using an _HTTP 301/302 redirect_. _See [Understand wildcard matching and referencing above](https://support.cloudflare.com/hc/articles/218411427#h_6N5SySNYCjYUUnCKnC1Ea6)._

 | 

-   All

 |
| 

Host Header Override

 | 

Apply a specific host header. [Learn more](https://support.cloudflare.com/hc/articles/206652947).

 | 

-   Enterprise

 |
| 

IP Geolocation Header

 | 

Cloudflare adds a _CF-IPCountry_ HTTP header containing the country code that corresponds to the visitor.

 | 

-   All

 |
| 

Mirage

 | 

Turn on or off **Cloudflare Mirage** of the Cloudflare **Speed** app. [Learn more](https://support.cloudflare.com/hc/articles/200403554).

 | 

-   Pro
-   Business
-   Enterprise

 |
| 

Opportunistic Encryption

 | 

Turn on or off the **Cloudflare Opportunistic Encryption** feature of the **Edge Certificates** tab in the Cloudflare **SSL/TLS** app. [Learn more](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/opportunistic-encryption).

 | 

-   All

 |
| Origin Cache Control | [Origin Cache Control](https://developers.cloudflare.com/cache/about/cache-control) is enabled by default for Free, Pro, and Business domains and disabled by default for Enterprise domains. | 

-   All

 |
| 

Origin Error Page Pass-thru

 | 

Turn on or off Cloudflare error pages generated from issues sent from the origin server. If enabled, this setting triggers error pages issued by the origin.

 | 

-   Enterprise

 |
| 

Polish

 | 

Apply options from the **Polish** feature of the Cloudflare **Speed** app. [Learn more](https://developers.cloudflare.com/images/polish).

 | 

-   Pro
-   Business
-   Enterprise

 |
| 

Query String Sort

 | 

Turn on or off the reordering of query strings. When query strings have the same structure, caching improves. [Learn more](https://support.cloudflare.com/hc/articles/206776797).

 | 

-   Enterprise

 |
| 

Resolve Override

 | 

Change the origin address to the value specified in this setting. [Learn more](https://support.cloudflare.com/hc/articles/206190798).

 | 

-   Enterprise

 |
| 

Respect Strong ETags

 | 

Turn on or off byte-for-byte equivalency checks between the Cloudflare cache and the origin server. [Learn more](https://support.cloudflare.com/hc/articles/218505467).

 | 

-   Enterprise

 |
| 

Response Buffering

 | 

Turn on or off whether Cloudflare should wait for an entire file from the origin server before forwarding it to the site visitor. By default, Cloudflare sends packets to the client as they arrive from the origin server.

 | 

-   Enterprise

 |
| 

Rocket Loader

 | 

Turn on or off **Cloudflare Rocket Loader** in the Cloudflare **Speed** app**.** [Learn more](https://support.cloudflare.com/hc/articles/200168056).

 | 

-   All

 |
| 

Security Level

 | 

Control options for the **Security Level** feature from the **Security** app. [Learn more](https://support.cloudflare.com/hc/articles/200170056).

 | 

-   All

 |
| 

Server Side Excludes

 | 

Turn on or off the **Server Side Excludes** feature of the Cloudflare **Scrape Shield** app. [Learn more](https://support.cloudflare.com/hc/articles/200170036).

 | 

-   All

 |
| 

SSL

 | 

Control options for the **SSL** feature of the **Edge Certificates** tab in the Cloudflare **SSL/TLS** app. [Learn more](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes).

 | 

-   All

 |
| 

True Client IP Header

 | 

Turn on or off the **True-Client-IP Header** feature of the Cloudflare **Network** app. [Learn more](https://support.cloudflare.com/hc/articles/206776727).

 | 

-   Enterprise

 |
| 

Web Application Firewall (previous version)

 | 

Turn on or off **WAF managed rules** as defined in **Security** > **WAF** > **Managed rules**. [Learn more](https://support.cloudflare.com/hc/articles/200172016).

You cannot enable or disable individual WAF managed rules via page rules.

 | 

-   Pro
-   Business
-   Enterprise

 |

___

## Known Issues

**Page Rule configuration issue leading to "****_Error 500 (Internal server error)_****"**

**Root cause**: This may be due to a configuration issue on a Page Rule. When creating a Page Rule that uses two wildcards, like a _Forwarding URL_ rule, it is possible to create a rule that mentions the second wildcard with the $2 placeholder. See example below:

![Example Page Rule configuration with two wildcards. The forwarding URL contains a $2 placeholder, which will be replaced with the content matched by the second ](/support/static/page-rule-create.png)

When updating the same rule, you can remove one of the wildcard in the **If the URL matches** field and save it. See example below:

![Incorrect Page Rule configuration with a single wildcard, but still using the $2 placeholder in the forwarding URL. This configuration causes ](/support/static/page-rule-update.png)

If you do so, the $2 placeholder reference a wildcard that does not exist anymore, and as such, an "_Error 500 (Internal server error)"_ is thrown when a URL triggers the page rule.

**Resolution**: Update the Page Rule and remove the reference _$2_ to the second wildcard. If there is only one wildcard, then only _$1_ can be used.

___

## Additional details

### Bypass Cache on Cookie setting

This setting is available to business and enterprise customers.

The **Bypass Cache on Cookie** setting supports basic regular expressions (regex) as follows:

-   A pipe operator (represented by |) to match multiple cookies using _OR_ boolean logic. For example, bypass=.\*_|PHPSESSID=.\*_ would bypass the cache if either a cookie called bypass or PHPSESSID were set, regardless of the cookie's value.
-   The wildcard operator (represented by .\*), such that a rule value of “t.\*st=” would match both a cookie called test and one called teeest.

Limitations include:

-   150 chars per cookie regex
-   12 wildcards per cookie regex
-   1 wildcard in between each | in the cookie regex

To learn how to configure **Bypass Cache on Cookie** with a variety of platforms, review these articles:

-   [Caching Anonymous Page Views with WordPress or WooCommerce](https://support.cloudflare.com/hc/articles/236166048)
-   [Caching Anonymous Page Views with Magento 1 and Magento 2](https://support.cloudflare.com/hc/articles/236168808)
-   [How do I cache static HTML?](https://support.cloudflare.com/hc/articles/202775670)

**Note:** If you add both this setting and the enterprise-only _Cache On Cookie_ setting to the same page rule, _Cache On Cookie_ takes precedence over _Bypass Cache on Cookie_.

### Zone name occurrences must end with a slash

When saving a Page Rule, Cloudflare will ensure that there is a slash after each occurrence of the current zone name in the **If the URL matches** field. For example, if the current zone name is `example.com`, then:

-   `example.com` will be saved as `example.com/`
-   `example.com/path/example.com` will be saved as `example.com/path/example.com/`

Note that `example.com/some-path/cloudflare.com` will be saved _without_ a final slash, since the zone name is not `cloudflare.com`.

### Network ports supported by Page Rules

If you specify a port in the **If the URL matches** field of a Page Rule, it must be one of the following:

-   One of the HTTP/HTTPS ports [compatible with Cloudflare’s proxy](https://developers.cloudflare.com/fundamentals/get-started/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy).
-   A custom port of a [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/) HTTPS application.

### Using Page Rules with Workers

If the URL of the current request matches both a Page Rule and a [Workers custom route](https://developers.cloudflare.com/workers/platform/routes), some Pages Rules settings will not be applied. For details on using Page Rules with Workers, refer to [Workers: Page Rules](https://developers.cloudflare.com/workers/platform/workers-with-page-rules/) in the developers documentation.

___

## Related resources

-   [Recommended Page Rules to Consider](https://support.cloudflare.com/hc/articles/224509547)
-   [What subdomains are appropriate for orange/grey clouds?](https://support.cloudflare.com/hc/en-us/articles/200169626-What-subdomains-are-appropriate-for-orange-gray-clouds-)
-   [How do I use Cache Everything with Cloudflare?](https://support.cloudflare.com/hc/articles/202775670)
-   [How do I cache static HTML?](https://support.cloudflare.com/hc/articles/200172256)
-   [Offline error message when updating or accessing the admin section of my content management system](https://support.cloudflare.com/hc/articles/200169526)
