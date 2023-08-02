---
pcx_content_type: how-to
title: SentinelOne
weight: 4
layout: single
---

# SentinelOne

{{<render file="posture/_available-for-warp-with-gateway.md">}}

Device posture with SentinelOne requires the SentinelOne agent and the Cloudflare WARP client to be deployed on your devices. Our service-to-service posture check identifies devices based on their serial numbers.

## Set up SentinelOne as a service provider

### 1. Obtain SentinelOne settings

The following SentinelOne values are needed to set up the SentinelOne posture check:

- API Token
- REST API URL

To retrieve those values:

1. Log in to your SentinelOne Dashboard.
2. Go to **Settings** > **Users** > **Create new Service User**.
3. Select **Create New Service User**.
4. Enter a **Name** and **Expiration Date** and select **Next**.
5. Set **Scope of Access** to _Viewer_.
6. Select **Create User**. SentinelOne will generate an API Token for this user.
7. Copy the **API Token** to a safe location.
8. Select **Close**.
9. Copy the **Rest API URL** from your browser's address bar (for example, `https://<S1-DOMAIN>.sentinelone.net`).

### 2. Add SentinelOne as a service provider

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
2. Scroll down to **Device posture providers** and select **Add new**.
3. Select **SentinelOne**.
4. Enter any name for the provider. This name will be used throughout the dashboard to reference this connection.
5. In **Client Secret**, enter your **API Token**.
6. In **Rest API URL**, enter `https://<S1-DOMAIN>.sentinelone.net`.
7. Choose a **Polling frequency** for how often Cloudflare Zero Trust should query SentinelOne for information.
8. Select **Save**.

{{<render file="posture/_test-posture-provider.md">}}

### 3. Configure the posture check

{{<render file="posture/_configure-posture-check.md" withParameters="SentinelOne">}}

## Device posture attributes

Device posture data is gathered from the SentinelOne Management APIs. For more information, refer to `https://<S1-DOMAIN>.sentinelone.net/api-doc/overview`.

| Selector      | Description         |
| ------------- | ------------------- |
| Infected          | Whether the device is infected     |
| Active Threats      | Number of active threats on the device   |
| Is Active | Whether the SentinelOne Agent is active |
| Network status      | Whether the device is connected to the Internet   |
