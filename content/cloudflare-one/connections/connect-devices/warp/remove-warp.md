---
order: 15
pcx-content-type: how-to
---

# Remove WARP

## Windows

1. Navigate to Windows Settings (Windows Key + I).
1. Click **Apps**.
1. Click **App & Features**.
1. Scroll to find the Cloudflare WARP application and click **Uninstall**.

## macOS

We include an uninstall script as part of the macOS package that you originally used. Use the following commands to find and run the script:

```sh
$ cd /Applications/Cloudflare\ WARP.app/Contents/Resources
$ ./uninstall.sh
```

<Aside>

You may be prompted to provide your credentials while removing the application.

</Aside>

## iOS and Android

1. Find the 1.1.1.1 application on the home screen.
1. Touch and hold on the application tile.
1. Tap **Remove App**.
1. Select **Delete App**.