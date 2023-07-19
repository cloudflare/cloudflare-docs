---
pcx_content_type: how-to
title: Hexnode
weight: 2
---

# Deploy WARP using Hexnode

## Windows

{{<Aside type="note" header="Requirements">}}

- A 64-bit machine with Windows 10 or Windows 8
- 184 MB hard disk space and 3 MB memory
- Wi-Fi or LAN connection

{{</Aside>}}

1. Create a script file with `.bat`, `.cmd`, and `.ps1` file formats to download, install and configure the Cloudflare WARP client Windows application on the device. Listed below is a sample script with all of the configurable parameters:

   ```python
   <# Choose file name for downloading application #>
   $filename = filename.msi'

   <# Download URL of the installer. #>
   $url = 'https://www.cloudflarewarp.com/Cloudflare_WARP_Release-x64.msi'
   Write-Host 'Downloading App from' $url
   Invoke-WebRequest -Uri $url -OutFile $filename

   <# Run the installer and wait for the installation to finish #>
   $arguments = "ORGANIZATION="exampleorg" SERVICE_MODE="warp" GATEWAY_UNIQUE_ID="fmxk762nrj" SUPPORT_URL="http://support.example.com""

   $installProcess = (Start-Process $filename -ArgumentList $arguments -PassThru -Wait)

   <# Check if installation was successful #>
   if ($installProcess.ExitCode -ne 0) {
       Write-Host "Installation failed!"
       exit $installProcess.ExitCode
   }
   else {
       Write-Host "Installation completed successfully!"
   }
   ```

2. Push the script file to the devices using Hexnode.

3. On your Hexnode console, go to **Manage** > **Devices**.

4. Click on your device name. This will take you to the **Device Summary**.

5. Click **Actions** > **Execute Custom Script**.

6. Choose the script file source as _Upload file_, then upload the script file.

7. Click **Execute**.

## macOS

{{<Aside type="note" header="Requirements">}}

- macOS Catalina, High Sierra or Big Sur with a 64-bit CPU
- Minimum hard disk space 75 MB and memory 35 MB.
- Wi-Fi or LAN connection

{{</Aside>}}

1. [Download](/cloudflare-one/connections/connect-devices/warp/download-warp/#macos) the Cloudflare WARP client for macOS.

2. On your Hexnode console, go to **Apps** > **+Add Apps** > **Enterprise App**.

3. Select _macOS_ as the app platform.

4. Add an app name, category and description.

5. Upload the `cloudflare_WARP.pkg` file and click **Add**.

6. Set up an XML file with the supported app configurations for the app.
   Here is a sample XML file with the accepted parameters.

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
   <key>organization</key>
   <string>organizationname</string>
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

7. On your Hexnode console, go to **Policies**.

8. Create a new policy and provide a policy name.

9. Go to **macOS** > **App Management** > **Mandatory Apps** and start setting up the policy.

10. Click **+Add** and select the previously uploaded WARP client app.

11. Go to **App Configurations** > **+Add new configuration**.

12. Select the _WARP client_ app and upload the XML file from Step 6.

13. Now go to **Policy Targets** and associate the policy with the target entities.

This will push the app along with the configurations to the selected devices.

## iOS

{{<Aside type="note" header="Requirements">}}

- Devices running iOS v11+

{{</Aside>}}

1. On your Hexnode console, go to **Apps** > **+Add Apps** > **Store App**.

2. Select _iOS_ as the app platform.

3. Search for [**1.1.1.1: Faster Internet**](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627) and **Add** the app.

4. Set up an XML file with the supported app configurations for the app. Refer this sample XML code to identify the supported arguments:

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
   <key>support_url</key
   <string>https://support.example.com</string>
   </dict>
   ```

5. Upload the app configurations in Hexnode:

   1. On your Hexnode console, go to the **Apps** tab.
   2. Find the 1.1.1.1 app and click on its name.
   3. Click the settings icon and choose **App Configuration**.
   4. Upload the XML file in the corresponding field.
   5. Click **Save**.

6. Push the app to the target devices using Hexnode.
   1. On your Hexnode console, go to **Policies** and create a new policy.
   2. Provide a name for the policy and go to **iOS**.
   3. Go to **Mandatory Apps** > **Configure**.
   4. Click **+Add** > **Add app**, check the required app, and click **Done**.
   5. Go to **Policy Targets** and associate the policy with the required target devices.

This will push the app along with the configurations to the selected devices.

## Android

{{<Aside type="note" header="Requirements">}}

- Devices enrolled in the Android Enterprise program.

{{</Aside>}}

1. On your Hexnode console, go to **Apps** > **+Add Apps** > **Managed Google Apps**.
2. Search for the app [**1.1.1.1: Faster & Safer Internet**](https://play.google.com/work/apps/details?id=com.cloudflare.onedotonedotonedotone).
3. Approve the app as a Managed Google Play app.
4. Go to **Policies** and create a new policy.
5. Go to **Android** > **App Configurations** > **+Add new configuration**.
6. Find the **1.1.1.1 Faster & Safer Internet** app and set up your custom configurations.
7. Go to **Policy Targets** and associate the policy with the required target devices.
8. Save the policy.

This will push the app along with the configurations to the selected devices.
