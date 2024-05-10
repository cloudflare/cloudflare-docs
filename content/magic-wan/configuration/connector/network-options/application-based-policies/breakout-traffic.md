---
pcx_content_type: how-to
title: Breakout traffic
meta:
    description: Breakout Traffic allows you to define which applications should bypass Cloudflare’s security filtering.
---

# Breakout Traffic

Breakout Traffic allows you to define which applications should bypass Cloudflare’s security filtering, and go directly to the Internet. This is a per-site configuration. You need to configure Breakout Traffic for each of your existing sites.

## Add an application

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic WAN** > **Sites**.
3. Select the site you want to configure > **Edit**.
4. Go to **Breakout Traffic**.
5. Select **Add**.
6. Select one or more applications that should bypass Cloudflare filtering from the list. You can also use the search box.
7. Select **Add applications**.

The application's traffic will now go directly to the Internet and bypass Cloudflare filtering.

## Delete an application

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic WAN** > **Sites**.
3. Select the site you want to configure > **Edit**.
4. Go to **Breakout Traffic**.
5. Find the application you want to delete, and select the **three dots** next to it.
Select **Remove**.
6. (Optional) If you have several pages of applications, you can use the search box to quickly find the application you are looking for.