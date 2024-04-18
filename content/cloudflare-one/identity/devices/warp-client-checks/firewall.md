---
pcx_content_type: how-to
title: Firewall
weight: 8
meta:
  title: Firewall
---

# Firewall

The Firewall device posture attribute ensures that a firewall is running on a device.

## Prerequisites

- {{<render file="posture/_prereqs-warp-is-deployed.md" withParameters="[WARP client checks](/cloudflare-one/identity/devices/warp-client-checks/)">}}

## Enable the firewall check

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
1. Scroll down to **WARP client checks** and select **Add new**.
1. Select **Firewall**.
1. Enter a descriptive name for the check.
1. Select your operating system.
1. Turn on **Enable firewall check**.
1. Select **Save**.

Next, go to **Logs** > **Posture** and verify that the firewall check is returning the expected results.

## How WARP checks the firewall status

Operating systems determine firewall configuration in various ways. Follow the steps below to understand how the WARP client determines if the firewall is enabled.

### On macOS

macOS has two firewalls: an application-based firewall and a port-based firewall. The WARP client will report a firewall is enabled if either firewall is running.

#### Application-based firewall

1. Open **System Settings** and go to **Network**.
2. Verify that **Firewall** is `Active`.

#### Port-based firewall

1. Open Terminal and run:

    ```sh
    $ sudo /sbin/pfctl -s info
    ```

2. Verify that **Status** is `Enabled`.

### On Windows

1. Open PowerShell and run:

    ```powershell
    PS C:\Users\JohnDoe> Get-NetFirewallProfile -PolicyStore ActiveStore -Name Public
    ```

1. Verify that **Enabled** is `True`.
