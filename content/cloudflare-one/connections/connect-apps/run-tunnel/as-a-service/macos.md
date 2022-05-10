---
pcx-content-type: how-to
title: MacOS
weight: 31
meta:
  title: Run as a service on macOS
---

# Run as a service on macOS

You can install `cloudflared` as a system service on macOS.

## Prerequisites

Before you install Cloudflare Tunnel as a service on your OS, follow Steps 1 through 4 of the [Tunnel CLI setup guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/#set-up-a-tunnel-locally-cli-setup). At this point you should have a named tunnel and a `config.yml` file in your `$HOME/.cloudflared` directory.

## 1. Configure `cloudflared` as a service

By default, Cloudflare Tunnel expects all of the configuration to exist in the `$HOME/.cloudflared/config.yml` [configuration file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#configuration-file). The available options are documented on the [configuration file reference](/cloudflare-one/connections/connect-apps/configuration/local-management/ingress/), but at a minimum you must specify the following arguments to run as a service:

| Argument           | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `tunnel`           | The UUID of your tunnel                              |
| `credentials-file` | The location of the credentials file for your tunnel |

## 2. Run `cloudflared` as a service

You can install the service to either run at login or at boot.

### Run at login

Open a terminal window and run the following command:

```sh
$ cloudflared service install
```

Cloudflare Tunnel will be installed as a launch agent and start whenever you log in, using your local user configuration found in `~/.cloudflared/`.

### Run at boot

Open a terminal window and run the following command:

```sh
$ sudo cloudflared service install
```

Cloudflare Tunnel will be installed as a launch daemon and start whenever your system boots, using your configuration found in `/etc/cloudflared`.

## 3. Manually start the service

Run the following command:

```sh
$ sudo launchctl start com.cloudflare.cloudflared
```

The output will be logged to `/Library/Logs/com.cloudflare.cloudflared.err.log` and `/Library/Logs/com.cloudflare.cloudflared.out.log`.

## Next steps

You can now [route traffic through your tunnel](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/#5-start-routing-traffic). If you add IP routes or otherwise change the configuration, restart the service to load the new configuration:

```sh
$ sudo launchctl stop com.cloudflare.cloudflared
$ sudo launchctl start com.cloudflare.cloudflared
```
