---
order: 2
pcx-content-type: how-to
---

import PoolDefinition from "../_partials/_pools-definition.md"
import PoolCreate from "../_partials/_pools-create.md"
import MonitorDefinition from "../_partials/_monitor-definition.md"
import MonitorCreate from "../_partials/_monitor-create.md"
import MonitorPrepareServers from "../_partials/_monitor-prepare-server.md"
import MonitorExample from "../_partials/_monitor-example.md"


# Get started

This guide is meant for organizations setting up their first load balancer. If you already have active load balancers, refer to [Basic tasks](/how-to) for general help or [Additional configurations](/additional-options) for more advanced setups.

---

## Prerequisites

- **Multiple servers**, either physical or cloud-based.
- **Access to Load Balancing**, available as an add-on for any type of account.
- **Load balancer hostname**: The hostname for which the Cloudflare Load Balancer will manage traffic. The default hostname is the root hostname.

---

## Step 1 — Create a monitor

<MonitorDefinition/>

<details>
<summary>Create a monitor in the dashboard</summary>
<div>

<strong>Set up the monitor</strong>

<MonitorCreate/>

<strong>Prepare your servers</strong>

<MonitorPrepareServers/>

</div>
</details>

<details>
<summary>Create a monitor with the API</summary>
<div>

<strong>Set up the monitor</strong>

TBD

<strong>Prepare your servers</strong>

<MonitorPrepareServers/>

</div>
</details>

<MonitorExample/>

## Step 2 — Create an origin pool

<PoolDefinition/>

<details>
<summary>Create a pool in the dashboard</summary>
<div>

<PoolCreate/>

</div>

</details>

<details>
<summary>Create a pool with the API</summary>
<div>

TBD

</div>

</details>

## Step 3 — Confirm pool health

Before directing any traffic to your pools, you want to make sure that your pools and monitors are set up correctly. The status of your health check will be *unknown* until the results of the first check are available.

If you notice that healthy pools are being marked unhealthy:

- Review [how origins and pools become unhealthy](/understand-basics/health-details).
- Refer to our [Troubleshooting FAQ](https://support.cloudflare.com/hc/articles/4407016052493).