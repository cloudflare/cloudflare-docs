---
pcx_content_type: how-to
title: CrowdStrike
weight: 4
layout: single
---

# CrowdStrike

Device posture with CrowdStrike requires the CrowdStrike agent and the Cloudflare WARP client to be deployed on your devices. For this integration to function, our service-to-service posture check relies on the **serial_number** being the same in both clients. Follow the instructions below to set up the integration.

## Set up CrowdStrike as a service provider

### 1. Get CrowdStrike settings

The following CrowdStrike values are needed to set up the CrowdStrike posture check:

- Client ID
- Client Secret
- Base URL
- Customer ID

To retrieve those values:

1. Log in to your Falcon Dashboard.
2. Go to **Support and resources** > **API Clients and Keys**.
3. Select **Add new API client** and enter any name for the client.
4. Enable the **Read** API Scope for **Zero Trust Assessment** and **Hosts**.
5. Select **Add**.
6. Copy the **Client ID**, **Client Secret**, and **Base URL** to a safe place.
7. Go to **Host setup and management** > **Sensor downloads** and copy your Customer ID.
8. Get an [auth token](https://falcon.us-2.crowdstrike.com/documentation/93/oauth2-auth-token-apis) from your CrowdStrike API endpoint. For example, if your base URL is `https://api.us-2.crowdstrike.com`, then make a `POST` request to `https://api.us-2.crowdstrike.com/oauth2/token` with your Client ID and Client Secret.

### 2. Add CrowdStrike as a service provider

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **WARP Client**.
2. Scroll down to **Device posture providers** and select **Add new**.
3. Select **CrowdStrike**.
4. Enter any name for the provider. This name will be used throughout the dashboard to reference this connection.
5. Enter the **Client ID** and **Client secret** you noted down above.
6. Enter your **Rest API URL**.
7. Enter your **Customer ID**.
8. Choose a **polling frequency** for how often Cloudflare Zero Trust should query CrowdStrike for information.
9. Select **Save**.

To ensure the values have been entered correctly, select **Test**.

### 3. Configure the posture check

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **WARP Client** > **Service provider checks**.
2. Select **Add new**.
3. Select **CrowdStrike**.
4. Configure a [Crowdstrike ZTA attribute](#crowdstrike-zta-data) and enter any name.
5. Select **Save**.

## Crowdstrike ZTA data

This information is gathered from the [CrowdStrike Zero Trust Assessment APIs](https://falcon.us-2.crowdstrike.com/documentation/156/zero-trust-assessment-apis).

| Selector      | Description          | Value    |
| ------------- | ---------------------|----------|
| OS            | OS signal score      | `1` to `100` |
| Overall       | Overall ZTA score    | `1` to `100` |
| Sensor config | Sensor signal score  | `1` to `100` |
| Version       | ZTA score version    | `2.1.0`      |
