---
order: 0
pcx-content-type: concept
---

import PoolDefinition from "../_partials/_pool-definition.md"

# Pools

<PoolDefinition/>

If you are familiar with DNS terminology, think of a pool as a “record set,” except Cloudflare only returns addresses that are considered healthy. You can attach health checks to individual pools for customized monitoring.

<Aside>

For more details about how origins and pools become unhealthy, refer to [Origin and pool health](/understand-basics/health-details).

</Aside>

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

For an up-to-date list of pool properties, refer to [Pool properties](https://api.cloudflare.com/#load-balancer-pools-properties) in our API documentation.

---

## Create pools

For step-by-step guidance, refer to [Create pools](/how-to/create-pool).

---

## Per origin Host header override

When your application needs specialized routing (CNAME setup or custom hosts like Heroku), change the `Host` header used in health checks. For more details, refer to [Override HTTP Host headers](/additional-options/override-http-host-headers).

---

## API commands

The Cloudflare API supports the following commands for pools. Examples are given for user-level endpoint but apply to the account-level endpoint as well.

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
   <td><a href="https://api.cloudflare.com/#load-balancer-pools-create-pool">Create Pool</a>
   </td>
   <td><code class="InlineCode">POST</code>
   </td>
   <td><code class="InlineCode">user/load_balancers/pools</code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#load-balancer-pools-delete-pool">Delete Pool</a>
   </td>
   <td><code class="InlineCode">DELETE</code>
   </td>
   <td><code class="InlineCode">user/load_balancers/pools/:identifier</code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#load-balancer-pools-list-pools">List Pools</a>
   </td>
   <td><code class="InlineCode">GET</code>
   </td>
   <td><code class="InlineCode">user/load_balancers/pools</code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#load-balancer-pools-pool-details">Pool Details</a>
   </td>
   <td><code class="InlineCode">GET</code>
   </td>
   <td><code class="InlineCode">user/load_balancers/pools/:identifier</code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#load-balancer-pools-pool-health-details">Pool Health Details</a>
   </td>
   <td><code class="InlineCode">GET</code>
   </td>
   <td><code class="InlineCode">user/load_balancers/pools/:identifier/health</code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#load-balancer-pools-update-pool">Update Pool</a>
   </td>
   <td><code class="InlineCode">PUT</code>
   </td>
   <td><code class="InlineCode">user/load_balancers/pools/:identifier</code>
   </td>
  </tr>
   <tr>
   <td><a href="https://api.cloudflare.com/#load-balancer-pools-preview-pool">Preview Pool</a>
   </td>
   <td><code class="InlineCode">POST</code>
   </td>
   <td><code class="InlineCode">user/load_balancers/pools/:identifier/preview</code>
   </td>
  </tr>
   <tr>
   <td><a href="https://api.cloudflare.com/#load-balancer-pools-list-pool-references">List Pool References</a>
   </td>
   <td><code class="InlineCode">GET</code>
   </td>
   <td><code class="InlineCode">user/load_balancers/pools/:identifier/references</code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>
