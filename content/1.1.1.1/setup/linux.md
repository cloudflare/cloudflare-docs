---
weight: 8
pcx_content_type: how-to
title: Linux
meta:
    title: Set up 1.1.1.1 on Linux
---

# Set up 1.1.1.1 - Linux

Take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

## GNOME (Ubuntu, Fedora, Pop!_OS etc)

1. Go to **Show Applications** > **Settings** > **Network**.
2. Select the adapter you want to configure — like your Ethernet adapter or Wi-Fi card — and select the **Settings** button.
3. On the **IPv4** tab > **DNS** section, disable the **Automatic** toggle.
4. {{<render file="_all-ipv4.md">}}
5. Go to **IPv6**.
6. {{<render file="_all-ipv6.md">}}
7. Select **Apply**.
  
## KDE Plasma (Kubuntu, KDE neon, Fedora KDE, etc)
  
1. Go to **System Settings** > **Connections**.
2. Select the connection you want to configure - like your current connected network.
3. On the **IPv4** tab, select the **Method** drop-down menu > _Automatic (Only addresses)_.
4. Select the text box next to **DNS servers**.
5. {{<render file="_all-ipv4.md">}}
6. On the the **IPv6** tab, select the **Method** drop-down menu > _Automatic (Only addresses)_.
7. Select the text box next to **DNS servers**.
8. {{<render file="_all-ipv6.md">}}
9. Select **Apply**.

{{<render file="_captive-portals.md">}}
