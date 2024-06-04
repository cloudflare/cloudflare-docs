---
pcx_content_type: how-to
title: Breakout traffic
meta:
    description: Breakout Traffic allows you to define which applications should bypass Cloudflare’s security filtering.
---

# Breakout Traffic

Breakout Traffic allows you to define which applications should bypass Cloudflare’s security filtering, and go directly to the Internet. It works via DNS requests inspection. This means that if your network is caching DNS requests, Breakout Traffic will only take effect after you cache entries expire, and your client issues a new DNS request that the Magic WAN Connector can detect. This can take several minutes.

Breakout Traffic will not work for applications that use DNS-over-HTTPs.

## Add an application

You need to configure Breakout Traffic for each of your existing sites, as it is a per-site configuration.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic WAN** > **Sites**.
3. Select the site you want to configure > **Edit**.
4. Select **Traffic Steering**.
5. In **Breakout traffic**, select **Add**.
6. Select one or more applications that should bypass Cloudflare filtering from the list. You can also use the search box.
7. Select **Add applications**.

The traffic for that application will now go directly to the Internet and bypass Cloudflare filtering.

## Delete an application

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic WAN** > **Sites**.
3. Select the site you want to configure > **Edit**.
4. Select **Traffic Steering**.
5. In **Breakout Traffic**, find the application you want to delete, and select the **three dots** next to it.
6. Select **Remove**.
7. (Optional) If you have several pages of applications, you can use the search box to quickly find the application you are looking for.