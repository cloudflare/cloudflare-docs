---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200172316-How-do-I-include-or-exclude-a-specific-URL-from-Cloudflare-s-page-rules-
title: How do I include or exclude a specific URL from Cloudflare's page rules
---

# How do I include or exclude a specific URL from Cloudflare's page rules?



You can exclude certain URLs from Cloudflare's caching by using the [Page Rules](http://dash.cloudflare.com/?to=/:account/:zone/rules) in the Cloudflare dashboard to set **Cache Level** to _Bypass_. The first step to using **Page Rules** is to define a pattern that defines when the rule is triggered. These patterns can be simple, such as a single URL, or complicated including multiple wildcards. Imagine you have a content management system with a single administrative URL:

`https://www.example.com/admin.php`

If you want Cloudflare's performance and caching options off for this URL, then you would turn off the options using the drop down menus or toggles for the various Cloudflare features.

### Wildcard and Advanced Pattern Matching

The pattern above will only match the following URL:

`https://www.example.com/admin.php`

It will not match any of the following URLs:

`http://www.example.com/admin.php  [http ≠ https]` `https://example.com/admin.php  [missing www subdomain]` `https://www.example.com/admin  [admin ≠ admin.php]`

You can make rules more flexible by including wildcards with the \* character. For example, if you wanted the pattern to match all four of the above URLs, you could use a pattern like:

`*example.com/admin*`

A wildcard can represent zero or more characters and can be used anywhere in the pattern. So, for example, the following pattern:

`https://www.example.com/*b*/*`

Would match:

`https://www.example.com/blog/` `https://www.example.com/blog/index.php` `https://www.example.com/b/admin/folder/index.php` `https://www.example.com/myblog/`

But would not match:   

`https://www.example.com/blog  [missing the trailing slash]` `https://www.example.com/sam/index.php  [sam doesn't contain a "b"]`

{{<Aside type="note">}}
Page Rules are applied in the order that they are listed. If you want to
change the position of a Page Rule, you can drag it up or down using the
icon on the left hand side.
{{</Aside>}}

For a full Page Rule tutorial, [visit this article.](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/)
