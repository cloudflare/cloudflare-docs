---
order: 0
pcx-content-type: how-to
---

# Managed deployment

Bigger organizations can deploy WARP automatically to their fleet of devices in a single operation. This can be done using [mobility management solutions](/connections/connect-devices/warp/deployment/mdm-deployment/partners) like Intune or JAMF, or by executing `.msi` file on desktop machines. 

Here is a list of generic instructions to deploy WARP on your organization's devices.

---

## Generic instructions for desktop deployment

The WARP client for Windows allows for an automated install via any management tool that can execute an `.msi` file.

### Windows

Before you deploy the WARP client to Windows devices, visit the [requirements section](/connections/connect-devices/warp/download-warp) to review the system requirements for Windows and to download the Windows installer. If you want to deploy the WARP client manually, refer to the [instructions for manual deployment](/connections/connect-devices/warp/deployment/manual-deployment).

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

#### Updating the configuration

The on-disk configuration of the Windows client can be changed at any time by modifying or replacing the contents of `C:\ProgramData\Cloudflare\mdm.xml`. Changes to this file are processed immediately by the WARP client.

The format of this file is as follows:

```xml
<dict>
  <key>organization</key>
  <string>yourorganization</string>
  <key>service_mode</key>
  <string>warp</string>
</dict>
```

### macOS

Before you deploy the WARP client to macOS devices, visit the [requirements section](/connections/connect-devices/warp/download-warp) to review the system requirements for macOS and to download the macOS installer.

If you want to deploy the WARP client manually, refer to the [instructions for manual deployment](/connections/connect-devices/warp/deployment/manual-deployment). The Cloudflare WARP macOS client allows for an automated install via tools like Jamf, Intune, Kandji, or JumpCloud or any script or management tool that can place a `com.cloudflare.warp.plist` file in `/Library/Managed Preferences` on a supported macOS device. Additionally this plist can be wrapped in a `.mobileconfig`.

Here is an example plist file with the accepted arguments: 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
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
</plist>
```

Here is an example `.mobileconfig` file with the accepted arguments:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
<key>PayloadContent</key>
<array/>
<key>PayloadDisplayName</key>
<string>Cloudflare WARP</string>
<key>PayloadIdentifier</key>
<string>cloudflare_warp</string>
<key>PayloadOrganization</key>
<string>Cloudflare, Ltd.</string>
<key>PayloadRemovalDisallowed</key>
<false/>
<key>PayloadType</key>
<string>Configuration</string>
<key>PayloadUUID</key>
<string>F5046847-2B1C-4DA0-A872-F6E040B1B20E</string>
<key>PayloadVersion</key>
<integer>1</integer>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>PayloadDisplayName</key>
            <string>Custom</string>
            <key>PayloadIdentifier</key>
            <string>com.cloudflare.warp</string>
            <key>PayloadOrganization</key>
            <string>Cloudflare Ltd.</string>
            <key>PayloadType</key>
            <string>com.apple.ManagedClient.preferences</string>
            <key>PayloadUUID</key>
            <string>C2575334-358E-4925-8B29-30B4348D31E3</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>PayloadEnabled</key>
            <true/>
            <key>PayloadContent</key>
            <dict>
                <key>com.cloudflare.warp</key>
                <dict>
                    <key>Forced</key>
                    <array>
                        <dict>
                            <key>mcx_preference_settings</key>
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
                        </dict>
                    </array>
                </dict>
            </dict>
        </dict>
    </array>
</dict>
</plist>

```

For a description of each argument and what it means, see [deployment parameters](/connections/connect-devices/warp/deployment/mdm-deployment/parameters).

[Click here to download](../../../../../static/documentation/connections/com.cloudflare.warp.plist) this example `plist`. If you plan to download the `plist` file and place it manually in `/Library/Managed Preferences`, convert the `plist` into into binary format first. To do that:

1. Open a Terminal window.
2. Run the following command:

 ```
 % plutil -convert binary1 com.cloudflare.warp.plist
 ```

[Click here to download](../../../../../static/documentation/connections/CloudflareWARP.mobileconfig) this example `.mobileconfig`. Before doing so, you may need to run `uuidgen` from your macOS Terminal. This will generate a value for `PayloadUUID`, which you can use to replace the default value used for `PayloadUUID` in the example above.

## Generic instructions for mobile deployment

### iOS

Before you deploy the WARP client to iOS devices, visit the [requirements section](/connections/connect-devices/warp/download-warp) to review the system requirements for iOS and to download the iOS installer.

If you want to deploy the WARP client manually, refer to the [instructions for manual deployment](/connections/connect-devices/warp/deployment/manual-deployment). The Cloudflare WARP iOS client, known in the App Store as [1.1.1.1: Faster Internet](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627), allows for an automated install via tools like Jamf, Intune, or SimpleMDM.

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

### Android

Before you deploy the WARP client to Android devices, visit the [requirements section](/connections/connect-devices/warp/download-warp) to review the system requirements for Android and to download the Android installer.

If you want to deploy the WARP client manually, refer to the [instructions for manual deployment](/connections/connect-devices/warp/deployment/manual-deployment). The Cloudflare WARP Android client (known in the Google Play store as [1.1.1.1: Faster & Safer Internet](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone&hl=en&gl=US)) allows for an automated install via tools like Intune, Google Endpoint Manager, and others.

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