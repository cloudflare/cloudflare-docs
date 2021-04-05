---
order: 13
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

Cloudflare Pool objects have the following properties:

<TableWrap>

<table>
  <thead>
  <tr>
   <th><strong>Name / type</strong>
   </th>
   <th><strong>Description / example</strong>
   </th>
   <th><strong>Constraints</strong>
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td valign="top"><strong>check_regions</strong>
<p />
<em>arraynull            </em>
   </td>
   <td>A list of regions from which to run health checks. Null means every Cloudflare data center.
<p />
<code class="InlineCode">
[
<p />
  "WEU",
<p />
  "ENAM"
<p />
]
</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td valign="top"><strong>created_on</strong>
<p />
<em>string (date-time)</em>
   </td>
   <td>Creation time
<p />
<code class="InlineCode">"2014-01-01T05:20:00.12345Z"</code>
   </td>
   <td valign="top">Read only
   </td>
  </tr>
  <tr>
   <td valign="top"><strong>description</strong>
<p />
<em>string</em>
   </td>
   <td valign="top">A human-readable description of the pool
<p />
<code class="InlineCode">"This pool is for example.com"</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td valign="top"><strong>enabled</strong>
<p />
<em>boolean</em>
   </td>
   <td>Set to <code class="InlineCode">true</code> to enable the pool; <code class="InlineCode">false</code>, to disable.
<p /><p />
Disabled pools will not receive traffic and are excluded from health checks. Disabling a pool will cause any load balancers associated with the pool to failover to the next pool (if any).
<p />
<code class="InlineCode">true</code>
   </td>
   <td>Default value: <code class="InlineCode">true</code>
<p />
Valid values: <code class="InlineCode">true</code>, <code class="InlineCode">false</code>
   </td>
  </tr>
  <tr>
   <td valign="top"><strong>id</strong>
<p />
<em>string</em>
   </td>
   <td valign="top">API item identifier tag for the pool
<p />
<code class="InlineCode">"17b5962d775c646f3f9725cbc7a53df4"</code>
   </td>
   <td>Max. length: 32 bytes
<p />
Read only
   </td>
  </tr>
  <tr>
   <td valign="top"><strong>minimum_origins</strong>
<p />
<em>integer</em>
   </td>
   <td>The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number, the pool will be marked unhealthy and the load balancer will failover to the next available pool.
<p />
<code class="InlineCode">2</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td valign="top"><strong>modified_on</strong>
<p />
<em>string (date-time)</em>
   </td>
   <td valign="top">Last modification time
<p />
<code class="InlineCode">"2014-01-01T05:20:00.12345Z"</code>
   </td>
   <td>Read only
   </td>
  </tr>
  <tr>
   <td valign="top"><strong>monitor</strong>
<p />
<em>string</em>
   </td>
   <td valign="top">The ID of the monitor to use for health checking origins within this pool
<p />
<code class="InlineCode">"f1aba936b94213e5b8dca0c0dbf1f9cc"</code>
   </td>
   <td valign="top">Max. length: 32 bytes
<p />
Read only
   </td>
  </tr>
  <tr>
   <td valign="top"><strong>name</strong>
<p />
<em>string</em>
   </td>
   <td>A short name (tag) for the pool. Only alphanumeric characters, hyphens and underscores are allowed.
<p />
<code class="InlineCode">"primary-dc-1"</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td valign="top"><strong>notification_email</strong>
<p />
<em>string</em>
   </td>
   <td>The email address to which health status notifications are sent. This can be an individual mailbox or a mailing list.
<p />
<code class="InlineCode">"someone@example.com"</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td valign="top"><strong>origins</strong>
<p />
<em>array</em>
   </td>
   <td>The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itself is healthy.
<p />
<code class="InlineCode">
[
<p />
  {`{`}
<p />
    "name": "app-server-1",
<p />
    "address": "0.0.0.0",
<p />
    "enabled": true,
<p />
    "weight": 0.56
<p />
  {`}`}
<p />
]
</code>
   </td>
   <td>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>

---

## Per origin Host header override

To balance traffic across multiple hosts, add `Host` headers to individual origins within the same pool.

For example, you might have a pool with origins hosted in multiple AppEngine projects or Amazon S3 buckets. You also might want to set up specific failover origins within a pool.

Since these examples require specific hostnames per origin, your load balancer could not properly route traffic _without_ a `Host` header override.

If you need an origin `Host` header override, add it when [creating](/create-load-balancer-ui#create-and-add-origin-pools) or editing a pool. For security reasons, this header also needs to be a subdomain of the overall zone. See [Configure Cloudflare and Heroku](https://support.cloudflare.com/hc/articles/205893698) for more details.

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
