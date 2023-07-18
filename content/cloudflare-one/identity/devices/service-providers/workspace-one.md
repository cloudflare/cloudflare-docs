---
pcx_content_type: how-to
title: Workspace ONE
weight: 4
---

# Workspace ONE

{{<render file="posture/_available-for-warp-with-gateway.md">}}

Device posture with Workspace ONE requires the Workspace ONE agent and the Cloudflare WARP client to be deployed on your devices. For this integration to function, our service-to-service posture check relies on the **serial_number** being the same in both clients. Follow the instructions below to set up the posture check.

## 1. Obtain Workspace ONE Settings

The following Workspace ONE values are needed to set up the Workspace ONE posture check:

- ClientID
- Client Secret
- REST API URL
- Region-Specific token URL

To retrieve those values:

1. Log in to your Workspace ONE dashboard.
1. Go to **Groups & Settings** > **Configurations**.
1. Enter `OAuth` in the search bar labeled **Enter a name or category**.
1. Select **OAuth Client Management** in the results. The OAuth Client Management screen displays.
1. Select **Add**.
1. Enter values for the **Name**, **Description**, **Organization Group**, and **Role**.
1. Ensure that the **Status** is **Enabled**.
1. Select **Save**.
1. Copy the **Client ID** and **Client Secret** to a safe place.
1. To obtain your REST API URL, gp tp **Groups & Settings** > **All Settings** > **System** > **Advance** > **Site URLs** > **REST API URL**.
1. Retrieve the Region-Specific Token URL from Workspace ONE and copy it to a safe place.

## 2. Add Workspace ONE as a service provider

1. Go to **Settings** > **Devices** > **Device posture providers** and click **Add new**.
1. Select **Workspace ONE**.
1. Give your provider a name. This name will be used throughout the dashboard to reference this connection.
1. Enter the **Client ID** and **Client secret** you noted down above.
1. Select a **Polling frequency** for how often Cloudflare Zero Trust should query Workspace ONE for information.
1. Enter the **Region-specific token URL** and **REST API URL** you noted down above.
1. Select **Save**.

{{<render file="/posture/_test-posture-provider.md">}}

## 3. Configure the posture check

{{<render file="posture/_configure-posture-check.md" withParameters="Workspace ONE">}}

## Device posture attributes

Workspace ONE posture checks work with the [Compliance flags](https://docs.vmware.com/en/VMware-Workspace-ONE-UEM/services/UEM_Managing_Devices/GUID-CompliancePolicies.html) in Workspace ONE. All compliance tests must pass for the device to be considered compliant.
