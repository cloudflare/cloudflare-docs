---
pcx-content-type: how-to
title: Microsoft
weight: 4
hidden: true
---

# Microsoft Graph

Device posture with Microsoft Graph and Intune requires an Intune license, the device to be managed by Microsoft Endpoint Management and the Cloudflare WARP client to be deployed on your devices. For this integration to function, our service-to-service posture check relies on the **serial_number** being the same in both clients. Follow the instructions below to set up he integration.

## Obtain Microsoft Graph Settings

The following values are required:

- TBD

To retrieve those values:

1.  TBD

## Configure the provider on the Zero Trust dashboard

1.  Go to **Settings** > **Devices** > **Device posture providers** and click **Add new**.
1.  Select **Microsoft**.
1.  Give your provider a name. This name will be used throughout the dashboard to reference this connection.
1.  TBD

## What is checked

This check relies on information from the Microsoft Graph API. Please reference Microsoft's [ComplianceState](https://docs.microsoft.com/en-us/graph/api/resources/intune-devices-compliancestate?view=graph-rest-1.0) and [windowsDefenderScanActionResult](https://docs.microsoft.com/en-us/graph/api/resources/intune-devices-windowsdefenderscanactionresult?view=graph-rest-1.0) documentation for more information on what each field means.
