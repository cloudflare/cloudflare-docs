---
pcx-content-type: how-to
title: MacOS
weight: 31
meta:
  title: Run as a service on macOS
---

# Run as a service on macOS

You can install `cloudflared` as a system service on macOS. Before you install Cloudflare Tunnel as a service on your OS, follow the [Tunnel guide](/cloudflare-one/connect-apps/install-and-setup/tunnel-guide/) to install `cloudflared` on your machine, create a tunnel, route traffic to your tunnel, and then run it.

## Configuring `cloudflared` as a service

By default, Cloudflare Tunnel expects all of the configuration to exist in the `$HOME/.cloudflared/config.yml` [configuration file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#configuration-file). The available options are documented on the [configuration file reference](/cloudflare-one/connections/connect-apps/configuration/configuration-file/ingress/), but at a minimum you must specify the following arguments to run as a service:

| Argument | Description |
|---|---|
|`tunnel`|The UUID of your Tunnel
|`credentials-file`|The location of the credentials file for your Tunnel|

## Run at login

Open a terminal window and run the following command:

```sh
$ cloudflared service install
```

Cloudflare Tunnel will be installed as a launch agent, and start whenever you log in, using your local user configuration found in `~/.cloudflared/`.

### Manually start the service

Run the following command:

```sh
$ launchctl start com.cloudflare.cloudflared
```

The output will be logged to `~/Library/Logs/com.cloudflare.cloudflared.err.log` and `~/Library/Logs/com.cloudflare.cloudflared.out.log`.

## Run at boot

Run the following command:

```sh
$ sudo cloudflared service install
```

Cloudflare Tunnel will be installed as a launch daemon, and start whenever your system boots, using your configuration found in `/etc/cloudflared`.

### Manually start the service

Run the following command:

```sh
$ sudo launchctl start com.cloudflare.cloudflared
```

The output will be logged to `/Library/Logs/com.cloudflare.cloudflared.err.log` and `/Library/Logs/com.cloudflare.cloudflared.out.log`.
