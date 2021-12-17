---
order: 3
pcx-content-type: how-to
hidden: true
---
 
# Workspace ONE
Posture with Workspace ONE requires that the Workspace ONE agent and the Cloudflare WARP client are deployed on your devices. Our service-to-service posture check relies on the **serial_number** being the same in both clients for this integration to function.


## Obtain Workspace ONE Settings
To successfully set up the Workspace ONE posture check, you need to obtain the following Workspace ONE values:
- ClientID
- Client Secret
- Region-Specific token URL
- REST API URL

To obtain those values:

1. Log in to your Workspace ONE dashboard.
1. Navigate to **Groups & Settings > Configurations.**
1. Enter "OAuth" in the search bar labeled **Enter a name or category**.
1. Select **OAuth Client Management** that appears in the results. The OAuth Client Management screen displays.
1. Select the **Add** button.
1. Enter values for the **Name**, **Description**, **Organization Group**, and **Role**.
1. Ensure that the **Status** is **Enabled**.
1. Select **Save**.
1. Copy the `Client ID` and `Client Secret` to a safe place. 
1. Retrieve the correct **Region-Specific Token URL** from here: https://docs.vmware.com/en/VMware-Workspace-ONE-UEM/services/UEM_ConsoleBasics/GUID-BF20C949-5065-4DCF-889D-1E0151016B5A.html. Copy the `Region-specific token URL` to a safe place.
1. Obtain your `REST API URL` by going to the WS1 dashboard and navigating to Groups & Settings > All Settings > System > Advance > Site URLs > REST API URL.

## Configure provider on the Teams dashboard
1. Give your provider a name. This name will be used throughout the dashboard to reference this connection.
1. Enter in the `Client ID` and `Client Secret` you noted down above
1. Select a **polling frequency** for how often teams should query Workspace ONE for information.
1. Enter the `Region-specific token URL` and `REST API URL` you noted down above.
1. Select **Save**.
1. Select the **Test Provider** button to ensure the values have been entered correctly.

## Configure Compliance Settings
Workspace ONE integrated posture checks work with the Compliance flags in Workspace ONE. All compliance tests must pass for the device to be considered compliant.
