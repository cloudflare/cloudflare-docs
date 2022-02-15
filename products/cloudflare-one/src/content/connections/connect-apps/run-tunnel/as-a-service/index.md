---
order: 5
pcx-content-type: navigation
---

# Run as a service

In most cases, it is recommended to run `cloudflared` as a service. This helps ensure the availability `cloudflared` to your origin by allowing the program to start at boot and continue running while your origin is online.

**Before you start**

- Follow the [Tunnel guide](/connect-apps/install-and-setup/tunnel-guide) to create a tunnel, route traffic to a tunnel, and run it.

Cloudflare Tunnel can install itself as a system service on Linux and Windows and as a launch agent on macOS.

By default, Cloudflare Tunnel expects all of the configuration to exist in the `$HOME/.cloudflared/config.yml` configuration file. The available options are documented on the [configuration file reference](/connections/connect-apps/configuration/configuration-file/ingress), but at a minimum you must specify the following arguments to run as a service:

|Argument|Description|
|---|---|
|`tunnel`|The UUID of your Tunnel
|`credentials-file`|The location of the credentials file for your Tunnel|

You must [create the Tunnel](/connections/connect-apps/create-tunnel), and its credentials file, prior to installing it as a service. Creating the Tunnel in advance will generate the `credentials` file.
