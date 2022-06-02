---
pcx-content-type: how-to
title: Linux
weight: 31
meta:
  title: Run as a service on Linux
---

# Run as a service on Linux

You can install `cloudflared` as a system service on Linux.

## Prerequisites

Before you install Cloudflare Tunnel as a service on Linux, follow Steps 1 through 4 of the [Tunnel CLI setup guide](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/#set-up-a-tunnel-locally-cli-setup). At this point you should have a named tunnel and a `config.yml` file in your `.cloudflared` directory.

## 1. Configure `cloudflared` as a service

By default, Cloudflare Tunnel expects all of the configuration to exist in the `$HOME/.cloudflared/config.yml` [configuration file](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-useful-terms/#configuration-file). The available options are documented on the [configuration file reference](/cloudflare-one/connections/connect-apps/configuration/local-management/ingress/), but at a minimum you must specify the following arguments to run as a service:

| Argument           | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `tunnel`           | The UUID of your tunnel                              |
| `credentials-file` | The location of the credentials file for your Tunnel |

## 2. Run `cloudflared` as a service

1. Install the `cloudflared` service.

    ```sh
    $ cloudflared service install
    ```

2. Start the service.

    ```sh
    $ systemctl start cloudflared
    ```

3. (Optional) View the status of the service.

    ```sh
    $ systemctl status cloudflared
    ```

## Next steps

You can now [route traffic through your tunnel](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/#5-start-routing-traffic). If you add IP routes or otherwise change the configuration, restart the service to load the new configuration:

```sh
$ systemctl restart cloudflared
```
