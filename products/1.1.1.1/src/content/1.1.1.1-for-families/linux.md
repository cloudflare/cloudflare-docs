---
order:
title: Linux
pcx-content-type: how-to
---

import CaptivePortals from "../_partials/_captive-portals.md"

# Set up 1.1.1.1 for Families - Linux

Follow these steps to configure 1.1.1.1 for Families in Ubuntu and Debian.

## Block malware

### Ubuntu

#### IPv4

1. Click **System** > **Preferences** > **Network Connections**.
1. Select the **Wireless** tab, then choose the WiFi network you are currently connected to.
1. Click **Edit** > **IPv4**.
1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    1.1.1.2
    1.0.0.2
    ```

1. Click **Apply**.

#### IPv6

1. Click **System** > **Preferences** > **Network Connections**.
1. Select the **Wireless** tab, then choose the WiFi network you are currently connected to.
1. Go to **IPv6**.
1. Add the IPv6 addresses listed below:

    ```txt
    2606:4700:4700::1112
    2606:4700:4700::1002
    ```

1. Click **Apply**.

### Debian

#### IPv4

1. In the command line, type:

    ```bash
    sudo vim /etc/resolv.conf
    ```

1. Press the <kbd>i</kbd> key on your keyboard to edit the document.
1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Replace the nameserver lines with:

    ```txt
    1.1.1.2
    1.0.0.2
    ```

1. Press the <kbd>ESC</kbd> key on your keyboard to save and exit Vim. Then, type:

    ```
    :wq
    ```

#### IPv6

1. In the command line, type:

    ```bash
    sudo vim /etc/resolv.conf
    ```

1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Add the IPv6 address listed below:

    ```txt
    2606:4700:4700::1112
    2606:4700:4700::1002
    ```

1. Press the <kbd>ESC</kbd> key on your keyboard to save and exit Vim. Then, type:

    ```
    :wq
    ```

## Block Malware and Adult Content

### Ubuntu

#### IPv4

1. Click **System** > **Preferences** > **Network Connections**.
1. Select the **Wireless** tab, then choose the WiFi network you are currently connected to.
1. Click **Edit** > **IPv4**.
1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    1.1.1.3
    1.0.0.3
    ```
1. Click **Apply**.

#### IPv6

1. Click **System** > **Preferences** > **Network Connections**.
1. Select the **Wireless** tab, then choose the WiFi network you are currently connected to.
1. Go to **IPv6**.
1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Add the IPv6 addresses listed below:

    ```txt
    2606:4700:4700::1113
    2606:4700:4700::1003
    ```

1. Click **Apply**.

### Debian

#### IPv4

1. In the command line, type:

    ```bash
    sudo vim /etc/resolv.conf
    ```

1. Press the <kbd>i</kbd> key on your keyboard to edit the document.
1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Replace the nameserver lines with:

    ```txt
    1.1.1.3
    1.0.0.3
    ```

1. Press the <kbd>ESC</kbd> key on your keyboard to save and exit Vim. Then, type:

    ```
    :wq
    ```

#### IPv6

1. In the command line, type:

    ```bash
    sudo vim /etc/resolv.conf
    ```

1. Take note of any IP addresses you might have and save them in a safe place in case you need to use them later.
1. Add the IPv6 addresses listed below:

    ```txt
    2606:4700:4700::1113
    2606:4700:4700::1003
    ```

1. Press the <kbd>ESC</kbd> key on your keyboard to save and exit Vim. Then, type:

    ```
    :wq
    ```

<CaptivePortals/>