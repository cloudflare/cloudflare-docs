---
title: macOS
pcx_content_type: how-to
weight: 0
meta:
  title: macOS desktop client
---

# macOS desktop client

1. Download Cloudflare WARP for macOS from [Microsoft App Center](https://install.appcenter.ms/orgs/cloudflare/apps/1.1.1.1-macos-1/distribution_groups/release) or [1.1.1.1](https://1.1.1.1/).
2. Go to your predefined download folder and open the `.pkg` file.
3. Follow the instructions to complete installation. Cloudflare WARP will automatically launch and appear in your menu bar with the Cloudflare logo.
4. Select **Next** and **Accept** Cloudflare's privacy policy.
5. Turn on the toggle to enable WARP.

WARP is now running and protecting your Internet connection.

{{<render file="_modes-options.md">}}

## What Cloudflare places on your device

### Cloudflare WARP.app

This is the main GUI application that you interact with. You can find it in`/Applications/Cloudflare WARP.app`.

### Cloudflare WARP Daemon

This is the daemon service responsible for establishing the wireguard tunnel and all interaction between our service endpoint and the Cloudflare WARP application. Here is where you can find:

- **Service**: `/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP`
- **Definition**: `/Library/LaunchDaemons/com.cloudflare.1dot1dot1dot1.macos.warp.daemon.plist`

### Log files

The macOS application places log files in two locations based on what part of the app is logging information. These logs are included with a feedback submission, when you select the checkbox in **Feedback** > **Share debug information**.

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
