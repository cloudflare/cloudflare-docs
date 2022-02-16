---
order: 30
pcx-content-type: how-to
title: "Linux"
---

# Run as a service on Linux

You can install `cloudflared` as a system service on Linux. Before you install Cloudflare Tunnel as a service, follow the [Tunnel guide](/connections/connect-apps/install-and-setup/tunnel-guide) to install `cloudflared` on your machine, create a tunnel, route traffic to your tunnel, and then run it.

## Configuring `cloudflared` as a service

By default, Cloudflare Tunnel expects all of the configuration to exist in the `$HOME/.cloudflared/config.yml` [configuration file](/connections/connect-apps/install-and-setup/tunnel-useful-terms#configuration-file). The available options are documented on the [configuration file reference](/connections/connect-apps/configuration/configuration-file/ingress), but at a minimum you must specify the following arguments to run as a service:

| Argument | Description |
|---|---|
|`tunnel`|The UUID of your Tunnel|
|`credentials-file`|The location of the credentials file for your Tunnel|

## Running `cloudflared` as a service

1. Update `cloudflared` to the latest version:

  ```sh
  $ cloudflared update
  ```

1. Next, run the following three commands to run `cloudflared` as a service:

```sh
$ cloudflared service install
```

```sh
$ systemctl start cloudflared
```

```sh
$ systemctl status cloudflared
```
