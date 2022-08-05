---
pcx_content_type: navigation
title: Local management
weight: 3
---

# Local management

If you set up your tunnel through the CLI, the tunnel runs as an instance of `cloudflared` on your machine.  You can configure `cloudflared` properties by modifying [command line parameters](/cloudflare-one/connections/connect-apps/configuration/arguments/) or by editing the tunnel configuration file.

The CLI provides a quick way to handle configurations if you are connecting a single service through `cloudflared`. If you are connecting multiple services and you need to configure properties or exceptions for specific origins, you can do so by defining ingress rules in your configuration file.

{{<directory-listing>}}
