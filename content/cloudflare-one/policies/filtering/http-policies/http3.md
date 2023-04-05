---
pcx_content_type: concept
title: HTTP/3
weight: 5
---

# HTTP/3 inspection

Gateway supports inspection of HTTP/3 traffic, which uses the QUIC protocol over UDP. Inspecting HTTP/3 inspection requires traffic to proxied over UDP.

To enable HTTP/3 inspection, go to **Settings** > **Network**, enable **Proxy**, and select **UDP**.

## Browser limitations

The following browsers do not support HTTP/3 inspection:

- Google Chrome
- Safari
- Firefox

Gateway will automatically force all traffic from these browsers to fall back to HTTP/2, thus allowing you to enforce your HTTP policies.

## Disable QUIC

QUIC must be turned off in the browser.

| Browser         | Procedure                                                                              |
| --------------- | -------------------------------------------------------------------------------------- |
| Google Chrome   | Go to `chrome://flags` and disable **Experimental QUIC protocol**.                     |
| Mozilla Firefox | Go `about:config` and disable **network.http.http3.enabled**.                          |
| Microsoft Edge  | Go to `edge://flags` and disable **Experimental QUIC protocol**.                       |
| Apple Safari    | In the menu bar, go to **Develop** > **Experimental Features** and disable **HTTP/3**. |

To disable QUIC on mobile devices, enforce a policy in your mobile device management software.
