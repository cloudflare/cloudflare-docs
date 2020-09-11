---
order: 4
---

# Proxy protocol

Because Cloudflare intercepts packets before forwarding them to your server, if you were to look up the client IP, you would see Cloudflare's IP rather than the true client IP.

Some services you run may require knowledge of the true client IP. In those cases, you can use a proxy protocol for Cloudflare to pass on the client IP to your service. Sending proxy information along is dependent on whether TCP or UDP is used. For TCP, Spectrum supports adding [Proxy Protocol v1](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt), which is the human readable version supported by Amazon ELB and [NGINX](https://docs.nginx.com/nginx/admin-guide/load-balancer/using-proxy-protocol/). For UDP applications, Cloudflare has developed a custom proxy protocol called Simple Proxy Protocol.

<Aside>

This feature requires an Enterprise plan.  If you would like to upgrade, please contact your customer success manager or the [Customer Success Team](mailto:success@cloudflare.com).

</Aside>

## Enabling Proxy Protocol v1 for TCP

To enable PROXY Protocol v1 for a TCP application on Cloudflare, go to the [Spectrum tab in the Cloudflare dashboard](https://dash.cloudflare.com), click the configure icon next to the application you would like to add PROXY Protocol to, and use the Proxy Protocol pull down to select 'PROXY Protocol v1'.

When TCP applications are configured to use 'PROXY Protocol v1', Cloudflare will prepend each inbound TCP connection with the PROXY Protocol plain-text header (see below).

### The Proxy Protocol v1 Header

PROXY Protocol prepends every connection with a header reporting the client IP address and port. A PROXY Protocol plain-text header has the format:

    PROXY_STRING + single space + INET_PROTOCOL + single space + CLIENT_IP + single space + PROXY_IP + single space + CLIENT_PORT + single space + PROXY_PORT + "\r\n"

An example PROXY Protocol line for an IPv4 address would look like:

    PROXY TCP4 192.0.2.0 192.0.2.255 42300 443\r\n

An example PROXY Protocol line for an IPv6 address would look like:

    PROXY TCP6 2001:db8:: 2001:db8:ffff:ffff:ffff:ffff:ffff:ffff 42300 443\r\n

## Enabling Proxy Protocol v2 for TCP/UDP

To enable PROXY Protocol v2 for a TCP or UDP application on Cloudflare, go to the [Spectrum tab in the Cloudflare dashboard](https://dash.cloudflare.com), click the configure icon next to the application you would like to add PROXY Protocol to, and use the Proxy Protocol pull down to select 'PROXY Protocol v2'.

When TCP applications are configured to use 'PROXY Protocol v2', Cloudflare will prepend each inbound TCP connection with the PROXY Protocol binary header.

When UDP applications are configured to use 'PROXY Protocol v2', Cloudflare will prepend the first UDP datagram on a stream with a PROXY Protcol binary header.

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

## Enabling Simple Proxy Protocol for UDP

When using UDP (currently an early access feature), the client source IP and port information can be obtained by using Simple Proxy Protocol, a lightweight protocol developed specifically for UDP.

To enable it, click configure on a Spectrum application and toggle the setting for Simple Proxy Protocol to 'on'.

Simple Proxy Protocol dictates that your origin must also prepend packets meant for the client with the same header, including original client source information. This is done to validate that packets coming in are in fact intended for the client.

### Simple Proxy Protocol Header

The client source IP and port is encoded in a fixed-length, 38-octet long header and prepended to the payload of each proxied UDP datagram in the format described below.

```txt
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Magic Number         |                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+                               +
|                                                               |
+                                                               +
|                                                               |
+                         Client Address                        +
|                                                               |
+                               +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                               |                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+                               +
|                                                               |
+                                                               +
|                                                               |
+                         Proxy Address                         +
|                                                               |
+                               +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                               |         Client Port           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Proxy Port          |          Payload...           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

The contents of the header are:

#### Magic Number
16-bit fixed value set to 0x56EC for SPP. This field should be used to identify the SPP protocol, and its SPP 38-byte header.

#### Client Address
128-bit address of the originator of the proxied UDP datagram, i.e. the client. An IPv6 address if the client used IPv6 addressing, or an IPv4-mapped IPv6 address (see [RFC 4291](https://tools.ietf.org/html/rfc4291)) in case of an IPv4 client.

#### Proxy address
128-bit address of the recipient of the proxied UDP datagram, i.e. the proxy. Contents should be interpreted in the same way as the Client Address.

#### Client port
16-bit source port number of the proxied UDP datagram. In other words, the UDP port number from which the client sent the datagram.

#### Proxy port
16-bit destination port number of the proxied UDP datagram. In other words, the UDP port number on which the proxy received the datagram.

#### Payload
Data following the header carried by the datagram.
Magic number, addresses, and port numbers are encoded in network byte order.

A corresponding C structure describing the header is:

```c
struct {
    uint16_t magic;
    uint8_t  client_addr[16];
    uint8_t  proxy_addr[16];
    uint16_t client_port;
    uint16_t proxy_port;
};
```
