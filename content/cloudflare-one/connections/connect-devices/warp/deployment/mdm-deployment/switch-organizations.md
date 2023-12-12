---
pcx_content_type: how-to
title: Switch between Zero Trust organizations
layout: single
weight: 3
---

# Switch between Zero Trust organizations

In Cloudflare WARP, users can quickly switch between multiple Zero Trust organizations (or other [MDM parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/)) that administrators specify in an MDM file. Common use cases include:

- Allow IT security staff to switch between test and production environments.
- Allow Managed Service Providers to support multiple customer accounts.
- Allow users to switch between the default WARP ingress IPs and the [Cloudflare China ingress IPs](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/#override_warp_endpoint).

## MDM file format

To enable multiple organizations, administrators need to modify their [MDM file](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/) to take an array. Each element of the array corresponds to a configuration that will display to users in the WARP client GUI. Because configuration names are listed in the same order as they appear in the MDM file, we recommend putting the most used configurations at the top of the file.

An MDM file supports a maximum of five configurations. Here is an example MDM file with three configurations:

```xml
<array>
<dict>
    <key>organization</key>
    <string>mycompany</string>
    <key>display_name</key>
    <string>Global Anycast network</string>
</dict>
<dict>
    <key>organization</key>
    <string>mycompany</string>
    <key>override_warp_endpoint</key>
    <string>162.159.204.1:2408</string>
    <key>display_name</key>
    <string>Cloudflare China network</string>
</dict>
<dict>
    <key>organization</key>
    <string>test-org</string>
    <key>display_name</key>
    <string>Test environment</string>
</dict>
</array>
```

## Switch organizations in WARP

When a user opens the WARP client for the first time, if the MDM file contains multiple configurations they will be asked to choose an organization to log into. Users can switch between these organizations at any time without needing to log out of the old organization.

To switch to a different organization:

1. Open the WARP client on your device.

2. Select the gear icon.

3. Select **Switch configurations**. The menu will show the organizations that the admin has configured for your device.

4. Select the organization that you want to connect to.

{{<Aside type="note">}}
Only admins can [add additional organizations](#mdm-file-format) to the WARP GUI. To connect to an organization that is not displayed in the GUI, go to **Preferences** > **Account** to manually log out of the old organization and log into the new organization.
{{</Aside>}}

5. If prompted, complete the authentication steps required for the new organization.
