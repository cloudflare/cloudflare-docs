---
pcx_content_type: how-to
title: Switch between Zero Trust organizations
weight: 3
---

# Switch between Zero Trust organizations

{{<details header="Feature availability">}}

| [WARP modes](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| -- | -- |
| All modes | All plans  |

| System   | Availability | Minimum WARP version |
| ---------| -------------| ---------------------|
| Windows  | ✅           | 2024.1.159.0         |
| macOS    | ✅           | 2024.1.160.0         |
| Linux    | ❌           |       |
| iOS      | ❌           |       |
| Android  | ✅           | 1.4   |
| ChromeOS | ✅           | 1.4   |

{{</details>}}

In Cloudflare WARP, users can switch between multiple Zero Trust organizations (or other [MDM parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/)) that administrators specify in an MDM file. Common use cases include:

- Allow IT security staff to switch between test and production environments.
- Allow Managed Service Providers to support multiple customer accounts.
- Allow users to switch between the default WARP ingress IPs and the [Cloudflare China ingress IPs](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/#override_warp_endpoint).

## MDM file format

To enable multiple organizations, administrators need to modify their [MDM file](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/) to take an array of configurations.  Each configuration must include a `display_name` parameter that will be visible to users in the WARP client GUI. Because display names are listed in the same order as they appear in the MDM file, we recommend putting the most used configurations at the top of the file. When a user opens the WARP client for the first time, they will be prompted to log into the first configuration in the list.

An MDM file supports a maximum of 25 configurations. The following example includes three configurations.

### plist file

```xml
<plist version="1.0">
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
</plist>
```

### mobileconfig file

```xml
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>PayloadDisplayName</key>
            <string>Warp Configuration</string>
            <key>PayloadIdentifier</key>
            <string>com.cloudflare.warp.CB8B22D4-50E1-48E8-8874-A7594627013A</string>
            <key>PayloadOrganization</key>
            <string>Cloudflare Ltd.</string>
            <key>PayloadType</key>
            <string>com.cloudflare.warp</string>
            <key>PayloadUUID</key>
            <string>CB8B22D4-50E1-48E8-8874-A7594627013A</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>configs</key>
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
        </dict>
    </array>
    <key>PayloadDisplayName</key>
    <string>Cloudflare WARP</string>
    <key>PayloadIdentifier</key>
    <string>cloudflare_warp</string>
    <key>PayloadOrganization</key>
    <string>Cloudflare, Ltd.</string>
    <key>PayloadRemovalDisallowed</key>
    <false/>
    <key>PayloadScope</key>
    <string>System</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>2B7763B8-64F6-41EB-AA5E-7761651B8131</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>
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
