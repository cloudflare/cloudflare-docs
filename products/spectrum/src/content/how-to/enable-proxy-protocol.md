---
order: 
pcx-content-type: configuration
---

# Enable Proxy protocol

Because Cloudflare intercepts packets before forwarding them to your server, if you were to look up the client IP, you would see Cloudflare's IP rather than the true client IP.

Some services you run may require knowledge of the true client IP. In those cases, you can use a proxy protocol for Cloudflare to pass on the client IP to your service. Sending proxy information along is dependent on whether TCP or UDP is used. For TCP, Spectrum supports adding [Proxy Protocol v1](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt), which is the human readable version supported by Amazon ELB and [NGINX](https://docs.nginx.com/nginx/admin-guide/load-balancer/using-proxy-protocol/). For UDP applications, Cloudflare has developed a custom proxy protocol called Simple Proxy Protocol.

<Aside>

This feature requires an Enterprise plan. If you would like to upgrade, contact your account team.

</Aside>

## Enable Proxy Protocol v1 for TCP

1. Log in to the Cloudflare dashboard
1. Click **Spectrum**.
1. Locate the application that will use the PROXY protocol and click **Configure**.
1. From the dropdown, select **PROXY Protocol v1**.

When TCP applications are configured to use **PROXY Protocol v1**, Cloudflare will prepend each inbound TCP connection with the PROXY Protocol plain-text header.

### The Proxy Protocol v1 Header

PROXY Protocol prepends every connection with a header reporting the client IP address and port. A PROXY Protocol plain-text header has the format:

    PROXY_STRING + single space + INET_PROTOCOL + single space + CLIENT_IP + single space + PROXY_IP + single space + CLIENT_PORT + single space + PROXY_PORT + "\r\n"

An example PROXY Protocol line for an IPv4 address would look like:

    PROXY TCP4 192.0.2.0 192.0.2.255 42300 443\r\n

An example PROXY Protocol line for an IPv6 address would look like:

    PROXY TCP6 2001:db8:: 2001:db8:ffff:ffff:ffff:ffff:ffff:ffff 42300 443\r\n

## Enabling Proxy Protocol v2 for TCP/UDP

1. Log in to the Cloudflare dashboard
1. Click **Spectrum**.
1. Locate the application that will use the PROXY protocol and click **Configure**.
1. From the dropdown, select **PROXY Protocol v2**.

When TCP applications are configured to use **PROXY Protocol v2**, Cloudflare will prepend each inbound TCP connection with the PROXY Protocol binary header.

When UDP applications are configured to use **PROXY Protocol v2**, Cloudflare will prepend the first UDP datagram on a stream with a PROXY Protcol binary header.

### The Proxy Protocol v2 Header

PROXY Protocol prepends every connection with a header reporting the client IP address and port.

A PROXY Protocol binary header for a IPv4 incoming address has the format:

```txt
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                  Proxy Protocol v2 Signature                  |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|Command|   AF  | Proto.|         Address Length        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                      IPv4 Source Address                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    IPv4 Destination Address                   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |        Destination Port       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

A PROXY Protocol binary header for a IPv6 incoming address has the format:

```txt
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                  Proxy Protocol v2 Signature                  |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|Command|   AF  | Proto.|         Address Length        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                                                               |
+                      IPv6 Source Address                      +
|                                                               |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                                                               |
+                    IPv6 Destination Address                   +
|                                                               |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |        Destination Port       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

## Enable Simple Proxy Protocol for UDP

When using UDP (currently an early access feature), the client source IP and port information can be obtained by using Simple Proxy Protocol, a lightweight protocol developed specifically for UDP.

To enable it, click **Configure** on a Spectrum application and toggle the setting for Simple Proxy Protocol to **On**.

Simple Proxy Protocol dictates that your origin must also prepend packets meant for the client with the same header, including original client source information. This is done to validate that packets coming in are in fact intended for the client.

For more information about Simple Proxy Protocol headers, refer to [Simple Proxy Protocol headers](/reference/simple-proxy-protocol-header).
