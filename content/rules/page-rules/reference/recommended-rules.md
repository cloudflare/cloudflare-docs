---
pcx_content_type: configuration
source: https://support.cloudflare.com/hc/en-us/articles/224509547-Recommended-Page-Rules-to-consider
title: Recommended rules
meta:
    title: Recommended rules | Page Rules
---

# Recommended rules

Use Cloudflare Page Rules to improve the user experience of your domain with hardened security and enhanced site performance, while increasing reliability and minimizing bandwidth usage for your origin server.

{{<render file="_page-rules-migration.md">}}

Keep in mind that not all rules will be right for everyone, but these are some of the most popular.

- 301/302 Forwarding URL
- Security Level and Cache Level
- Edge Cache TTL, Always Online, and Browser Cache TTL

### 301/302 Forwarding URL

{{<Aside type="note">}}
Consider using [Dynamic Redirects](/rules/url-forwarding/single-redirects/) or [Bulk Redirects](/rules/url-forwarding/bulk-redirects/) to forward or redirect traffic to a different URL due to ease of use, maintenance, and cost. You should only use Page Rules when Dynamic or Bulk Redirects do not meet your use case.
{{</Aside>}}

Two common examples for using forwarding URLs are:

- Defining the root as the canonical version of your domain.
- Directing visitors to a specific page with an easy to remember URL.

This example page rule configuration defines the root as the canonical version of your domain:

{{<example>}}

- **If the URL matches**: `*www.example.com/*`
- **Setting**: _Forwarding URL_ | **Select status code**: _301 Permanent Redirect_
- **Enter destination URL**: `https://example.com/$2`

{{</example>}}

This example redirects visitors to a specific page with an easy to remember URL:

{{<example>}}

- **If the URL matches**: `*www.example.com/fb*`
- **Setting**: _Forwarding URL_ | **Select status code**: _302 Temporary Redirect_
- **Enter destination URL**: `https://www.facebook.com/username`

{{</example>}}

### Security Level and Cache Level

Certain sections of a website, like the login or admin section, have different security and performance requirements than your general public-facing pages.

The following example page rule configuration performs several security and cache adjustments for requests targeting a specific path:

{{<example>}}

- **If the URL matches**: `example.com/user*`
- **Setting**: _Security Level_ | **Value**: _High_
- **Setting**: _Cache Level_ | **Value**: _Bypass_
- **Setting**: _Disable Apps_

{{</example>}}

### Edge Cache TTL and Browser Cache TTL

Certain resources on your domain will likely not change often. For these resources, taking advantage of aggressive caching options can significantly reduce the load on your server and bandwidth utilization.

#### Examples

In the following example page rule configuration, the target is a folder that holds the majority of the image assets as well as some other types of multimedia.

{{<example>}}

- **If the URL matches**: `example.com/sites/default/files*`
- **Setting**: _Browser Cache TTL_ | **Value**: _a day_
- **Setting**: _Cache Level |_ **Value**: _Cache Everything_
- **Setting**: _Edge Cache TTL |_ **Value**: _7 days_

{{</example>}}

The following example page rule configuration applies unique rules for critical pages that do not change very often.

{{<example>}}

- **If the URL matches**: `example.com/terms-of-service`
- **Setting**: _Browser Cache TTL_ | **Value**: _a day_
- **Setting**: _Always Online |_ **Value**: _On_
- **Setting**: _Cache Level_ | **Value**: _Cache Everything_
- **Setting**: _Edge Cache TTL_ | **Value**: _a month_

{{</example>}}