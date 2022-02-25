---
pcx-content-type: how-to
title: Intune
weight: 2
---

# Intune

## Windows

1.  Log in to your Microsoft Intune account.
2.  Navigate to **Apps** > **All Apps**.
3.  Click **+Add**.
4.  In **App type**, select *Line-of-business app* from the drop-down menu.
5.  Click **Select**.
6.  Click **Select app package file** and upload the `Cloudflare_WARP_Release-x64.msi` installer you downloaded previously.
7.  Click **OK**.
8.  In the **Name** field, we recommend entering the version number of the package being uploaded.
9.  In the **Publisher** field, we recommend entering `Cloudflare, Inc`.
10. In the **Command-line arguments** field, enter a valid set of command-line arguments as described above.
    *   Example: `/quiet ORGANIZATION="exampleorg" SERVICE_MODE="warp" GATEWAY_UNIQUE_ID="fmxk762nrj" SUPPORT_URL="http://support.example.com"`
11. You do not need to fill other optional fields. Once you have entered all the necessary values, click **Next**.
12. Add the users or groups who require Cloudflare WARP.
13. Click **Next**.
14. Review your configuration.
15. Click **Create**.

Intune is now configured to deploy the WARP client.

## macOS

The Cloudflare WARP client allows for an automated install via tools like Jamf, Intune, Kandji, or JumpCloud or any script or management tool that can place a `com.cloudflare.warp.plist` file in `/Library/Managed Preferences` on a supported macOS device. Additionally, this `plist` can be wrapped in a `.mobileconfig`.

Here is an example `plist` file with the accepted arguments:

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

For a description of each argument and what it means, see [deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/).

[Click here to download](/cloudflare-one/static/documentation/connections/com.cloudflare.warp.plist/) this example `plist`. If you plan to download the `plist` file and manually place it in `/Library/Managed Preferences`, convert the `plist` into binary format first. To do that:

1.  Open a Terminal window.
2.  Run the following command:

<!---->

    % plutil -convert binary1 com.cloudflare.warp.plist

[Click here to download](/cloudflare-one/static/documentation/connections/CloudflareWARP.mobileconfig/) this example `.mobileconfig`. Before doing so, you may need to run `uuidgen` from your macOS terminal. This will generate a value for `PayloadUUID`, which you can use to replace the default value used for `PayloadUUID` in the example above.

## iOS

The WARP client, known in the App Store as [1.1.1.1: Faster Internet](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627), allows for an automated install via Intune.

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

For a description of each argument and what it means, refer to the [deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/).

## Android

The WARP client, known in the Google Play store as [1.1.1.1: Faster & Safer Internet](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone\&hl=en\&gl=US), allows for an automated install via Intune.

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

Refer to the [deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/) for a description of each value.
