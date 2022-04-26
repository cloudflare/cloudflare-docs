---
pcx-content-type: get-started
title: Get started
weight: 3
---

# Get started

This guide is meant for organizations setting up their first load balancer. If you already have active load balancers, refer to [Basic tasks](/load-balancing/how-to/) for general help or [Additional configurations](/load-balancing/additional-options/) for more advanced setups.

---

## Prerequisites

- **Multiple servers**, either physical or cloud-based.
- **Access to Load Balancing**, available as an [add-on](/load-balancing/how-to/enable-load-balancing/) for any type of account.
- **Load balancer hostname**: The hostname for which the Cloudflare Load Balancer will manage traffic. The default hostname is the root hostname.

---

## Step 1 — Create a monitor

{{<render file="_monitor-definition.md">}}

<details>
<summary>Create a monitor (dashboard)</summary>
<div>

<strong>Set up the monitor</strong>

{{<render file="_monitor-create.md">}}

<strong>Prepare your servers</strong>

{{<render file="_monitor-prepare-server.md">}}

</div>
</details>

<details>
<summary>Create a monitor (API)</summary>
<div>

<strong>Set up the monitor</strong>

{{<render file="_monitor-create-api.md">}}

<strong>Prepare your servers</strong>

{{<render file="_monitor-prepare-server.md">}}

</div>
</details>

{{<render file="_monitor-example.md">}}

## Step 2 — Create an origin pool

{{<render file="_pool-definition.md">}}

<details>
<summary>Create a pool (dashboard)</summary>
<div>

{{<render file="_pool-create.md">}}

</div>

</details>

<details>
<summary>Create a pool (API)</summary>
<div>

{{<render file="_pool-create-api.md">}}

</div>

</details>

## Step 3 — Confirm pool health

Before directing any traffic to your pools, make sure that your pools and monitors are set up correctly. The status of your health check will be _unknown_ until the results of the first check are available.

<details>
<summary>Confirm pool health (dashboard)</summary>
<div>

1.  Navigate to **Traffic** > **Load Balancing**.
2.  Click **Manage Pools**.
3.  For pools and individual origins, review the values in the **Health** and **Origin Health** columns.

For more information on pool and origin health statuses, refer to [How a pool becomes unhealthy](/load-balancing/understand-basics/health-details/#how-a-pool-becomes-unhealthy).

</div>

</details>

<details>
<summary>Confirm pool health (API)</summary>
<div>

To fetch the latest health status of all pools, use the [List Pools](https://api.cloudflare.com/#account-load-balancer-pools-list-pools) command, paying attention to the `healthy` value for pools and origins.

For troubleshooting a specific pool's health, use the [Pool Health Details](https://api.cloudflare.com/#account-load-balancer-pools-pool-health-details) command.

</div>

</details>

### Unexpected health status

If you notice that healthy pools are being marked unhealthy:

- Review [how origins and pools become unhealthy](/load-balancing/understand-basics/health-details/).
- Refer to the [Troubleshooting FAQ](https://support.cloudflare.com/hc/articles/4407016052493).

## Step 4 — Create a load balancer on a test subdomain

{{<render file="_load-balancer-definition.md">}}

<details>
<summary>Create a load balancer (dashboard)</summary>
<div>

{{<render file="_load-balancer-create.md">}}

</div>

</details>

<details>
<summary>Create a load balancer (API)</summary>
<div>

{{<render file="_load-balancer-create-api.md">}}

</div>

</details>

### Route traffic to your load balancer

Just as in the previous step, make sure your load balancer is functioning as you expected before using it with live traffic.

For example, if you had `test.example.com` as a testing subdomain, you could either:

- Create a load balancer with a **Hostname** of `test.example.com`.
- Create a load balancer with a different **Hostname** (`lb.example.com`) and set up a `CNAME` record on `test.example.com` that points to `lb.example.com`.

Either option would use your load balancer to distribute requests going to `test.example.com`.

## Step 5 — Review load balancing analytics

As you send sample requests to your test domain, review the [load balancing analytics](/load-balancing/reference/load-balancing-analytics/) page to make sure your load balancer is distributing requests like you were expecting.

## Step 6 — Review DNS records and SSL/TLS coverage

Before you deploy your load balancer, review your DNS records and SSL/TLS coverage.

Sometimes, you might [misunderstand the priority order](/load-balancing/reference/dns-records/#priority-order) for DNS records and route more or less traffic than intended to your load balancer.

Universal SSL certificates do not cover load balancing hostnames without existing DNS records. For additional details, refer to [SSL/TLS coverage](/load-balancing/reference/dns-records/#ssltls-coverage).

## Step 7 — Deploy your load balancer on live traffic

Now that you have set up your load balancer and verified everything is working correctly, you can put the load balancer on a live domain or subdomain.

As before, you could either:

- Edit the **Hostname** of your existing load balancer
- Update the `CNAME` record sending traffic to your load balancer

{{<Aside type="note">}}

If you have an Enterprise account, also evaluate your application for any excluded paths. For example, you might not want the load balancer to distribute requests directed at your `/admin` path. For any exceptions, [set up a Page Rule](https://support.cloudflare.com/hc/articles/206190798) using the **Resolve Override** setting.

{{</Aside>}}

## Step 8 — Continue reviewing load balancing analytics

Repeat [Step 5](#step-5--review-load-balancing-analytics) to ensure your load balancer is acting as expected.
