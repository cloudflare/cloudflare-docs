---
order: 2
pcx-content-type: how-to
---

import MonitorDefinition from "../_partials/_monitor-definition.md"
import MonitorCreate from "../_partials/_monitor-create.md"
import MonitorPrepareServers from "../_partials/_monitor-prepare-server.md"
import MonitorExample from "../_partials/_monitor-example.md"

# Create a monitor

<MonitorDefinition/>

<MonitorExample/>

---

## Via the dashboard

### Set up the monitor

<MonitorCreate/>

### Prepare your servers

<MonitorPrepareServers/>

### Attach the monitor to a pool

Once your monitor is created, you need to attach it to an origin pool:

1. Go to **Traffic** > **Load Balancing**.
1. Click **Manage Pools**.
1. On a specific pool, click **Edit**.
1. Update the following information:

    - **Monitor**: Select your monitor.    
    - **Health Check Regions:** Specifies geographic regions from which Cloudflare should send health check requests. Because of [how monitors check pool health](/understand-basics/health-details#how-an-origin-becomes-unhealthy), selecting multiple regions could increase the load on your servers.
    - **Notification E-mail:** Contains email addresses that receive notifications (individual, mailing list address, PagerDuty address).

1. Click **Save**. The status of your health check will be _unknown_ until the results of the first check are available.

---

## Via the API

TBD