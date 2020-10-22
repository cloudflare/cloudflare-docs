---
order: 18
---
# Load Balancing logs

## Overview

Load Balancing logs provide a historical view of status changes to your origins and how those status changes affect pool health.

Load Balancing only logs events that represent a status change for an origin, from healthy to unhealthy or vice versa.

---

## Properties

Health check event objects have the following properties:

<table>
  <tr>
   <td><strong>Name / type</strong>
   </td>
   <td><strong>Description / example</strong>
   </td>
   <td><strong>Constraints</strong>
   </td>
  </tr>
  <tbody>
  <tr>
   <td valign="top"><strong>id</strong>
<p />
<em>integer</em>
   </td>
   <td>Integer identifier that uniquely represents the health check event.
<p />
<code>2</code>
   </td>
   <td valign="top">Default value: <code>1</code>
   </td>
  </tr>
  <tr>
   <td valign="top"><strong>origins</strong>
<p />
<em>array</em>
   </td>
   <td>An array of objects representing the origin servers associated with the pool.
<p /><code>[</code>
<p />
<code>{`{`}</code>
<p />
<code>"name": "some-origin",</code>
<p />
<code>"address": "198.51.100.4",</code>
<p />
<code>"ip": "198.51.100.4",</code>
<p />
<code>"enabled": true,</code>
<p />
<code>"healthy": true,</code>
<p />
<code>"failure_reason": "No failures",</code>
<p />
<code>"changed": true</code>
<p />
<code>{`}`}</code>
<p />
<code>]</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td valign="top"><strong>pool</strong>
<p />
<em>object</em>
   </td>
   <td>An object that represents the pool for which the health check event was generated.
<p />
<code>{`{`}</code>
<p />
<code>"id": "74bc6a8b9b0dda3d651707a2928bad0c",</code>
<p />
<code>"name": "some-pool",</code>
<p />
<code>"healthy": true,</code>
<p />
<code>"changed": true,</code>
<p />
<code>"minimum_origins": 1</code>
<p />
<code>{`}`}</code>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td valign="top"><strong>timestamp</strong>
<p />
<em>string (date-time)</em>
   </td>
   <td valign="top">The time at which the event was recorded
<p />
<code>"2014-01-01T05:20:00.12345Z"</code>
   </td>
   <td>
   </td>
  </tr>
  </tbody>
</table>

---

## Accessing Load Balancing Logs from the Cloudflare dashboard

Load Balancing Logs are available from the **Traffic** app of the Cloudflare dashboard within the **Load Balancing Analytics** tab under the **Logs** submenu. You can filter the logs by Date, Pool Health, Pool, Origin Health, and/or Origin.

Click the expansion arrow at the far right of the event to expose more detail, including a list of healthy origins for the pool that was the subject of the event, the health threshold for that pool, Pool ID, and the origin address. Failure events include a reason for the failure and a list of failed origins.

---

## Accessing Load Balancing Logs via the Cloudflare API

### Commands

To list health check events, use the List Health Check Events API endpoint:

```bash
GET user/load_balancing_analytics/events
```

For a list of optional parameters, which are useful for filtering log results, see _[Cloudflare API v4 Documentation: Health Check Events](https://api.cloudflare.com/#load-balancer-healthcheck-events-list-healthcheck-events)_.
