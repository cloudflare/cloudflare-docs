---
pcx_content_type: concept
title: HTTP/3
weight: 5
---

# HTTP/3 inspection

Gateway supports inspection of HTTP/3 traffic, which uses the QUIC protocol over UDP. Inspecting HTTP/3 inspection requires traffic to be proxied over UDP.

If you don't enable UDP in ZT settings, you'll have to enforce a management policy to disable QUIC on the client's browser. If you don't disable QUIC on the client side, their traffic will bypass Gateway and you won't be able to inspect it.

To enable HTTP/3 inspection:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Network**.
2. Under **Firewall**, enable **Proxy** and select **UDP**.
3. Enable **TLS decryption**.

## Browser limitations

The following browsers do not support HTTP/3 inspection:

- Google Chrome
- Safari
- Firefox

If QUIC is enabled in these browsers, Gateway will force all traffic to fall back to HTTP/2, allowing you to enforce your HTTP policies.

You can enable UDP proxy in settings to inspect H3 traffic, but at the moment Gateway can inspect HTTP/3 traffic from Microsoft Edge, as well as other HTTP applications, such as cURL.

## Disable QUIC

If you don't enable UDP in ZT settings, you'll have to enforce a management policy to disable QUIC on the client's browser. If you don't disable QUIC on the client side, their traffic will bypass Gateway and you won't be able to inspect it.

QUIC must be turned off in the browser.

| Browser         | Procedure                                                                              |
| --------------- | -------------------------------------------------------------------------------------- |
| Google Chrome   | Go to `chrome://flags` and disable **Experimental QUIC protocol**.                     |
| Mozilla Firefox | Go `about:config` and disable **network.http.http3.enabled**.                          |
| Microsoft Edge  | Go to `edge://flags` and disable **Experimental QUIC protocol**.                       |
| Apple Safari    | In the menu bar, go to **Develop** > **Experimental Features** and disable **HTTP/3**. |

To disable QUIC on mobile devices, enforce a policy in your mobile device management software.
