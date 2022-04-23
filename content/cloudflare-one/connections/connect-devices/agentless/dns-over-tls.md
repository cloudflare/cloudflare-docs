---
pcx-content-type: how-to
title: DNS over TLS
weight: 3
---

# Configure DNS over TLS

By default, DNS is sent over a plaintext connection. DNS over TLS (DoT) is a standard for encrypting DNS queries to keep them secure and private. DoT uses the same security protocol, TLS, that HTTPS websites use to encrypt and authenticate communications.

Cloudflare supports DoT on standard port `853` and is compliant with [RFC7858](https://tools.ietf.org/html/rfc7858).

## 1. Obtain your DoT hostname

Each Gateway location has a unique DoT hostname. Locations and corresponding DoT hostnames have policies associated with them.

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com/), navigate to **Gateway** > **Locations**.
2. If you have more than one location set up, you will see a list of all your locations.
3. Expand the location card for the location whose DoT hostname you'd like to retrieve.
4. Get the **DoT hostname** for the location.

In the example below, the DoT hostname is: `9y65g5srsm.cloudflare-gateway.com`.

![Getting the DoT hostname for a location from the dashboard](/cloudflare-one/static/documentation/connections/get-unique-subdomain.png)

Next, configure your DoT client with the DoT hostname.

## 2. Configure your DoT client

Depending on your operating system, you can choose from a variety of standalone DoT clients.

To configure your DoT client, enter the following IP address and the DoT hostname for your location (for example, `9y65g5srsm.cloudflare-gateway.com`):

```text
Hostname: <DoT hostname> 
IP address: 162.159.36.5
```

Alternatively, stub resolvers (e.g., Unbound) support DoT natively. An example configuration is shown below.

```text
# Unbound TLS Config
tls-cert-bundle: "/etc/ssl/cert.pem"
# Forwarding Config
forward-zone:
	name: "."
	forward-tls-upstream: yes
	forward-addr: 172.64.36.1@853#9y65g5srsm.cloudflare-gateway.com
	forward-addr: <IPv6 address>#<DoT hostname>
```

{{<Aside>}}
Each location has a unique DoT hostname and IPv6 address. Remember to substitute your location's values into the `<IPv6 address>` and `<DoT hostname>` fields.
{{</Aside>}}

## Supported TLS versions

Cloudflare's DNS over TLS supports TLS 1.3 and TLS 1.2.
