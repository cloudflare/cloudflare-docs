---
pcx_content_type: how-to
title: Switch between Zero Trust organizations
weight: 3
---

{{<heading-pill style="beta">}} Switch between Zero Trust organizations {{</heading-pill>}}

In Cloudflare WARP, users can switch between multiple Zero Trust organizations (or other [MDM parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/)) that administrators specify in an MDM file. Common use cases include:

- Allow IT security staff to switch between test and production environments.
- Allow Managed Service Providers to support multiple customer accounts.
- Allow users to switch between the default WARP ingress IPs and the [Cloudflare China ingress IPs](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/#override_warp_endpoint).

## MDM file format

To enable multiple organizations, administrators need to modify their [MDM file](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/) to take an array of configurations.  Each configuration must include a `display_name` parameter that will be visible to users in the WARP client GUI. Because display names are listed in the same order as they appear in the MDM file, we recommend putting the most used configurations at the top of the file. When a user opens the WARP client for the first time, they will be prompted to log into the first configuration in the list.

An MDM file supports a maximum of 25 configurations. The following is an example MDM file with three configurations:

```xml
<array>
  <dict>
      <key>organization</key>
      <string>mycompany</string>
      <key>display_name</key>
      <string>Production environment</string>
  </dict>
  <dict>
      <key>organization</key>
      <string>mycompany</string>
      <key>override_warp_endpoint</key>
      <string>203.0.113.0:500</string>
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

{{<tabs labels="macOS, Windows, and Linux | iOS and Android">}}
{{<tab label="macos, windows, and linux" no-code="true">}}

{{<render file="warp/_switch-orgs.md" withParameters="Select the gear icon.;;**Preferences** > **Account**" >}}

{{</tab>}}
{{<tab label="ios and android" no-code="true">}}

{{<render file="warp/_switch-orgs.md" withParameters="Go to **Settings** > **Advanced**.;; **Settings** > **Account**" >}}

{{</tab>}}
{{</tabs>}}
