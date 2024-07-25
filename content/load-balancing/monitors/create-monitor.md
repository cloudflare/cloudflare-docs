---
pcx_content_type: how-to
title: Manage monitors
weight: 3
meta:
    description: Learn how to set up and maintain monitors for your load balancer.
---

# Manage monitors

{{<glossary-definition term_id="monitor">}}

For more details about monitors, refer to [Monitors](/load-balancing/monitors/).

---

## Create a monitor

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

**Set up the monitor**

{{<render file="_monitor-create.md">}}

**Prepare your servers**

{{<render file="_monitor-prepare-server.md">}}

**Attach the monitor to a pool**

Once your monitor is created, you need to attach it to a pool:

1.  Go to **Traffic** > **Load Balancing**.

2.  Select **Manage Pools**.

3.  On a specific pool, select **Edit**.

4.  Update the following information:

    - **Monitor**: Select your monitor.
    - **Health Monitor Regions:** Specifies geographic regions from which Cloudflare should send health monitor requests. Because of [how monitors check pool health](/load-balancing/monitors/#health-monitor-regions), selecting multiple regions could increase the load on your servers.
    - **Notification E-mail:** Contains email addresses that receive notifications (individual, mailing list address, PagerDuty address).

5.  Select **Save**. The status of your health monitor will be _unknown_ until the results of the first check are available.

{{</tab>}}
{{<tab label="api" no-code="true">}}

**Set up the monitor**

{{<render file="_monitor-create-api.md">}}


**Prepare your servers**

{{<render file="_monitor-prepare-server.md">}}

**Attach the monitor to a pool**

Once your monitor is created, save its `id` property. Include this value in the `monitor` parameter when [creating your pool](/load-balancing/pools/create-pool/#create-a-pool).

{{</tab>}}
{{</tabs>}}

---

## Edit a monitor

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To edit a monitor in the dashboard:

1.  Go to **Traffic** > **Load Balancing**.
2.  Select **Manage Monitors**.
3.  On a specific monitor, select **Edit**.
4.  Update settings as needed.
5.  Select **Save**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

When you edit a monitor with the API, your request type depends on how much you want to edit.

To update specific settings without having to resubmit the entire configuration, use a [PATCH](/api/operations/account-load-balancer-monitors-patch-monitor) request. For broader changes, use a [PUT](/api/operations/account-load-balancer-monitors-update-monitor) request.

{{</tab>}}
{{</tabs>}}

---

## Delete a monitor

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To delete a monitor in the dashboard:

1.  Go to **Traffic** > **Load Balancing**.
2.  Select **Manage Monitors**.
3.  On a specific monitor, select **Delete**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To delete a monitor using the API, send a [DELETE](/api/operations/account-load-balancer-monitors-delete-monitor) request.

{{</tab>}}
{{</tabs>}}