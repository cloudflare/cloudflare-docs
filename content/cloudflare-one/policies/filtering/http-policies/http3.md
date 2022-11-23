---
pcx_content_type: concept
title: HTTP/3
weight: 5
---

# HTTP/3 inspection

Gateway supports inspection of HTTP/3 traffic, which uses the QUIC protocol over UDP. To enable HTTP/3 inspection, go to **Settings** > **Network** and enable **Proxy** for UDP.

## Browser limitations

The following browsers do not support HTTP/3 inspection:

- Google Chrome
- Safari
- Firefox

Gateway will automatically force all traffic from these browsers to fall back to HTTP/2, thus allowing you to enforce your HTTP policies.
