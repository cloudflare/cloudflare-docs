---
# Code generator. DO NOT EDIT.

title: Zero Trust Network Session Logs
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `zero_trust_network_sessions`.

## AccountID

Type: `string`

Cloudflare account ID.

## BytesReceived

Type: `int`

The number of bytes sent from the origin to the client during the network session.

## BytesSent

Type: `int`

The number of bytes sent from the client to the origin during the network session.

## ClientTCPHandshakeDurationMs

Type: `int`

Duration of handshaking the TCP connection between the client and Cloudflare in milliseconds.

## ClientTLSCipher

Type: `string`

TLS cipher suite used in the connection between the client and Cloudflare.

## ClientTLSHandshakeDurationMs

Type: `int`

Duration of handshaking the TLS connection between the client and Cloudflare in milliseconds.

## ClientTLSVersion

Type: `string`

TLS protocol version used in the connection between the client and Cloudflare.

## ConnectionCloseReason

Type: `string`

The reason for closing the connection, only applicable for TCP. <br />Possible values are <em>CLIENT_CLOSED</em> \| <em>CLIENT_IDLE_TIMEOUT</em> \| <em>CLIENT_TLS_ERROR</em> \| <em>CLIENT_ERROR</em> \| <em>ORIGIN_CLOSED</em> \| <em>ORIGIN_TLS_ERROR</em> \| <em>ORIGIN_ERROR</em> \| <em>ORIGIN_UNREACHABLE</em> \| <em>ORIGIN_UNROUTABLE</em> \| <em>PROXY_CONN_REFUSED</em> \| <em>UNKNOWN</em> \| <em>MISMATCHED_IP_VERSIONS</em> \| <em>TOO_MANY_ACTIVE_SESSIONS_FOR_ACCOUNT</em> \| <em>TOO_MANY_ACTIVE_SESSIONS_FOR_USER</em> \| <em>TOO_MANY_NEW_SESSIONS_FOR_ACCOUNT</em> \| <em>TOO_MANY_NEW_SESSIONS_FOR_USER</em>.

## ConnectionReuse

Type: `bool`

Whether the TCP connection was reused for multiple HTTP requests.

## DestinationTunnelID

Type: `string`

Identifier of the Cloudflare One connector to which the network session was routed to, if any, such as Cloudflare Tunnel or WARP device.

## DetectedProtocol

Type: `string`

Detected traffic protocol of the network session.

## DeviceID

Type: `string`

Identifier of the client device which initiated the network session, if applicable, (for example, WARP Device ID).

## DeviceName

Type: `string`

Name of the client device which initiated the network session, if applicable, (for example, WARP Device ID).

## EgressColoName

Type: `string`

The name of the Cloudflare colo from which traffic egressed to the origin.

## EgressIP

Type: `string`

Source IP used when egressing traffic from Cloudflare to the origin.

## EgressPort

Type: `int`

Source port used when egressing traffic from Cloudflare to the origin.

## EgressRuleID

Type: `string`

Identifier of the egress rule that was applied by the Secure Web Gateway, if any.

## EgressRuleName

Type: `string`

The name of the egress rule that was applied by the Secure Web Gateway, if any.

## Email

Type: `string`

Email address associated with the user identity which initiated the network session.

## IngressColoName

Type: `string`

The name of the Cloudflare colo to which traffic ingressed.

## Offramp

Type: `string`

The type of destination to which the network session was routed. <br />Possible values are <em>INTERNET</em> \| <em>MAGIC</em> \| <em>CFD_TUNNEL</em> \| <em>WARP</em>.

## OriginIP

Type: `string`

The IP of the destination ("origin") for the network session.

## OriginPort

Type: `int`

The port of the destination origin for the network session.

## OriginTLSCertificateIssuer

Type: `string`

The issuer of the origin TLS certificate.

## OriginTLSCertificateValidationResult

Type: `string`

The result of validating the TLS certificate of the origin. <br />Possible values are <em>VALID</em> \| <em>EXPIRED</em> \| <em>REVOKED</em> \| <em>HOSTNAME_MISMATCH</em> \| <em>NONE</em> \| <em>UNKNOWN</em>.

## OriginTLSCipher

Type: `string`

TLS cipher suite used in the connection between Cloudflare and the origin.

## OriginTLSHandshakeDurationMs

Type: `int`

Duration of handshaking the TLS connection between Cloudflare and the origin in milliseconds.

## OriginTLSVersion

Type: `string`

TLS protocol version used in the connection between Cloudflare and the origin.

## Protocol

Type: `string`

Network protocol used for this network session. <br />Possible values are <em>TCP</em> \| <em>UDP</em> \| <em>ICMP</em> \| <em>ICMPV6</em>.

## RuleEvaluationDurationMs

Type: `int`

The duration taken by Secure Web Gateway applying applicable Network, HTTP, and Egress rules to the network session in milliseconds.

## SessionEndTime

Type: `int or string`

The network session end timestamp with nanosecond precision.

## SessionID

Type: `string`

The identifier of this network session.

## SessionStartTime

Type: `int or string`

The network session start timestamp with nanosecond precision.

## SourceIP

Type: `string`

Source IP of the network session.

## SourceInternalIP

Type: `string`

Local LAN IP of the device. Only available when connected via a GRE/IPsec tunnel on-ramp.

## SourcePort

Type: `int`

Source port of the network session.

## UserID

Type: `string`

User identity where the network session originated from. Only applicable for WARP device clients.

## VirtualNetworkID

Type: `string`

Identifier of the virtual network configured for the client.
