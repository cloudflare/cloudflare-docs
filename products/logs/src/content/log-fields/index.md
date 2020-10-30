---
title: Log fields
order: 50
---

# Log fields

The tables below describe the fields available by log category. The list of fields is also accessible directly from the API:
`https://api.cloudflare.com/client/v4/zones/<zone_id>/logpush/datasets/<dataset>/fields`, where the `dataset` argument indicates the log category (either `http_requests`, `spectrum_events`, or `firewall_events`).

## HTTP requests

<TableWrap>

| Field | Value | Type |
| -- | -- | -- |
| BotScore | Cloudflare Bot Score (available for Bot Management customers; please contact your account team to enable) | int |
| BotScoreSrc | Underlying detection engine or <em>source</em> on where a Bot Score is calculated.<br /> Possible values are <em>Not Computed</em> \| <em>Heuristics</em> \| <em>Machine Learning</em> \| <em>Behavioral Analysis</em> \| <em>Verified Bot</em> | string |
| CacheCacheStatus | <em>unknown</em> \| <em>miss</em> \| <em>expired</em> \| <em>updating</em> \| <em>stale</em> \| <em>hit</em> \| <em>ignored</em> \| <em>bypass</em> \| <em>revalidated</em> | string |
| CacheResponseBytes | Number of bytes returned by the cache | int |
| CacheResponseStatus | HTTP status code returned by the cache to the edge; all requests (including non-cacheable ones) go through the cache; also see CacheStatus field | int |
| CacheTieredFill | Tiered Cache was used to serve this request | bool |
| ClientASN | Client AS number | int |
| ClientCountry | Country of the client IP address | string |
| ClientDeviceType | Client device type | string |
| ClientIP | IP address of the client | string |
| ClientIPClass | <em>unknown</em> \| <em>clean</em> \| <em>badHost</em> \| <em>searchEngine</em> \| <em>whitelist</em> \| <em>greylist</em> \| <em>monitoringService</em> \| <em>securityScanner</em> \| <em>noRecord</em> \| <em>scan</em> \| <em>backupService</em> \| <em>mobilePlatform</em> \| <em>tor</em> | string |
| ClientRequestBytes | Number of bytes in the client request | int |
| ClientRequestHost | Host requested by the client | string |
| ClientRequestMethod | HTTP method of client request | string |
| ClientRequestPath | URI path requested by the client | string |
| ClientRequestProtocol | HTTP protocol of client request | string |
| ClientRequestReferer | HTTP request referrer | string |
| ClientRequestURI | URI requested by the client | string |
| ClientRequestUserAgent | User agent reported by the client | string |
| ClientSSLCipher | Client SSL cipher | string |
| ClientSSLProtocol | Client SSL (TLS) protocol | string |
| ClientSrcPort | Client source port | int |
| ClientXRequestedWith | X-Requested-With HTTP header | string |
| EdgeColoCode | IATA airport code of data center that received the request | string |
| EdgeColoID | Cloudflare edge colo id | int |
| EdgeEndTimestamp | Timestamp at which the edge finished sending response to the client | int or string |
| EdgePathingOp | Indicates what type of response was issued for this request (unknown = no specific action) | string |
| EdgePathingSrc | Details how the request was classified based on security checks (unknown = no specific classification) | string |
| EdgePathingStatus | Indicates what data was used to determine the handling of this request (unknown = no data) | string |
| EdgeRateLimitAction | The action taken by the blocking rule; empty if no action taken | string |
| EdgeRateLimitID | The internal rule ID of the rate-limiting rule that triggered a block (ban) or simulate action. 0 if no action taken | int |
| EdgeRequestHost | Host header on the request from the edge to the origin | string |
| EdgeResponseBytes | Number of bytes returned by the edge to the client | int |
| EdgeResponseCompressionRatio | Edge response compression ratio | float |
| EdgeResponseContentType | Edge response Content-Type header value | string |
| EdgeResponseStatus | HTTP status code returned by Cloudflare to the client | int |
| EdgeServerIP | IP of the edge server making a request to the origin | string |
| EdgeStartTimestamp | Timestamp at which the edge received request from the client | int or string |
| FirewallMatchesActions | Array of actions the Cloudflare firewall products performed on this request. The individual firewall products associated with this action be found in FirewallMatchesSources and their respective RuleIds can be found in FirewallMatchesRuleIDs. The length of the array is the same as FirewallMatchesRuleIDs and FirewallMatchesSources.<br /> Possible actions are <em>allow</em> \| <em>log</em> \| <em>simulate</em> \| <em>drop</em> \| <em>challenge</em> \| <em>jschallenge</em> \| <em>connectionClose</em> \| <em>bypass</em> | array[string] |
| FirewallMatchesRuleIDs | Array of RuleIDs of the firewall product that has matched the request. The firewall product associated with the RuleID can be found in FirewallMatchesSources. The length of the array is the same as FirewallMatchesActions and FirewallMatchesSources. | array[string] |
| FirewallMatchesSources | The firewall products that matched the request. The same product can appear multiple times, which indicates different rules or actions that were activated. The RuleIDs can be found in FirewallMatchesRuleIDs, the actions can be found in FirewallMatchesActions. The length of the array is the same as FirewallMatchesRuleIDs and FirewallMatchesActions.<br /> Possible sources are <em>asn</em> \| <em>country</em> \| <em>ip</em> \| <em>ipRange</em> \| <em>securityLevel</em> \| <em>zoneLockdown</em> \| <em>waf</em> \| <em>firewallRules</em> \| <em>uaBlock</em> \| <em>rateLimit</em> \| <em>bic</em> \| <em>hot</em> \| <em>l7ddos</em> \| <em>sanitycheck</em> \| <em>protect</em> | array[string] |
| OriginIP | IP of the origin server | string |
| OriginResponseBytes (deprecated) | Number of bytes returned by the origin server | int |
| OriginResponseHTTPExpires | Value of the origin 'expires' header in RFC1123 format | string |
| OriginResponseHTTPLastModified | Value of the origin 'last-modified' header in RFC1123 format | string |
| OriginResponseStatus | Status returned by the origin server | int |
| OriginResponseTime | Number of nanoseconds it took the origin to return the response to edge | int |
| OriginSSLProtocol | SSL (TLS) protocol used to connect to the origin | string |
| ParentRayID | Ray ID of the parent request if this request was made using a Worker script | string |
| RayID | ID of the request | string |
| SecurityLevel | The security level configured at the time of this request. This is used to determine the sensitivity of the IP Reputation system. | string |
| WAFAction | Action taken by the WAF, if triggered | string |
| WAFFlags | Additional configuration flags: <em>simulate (0x1)</em> \| <em>null</em> | string |
| WAFMatchedVar | The full name of the most-recently matched variable | string |
| WAFProfile | <em>low</em> \| <em>med</em> \| <em>high</em> | string |
| WAFRuleID | ID of the applied WAF rule | string |
| WAFRuleMessage | Rule message associated with the triggered rule | string |
| WorkerCPUTime | Amount of time in microseconds spent executing a worker, if any | int |
| WorkerStatus | Status returned from worker daemon | string |
| WorkerSubrequest | Whether or not this request was a worker subrequest | bool |
| WorkerSubrequestCount | Number of subrequests issued by a worker when handling this request | int |
| ZoneID | Internal zone ID | int |

</TableWrap>


## Spectrum events

<TableWrap>

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

</TableWrap>


## Firewall events

<TableWrap>

| Field | Value | Type |
| -- | -- | -- |
| Action | The code of the first-class action the Cloudflare Firewall took on this request | string |
| ClientASN | The ASN number of the visitor | int |
| ClientASNDescription | The ASN of the visitor as string | string |
| ClientCountry | Country from which request originated | string |
| ClientIP | The visitor's IP address (IPv4 or IPv6) | string |
| ClientIPClass | The classification of the visitor's IP address, possible values are: <em>unknown</em> \| <em>clean</em> \| <em>badHost</em> \| <em>searchEngine</em> \| <em>whitelist</em> \| <em>greylist</em> \| <em>monitoringService</em> \| <em>securityScanner</em> \| <em>noRecord</em> \| <em>scan</em> \| <em>backupService</em> \| <em>mobilePlatform</em> \| <em>tor</em> | string |
| ClientRefererHost | The referer host | string |
| ClientRefererPath | The referer path requested by visitor | string |
| ClientRefererQuery | The referer query-string was requested by the visitor | string |
| ClientRefererScheme | The referer url scheme requested by the visitor | string |
| ClientRequestHost | The HTTP hostname requested by the visitor | string |
| ClientRequestMethod | The HTTP method used by the visitor | string |
| ClientRequestPath | The path requested by visitor | string |
| ClientRequestProtocol | The version of HTTP protocol requested by the visitor | string |
| ClientRequestQuery | The query-string was requested by the visitor | string |
| ClientRequestScheme | The url scheme requested by the visitor | string |
| ClientRequestUserAgent | Visitor's user-agent string | string |
| Datetime | The date and time the event occurred at the edge | int or string |
| EdgeColoCode | The airport code of the Cloudflare datacenter that served this request | string |
| EdgeResponseStatus | HTTP response status code returned to browser | int |
| Kind | The kind of event, currently only possible values are: <em>firewall</em> | string |
| MatchIndex | Rules match index in the chain | int |
| Metadata | Additional product-specific information. Metadata is organized in key:value pairs. Key and Value formats can vary by Cloudflare security product and can change over time | object |
| OriginResponseStatus | HTTP origin response status code returned to browser | int |
| OriginatorRayID | The RayID of the request that issued the challenge/jschallenge | string |
| RayID | The RayID of the request | string |
| RuleID | The Cloudflare security product-specific RuleID triggered by this request | string |
| Source | The Cloudflare security product triggered by this request | string |

</TableWrap>
