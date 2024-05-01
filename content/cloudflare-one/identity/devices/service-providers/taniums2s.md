---
pcx_content_type: how-to
title: Tanium
weight: 4
hidden: true
meta:
   title: Tanium - Posture checks
---

# Tanium

{{<render file="posture/_service-provider-intro.md" withParameters="Tanium">}}

## Prerequisites

- Either Tanium Cloud or on-premise installations of Tanium
- Tanium agent is deployed on the device.
- {{<render file="posture/_prereqs-warp-is-deployed.md" withParameters="[Service providers](/cloudflare-one/identity/devices/service-providers/)">}}

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
6. Choose a **Polling frequency** for how often Cloudflare Zero Trust should query Tanium for information.
7. Select **Save**.

{{<render file="/posture/_test-posture-provider.md">}}

### 3. Configure the posture check

{{<render file="posture/_configure-posture-check.md" withParameters="Tanium">}}

## Device posture attributes

| Selector      | Description         |
| ------------- | ------------------- |
| Total score   | `totalScore` of the device from [Tanium's EndpointRisk assessment](https://developer.tanium.com/site/global/apis/graphql/spectaql/index.gsp#definition-EndpointRisk)|