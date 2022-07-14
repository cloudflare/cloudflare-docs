---
pcx-content-type: configuration
title: Health monitor notifications
weight: 2
---

# Health monitor notifications

Cloudflare is migrating the notifications used by load balancing [health monitors](/load-balancing/understand-basics/monitors) to use Cloudflare's centralized [Notifications Service](/fundamentals/notifications/).

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
1. Go to **Traffic** > **Load Balancing**.
1. Click **Manage Pools**.
1. On a pool, click **Edit**.
1. For **Health Check Notifications**, check if there is an email address present. If so, you will need to create a new notification.

</div>
</details>

### Step 2 - Create new notifications

<details>
<summary>No code</summary>

<div>

On the pool you located in [Step 1](#step-1---find-existing-notifications), look for **Pool Notifications**. Click **Create a Health Alert** to start [creating a notification](/fundamentals/notifications/create-notifications/).

</div>
</details>

### Step 3 - Remove deprecated notifications

<details>
<summary>No code</summary>

<div>

Once you created your new notification in [Step 2](#step-2---create-new-notifications), you will return to the pool you were editing previously. To disable the deprecated notifications, toggle the **Health Check Notifications** on your pool to **Off**.

</div>
</details>