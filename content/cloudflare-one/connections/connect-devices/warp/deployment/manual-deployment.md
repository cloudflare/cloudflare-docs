---
pcx_content_type: how-to
title: Manual deployment
weight: 2
---

# Manual deployment

If you plan to direct your users to manually download and configure the WARP client, users will need to connect the client to your organization's Cloudflare Zero Trust instance.

## Prerequisites

- [Set device enrollment permissions](/cloudflare-one/connections/connect-devices/warp/deployment/device-enrollment/) to specify which users can connect.

## Windows, macOS, and Linux

### Enroll via the GUI

{{<render file="warp/_enroll-desktop.md">}}

The device is now protected by your organization's Zero Trust policies.

### Enroll via the CLI

{{<render file="warp/_enroll-with-cli.md" productFolder="cloudflare-one">}}

## iOS, Android, and ChromeOS

{{<render file="warp/_enroll-ios-android.md">}}

The device is now protected by your organization's Zero Trust policies.

## Virtual machines

By default, virtual machines (VMs) are subject to the WARP client settings of the host. If you want to deploy a separate instance of WARP in a VM, you must configure the VM to operate in bridged networking mode.
