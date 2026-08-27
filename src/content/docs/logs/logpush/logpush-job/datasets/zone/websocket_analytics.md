---
# Code generator. DO NOT EDIT.

title: WebSocket Analytics
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `websocket_analytics`.

## BytesReceivedClient

Type: `int`

Number of bytes received from the client.

## BytesReceivedOrigin

Type: `int`

Number of bytes received from the origin.

## BytesSentClient

Type: `int`

Number of bytes sent to the client.

## BytesSentOrigin

Type: `int`

Number of bytes sent to the origin.

## ClientASN

Type: `int`

The client's autonomous system number (ASN).

## ClientIP

Type: `string`

The client IP address.

## ClientRequestHost

Type: `string`

The host requested by the client in the WebSocket upgrade request.

## ClientRequestPath

Type: `string`

The path requested by the client in the WebSocket upgrade request.

## ClientRequestUserAgent

Type: `string`

The user agent reported by the client.

## ColoCode

Type: `string`

IATA airport code of the data center that handled the connection.

## ConnectionCloseReason

Type: `string`

The reason the WebSocket connection ended. <br />Possible values are <em>none</em> \| <em>unspecifiedError</em> \| <em>timedOut</em> \| <em>peerReset</em> \| <em>upstreamReset</em> \| <em>protocolViolation</em> \| <em>peerNoError</em>.

## ConnectionCloseSource

Type: `string`

Which side initiated the connection close. <br />Possible values are <em>upstream</em> \| <em>downstream</em> \| <em>me</em> \| <em>both</em>, or the raw internal value if unrecognized.

## ConnectionID

Type: `string`

Unique identifier of the WebSocket connection, hex-encoded.

## ConnectionTransportCloseCode

Type: `int`

The first transport-level close code observed. For TLS connections this is the TLS alert code; for plain TCP connections (no TLS) it is always 0. The most significant bit indicates the source: 0 = proxy-initiated, 1 = eyeball-initiated.

## EdgeEndTimestamp

Type: `int or string`

Timestamp at which the WebSocket connection closed. To specify the timestamp format, refer to [Output types](/logs/logpush/logpush-job/log-output-options/#output-types).

## EdgeStartTimestamp

Type: `int or string`

Timestamp at which the WebSocket connection was established. To specify the timestamp format, refer to [Output types](/logs/logpush/logpush-job/log-output-options/#output-types).

## RayID

Type: `string`

The Ray ID of the WebSocket upgrade request.
