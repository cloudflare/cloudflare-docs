---
pcx_content_type: how-to
title: Remove WARP
weight: 16
---

# Remove WARP

To uninstall the WARP client and the Cloudflare certificate from your device:

## Windows

1. Go to Windows Settings (Windows Key + I).
2. Select **Apps**.
3. Select **App & Features**.
4. Scroll to find the Cloudflare WARP application and select **Uninstall**.

WARP is now removed from your device.

## macOS

We include an uninstall script as part of the macOS package that you originally used.

1. To find and run the uninstall script, run the following commands:

    ```sh
    cd /Applications/Cloudflare\ WARP.app/Contents/Resources
    ./uninstall.sh
    ```

2. If prompted, enter your admin credentials to proceed with the uninstall.

WARP is now removed from your device.

{{<Aside type="note">}}

You can bypass the **Are you sure** prompt by passing `-f` as a parameter to the macOS uninstall command.

{{</Aside>}}

## iOS and Android

1. Find the 1.1.1.1 application on the home screen.
2. Select and hold the application tile, and then select **Remove App**.
3. Select **Delete App**.

WARP is now removed from your device.
