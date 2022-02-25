---
pcx-content-type: concept
title: Monitors
weight: 2
---

import MonitorDefinition from "../\_partials/\_monitor-definition.md"
import HealthCheckRegions from "../\_partials/\_health-check-regions.md"

# Monitors

<MonitorDefinition/>

![Dynamic load balancing involves pools, origins, monitors, and health checks](/load-balancing/static/images/load-balancer-components.png)

Health checks that result in a status change for an origin server are recorded as events in the Load Balancing event logs.

{{<Aside type="note">}}

Health checks associated with load balancers are different from <strong>Standalone health checks</strong>. For more details about Standalone health checks, see the <a href="https://support.cloudflare.com/hc/articles/4404867308429">Support documentation</a>.

{{</Aside>}}

***

## Properties

For an up-to-date list of monitor properties, refer to [Monitor properties](https://api.cloudflare.com/#load-balancer-monitors-properties) in our API documentation.

***

## Create monitors

For step-by-step guidance, refer to [Create monitors](/load-balancing/how-to/create-monitor/).

***

## Health check regions

When you [attach a monitor to a pool](/load-balancing/how-to/create-monitor/#attach-the-monitor-to-a-pool), you can select multiple regions to increase reporting accuracy.

<HealthCheckRegions/>

### Increased origin strain

Because of how Cloudflare checks health from [multiple regions](#health-check-regions), adding multiple regions — or choosing to check health from **All Data Centers** — can send a lot of traffic to your origin.

The same problem can occur when setting low values for a monitor's **Interval**.

***

## Host header prioritization

When a load balancer runs health checks, headers set on an origin override headers set on a monitor. For more details, refer to [Override HTTP Host headers](/load-balancing/additional-options/override-http-host-headers/).

***

## API commands

The Cloudflare API supports the following commands for monitors. Examples are given for user-level endpoint but apply to the account-level endpoint as well.

{{<table-wrap>}}

<table>
  <thead>
    <tr>
      <th><strong>Command</strong></th>
      <th><strong>Method</strong></th>
      <th><strong>Endpoint</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://api.cloudflare.com/#account-load-balancer-monitors-create-monitor">Create Monitor</a></td>
      <td>{{<code>}}POST{{</code>}}</td>
      <td>{{<code>}}accounts/:account_id/load_balancers/monitors{{</code>}}</td>
    </tr>
    <tr>
      <td><a href="https://api.cloudflare.com/#account-load-balancer-monitors-delete-monitor">Delete Monitor</a></td>
      <td>{{<code>}}DELETE{{</code>}}</td>
      <td>{{<code>}}accounts/:account_id/load_balancers/monitors/:id{{</code>}}</td>
    </tr>
    <tr>
      <td><a href="https://api.cloudflare.com/#account-load-balancer-monitors-list-monitors">List Monitors</a></td>
      <td>{{<code>}}GET{{</code>}}</td>
      <td>{{<code>}}accounts/:account_id/load_balancers/monitors{{</code>}}</td>
    </tr>
    <tr>
      <td><a href="https://api.cloudflare.com/#account-load-balancer-monitors-monitor-details">Monitor Details</a></td>
      <td>{{<code>}}GET{{</code>}}</td>
      <td>{{<code>}}accounts/:account_id/load_balancers/monitors/:id{{</code>}}</td>
    </tr>
    <tr>
      <td><a href="https://api.cloudflare.com/#account-load-balancer-monitors-patch-monitor">Overwrite specific properties</a></td>
      <td>{{<code>}}PATCH{{</code>}}</td>
      <td>{{<code>}}accounts/:account_id/load_balancers/monitors/:id{{</code>}}</td>
    </tr>
    <tr>
      <td><a href="https://api.cloudflare.com/#account-load-balancer-monitors-update-monitor">Overwrite existing monitor</a></td>
      <td>{{<code>}}PUT{{</code>}}</td>
      <td>{{<code>}}accounts/:account_id/load_balancers/monitors/:id{{</code>}}</td>
    </tr>
     <tr>
      <td><a href="https://api.cloudflare.com/#account-load-balancer-monitors-preview-monitor">Preview Monitor</a></td>
      <td>{{<code>}}POST{{</code>}}</td>
      <td>{{<code>}}accounts/:account_id/load_balancers/monitors/:id/preview{{</code>}}</td>
    </tr>
  </tbody>
</table>

{{</table-wrap>}}
