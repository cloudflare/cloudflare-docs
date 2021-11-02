---
order: 2
pcx-content-type: how-to
---

import PoolDefinition from "../_partials/_pool-definition.md"
import PoolCreate from "../_partials/_pool-create.md"
import PoolCreateAPI from "../_partials/_pool-create-api.md"
import MonitorDefinition from "../_partials/_monitor-definition.md"
import MonitorCreate from "../_partials/_monitor-create.md"
import MonitorCreateAPI from "../_partials/_monitor-create-api.md"
import MonitorPrepareServers from "../_partials/_monitor-prepare-server.md"
import MonitorExample from "../_partials/_monitor-example.md"
import LBDefinition from "../_partials/_load-balancer-definition.md"
import LBCreate from "../_partials/_load-balancer-create.md"
import LBCreateAPI from "../_partials/_load-balancer-create-api.md"


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
<summary>Create a monitor (dashboard)</summary>
<div>

<strong>Set up the monitor</strong>

<MonitorCreate/>

<strong>Prepare your servers</strong>

<MonitorPrepareServers/>

</div>
</details>

<details>
<summary>Create a monitor (API)</summary>
<div>

<strong>Set up the monitor</strong>

<MonitorCreateAPI/>

<strong>Prepare your servers</strong>

<MonitorPrepareServers/>

</div>
</details>

<MonitorExample/>

## Step 2 — Create an origin pool

<PoolDefinition/>

<details>
<summary>Create a pool (dashboard)</summary>
<div>

<PoolCreate/>

</div>

</details>

<details>
<summary>Create a pool (API)</summary>
<div>

<PoolCreateAPI/>

</div>

</details>

## Step 3 — Confirm pool health

Before directing any traffic to your pools, make sure that your pools and monitors are set up correctly. The status of your health check will be *unknown* until the results of the first check are available.

<details>
<summary>Confirm pool health (dashboard)</summary>
<div>

1. Navigate to **Traffic** > **Load Balancing**.
1. Click **Manage Pools**.
1. For pools and individual origins, review the values in the **Health** and **Origin Health** columns.

For more information on pool and origin health statuses, refer to [How a pool becomes unhealthy](/understand-basics/health-details#how-a-pool-becomes-unhealthy).

</div>

</details>

<details>
<summary>Confirm pool health (API)</summary>
<div>

To fetch the latest health status of all pools, use the [List Pools](https://api.cloudflare.com/#account-load-balancer-pools-list-pools) command, paying attention to the `healthy` value for pools and origins.

For troubleshooting a specific pool's health, use the [Pool Health Details](https://api.cloudflare.com/#account-load-balancer-pools-pool-health-details) command.

</div>

</details>

If you notice that healthy pools are being marked unhealthy:

- Review [how origins and pools become unhealthy](/understand-basics/health-details).
- Refer to the [Troubleshooting FAQ](https://support.cloudflare.com/hc/articles/4407016052493).

## Step 4 — Create a load balancer on a test subdomain

<LBDefinition/>

<details>
<summary>Create a load balancer (dashboard)</summary>
<div>

<LBCreate/>

</div>

</details>

<details>
<summary>Create a load balancer (API)</summary>
<div>

<LBCreateAPI/>

</div>

</details>

### Route traffic to your load balancer

Just as in the previous step, make sure your load balancer is functioning as you expected before using it with live traffic.

For example, if you had `test.example.com` as a testing subdomain, you could either:

- Create a load balancer with a **Hostname** of `test.example.com`.
- Create a load balancer with a different **Hostname** (`lb.example.com`) and set up a CNAME record on `test.example.com` that points to `lb.example.com`.

Either option would use your load balancer to distribute requests going to `test.example.com`.

## Step 5 — Review load balancing analytics

As you send sample requests to your test domain, review the [load balancing analytics](/reference/load-balancing-analytics) page to make sure your load balancer is distributing requests like you were expecting.

## Step 6 — Deploy your load balancer on live traffic

Now that you have set up your load balancer and verified everything is working correctly, you can put the load balancer on a live domain or subdomain.

As before, you could either:

- Edit the **Hostname** of your existing load balancer
- Update the CNAME record sending traffic to your load balancer

<Aside type="note">

If you have an Enterprise account, also evaluate your application for any excluded paths. For example, you might not want the load balancer to distribute requests directed at your `/admin` path. For any exceptions, [set up a Page Rule](https://support.cloudflare.com/hc/articles/206190798) using the **Resolve Override** setting.

</Aside>

## Step 7 — Continue reviewing load balancing analytics

Repeat [Step 5](#step-5--review-load-balancing-analytics) to ensure your load balancer is acting as expected.