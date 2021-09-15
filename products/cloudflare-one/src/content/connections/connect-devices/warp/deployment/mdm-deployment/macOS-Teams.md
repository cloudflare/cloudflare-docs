---
order: 3
pcx-content-type: how-to
---

# macOS

<Aside>

**Before you start**  

Visit the [requirements section](/connections/connect-devices/warp/download-warp) to review the system requirements for macOS and to download the macOS installer.

If you want to deploy the WARP client manually, refer to the [instructions for manual deployment](/connections/connect-devices/warp/deployment/manual-deployment).

</Aside>

The Cloudflare WARP macOS client allows for an automated install via tools like Jamf, Intune, Kandji, or JumpCloud or any script or management tool that can place a `com.cloudflare.warp.plist` file in `/Library/Managed Preferences` on a supported macOS device. Additionally this plist can be wrapped in a `.mobileconfig`.

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

### Example configuration in Jamf

With Jamf, the WARP Client deployment is performed in three distinct steps: 
1. Upload the WARP Client `pkg` file.
1. Create a policy that deploys the WARP Client `pkg` file.
1. Create a configuration profile with the settings you want pushed down. 

The following sections will walk you through each of these steps.

#### Upload the package
1. Login to your `jamfcloud.com` account.
1. Navigate to **Computer**.
1. Click the **All Settings** (gear) in the upper right corner.
1. Click **Computer Management**.
1. Click **Packages**.
1. Select **New**.
1. Upload the `Cloudflare_WARP.pkg` file.
  For *Display name*, we recommend entering the version number of the package being uploaded.
1. Click **Save** to complete the upload.

#### Create the policy
1. Select **Computers** > **Policies** on the menu to your left.
1. Click **+ New**.
1. Enter a Display name such as "Cloudflare WARP Client".  
 For *Triggers*, our recommendation is to select *Startup*, *Login*, *Enrollment Complete* and *Recurring Check-in*, but you can select the value that works best for your organization.
1. Navigate to **Packages**.
1. Click **Configure**.
1. Click **Add** next to the package you previously uploaded.
1. Click **Save**.

#### Add Configuration Profile
1. Navigate to **Configuration Profiles**.
1. Click **New**.
1. Enter a name for your new profile, such as *Cloudflare for Teams*.
1. Scroll down the options list and click on **Application & Custom Settings**.
1. Click **Configure**.
1. In *Preference Domain*, enter `com.cloudflare.warp`.
1. Upload a valid plist file. You can start with our example above and modify for your organization.
1. Click **Save**.
1. Navigate to **Scope** to configure which devices in your organization should receive this profile.
1. Click **Save**.

Jamf is now configured to deploy the Cloudflare WARP client.

