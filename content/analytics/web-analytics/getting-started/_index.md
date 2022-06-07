---
title: Get started
pcx-content-type: get-started
weight: 4
meta:
  title: Enabling Cloudflare Web Analytics
---

# Enabling Cloudflare Web Analytics

## Sites not proxied through Cloudflare

1. Go to [Get started with Web Analytics](https://dash.cloudflare.com/sign-up/web-analytics). Log in if you already have a Cloudflare account. If not, create one here.
2. Click **Add a site**.
3. In **Set up hostname**, write your website's hostname.
4. Click the message box that appears to choose the hostname you have input and click **Done**.
5. Copy the JS snippet from the **Manage site** page. This is also where you can later edit the hostname you have just added.
6. (Optional) **Click View Analytics sites** to go back on the Web Analytics interface. If you prefer to continue setting up Web Analytics website, continue reading.
7. Add the JS snippet to any of your website’s HTML pages before the ending body tag.

Web analytics is now set up on your website, but it may take a few minutes for Web Analytics data to appear.

Repeat steps 3-7 for all the websites you want to track with Web Analytics by going to **Quick Actions** > **Add a site** from the Web Analytics Sites page. From this page you can also click **Manage site** inside each website's card to adjust Web Analytics for your site at any time.

For more information on how many sites you can track, refer to [Limits](/analytics/web-analytics/understanding-web-analytics/limits/).

## Sites proxied through Cloudflare

1. Go to [Web Analytics](https://dash.cloudflare.com/?to=/:account/web-analytics) from your account home page.
2. Under **Quick Actions**, click **Add a site**.
3. Select a hostname from the drop-down menu. Automatic setup is enabled by default. To set up Web Analytics manually:
    1. Expand **Advanced options**.
    2. Select **Disable automatic setup**.
    3. Copy the JS snippet.
    4. Add the JS snippet to any of your website’s HTML pages before the ending body tag.

Repeat these steps for all of the websites you want to track with Web Analytics. Web Analytics is enabled by default for sites proxied through Cloudflare that previously used Browser Insights. Adjust Web Analytics for your site at any time by clicking **Manage site** from the Web Analytics Sites page.

For more information on how many sites you can track, refer to [Limits](/analytics/web-analytics/understanding-web-analytics/limits/).

For more information on how to configure which sites or pages you track with Web Analytics, refer to [Rules](/analytics/web-analytics/configuring-web-analytics/rules/).