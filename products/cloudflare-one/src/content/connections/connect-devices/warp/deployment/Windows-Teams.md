---
order: 2
pcx-content-type: how-to
---

# Windows

<Aside>

**Before you start**  

Visit the [requirements section](/connections/connect-devices/warp/download-warp) to review the system requirements for Windows and to download the Windows installer.

Next, choose how you want to deploy the WARP Client in your organization:
* [Automated configuration](#automated-install-via-command-prompt) (Intune, Command Prompt)
* [Manual configuration](#manual-configuration), with end users manually configuring the client on their own device

</Aside>

## Automated configuration (Intune, Command Prompt)

The WARP Client for Windows allows for an automated install via tools like Intune, AD, or any script or management tool that can execute a `.msi` file.

* Example command line to **install** the client:

 ```
 Cloudflare_WARP_Release-x64.msi /quiet ORGANIZATION="exampleorg" SERVICE_MODE="warp" ENABLE="true" GATEWAY_UNIQUE_ID="fmxk762nrj" SUPPORT_URL="http://support.example.com"
 ```
 See the [deployment parameters](/connections/connect-devices/warp/deployment/parameters) for a description of each argument.

* Example command line to **uninstall** the client:

 ```
 msiexec /x Cloudflare_WARP_Release-x64.msi /quiet
 ```

### Example configuration with Microsoft Intune
Below are the minimum required steps to deploy Cloudflare WARP with Intune:

1. Login to your Microsoft Intune account.
1. Navigate to **Apps** > **All Apps**.
1. Click **+Add**.
1. As **App type**, select *Line-of-business app* from the drop-down menu.
1. Click **Select**.
1. Click **Select app package file** and upload the ```Cloudflare_WARP_Release-x64.msi``` installer you downloaded previously.
1. Click **OK**.
1. In the **Name** field, we recommend entering the version number of the package being uploaded.
1. In the **Publisher** field, we recommend entering `Cloudflare, Inc`.
1. In the **Command-line arguments** field enter a valid set of command line arguments as describe above
    - Example: `/quiet ORGANIZATION="exampleorg" SERVICE_MODE="warp" ENABLE="true" GATEWAY_UNIQUE_ID="fmxk762nrj" SUPPORT_URL="http://support.example.com"`
1. You don't need to fill other optional fields. Once you've entered all the necessary values, click **Next**. 
1. Add the users or groups who require Cloudflare WARP.
1. Click **Next**.
1. Review your configuration.
1. Click **Create**.

Intune is now configured to deploy the Cloudflare WARP Client.

## Manual configuration

If you plan to direct your users to manually download and configure the Cloudflare WARP Client application, they can do so in two ways, depending on your organization's Teams configuration:

* If your organization uses Gateway DNS filtering, users will need to configure a [DoH subdomain](/glossary#doh-subdomain).
* If your organization uses [Zero Trust policies](/policies/zero-trust) to control device registration, or Gateway L7 Filtering, users will need to [configure a Cloudflare for Teams device registration](#manually-configure-a-cloudflare-for-teams-device-registration).

### Manually configure a Gateway DoH subdomain
If your organization uses Gateway DNS filtering, you will need to instruct your users to configure the Gateway [DoH subdomain](/glossary#doh-subdomain) field.

Then ask your users to complete the following steps:

1. Click on the Cloudflare Logo in the System Tray.
1. Select the gear icon.
1. Next, click **Preferences**.
1. Select the **Connection** tab.
1. Enter a value for *Gateway DoH subdomain* (example: `fmxk762nrj`).
1. Click **Save**.

![Preferences UI in the connection tab with the Change button circled](../../../../static/documentation/connections/windows_GatewayButton.png)

### Manually configure a Cloudflare for Teams device registration
If your organization uses [Zero Trust policies](/policies/zero-trust) to control device registration, or is using the Gateway L7 Filtering and user or device-specific [Secure Web Gateway policies](/policies/filtering), your users will need to login to Cloudflare for Teams by following these instructions:

1. Click on the Cloudflare Logo in the System Tray.
1. Select the gear icon.
1. Next, click **Preferences**.
1. Select the **Account** tab.
1. Click **Login with Cloudflare for Teams**.
1. Enter your [team name](/glossary#team-name).
1. Complete the authentication steps required by your organization.

![Preferences UI in the Account tab with the Login to Teams button circled](../../../../static/documentation/connections/windows_TeamsButton.png)

## Remove the WARP client application

1. Navigate to Windows Settings (Windows Key + I).
1. Click **Apps**.
1. Click **App & Features**.
1. Scroll to find the Cloudflare WARP application and click **Uninstall**.