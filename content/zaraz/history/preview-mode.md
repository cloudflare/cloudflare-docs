---
pcx_content_type: how-to
title: Preview mode
weight: 1
meta:
  title: Preview changes before publishing
---

# Preview changes before publishing

Zaraz allows you to test your configurations before publishing them. This is helpful to avoid unintended consequences when deploying a new tool or trigger.

{{<Aside type="note">}}This feature is available to customers on a [Workers Paid plan](/workers/platform/pricing/).{{</Aside>}}

After enabling Preview & Publish you will also have access to [Zaraz History](/zaraz/history/history/).

## Enable Preview & Publish mode

By default, Zaraz is configured to commit changes in real time. To enable preview mode and test new features you are adding to Zaraz:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Zaraz** > **Settings**.
3. In **Workflow**, choose **Preview & Publish**.

You are now working in preview mode. To commit changes and make them live, you will have to select **Publish** on your account.

### Test changes before publishing them

Now that you have Zaraz working in preview mode, you can open your website and test your settings:

1. In [Zaraz settings](https://dash.cloudflare.com/?to=/:account/:zone/zaraz/settings) copy your **Debug Key**.
2. Navigate to the website where you want to test your new settings.
3. Access the browser’s developer tools. For example, to access developer tools in Google Chrome, select **View** > **Developer** > **Developer Tools**.
4. Select the **Console** pane and enter the following command to start Zaraz’s preview mode:

    ```js
    zaraz.preview("<YOUR_DEBUG_KEY>")
    ```
5. Your website will reload along with Zaraz debugger, and Zaraz will use the most recent changes in preview mode.
6. If you are satisfied with your changes, go back to the [Zaraz dashboard](https://dash.cloudflare.com/?to=/:account/:zone/zaraz/) and select **Publish** to apply them to all users. If not, use the dashboard to continue adjusting your configuration.

To exit preview mode, close Zaraz debugger.

## Disable Preview & Publish mode

Disable Preview & Publish mode to work in real time. When you work in real time, any changes made on the dashboard are applied instantly to the domain you are working on.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Zaraz** > **Settings**.
3. In **Workflow**, choose **Real-time**.
4. In the modal, decide if you want to delete all unpublished changes, or if you want to publish any change made in the meantime.

Zaraz is now working in real time. Any change you make will be immediately applied the domain you are working on.