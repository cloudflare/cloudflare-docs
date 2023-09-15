---
pcx_content_type: how-to
title: Microsoft Endpoint Manager
weight: 4
---

# Microsoft Endpoint Manager

{{<render file="posture/_available-for-warp-with-gateway.md">}}

Cloudflare Zero Trust can integrate with Microsoft Endpoint Manager and Intune to require that users connect to certain applications from managed devices. Our service-to-service posture check identifies devices based on their serial numbers.

## Prerequisites

Device posture with Microsoft Endpoint Manager requires:

- An Intune license
- Microsoft Endpoint Manager managing the device
- Cloudflare WARP client deployed on the device

## 1. Obtain Microsoft Graph settings

The following values are required:

- Client secret
- Application (client) ID
- Direct (tenant) ID

To retrieve those values:

1. Log in to your Microsoft Dashboard.
1. Go to **App Registrations** and select **New Registrations**.
1. Copy the `Application (client) ID` value to a safe place. This will be your Client ID.
1. Copy the `Directory (tenant) ID` value to a safe place. This will be your Customer ID.
1. Go to **Certificates & Secrets** and select **New client secret**.
1. Fill in a description and how long the secret should be valid.
1. After completing the form, immediately copy the resulting secret. This will be your Client Secret.
1. Go to **API Permissions** and select **Add permission**.
1. Select **Microsoft Graph**.
1. Select **Application permissions**.
1. Add `DeviceManagementManagedDevices.Read.All`.
1. If the permission status shows **Not granted**, select **Grant admin consent**.

## 2. Add Intune as a service provider

1. Go to **Settings** > **WARP Client**.
1. Scroll down to **Device posture providers** and select **Add new**.
1. Select **Microsoft Endpoint Manager**.
1. Give your provider a name. This name will be used throughout the dashboard to reference this connection.
1. Enter the **Client ID**, **Client secret** and **Customer ID** as you noted down above.
1. Select a **Polling frequency** for how often Cloudflare Zero Trust should query Microsoft Graph API for information.
1. Select **Save**.

{{<render file="/posture/_test-posture-provider.md">}}

## 3. Configure the posture check

{{<render file="posture/_configure-posture-check.md" withParameters="Microsoft Endpoint Manager">}}

## Device posture attributes

The Microsoft Endpoint Manager device posture check relies on information from the Microsoft Graph API. Refer to Microsoft's [ComplianceState](https://docs.microsoft.com/en-us/graph/api/resources/intune-devices-compliancestate?view=graph-rest-1.0) and [List managedDevices](https://docs.microsoft.com/en-us/graph/api/intune-devices-manageddevice-list?view=graph-rest-1.0) documentation for a list of properties returned by the API.

To learn more about how to control ComplianceState, refer to Microsoft's [compliance policies guide](https://docs.microsoft.com/en-us/mem/intune/protect/device-compliance-get-started).
