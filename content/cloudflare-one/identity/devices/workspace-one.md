---
pcx-content-type: how-to
hidden: true
title: Workspace ONE
weight: 4
---

# Workspace ONE

Device posture with Workspace ONE requires the Workspace ONE agent and the Cloudflare WARP client to be deployed on your devices. For this integration to function, our service-to-service posture check relies on the **serial\_number** being the same in both clients. Follow the instructions below to set up the posture check.

## Obtain Workspace ONE Settings

The following Workspace ONE values are needed to set up the Workspace ONE posture check:

*   ClientID
*   Client Secret
*   Region-Specific token URL
*   REST API URL

To retrieve those values:

1.  Log in to your Workspace ONE dashboard.
2.  Navigate to **Groups & Settings** > **Configurations**.
3.  Enter `OAuth` in the search bar labeled **Enter a name or category**.
4.  Select **OAuth Client Management** in the results. The OAuth Client Management screen displays.
5.  Click **Add**.
6.  Enter values for the **Name**, **Description**, **Organization Group**, and **Role**.
7.  Ensure that the **Status** is **Enabled**.
8.  Click **Save**.
9.  Copy the Client ID and Client Secret to a safe place.
10. Retrieve the correct Region-Specific Token URL from the [VMware documentation](https://docs.vmware.com/en/VMware-Workspace-ONE-UEM/services/UEM_ConsoleBasics/GUID-BF20C949-5065-4DCF-889D-1E0151016B5A.html). Copy the Region-specific token URL to a safe place.
11. Obtain your REST API URL by going to the WS1 dashboard and navigating to **Groups & Settings** > **All Settings** > **System** > **Advance** > **Site URLs** > **REST API URL**.

## Configure the provider on the Zero Trust Dashboard

1.  Go to **Settings** > **Devices** > **Device posture providers** and click **Add new**.
2.  Select Workspace ONE.
3.  Give your provider a name. This name will be used throughout the dashboard to reference this connection.
4.  Enter the Client ID and Client Secret you noted down above.
5.  Select a **polling frequency** for how often Cloudflare Zero Trust should query Workspace ONE for information.
6.  Enter the Region-specific token URL and REST API URL you noted down above.
7.  Click **Save**.
8.  Click **Test Provider** to ensure the values have been entered correctly.

## Configure compliance settings

Workspace ONE posture checks work with the Compliance flags in Workspace ONE. All compliance tests must pass for the device to be considered compliant.
