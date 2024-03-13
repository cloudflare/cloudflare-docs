---
pcx_content_type: get-started
title: Get started
weight: 1
---

# Get started with Cloudflare Notifications

The list of notifications available depends on the type of account you have. Refer to [Available Notifications](/notifications/notification-available/) to learn more about what each notification does and what do to when receiving one.

You can check the [Notification History](/notifications/notification-history/) using the API to view notifications that have been generated for your account.

## Permissions

To create a notification via the Cloudflare dashboard, you will need to have the Super Administrator or Administrator role. 

You can also create a notification if you have an edit role for the feature that you want to create an alert for. For example, if you want to create a Load Balancing Pool Enablement notification, you will need to have the Load Balancer role.

An API token needs to have the [Notifications Read/Write permission](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) to create a notification,

## Configure notifications

This guide will help you create, edit, test, or delete notifications using the Cloudflare dashboard.

### Create a notification

You can create a notification via the Cloudflare dashboard. 

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Notifications**.
3. Select **Add**.
3. On the notification you want to create, choose **Select**.
4. Name the notification.
5. Enter an email address to receive the notifications.

{{<Aside type="note">}}
Professional and Business plans will have access to other options such as configuring PagerDuty or accessing webhooks.
{{</Aside>}}

6. (Optional) Specify any additional options for the notification, if required. For example, some notifications require that you select one or more domains or services.
7. Select **Create**.

The browser will navigate back to the list of notifications, where the new notification will appear as **Enabled**.

### Edit a notification

You can edit existing Notifications via the Cloudflare dashboard. 

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Notifications**.
3. Select **Edit** on the Notification that you want to modify.
4. Make your changes as needed and select **Save**.

The browser will navigate back to the list of notifications.

### Disable or delete a notification 

You can delete or disable existing Notifications via the Cloudflare dashboard. 

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Notifications**.
3. On the notification that you want to disable, select the **Enabled** toggle. To delete it, select **Delete**.

### Test a notification

To verify that notifications will be sent to the correct location or to view which details are available, you can test a notification by selecting **Test** on any enabled notification.

This action sends a notification with fake data.