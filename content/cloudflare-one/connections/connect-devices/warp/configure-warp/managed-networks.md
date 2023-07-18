---
pcx_content_type: how-to
title: Managed networks
weight: 3
layout: single
---

# Add a managed network

Cloudflare WARP allows you to selectively apply WARP client settings if the device is connected to a secure network location such as an office.

## 1. Choose a TLS endpoint

A TLS endpoint is a host on your network that serves a TLS certificate. The TLS endpoint acts like a network location beacon — when a device connects to a network, WARP detects the TLS endpoint and validates its certificate against an uploaded SHA-256 fingerprint.

The TLS certificate can be hosted by any device on your network. However, the endpoint must be inaccessible to users outside of the network location. Therefore, do not choose a [private network IP](/cloudflare-one/connections/connect-networks/private-net/connect-private-networks/) that is exposed to users over Cloudflare Tunnel. One option is to choose a host that is physically in the office which remote users do not need to access, such as a printer.

### Create a new TLS endpoint

If you do not already have a TLS endpoint on your network, you can set one up as follows:

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

      class BasicHandler(http.server.BaseHTTPRequestHandler):
          def do_GET(self):
              self.send_response(200)
              self.send_header('Content-type', 'text/html')
              self.end_headers()
              self.wfile.write(b'OK')
              return

      server = http.server.HTTPServer(('0.0.0.0', 4443), BasicHandler)
      sslcontext = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
      sslcontext.load_cert_chain(certfile='./example.pem', keyfile='./example.key')
      server.socket = sslcontext.wrap_socket(server.socket, server_side=True)
      server.serve_forever()
      ```

   2. Run the script:

      ```sh
      $ python3 myserver.py
      ```

## 2. Extract the SHA-256 fingerprint

To obtain the SHA-256 fingerprint of a certificate:

```sh
$ openssl x509 -noout -fingerprint -sha256 -inform pem -in example.pem | tr -d :
```

The output will look something like:

```txt
SHA256 Fingerprint=DD4F4806C57A5BBAF1AA5B080F0541DA75DB468D0A1FE731310149500CCD8662
```

## 3. Add managed network to Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
2. Scroll down to **Network locations** and select **Add new**.
3. Name your network location.
4. In **Host and Port**, enter the private IP address and port number of the TLS endpoint (for example, `192.168.185.198:4443`).

   The [example TLS endpoint](#create-a-new-tls-endpoint) created above would use the IP of the device running the Python script and the port configured for the HTTPS server.

5. In **TLS Cert SHA-256**, enter the [SHA-256 fingerprint](#2-extract-the-sha-256-fingerprint) of the TLS certificate.

WARP will automatically exclude the IP address of the TLS endpoint from all [Split Tunnel](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) configurations. This prevents remote users from accessing the endpoint through the WARP tunnel on any port. 

## 4. Configure device profile

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
2. Under **Profile settings**, create a new [settings profile](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) or edit an existing profile.
3. To apply this profile whenever a device connects to your network, add the following rule:
| Selector | Operator | Value |
| -------  | -------- | ------|
| Managed network | is | `<NETWORK-NAME>` |
4. Save the profile.

Managed networks are now enabled. Every time a device in your organization connects to a network (for example, when waking up the device or changing Wi-Fi networks), the WARP client will determine its network location and apply the corresponding settings profile.

{{<Aside type="note">}}
The WARP client scans all managed networks on the list every time it detects a network change event from the operating system. To minimize performance impact, we recommend reusing the same TLS endpoint across multiple locations unless you require distinct settings profiles for each location.
  
If multiple managed networks are configured and reachable, the first managed network to respond is used when determining which WARP settings profile the device should receive.
{{</Aside>}}
