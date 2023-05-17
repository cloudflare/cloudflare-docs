---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/202032590-Using-Cloudflare-with-various-forums-vBulletin-Xenforo-MyBB-
title: Using Cloudflare with various forums (vBulletin, Xenforo, MyBB)
---

# Using Cloudflare with various forums (vBulletin, Xenforo, MyBB)



## Overview

Many widely used forum platforms are compatible with Cloudflare.

These include:

-   vBulletin
-   Xenforo
-   MyBB

If you have a forum using these platforms, you can increase its speed and safety by adding Cloudflare.

___

## Steps

**1**. Cloudflare acts as a reverse proxy, meaning that all visitor IP addresses will become Cloudflare-affiliated IP addresses. If you are using services like **Stopforumspan** or blocking registration by IP address, you need to [restore original visitor IPs](https://support.cloudflare.com/hc/articles/200170786).

**2**. To prevent admin functions from being affected by caching or performance features, create a [Page Rule](https://support.cloudflare.com/hc/articles/218411427) to exclude the admin section of your site.

**3**. If you want certain services to access your website (APIs or certain IPs), [configure IP access rules](https://support.cloudflare.com/hc/articles/217074967).

**4**. Review your DNS records to make sure all your subdomain records are present. If you cannot find a subdomain, [add the DNS record](https://support.cloudflare.com/hc/articles/360019093151).

**5**. Review your Cloudflare [performance](https://support.cloudflare.com/hc/categories/200275238) and [security settings](https://support.cloudflare.com/hc/categories/200275228-Firewall).
