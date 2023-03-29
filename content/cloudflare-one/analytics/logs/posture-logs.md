---
pcx_content_type: reference
title: Posture logs
layout: single
weight: 7
---

# Posture logs

Posture logs show the [device posture check](/cloudflare-one/identity/devices/) results reported by the WARP client.

To view device posture logs, log in to [Zero Trust](https://one.dash.cloudflare.com/) and go to **Logs** > **Posture**. Logs will only display if you have configured [device posture checks](/cloudflare-one/identity/devices/) for your Zero Trust organization.

Enterprise users can generate more detailed logs with [Logpush](/cloudflare-one/analytics/logs/logpush/).

## Explanation of the fields

### Device details

| Field             | Description |
|-------------------|-------------|
| **Name**          | Name of the device.  |
| **Serial number** | Serial number of the device.           |
| **Manufacturer**  | Manufacturer of the device.            |
| **Model**         | Model of the device.  |

### User details

| Field       | Description |
|-------------|-------------|
| **Email**   | Email used to register the device with Zero Trust.            |
| **User ID** | UUID of the user who registered the device.           |

### Posture details

| Field               | Description |
|---------------------|-------------|
| **Name**            | Name of the [device posture check](/cloudflare-one/identity/devices). |
| **Type**            | Type of [WARP client check](/cloudflare-one/identity/devices/warp-client-checks/) or [service provider check](/cloudflare-one/identity/devices/service-providers/).      |
| **Rule ID**         | UUID of the device posture check.           |
| **Conditions met**  | Whether the device passed or failed the posture check criteria. Evaluates to `true` if the **Received values** match the **Expected values**.      |
| **Expected values** | Values required to pass the device posture check.       |
| **Received values** | Posture check values detected by the WARP client.  |