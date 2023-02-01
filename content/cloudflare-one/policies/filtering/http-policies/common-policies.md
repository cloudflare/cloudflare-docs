---
pcx_content_type: reference
title: Common policies
weight: 1
---

# Common HTTP policies

The following policies are commonly used to secure HTTP traffic.

{{<render file="gateway/_policies-optional.md">}}

## Enforce device posture

Require devices to have certain software installed or other configuration attributes. For instructions on setting up a device posture check, refer to the [device posture section](/cloudflare-one/identity/devices/).

| Selector                     | Operator  | Value                | Action |
| ---------------------------- | ----------| ---------------------| ------ |
| Passed Device Posture Checks | in        | `Minimum OS version` | Allow |

## Enforce session duration

[Require users to re-authenticate](/cloudflare-one/policies/filtering/enforce-sessions/) after a certain amount of time has elapsed.

## Isolate high risk sites in remote browser

If you are using the [Browser Isolation add-on](/cloudflare-one/policies/browser-isolation/), refer to our list of [common Isolate policies](/cloudflare-one/policies/browser-isolation/isolation-policies/#common-policies).

## Bypass inspection for self-signed certificates

When accessing origin servers with certificates not signed by a public certificate authority, you must bypass TLS decryption.

| Selector | Operator | Value           | Action         |
| ---------| ---------| ----------------| -------------- |
| Domain   | in       | `internal.site.com`  | Do Not Inspect |

Refer to the [HTTP policies page](/cloudflare-one/policies/filtering/http-policies/) for a comprehensive list of other selectors, operators, and actions.
