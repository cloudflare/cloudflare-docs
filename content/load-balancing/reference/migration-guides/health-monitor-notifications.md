---
pcx_content_type: configuration
title: Health monitor notifications
weight: 2
---

# Health monitor notifications

Cloudflare is migrating the notifications used by load balancing [health monitors](/load-balancing/understand-basics/monitors/) to use Cloudflare's centralized [Notifications Service](/fundamentals/notifications/).

## What is changing and why?

Cloudflare’s account-level [Notifications Service](/fundamentals/notifications/) is now the centralized location for most Cloudflare services. This change promotes consistency and streamlined administration, as well as gives you more options for notification delivery such as configuring webhooks or associating multiple pools with the same notification. These new notifications will also be managed at the account level instead of the zone level.

We strongly encourage all customers to migrate existing Health Monitor notifications to Cloudflare’s centralized Notifications Service to avoid lapses in alerts.

## Migration guide

### Step 1 - Find existing notifications

First you should determine which pools are using notifications.

<details>
<summary>No code</summary>

<div>

To find pools with existing notifications in the dashboard:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Traffic** > **Load Balancing**.
3. Click **Manage Pools**.
4. On a pool, click **Edit**.
5. For **Health Check Notifications**, check the value is toggled to **On** and an email address is present in the **Notification email address** field.

</div>
</details>

<details>
<summary>With code</summary>

<div>

If using the [Cloudflare API](https://api.cloudflare.com/#account-load-balancer-pools-list-pools), check the `notification_filter` object. Health checks with enabled legacy notifications will have something like:

    ```json
    "pool": {
        "healthy": true,
        "disable": true
    }
    ```

You should also pay attention to the `notification_emails` parameter. Even if the `notification_filter` indicates that a health checks should send notifications, those will only be sent if there are email addresses listed in `notification_emails`.

</div>
</details>

### Step 2 - Create new notifications

<details>
<summary>No code</summary>

<div>

On the pool you located in [Step 1](#step-1---find-existing-notifications), look for **Pool Notifications**. Click **Create a Health Alert** to start [creating a notification](/fundamentals/notifications/create-notifications/).

</div>
</details>

<details>
<summary>With code</summary>

<div>

If using the Cloudflare API, [create a new notification](https://api.cloudflare.com/#notification-policies-create-a-notification-policy) with the following parameters specified:

```json
"alert_type": "load_balancing_health_alert",
"filters": {
    "pool_id": <<ARRAY_OF_INCLUDED_POOL_IDS>>,
    "new_health": <<ARRAY_OF_STATUS_TRIGGERS>> ["Unhealthy", "Healthy"],
    "event_source": <<ARRAY_OF_OBJECTS_WATCHED>> ["pool", "origin"]
}
```

</div>
</details>

### Step 3 - Remove deprecated notifications

<details>
<summary>No code</summary>

<div>

Once you created your new notification in [Step 2](#step-2---create-new-notifications), you will return to the pool you were editing previously. To disable the deprecated notifications, toggle the **Health Check Notifications** on your pool to **Off**.

</div>
</details>

<details>
<summary>With code</summary>

<div>

If using the Cloudflare API, we recently added a [`PATCH`](https://api.cloudflare.com/#load-balancer-pools-patch-pools) endpoint so you can easily remove email notifications from multiple pools at the same time.

```json
---
header: Request
---
curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/:account_identifier/load_balancers/pools" \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
-H "Content-Type: application/json" \
--data '{
    "notification_email":""
}'
```

This API call supports the standard pagination query parameters, either `limit/offset` or `per_page/page`, so by default it only updates the first 25 pools listed. To make sure you update all your pools, you may want to adjust your API call so it loops through various pages or includes a larger number of pools with each request.

</div>
</details>