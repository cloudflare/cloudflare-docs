---
order: 4
pcx-content-type: how-to
---

# iOS

<Aside>

**Before you start**  

Visit the [requirements section](/connections/connect-devices/warp/download-warp) to review the system requirements for iOS and to download the iOS installer.

If you want to deploy the WARP client manually, refer to the [instructions for manual deployment](/connections/connect-devices/warp/deployment/manual-deployment).

</Aside>

The Cloudflare WARP iOS client, known in the App Store as [1.1.1.1: Faster Internet](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627), allows for an automated install via tools like Jamf, Intune, or SimpleMDM.

To proceed with the installation, here is an example of the XML code you will need, with the accepted arguments: 

```xml
<dict>
    <key>organization</key>
    <string>yourorganization</string>
    <key>auto_connect</key> 
    <integer>1</integer>
    <key>switch_locked</key> 
    <false />
    <key>service_mode</key>
    <string>warp</string>
    <key>support_url</key>
    <string>https://support.example.com</string>
</dict>
```
For a description of each argument and what it means, see [deployment parameters](/connections/connect-devices/warp/deployment/mdm-deployment/parameters).

### Example Configuration in Jamf
Follow these steps to deploy the WARP Client via Jamf:

#### Upload the package
1. Login to your `jamfcloud.com` account.
1. Navigate to **Devices**.
1. Click the **Mobile Device Apps**.
1. Click **+ New**.
1. Select *App store app or apps purchased in volume*.
1. Click **Next**.
1. In the search box, enter: *1.1.1.1: Faster Internet*.
1. Click **Next**.
1. Click **Add** in the row for *1.1.1.1: Faster Internet by Cloudflare Inc.*. To verify it's the correct application, click on this [link](https://apps.apple.com/us/app/id1423538627).
1. Navigate to **Scope**.
1. Specify the devices in your organization that should receive the application.
1. Navigate to **App Configuration** and copypaste the XML from above.
1. Make sure you modify the default XML values to match your Cloudflare for Teams deployment.
1. Click **Save**.

Jamf is now configured to deploy the Cloudflare WARP client.