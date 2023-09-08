---
pcx_content_type: how-to
title: Manual deployment
weight: 2
---

# Manual deployment

If you plan to direct your users to manually download and configure the WARP client, users will need to connect the client to your organization's Cloudflare Zero Trust instance.

## Prerequisites

[Set device enrollment permissions](/cloudflare-one/connections/connect-devices/warp/deployment/device-enrollment/) to specify which users can connect.

## Enroll a device manually

### Windows and macOS

{{<render file="_enroll-windows-mac.md">}}

The device is now protected by your organization's Zero Trust policies.

### Linux

{{<render file="_enroll-linux.md">}}

The device is now protected by your organization's Zero Trust policies. For more information on all available commands, run `warp-cli --help`.

### iOS, Android, and ChromeOS

{{<render file="_enroll-ios-android.md">}}

The device is now protected by your organization's Zero Trust policies.
