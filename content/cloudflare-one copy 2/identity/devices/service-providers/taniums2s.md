---
pcx_content_type: how-to
title: Tanium
weight: 4
layout: single
hidden: true
---

# Tanium

{{<render file="posture/_available-for-warp-with-gateway.md">}}

Service-to-service device posture with Tanium requires the Tanium agent and the Cloudflare WARP client to be deployed on your devices. Unlike the previous [Tanium with Cloudflare Access integration](/cloudflare-one/identity/devices/tanium), this integration reads Tanium endpoint data via the WARP client. You can use either Tanium Cloud or on-premise installations of Tanium.

## Set up Tanium as a service provider

### 1. Get Tanium settings

The following Tanium values are needed to set up the Tanium posture check:

- Client Secret
- Rest API URL

To retrieve those values:

1. Log in to your Tanium instance.
2. Go to **Administration** > **API Tokens**.
3. Select **New API Token**.
4. Set **Expire in days** to an appropriate value for your organization. When this token expires, all device posture results will begin to fail unless updated.
5. Set **Trusted IP addresses** to `0.0.0.0/0`.
6. Select **Save**.
7. Copy the **Client Secret** and **API URL** to a safe place.

### 2. Add Tanium as a service provider

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
2. Scroll down to **Device posture providers** and select **Add new**.
3. Select **Tanium**.
4. Enter any name for the provider. This name will be used throughout the dashboard to reference this connection.
5. Enter the **Client Secret** and **Rest API URL** you noted down above.
6. Choose a **polling frequency** for how often Cloudflare Zero Trust should query Tanium for information.
7. Select **Save**.

{{<render file="/posture/_test-posture-provider.md">}}

### 3. Configure the posture check

{{<render file="posture/_configure-posture-check.md" withParameters="Tanium">}}

## Device posture attributes

| Selector      | Description         |
| ------------- | ------------------- |
| Total score   | `totalScore` of the device from [Tanium's EndpointRisk assessment](https://developer.tanium.com/site/global/apis/graphql/spectaql/index.gsp#definition-EndpointRisk)|