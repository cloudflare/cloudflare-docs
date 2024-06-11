---
pcx_content_type: how-to
title: Managed networks
weight: 3
---

# Add a managed network

Cloudflare WARP allows you to selectively apply WARP client settings if the device is connected to a secure network location such as an office.

## 1. Choose a TLS endpoint

A TLS endpoint is a host on your network that serves a TLS certificate. The TLS endpoint acts like a network location beacon — when a device connects to a network, WARP detects the TLS endpoint and validates its certificate against an uploaded SHA-256 fingerprint.

The TLS certificate can be hosted by any device on your network. However, the endpoint must be inaccessible to users outside of the network location. Therefore, do not choose a [private network IP](/cloudflare-one/connections/connect-networks/private-net/cloudflared/) that is exposed to users over Cloudflare Tunnel. One option is to choose a host that is physically in the office which remote users do not need to access, such as a printer.

### Create a new TLS endpoint

If you do not already have a TLS endpoint on your network, you can set one up as follows:

1. Generate a TLS certificate:

```sh
$ openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes -keyout example.key -out example.pem -subj "/CN=example.com" -addext "subjectAltName=DNS:example.com"
```

The command will output a certificate in PEM format and its private key. Store these files in a secure place.

{{<Aside type="note">}}
The WARP client requires certificates to include `CN` and `subjectAltName` metadata. You can use `example.com` or any other domain.
{{</Aside>}}

2. Next, configure an HTTPS server on your network to use this certificate and key. The examples below demonstrate how to run a barebones HTTPS server that responds to requests with a `200` status code:

{{<details header="nginx in Docker">}}

To serve the TLS certificate from an nginx container in Docker:

1. Create an nginx configuration file called `nginx.conf`:

   ```txt
   ---
   filename: nginx.conf
   ---
   events {
   worker_connections  1024;
   }

   http {
      server {
         listen              443 ssl;
         ssl_certificate     /certs/example.pem;
         ssl_certificate_key /certs/example.key;
         location / {
               return 200;
         }
      }
   }
   ```

If needed, replace `/certs/example.pem` and `/certs/example.key` with the locations of your certificate and key.

2. Add the nginx image to your Docker compose file:

   ```yml
   ---
   filename: docker-compose.yml
   ---
   version: '3.3'
   services:
   nginx:
      image: nginx:latest
      ports:
         - 3333:443
      volumes:
         - ./nginx.conf:/etc/nginx/nginx.conf:ro
         - ./certs:/certs:ro
   ```

    If needed, replace `./nginx.conf` and `./certs` with the locations of your nginx configuration file and certificate.

3. Start the server:

   ```sh
   $ docker-compose up -d
   ```

{{</details>}}


{{<details header="Python">}}

{{<Aside type="warning">}}
This Python script is intended for a quick proof of concept (PoC) and should not be used in production environments.
{{</Aside>}}

To serve the TLS certificate using Python:

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

   server = http.server.ThreadingHTTPServer(('0.0.0.0', 3333), BasicHandler)
   sslcontext = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
   sslcontext.load_cert_chain(certfile='./example.pem', keyfile='./example.key')
   server.socket = sslcontext.wrap_socket(server.socket, server_side=True)
   server.serve_forever()
   ```

2. Run the script:

   ```sh
   $ python3 myserver.py
   ```

{{</details>}}

3. To test that the server is working, run a curl command from the end user's device:

```sh
$ curl -v --insecure https://<private-server-IP>:3333/
```

You need to pass the `insecure` option because we are using a self-signed certificate. If the device is connected to the network, the request should return a `200` status code.

### Supported cipher suites

The WARP client establishes a TLS connection using [Rustls](https://github.com/rustls/rustls). Make sure your TLS endpoint accepts one of the [cipher suites supported by Rustls](https://docs.rs/rustls/0.21.10/src/rustls/suites.rs.html#125-143).

## 2. Extract the SHA-256 fingerprint

To obtain the SHA-256 fingerprint of a **local** certificate:

```sh
$ openssl x509 -noout -fingerprint -sha256 -inform pem -in example.pem | tr -d :
```

The output will look something like:

```txt
SHA256 Fingerprint=DD4F4806C57A5BBAF1AA5B080F0541DA75DB468D0A1FE731310149500CCD8662
```

To obtain the SHA-256 fingerprint of a **remote** server: 

```sh
$ openssl s_client -connect <private-server-ip>:443 < /dev/null 2> /dev/null | openssl x509 -noout -fingerprint -sha256 | tr -d :
```

The output will look something like: 

```sh
sha256 Fingerprint=DD4F4806C57A5BBAF1AA5B080F0541DA75DB468D0A1FE731310149500CCD8662
```


## 3. Add managed network to Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
2. Scroll down to **Network locations** and select **Add new**.
3. Name your network location.
4. In **Host and Port**, enter the private IP address and port number of your [TLS endpoint](#create-a-new-tls-endpoint) (for example, `192.168.185.198:3333`).
5. In **TLS Cert SHA-256**, enter the [SHA-256 fingerprint](#2-extract-the-sha-256-fingerprint) of the TLS certificate.

WARP will automatically exclude the IP address of the TLS endpoint from all [Split Tunnel](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) configurations. This prevents remote users from accessing the endpoint through the WARP tunnel on any port.

## 4. Configure device profile

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.
2. Under **Profile settings**, create a new [settings profile](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) or edit an existing profile.
3. To apply this profile whenever a device connects to your network, add the following rule:

   | Selector        | Operator | Value            |
   | --------------- | -------- | ---------------- |
   | Managed network | is       | `<NETWORK-NAME>` |

4. Save the profile.

Managed networks are now enabled. Every time a device in your organization connects to a network (for example, when waking up the device or changing Wi-Fi networks), the WARP client will determine its network location and apply the corresponding settings profile.

## 5. Verify managed network

To check if the WARP client detects the network location:

1. Turn on WARP.
2. Disconnect and reconnect to the network.
3. Open a terminal and run `warp-cli debug alternate-network`.

## Best practices

- The WARP client scans all managed networks every time it detects a network change event from the operating system. To minimize performance impact, we recommend reusing the same TLS endpoint across multiple locations unless you require distinct settings profiles for each location.
- Ensure that the device can only reach one managed network at any given time. If multiple managed networks are configured and reachable, there is no way to determine which settings profile the device will receive.
