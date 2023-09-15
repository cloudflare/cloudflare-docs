---
pcx_content_type: how-to
title: Device posture
weight: 4
layout: single
---

# Enforce device posture

With Cloudflare Zero Trust, you can configure Zero Trust policies that rely on additional signals from the WARP client or from third-party endpoint security providers. When device posture checks are configured, users can only connect to a protected application or network resource if they have a managed or healthy device.

## Prerequisites

The WARP client must be [deployed](/cloudflare-one/connections/connect-devices/warp/deployment/) in [Gateway with WARP mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/).

## 1. Enable device posture checks

Setup instructions vary depending on the device posture attribute. Refer to the links below to view the setup guide for your provider.

- [WARP client checks](/cloudflare-one/identity/devices/warp-client-checks/) are performed by the Cloudflare WARP client.
- [Service-to-service checks](/cloudflare-one/identity/devices/service-providers/) are performed by third-party device posture providers.
- [Access integration checks](/cloudflare-one/identity/devices/access-integrations/) are only configurable for Access applications. These attributes cannot be used in Gateway policies.

## 2. Verify device posture checks

Before integrating a device posture check in a Gateway or Access policy, go to **Logs** > **Posture** and verify that the Pass/Fail results match your expectations.

## 3. Build a device posture policy

You can now use your device posture check in an [Access policy](/cloudflare-one/policies/access/) or a Gateway [network policy](/cloudflare-one/policies/gateway/network-policies/common-policies/#enforce-device-posture). In Access, the enabled device posture attributes will appear in the list of available [selectors](/cloudflare-one/policies/access/#selectors). In Gateway, the attributes will appear when you choose the [Passed Device Posture Check](/cloudflare-one/policies/gateway/network-policies/#device-posture) selector.

## 4. Ensure traffic is going through WARP

[WARP client](/cloudflare-one/identity/devices/warp-client-checks/) and [service-to-service](/cloudflare-one/identity/devices/service-providers/) posture checks rely on traffic going through WARP to detect posture information for a device. In your [Split Tunnel configuration](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/), ensure that the following domains are included in WARP:

- The IdP used to authenticate to Cloudflare Zero Trust if posture check is part of an Access policy.
- `<your-team-name>.cloudflareaccess.com` if posture check is part of an Access policy.
- The application protected by the Access or Gateway policy.

## Policy enforcement rate

Access detects changes in device posture at the same rate as the [polling frequency](#polling-frequency) configured for the posture check.

Because Gateway evaluates network and HTTP policies on every request, it maintains a local cache of posture results that is only updated every five minutes. Therefore, Gateway policies are subject to an additional five-minute delay. For example, if you set your polling frequency to 10 minutes, it may take up to 15 minutes for Gateway to detect posture changes on a device.

```mermaid
flowchart LR
accTitle: Device posture policy enforcement
A[Device] --schedule--> B[WARP client]--> C((Cloudflare)) --> D[Access policy]
C --5 min--> E[Cache] --> F[Gateway policy]
A --> G[Service provider] --interval--> C
```

### Expiration

By default, the posture result on Cloudflare remains valid until it is overwritten by new data. You can specify an `expiration` time using our [API](/api/operations/device-posture-rules-update-device-posture-rule). We recommend setting the expiration to be longer than the [polling frequency](#polling-frequency).

### Polling frequency

#### WARP client checks

By default, the WARP client polls the device for status changes every five minutes. To modify the polling frequency, use the API to update the [`schedule`](/api/operations/device-posture-rules-update-device-posture-rule) parameter.

#### Service provider checks

When setting up a [service-to-service integration](/cloudflare-one/identity/devices/service-providers/), you will choose a polling frequency to determine how often Cloudflare will query the third-party API. To set the polling frequency via the API, use the [`interval`](/api/operations/device-posture-integrations-update-device-posture-integration) parameter.
