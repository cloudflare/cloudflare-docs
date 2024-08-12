---
weight: 8
pcx_content_type: how-to
title: Linux
meta:
    title: Set up 1.1.1.1 on Linux
    description: Learn how to set up 1.1.1.1 as your DNS resolver on a Linux system.
---

# Set up 1.1.1.1 - Linux

Before you begin, take note of any DNS addresses you might have set up, and save them in a safe place in case you need to use them later.

Consider the sections below to set up 1.1.1.1 using either the [command line interface (CLI)](#use-command-line-interface-cli) or a [graphical user interface (GUI)](#use-graphical-user-interface-gui) of your preference.

## Use command line interface (CLI)

Choose whether you want to use 1.1.1.1 or 1.1.1.1 For Families, and replace `1.1.1.1` with the corresponding [IPv4 or IPv6 address](/1.1.1.1/ip-addresses/) accordingly.

### `resolv.conf`

Usually, `/etc/resolv.conf` is where you can configure the resolver IPs that your system is using.

In that case, you can use the following one-line command to specify `1.1.1.1` as your DNS resolver and `1.0.0.1` as backup:

```sh
$ echo -e "nameserver 1.1.1.1\nnameserver 1.0.0.1" | sudo tee /etc/resolv.conf
```

{{<Aside type="warning">}}
Note that other systems, such as dynamic host configuration protocol (DHCP), may automatically write to `/etc/resolv.conf` and change that configuration. In those cases, consider changing your network settings or DHCP to use `1.1.1.1`.
{{</Aside>}}

Alternatively, you can use an editor (`nano` or `vim`, for example) to manually edit the file.

### `systemd-resolved`

If you use `systemd-resolved` utility and the resolver IPs configuration is in `/etc/systemd/resolved.conf`, consider the steps below:

1. Run the following command, replacing `<EDITOR>` with your preferred editor.

```sh
$ sudo <EDITOR> /etc/systemd/resolved.conf
```

2. In the editor, add or edit the following lines:

```txt
[Resolve]
DNS=1.1.1.1
```

## Use graphical user interface (GUI)

### GNOME

1. Go to **Show Applications** > **Settings** > **Network**.
2. Select the adapter you want to configure — like your Ethernet adapter or Wi-Fi card — and select the **Settings** button.
3. On the **IPv4** tab > **DNS** section, disable the **Automatic** toggle.
4. {{<render file="_all-ipv4.md">}}
5. Go to **IPv6**.
6. {{<render file="_all-ipv6.md">}}
7. Select **Apply**.

### KDE Plasma

1. Go to **System Settings** > **Wi-Fi & Internet** > **Wi-Fi & Networking**. (or **Connections**, if on Plasma 5)
2. Select the connection you want to configure - like your current connected network.
3. On the **IPv4** tab, select the **Method** drop-down menu > _Automatic (Only addresses)_.
4. Select the text box next to **DNS servers**.
5. {{<render file="_all-ipv4.md">}}
6. On the **IPv6** tab, select the **Method** drop-down menu > _Automatic (Only addresses)_.
7. Select the text box next to **DNS servers**.
8. {{<render file="_all-ipv6.md">}}
9. Select **Apply**.

{{<render file="_captive-portals.md">}}
