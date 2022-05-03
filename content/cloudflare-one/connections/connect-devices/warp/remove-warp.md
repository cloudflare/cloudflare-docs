---
pcx-content-type: how-to
title: Remove WARP
weight: 16
---

# Remove WARP

To uninstall the WARP client and the Cloudflare certificate from your device:

## Windows

1. Navigate to Windows Settings (Windows Key + I).
2. Click **Apps**.
3. Click **App & Features**.
4. Scroll to find the Cloudflare WARP application and click **Uninstall**.

## macOS

We include an uninstall script as part of the macOS package that you originally used. Use the following commands to find and run the script:

```sh
cd /Applications/Cloudflare\ WARP.app/Contents/Resources
./uninstall.sh
```

{{<Aside type="note">}}

You may be prompted to provide your credentials while removing the application.

{{</Aside>}}

## iOS and Android

1. Find the 1.1.1.1 application on the home screen.
2. Touch and hold on the application tile.
3. Tap **Remove App**.
4. Select **Delete App**.
