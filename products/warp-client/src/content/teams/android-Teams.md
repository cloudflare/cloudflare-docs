---
order: 5
---

# Android Deployment

<Aside>

Before you get started please visit [Android Mobile Client](/setting-up/android/) to review the system requirements and find a link to the App Store.

Once you are ready, choose how you are going to deploy the client in your organization:
* [Automated](#automated-install) (Intune, Endpoint Manager, etc.)
* [Manual Configuration](#manual-configuration) (End users manually configure client on their own device)

</Aside>

<div id="automated-install">

## Automated Install
---------------------
</div>

The Cloudflare WARP Android client (Known in the store as 1.1.1.1: Faster & Safer Internet) allows for an automated install via tools like Intune, Google Endpoint Manager and others.

Accepted configuration values are as follows (for a description of each key and what it means, see [Deployment parameters](/teams/parameters/))

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

Cloudflare WARP (Known in the store as 1.1.1.1: Faster & Safer Internet) is deployed

<div id="manual-configuration">

## Manual Configuration
---------------------
</div>

If you plan to direct your users to manually download and configure the Cloudflare WARP Client application, they can do so from two places in the UI:

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

