---
order: 1
pcx-content-type: how-to
---

# Hexnode

## Windows

<Aside type='note' header='Requirements'>

* A 64-bit machine with Windows 10 or Windows 8
* 184 MB hard disk space and 3 MB memory
* Wi-Fi or LAN connection

</Aside>

To set up Cloudflare for Teams on Windows using Hexnode:

1. Create a script file with `.bat`, `.cmd`, and `.ps1` file formats to download, install and configure the Cloudflare WARP client Windows application on the device. Listed below is a sample script with all the configurable parameters:

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

1. Push the script file to the devices using Hexnode.
1. On your Hexnode console, go to **Manage** > **Devices**. 
1. Click on your device name. This will take you to the **Device Summary**. 
1. Click **Actions** > **Execute Custom Script**. 
1. Choose the script file source as *Upload file*, then upload the script file. 
1. Click **Execute**.

## macOS

<Aside type='note' header='Requirements'>

* macOS Catalina, High Sierra or Big Sur with a 64-bit CPU
* Minimum hard disk space 75 MB and memory 35 MB.
* Wi-Fi or LAN connection

To set up Cloudflare for Teams on macOS using Hexnode:

</Aside>

1. Get the Cloudflare WARP client with identifier “com.apple.ManagedClient.preferences”. 
1. Upload the `cloudflare_WARP.pkg` file in Hexnode. 
1. On your Hexnode console, head on to **Apps**. 
1. Click on **+Add Apps** > **Enterprise App**. 
1. Select *macOS* as the app platform. 
1. Add an app name, category and description.
1. Upload the PKG file and click **Add**. 
1. Set up an XML file with the supported app configurations for the app. 
Here’s a sample XML file with the accepted parameters.

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

1. Push the app and configurations to the devices.  
1. On your Hexnode console, go to **Policies**. 
1. Create a new policy and provide a policy name. 
1. Go to **macOS** > **App Management** > **Mandatory Apps** and start setting up the policy.
1. Click on **+Add** and select the previously uploaded WARP client app.
1. Now go to **App Configurations** and click on **+Add new configuration**. 
1. Select the *WARP client* app and upload the XML file. 
1. Now go to **Policy Targets** and associate the policy with the target entities. 

This will push the app along with the configurations to the selected devices.  

## iOS

<Aside type='note' header='Requirements'>

* Devices running iOS v11+

</Aside>

To set up Cloudflare for Teams on iOS using Hexnode:

1. Add the [Cloudflare WARP iOS client](https://apps.apple.com/us/app/id1423538627) to the Hexnode app inventory. 
1. On your Hexnode console, navigate to **Apps**. 
1. Click on **+Add Apps** > **Store App**. 
1. Select *iOS* as the app platform. 
1. Search for the app **1.1.1.1: Faster Internet** and click on **Add** close to the app.
1. Set up an XML file with the supported app configurations for the app. Refer this sample XML code to identify the supported arguments:

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

1. Upload the app configurations in Hexnode. 
    1. On your Hexnode console, go to the **Apps** tab. 
    1. Find the 1.1.1.1 app and click on its name. 
    1. Click on the settings icon and choose **App Configuration**. 
    1. Upload the XML file in the corresponding field.
    1. Next, click **Save**. 
1. Push the app to the target devices using Hexnode. 
    1. On your Hexnode console, go to **Policies** and create a new policy. 
    1. Provide a name for the policy and go to **iOS**. 
    1. Select **Mandatory Apps** from the left menu and click on **Configure**. 
    1. Click on **+Add** > **Add app**, check the required app and click **Done**.
    1. Now go to **Policy Targets** and associate the policy with the required target entities.

## Android

<Aside type='note' header='Requirements'>

* Devices enrolled in the Android Enterprise program.

</Aside>

To set up Cloudflare for Teams on Android using Hexnode:

1. Approve the app [1.1.1.1: Faster & Safer Internet](https://play.google.com/work/apps/details?id=com.cloudflare.onedotonedotonedotone) as a Managed Google Play app.
    1. On your Hexnode console, navigate to the Apps tab. 
    1. Click on **+Add Apps** > **Managed Google Apps**. 
    1. Search and find the app **1.1.1.1: Faster & Safer Internet**. 
    1. Approve the app as a Managed Google app. 
1. Set up custom configurations for the app with App Configurations.
    1. On your Hexnode console, go to **Policies** and create a new policy. 
    1. Go to **Android** > **App Configurations** > **+Add new configuration**. 
    1. Search and find the app and set up the customizations.
    1. Associate the policy with the required target devices before saving from **Policy Targets**. 

The app automatically gets installed on the devices once the policy with the app configuration reaches the device. 