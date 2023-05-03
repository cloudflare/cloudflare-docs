---
pcx_content_type: concept
title: HTTP/3
weight: 5
---

# HTTP/3 inspection

Gateway supports inspection of HTTP/3 traffic, which uses the QUIC protocol over UDP. HTTP/3 inspection requires traffic to be proxied over UDP.

## Enable HTTP/3 inspection

To enable HTTP/3 inspection:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Network**.
2. Under **Firewall**, enable **Proxy** and select **UDP**.
3. Enable **TLS decryption**.

### Application limitations

Gateway can inspect HTTP/3 traffic from Microsoft Edge, as well as other HTTP applications, such as cURL.

The following browsers do not support HTTP/3 inspection:

- Google Chrome
- Safari
- Firefox

If the UDP proxy is enabled in Zero Trust and QUIC is enabled in these browsers, Gateway will force all traffic to fall back to HTTP/2, allowing you to enforce your HTTP policies.

## Disable QUIC

If the UDP proxy is not enabled, HTTP/3 traffic will bypass inspection. To avoid this behavior, disable QUIC in your users' browsers.

<details>
<summary>Google Chrome</summary>
<div>

1. Go to `chrome://flags`
2. Disable **Experimental QUIC protocol**.
3. Relaunch Chrome.

</div>
</details>

<details>
<summary>Safari</summary>
<div>

1. Go to **Safari** > **Settings** > **Advanced** and enable **Show Develop menu in menu bar**, then relaunch Safari.
2. Go to **Develop** > **Experimental Features** and disable **HTTP/3**.
3. Relaunch Safari.

</div>
</details>

<details>
<summary>Firefox</summary>
<div>

1. Go to `about:config`.
2. If you receive a warning, select **Accept the Risk and Continue**.
3. Disable **network.http.http3.enable**.
4. Relaunch Firefox.

</div>
</details>

<details>
<summary>Microsoft Edge</summary>
<div>

1. Go to `edge://flags`
2. Disable **Experimental QUIC protocol**.
3. Relaunch Edge.

</div>
</details>

To disable QUIC on mobile devices, enforce a policy in your mobile device management software.
