---
pcx-content-type: how-to
title: Managed deployment
layout: single
weight: 1
---

# Managed deployment

Organizations can deploy WARP automatically to their fleet of devices in a single operation. This can be done using [mobility management solutions](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/partners/) like Intune or JAMF, or by executing an `.msi` file on desktop machines.

This page provides generic instructions for an automated deployment. If you want to deploy the WARP client manually, refer to the [instructions for manual deployment](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/).

{{<Aside type="warning">}}

Settings you specify in a local policy file and deploy with your management software will overrule any settings you configure in the Zero Trust Dashboard.

{{</Aside>}}

## Prerequisites

Visit the [Download page](/cloudflare-one/connections/connect-devices/warp/download-warp/#windows) to review system requirements and download the installer for your operating system.

## Install WARP on Windows

The WARP Client for Windows allows for an automated install via tools like Intune, AD, or any script or management tool that can execute a `.msi` file.

To install the WARP client, run the following command:

```txt
Cloudflare_WARP_Release-x64.msi /quiet ORGANIZATION="exampleorg" SERVICE_MODE="warp" SUPPORT_URL="http://support.example.com"
```

Refer to [deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/) for a description of each argument.

### Uninstall WARP

To uninstall the WARP client, run the following command:

```txt
msiexec /x Cloudflare_WARP_Release-x64.msi /quiet
```

### Update the configuration

The on-disk configuration of the Windows client can be changed at any time by modifying or replacing the contents of `C:\ProgramData\Cloudflare\mdm.xml`. The format of this file is as follows:

```xml
<dict>
  <key>organization</key>
  <string>yourorganization</string>
</dict>
```

Changes to this file are processed immediately by the WARP client.

## Install WARP on macOS

The Cloudflare WARP macOS client allows for an automated install via tools like Jamf, Intune, Kandji, or JumpCloud or any script or management tool that can place a `com.cloudflare.warp.plist` file in `/Library/Managed Preferences` on a supported macOS device. Additionally this plist can be wrapped in a `.mobileconfig`.

### Create `plist` file

1. [Download](/cloudflare-one/static/documentation/connections/com.cloudflare.warp.plist) an example `com.cloudflare.warp.plist` file.

2. Modify the file with your desired [deployment arguments](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/).

3. If you want to manually place the file in `/Library/Managed Preferences` (rather than use a management tool), first convert the `plist` into binary format:

    1. Open a Terminal window.
    2. Run the following command:

        ```txt
        % plutil -convert binary1 com.cloudflare.warp.plist
        ```

### Create `mobileconfig` file

1. [Download](/cloudflare-one/static/documentation/connections/CloudflareWARP.mobileconfig) an example `.mobileconfig` file.

2. Run `uuidgen` from your macOS Terminal. This will generate a value for `PayloadUUID`, which you can use to replace the default value used for `PayloadUUID`.

3. Modify the file with your desired [deployment arguments](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/).

## Install WARP on Linux

The WARP Client for Linux allows for an automated install via the presence of an `mdm.xml` file in `/var/lib/cloudflare-warp`.

The format of `/var/lib/cloudflare-warp/mdm.xml` is as follows:

```xml
<dict>
  <key>organization</key>
  <string>yourorganization</string>
</dict>
```

Refer to [deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/) for a list of accepted arguments.

## Install WARP on iOS

The Cloudflare WARP iOS client, known in the App Store as [1.1.1.1: Faster Internet](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627), allows for an automated install via tools like Jamf, Intune, or SimpleMDM.

To proceed with the installation, here is an example of the XML code you will need:

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

Refer to [deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/) for a description of each argument.

## Install WARP on Android

The Cloudflare WARP Android client (known in the Google Play store as [1.1.1.1: Faster & Safer Internet](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone\&hl=en\&gl=US)) allows for an automated install via tools like Intune, Google Endpoint Manager, and others.

To proceed with the installation, here is an example of the XML code you will need:

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

Refer to [deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/) for a description of each value.
