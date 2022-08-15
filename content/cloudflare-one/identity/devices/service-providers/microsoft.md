---
pcx_content_type: how-to
title: Microsoft Endpoint Manager
weight: 4
---

# Microsoft Endpoint Manager

Cloudflare Zero Trust can integrate with Microsoft Endpoint Manager and Intune to require that users connect to certain applications from managed devices. Our service-to-service posture check identifies devices based on their serial numbers.

## Prerequisites

Device posture with Microsoft Endpoint Manager requires:

- An Intune license
- Microsoft Endpoint Manager managing the device
- Cloudflare WARP client deployed on the device

## Obtain Microsoft Graph settings

The following values are required:

- Client secret
- Application (client) ID
- Direct (tenant) ID

To retrieve those values:

1. Log in to your Microsoft Dashboard.
1. Go to **App Registrations** and click **New Registrations**.
1. Copy the `Application (client) ID` value to a safe place. This will be your Client ID.
1. Copy the `Directory (tenant) ID` value to a safe place. This will be your Customer ID.
1. Go to **Certificates & Secrets** and click **New client secret**.
1. Fill in a description and how long the secret should be valid.
1. After completing the form, immediately copy the resulting secret. This will be your Client Secret.
1. Go to **API Permissions** and click **Add permission**.
1. Select **Application permissions**.
1. Search for `DeviceManagementManagedDevices` and select the `Read` permission.

## Set up Intune on the Zero Trust dashboard

1. Go to **Settings** > **Devices** > **Device posture providers** and click **Add new**.
1. Select **Intune**.
1. Give your provider a name. This name will be used throughout the dashboard to reference this connection.
1. Enter the Client ID, Client Secret and Customer ID as you noted down above.
1. Select a polling frequency for how often Cloudflare Zero Trust should query Microsoft Graph API for information.
1. Click **Save**.
1. Click **Test Provider** to ensure the values have been entered correctly.

## Configure the posture check

1.  On the Zero Trust Dashboard, navigate to **Settings** > **WARP Client** > **Service provider checks**.
1.  Click **Add new**.
1.  Select the provider you created in the section above.
1.  Enter the required fields
1.  Click **Save**.

## Additional Resources

The Microsoft Endpoint Manager device posture check relies on information from the Microsoft Graph API. Refer to Microsoft's [ComplianceState](https://docs.microsoft.com/en-us/graph/api/resources/intune-devices-compliancestate?view=graph-rest-1.0) and [List managedDevices](https://docs.microsoft.com/en-us/graph/api/intune-devices-manageddevice-list?view=graph-rest-1.0) documentation for a list of properties returned by the API.

To learn more about how to control ComplianceState, refer to Microsoft's [compliance policies guide](https://docs.microsoft.com/en-us/mem/intune/protect/device-compliance-get-started).
