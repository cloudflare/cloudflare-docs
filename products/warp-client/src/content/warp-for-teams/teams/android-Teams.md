---
order: 5
---

# Android

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

<Aside>

**Before you start**  

Visit the [Requirements section](/requirements) to review the system requirements for Android and to download the Android installer.

Next, choose how you want to deploy the WARP Client in your organization:
* [Automated configuration](#automated-configuration) via command prompt
* [Manual configuration](#manual-configuration), with end users manually configuring the client on their own device

</Aside>

## Automated configuration

The Cloudflare WARP Android client (known in the Google Play store as [1.1.1.1: Faster & Safer Internet](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone&hl=en&gl=US)) allows for an automated install via tools like Intune, Google Endpoint Manager, and others.

Accepted configuration values are as follows:

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
See the [deployment parameters](/warp-for-teams/teams#parameters) for a description of each value.

Cloudflare WARP (known in the Google Play store as [1.1.1.1: Faster & Safer Internet](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone&hl=en&gl=US)) is deployed

## Manual configuration

If you plan to direct your users to manually download and configure the Cloudflare WARP Client application, they can do so in two ways, depending on your organization's Teams configuration:
* If your organization uses Gateway DNS filtering, users will need to [configure a Gateway DoH Subdomain](#manually-configure-a-gateway-doh-subdomain).
* If your organization uses Access policies to control device registration, or Gateway L7 Filtering, users will need to [configure a Cloudflare for Teams device registration](#manually-configure-a-cloudflare-for-teams-device-registration).

### Manually configure a Gateway DoH Subdomain
If your organization uses Gateway DNS filtering, you will need to instruct your users to configure the Gateway DoH Subdomain field. Follow [these instructions](https://developers.cloudflare.com/gateway/getting-started/troubleshooting-policies/#find-a-location-doh-subdomain) to find this value for your Teams configuration.

Then ask your users to complete the following steps:

1. Fine the **1.1.1.1** application and tap to launch.
1. Tap the **menu bar icon** (3 lines) in the upper right.
1. Tap **Advanced**.
1. Tap **Connection options**.
1. Tap **DNS settings**.
1. Enter a DoH Sub Domain and tap **Back** until you are back at the home screen.

### Manually configure a Cloudflare for Teams device registration
If your organization uses Teams Access policies to control device registration, or is using the Gateway L7 Filtering and user or device specific Gateway policies, your users will need to login to Cloudflare for Teams by following these instructions:

1. Fine the **1.1.1.1** application and tap to launch.
1. Tap the **menu bar icon** (3 lines) in the upper right.
1. Tap **Account**.
1. Tap **Login with Cloudflare for Teams**.
1. Enter your auth domain (if your auth domain is https://example.cloudflareaccess.com you would enter **example**)
1. Complete authentication steps required by your organization.
