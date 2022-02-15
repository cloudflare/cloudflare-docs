---
order: 30
pcx-content-type: how-to
title: "Linux"
---

# Run as a service on Linux

| Before you start |
|---|
| Follow the [Tunnel guide](/connect-apps/install-and-setup/tunnel-guide) to create a tunnel, route traffic to a tunnel, and run it. |

Cloudflare Tunnel can install itself as a system service on Linux.

By default, Cloudflare Tunnel expects all of the configuration to exist in the `$HOME/.cloudflared/config.yml` configuration file. The available options are documented on the [configuration file reference](/connections/connect-apps/configuration/configuration-file/ingress), but at a minimum you must specify the following arguments to run as a service:

|Argument|Description|
|---|---|
|`tunnel`|The UUID of your Tunnel
|`credentials-file`|The location of the credentials file for your Tunnel|

You must [create the Tunnel](/connections/connect-apps/create-tunnel), and its credentials file, prior to installing it as a service. Creating the Tunnel in advance will generate the `credentials` file.

## Linux

Before getting started, ensure the `cloudflared` will be able to create an [outbound-only connection](/connections/connect-apps/install-and-setup/installation) to the Cloudflare network.

### Install `cloudflared`

Open a Terminal and run the following command:

```sh
$ wget https://github.com/cloudflare/cloudflared/releases/download/latest/cloudflared-linux-amd64
mv ./cloudflared-linux-amd64 /usr/local/bin/cloudflared
chmod a+x /usr/local/bin/cloudflared
cloudflared update
```
