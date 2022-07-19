---
title: Get started
pcx-content-type: get-started
layout: single
weight: 3
meta:
  title: Enabling Cloudflare Web Analytics
---

# Enabling Cloudflare Web Analytics

## Sites not proxied through Cloudflare

1. Go to [Get started with Web Analytics](https://dash.cloudflare.com/sign-up/web-analytics) to log in to your Cloudflare account. You can also use this link to create one if you need to.
2. Click **Add a site**.
3. In **Set up hostname**, write your website's hostname.
4. Click the message box that appears to choose the hostname you have input and click **Done**.
5. Copy the JS snippet from **Manage site**. This is also where you can later edit the hostname you have just added.
6. (Optional) **Click View Analytics sites** to go back on the Web Analytics interface. If you prefer to continue setting up Web Analytics website, continue reading.
7. Add the JS snippet to any of your website’s HTML pages before the ending body tag.

Web analytics is now set up on your website, but it may take a few minutes for Web Analytics data to appear.

Repeat steps 3-7 for all the websites you want to track with Web Analytics by going to **Quick Actions** > **Add a site** from Web Analytics. In **Web Analytics Sites**, click **Manage site** inside each website's card to adjust Web Analytics for your site at any time.

For more information on how many sites you can track, refer to [Limits](/analytics/web-analytics/understanding-web-analytics/limits/).

## Sites proxied through Cloudflare

1. Go to [Web Analytics](https://dash.cloudflare.com/?to=/:account/web-analytics) from **Account Home**.
2. Under **Quick Actions**, click **Add a site**.
3. Select a hostname from the drop-down menu. Automatic setup is enabled by default. To set up Web Analytics manually:
    1. Expand **Advanced options**.
    2. Select **Disable automatic setup**.
    3. Copy the JS snippet.
    4. Add the JS snippet to any of your website’s HTML pages before the ending body tag.

Repeat these steps for all of the websites you want to track with Web Analytics. Web Analytics is enabled by default for sites proxied through Cloudflare that previously used Browser Insights. Adjust Web Analytics for your site at any time by clicking **Manage site** from Web Analytics.

For more information on how many sites you can track, refer to [Limits](/analytics/web-analytics/understanding-web-analytics/limits/).

For more information on how to configure which sites or pages you track with Web Analytics, refer to [Rules](/analytics/web-analytics/configuring-web-analytics/rules/).

{{<Aside type="warning" header="Warning">}}

If you have a `Cache-Control` header set to `public, no-transform`, Cloudflare proxy will not be able to modify the original payload of the website. Therefore, the Beacon script will not be automatically injected to your site, and Web Analytics will not work. Refer to [Origin cache control](/cache/about/cache-control/) for more information. 

{{</Aside>}}