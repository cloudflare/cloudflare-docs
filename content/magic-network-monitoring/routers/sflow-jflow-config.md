---
title: sFlow/jFlow configuration
pcx_content_type: how-to
weight: 4
meta:
    description: A step-by-step configuration guide for exporting sFlow data to Cloudflare’s network.
---

# sFlow/jFlow configuration

1. Log in to your router's configuration application.
2. Open your router's sFlow configuration menu.
3. Set up your router's **sFlow Exporter** configuration with the following values:

    - **Destination IP address**: `162.159.65.1`
    - **Destination Port**: `6343`
    - **Transport Protocol**: `UDP`
