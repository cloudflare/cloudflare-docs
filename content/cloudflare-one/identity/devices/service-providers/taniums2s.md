---
pcx_content_type: how-to
title: Tanium
weight: 4
layout: single
---

# Tanium

Service to Service Device posture with Tanium requires the Tanium agent and the Cloudflare WARP client to be deployed on your devices and differs from the previous Tanium integration. This integration works with either Tanium Cloud or on premise installations of Tanium.

## Set up Tanium as a service provider

### 1. Get Tanium settings

The following Tanium values are needed to set up the CrowdStrike posture check:

- Client Secret
- Rest API URL

To retrieve those values:

1. Login to your Tanium instance.
2. Go to **Administration > API Tokens**.
3. Select **New API Token**.
4. Set **Expire in days** to an approtiate value for your organization (note that when this token expires, all device posture results will begin to fail unless updated).
5. Set **Trusted IP addresses** to `0.0.0.0/0`.
6. Select **Save**.
7. Copy the **Client Secret** and **API URL** to a safe place.


### 2. Add Tanium as a service provider

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **WARP Client**.
2. Scroll down to **Device posture providers** and select **Add new**.
3. Select **Tanium**.
4. Enter any name for the provider. This name will be used throughout the dashboard to reference this connection.
5. Enter the **Client secret** and **Rest API URL** you noted down above.
6. Choose a **polling frequency** for how often Cloudflare Zero Trust should query Tanium for information.
9. Select **Save**.

To ensure the values have been entered correctly, select **Test**.

### 3. Configure the posture check

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **WARP Client** > **Service provider checks**.
2. Select **Add new**.
3. Select the Tanium provider you created above.
4. Enter any name for the check. This name will be used when created Access or Gateway policies.
5. Configure the check.
7. Select **Save**.

Next, [verify](/cloudflare-one/identity/devices/#2-verify-device-posture-checks) that the service provider posture check is returning the expected results.

## Tanium device posture attributes

Device posture relies on the **totalScore** field that is part of the EndpointRisk assessment of a device. Please refer to the [Taniuam documentation  for EndpointRisk](https://developer.tanium.com/site/global/apis/graphql/spectaql/index.gsp#definition-EndpointRisk) for more information.
