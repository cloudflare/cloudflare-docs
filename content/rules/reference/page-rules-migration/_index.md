---
title: Page Rules migration guide
pcx_content_type: how-to
weight: 3
---

# Page Rules migration guide

**Cloudflare Page Rules is now deprecated.** For new Cloudflare accounts and zones, Page Rules will stop being available on Free plans from 2024-07-01 onward (refer to the full calendar below). For existing accounts and zones, Page Rules will switch to read-only mode on 2025-01-06, and existing rules will be migrated to different Rules features throughout 2025. This change will affect customers using the Cloudflare dashboard, the Cloudflare API, and the Cloudflare Terraform provider.

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


Page Rules setting | New implementation uses...        | Migration/Replacement instructions
-------------------|-----------------------------------|------------------------------------------------------
Always Use HTTPS   | Redirect Rules (dynamic redirect) | [Migrate Always Use HTTPS](#migrate-always-use-https)
(...)              | (...)                             | (...)

### Migrate Always Use HTTPS

{{<tabs labels="Dashboard | Visual guide | Terraform">}}
{{<tab label="dashboard" no-code="true">}}

**Context:**

You configured a Page Rule to enable automatic redirect from HTTP to HTTPS for all subdomains of `example.com` and the `example.com` domain itself:

* **URL** (required): `*example.com/*`
* **Setting**: Always Use HTTPS

**How to migrate**:

1. Create a dynamic redirect to always redirect HTTP requests to HTTPS for any hostname that contains `example.com`:

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

2. Disable your existing Page Rule and validate the behavior of the redirect you created.
3. If your tests succeed, delete the existing Page Rule.

{{</tab>}}
{{<tab label="visual guide" no-code="true">}}

Page Rules configuration | Migrate to a dynamic redirect
-------------------------|-----------------------------------
![Page Rule with 'Always Use HTTPS' enabled](/images/rules/reference/page-rules-migration/pr-always-use-https.png) | ![Dynamic redirect matching the 'Always Use HTTPS' setting of Page Rules](/images/rules/reference/page-rules-migration/pr-always-use-https-new.png)

{{</tab>}}
{{<tab label="terraform" no-code="true">}}

TODO

{{</tab>}}
{{</tabs>}}