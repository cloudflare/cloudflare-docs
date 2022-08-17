---
pcx_content_type: how-to
title: Uptycs
weight: 4
---

# Uptycs

Device posture with Uptycs requires that the Uptycs agent and the Cloudflare WARP client are deployed on your devices. For this integration to function, our service-to-service posture check relies on the **serial_number** being the same in both clients. Follow the instructions below to set up the check.

## 1. Obtain Uptycs Settings

The following Uptycs values are needed to set up the Uptycs posture check:

- Client key
- Client Secret
- Customer ID

To obtain these values:

1. Open your Uptycs console.
1. Navigate to **Account Settings** > **API Key**.
1. Generate and download your `.json` file. This file will contain your **Client key**, **Client Secret** and **Customer ID**.

## 2. Add Uptycs as a service provider

1. Go to **Settings** > **WARP Client**.
1. Scroll down to **Device posture providers** and select **Add new**.
1. Select **Uptycs**.
1. Give your provider a name. This name will be used throughout the dashboard to reference this connection.
1. Enter the **Client ID**, **Client secret** and **Customer ID** as you noted down above.
1. Select a polling frequency for how often Cloudflare Zero Trust should query Uptycs for information.
1. Select **Save**.

To ensure the values have been entered correctly, select **Test**.

## 3. Configure the posture check

1. In the [Zero Trust Dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **WARP Client** > **Service provider checks**.
1. Select **Add new**.
1. Select the Uptycs provider.
1. Configure the _Score_ device posture check.
1. Select **Save**.

Next, [verify](/cloudflare-one/identity/devices/#2-verify-device-posture-checks) that the service provider posture check is returning the expected results.
