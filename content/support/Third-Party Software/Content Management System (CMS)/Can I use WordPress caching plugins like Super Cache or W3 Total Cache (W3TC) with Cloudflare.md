---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200169756-Can-I-use-WordPress-caching-plugins-like-Super-Cache-or-W3-Total-Cache-W3TC-with-Cloudflare-
title: Can I use WordPress caching plugins like Super Cache or W3 Total Cache (W3TC) with Cloudflare
---

# Can I use WordPress caching plugins like Super Cache or W3 Total Cache (W3TC) with Cloudflare?

## Overview

It is possible to cache the HTML of a WordPress site at Cloudflare's Edge using a feature known as "Bypass Cache on Cookie". This can dramatically improve the speed of your website and reduce server load; in cases where the HTML is cached, Cloudflare will not need to make a roundtrip to your web server. In order to utilize this feature, refer to the article: [Caching Static HTML with WordPress/WooCommerce](https://support.cloudflare.com/hc/en-us/articles/236166048-Caching-Static-HTML-with-WordPress-WooCommerce).

Cloudflare is able to proxy HTTP traffic of any website, including WordPress sites with third-party performance plugins installed, however, please note that these plugins are installed at your own risk.
