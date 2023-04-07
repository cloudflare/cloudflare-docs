---
pcx_content_type: how-to
title: Remove WARP
weight: 16
---

# Remove WARP

The following procedures will uninstall the WARP client from your device. If you used the WARP client to deploy a root certificate, the certificate will also be removed.

## Windows

1. Go to Windows Settings (Windows Key + I).
2. Select **Apps**.
3. Select **App & Features**.
4. Scroll to find the Cloudflare WARP application and select **Uninstall**.

## macOS

We include an uninstall script as part of the macOS package that you originally used.

1. To find and run the uninstall script, run the following commands:

```sh
$ cd /Applications/Cloudflare\ WARP.app/Contents/Resources
$ ./uninstall.sh
```

2. If prompted, enter your admin credentials to proceed with the uninstall.

{{<Aside type="note">}}

You can bypass the **Are you sure** prompt by passing `-f` as a parameter to the macOS uninstall command.

{{</Aside>}}

## Linux

On CentOS 8, RHEL 8:

```sh
$ sudo yum remove cloudflare-warp
```

On Ubuntu 18.04, Ubuntu 20.04, Ubuntu 22.04, Debian 9, Debian 10, Debian 11:

```sh
$ sudo apt remove cloudflare-warp
```

## iOS and Android

1. Find the 1.1.1.1 application on the home screen.
2. Select and hold the application tile, and then select **Remove App**.
3. Select **Delete App**.

{{<Aside type="note">}}
If you [manually deployed the Cloudflare certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/), remember to manually delete the certificate from the device.
{{</Aside>}}
