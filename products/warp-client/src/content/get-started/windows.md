---
title: Windows
order:
pcx-content-type: how-to
---

# Windows desktop client

1. [Download __Cloudflare_WARP_Release-x64.msi__](https://www.cloudflarewarp.com/Cloudflare_WARP_Release-x64.msi).
1. Navigate to the **Downloads** folder.
1. Double-click on `Cloudflare_WARP_Release-x64.msi`.
1. Follow the instructions in the installer to complete installation. Cloudflare WARP will automatically launch and appear in your menu bar with the Cloudflare logo.

  ![Windows system tray](../static/windowsSysTray.png)

## What we place on your device

### Cloudflare WARP GUI

This is the main GUI application that you interact with.

* **Start Menu**: `Start Menu->Cloudflare`.
* **On Disk**: `C:\Program Files\Cloudflare\Cloudflare WARP\Cloudflare WARP.exe`.

### Cloudflare WARP service

This is the Windows service that is responsible for establishing the wireguard tunnel and all interaction between our service endpoint and the client application.

* **Service**: `C:\Program Files\Cloudflare\Cloudflare WARP\warp-svc.exe`

### Log files

The Windows application places log files in two locations based on what part of the app is logging information. These logs are included during feedback submission when you check the box **Share debug information** in the Feedback UI.

* WARP Service: `C:\ProgramData\Cloudflare`.
* Application GUI Logs: `C:\Users\<your username>\AppData\Local\Cloudflare`.

## How to remove application

1. Navigate to **Windows Settings** (Windows Key + I).
1. Click **Apps** > **App & Features**.
1. Scroll down to Cloudflare WARP and click **Uninstall**.