---
pcx_content_type: how-to
title: Managed deployment
layout: single
weight: 1
---

# Managed deployment

Organizations can deploy WARP automatically to their fleet of devices in a single operation. The WARP client is compatible with the vast majority of managed deployment workflows, including [mobility management solutions](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/partners/) such as Intune or JAMF, or by executing an `.msi` file on desktop machines.

This page provides generic instructions for an automated deployment. If you want to deploy the WARP client manually, refer to the [instructions for manual deployment](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/).

{{<Aside type="warning">}}

Settings you specify in a local policy file and deploy with your management software will overrule any settings you configure in Zero Trust.

{{</Aside>}}

## Prerequisites

Visit the [Download page](/cloudflare-one/connections/connect-devices/warp/download-warp/#windows) to review system requirements and download the installer for your operating system.

## Windows

The WARP Client for Windows allows for an automated install via tools like Intune, AD, or any script or management tool that can execute a `.msi` file.

### Install WARP

To install the WARP client, run the following command:

```txt
msiexec /i "Cloudflare_WARP_Release-x64.msi" /qn ORGANIZATION="exampleorg" SUPPORT_URL="http://support.example.com"
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
	<key>onboarding</key>
	<false/>
</dict>
```

Changes to this file are processed immediately by the WARP client.

### Authenticate in embedded browser

By default WARP will use the user’s default browser to perform registration. You can override the default setting to instead authenticate users in an embedded browser. The embedded browser will work around any protocol handler issues that may prevent the default browser from launching.

To use an embedded browser:

1. Download and install WebView2 by following the instructions [here](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section).
2. Add a registry key with the following command:
   ```txt
   REG ADD HKLM\SOFTWARE\Cloudflare\CloudflareWARP /f /v UseWebView2 /t REG_SZ /d y
   ```

The WARP client will now launch WebView2 when the user is registering their device with Zero Trust.

## macOS

The Cloudflare WARP macOS client allows for an automated install via tools like Jamf, Intune, Kandji, or JumpCloud or any script or management tool that can place a `com.cloudflare.warp.plist` file in `/Library/Managed Preferences` on a supported macOS device. Additionally this plist can be wrapped in a `.mobileconfig`.

### Create `plist` file

1. [Download](/cloudflare-one/static/documentation/connections/com.cloudflare.warp.plist) an example `com.cloudflare.warp.plist` file.

2. Modify the file with your desired [deployment arguments](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/).

3. (Optional) If you want to manually place the file in `/Library/Managed Preferences` (rather than use a management tool), convert the `plist` into binary format:

```sh
$ plutil -convert binary1 com.cloudflare.warp.plist
```

The plist must be pushed by an MDM tool in order to persist after reboot. Manually-placed files will be automatically deleted by the OS.

### Create `mobileconfig` file

1. [Download](/cloudflare-one/static/documentation/connections/CloudflareWARP.mobileconfig) an example `.mobileconfig` file.

2. Run `uuidgen` from your macOS Terminal. This will generate a value for `PayloadUUID`, which you can use to replace the default value used for `PayloadUUID`.

3. Modify the file with your desired [deployment arguments](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/).

## Linux

The WARP Client for Linux allows for an automated install via the presence of an `mdm.xml` file in `/var/lib/cloudflare-warp`.

The format of `/var/lib/cloudflare-warp/mdm.xml` is as follows:

```xml
<dict>
  <key>organization</key>
  <string>yourorganization</string>
</dict>
```

Refer to [deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/) for a list of accepted arguments.

## iOS

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

## Android

The Cloudflare WARP Android client (known in the Google Play store as [1.1.1.1: Faster & Safer Internet](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone&hl=en_US&gl=US) allows for an automated install via tools like Intune, Google Endpoint Manager, and others.

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
