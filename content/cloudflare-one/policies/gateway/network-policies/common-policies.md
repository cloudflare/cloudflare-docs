---
pcx_content_type: reference
title: Common policies
weight: 1
meta:
    title: Common network policies
---

# Common network policies

The following policies are commonly used to secure network traffic.

Refer to the [network policies page](/cloudflare-one/policies/gateway/network-policies/) for a comprehensive list of other selectors, operators, and actions.

{{<render file="gateway/policies/_block-applications.md">}}

{{<render file="gateway/policies/_policies-optional.md">}}

## Enforce device posture

Require devices to have certain software installed or other configuration attributes. For instructions on enabling a device posture check, refer to the [device posture section](/cloudflare-one/identity/devices/).

In the following example, users can only access an application if they connect from a company device.

| Selector                     | Operator | Value                   | Logic | Action |
| ---------------------------- | -------- | ----------------------- | ----- | ------ |
| Passed Device Posture Checks | not in   | `Device serial numbers` | And   | Block  |
| SNI Domain                   | is       | `internalapp.com`       |       |        |

## Enforce session duration

[Require users to re-authenticate](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-sessions/) after a certain amount of time has elapsed.

## Restrict access to private networks

Restrict access to resources which you have connected through [Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/).

The following example consists of two policies: the first allows specific users to reach your application, and the second blocks all other traffic. Make sure that the Allow policy has higher priority (by positioning it towards the top of the list in the UI).

### 1. Allow company employees

| Selector       | Operator      | Value            | Logic | Action |
| -------------- | ------------- | ---------------- | ----- | ------ |
| Destination IP | in            | `10.0.0.0/8`     | And   | Allow  |
| User Email     | matches regex | `.*@example.com` |       |        |

### 2. Block everyone else

| Selector       | Operator | Value        | Action |
| -------------- | -------- | ------------ | ------ |
| Destination IP | in       | `10.0.0.0/8` | Block  |
