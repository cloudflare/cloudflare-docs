---
order: 2
pcx-content-type: how-to
---

import MonitorDefinition from "../_partials/_monitor-definition.md"
import MonitorCreate from "../_partials/_monitor-create.md"
import MonitorPrepareServers from "../_partials/_monitor-prepare-server.md"
import MonitorCreateAPI from "../_partials/_monitor-create-api.md"

# Manage monitors

<MonitorDefinition/>

For more details about monitors, refer to [Monitors](/understand-basics/monitors).

---

## Create a monitor

### Via the dashboard

#### Set up the monitor

<MonitorCreate/>

#### Prepare your servers

<MonitorPrepareServers/>

#### Attach the monitor to a pool

Once your monitor is created, you need to attach it to an origin pool:

1. Go to **Traffic** > **Load Balancing**.
1. Click **Manage Pools**.
1. On a specific pool, click **Edit**.
1. Update the following information:

    - **Monitor**: Select your monitor.
    - **Health Check Regions:** Specifies geographic regions from which Cloudflare should send health check requests. Because of [how monitors check pool health](/understand-basics/monitors#health-check-regions), selecting multiple regions could increase the load on your servers.
    - **Notification E-mail:** Contains email addresses that receive notifications (individual, mailing list address, PagerDuty address).

1. Click **Save**. The status of your health check will be _unknown_ until the results of the first check are available.

---

### Via the API

#### Set up the monitor

<MonitorCreateAPI/>

#### Prepare your servers

<MonitorPrepareServers/>

#### Attach the monitor to a pool

Once your monitor is created, save its `id` property. Include this value in the `monitor` parameter when [creating your pool](/how-to/create-pool#via-the-api).

---

## Edit a monitor

### Via the dashboard

To edit a monitor in the dashboard:

1. Go to **Traffic** > **Load Balancing**.
1. Click **Manage Monitors**.
1. On a specific monitor, click **Edit**.
1. Update settings as needed.
1. Click **Save**.

### Via the API

To update specific settings without having to resubmit the entire configuration, use a [PATCH](https://api.cloudflare.com/#account-load-balancer-monitors-patch-monitor) request. For broader changes, use a [PUT](https://api.cloudflare.com/#account-load-balancer-monitors-update-monitor) request.

---

## Delete a monitor

### Via the dashboard

To delete a monitor in the dashboard:

1. Go to **Traffic** > **Load Balancing**.
1. Click **Manage Monitors**.
1. On a specific monitor, click **Delete**.

### Via the API

To delete a monitor using the API, send a [DELETE](https://api.cloudflare.com/#account-load-balancer-monitors-delete-monitor) request.