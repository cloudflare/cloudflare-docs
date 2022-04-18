---
pcx-content-type: how-to
title: Linux
weight: 31
meta:
  title: Run as a service on Linux
---

# Run as a service on Linux

You can install `cloudflared` as a system service on Linux. Before you install Cloudflare Tunnel as a service, follow the [Tunnel guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/) to install `cloudflared` on your machine, create a tunnel, route traffic to your tunnel, and then run it.

## Configuring `cloudflared` as a service

By default, Cloudflare Tunnel expects all of the configuration to exist in the `$HOME/.cloudflared/config.yml` [configuration file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#configuration-file). The available options are documented on the [configuration file reference](/cloudflare-one/connections/connect-apps/configuration/local-management/ingress/), but at a minimum you must specify the following arguments to run as a service:

| Argument           | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `tunnel`           | The UUID of your Tunnel                              |
| `credentials-file` | The location of the credentials file for your Tunnel |

## Running `cloudflared` as a service

Complete steps 1 through 4 in the [CLI setup guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/). At this point `cloudflared` should be installed, authenticated, and have a `config.yml` file in the `.cloudflared` directory. 

Next, run the following three commands to run `cloudflared` as a service:

```sh
$ cloudflared service install
```

```sh
$ systemctl start cloudflared
```

```sh
$ systemctl status cloudflared
```
