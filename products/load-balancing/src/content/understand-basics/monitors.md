---
order: 1
pcx-content-type: concept
---

import MonitorDefinition from "../_partials/_monitor-definition.md"

# Monitors

<MonitorDefinition/>

![Dynamic load balancing involves pools, origins, monitors, and health checks](../static/images/load-balancer-components.png)

Health checks that result in a status change for an origin server are recorded as events in the Load Balancing event logs.

<Aside type="note">

Health checks associated with load balancers are different from <strong>Standalone health checks</strong>. For more details about Standalone health checks, see the <a href="https://support.cloudflare.com/hc/articles/4404867308429">Support documentation</a>.

</Aside>

---

## Properties

For an up-to-date list of monitor properties, refer to [Monitor properties](https://api.cloudflare.com/#load-balancer-monitors-properties) in our API documentation.

---

## Create monitors

For step-by-step guidance, refer to [Create monitors](/how-to/create-monitor).

---

## Host header prioritization

When a load balancer runs health checks, headers set on an origin override headers set on a monitor. For more details, refer to [Override HTTP Host headers](/additional-options/override-http-host-headers).

---

## API commands

The Cloudflare API supports the following commands for monitors. Examples are given for user-level endpoint but apply to the account-level endpoint as well.

<TableWrap>

<table>
  <thead>
    <tr>
      <th><Strong>Command</Strong></th>
      <th><Strong>Method</Strong></th>
      <th><Strong>Endpoint</Strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://api.cloudflare.com/#load-balancer-monitors-create-monitor">Create Monitor</a></td>
      <td><Code>POST</Code></td>
      <td><Code>user/load_balancers/monitors</Code></td>
    </tr>
    <tr>
      <td><a href="https://api.cloudflare.com/#load-balancer-monitors-delete-monitor">Delete Monitor</a></td>
      <td><Code>DELETE</Code></td>
      <td><Code>user/load_balancers/monitors</Code></td>
    </tr>
    <tr>
      <td><a href="https://api.cloudflare.com/#load-balancer-monitors-list-monitors">List Monitors</a></td>
      <td><Code>GET</Code></td>
      <td><Code>user/load_balancers/monitors</Code></td>
    </tr>
    <tr>
      <td><a href="https://api.cloudflare.com/#load-balancer-monitors-monitor-details">Monitor Details</a></td>
      <td><Code>GET</Code></td>
      <td><Code>user/load_balancers/monitors/:identifier</Code></td>
    </tr>
    <tr>
      <td><a href="https://api.cloudflare.com/#load-balancer-monitors-update-monitor">Update Monitor</a></td>
      <td><Code>PUT</Code></td>
      <td><Code>user/load_balancers/monitors</Code></td>
    </tr>
     <tr>
      <td><a href="https://api.cloudflare.com/#load-balancer-monitors-preview-monitor">Preview Monitor</a></td>
      <td><Code>POST</Code></td>
      <td><Code>user/load_balancers/monitors/:identifier/preview</Code></td>
    </tr>
  </tbody>
</table>

</TableWrap>
