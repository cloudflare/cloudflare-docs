---
title: Get started
pcx_content_type: get-started
layout: single
weight: 3
meta:
  title: Enabling Cloudflare Web Analytics
---

# Enabling Cloudflare Web Analytics

## Sites not proxied through Cloudflare

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select the **Analytics & Logs** drop-down and choose **Web Analytics**.
3. Select **Add a site**.
4. In **Set up hostname**, write your website's hostname.
5. Select the message box that appears to choose the hostname you have input and select **Done**.
6. Copy the JS snippet from **Manage site**. This is also where you can later edit the hostname you have just added.
7. (Optional) Select **View Analytics sites** to go back on the Web Analytics interface. If you prefer to continue setting up Web Analytics website, continue reading.
8. Add the JS snippet to any of your website’s HTML pages before the ending body tag.

Web analytics is now set up on your website, but it may take a few minutes for Web Analytics data to appear.

Repeat steps 3-7 for all the websites you want to track with Web Analytics by going to **Quick Actions** > **Add a site** from Web Analytics. In **Web Analytics Sites**, select **Manage site** inside each website's card to adjust Web Analytics for your site at any time.

For more information on how many sites you can track, refer to [Limits](/analytics/web-analytics/understanding-web-analytics/limits/).

## Sites proxied through Cloudflare

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select the **Analytics & Logs** drop-down and choose **Web Analytics**.
3. Under **Quick Actions**, select **Add a site**.
4. Select a hostname from the drop-down menu > **Done**.

Your website is now using Web Analytics through the automatic setup, which is enabled by default. To set up Web Analytics manually:
1. After step 4 (above), expand **Advanced options**.
2. Select **Disable automatic setup**.
3. Copy the JS snippet.
4. Add the JS snippet to any of your website’s HTML pages before the ending body tag.

Repeat these steps for all of the websites you want to track with Web Analytics. Web Analytics is enabled by default for sites proxied through Cloudflare that previously used Browser Insights. Adjust Web Analytics for your site at any time by selecting **Manage site** from Web Analytics.

For more information on how many sites you can track, refer to [Limits](/analytics/web-analytics/understanding-web-analytics/limits/).

For more information on how to configure which sites or pages you track with Web Analytics, refer to [Rules](/analytics/web-analytics/configuring-web-analytics/rules/).

{{<Aside type="warning" header="Important">}}

If you have a `Cache-Control` header set to `public, no-transform`, Cloudflare proxy will not be able to modify the original payload of the website. Therefore, the Beacon script will not be automatically injected to your site, and Web Analytics will not work. Refer to [Origin cache control](/cache/about/cache-control/) for more information.

{{</Aside>}}