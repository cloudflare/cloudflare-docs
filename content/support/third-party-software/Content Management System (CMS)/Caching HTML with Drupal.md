---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115002911927-Caching-HTML-with-Drupal
title: Caching HTML with Drupal
---

# Caching HTML with Drupal

## Overview

{{<Aside type="note">}}
Customers in all Cloudflare plans can cache HTML files using Cloudflare Page Rules. However, only customers in the Business and Enterprise plans are able to bypass HTML caching whenever a cookie is sent with a *Bypass Cache on Cookie* setting using Cloudflare Page Rules.
{{</Aside>}}

You can [cache HTML of inactive users](https://blog.cloudflare.com/caching-anonymous-page-views/) and static content including likes, images, scripts, and stylesheets when using Drupal with Cloudflare by using the _Cache Everything_ **Page Rule** with **Bypass Cache on Cookie** enabled.

___

## Enable Browser Cache TTL

To avoid browser cache collisions, you must first enable Bypass Cache on Cookie in the Cloudflare dashboard. To do this,

1\. Log in to your Cloudflare account.

2\. Click on the **Caching** app.

3\. Scroll down to **Browser Cache TTL** and choose **Respect Existing Headers**.

Now, you can configure the _Bypass Cache on Cookie_ setting using Cloudflare **Page Rules**. 

___

## Set Bypass Cache on Cookie

When the _Bypass Cache on Cookie_ page rule matches the criteria we set, Cloudflare will cache static images and other files, without caching HTML. To configure _Bypass Cache on Cookie_ using **Page Rules**, 

1\. Log in to your Cloudflare account.

2\. Go to **Rules > Page Rules**.

3\. Click the **Create Page Rule** button and enter your domain. In the example below, the domain is www.orangeclouded.com. 

4\. Configure the Page Rules settings as follows:

-   use the _\*_ wildcard operator on the Drupal installation path to match the entire domain
-   set the Cache Level to Cache Everything
-   text, set _Bypass Cache on Cookie_ rule for the Drupal variables. This rule will override the _Cache Everything_ rule when a user is logged into Drupal
-   set the _Edge Cache TTL_ setting to determine how long a Cloudflare cache server should store cached files.

If you use additional cookies in your Drupal site, you must ensure these are in the Regex statement: _SESS.\*|phpsessid=.\*_

![The Create a Page Rule dialog with the Cache Level set to Cache Everything, Bypass Cache on Cookie set to Drupal variables, and Edge Cache TTL set to a month.](/images/support/page_rules_caching_static_HTML_with_drupal.png)

Now, when Cloudflare is serving cached files, a C_F-Cache-Status: HIT_ header will be sent back to the browser.

___

## Related Resources

-   [Caching Cloudflare CDN](/cache/concepts/default-cache-behavior/)
