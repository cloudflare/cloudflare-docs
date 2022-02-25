---
order: 5
pcx-content-type: navigation
---

# Run as a service

You can install `cloudflared` as a system service on Linux and Windows, and as a launch agent on macOS. In most cases, it is recommended to run `cloudflared` as a service, because it helps ensure the availability of `cloudflared` to your origin by allowing the program to start at boot and continue running while your origin is online.

Before you install Cloudflare Tunnel as a service on your OS, follow the [Tunnel guide](/connect-apps/install-and-setup/tunnel-guide) to install `cloudflared` on your machine, create a tunnel, route traffic to your tunnel, and then run it.

Follow our guides to set up and run `cloudflared` as a service in your environment:

<DirectoryListing path="/connections/connect-apps/run-tunnel/as-a-service"/>