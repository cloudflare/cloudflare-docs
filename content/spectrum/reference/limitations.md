---
pcx_content_type: reference
title: Limitations
weight: 0
---

# Limitations

The following limitations apply to different protocols supported by Spectrum.

## UDP

At the moment, Cloudflare does not support packet fragmentation for UDP packets. If packets are fragmented, they will be dropped at Cloudflare’s edge. 

## Minecraft

Minecraft Java Edition is supported but Minecraft Bedrock Edition is not supported.

## Listening on ports configuration

By default, Spectrum is configured to listen on all ports, which can raise concerns for security auditors. However, it is important to note that Spectrum will only allow connections from edge ports that are specifically configured within Cloudflare. Any connection originating from a port that is not configured will be rejected, ensuring strict control over incoming connections and enhancing security measures.