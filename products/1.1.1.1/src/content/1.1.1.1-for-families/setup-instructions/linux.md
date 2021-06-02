---
order: 4
---

# Linux setup instructions

## Block malware

### Ubuntu

#### IPv4

1. Click **System** > **Preferences** > **Network Connections**.
1. Click on the **Wireless** tab, then choose the Wi-Fi network you are currently connected to.
1. Click **Edit** > **IPv4**.
1. Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    1.1.1.2
    1.0.0.2
    ```

1. Click **Apply**.

#### IPv6

1. Click **System** > **Preferences** > **Network Connections**.
1. Click on the **Wireless** tab, then choose the Wi-Fi network you are currently connected to.
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
1. Replace the nameserver lines with:

    ```txt
    1.1.1.2
    1.0.0.2
    ```

2. Press the <kbd>ESC</kbd> key on your keyboard to save and exit vim. Then, after lifting the key, type:

    ```
    :wq
    ```

#### IPv6

1. In the command line, type:

    ```bash
    sudo vim /etc/resolv.conf
    ```

1. Add the IPv6 address listed below:

    ```txt
    2606:4700:4700::1112
    2606:4700:4700::1002
    ```

1. Press the <kbd>ESC</kbd> key on your keyboard to save and exit vim. Then, after lifting the key, type:

    ```
    :wq
    ```

## Block Malware and Adult Content

### Ubuntu

#### IPv4

1. Click **System** > **Preferences** > **Network Connections**.
1. Click on the **Wireless** tab, then choose the Wi-Fi network you are currently connected to.
1. Click **Edit** > **IPv4**.
1. Remove any IP addresses that may be already listed and in their place add the following IP addresses:

    ```txt
    1.1.1.3
    1.0.0.3
    ```
1. Click **Apply**.

#### IPv6

1. Click **System** > **Preferences** > **Network Connections**.
1. Click on the **Wireless** tab, then choose the Wi-Fi network you are currently connected to.
1. Go to **IPv6**.
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
1. Replace the nameserver lines with:

    ```txt
    1.1.1.3
    1.0.0.3
    ```

1. Press the <kbd>ESC</kbd> key on your keyboard to save and exit vim. Then, after lifting the key, type:

    ```
    :wq
    ```

#### IPv6

1. In the command line, type:

    ```bash
    sudo vim /etc/resolv.conf
    ```

1. Add the IPv6 addresses listed below:

    ```txt
    2606:4700:4700::1113
    2606:4700:4700::1003
    ```

1. Press the <kbd>ESC</kbd> key on your keyboard to save and exit vim. Then, after lifting the key, type:

    ```
    :wq
    ```