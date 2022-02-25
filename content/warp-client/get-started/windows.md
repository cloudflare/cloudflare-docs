---
title: Windows
pcx-content-type: how-to
weight: 0
meta:
  title: Windows desktop client
---

# Windows desktop client

1.  [Download **Cloudflare\_WARP\_Release-x64.msi**](https://www.cloudflarewarp.com/Cloudflare_WARP_Release-x64.msi).
2.  Navigate to the **Downloads** folder.
3.  Open `Cloudflare_WARP_Release-x64.msi`.
4.  Follow the instructions in the installer to complete installation. Cloudflare WARP will automatically launch and appear in your menu bar with the Cloudflare logo.

![Windows system tray](/warp-client/static/windowsSysTray.png)

## What Cloudflare places on your device

### Cloudflare WARP GUI

This is the main GUI application that you interact with. You can find it in:

*   The **Start** menu > **Cloudflare**.
*   On your disk, in `C:\Program Files\Cloudflare\Cloudflare WARP\Cloudflare WARP.exe`.

### Cloudflare WARP service

This is the Windows service that is responsible for establishing the wireguard tunnel and all interaction between Cloudflare's service endpoint and the client application. You can find it in `C:\Program Files\Cloudflare\Cloudflare WARP\warp-svc.exe`.

### Log files

The Windows application places log files in two locations based on what part of the application is logging information. These logs are included during feedback submission when you check **Feedback** > **Share debug information**. You can find the logs for:

*   **WARP Service**: `C:\ProgramData\Cloudflare`.
*   **Application GUI Logs**: `C:\Users\<your username>\AppData\Local\Cloudflare`.

## How to remove the application

1.  Click the **Start** menu and search for **Settings**. You can also press <kbd>⊞ Win</kbd> + <kbd>i</kbd>).
2.  Select **Apps** > **App & Features**.
3.  Scroll down to Cloudflare WARP and select **Uninstall**.
