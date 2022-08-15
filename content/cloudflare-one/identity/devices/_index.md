---
pcx_content_type: how-to
title: Device posture
weight: 4
layout: single
---

# Enforce device posture

With Cloudflare Zero Trust, you can configure Zero Trust policies that rely on additional signals from the WARP client or from third-party endpoint security providers. When device posture checks are configured, users can only connect to a protected application or network resource if they have a managed or healthy device.

## 1. Enable device posture checks

Setup instructions vary depending on the device posture attribute. Refer to the links below to view the setup guide for your provider.

* [WARP client checks](/cloudflare-one/identity/devices/warp-client-checks/) are performed by the Cloudflare WARP client.
* [Service-to-service checks](/cloudflare-one/identity/devices/service-providers/) are performed by third-party device posture providers.
* [Access integration checks](/cloudflare-one/identity/devices/access-integrations/) are only configurable for Access applications. These attributes cannot be used in Gateway policies.

## 2. Verify device posture checks

Before integrating a device posture check in a Gateway or Access policy, you should verify that the Pass/Fail result from the device matches your expectations.

1. In the [Zero Trust Dashboard](https://dash.teams.cloudflare.com/), go to **My Team** > **Devices**.
2. Find the device running the posture check and select **View**.
3. Scroll down to **WARP client posture checks** and **Service provider posture checks**.
4. Select a result to review details. You will see the value returned from the device, as well as the value required to pass the check.

![Device posture results in the Zero Trust dashboard](/cloudflare-one/static/documentation/identity/devices/device-posture-dash-result.png)

## 3. Build a device posture policy

You can now use your device posture check in an Access policy or a Gateway [network policy](/cloudflare-one/policies/filtering/network-policies/common-policies/#enforce-device-posture). In Access, the enabled device posture attributes will appear in the list of available [selectors](/cloudflare-one/policies/access/#selectors). In Gateway, the attributes will appear when you choose the [Passed Device Posture Check](/cloudflare-one/policies/filtering/network-policies/#device-posture) selector.
