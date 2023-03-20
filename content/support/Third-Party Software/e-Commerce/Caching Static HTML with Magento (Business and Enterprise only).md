---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/236168808-Caching-Static-HTML-with-Magento-Business-and-Enterprise-only-
title: Caching Static HTML with Magento (Business and Enterprise only)
---

# Caching Static HTML with Magento (Business and Enterprise only)



## Overview

{{<Aside type="note">}}
All Cloudflare customers can configure caching HTML files. However, only
customers in the Business and Enterprise plans are able to bypass HTML
caching when a cookie is sent with Bypass Cache on Cookie request using
Cloudflare **Page Rules**.
{{</Aside>}}

Business and Enterprise customers using Magento can cache anonymous page views with our _Bypass Cache on Cookie_ page rule. This setting caches static HTML at the Cloudflare edge with no need for regeneration from request to request.

Before logging in to the Magento admin panel or adding something to a shopping cart, the page view is anonymized and it's possible to cache the requests so that Magento doesn't need to constantly regenerate the HTML at your origin server.

___

## Cache Static HTML with Cloudflare Page Rules

To cache static HTML using Cloudflare **Page Rules,**

1\. Log in to your Cloudflare account.

2\. Click on the **Caching** app. 

3\. Scroll down to **Browser Cache TTL** option and choose **Respect Existing Headers**.

With this setting in place, you can set the necessary Page Rules to cache anonymize page visits.

4\. Go to **Rules >** **Page Rules**.

5\. Click the **Create Page Rule** button and enter your domain. In the example below, the domain is www.orangeclouded.com.

-   _Cache Everything_ will instruct Cloudflare to cache static HTML.
-   When the _Bypass Cache on Cookie_ rule matches the criteria we set, Cloudflare won't cache HTML ([whilst static images and other files will still be cached](https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-)). Depending on whether you're using Magento 1 or Magento 2, you will need a different rule:

`Magento 1    external_no_cache=.*|PHPSESSID=.*|adminhtml=.* Magento 2    admin=.*|PHPSESSID=.*|private_content_version=.*`

-   Finally, setting _Edge Cache TTL_ will define the maximum period of time Cloudflare should keep cached files before getting them back from the origin. Even after setting a long Edge Cache TTL time, you can still  before this time expires.

![The Create a Page Rule dialog with settings to instruct Cloudflare to cache static HTML, the Bypass Cache on cookie rule instructing Cloudflare not to cache HTML while static images and other files are still cached, and the Edge Cache TTL set to a month.](/support/static/hc-import-page_rules_caching_static_html_with_magento.png)

6\. Click **Save and Deploy**.

{{<Aside type="note">}}
Enterprise Cloudflare customers can use Custom Cache Keys to take their
performance further, contact your Customer Success Manager if
interested.
{{</Aside>}}

___

## Troubleshooting issues on Magento 1.8.x or 1.9.x

If you setup **Bypass Cache on Cookie** on a Magento 1.8.x site or a 1.9.x site you may notice that the "Add to Cart" functionality doesn't work on a user's first attempt to add an item to a shopping cart.

Magento 1.8.x and 1.9.x introduced [Cross Site Request Forgery checks](https://www.section.io/blog/csrf-and-caching/) (CSRF) across all Magento forms. As this uses cookies, anonymous caching mechanisms can cause issues. There are three ways to fix this issue. We have listed the options based on their security level below.

1. Least Secure: The configuration at _System -> Configuration -> System -> CSRF protection -> Add Secret Key To Url_ is set to _Yes_ by default. Setting this to _No_ will disable CSRF security protection on your entire Magento frontend, you should only use this option if you have a separate mechanism for CSRF protection enabled on your site, we do not recommend this approach. Please note that there is a similarly named configuration for the admin panel at _System -> ADMIN -> System -> CSRF protection -> Add Secret Key To Url_; this configuration should be kept to Yes and **not altered**. This configuration provides security to your admin endpoint and therefore extra caution should be used.

2. Somewhat Secure: A Magento community module exists which allows users to only disable CSRF checks on the "Add to Cart" form, where the security risk is less significant; the [Inovarti\_FixAddToCartMage18](https://github.com/deivisonarthur/Inovarti_FixAddToCartMage18/blob/master/README.md) plugin does this by allowing the "Add to Cart" functionality from CSRF protection. 

3. Most Secure: The best alternative is to use AJAX to dynamically fill in the value of the CSRF token in your Magento site. When a user clicks the button to add something to their cart, some JavaScript jumps in to update the CSRF token in the forms to match the user’s session. This can enable most of the page to be served from cache but will still require a request back to the origin to fetch the token.

This final AJAX mechanism is implemented in a plugin called the [Magento Turpentine extension](https://github.com/nexcess/magento-turpentine). Whilst this plugin was built for performing caching with Varnish, it can also be used with Cloudflare.

There are a couple of options for installing this:

-   Download and install the tarball package from the Downloads page on GitHub (note that this is not the "Download as tar.gz" button) and install through Magento Connect Downloader or Magento's _mage_ command.
-   Install through  with the extension key: `http://connect20.magentocommerce.com/community/Nexcessnet_Turpentine`
-   Install with . You would just need to use: `modman clone https://github.com/nexcess/magento-turpentine.git`

After installing the plugin, navigate to _System -> Configration -> TURPENTINE -> Varnish Options_ and find the "Use VCL fix" option, set it to "Disable" and save.

![Use VCL fix option set to Disable.](/support/static/hc-import-use_vcl_fix_magento_cache_static_html.png)

___

## Related resources

-   [Understanding Cloudflare's CDN](https://support.cloudflare.com/hc/en-us/articles/200172516)
