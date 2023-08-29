---
pcx_content_type: how-to
title: Kolide
weight: 4
layout: single
---

# Kolide

{{<render file="posture/_available-for-warp-with-gateway.md">}}

Device posture with Kolide requires the Kolide agent and the Cloudflare WARP client to be deployed on your devices. Our service-to-service posture check identifies devices based on their serial numbers.

## Set up Kolide as a service provider

### 1. Create a Client Secret in Kolide

1. Log in to your Kolide dashboard.
2. Select your profile and go to **Settings** > **Developers**.
3. Select **Create New Key**.
4. Enter a **Key Name** and select **Save**.
5. Copy the **Secret token** to a safe place. This will be your Client Secret.

### 2. Add Kolide as a service provider

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
2. Scroll down to **Device posture providers** and select **Add new**.
3. Select **Kolide**.
4. Enter any name for the provider. This name will be used throughout the dashboard to reference this connection.
5. Enter the **Client secret** you noted down above.
6. Choose a **Polling frequency** for how often Cloudflare Zero Trust should query Kolide for information.
7. Select **Save**.

{{<render file="posture/_test-posture-provider.md">}}

### 3. Configure the posture check

{{<render file="posture/_configure-posture-check.md" withParameters="Kolide">}}

## Device posture attributes

Device posture data is gathered from the [Kolide K2 API](https://kolidek2.readme.io/reference/get_issues).

| Selector      | Description         |
| ------------- | ------------------- |
| Issue count   | Total number of issues detected on the device |
