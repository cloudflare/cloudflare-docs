---
title: Actions
order: 30
---

# Load Balancing actions

## Overview

Actions tell Cloudflare how to handle HTTP requests that match a Load Balancing expression.

A single Load Balancing rule can include more than one action.

## Supported Actions

This table lists the actions available for Load Balancing rules. For a walkthrough, see [_Creating Load Balancing rules_](/understand-basics/load-balancing-rules/create-rules).

<table style='width:100%'>
  <thead>
    <tr>
      <th style='width:30%'>Action</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><em>Fixed response</em></td>
      <td>Respond to the request with an HTTP status code and an optional message.</td>
    </tr>
    <tr>
      <td><em>Pool selection</em></td>
      <td>Select the pool to receive the request. You can customize the logic for pool selection, including traffic steering method, available pools, fallback pool, and region.</td>
    </tr>
    <tr>
      <td><em>Redirect</em></td>
      <td>Redirect the request to another URL.</td>
    </tr>
    <tr>
      <td><em>Return</em></td>
      <td>Stop processing Load Balancing rules and apply the current load balancing logic to the request.</td>
    </tr>
    <tr>
      <td><em>Session affinity</em></td>
      <td>Set the session affinity for the request. You can customize cookie behavior, session time-to-live (TTL), and origin drain duration TTL.</td>
    </tr>
  </tbody>
</table>
