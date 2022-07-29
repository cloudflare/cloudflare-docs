---
pcx-content-type: reference
title: Common policies
weight: 1
---

# Common network policies

The following policies are commonly used to secure network traffic.

{{<render file="_policies-optional.md">}}

## Enforce device posture

Require devices to have certain software installed or other configuration attributes. For instructions on setting up a device posture check, refer to the [device posture section](/cloudflare-one/identity/devices/).

| Selector                     | Operator  | Value                | Action |
| ---------------------------- | ----------| ---------------------| ------ |
| Passed Device Posture Checks | in        | `Minimum OS version` | Allow |

## Enforce session duration

[Require users to re-authenticate](/cloudflare-one/policies/filtering/enforce-sessions/) after a certain amount of time has elapsed.

## Restrict access to private networks

Restrict access to resources which you have connected through [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/).

The following example consists of two policies: the first allows specific users to reach your application, and the second blocks all other traffic. Make sure that the Allow policy has higher priority (by positioning it towards the top of the list in the UI).

### 1. Allow company employees

| Selector       | Operator      | Value                | Action |
| ---------------| --------------| ---------------------| ------ |
| Destination IP | in            | `10.0.0.0/8`         | Allow  |
| User Email     | Matches regex | `*@example.com`      |        |

### 2. Block everyone else

| Selector       | Operator      | Value                | Action |
| ---------------| --------------| ---------------------| ------ |
| Destination IP | in            | `10.0.0.0/8`         | Block  |

Refer to the [network policies page](/cloudflare-one/policies/filtering/network-policies/) for a comprehensive list of other selectors, operators, and actions.
