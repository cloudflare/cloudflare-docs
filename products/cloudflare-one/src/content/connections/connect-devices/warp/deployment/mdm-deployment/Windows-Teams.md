---
order: 2
pcx-content-type: how-to
---

# Windows

<Aside>

**Before you start**  

Visit the [requirements section](/connections/connect-devices/warp/download-warp) to review the system requirements for Windows and to download the Windows installer.

If you want to deploy the WARP client manually, refer to the [instructions for manual deployment](/connections/connect-devices/warp/deployment/manual-deployment).

</Aside>

The WARP Client for Windows allows for an automated install via tools like Intune, AD, or any script or management tool that can execute a `.msi` file.

* Example command line to **install** the client:

 ```
 Cloudflare_WARP_Release-x64.msi /quiet ORGANIZATION="exampleorg" SERVICE_MODE="warp" GATEWAY_UNIQUE_ID="fmxk762nrj" SUPPORT_URL="http://support.example.com"
 ```
 See the [deployment parameters](/connections/connect-devices/warp/deployment/mdm-deployment/parameters) for a description of each argument.

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
    - Example: `/quiet ORGANIZATION="exampleorg" SERVICE_MODE="warp" GATEWAY_UNIQUE_ID="fmxk762nrj" SUPPORT_URL="http://support.example.com"`
1. You don't need to fill other optional fields. Once you've entered all the necessary values, click **Next**. 
1. Add the users or groups who require Cloudflare WARP.
1. Click **Next**.
1. Review your configuration.
1. Click **Create**.

Intune is now configured to deploy the Cloudflare WARP Client