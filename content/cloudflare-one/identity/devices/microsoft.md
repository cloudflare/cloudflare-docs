---
pcx-content-type: how-to
title: Microsoft Intune
weight: 4
---

# Microsoft Intune

Device posture with Microsoft Intune requires an Intune license, the device to be managed by Microsoft Endpoint Management and the Cloudflare WARP client to be deployed on your devices. For this integration to function, our service-to-service posture check relies on the **serialnumber** being the same in both clients. Follow the instructions below to set up he integration.

## Obtain Microsoft Graph Settings

The following values are required:

- Client secret
- Application (client) ID
- Direct (tenant) ID

To retrieve those values:

1.  Login to your Microsoft Dashboard.
1.  Go to **App Registratins** and click **New Registrations**.
1.  Copy the `Application (client) ID` value to a safe place. This will be your Client ID.
1.  Copy the `Directory (tenant) ID` value to a safe place. This will be your Customer ID.
1.  Go to **Certificates & Secrets** and click **New client secret** and complete the form.
1.  Immedietly copy the value. This will be your Client secret.
1.  Go to **API Permissions** and click **Add permission**
1.  Select **Application permissions** and search for `DeviceManagementManagedDevices` and select the `Read` permission.

## Configure the provider on the Zero Trust dashboard

1.  Go to **Settings** > **Devices** > **Device posture providers** and click **Add new**.
1.  Select **Intune**.
1.  Give your provider a name. This name will be used throughout the dashboard to reference this connection.
1.  Enter the Client ID, Client Secret and Customer ID as you noted down above.
1.  Select a polling frequency for how often Cloudflare Zero Trust should query Microsoft Graph API for information.
1.  Click Save.
1.  Click Test Provider to ensure the values have been entered correctly.

## What is checked

This check relies on information from the Microsoft Graph API. Please reference Microsoft's [ComplianceState](https://docs.microsoft.com/en-us/graph/api/resources/intune-devices-compliancestate?view=graph-rest-1.0) and [List managedDevices](https://docs.microsoft.com/en-us/graph/api/intune-devices-manageddevice-list?view=graph-rest-1.0) documentation for the source of this information.
