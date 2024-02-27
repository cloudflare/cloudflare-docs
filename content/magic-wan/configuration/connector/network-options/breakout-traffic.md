---
pcx_content_type: how-to
title: Breakout traffic
---

# Breakout traffic

Breakout traffic allows you to define which applications should dynamically bypass Cloudflare’s security filtering and go directly to the Internet. This is a per-site configuration. You need to configure breakout traffic for each of your existing sites.

## Add an application

1. Log in to the Cloudflare dashboard and select your account.
2. Select **Magic WAN** > **Sites**.
3. Select the site you want to configure > **Edit**.
4. Go to **Breakout Traffic**.
5. Select **Add**.
6. Search for the application that should bypass Cloudflare filtering. You can add one or more applications.
7. Select **Add apps**.

The application's traffic will now go directly to the Internet and bypass Cloudflare filtering.


## Delete an application

1. Log in to the Cloudflare dashboard and select your account.
2. Select **Magic WAN** > **Sites**.
3. Select the site you want to configure > **Edit**.
4. Go to **Breakout Traffic**.
5. Find the application you want to delete and select the three dots next to it.
6. Select **Remove**.

(Optional) If you have several pages of applications, use the search box to quickly find the application you are looking for.
