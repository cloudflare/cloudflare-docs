---
order: 5
pcx-content-type: navigation
---

# Run as a service

Cloudflare Tunnel can install itself as a system service on Linux and Windows and as a launch agent on macOS. In most cases, it is recommended to run `cloudflared` as a service. This helps ensure the availability `cloudflared` to your origin by allowing the program to start at boot and continue running while your origin is online.

Before you install Cloudflare Tunnel as a service on your OS, follow the [Tunnel guide](/connect-apps/install-and-setup/tunnel-guide) to install `cloudflared` on your machine, create a tunnel, route traffic to your tunnel, and then run it.

## Configuring `cloudflared` as a service

By default, Cloudflare Tunnel expects all of the configuration to exist in the `$HOME/.cloudflared/config.yml` [configuration file](/connections/connect-apps/install-and-setup/tunnel-useful-terms#configuration-file). The available options are documented on the [configuration file reference](/connections/connect-apps/configuration/configuration-file/ingress), but at a minimum you must specify the following arguments to run as a service:

| Argument | Description |
|---|---|
|`tunnel`|The UUID of your Tunnel|
|`credentials-file`|The location of the credentials file for your Tunnel|

<DirectoryListing path="/connections/connect-apps/run-tunnel/as-a-service"/>