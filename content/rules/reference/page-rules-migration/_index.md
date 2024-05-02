---
title: Page Rules migration guide
pcx_content_type: how-to
weight: 3
---

# Page Rules migration guide

**Cloudflare Page Rules is now deprecated.** For new Cloudflare accounts and zones, Page Rules will stop being available on Free plans from 2024-07-01 onward (refer to [Relevant dates](#relevant-dates) for information on other plans). For existing accounts and zones, Page Rules will switch to read-only mode on 2025-01-06, and existing rules will be migrated to different Rules features throughout 2025. This change will affect customers using the Cloudflare dashboard, the Cloudflare API, and the Cloudflare Terraform provider.

Cloudflare recommends that you start transitioning from Page Rules to our new Rules features immediately by following the recommendations in this migration guide.

## Relevant dates

- **2024-07-01** – Page Rules no longer available for new Cloudflare accounts and zones on a Free plan.
- **2024-08-01** – Page Rules no longer available for new Cloudflare accounts and zones on a Pro or Business plan.
- **2024-10-01** – Page Rules no longer available for new Cloudflare accounts and zones on an Enterprise plan.
- **2025-01-06** – For existing accounts and zones on any plan, you can no longer create or edit Page Rules (read-only mode).
- **2025 (all year)** – Migration of existing Page Rules to modern Rules features.

## Context

Cloudflare Page Rules has several fundamental limitations, such as triggering solely based on URL patterns and being limited to 125 rules per zone for performance reasons. These rules are also complex to debug when multiple page rules apply to the same incoming request.

In 2022, we announced in our blog “The future of Page Rules” that Page Rules would be replaced with a suite of dedicated products, each built to be best-of-breed and put more power into the hands of our users. The new Rules products — Configuration Rules, Compression Rules, Origin Rules, Redirects, and Transform Rules — are now generally available (GA) and have already been adopted by tens of thousands of Cloudflare customers.

## Main differences

- **New engine**: New Rules features are powered by the Ruleset Engine, which offers versatile configuration with a robust language that supports many HTTP request and response fields.

- **Improved scalability**: Thanks to the improved scalability, Cloudflare plans now have increased quotas: Enterprise plans have access to a minimum of 500 rules per zone, Business plan zones go from 50 to 200 rules per zone, Pro plans go from 20 to 100,  and Free plans go from 3 to 40 rules per zone.

- **Easier troubleshooting**: Rule execution is more predictable, since each rule operates independently, simplifying troubleshooting. Additionally, Cloudflare Trace helps understand rule interactions.

- **Improved consistency**: New Rules features also ensure consistency, with common fields and capabilities shared across products, offering a seamless experience and predictable Terraform configurations.

## Page Rules migration

Cloudflare plans to migrate your existing Page Rules during 2025. However, it is strongly recommended that you understand the correspondence between the different Page Rules settings and new Rules features ahead of the migration, and learn how you can implement the new types of rules in your Cloudflare account.

This migration guide will be updated in the following months with more information on the migration process that will occur during 2025. Cloudflare users will receive email updates about the migration of the Page Rules configured on their Cloudflare account before the migration occurs.

### Settings that will not be migrated

The following Page Rules settings will not be migrated to other types of rules:

- **Disable Performance** (this setting is deprecated)
- **Disable Railgun** (this setting is deprecated, since Railgun is no longer available)
- **Disable Security** (this setting is deprecated)
- **Response Buffering** (this setting is deprecated)
- **Server Side Excludes** (this setting is deprecated, since Server-side Excludes is deprecated)
- **Web Application Firewall** (this setting is deprecated, since the previous version of WAF managed rules is deprecated)

If you have a use case for these settings and you intend to keep their behavior, you will need to implement it yourself using new Rules features, since these settings will not be migrated.

## Feature correspondence table

The following table summarizes how different Page Rules settings will be migrated to other Rules features. You can refer to this table and the next sections to learn more about the new way of implementing a given Page Rules setting, and also to learn how you can manually migrate your existing Page Rules.


Page Rules setting          | New implementation uses...           | Migration/Replacement instructions
----------------------------|--------------------------------------|--------------------------------------------------------------------
Always Use HTTPS            | Redirect Rules (dynamic redirect)    | [Migrate Always Use HTTPS](#migrate-always-use-https)
Auto Minify                 | Configuration Rules                  | [Migrate Auto Minify](#migrate-auto-minify)
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
True Client IP              | Transform Rules (Managed Transforms) | [Migrate True Client IP](#migrate-true-client-ip)
Server Side Excludes        | N/A (deprecated)                     | N/A
SSL                         | Configuration Rules                  | [Migrate SSL](#migrate-ssl)
Web Application Firewall    | N/A (deprecated)                     | N/A

### Migrate Always Use HTTPS

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule to perform an automatic redirect from HTTP to HTTPS for all subdomains of `example.com` and the `example.com` domain itself:

- **URL** `*example.com/*`
- **Setting**: Always Use HTTPS

**How to migrate**:

1. Create a [dynamic redirect](/rules/url-forwarding/single-redirects/) to always redirect HTTP requests to HTTPS for any hostname that contains `example.com`:

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
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Migrate Auto Minify

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on Auto Minify for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Auto Minify
- **Apply to**: _CSS_, _JS_

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to always apply minification to CSS and JavaScript assets for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Type**: Auto Minify
        - **File extensions to minify automatically**: _CSS_, _JS_

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Auto Minify' setting](/images/rules/reference/page-rules-migration/pr-auto-minify.png) | ![Configuration rule matching the 'Auto Minify' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-auto-minify-new.png)

{{</tab>}}
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Migrate Automatic HTTPS Rewrites

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on Automatic HTTPS Rewrites for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Automatic HTTPS Rewrites

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to always rewrite HTTP links to HTTPS for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Type**: Automatic HTTPS Rewrites

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Automatic HTTPS Rewrites' setting](/images/rules/reference/page-rules-migration/pr-auto-minify.png) | ![Configuration rule matching the 'Automatic HTTPS Rewrites' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-auto-minify-new.png)

{{</tab>}}
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Migrate Browser Cache TTL

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule adjusting browser cache TTL to one day for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Browser Cache TTL
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
        - **Input time-to-live (TTL)**: 1 day

    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with 'Browser Cache TTL' setting](/images/rules/reference/page-rules-migration/pr-browser-cache-ttl.png) | ![Cache rule matching the 'Browser Cache TTL' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-browser-cache-ttl-new.png)

{{</tab>}}
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Migrate Browser Integrity Check

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on Browser Integrity Check for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Browser Integrity Check

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to turn on Browser Integrity Check for protecting against bots and threats for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Type**: Browser Integrity Check

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Browser Integrity Check' setting](/images/rules/reference/page-rules-migration/pr-browser-integrity-check.png) | ![Configuration rule matching the 'Browser Integrity Check' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-browser-integrity-check-new.png)

{{</tab>}}
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Migrate Bypass Cache on Cookie

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on Bypass Cache on Cookie for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Bypass Cache on Cookie
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
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Migrate Cache By Device Type

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on Cache By Device Type for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Cache By Device Type

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
        - **Cache key**: Cache by device type

    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with 'Cache By Device Type' setting](/images/rules/reference/page-rules-migration/pr-cache-by-device-type.png) | ![Cache rule matching the 'Cache By Device Type' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-cache-by-device-type-new.png)

{{</tab>}}
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Migrate Cache Deception Armor

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
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
        - **Cache key**: Cache deception armor

    </div>

2. Turn off your existing Page Rule and validate the behavior of the cache rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a cache rule
-------------------------|------------------------
![Example Page Rule with 'Cache Deception Armor' setting](/images/rules/reference/page-rules-migration/pr-cache-deception-armor.png) | ![Cache rule matching the 'Cache Deception Armor' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-cache-deception-armor-new.png)

{{</tab>}}
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Migrate Cache Level (Cache Everything) { #migrate-cache-level }

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on caching of all assets for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Cache Level
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
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Migrate Cache on Cookie

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on caching for responses that contained cookie `test-cookie` for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Cache on Cookie
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
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Migrate Cache TTL by status code

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning on caching of every response with status code between `200` and `599` for one day, for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Cache TTL by status code
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
        - **Edge TTL**: Use cache-control header if present, use default Cloudflare caching behavior if not
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
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Migrate Custom Cache Key

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule setting a custom cache key for all query string parameters, for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Custom Cache Key
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
        - **Cache key**:

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
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Migrate Disable Apps

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning off Cloudflare Apps (deprecated) for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Disable Apps

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to disable Cloudflare Apps (deprecated)  for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Type**: Disable Apps

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Disable Apps' setting](/images/rules/reference/page-rules-migration/pr-disable-apps.png) | ![Configuration rule matching the 'Disable Apps' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-disable-apps-new.png)

{{</tab>}}
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Replace Disable Performance

{{<Aside type="warning">}}
The **Disable Performance** setting is deprecated. Any Page Rules with this setting will not be migrated.
{{</Aside>}}

This Page Rules setting turned off Auto Minify (deprecated), Mirage, Rocket Loader, and Polish. You can still turn on or off relevant Cloudflare features one by one using Configuration Rules.

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule with **Disable Performance** (deprecated) for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Disable Performance

**How to replace**:

1. [Turn off Auto Minify (deprecated)](/speed/optimization/content/auto-minify/) globally for your zone, and [create a configuration rule](/rules/configuration-rules/create-dashboard/) to turn it on for specific requests.

2. Create a second configuration rule to disable Mirage, Rocket Loader, and Polish for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Mirage**: Off
        - **Rocket Loader**: Off
        - **Polish**: Off

    </div>

3. Turn off your existing Page Rule and validate the behavior of the configuration rules you created.
4. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to configuration rules
-------------------------|--------------------------------
![Example Page Rule with 'Disable Performance' setting](/images/rules/reference/page-rules-migration/pr-disable-apps.png) | ![Configuration rule partially matching the 'Disable Performance' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-disable-apps-new.png)

{{</tab>}}
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Replace Disable Security

{{<Aside type="warning">}}
The **Disable Security** setting is deprecated. Any Page Rules with this setting will not be migrated.
{{</Aside>}}

This Page Rules setting turns off Email Obfuscation, Rate Limiting (previous version), Scrape Shield, Server Side Excludes, URL (Zone) Lockdown, and WAF managed rules (previous version). You can still turn on or off relevant Cloudflare features one by one using Configuration Rules and WAF custom rules.

{{<tabs labels="Dashboard">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule with **Disable Security** for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Disable Security

This setting turned off a subset of Cloudflare security features: Email Obfuscation, Rate Limiting (previous version), Scrape Shield, Server Side Excludes, URL (Zone) Lockdown, and WAF managed rules (previous version).

**How to replace**:

1. Create a configuration rule to turn off one or more security features:

    - Email Obfuscation (part of Scrape Shield)
    - Server Side Excludes (part of Scrape Shield)
    - Hotlink Protection (part of Scrape Shield)

2. If required, create a WAF custom rule to block requests from IP addresses not present in an allowlist of IPs and CIDR ranges (recommended instead of using Zone Lockdown).

3. If you are still using WAF managed rules (previous version) or Rate Limiting (previous version), consider migrating to the new versions of these products. It is not possible to turn off these older products using modern Rules features.

4. Turn off your existing Page Rule and validate the behavior of the rules you created.

5. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{</tabs>}}

### Migrate Disable Zaraz

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning off Zaraz for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Disable Zaraz

**How to migrate**:

1. [Create a configuration rule](/rules/configuration-rules/create-dashboard/) to turn off Zaraz for any hostname containing `example.com`:

    <div class="DocsMarkdown--example">

    - **When incoming requests match**: Custom filter expression
        - Using the Expression Builder:<br>
            `Hostname contains "example.com"`
        - Using the Expression Editor:<br>
            `(http.host contains "example.com")`

    - **Then the settings are**:
        - **Type**: Disable Zaraz

    </div>

2. Turn off your existing Page Rule and validate the behavior of the configuration rule you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a configuration rule
-------------------------|--------------------------------
![Example Page Rule with 'Disable Zaraz' setting](/images/rules/reference/page-rules-migration/pr-disable-zaraz.png) | ![Configuration rule matching the 'Disable Zaraz' setting of the example Page Rule](/images/rules/reference/page-rules-migration/pr-disable-zaraz-new.png)

{{</tab>}}
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Migrate Edge Cache TTL

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule adjusting Edge Cache TTL for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Edge Cache TTL
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
        - **Edge TTL**: Ignore cache-control header and use this TTL
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
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Migrate Email Obfuscation

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule turning off Email Obfuscation for all subdomains of `example.com` and the `example.com` domain itself:

- **URL**: `*example.com/*`
- **Setting**: Email Obfuscation
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
        - **Type**: Email Obfuscation
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
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}

### Migrate Forwarding URL

### Migrate Host Header Override
### Migrate IP Geolocation Header
### Migrate Mirage
### Migrate Opportunistic Encryption
### Migrate Origin Cache Control
### Migrate Origin Error Page Pass-thru
### Migrate Polish
### Migrate Query String Sort
### Migrate Resolve Override
### Migrate Respect Strong ETags
### Migrate Rocket Loader
### Migrate Security Level
### Migrate True Client IP
### Migrate SSL
