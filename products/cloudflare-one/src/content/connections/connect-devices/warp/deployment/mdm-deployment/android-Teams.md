---
order: 5
pcx-content-type: how-to
---

# Android

<Aside>

**Before you start**  

Visit the [requirements section](/connections/connect-devices/warp/download-warp) to review the system requirements for Android and to download the Android installer.

If you want to deploy the WARP client manually, refer to the [instructions for manual deployment](/connections/connect-devices/warp/deployment/manual-deployment).

</Aside>

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
See the [deployment parameters](/connections/connect-devices/warp/deployment/mdm-deployment/parameters) for a description of each value.