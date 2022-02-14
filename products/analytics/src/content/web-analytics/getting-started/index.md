---
title: Get started
order: 3
pcx-content-type: get-started
---

# Enabling Cloudflare Web Analytics

## Sites not proxied through Cloudflare

1. Go to [Get started with Web Analytics](https://dash.cloudflare.com/sign-up/web-analytics).
1. Enter an Email address and password.
1. Click **Create Account**.
1. Enter your website’s hostname.
1. Copy the JS snippet.
1. Add the JS snippet to any of your website’s HTML pages before the ending body tag.
1. Click **Done**.
1. Wait for the redirect to the Web Analytics page or click **View Analytics**. It may take a few minutes for Web Analytics data to appear.

Repeat steps 4-8 for all of the websites you want to track with Web Analytics by going to **Quick Actions** > **Add a site** from the Web Analytics Sites page. From this page you can also click **Manage site** inside each website's card to adjust Web Analytics for your site at any time.

For more information on how many sites you can track, refer to [Limits](../understanding-web-analytics/limits/).

## Sites proxied through Cloudflare

1. Go to [Web Analytics Sites](https://dash.cloudflare.com/?to=/:account/web-analytics) from your account home page.
2. Under **Quick Actions**, click **Add a site**.
3. Select a hostname from the drop-down menu. Automatic setup is enabled by default. To set up Web Analytics manually:
   1. Expand **Advanced options**.
   2. Select **Disable automatic setup**.
   3. Copy the JS snippet.
   4. Add the JS snippet to any of your website’s HTML pages before the ending body tag.
4. Click **Done**.

Repeat steps 3-4 for all of the websites you want to track with Web Analytics. Web Analytics are enabled by default for sites proxied through Cloudflare that previously used Browser Insights. Adjust Web Analytics for your site at any time by clicking **Manage site** from the Web Analytics Sites page.

For more information on how many sites you can track, refer to [Limits](../understanding-web-analytics/limits/).

For more information on how to configure which sites or pages you track with Web Analytics, refer to [Rules](/web-analytics/configuring-web-analytics/rules).