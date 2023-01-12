---
title: Create custom cache keys
pcx_content_type: how-to
---

# Create custom cache keys

A [Cache Key](/cache/about/cache-keys/) is an identifier that Cloudflare uses for a file in our cache, and the Cache Key Template defines the identifier for a given HTTP request.

1.  Log in to your Cloudflare account.
2.  Select the domain that requires changes to the Cache Key Template.
3.  Select **Rules** > **Page Rules**.
4.  Select **Create Page Rule**.
5.  Under **If the URL matches**, enter the URL to match.
6.  Under **Then the settings are**, choose **Custom Cache Key** from the dropdown.
7.  Select the appropriate _Query String_ setting.
8.  (Optional) Select **Advanced** and enter appropriate settings for:
    - `Headers`
    - `Cookie`
    - `Host`
    - `User Features`
9.  Choose a save option:
    - **Save as Draft** to save the rule and leave it disabled. Note that disabled rules count towards the number of rules allowed for your domain.
    - **Save and Deploy** to save the rule and enable it immediately.

## Availability

{{<feature-table id="cache.cache_key">}}
