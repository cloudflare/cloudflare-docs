---
title: Page Rules migration guide
pcx_content_type: how-to
weight: 3
---

# Page Rules migration guide

Cloudflare recommends that you consider using modern Rules features for your new implementations instead of Page Rules. Follow the recommendations in this migration guide to learn about the [new Rules products](/rules/) and how you can start adopting them today.

## Page Rules migration

Cloudflare plans to migrate your existing Page Rules during 2025. You do not need to migrate your own rules, as Cloudflare will handle this process for you. However, it is beneficial to understand the correspondence between the different Page Rules settings and new Rules features ahead of the migration. This will help you familiarize yourself with implementing the new types of rules in your Cloudflare account.

We encourage you to explore and start using the new Rules products to take advantage of their enhanced capabilities and features. This migration guide will be updated in the coming months with additional information about the Page Rules migration. Some instructions may also change as we simplify configuration deployment and release new features as part of this project. Cloudflare users will receive email updates about the migration of the Page Rules configured on their Cloudflare account before the migration occurs. We will not perform any migration or changes on your behalf without prior notification.

## Context

Cloudflare Page Rules has several fundamental limitations, such as triggering solely based on URL patterns and being limited to 125 rules per zone for performance reasons. These rules are also complex to debug when multiple page rules apply to the same incoming request.

In 2022, we announced in our blog post [The future of Page Rules](https://blog.cloudflare.com/future-of-page-rules) that Page Rules would be replaced with a suite of dedicated products, each built to be best-of-breed and put more power into the hands of our users. The new Rules products — [Configuration Rules](/rules/configuration-rules/), [Compression Rules](/rules/compression-rules/), [Origin Rules](/rules/origin-rules/), [Redirects](/rules/url-forwarding/), and [Transform Rules](/rules/transform/) — are now generally available (GA) and have already been adopted by tens of thousands of Cloudflare customers.

Improvements in modern Rules features include:

- **New engine**: New Rules features are powered by the [Ruleset Engine](/ruleset-engine/), which offers versatile configuration with a robust language that supports many HTTP request and response fields.
- **Improved scalability**: Thanks to the improved scalability, Cloudflare plans now have increased quotas.
- **Easier troubleshooting**: Rule execution is more predictable, since each rule operates independently, simplifying troubleshooting. Additionally, [Cloudflare Trace](/fundamentals/basic-tasks/trace-request/) helps understand rule interactions.
- **Improved consistency**: New Rules features also ensure consistency, with common fields and capabilities shared across products, offering a seamless experience and predictable Terraform configurations.

## Important differences

The evaluation and execution order of Rules features is different from Page Rules:

- Requests handled by Workers will suppress Page Rules actions, but they will not suppress actions from modern Rules features.
- The first Page Rule to match is applied (also called first match). In contrast, other rules like Cache Rules are stackable. This means that multiple matching rules can be combined and applied to the same request (last match). For example, if multiple cache rules match the same URL, then the features set in those cache rules will all be applied in order. For more information, refer to [Order and priority](/cache/how-to/cache-rules/order/) in the Cache documentation and the [Origin Rules FAQ](/rules/origin-rules/faq/#what-happens-if-more-than-one-origin-rule-matches-the-current-request).
- A Page Rule may include multiple configurations for different products that are applied in a sequence selected by the customer. In contrast, modern Rules features are evaluated [in a fixed sequence](/rules/origin-rules/#execution-order), with a customer being able to define the rule order within a product [phase](/ruleset-engine/reference/phases-list/). Refer to the [Ruleset Engine documentation](/ruleset-engine/about/) for more information.
- Modern Rules features will take precedence over Page Rules. For example, if you have Page Rules and Cache Rules defining caching settings for the same path, Cache Rules will take precedence.

## Convert Page Rules URLs to filter expressions

When migrating a Page Rule you will need to write a filter expression equivalent to your Page Rules URL using the Rules language.

Rule filter expressions are built differently from Page Rules URLs. You can use different elements of the Rules language in a filter expression, including [fields](/ruleset-engine/rules-language/fields/), [functions](/ruleset-engine/rules-language/functions/), and [operators](/ruleset-engine/rules-language/operators/).

Strings in filter expressions do not support wildcards yet. You will need to adapt your Page Rules URLs when migrating them to modern rules. While Enterprise and Business customers can use regular expressions, it will also require adapting the original URLs in your Page Rules to regular expressions.

The following table lists the most common Page Rule URLs and their equivalent filters:

{{<table-wrap style="font-size: 87%">}}

Target and components | <div style="width:130px">Page Rule URL example</div> | Filter expression using Rules language
---|---|---
Index page of root domain only<br>_(Domain + Path)_ | `example.com/` | `http.host eq "example.com" and http.request.uri.path eq "/"`
Everything on a specific domain<br>_(Domain)_ | `example.com/*` | `http.host eq "example.com"`
All subdomains and URLs on a specific domain<br>_(Domain)_ | `*example.com/*` | `http.host contains "example.com"`
Only subdomains and their URLs<br>_(Domain)_ | `*.example.com/*` | `http.host contains ".example.com"`
Specific file on subdomains of a specific domain<br>_(Domain + Path)_ | `*.example.com/*wp-login.php` | `ends_with(http.host, ".example.com") and ends_with(http.request.uri.path, "wp-login.php")`
Specific file extension in a directory or its subdirectories of a domain<br>_(Domain + Path)_ | `example.com/archives/*.zip` | `http.host eq "example.com" and starts_with(http.request.uri.path, "/archives/") and http.request.uri.path.extension eq "zip"`
Specific file extension in any subdirectory of a domain<br>_(Domain + Path)_ | `example.com/*/downloads/*.txt` | `http.host eq "example.com" and not starts_with(http.request.uri.path, "/downloads/") and http.request.uri.path contains "/downloads/" and http.request.uri.path.extension eq "txt"`
Specific directory and all its contents on all subdomains of a specific subdomain<br>_(Domain + Path)_ | `*cdn.example.com/file/*` | `http.request.full_uri contains "cdn.example.com/file/"`
Specific URL on all domains<br>_(Path)_ | `*/images`<br>(required [Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/)) | `http.request.uri.path eq "/images"`
Specific directory and its subdirectories on all domains<br>_(Path)_ | `*/images/*`<br>(required [Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/)) | `starts_with(http.request.uri.path, "/images/")`
Specific file in any directory<br>_(Path)_ | `*/wp-login.php`<br>(required [Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/)) | `ends_with(http.request.uri.path, "/wp-login.php")`
Specific query string on all domains<br>_(Path)_ | `*/*?country=GB`<br>(required [Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/)) | `http.request.uri.query eq "country=GB"`
Part of a query string on all domains<br>_(Path)_ | `*/*?*country=GB*`<br>(required [Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/)) | `http.request.uri.query contains "country=GB"`

{{</table-wrap>}}

## Feature correspondence table

The following table summarizes how different Page Rules settings will be migrated to other Rules features. You can refer to this table and the next sections to learn more about the new way of implementing a given Page Rules setting, and also to learn how you can manually migrate your existing Page Rules.

Page Rules setting          | New implementation uses...           | Migration/Replacement instructions
----------------------------|--------------------------------------|--------------------------------------------------------------------
Always Use HTTPS            | Redirect Rules (dynamic redirects)   | [Migrate Always Use HTTPS](#migrate-always-use-https)
Auto Minify                 | N/A (deprecated)                     | N/A
Browser Cache TTL           | Cache Rules                          | [Migrate Browser Cache TTL](#migrate-browser-cache-ttl)
Browser Integrity Check     | Configuration Rules                  | [Migrate Browser Integrity Check](#migrate-browser-integrity-check)
Bypass Cache on Cookie      | Cache Rules                          | [Migrate Bypass Cache on Cookie](#migrate-bypass-cache-on-cookie)
Cache By Device Type        | Cache Rules                          | [Migrate Cache By Device Type](#migrate-cache-by-device-type)
Cache Deception Armor       | Cache Rules                          | [Migrate Cache Deception Armor](#migrate-cache-deception-armor)
Cache Level                 | Cache Rules                          | [Migrate Cache Level](#migrate-cache-level)
Cache on Cookie             | Cache Rules                          | [Migrate Cache on Cookie](#migrate-cache-on-cookie)
Cache TTL by status code    | Cache Rules                          | [Migrate Cache TTL by status code](#migrate-cache-ttl-by-status-code)
Custom Cache Key            | Cache Rules                          | [Migrate Custom Cache Key](#migrate-custom-cache-key)
Disable Apps                | Configuration Rules                  | [Migrate Disable Apps](#migrate-disable-apps)
Disable Performance         | N/A (deprecated)                     | [Replace Disable Performance](#replace-disable-performance)
Disable Railgun             | N/A (deprecated)                     | N/A
Disable Security            | N/A (deprecated)                     | [Replace Disable Security](#replace-disable-security)
Disable Zaraz               | Configuration Rules                  | [Migrate Disable Zaraz](#migrate-disable-zaraz)
Edge Cache TTL              | Cache Rules                          | [Migrate Edge Cache TTL](#migrate-edge-cache-ttl)
Email Obfuscation           | Configuration Rules                  | [Migrate Email Obfuscation](#migrate-email-obfuscation)
Forwarding URL              | Redirect Rules (dynamic redirects)   | [Migrate Forwarding URL](#migrate-forwarding-url)
Host Header Override        | Origin Rules                         | [Migrate Host Header Override](#migrate-host-header-override)
IP Geolocation Header       | Transform Rules (Managed Transforms) | [Migrate IP Geolocation Header](#migrate-ip-geolocation-header)
Mirage                      | Configuration Rules                  | [Migrate Mirage](#migrate-mirage)
Opportunistic Encryption    | Configuration Rules                  | [Migrate Opportunistic Encryption](#migrate-opportunistic-encryption)
Origin Cache Control        | Cache Rules                          | [Migrate Origin Cache Control](#migrate-origin-cache-control)
Origin Error Page Pass-thru | Cache Rules                          | [Migrate Origin Error Page Pass-thru](#migrate-origin-error-page-pass-thru)
Polish                      | Configuration Rules                  | [Migrate Polish](#migrate-polish)
Query String Sort           | Cache Rules                          | [Migrate Query String Sort](#migrate-query-string-sort)
Resolve Override            | Origin Rules                         | [Migrate Resolve Override](#migrate-resolve-override)
Respect Strong ETags        | Cache Rules                          | [Migrate Respect Strong ETags](#migrate-respect-strong-etags)
Response Buffering          | N/A (deprecated)                     | N/A
Rocket Loader               | Configuration Rules                  | [Migrate Rocket Loader](#migrate-rocket-loader)
Security Level              | Configuration Rules                  | [Migrate Security Level](#migrate-security-level)
True Client IP Header       | Transform Rules (Managed Transforms) | [Migrate True Client IP Header](#migrate-true-client-ip-header)
SSL                         | Configuration Rules                  | [Migrate SSL](#migrate-ssl)
Web Application Firewall    | N/A (deprecated)                     | N/A

### Migrate Always Use HTTPS

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule to perform an automatic redirect from HTTP to HTTPS for all subdomains of `example.com` and the `example.com` domain itself:

- **URL** `*example.com/*`
- **Setting**: _Always Use HTTPS_

**How to migrate**:

1. [Create a dynamic redirect](/rules/url-forwarding/single-redirects/create-dashboard/) to always redirect HTTP requests to HTTPS for any hostname that contains `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com" AND SSL/HTTPS is off`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com" and not ssl)`

    - **Then**:
        - **Type**: _Dynamic_
        - **Expression**: `concat("https://", http.host, http.request.uri.path)`
        - **Status code**: _301_

    </div>

2. Turn off your existing Page Rule and validate the behavior of the redirect you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a dynamic redirect
-------------------------|------------------------------
![Example Page Rule with 'Always Use HTTPS' setting](/images/rules/reference/page-rules-migration/pr-always-use-https.png) | ![Dynamic redirect matching the 'Always Use HTTPS' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-always-use-https-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Automatic HTTPS Rewrites

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on Automatic HTTPS Rewrites for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Automatic HTTPS Rewrites_
- **Value**: On

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to always rewrite HTTP links to HTTPS for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Setting**: Automatic HTTPS Rewrites
        - **Value**: On

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Automatic HTTPS Rewrites' setting](/images/rules/reference/page-rules-migration/pr-automatic-https-rewrites.png) | ![Configuration rule matching the 'Automatic HTTPS Rewrites' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-automatic-https-rewrites-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Browser Cache TTL

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule adjusting browser cache TTL to one day for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Browser Cache TTL_
- **Enter Browser Cache TTL**: _a day_

**How to migrate**:

1. [Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to adjust browser cache TTL for caching resources in the browser to one day for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then**:
        - **Cache eligibility**: Eligible for cache
        - **Browser TTL**: Override origin and use this TTL
        - **Input time-to-live (TTL)**: _1 day_

    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with 'Browser Cache TTL' setting](/images/rules/reference/page-rules-migration/pr-browser-cache-ttl.png) | ![Cache rule matching the 'Browser Cache TTL' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-browser-cache-ttl-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Browser Integrity Check

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on Browser Integrity Check for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Browser Integrity Check_
- **Value**: On

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to turn on Browser Integrity Check for protecting against bots and threats for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Setting**: Browser Integrity Check
        - **Value**: On

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Browser Integrity Check' setting](/images/rules/reference/page-rules-migration/pr-browser-integrity-check.png) | ![Configuration rule matching the 'Browser Integrity Check' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-browser-integrity-check-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Bypass Cache on Cookie

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on Bypass Cache on Cookie for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Bypass Cache on Cookie_
- **Enter value**: `test_cookie`

**How to migrate**:

1. [Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to bypass cache for requests containing cookie `test_cookie` for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com" AND Cookie contains "test-cookie"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com" and http.cookie contains "test-cookie")`

    - **Then**:
        - **Cache eligibility**: Bypass cache

    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with 'Bypass Cache on Cookie' setting](/images/rules/reference/page-rules-migration/pr-bypass-cache-on-cookie.png) | ![Cache rule matching the 'Bypass Cache on Cookie' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-bypass-cache-on-cookie-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Cache By Device Type

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on Cache By Device Type for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Cache By Device Type_
- **Value**: On

**How to migrate**:

1. [Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to cache content based on user agent or device type for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then**:
        - **Cache eligibility**: Eligible for cache
        - **Setting**: Cache key
            - **Cache by device type**: On

    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with 'Cache By Device Type' setting](/images/rules/reference/page-rules-migration/pr-cache-by-device-type.png) | ![Cache rule matching the 'Cache By Device Type' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-cache-by-device-type-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Cache Deception Armor

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on Cache Deception Armor for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Cache Deception Armor

**How to migrate**:

1. [Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to protect against cache deception attacks for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then**:
        - **Cache eligibility**: Eligible for cache
        - **Setting**: Cache key
            - **Cache deception armor**: On

    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with 'Cache Deception Armor' setting](/images/rules/reference/page-rules-migration/pr-cache-deception-armor.png) | ![Cache rule matching the 'Cache Deception Armor' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-cache-deception-armor-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Cache Level (Cache Everything) { #migrate-cache-level }

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on caching of all assets for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Cache Level_
- **Select Cache Level**: _Cache Everything_

**How to migrate**:

1. [Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to adjust cache level for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then**:
        - **Cache eligibility**: Eligible for cache

    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with 'Cache Level' set to 'Cache Everything'](/images/rules/reference/page-rules-migration/pr-cache-level-everything.png) | ![Cache rule matching the 'Cache Level: Cache Everything' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-cache-level-everything-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Cache on Cookie

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on caching for responses that contained cookie `test-cookie` for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Cache on Cookie_
- **Enter value**: `test-cookie`

**How to migrate**:

1. [Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to cache responses containing cookie `test_cookie` for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com" AND Cookie contains "test-cookie"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com" and http.cookie contains "test-cookie")`

    - **Then**:
        - **Cache eligibility**: Eligible for cache

    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with 'Cache on Cookie' setting](/images/rules/reference/page-rules-migration/pr-cache-on-cookie.png) | ![Cache rule matching the 'Cache on Cookie' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-cache-on-cookie-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Cache TTL by status code

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on caching of every response with status code between `200` and `599` for one day, for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Cache TTL by status code_
- **Status code or enter range**: `200-599`
- **Select option**: _a day_

**How to migrate**:

1. [Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to cache responses with status code between `200` and `599` for one day for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then**:
        - **Cache eligibility**: Eligible for cache
        - **Setting**: Edge TTL
            - Use cache-control header if present, use default Cloudflare caching behavior if not
            - **Status code TTL**:
                - **Scope**: _Range_
                - **From**: _200_
                - **To**: _599_
                - **Duration**: _1 day_
    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with the 'Cache TTL by status code' setting](/images/rules/reference/page-rules-migration/pr-cache-ttl-by-status-code.png) | ![Cache rule matching the 'Cache TTL by status code' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-cache-ttl-by-status-code-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Custom Cache Key

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule setting a custom cache key for all query string parameters, for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Custom Cache Key_
    - **Query String**: All query string parameters

**How to migrate**:

1. [Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to set a custom cache key for all query string parameters, for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then**:
        - **Cache eligibility**: Eligible for cache
        - **Setting**: Cache key
            - **Query string**: All query string parameters
    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with the 'Custom Cache Key' setting](/images/rules/reference/page-rules-migration/pr-custom-cache-key.png) | ![Cache rule matching the 'Custom Cache Key' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-custom-cache-key-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Disable Apps

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning off Cloudflare Apps (deprecated) for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Disable Apps_

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to disable Cloudflare Apps (deprecated)  for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Setting**: Disable Apps

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Disable Apps' setting](/images/rules/reference/page-rules-migration/pr-disable-apps.png) | ![Configuration rule matching the 'Disable Apps' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-disable-apps-new.png)

{{</tab>}}
{{</tabs>}}

### Replace Disable Performance

{{<Aside type="warning">}}
The **Disable Performance** setting is deprecated. Any Page Rules with this setting will not be migrated.
{{</Aside>}}

This Page Rules setting turned off Auto Minify (deprecated), Mirage, Polish, and Rocket Loader. You can still turn on or off relevant Cloudflare features one by one using Configuration Rules.

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule with **Disable Performance** (deprecated) for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Disable Performance_

**How to replace**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to disable Mirage, Polish, and Rocket Loader for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Mirage**: Off
        - **Polish**: _Off_
        - **Rocket Loader**: Off

    </div>

3. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
4. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Disable Performance' setting](/images/rules/reference/page-rules-migration/pr-disable-performance.png) | ![Configuration rule partially matching the 'Disable Performance' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-disable-performance-new.png)

{{</tab>}}
{{</tabs>}}

### Replace Disable Security

{{<Aside type="warning">}}
The **Disable Security** setting is deprecated. Any Page Rules with this setting will not be migrated.
{{</Aside>}}

This Page Rules setting turns off Email Obfuscation, Rate Limiting (previous version), Scrape Shield, URL (Zone) Lockdown, and WAF managed rules (previous version). You can still turn on or off relevant Cloudflare features one by one using Configuration Rules and WAF custom rules.

{{<tabs labels="Dashboard">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule with **Disable Security** (deprecated) for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Disable Security_

This setting turned off a subset of Cloudflare security features: Email Obfuscation, Rate Limiting (previous version), Scrape Shield, URL (Zone) Lockdown, and WAF managed rules (previous version).

**How to replace**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to turn off one or more security features:

    - Email Obfuscation (part of [Cloudflare Scrape Shield](/waf/tools/scrape-shield/))
    - Hotlink Protection (part of Cloudflare Scrape Shield)

2. If required, [create a WAF exception](/waf/managed-rules/waf-exceptions/define-dashboard/) to skip one or more rules of WAF managed rulesets for requests coming from IP addresses in an allowlist.

3. Turn off your existing Page Rule and validate the behavior of the rules you created.

4. If your tests succeed, delete the existing Page Rule.

{{<Aside type="warning">}}
If you are still using WAF managed rules (previous version) or Rate Limiting (previous version), consider migrating to the new versions of these products. It is not possible to turn off these older products using modern Rules features. Refer to the [WAF's migration guides](/waf/reference/migration-guides/) for more information.
{{</Aside>}}

{{</tab>}}
{{</tabs>}}

### Migrate Disable Zaraz

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning off [Zaraz](/zaraz/) for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Disable Zaraz_

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to turn off Zaraz for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Setting**: Disable Zaraz

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Disable Zaraz' setting](/images/rules/reference/page-rules-migration/pr-disable-zaraz.png) | ![Configuration rule matching the 'Disable Zaraz' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-disable-zaraz-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Edge Cache TTL

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule adjusting Edge Cache TTL for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Edge Cache TTL_
- **Enter Edge Cache TTL**: _a day_

**How to migrate**:

1. [Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to adjust edge cache TTL for caching resources on Cloudflare edge to one day, for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then**:
        - **Cache eligibility**: Eligible for cache
        - **Setting**: Edge TTL
            - Ignore cache-control header and use this TTL
            - **Input time-to-live (TTL)**: _1 day_
    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with the 'Edge Cache TTL' setting](/images/rules/reference/page-rules-migration/pr-edge-cache-ttl.png) | ![Cache rule matching the 'Edge Cache TTL' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-edge-cache-ttl-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Email Obfuscation

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning off [Email Obfuscation](/waf/tools/scrape-shield/email-address-obfuscation/) for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Email Obfuscation_
- **Value**: Off

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to turn off Email Obfuscation for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Setting**: Email Obfuscation
            - **Value**: Off

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Email Obfuscation' setting](/images/rules/reference/page-rules-migration/pr-email-obfuscation.png) | ![Configuration rule matching the 'Email Obfuscation > Off' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-email-obfuscation-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Forwarding URL

**Example #1: Redirect `www` to root domain**

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule permanently redirecting `www.example.com` to `example.com` on all URI paths:

- **URL**: `www.example.com/*`
- **Setting**: _Forwarding URL_
- **Select Status code**: _301 - Permanent Redirect_
- **Destination URL**: `https://example.com/$1`

**How to migrate**:

1. [Create a dynamic redirect](/rules/url-forwarding/single-redirects/create-dashboard/) to permanently redirect requests from `www.example.com` to `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname equals "www.example.com"`
        - Using the Expression Editor:<br>
            `(http.host eq "www.example.com")`

    - **Then**:
        - **Type**: _Dynamic_
        - **Expression**: `concat("https://example.com", http.request.uri.path)`
        - **Status code**: _301_

    </div>

2. Turn off your existing Page Rule and validate the behavior of the redirect you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a dynamic redirect
-------------------------|------------------------------
![Example Page Rule #1 with 'Forwarding URL' setting](/images/rules/reference/page-rules-migration/pr-forwarding-url.png) | ![Dynamic redirect matching the 'Forwarding URL' setting of the example Page Rule #1](/images/rules/reference/page-rules-migration/pr-forwarding-url-new.png)

{{</tab>}}
{{</tabs>}}

**Example #2: Redirect all pages under old path to new path**

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule permanently redirecting `example.com/old-path` to `example.com/new-path`:

- **URL**: `example.com/old-path/*`
- **Setting**: _Forwarding URL_
- **Select Status code**: _301 - Permanent Redirect_
- **Destination URL**: `https://example.com/new-path/$1`

**How to migrate**:

1. [Create a dynamic redirect](/rules/url-forwarding/single-redirects/create-dashboard/) to permanently redirect requests for `example.com/old-path` to `example.com/new-path`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname equals "example.com" AND URI Path starts with "/old-path/"`
        - Using the Expression Editor:<br>
            `(http.host eq "example.com" and starts_with(http.request.uri.path, "/old-path/"))`

    - **Then**:
        - **Type**: _Dynamic_
        - **Expression**: `concat("/new-path/", substring(http.request.uri.path, 10))`<br>
        (where `10` (start byte value) is the length of `/old-path/`)
        - **Status code**: _301_

    </div>

2. Turn off your existing Page Rule and validate the behavior of the redirect you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a dynamic redirect
-------------------------|------------------------------
![Example Page Rule #2 with 'Forwarding URL' setting](/images/rules/reference/page-rules-migration/pr-forwarding-url-2.png) | ![Dynamic redirect matching the 'Forwarding URL' setting of the example Page Rule #2](/images/rules/reference/page-rules-migration/pr-forwarding-url-2-new.png)

{{</tab>}}
{{</tabs>}}


### Migrate Host Header Override

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule changing the `Host` HTTP header to `example.saas-provider.com`, for all requests addressed at any subdomain of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Host Header Override_
- **Enter value**: `example.saas-provider.com`

**How to migrate**:

1. [Create an origin rule](/rules/origin-rules/create-dashboard/) changing the `Host` header to `example.saas-provider.com` for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then**:
        - **Set origin parameters**:
            - **Host Header** > **Rewrite to**: `example.saas-provider.com`

    </div>

2. Turn off your existing Page Rule and validate the behavior of the origin rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to an origin rule
-------------------------|--------------------------------
![Example Page Rule with 'Host Header Override' setting](/images/rules/reference/page-rules-migration/pr-host-header-override.png) | ![Origin rule matching the 'Host Header Override' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-host-header-override-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate IP Geolocation Header

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule adding a `CF-IPCountry` HTTP header, for all requests addressed at any subdomain of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _IP Geolocation Header_
- **Value**: On

**How to migrate**:

1. [Turn on the **Add visitor location headers** Managed Transform](/rules/transform/managed-transforms/configure/) — a Transform Rules feature — to add the `CF-IPCountry` and other location headers to all requests.
2. Turn off your existing Page Rule and validate the behavior of the Managed Transform.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a Managed Transform
-------------------------|-------------------------------
![Example Page Rule with 'IP Geolocation Header' setting](/images/rules/reference/page-rules-migration/pr-ip-geolocation-header.png) | ![The 'Add visitor location headers' Managed Transform matching the 'IP Geolocation Header' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-ip-geolocation-header-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Mirage

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning off Mirage for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Mirage_
- **Value**: Off

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to turn off Mirage for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Setting**: Mirage
            - **Value**: Off

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Mirage' setting](/images/rules/reference/page-rules-migration/pr-mirage.png) | ![Configuration rule matching the 'Mirage > Off' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-mirage-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Opportunistic Encryption

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning off Opportunistic Encryption for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Opportunistic Encryption_
- **Value**: Off

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to turn off Opportunistic Encryption for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Setting**: Opportunistic Encryption
            - **Value**: Off

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Opportunistic Encryption' setting](/images/rules/reference/page-rules-migration/pr-opportunistic-encryption.png) | ![Configuration rule matching the 'Opportunistic Encryption > Off' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-opportunistic-encryption-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Origin Cache Control

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning off Origin Cache Control for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Origin Cache Control
- **Value**: Off

**How to migrate**:

1. [Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to determine edge cache behavior for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then**:
        - **Cache eligibility**: Eligible for cache
        - **Setting**: Origin Cache Control
            - **Enable Origin Cache Control**: Off

    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with 'Origin Cache Control' setting](/images/rules/reference/page-rules-migration/pr-origin-cache-control.png) | ![Cache rule matching the 'Origin Cache Control' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-origin-cache-control-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Origin Error Page Pass-thru

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on Origin Error Page Pass-thru for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Origin Error Page Pass-thru_
- **Value**: On

**How to migrate**:

1. [Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to determine edge cache behavior for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then**:
        - **Cache eligibility**: Eligible for cache
        - **Setting**: Origin error page pass-thru
            - **Use Origin error page pass-thru**: On

    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with 'Origin Error Page Pass-thru' setting](/images/rules/reference/page-rules-migration/pr-origin-error-page-pass-thru.png) | ![Cache rule matching the 'Origin Error Page Pass-thru > On' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-origin-error-page-pass-thru-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Polish

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning off [Polish](/images/polish/) for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Polish
- **Value**: Off

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to turn off Polish for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Setting**: Polish
            - **Select value**: _Off_

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Polish' setting](/images/rules/reference/page-rules-migration/pr-polish.png) | ![Configuration rule matching the 'Polish > Off' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-polish-new.png)

{{</tab>}}
{{</tabs>}}


### Migrate Query String Sort

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on Query String Sort for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Query String Sort_
- **Value**: On

**How to migrate**:

1. [Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to sort query string parameters for caching purposes, for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then**:
        - **Cache eligibility**: Eligible for cache
        - **Setting**: Cache key
            - **Sort query string**: On

    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with 'Query String Sort' setting](/images/rules/reference/page-rules-migration/pr-query-string-sort.png) | ![Cache rule matching the 'Query String Sort > On' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-query-string-sort-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Resolve Override

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule changing the origin to `example.saas-provider.com`, for all requests addressed at any subdomain of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Resolve Override_
- **Enter value**: `example.saas-provider.com`

**How to migrate**:

1. [Create an origin rule](/rules/origin-rules/create-dashboard/) overriding the origin to `example.saas-provider.com` for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then**:
        - **DNS Record** > **Override to**: `example.saas-provider.com`

    </div>

2. Turn off your existing Page Rule and validate the behavior of the origin rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to an origin rule
-------------------------|--------------------------------
![Example Page Rule with 'Resolve Override' setting](/images/rules/reference/page-rules-migration/pr-resolve-override.png) | ![Origin rule matching the 'Resolve Override' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-resolve-override-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Respect Strong ETags

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on byte-for-byte equivalency checks for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Respect Strong ETags_
- **Value**: On

**How to migrate**:

1. [Create a cache rule](/cache/how-to/cache-rules/create-dashboard/) to respect strong ETags for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then**:
        - **Cache eligibility**: Eligible for cache
        - **Setting**: Respect strong ETags
            - **Use strong ETag headers**: On

    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with 'Respect Strong ETags' setting](/images/rules/reference/page-rules-migration/pr-respect-strong-etags.png) | ![Cache rule matching the 'Respect Strong ETags > On' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-respect-strong-etags-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Rocket Loader

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning off Rocket Loader for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Rocket Loader_
- **Value**: Off

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to turn off Rocket Loader for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Setting**: Rocket Loader
            - **Value**: Off

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Rocket Loader' setting](/images/rules/reference/page-rules-migration/pr-rocket-loader.png) | ![Configuration rule matching the 'Rocket Loader > Off' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-rocket-loader-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate Security Level

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule setting Security Level to _I'm Under Attack_ for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _Security Level_
- **Select Security Level**: _I'm Under Attack_

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to set Security Level to _I'm Under Attack_, for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Setting**: Security Level
            - **Select Security Level**: _I'm Under Attack_

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Security Level' setting](/images/rules/reference/page-rules-migration/pr-security-level.png) | ![Configuration rule matching the "Security Level > I'm Under Attack" setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-security-level-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate True Client IP Header

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule adding a `True-Client-IP` HTTP header for all requests addressed at any subdomain of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _True Client IP Header_
- **Value**: On

**How to migrate**:

1. [Turn on the **Add "True-Client-IP" header** Managed Transform](/rules/transform/managed-transforms/configure/) — a Transform Rules feature — to add the `True-Client-IP` header to all requests.
2. Turn off your existing Page Rule and validate the behavior of the Managed Transform.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a Managed Transform
-------------------------|-------------------------------
![Example Page Rule with 'True Client IP Header' setting](/images/rules/reference/page-rules-migration/pr-true-client-ip-header.png) | ![The 'Add "True-Client-IP" header' Managed Transform matching the 'True Client IP Header' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-true-client-ip-header-new.png)

{{</tab>}}
{{</tabs>}}

### Migrate SSL

{{<tabs labels="Dashboard | Visual guide">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule setting SSL to _Strict_ for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: _SSL_
- **Select SSL/TLS encryption mode**: _Strict_

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to set SSL to _Strict_, for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Setting**: SSL
            - **Select SSL/TLS encryption mode**: _Strict_

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'SSL' setting](/images/rules/reference/page-rules-migration/pr-ssl.png) | ![Configuration rule matching the "SSL" setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-ssl-new.png)

{{</tab>}}
{{</tabs>}}

## Settings that will not be migrated

The following Page Rules settings will not be migrated to other types of rules:

- **Auto Minify** (this setting is deprecated)
- **Disable Performance** (this setting is deprecated)
- **Disable Railgun** (this setting is deprecated, since Railgun is no longer available)
- **Disable Security** (this setting is deprecated)
- **Response Buffering** (this setting is deprecated)
- **Web Application Firewall** (this setting is deprecated, since the previous version of WAF managed rules is deprecated)

All other Page Rules settings will be migrated during 2025.

## More resources

If you have feedback to share, refer to our [Community thread](https://community.cloudflare.com/t/important-page-rules-deprecation/656021).