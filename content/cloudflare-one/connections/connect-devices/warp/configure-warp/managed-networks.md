---
pcx_content_type: how-to
title: Managed networks
weight: 3
layout: single
---

# Add a managed network

Cloudflare WARP allows you to selectively apply WARP client settings if the device is connected to a secure network location such as an office. To determine network location, the WARP client detects a TLS endpoint on your network and validates its certificate against an uploaded SHA-256 fingerprint. The TLS certificate can be hosted by any device on your network.

## Create a TLS endpoint

If your network already has a host serving a TLS certificate, skip ahead to [add the network on the Zero Trust dashboard](#add-managed-network-on-the-zero-trust-dashboard). Otherwise, follow these instructions to generate a new TLS endpoint:

1. Create a local certificate:

    ```sh
    $ openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes -keyout example.key -out example.pem -subj "/CN=example.com" -addext "subjectAltName=DNS:example.com"
    ```

    The command will output a PEM certificate and key. Store these files in a secure place.

{{<Aside type="note">}}
The WARP client requires certificates to include `CN` and `subjectAltName` metadata. You can use `example.com` or any other domain.
{{</Aside>}}

2. Run a simple HTTPS server to host the certificate:

    1. Create a Python 3 script called `myserver.py`:

        ```txt
        ---
        filename: myserver.py
        ---
        import ssl, http.server
        server = http.server.HTTPServer(('0.0.0.0', 4443), http.server.SimpleHTTPRequestHandler)
        sslcontext = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
        sslcontext.load_cert_chain(certfile='./example.pem', keyfile='./example.key')
        server.socket = sslcontext.wrap_socket(server.socket, server_side=True)
        server.serve_forever()
        ```

    2. Run the script:

        ```sh
        $ python3 myserver.py
        ```

## Extract the SHA-256 fingerprint

To obtain the SHA-256 fingerprint of a certificate:

```sh
$ openssl x509 -noout -fingerprint -sha256 -inform pem -in example.pem | tr -d :
```

The output will look something like:

```txt
SHA256 Fingerprint=DD4F4806C57A5BBAF1AA5B080F0541DA75DB468D0A1FE731310149500CCD8662
```

## Add managed network to the Zero Trust dashboard

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **WARP Client**.
2. Scroll down to **Network locations** and select **Add new**.
3. Name your network location.
4. In **Host and Port**, enter the private IP address and port number of the TLS endpoint (for example, `192.168.185.198:4443`).

    The [example TLS endpoint](#create-a-tls-endpoint) created above would use the IP of the device running the Python script and the port configured for the HTTPS server.

5. In **TLS Cert SHA-256**, enter the [SHA-256 fingerprint](#extract-the-sha-256-fingerprint) of the TLS certificate.

You can now create a [settings profile](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) for devices on this network. In the rule builder, the network name will appear when you choose the _Managed network_ selector.

Every time a device in your organization connects to a network (for example, when waking up the device or changing WiFi networks), the WARP client will determine its network location and apply the corresponding settings profile.

{{<Aside type="note">}}
The WARP client scans all managed networks on the list every time it detects a network change event from the operating system. To minimize performance impact, we recommend reusing the same TLS endpoint across multiple locations unless you require distinct settings profiles for each location.
 {{</Aside>}}
