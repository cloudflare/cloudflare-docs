---
# Code generator. DO NOT EDIT.

title: Spectrum events
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `spectrum_events`.

## Application

Type: `string`

The unique public ID of the application on which the event occurred.

## ClientAsn

Type: `int`

Client AS number.

## ClientBytes

Type: `int`

The number of bytes read from the client by the Spectrum service.

## ClientCountry

Type: `string`

Country of the client IP address.

## ClientIP

Type: `string`

Client IP address.

## ClientMatchedIpFirewall

Type: `string`

Whether the connection matched any IP Firewall rules. UNKNOWN = No match or Firewall not enabled for spectrum; <em>UNKNOWN</em> \| <em>ALLOW</em> \| <em>BLOCK_ERROR</em> \| <em>BLOCK_IP</em> \| <em>BLOCK_COUNTRY</em> \| <em>BLOCK_ASN</em> \| <em>WHITELIST_IP</em> \| <em>WHITELIST_COUNTRY</em> \| <em>WHITELIST_ASN</em>.

## ClientPort

Type: `int`

Client port.

## ClientProto

Type: `string`

Transport protocol used by client; <em>tcp</em> \| <em>udp</em> \| <em>unix</em>.

## ClientTcpRtt

Type: `int`

The TCP round-trip time in nanoseconds between the client and Spectrum.

## ClientTlsCipher

Type: `string`

The cipher negotiated between the client and Spectrum. An unknown cipher is returned as "UNK."

## ClientTlsClientHelloServerName

Type: `string`

The server name in the Client Hello message from client to Spectrum.

## ClientTlsProtocol

Type: `string`

The TLS version negotiated between the client and Spectrum; <em>unknown</em> \| <em>none</em> \| <em>SSLv3</em> \| <em>TLSv1</em> \| <em>TLSv1.1</em> \| <em>TLSv1.2</em> \| <em>TLSv1.3</em>.

## ClientTlsStatus

Type: `string`

Indicates state of TLS session from the client to Spectrum; <em>UNKNOWN</em> \| <em>OK</em> \| <em>INTERNAL_ERROR</em> \| <em>INVALID_CONFIG</em> \| <em>INVALID_SNI</em> \| <em>HANDSHAKE_FAILED</em> \| <em>KEYLESS_RPC</em>.

## ColoCode

Type: `string`

IATA airport code of data center that received the request.

## ConnectTimestamp

Type: `int or string`

Timestamp at which both legs of the connection (client/edge, edge/origin or nexthop) were established.

## DisconnectTimestamp

Type: `int or string`

Timestamp at which the connection was closed.

## Event

Type: `string`

<em>connect</em> \| <em>disconnect</em> \| <em>clientFiltered</em> \| <em>tlsError</em> \| <em>resolveOrigin</em> \| <em>originError</em>.

## IpFirewall

Type: `bool`

Whether IP Firewall was enabled at time of connection.

## OriginBytes

Type: `int`

The number of bytes read from the origin by Spectrum.

## OriginIP

Type: `string`

Origin IP address.

## OriginPort

Type: `int`

Origin port.

## OriginProto

Type: `string`

Transport protocol used by origin; <em>tcp</em> \| <em>udp</em> \| <em>unix</em>.

## OriginTcpRtt

Type: `int`

The TCP round-trip time in nanoseconds between Spectrum and the origin.

## OriginTlsCipher

Type: `string`

The cipher negotiated between Spectrum and the origin. An unknown cipher is returned as "UNK."

## OriginTlsFingerprint

Type: `string`

SHA256 hash of origin certificate. An unknown SHA256 hash is returned as an empty string.

## OriginTlsMode

Type: `string`

If and how the upstream connection is encrypted; <em>unknown</em> \| <em>off</em> \| <em>flexible</em> \| <em>full</em> \| <em>strict</em>.

## OriginTlsProtocol

Type: `string`

The TLS version negotiated between Spectrum and the origin; <em>unknown</em> \| <em>none</em> \| <em>SSLv3</em> \| <em>TLSv1</em> \| <em>TLSv1.1</em> \| <em>TLSv1.2</em> \| <em>TLSv1.3</em>.

## OriginTlsStatus

Type: `string`

The state of the TLS session from Spectrum to the origin; <em>UNKNOWN</em> \| <em>OK</em> \| <em>INTERNAL_ERROR</em> \| <em>INVALID_CONFIG</em> \| <em>INVALID_SNI</em> \| <em>HANDSHAKE_FAILED</em> \| <em>KEYLESS_RPC</em>.

## ProxyProtocol

Type: `string`

Which form of proxy protocol is applied to the given connection; <em>off</em> \| <em>v1</em> \| <em>v2</em> \| <em>simple</em>.

## Status

Type: `int`

A code indicating reason for connection closure.

## Timestamp

Type: `int or string`

Timestamp at which the event took place.
