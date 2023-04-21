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

You should use this guide to migrate over **all** your existing health monitor notifications.

### Step 1 - Find existing notifications

First you should determine which pools are using notifications. It's often easier if you use the Cloudflare API to list all your pools and look for the `notification_email` parameter.

<details>
<summary>With code</summary>
<div>

Use the [Cloudflare API](/api/operations/account-load-balancer-pools-list-pools) to list all your pools and then look for whether each pool has a value for the `notification_email` parameter.

```json
---
header: Request
---
curl -X GET "https://api.cloudflare.com/client/v4/accounts/:account_id/load_balancers/pools" \
    -H "X-Auth-Email: user@example.com" \
    -H "X-Auth-Key: REDACTED" \
    -H "Content-Type: application/json" \
| jq '[.result[] | select(.notification_email != "") | {name, notification_email}]'
```

```json
---
header: Response
---
[ 
    { 
        "name": "pool-1", 
        "notification_email": "user@example.com" 
    }, 
    { 
        "name": "pool-2", 
        "notification_email": "user@example.com" 
    }, 
    { 
        "name": "pool-3", 
        "notification_email": "user@example.com" 
    }, 
    { 
        "name": "pool-4", 
        "notification_email": "user@example.com" 
    } 
]
```

</div>
</details>

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

### Step 2 - Create new notifications

In this step, you should create new notifications to replace all of your existing legacy notifications.

<details>
<summary>With code</summary>

<div>

If using the Cloudflare API, [re-create all your existing notifications](/api/operations/notification-policies-create-a-notification-policy) with the following parameters specified:

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

<details>
<summary>No code</summary>

<div>

On the pool you located in [Step 1](#step-1---find-existing-notifications), look for **Pool Notifications**. Click **Create a Health Alert** to start [creating a notification](/fundamentals/notifications/create-notifications/).

</div>
</details>

### Step 3 - Remove deprecated notifications

As the final step in the migration process, you need to remove all emails from your legacy notifications to ensure that you no longer receive deprecation emails moving forward.

Though you can perform these steps in the dashboard, Cloudflare recommends you use our new API endpoint for added convenience.

<details>
<summary>With code</summary>

<div>

If using the Cloudflare API, we recently added a [`PATCH`](/api/operations/account-load-balancer-pools-patch-pools) endpoint so you can easily remove email notifications from multiple pools at the same time.

```json
---
header: Request
---
curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/:account_identifier/load_balancers/pools" \
-H "X-Auth-Email: user@example.com" \
-H "X-Auth-Key: REDACTED" \
-H "Content-Type: application/json" \
--data '{
    "notification_email":""
}'
```

This API call supports the standard pagination query parameters, either `limit/offset` or `per_page/page`, so by default it only updates the first 25 pools listed. To make sure you update all your pools, you may want to adjust your API call so it loops through various pages or includes a larger number of pools with each request.

</div>
</details>

If needed, you can remove legacy notifications by using the dashboard.

<details>
<summary>No code</summary>

<div>

Once you created your new notification in [Step 2](#step-2---create-new-notifications), you will return to the pool you were editing previously. To disable the deprecated notifications, you must remove all notification email addresses from the field.

</div>
</details>

If you do not complete this step (removing all notification emails from all pools), your migration will not be considered complete and you will continue to receive additional emails about this deprecation.