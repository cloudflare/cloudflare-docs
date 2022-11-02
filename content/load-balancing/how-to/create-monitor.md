---
pcx_content_type: how-to
title: Manage monitors
weight: 3
---

# Manage monitors

{{<render file="_monitor-definition.md">}}

For more details about monitors, refer to [Monitors](/load-balancing/understand-basics/monitors/).

---

## Create a monitor

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
**Set up the monitor**

{{<render file="_monitor-create.md">}}

**Prepare your servers**

{{<render file="_monitor-prepare-server.md">}}

**Attach the monitor to a pool**

Once your monitor is created, you need to attach it to an origin pool:

1.  Go to **Traffic** > **Load Balancing**.

2.  Click **Manage Pools**.

3.  On a specific pool, click **Edit**.

4.  Update the following information:

    - **Monitor**: Select your monitor.
    - **Health Check Regions:** Specifies geographic regions from which Cloudflare should send health check requests. Because of [how monitors check pool health](/load-balancing/understand-basics/monitors/#health-check-regions), selecting multiple regions could increase the load on your servers.
    - **Notification E-mail:** Contains email addresses that receive notifications (individual, mailing list address, PagerDuty address).

5.  Click **Save**. The status of your health check will be _unknown_ until the results of the first check are available.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
**Set up the monitor**

{{<render file="_monitor-create-api.md">}}


**Prepare your servers**

{{<render file="_monitor-prepare-server.md">}}

**Attach the monitor to a pool**

Once your monitor is created, save its `id` property. Include this value in the `monitor` parameter when [creating your pool](/load-balancing/how-to/create-pool/#via-the-api).
 
{{</tab>}}
{{</tabs>}}

---

## Edit a monitor

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To edit a monitor in the dashboard:

1.  Go to **Traffic** > **Load Balancing**.
2.  Click **Manage Monitors**.
3.  On a specific monitor, click **Edit**.
4.  Update settings as needed.
5.  Click **Save**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}

When you edit a monitor with the API, your request type depends on how much you want to edit.
 
To update specific settings without having to resubmit the entire configuration, use a [PATCH](https://api.cloudflare.com/#account-load-balancer-monitors-patch-monitor) request. For broader changes, use a [PUT](https://api.cloudflare.com/#account-load-balancer-monitors-update-monitor) request.
 
{{</tab>}}
{{</tabs>}}

---

## Delete a monitor

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To delete a monitor in the dashboard:

1.  Go to **Traffic** > **Load Balancing**.
2.  Click **Manage Monitors**.
3.  On a specific monitor, click **Delete**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To delete a monitor using the API, send a [DELETE](https://api.cloudflare.com/#account-load-balancer-monitors-delete-monitor) request.
 
{{</tab>}}
{{</tabs>}}