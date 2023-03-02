---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200169416-How-to-configure-Matomo-for-use-with-Cloudflare
title: How to configure Matomo for use with Cloudflare
---

# How to configure Matomo for use with Cloudflare



## Overview

Matomo (formerly Piwik) works well behind all proxies, load balancers, which are used to make websites faster, secure and more resilient. If you wish to use Matomo on your server hosted behind Cloudflare:

1\. Restore the real IP addresses of visitors to populate through to logs, stats, and more. Either [restore these IP addresses](https://support.cloudflare.com/hc/articles/200170786) yourself or ask your hosting provider to do it for you. If this is not installed you will only see the default IP addresses that belong to Cloudflare in your Matomo visitor logs.

2\. In your Cloudflare domain, go to **Speed > Optimization** and make sure that **Rocket Loader** is set to **Off**.

Matomo should then work on your server installed behind Cloudflare proxies. If you have any question, you can get [free support in Cloudflare forums](https://community.cloudflare.com/) or in the [Matomo forums](https://forum.matomo.org/).
