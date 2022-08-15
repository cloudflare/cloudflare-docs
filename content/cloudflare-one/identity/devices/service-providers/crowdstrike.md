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

## Configure the provider on the Zero Trust dashboard

1. Go to **Settings** > **Devices** > **Device posture providers** and click **Add new**.
1. Select **CrowdStrike**.
1. Give your provider a name. This name will be used throughout the dashboard to reference this connection.
1. Enter the Client ID and Client Secret you noted down above.
1. Enter your Rest API URL.
1. Enter your Customer ID.
1. Select a **polling frequency** for how often Cloudflare Zero Trust should query CrowdStrike for information.
1. Click **Save**.
1. Click **Test Provider** to ensure the values have been entered correctly.

## Configure the posture check

1. On the Zero Trust Dashboard, navigate to **Settings** > **WARP Client** > **Service provider checks**.
1. Click **Add new**.
1. Select the provider you created in the section above.
1. Enter the required fields
1. Click **Save**.

## Crowdstrike ZTA data

This information is gathered from the [CrowdStrike Zero Trust Assessment APIs](https://falcon.us-2.crowdstrike.com/documentation/156/zero-trust-assessment-apis).

| Selector      | Description          | Value    |
| ------------- | ---------------------|----------|
| OS            | OS signal score      | `1` to `100` |
| Overall       | Overall ZTA score    | `1` to `100` |
| Sensor config | Sensor signal score  | `1` to `100` |
| Version       | ZTA score version    | `2.1.0`      |