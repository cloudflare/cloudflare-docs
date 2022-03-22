---
weight: 8
pcx-content-type: how-to
title: Linux
meta:
    title: Set up 1.1.1.1 on Linux
---

# Set up 1.1.1.1 - Linux

Take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

## GNOME (Ubuntu, Fedora, Pop!_OS etc)

1. Go to **Show Applications** > **Settings** > **Network**.
2. Select the adapter you want to configure — like your Ethernet adapter or WiFi card — and click the **settings** button.
3. Click the **IPv4** tab.
4. In the **DNS** section, disable the **Automatic** toggle.
5. {{<render file="_all-ipv4.md">}}
6. Then, go to **IPv6**.
7. {{<render file="_all-ipv6.md">}}
8. Click **Apply**.
  
## KDE Plasma (Kubuntu, KDE neon, Fedora KDE, etc)
  
1. Go to **System Settings** > **Connections**.
2. Select the connection you want to configure - like your current connected network.
3. Click the **IPv4** tab.
4. Click the **Method** section, which will open a drop down menu - select the **Automatic (Only addresses)** option.
5. Select the text box next to **DNS servers**.
6. {{<render file="_all-ipv4.md">}}
7. Click the **IPv6** tab.
8. Click the **Method** section, which will open a drop down menu - select the **Automatic (Only addresses)** option.
9. Select the text box next to **DNS servers**.
10. {{<render file="_all-ipv6.md">}}
11. Click **Apply**.

{{<render file="_captive-portals.md">}}
