---
pcx_content_type: how-to
title: Create a Notification
weight: 3
---

# Create a Notification

Cloudflare Notifications is available in your Cloudflare dashboard.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Notifications**.
3. Select **Add**.
3. On the notification you want to create, choose **Select**.
4. Give the Notification a name to identify it.
5. Add a way to be notified, like an email address. Professional and Business plans will have access to other options such as configuring PagerDuty or accessing webhooks.
6. (Optional) Specify any additional options for the Notification, if required. For example, some notifications require that you select one or more domains or services.
7. Select **Create**.

The browser will navigate back to the list of Notifications, where the new Notification will appear as **Enabled**.

The list of notifications available depends on the type of account you have. Refer to [Available Notifications](/notifications/notification-available/) to learn more about what each Notification does and what do to when receiving one.

## PagerDuty

Professional plans or higher can configure PagerDuty to receive notifications about their Cloudflare account. If you do not have a PagerDuty account, learn [how to link your Cloudflare account to PagerDuty](/notifications/create-notifications/create-pagerduty/).

## Webhooks to external services

There are a variety of services you can connect to Cloudflare using webhooks to receive Notifications from your Cloudflare account. Learn [how to link some of the most popular services](/notifications/create-notifications/configure-webhooks/) to your Cloudflare account.

## Test your notifications

To test a notification, either to verify that notifications will be sent to the correct location or to view which details are available, select **Test** on any enabled notification.

This action sends a notification with fake data.