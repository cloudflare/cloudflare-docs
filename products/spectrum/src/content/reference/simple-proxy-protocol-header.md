---
title: Simple Proxy Protocol Header
order:
pcx-content-type: reference
---

# Simple Proxy Protocol Header

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

The contents of the header are below.

## Magic Number
16-bit fixed value set to 0x56EC for SPP. This field should be used to identify the SPP protocol and its SPP 38-byte header.

## Client Address
128-bit address of the originator of the proxied UDP datagram, i.e. the client. An IPv6 address if the client used IPv6 addressing, or an IPv4-mapped IPv6 address (see [RFC 4291](https://tools.ietf.org/html/rfc4291)) in case of an IPv4 client.

## Proxy address
128-bit address of the recipient of the proxied UDP datagram, i.e. the proxy. Contents should be interpreted in the same way as the Client Address.

## Client port
16-bit source port number of the proxied UDP datagram. In other words, the UDP port number from which the client sent the datagram.

## Proxy port
16-bit destination port number of the proxied UDP datagram. In other words, the UDP port number on which the proxy received the datagram.

## Payload
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
