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
   <td><a href="https://api.cloudflare.com/#account-load-balancer-pools-create-pool">Create Pool</a>
   </td>
   <td><code class="InlineCode">POST</code>
   </td>
   <td><code class="InlineCode">accounts/:account_id/load_balancers/pools</code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#account-load-balancer-pools-delete-pool">Delete Pool</a>
   </td>
   <td><code class="InlineCode">DELETE</code>
   </td>
   <td><code class="InlineCode">accounts/:account_id/load_balancers/pools/:id</code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#account-load-balancer-pools-list-pools">List Pools</a>
   </td>
   <td><code class="InlineCode">GET</code>
   </td>
   <td><code class="InlineCode">accounts/:account_id/load_balancers/pools</code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#account-load-balancer-pools-pool-details">Pool Details</a>
   </td>
   <td><code class="InlineCode">GET</code>
   </td>
   <td><code class="InlineCode">accounts/:account_id/load_balancers/pools/:id</code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#account-load-balancer-pools-pool-health-details">Pool Health Details</a>
   </td>
   <td><code class="InlineCode">GET</code>
   </td>
   <td><code class="InlineCode">accounts/:account_id/load_balancers/pools/:id/health</code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#account-load-balancer-pools-patch-pool">Overwrite specific properties</a>
   </td>
   <td><code class="InlineCode">PATCH</code>
   </td>
   <td><code class="InlineCode">accounts/:account_id/load_balancers/pools/:id</code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#account-load-balancer-pools-update-pool">Overwrite existing pool</a>
   </td>
   <td><code class="InlineCode">PUT</code>
   </td>
   <td><code class="InlineCode">accounts/:account_id/load_balancers/pools/:id</code>
   </td>
  </tr>
   <tr>
   <td><a href="https://api.cloudflare.com/#account-load-balancer-pools-preview-pool">Preview Pool</a>
   </td>
   <td><code class="InlineCode">POST</code>
   </td>
   <td><code class="InlineCode">accounts/:account_id/load_balancers/pools/:id/preview</code>
   </td>
  </tr>
   <tr>
   <td><a href="https://api.cloudflare.com/#account-load-balancer-pools-list-pool-references">List Pool References</a>
   </td>
   <td><code class="InlineCode">GET</code>
   </td>
   <td><code class="InlineCode">accounts/:account_id/load_balancers/pools/:id/references</code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>
