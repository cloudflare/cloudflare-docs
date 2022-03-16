---
title: macOS
pcx-content-type: how-to
weight: 0
meta:
  title: macOS desktop client
---

# macOS desktop client

1. [Download Warp for Mac](https://install.appcenter.ms/orgs/cloudflare/apps/1.1.1.1-macos-1/distribution_groups/release).
2. Navigate to your predefined download folder and double click the `.pkg` file.
4. Follow the instructions to complete installation. Cloudflare WARP will automatically launch and appear in your menu bar with the Cloudflare logo.
5. Click the **Next** button and **Accept** Cloudflare's privacy policy.
6. Turn on the toggle to enable WARP.

WARP is now running and protecting your Internet connection.

## WARP modes

The WARP app has two main modes of operation: WARP and 1.1.1.1.

In WARP mode, all traffic leaving your computer is encrypted and sent over WARP, including DNS traffic. In 1.1.1.1 mode, the WARP app only encrypts DNS traffic to the 1.1.1.1 resolver.

WARP is the recommended mode of operation. However, if you only want to use the 1.1.1.1 resolver mode:

1. Click the WARP app icon.
2. Click the cog icon, and choose your preferred mode of operation for WARP.

## WARP options

Beyond these two modes of operations, the WARP app lets you configure additional options to better suit your needs. You can change the protocol used to connect to Cloudflare or enable [1.1.1.1 for Families](/1.1.1.1/setup/#1.1.1.1_for_families), for example. To access these options:

1. Click the WARP app icon.
2. Click the cog icon on the WARP app > **Preferences**.

The following is a list of options you can configure in the **Connection** tab:

* **Disable for all Wi-Fi / wired networks**: Check the box corresponding to the network where you want to prevent WARP from working on.
* **DNS Protocol**: The options here depend on the WARP mode you have enabled:
  * **WARP**: Only available when you have the WARP mode enabled. All DNS traffic is sent via the Wireguard/WARP tunnel to our DNS resolver.
  * **HTTPS**: All DNS traffic is sent outside the tunnel via [DNS over HTTPS](/1.1.1.1/encryption/dns-over-https/).
  * **TLS**: All DNS traffic is sent outside the tunnel via [encrypted TLS](/1.1.1.1/encryption/dns-over-tls/).
* **1.1.1.1 for Families**: Allows you to [enable 1.1.1.1 for Families](/1.1.1.1/setup/#1.1.1.1_for_families) and choose between blocking malware, or blocking malware and adult content.

For the Advanced options, refer to [Exclude or include network traffic with WARP](/cloudflare-one/connections/connect-devices/warp/exclude-traffic/) for more information.

## What Cloudflare places on your device

### Cloudflare WARP.app

This is the main GUI application that you interact with. You can find it in`/Applications/Cloudflare WARP.app`.

### Cloudflare WARP Daemon

This is the daemon service responsible for establishing the wireguard tunnel and all interaction between our service endpoint and the Cloudflare WARP application. Here is where you can find:

- **Service**: `/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP`
- **Definition**: `/Library/LaunchDaemons/com.cloudflare.1dot1dot1dot1.macos.warp.daemon.plist`

### Log files

The macOS application places log files in two locations based on what part of the app is logging information. These logs are included with a feedback submission, when you click the checkbox in **Feedback** > **Share debug information**.

- **Daemon and install logs**: `/Library/Application Support/Cloudflare`.
- **Application GUI logs**: `/Users/<your local username>/Library/Logs/Cloudflare`.

## How to remove the application

We include an uninstall script as part of the macOS package you install. Type the following in a terminal window to uninstall WARP:

```sh
$ cd /Applications/Cloudflare\ WARP.app/Contents/Resources
$ ./uninstall.sh
```

{{<Aside type="note" header="Note">}}

You may be prompted to provide your credentials while removing the application.

{{</Aside>}}