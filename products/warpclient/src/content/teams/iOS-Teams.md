---
order: 4
---

# iOS Deployment

<Aside>

Before you get started please visit [iOS Mobile Client](/setting-up/iOS/) to review the system requirements and find a link to the App Store.

Once you are ready, choose how you are going to deploy the client in your organization:
* [Automated](#automated-install) (Jamf, Intune, SimpleMDM, etc.)
* [Manual Configuration](#manual-configuration) (End users manually configure client on their own device)

</Aside>

<div id="automated-install">

## Automated Install
---------------------
</div>

The Cloudflare WARP iOS client (Known in the store as 1.1.1.1: Faster Internet) allows for an automated install via tools like Jamf, Intune, SimpleMDM.

Accepted plist configuration values are as follows (for a description of each key and what it means, see [Deployment parameters](/teams/parameters/))

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

### Example Configuration in Jamf
Cloudflare WARP (Known in the store as 1.1.1.1: Faster Internet) is deployed in one step as part of Jamf. Below you will find the minimum required steps to deploy the client via Jamf.

#### Upload the package
1. Login to your jamfcloud.com account.
1. Navigate to **Devices**.
1. Click the **Mobile Device Apps**.
1. Click **+ New**.
1. Select "App store app or apps purchased in volume".
1. Click **Next**.
1. In the search box enter: 1.1.1.1: Faster Internet
1. Click **Next**.
1. Click **Add** in the row for the 1.1.1.1: Faster Internet by Cloudflare Inc.
    - [Click here](https://apps.apple.com/us/app/id1423538627) to verify it is the correct application.
1. Navigate to **Scope** and specify the devices in your organization that should receive the application.
1. Navigate to **App Configuration** and copy->paste the XML from above.
    - Note you must modify the default xml values to match your Cloudflare for Teams deployment.
1. Click **Save**.

Congratulations! Jamf is now configured to deploy the Cloudflare WARP client.

<div id="manual-configuration">

## Manual Configuration
---------------------
</div>

If you plan to direct your users to manually download and configure the Cloudflare WARP client application, they can do so from two places in the UI:

#### Manually configure a Gateway DoH Subdomain
If your organization uses Teams Gateway then you will need to instruct your users to configure the Gateway DoH Subdomain field. You can <a href="https://developers.cloudflare.com/gateway/connecting-to-gateway/with-client">click here to find this value</a> for your Teams Gateway configuration. Then complete the following steps:
1. Fine the **1.1.1.1** application and tap to launch.
1. Tap the **menu bar icon** (3 lines) in the upper right.
1. Tap **Advanced**.
1. Tap **Connection options**.
1. Tap **DNS settings**.
1. Enter a DoH Sub Domain and tap **Back** until you are back at the home screen.


#### Manually configure a Cloudflare for Teams device registration
If your organization uses Teams Access policies to control device registration, or is using the Gateway L7 Filtering and user or device specific Gateway policies, then you will need to instruct your users to login to Cloudflare for Teams.
1. Fine the **1.1.1.1** application and tap to launch.
1. Tap the **menu bar icon** (3 lines) in the upper right.
1. Tap **Account**.
1. Tap **Login with Cloudflare for Teams**.
1. Enter your auth domain (if your auth domain is https://example.cloudflareaccess.com you would enter **example**)
1. Complete authentication steps required by your organization.

