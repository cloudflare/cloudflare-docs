---
order: 30
pcx-content-type: how-to
title: "MacOS"
---

# Run as a service on macOS

| Before you start |
|---|
| Follow the [Tunnel guide](/connect-apps/install-and-setup/tunnel-guide) to create a tunnel, route traffic to a tunnel, and run it. |

Cloudflare Tunnel can install itself as a system service on Linux and Windows and as a launch agent on macOS.

By default, Cloudflare Tunnel expects all of the configuration to exist in the `$HOME/.cloudflared/config.yml` configuration file. The available options are documented on the [configuration file reference](/connections/connect-apps/configuration/configuration-file/ingress), but at a minimum you must specify the following arguments to run as a service:

|Argument|Description|
|---|---|
|`tunnel`|The UUID of your Tunnel
|`credentials-file`|The location of the credentials file for your Tunnel|

You must [create the Tunnel](/connections/connect-apps/create-tunnel), and its credentials file, prior to installing it as a service. Creating the Tunnel in advance will generate the `credentials` file.

## MacOS

### Run at login

Open a terminal window and run the following command:

```sh
$ cloudflared service install
```

Cloudflare Tunnel will be installed as a launch agent, and start whenever you log in, using your local user configuration found in `~/.cloudflared/`.

#### Manually start the service

Run the following command:

```sh
$ launchctl start com.cloudflare.cloudflared
```

Output will be logged to `~/Library/Logs/com.cloudflare.cloudflared.err.log` and `~/Library/Logs/com.cloudflare.cloudflared.out.log`.

### Run at boot

Run the following command:

```sh
$ sudo cloudflared service install
```

Cloudflare Tunnel will be installed as a launch daemon, and start whenever your system boots, using your configuration found in `/etc/cloudflared`.

#### Manually start the service

Run the following command:

```sh
$ sudo launchctl start com.cloudflare.cloudflared
```

Output will be logged to `/Library/Logs/com.cloudflare.cloudflared.err.log` and `/Library/Logs/com.cloudflare.cloudflared.out.log`.
