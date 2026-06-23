---
# Code generator. DO NOT EDIT.

title: WebSocket Analytics
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `websocket_analytics`.

## accountId

Type: `int`

Cloudflare account ID associated with the WebSocket connection.

## byteRecvDownlink

Type: `int`

Number of bytes received from the origin on the downlink for the WebSocket connection.

## byteRecvUplink

Type: `int`

Number of bytes received from the client on the uplink for the WebSocket connection.

## byteSentDownlink

Type: `int`

Number of bytes sent to the client on the downlink for the WebSocket connection.

## byteSentUplink

Type: `int`

Number of bytes sent to the origin on the uplink for the WebSocket connection.

## clientASN

Type: `int`

The client's autonomous system number (ASN).

## clientIP

Type: `string`

IP address of the client that initiated the WebSocket connection.

## clientRequestHTTPHost

Type: `string`

The host requested by the client during the WebSocket handshake.

## clientRequestPath

Type: `string`

The URI path requested by the client during the WebSocket handshake.

## clientRequestUserAgent

Type: `string`

The user agent string sent by the client during the WebSocket handshake.

## coloCode

Type: `string`

Colo code of the data center that processed the connection (for example, 'DFW').

## connectionCloseReason

Type: `string`

The reason the WebSocket connection was closed. Possible values are <em>none</em> \| <em>unspecifiedError</em> \| <em>timedOut</em> \| <em>peerReset</em> \| <em>upstreamReset</em> \| <em>protocolViolation</em> \| <em>peerNoError</em>.

## connectionCloseSource

Type: `string`

The side that initiated closing the WebSocket connection (for example, 'upstream', 'downstream', or 'me').

## connectionId

Type: `string`

Unique identifier of the WebSocket connection.

## rayId

Type: `string`

The ray ID of the request associated with the WebSocket connection.

## timestampEndNanos

Type: `int`

The date and time the WebSocket connection ended, expressed in Unix nanoseconds.

## timestampStartNanos

Type: `int`

The date and time the WebSocket connection started, expressed in Unix nanoseconds.

## transportCloseCode

Type: `int`

The transport-level close code for the WebSocket connection.

## zoneId

Type: `int`

Identifier of the zone associated with the WebSocket connection.
