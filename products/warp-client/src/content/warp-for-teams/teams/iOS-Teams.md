---
order: 4
---

# iOS

<Aside>

**Before you start**  

Visit the [Requirements section](/requirements) to review the system requirements for iOS and to download the iOS installer.

Next, choose how you want to deploy the WARP Client in your organization:
* [Automated configuration](#automated-configuration) via command prompt
* [Manual configuration](#manual-configuration), with end users manually configuring the client on their own device

</Aside>

## Automated configuration

The Cloudflare WARP iOS client, known in the App Store as [1.1.1.1: Faster Internet](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627), allows for an automated install via tools like Jamf, Intune, or SimpleMDM.

To proceed with the installation, here is an example of the XML code you will need, with the accepted arguments: 

```xml
<key>organization</key>
<string>yourorganization</string>
<key>enable</key>
<true />
<key>gateway_unique_id</key>
<string>your_gateway_doh_subdomain</string>
<key>service_mode</key>
<string>warp</string>
<key>support_url</key>
<string>https://support.example.com</string>
```
For a description of each argument and what it means, see [deployment parameters](/warp-for-teams/teams#parameters).

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

Jamf is now configured to deploy the Cloudflare WARP Client.

## Manual Configuration

If you plan to direct your users to manually download and configure the Cloudflare WARP Client application, they can do so in two ways, depending on your organization's Teams configuration:
* If your organization uses Gateway DNS filtering, users will need to [configure a Gateway DoH Subdomain](#manually-configure-a-gateway-doh-subdomain).
* If your organization uses Access policies to control device registration, or Gateway L7 Filtering, users will need to [configure a Cloudflare for Teams device registration](#manually-configure-a-cloudflare-for-teams-device-registration).

### Manually configure a Gateway DoH Subdomain
If your organization uses Gateway DNS filtering, you will need to instruct your users to configure the Gateway DoH Subdomain field. Follow [these instructions](https://developers.cloudflare.com/gateway/getting-started/troubleshooting-policies/#find-a-location-doh-subdomain) to find this value for your Teams configuration.

Then ask your users to complete the following steps:

1. Find the **1.1.1.1** application and tap to launch.
1. Tap the **menu bar icon** (3 lines) in the upper right corner.
1. Tap **Advanced**.
1. Tap **Connection options**.
1. Tap **DNS settings**.
1. Enter the DoH Sub Domain and tap **Back** until you are back at the home screen.

### Manually configure a Cloudflare for Teams device registration
If your organization uses Teams Access policies to control device registration, or is using the Gateway L7 Filtering and user or device specific Gateway policies, your users will need to login to Cloudflare for Teams by following these instructions:

1. Find the **1.1.1.1** application and tap to launch.
1. Tap the **menu bar icon** (3 lines) in the upper right.
1. Tap **Account**.
1. Tap **Login with Cloudflare for Teams**.
1. Enter your organization name (if your auth domain were `https://example.cloudflareaccess.com`, you would enter `example`).
1. Complete the authentication steps required by your organization.
