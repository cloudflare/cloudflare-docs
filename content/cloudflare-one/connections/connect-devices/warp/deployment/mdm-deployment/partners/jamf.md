---
order: 1
pcx-content-type: how-to
---

# Jamf

## macOS

The Cloudflare WARP client allows for an automated install via tools like Jamf, Intune, Kandji, or JumpCloud or any script or management tool that can place a `com.cloudflare.warp.plist` file in `/Library/Managed Preferences` on a supported macOS device. Additionally, this plist can be wrapped in a `.mobileconfig`.

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

[Click here to download](../../../../../../static/documentation/connections/com.cloudflare.warp.plist) this example `plist`. If you manually plan to download the plist file and place it in `/Library/Managed Preferences`, convert the plist into into binary format first. To do that:

1.  Open a Terminal window.
2.  Run the following command:

```bash
% plutil -convert binary1 com.cloudflare.warp.plist
```

[Click here to download](../../../../../../static/documentation/connections/CloudflareWARP.mobileconfig) this example `.mobileconfig`. Before doing so, you may need to run `uuidgen` from your macOS terminal. This will generate a value for `PayloadUUID`, which you can use to replace the default value used for `PayloadUUID` in the example above.

### Upload the package

1.  Log in to your `jamfcloud.com` account.
2.  Navigate to **Computer**.
3.  Click **All Settings** (gear) in the upper right corner.
4.  Click **Computer Management**.
5.  Click **Packages**.
6.  Select **New**.
7.  Upload the `Cloudflare_WARP.pkg` file.
    For *Display name*, we recommend entering the version number of the package being uploaded.
8.  Click **Save** to complete the upload.

### Create the policy

1.  Select **Computers** > **Policies** on the menu on the left side.
2.  Click **+ New**.
3.  Enter a Display name such as `Cloudflare WARP Client`.\
    For *Triggers*, our recommendation is to select *Startup*, *Login*, *Enrollment Complete* and *Recurring Check-in*, but you can select the value that works best for your organization.
4.  Navigate to **Packages**.
5.  Click **Configure**.
6.  Click **Add** next to the package you previously uploaded.
7.  Click **Save**.

### Add a Configuration Profile

1.  Navigate to **Configuration Profiles**.
2.  Click **New**.
3.  Enter a name for your new profile, such as *Cloudflare Zero Trust*.
4.  Scroll through the options list and click on **Application & Custom Settings**.
5.  Click **Configure**.
6.  In *Preference Domain*, enter `com.cloudflare.warp`.
7.  Upload a valid plist file. You can start with our example above and modify it for your organization.
8.  Click **Save**.
9.  Navigate to **Scope** to configure which devices in your organization will receive this profile.
10. Click **Save**.

Jamf is now configured to deploy the Cloudflare WARP client.

## iOS

The WARP client, known in the App Store as [1.1.1.1: Faster Internet](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627), allows for an automated install via Jamf.

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

1.  Log in to your `jamfcloud.com` account.
2.  Navigate to **Devices**.
3.  Click **Mobile Device Apps**.
4.  Click **+ New**.
5.  Select *App store app or apps purchased in volume*.
6.  Click **Next**.
7.  In the search box, enter: `1.1.1.1: Faster Internet`.
8.  Click **Next**.
9.  Click **Add** in the row for *1.1.1.1: Faster Internet by Cloudflare Inc.*. To verify that it is the correct application, [click on this App Store link](https://apps.apple.com/us/app/id1423538627).
10. Navigate to **Scope**.
11. Specify the devices in your organization that will receive the application.
12. Navigate to **App Configuration** and copy/paste the XML from above.
13. Make sure you modify the default XML values to match your Cloudflare for Teams deployment.
14. Click **Save**.

Jamf is now configured to deploy the WARP client.
