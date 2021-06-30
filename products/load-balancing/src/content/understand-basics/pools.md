---
order: 13
pcx-content-type: concept
---

# Pools

## Overview

A Cloudflare Load Balancing pool represents a group of origin servers, each identified by their IP address or hostname. You can configure multiple pools, as well as failover priority (Pool A-> Pool B-> Pool C). If you're familiar with DNS terminology, think of a pool as a “record set,” except we only return addresses that are considered healthy. You can attach health checks to individual pools to tailor monitoring for collections of origin servers.

---

## Important notes

When working with pools, note the following:

**When adding origin servers to a pool, you can identify the origin by hostname or IP address**.

**The order of pools in the load balancer determines the standard failover priority**. When the number of healthy origins in a pool drops below the configured threshold, Load Balancing routes traffic to the next available pool.

**By default, pools are ordered by date created**. You can reorder them from the Load Balancing dashboard and via Cloudflare API (use the Update Pools command to set a new `origins` array).

**Dynamic Steering uses Round Trip Time (RTT) profiles to determine pool priority**. If there is no RTT data for a pool in a region or colocation center, Load Balancing will use pool order to determine failover priority.

**Geo Steering directs traffic to pools based on the client’s region or point of presence.** If there is no Geo Steering configuration for a region or pool, the load balancer will use pool order to determine failover priority.

---

## Properties

For a list of available pool properties, see our [API docs](https://api.cloudflare.com/#account-load-balancer-pools-properties).

---

## Per origin Host header override

To balance traffic across multiple hosts, add `Host` headers to individual origins within the same pool.

For example, you might have a pool with origins hosted in multiple AppEngine projects or Amazon S3 buckets. You also might want to set up specific failover origins within a pool.

Since these examples require specific hostnames per origin, your load balancer could not properly route traffic _without_ a `Host` header override.

If you need an origin `Host` header override, add it when [creating](/create-load-balancer-ui#create-and-add-origin-pools) or editing a pool. For security reasons, this header must meet one of the following criteria:
- Is a subdomain of a zone associated with this account
- Matches the origin address
- Publicly resolves to the origin address

For details about how origin and monitor `Host` headers interact, see [Host header prioritization](/understand-basics/monitors#host-header-prioritization).

---

## Managing pools via the Cloudflare API

### Endpoints

Pool endpoints are available in the Cloudflare API at both the user and account level, respectively:

- `user/load_balancers/pools`
- `accounts/:account_identifier/load_balancers/pools`

### Commands

The Cloudflare API supports the following commands. For more detail, see _[Cloudflare API: Load Balancer Pools](https://api.cloudflare.com/#load-balancer-pools-properties)_.

<TableWrap>

<table>
  <thead>
  <tr>
   <th><strong>Command</strong>
   </th>
   <th><strong>Method</strong>
   </th>
   <th><strong>Endpoint</strong>
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td>Create Pool
   </td>
   <td><code class="InlineCode">POST</code>
   </td>
   <td><code class="InlineCode">user/load_balancers/pools</code>
   </td>
  </tr>
  <tr>
   <td>Delete Pool
   </td>
   <td><code class="InlineCode">DELETE</code>
   </td>
   <td><code class="InlineCode">user/load_balancers/pools/:identifier</code>
   </td>
  </tr>
  <tr>
   <td>List Pools
   </td>
   <td><code class="InlineCode">GET</code>
   </td>
   <td><code class="InlineCode">user/load_balancers/pools</code>
   </td>
  </tr>
  <tr>
   <td>Pool Details
   </td>
   <td><code class="InlineCode">GET</code>
   </td>
   <td><code class="InlineCode">user/load_balancers/pools/:identifier</code>
   </td>
  </tr>
  <tr>
   <td>Pool Health Details
   </td>
   <td><code class="InlineCode">GET</code>
   </td>
   <td><code class="InlineCode">user/load_balancers/pools/:identifier/health</code>
   </td>
  </tr>
  <tr>
   <td>Update Pool
   </td>
   <td><code class="InlineCode">PUT</code>
   </td>
   <td><code class="InlineCode">user/load_balancers/pools/:identifier</code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>
