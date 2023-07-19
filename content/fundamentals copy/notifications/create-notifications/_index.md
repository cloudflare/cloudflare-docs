---
pcx_content_type: how-to
title: Create a Notification
weight: 3
layout: single
---

# Create a Notification

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Notifications**.
3. Select **Add**.
3. On the notification you want to create, choose **Select**.
4. Give the Notification a name to identify it.
5. Add a way to be notified, like an email address. Professional and Business plans will have access to other options such as configuring PagerDuty or accessing webhooks.
6. (Optional) Specify any additional options for the Notification, if required. For example, some notifications require that you select one or more domains or services.
7. Select **Create**.

The browser will navigate back to the list of Notifications, where the new Notification will appear as **Enabled**.

{{<Aside type="note">}}

The list of notifications available depends on the [type of account you have](/fundamentals/notifications/notification-available/).

{{</Aside>}}

## PagerDuty

Professional plans or higher can configure PagerDuty to receive notifications about their Cloudflare account. If you do not have a PagerDuty account, learn [how to link your Cloudflare account to PagerDuty](/fundamentals/notifications/create-notifications/create-pagerduty/).

## Webhooks to external services

There are a variety of services you can connect to Cloudflare using webhooks to receive Notifications from your Cloudflare account. Learn [how to link some of the most popular services](/fundamentals/notifications/create-notifications/configure-webhooks/) to your Cloudflare account.

## Test your notifications

To test a notification - either to verify that notifications will be sent to the correct location or to view which details are available - select **Test** on any enabled notification.

This actions sends a notification with fake data.