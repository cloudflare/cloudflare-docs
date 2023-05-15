---
type: overview
pcx_content_type: reference
title: JavaScript detections
weight: 0
---

# JavaScript detections

{{<render file="_javascript-detections-definition.md" withParameters=" " >}}

## Enable JavaScript detections

For Free customers (Bot Fight Mode), JavaScript detections are automatically enabled and cannot be disabled.

For all other customers (Super Bot Fight Mode and Bot Management for Enterprise), JavaScript detections are optional.

{{<render file="_javascript-detections-enable.md">}}

For more details on how to set up bot protection, see [Get started](/bots/get-started/).

## Enforcing execution of JavaScript detections

{{<render file="_javascript-detections-implementation.md">}}

## Limitations

### If you enabled Bot Management before June 2020

Customers who enabled Enterprise Bot Management before June 2020 do not have JavaScript detections enabled by default (unless specifically requested). These customers can still enable the feature in the Cloudflare dashboard.

### If you have a Content Security Policy (CSP)

{{<render file="_javascript-detections-csp.md">}}