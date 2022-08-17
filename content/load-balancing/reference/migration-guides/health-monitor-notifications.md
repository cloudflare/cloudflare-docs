---
pcx_content_type: configuration
title: Health monitor notifications
weight: 2
---

# Health monitor notifications

Cloudflare is migrating the notifications used by load balancing [health monitors](/load-balancing/understand-basics/monitors/) to use Cloudflare's centralized [Notifications Service](/fundamentals/notifications/).

## What is changing and why?

Cloudflare’s account-level [Notifications Service](/fundamentals/notifications/) is now the centralized location for most Cloudflare services. This change promotes consistency and streamlined administration, as well as giving you more options for notification delivery (Webhooks, multiple pools tied to the same notification). These new notifications will also be managed at the account level instead of at the zone level.

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
5. For **Health Check Notifications**, check the value is toggled to **On**.

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
"alert_type": "g6_health_alert",
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

If using the Cloudflare API, send a [`PATCH`](https://api.cloudflare.com/#account-load-balancer-pools-patch-pool) request that includes the following objects.

```json
"notification_email": "",
"notification_filter": {
    "pool": {
        "healthy": null,
        "disable": true
    }
}
```

</div>
</details>