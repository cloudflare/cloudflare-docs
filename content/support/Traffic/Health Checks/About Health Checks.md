---
source: https://support.cloudflare.com/hc/en-us/articles/4404867308429-About-Health-Checks
title: About Health Checks
---

# About Health Checks



## Overview

A _health check_ actively monitors whether your origin server is online by sending specific requests at regular intervals.

Cloudflare offers two types of health checks:

-   **Standalone** health checks (included with all paid plans)
-   **Load Balancing** health checks (included as part of a [Load Balancing subscription](https://developers.cloudflare.com/load-balancing/understand-basics/monitors/))

___

## Step 1: Create a health check

To create a new health check:

To create a health check in the Cloudflare dashboard:

1\. Navigate to **Traffic** > **Health Checks**.

2\. Click **Create**.

3\. Fill out the form, paying special attention to:

-   The values for **Interval** and **Check regions**, because decreasing the **Interval** and increasing **Check regions** may increase the load on your origin server.
-   **Health change thresholds**, which specify the number of consecutive passed or failed checks before an origin changes status.

4\. When you fill out the form, do not set up **Notifications**.

5\. Click **Save and Deploy**.

To create a health check using code:

-   Use the [Cloudflare API](https://api.cloudflare.com/#health-checks-create-health-check), but do not include the `notifications` parameter
-   Use the [Cloudflare Go library](https://github.com/cloudflare/cloudflare-go/blob/master/healthchecks.go), but disable notifications by including:

```
Notification: cloudflare.HealthcheckNotification{
           Suspended:      true,
           EmailAddresses: []string{},
       }
```

-   Use the [Cloudflare Terraform](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/healthcheck) library, specifying that `notification_suspended=true`

Once you create a health check, you can [create notifications](https://support.cloudflare.com/hc/en-us/articles/4404867308429-About-Health-Checks#notifications) and also monitor origin status using [Health Check Analytics](https://support.cloudflare.com/hc/en-us/articles/4404867308429-About-Health-Checks#analytics).

These health checks will periodically send requests to the specified origin server with a User Agent of `Mozilla/5.0 (compatible; Cloudflare-Traffic-Manager/1.0; +https://www.cloudflare.com/traffic-manager/; healthcheck-id: <HEALTHCHECK_ID>`.

___

## Step 2: Create a health check notification

Once you have [created a health check](https://support.cloudflare.com/hc/en-us/articles/4404867308429-About-Health-Checks#setup), set up health check notifications:

To create a health check notification in the dashboard:

1\. Navigate to **Traffic** > **Health Checks**.

2\. Click **Configure an alert**.

3\. Fill out the **Notification name** and **Description** and add a **Notification email**.

4\. Click **Next**.

5\. Add health checks to include in your alerts.

6\. Choose the **Notification trigger**, which determines when you receive alerts.

7\. Click **Create**.

To set up a health check notification with code:

-   Use the [Cloudflare API](https://api.cloudflare.com/#notification-policies-create-notification-policy) with the following parameters specified (beyond `name`, `mechanism`, etc.:

```
"alert_type":"health_check_status_notification",
"filters":{ 
     "health_check_id":[""],
     "status":["Unhealthy"]
  }
```

-   Use the [Cloudflare Go library](https://github.com/cloudflare/cloudflare-go/blob/master/notifications.go) to create a notification policy with the following parameters specified (beyond `Name`, `Mechanism`, etc.):

```
AlertType: "health_check_status_notification",
Filters: map[string][]string{
           // receive notifications when the status is unhealthy
           "status": {"Unhealthy"},
           // id of previously created healthcheck
           "health_check_id": {healthcheckResponse.ID},
       }

```

-   Use the [Cloudflare Terraform](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/notification_policy#with-filters) library to create a notification policy with the following parameters specified (beyond `name`, `email_integration`, etc.)

```
alert_type = "health_check_status_notification"
filters {
   status = ["Unhealthy"]
   health_check_id = [cloudflare_healthcheck.production.id]
 }
```
___

## Use health check analytics

Once you have [set up a standalone health check](https://support.cloudflare.com/hc/en-us/articles/4404867308429-About-Health-Checks#setup) — likely including notification emails — use health check analytics to debug possible origin issues.

To access health check analytics, go to **Traffic** \> **Health Check Analytics**. Once there, you can evaluate origin uptime and latency and specific event logs:

-   **Health Checks By Uptime**: Shows the % of uptime for individual origins over time.
-   **Health Checks By Failure Reason**: Shows a breakdown of failures by the specific reason.
-   **Health Checks By Latency**: Shows average latency – measured in round trip time — for individual origins over time.
-   **Event Log**: Shows individual health check data. Click each record for additional details on **Round trip time**, the **Failure Reason**, the **Average Waterfall** (showing chronological data about request stages), and more.
