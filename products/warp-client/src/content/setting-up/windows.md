---
order: 2
---

# Windows Desktop Client

## Installation Requirements
<table border="1">
    <tr>
        <th>OS Ver</th>
        <td>Windows 8, Windows 10</td>
    </tr>
    <tr>
        <th>OS Type</th>
        <td>64bit only</td>
    </tr>
    <tr>
        <th>HD Space</th>
        <td>184MB</td>
    </tr>
        <tr>
        <th>Memory</th>
        <td>3MB</td>
    </tr>
    <tr>
        <th>Network Types</th>
        <td>WIFI or LAN</td>
    </tr>
</table>

## Steps to download
1. [Click here](https://1.1.1.1/Cloudflare_WARP_Release-x64.msi) to download ```Cloudflare_WARP_Release-x64.msi```
1. Navigate to Downloads folder and double-click on ```Cloudflare_WARP_Release-x64.msi```
1. Follow the instructions in the installer to complete installation.
   * Cloudflare WARP will automatically launch and appear in your menu bar with the Cloudflare logo
   ![Windows system tray](../static/windowsSysTray.png)

## What we place on your device

#### Cloudflare WARP GUI
The main GUI application that you interact with. 
* Start Menu: `Start Menu->Cloudflare`
* On Disk: `C:\Program Files\Cloudflare\Cloudflare WARP\Cloudflare WARP.exe`

#### Cloudflare WARP Service
Windows service that is responsible for establishing the wireguard tunnel and all interaction between our service endpoint and the client application
* Service: `C:\Program Files\Cloudflare\Cloudflare WARP\warp-svc.exe`

#### Log files
The Windows application places log files in two locations based on what part of the app is logging information. These logs are included during feedback submission when "Share debug information" checkbox is checked in the Feedback UI.
* WARP Service: `C:\ProgramData\Cloudflare`
* Application GUI Logs: `C:\Users\<your username>\AppData\Local\Cloudflare` 

## How to remove application
1. Navigate to **Windows Settings** (Windows Key + I).
1. Click **Apps**.
1. Click **App & Features**.
1. Scroll down to Cloudflare WARP and click **Uninstall**.


