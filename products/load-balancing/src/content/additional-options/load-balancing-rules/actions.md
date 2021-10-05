---
title: Actions
order: 30
type: overview
pcx-content-type: reference
---

# Load Balancing actions

Add **actions** to customize how your load balancer responds to certain HTTP requests.

Each load balancing rule includes one or more actions.

## Supported Actions

This table lists the actions available for Load Balancing rules. For a walkthrough, refer to [Create Load Balancing rules](../create-rules).

<table style='width:100%'>
  <thead>
    <tr>
      <th style='width:20%'>Action</th>
      <th style='width:20%'>Options</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><em>Fixed response</em></td>
      <td><em>N/A</em></td>
      <td>Respond to the request with an HTTP status code and an optional message.</td>
    </tr>
    <tr>
      <td><em>Override</em></td>
      <td><em>Session affinity</em></td>
      <td>Set the <a href="/understand-basics/session-affinity">session affinity</a> for the request. You can customize cookie behavior and session time-to-live (TTL).</td>
    </tr>
    <tr>
      <td><em>Override</em></td>
      <td><em>Load balancer TTL</em></td>
      <td>Customize the load balancer session time-to-live (TTL).</td>
    </tr>
    <tr>
      <td><em>Override</em></td>
      <td><em>Steering policy</em></td>
      <td>Update the <a href="/understand-basics/traffic-steering">steering policy</a> associated with your load balancer.</td>
    </tr>
    <tr>
      <td><em>Override</em></td>
      <td><em>Fallback pool</em></td>
      <td>Update the <a href="/understand-basics/traffic-steering">fallback pools</a> associated with your load balancer.</td>
    </tr>
    <tr>
      <td><em>Override</em></td>
      <td><em>Origin pools</em></td>
      <td>Update the <a href="/understand-basics/pools">origin pools</a> associated with your load balancer.</td>
    </tr>
    <tr>
      <td><em>Override</em></td>
      <td><em>Region pools</em></td>
      <td>Update the <a href="/understand-basics/traffic-steering#geo-steering">region pools</a> associated with your load balancer.</td>
    </tr>
    <tr>
      <td><em>Override</em></td>
      <td><em>Terminates</em></td>
      <td>Stop processing Load Balancing rules and apply the current load balancing logic to the request.</td>
    </tr>
    
  </tbody>
</table>
