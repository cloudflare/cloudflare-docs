| Field | Value | Type |
| -- | -- | -- |
| Application | The unique public ID of the application on which the event occurred | string |
| ClientAsn | Client AS number | int |
| ClientBytes | The number of bytes read from the client by the Spectrum service | int |
| ClientCountry | Country of the client IP address | string |
| ClientIP | Client IP address | string |
| ClientMatchedIpFirewall | Whether the connection matched any IP Firewall rules; <em>UNKNOWN</em> \| <em>ALLOW</em> \| <em>BLOCK_ERROR</em> \| <em>BLOCK_IP</em> \| <em>BLOCK_COUNTRY</em> \| <em>BLOCK_ASN</em> \| <em>WHITELIST_IP</em> \| <em>WHITELIST_COUNTRY</em> \| <em>WHITELIST_ASN</em> | string |
| ClientPort | Client port | int |
| ClientProto | Transport protocol used by client; <em>tcp</em> \| <em>udp</em> \| <em>unix</em> | string |
| ClientTcpRtt | The TCP round-trip time in nanoseconds between the client and Spectrum | int |
| ClientTlsCipher | The cipher negotiated between the client and Spectrum | string |
| ClientTlsClientHelloServerName | The server name in the Client Hello message from client to Spectrum | string |
| ClientTlsProtocol | The TLS version negotiated between the client and Spectrum; <em>unknown</em> \| <em>none</em> \| <em>SSLv3</em> \| <em>TLSv1</em> \| <em>TLSv1.1</em> \| <em>TLSv1.2</em> \| <em>TLSv1.3</em> | string |
| ClientTlsStatus | Indicates state of TLS session from the client to Spectrum; <em>UNKNOWN</em> \| <em>OK</em> \| <em>INTERNAL_ERROR</em> \| <em>INVALID_CONFIG</em> \| <em>INVALID_SNI</em> \| <em>HANDSHAKE_FAILED</em> \| <em>KEYLESS_RPC</em> | string |
| ColoCode | IATA airport code of data center that received the request | string |
| ConnectTimestamp | Timestamp at which both legs of the connection (client/edge, edge/origin or nexthop) were established | int or string |
| DisconnectTimestamp | Timestamp at which the connection was closed | int or string |
| Event | <em>connect</em> \| <em>disconnect</em> \| <em>clientFiltered</em> \| <em>tlsError</em> \| <em>resolveOrigin</em> \| <em>originError</em> | string |
| IpFirewall | Whether IP Firewall was enabled at time of connection | bool |
| OriginBytes | The number of bytes read from the origin by Spectrum | int |
| OriginIP | Origin IP address | string |
| OriginPort | Origin port | int |
| OriginProto | Transport protocol used by origin; <em>tcp</em> \| <em>udp</em> \| <em>unix</em> | string |
| OriginTcpRtt | The TCP round-trip time in nanoseconds between Spectrum and the origin | int |
| OriginTlsCipher | The cipher negotiated between Spectrum and the origin | string |
| OriginTlsFingerprint | SHA256 hash of origin certificate | string |
| OriginTlsMode | If and how the upstream connection is encrypted; <em>unknown</em> \| <em>off</em> \| <em>flexible</em> \| <em>full</em> \| <em>strict</em> | string |
| OriginTlsProtocol | The TLS version negotiated between Spectrum and the origin; <em>unknown</em> \| <em>none</em> \| <em>SSLv3</em> \| <em>TLSv1</em> \| <em>TLSv1.1</em> \| <em>TLSv1.2</em> \| <em>TLSv1.3</em> | string |
| OriginTlsStatus | The state of the TLS session from Spectrum to the origin; <em>UNKNOWN</em> \| <em>OK</em> \| <em>INTERNAL_ERROR</em> \| <em>INVALID_CONFIG</em> \| <em>INVALID_SNI</em> \| <em>HANDSHAKE_FAILED</em> \| <em>KEYLESS_RPC</em> | string |
| ProxyProtocol | Which form of proxy protocol is applied to the given connection; <em>off</em> \| <em>v1</em> \| <em>v2</em> \| <em>simple</em> | string |
| Status | A code indicating reason for connection closure | int |
| Timestamp | Timestamp at which the event took place | int or string |
