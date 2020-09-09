---
title: Log fields
alwaysopen: true
weight: 50
---

The tables below describe the fields available by log category. The list of fields is also accessible directly from the API:
`https://api.cloudflare.com/client/v4/zones/<zone_id>/logpush/datasets/<dataset>/fields`, where the `dataset` argument indicates the log category (either `http_requests`, `spectrum_events`, or `firewall_events`).

- [HTTP requests](#http-requests)
- [Spectrum events](#spectrum-events)
- [Firewall events](#firewall-events)

---

<a id="http-requests" style="color: inherit">

### HTTP requests
</a>

<table style="border: solid 2px darkgrey; width: 75%;">
    <thead style="background: #ffeadf;">
        <tr>
            <th>Field</th>
            <th>Value</th>
            <th>Type</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>BotScore</td>
            <td>Cloudflare Bot Score (available for Bot Management customers; please contact your account team to enable)</td>
            <td>int</td>
        </tr>
        <tr>
            <td>BotScoreSrc</td>
            <td>
                Underlying detection engine or <em>source</em> on where a Bot Score is calculated. <br />
                Possible values are <em>Not Computed</em> | <em>Heuristics</em> | <em>Machine Learning</em> | <em>Behavioral Analysis</em> | <em>Verified Bot</em>
            </td>
            <td>string</td>
        </tr>
        <tr>
            <td>CacheCacheStatus</td>
            <td><em>unknown </em>| <em>miss</em> | <em>expired </em>|<em> updating </em>| <em>stale</em> |<em> hit </em>|<em> ignored </em>|<em> bypass</em> |<em> revalidated</em></td>
            <td>string</td>
        </tr>
        <tr>
            <td>CacheResponseBytes</td>
            <td>Number of bytes returned by the cache</td>
            <td>int</td>
        </tr>
        <tr>
            <td>CacheResponseStatus</td>
            <td><div>HTTP status code returned by the cache to the edge; all requests (including non-cacheable ones) go through the cache; also see CacheStatus field</div></td>
            <td>int</td>
        </tr>
        <tr>
            <td>CacheTieredFill</td>
            <td>Tiered Cache was used to serve this request</td>
            <td>bool</td>
        </tr>
        <tr>
            <td>ClientASN</td>
            <td>Client AS number</td>
            <td>int</td>
        </tr>
        <tr>
            <td>ClientCountry</td>
            <td>Country of the client IP address</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientDeviceType</td>
            <td>Client device type</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientIP</td>
            <td>IP address of the client</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientIPClass</td>
            <td>
                <div>
                    <em>unknown</em> | <em>clean</em> | <em>badHost</em> | <em>searchEngine</em> | <em>whitelist</em> | <em>greylist</em> | <em>monitoringService</em> | <em>securityScanner</em> | <em>noRecord</em> | <em>scan</em> |
                    <em>backupService</em> | <em>mobilePlatform</em> | <em>tor</em>
                </div>
            </td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRequestBytes</td>
            <td>Number of bytes in the client request</td>
            <td>int</td>
        </tr>
        <tr>
            <td>ClientRequestHost</td>
            <td>Host requested by the client</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRequestMethod</td>
            <td>HTTP method of client request</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRequestPath</td>
            <td>URI path requested by the client</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRequestProtocol</td>
            <td>HTTP protocol of client request</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRequestReferer</td>
            <td>HTTP request referrer</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRequestURI</td>
            <td>URI requested by the client</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRequestUserAgent</td>
            <td>User agent reported by the client</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientSSLCipher</td>
            <td>Client SSL cipher</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientSSLProtocol</td>
            <td>Client SSL (TLS) protocol</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientSrcPort</td>
            <td>Client source port</td>
            <td>int</td>
        </tr>
        <tr>
            <td>ClientXRequestedWith</td>
            <td>X-Requested-With HTTP header</td>
            <td>string</td>
        </tr>
        <tr>
            <td>EdgeColoCode</td>
            <td>IATA airport code of data center that received the request</td>
            <td>string</td>
        </tr>
        <tr>
            <td>EdgeColoID</td>
            <td>Cloudflare edge colo id</td>
            <td>int</td>
        </tr>
        <tr>
            <td>EdgeEndTimestamp</td>
            <td>Timestamp at which the edge finished sending response to the client</td>
            <td>int or string</td>
        </tr>
        <tr>
            <td>EdgePathingOp</td>
            <td>Indicates what type of response was issued for this request (unknown = no specific action)</td>
            <td>string</td>
        </tr>
        <tr>
            <td>EdgePathingSrc</td>
            <td>Details how the request was classified based on security checks (unknown = no specific classification)</td>
            <td>string</td>
        </tr>
        <tr>
            <td>EdgePathingStatus</td>
            <td>Indicates what data was used to determine the handling of this request (unknown = no data)</td>
            <td>string</td>
        </tr>
        <tr>
            <td>EdgeRateLimitAction</td>
            <td>The action taken by the blocking rule; empty if no action taken</td>
            <td>string</td>
        </tr>
        <tr>
            <td>EdgeRateLimitID</td>
            <td>The internal rule ID of the rate-limiting rule that triggered a block (ban) or simulate action. 0 if no action taken</td>
            <td>int</td>
        </tr>
        <tr>
            <td>EdgeRequestHost</td>
            <td>Host header on the request from the edge to the origin</td>
            <td>string</td>
        </tr>
        <tr>
            <td>EdgeResponseBytes</td>
            <td>Number of bytes returned by the edge to the client</td>
            <td>int</td>
        </tr>
        <tr>
            <td>EdgeResponseCompressionRatio</td>
            <td>Edge response compression ratio</td>
            <td>float</td>
        </tr>
        <tr>
            <td>EdgeResponseContentType</td>
            <td>Edge response Content-Type header value</td>
            <td>string</td>
        </tr>
        <tr>
            <td>EdgeResponseStatus</td>
            <td>HTTP status code returned by Cloudflare to the client</td>
            <td>int</td>
        </tr>
        <tr>
            <td>EdgeServerIP</td>
            <td>IP of the edge server making a request to the origin</td>
            <td>string</td>
        </tr>
        <tr>
            <td>EdgeStartTimestamp</td>
            <td>Timestamp at which the edge received request from the client</td>
            <td>int or string</td>
        </tr>
        <tr>
            <td>FirewallMatchesActions</td>
            <td>
                Array of actions the Cloudflare firewall products performed on this request. The individual firewall products associated with this action be found in FirewallMatchesSources and their respective RuleIds can be found in
                FirewallMatchesRuleIDs. The length of the array is the same as FirewallMatchesRuleIDs and FirewallMatchesSources. <br />
                Possible actions are <em>allow</em> | <em>log</em> | <em>simulate</em> | <em>drop</em> | <em>challenge</em> | <em>jschallenge</em> | <em>connectionClose</em> | <em>challengeSolved</em> | <em>challengeFailed</em> |
                <em> challengeBypassed </em> | <em>jschallengeSolved</em> | <em> jschallengeFailed </em> | <em>jschallengeBypassed</em> | <em>bypass</em>
            </td>
            <td>array of actions (strings)</td>
        </tr>
        <tr>
            <td>FirewallMatchesRuleIDs</td>
            <td>
                Array of RuleIDs of the firewall product that has matched the request. The firewall product associated with the RuleID can be found in FirewallMatchesSources. The length of the array is the same as FirewallMatchesActions and
                FirewallMatchesSources.
            </td>
            <td>array of RuleIDs (strings)</td>
        </tr>
        <tr>
            <td>FirewallMatchesSources</td>
            <td>
                The firewall products that matched the request. The same product can appear multiple times, which indicates different rules or actions that were activated. The RuleIDs can be found in FirewallMatchesRuleIDs, the actions can
                be found in FirewallMatchesActions. The length of the array is the same as FirewallMatchesRuleIDs and FirewallMatchesActions.<br />
                Possible sources are <em>asn</em> | <em>country</em> | <em>ip</em> | <em>ipRange</em> | <em>securityLevel</em> | <em>zoneLockdown</em> | <em>waf</em> | <em>firewallRules</em> | <em>uaBlock</em> | <em>rateLimit</em> |
                <em>bic</em> | <em>hot</em> | <em>l7ddos</em> | <em>sanitycheck</em> | <em>protect</em>
            </td>
            <td>array of product names (strings)</td>
        </tr>
        <tr>
            <td>OriginIP</td>
            <td>IP of the origin server</td>
            <td>string</td>
        </tr>
        <tr>
            <td>OriginResponseBytes (deprecated)</td>
            <td>Number of bytes returned by the origin server</td>
            <td>int</td>
        </tr>
        <tr>
            <td>OriginResponseHTTPExpires</td>
            <td>Value of the origin 'expires' header in RFC1123 format</td>
            <td>string</td>
        </tr>
        <tr>
            <td>OriginResponseHTTPLastModified</td>
            <td>Value of the origin 'last-modified' header in RFC1123 format</td>
            <td>string</td>
        </tr>
        <tr>
            <td>OriginResponseStatus</td>
            <td>Status returned by the origin server</td>
            <td>int</td>
        </tr>
        <tr>
            <td>OriginResponseTime</td>
            <td>Number of nanoseconds it took the origin to return the response to edge</td>
            <td>int</td>
        </tr>
        <tr>
            <td>OriginSSLProtocol</td>
            <td>SSL (TLS) protocol used to connect to the origin</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ParentRayID</td>
            <td>Ray ID of the parent request if this request was made using a Worker script</td>
            <td>string</td>
        </tr>
        <tr>
            <td>RayID</td>
            <td>ID of the request</td>
            <td>string</td>
        </tr>
        <tr>
            <td>SecurityLevel</td>
            <td>The security level configured at the time of this request. This is used to determine the sensitivity of the IP Reputation system</td>
            <td>string</td>
        </tr>
        <tr>
            <td>WAFAction</td>
            <td>Action taken by the WAF, if triggered</td>
            <td>string</td>
        </tr>
        <tr>
            <td>WAFFlags</td>
            <td>Additional configuration flags: <em>simulate (0x1)</em> | <em>null</em></td>
            <td>string</td>
        </tr>
        <tr>
            <td>WAFMatchedVar</td>
            <td>The full name of the most-recently matched variable</td>
            <td>string</td>
        </tr>
        <tr>
            <td>WAFProfile</td>
            <td><em>low</em> | <em>med</em> | <em>high</em></td>
            <td>string</td>
        </tr>
        <tr>
            <td>WAFRuleID</td>
            <td>ID of the applied WAF rule</td>
            <td>string</td>
        </tr>
        <tr>
            <td>WAFRuleMessage</td>
            <td>Rule message associated with the triggered rule</td>
            <td>string</td>
        </tr>
        <tr>
            <td>WorkerCPUTime</td>
            <td>Amount of time in microseconds spent executing a worker, if any</td>
            <td>int</td>
        </tr>
        <tr>
            <td>WorkerStatus</td>
            <td>Status returned from worker daemon</td>
            <td>string</td>
        </tr>
        <tr>
            <td>WorkerSubrequest</td>
            <td>Whether or not this request was a worker subrequest</td>
            <td>bool</td>
        </tr>
        <tr>
            <td>WorkerSubrequestCount</td>
            <td>Number of subrequests issued by a worker when handling this request</td>
            <td>int</td>
        </tr>
        <tr>
            <td>ZoneID</td>
            <td>Internal zone ID</td>
            <td>int</td>
        </tr>
    </tbody>
</table>

----

<a id="spectrum-events" style="color: inherit">

### Spectrum events
</a>

<table style="border: solid 2px darkgrey; width: 75%;">
    <thead style="background: #ffeadf;">
        <tr>
            <th>Field</th>
            <th>Value</th>
            <th>Type</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Application</td>
            <td>The unique public ID of the application on which the event occurred</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientAsn</td>
            <td>Client AS number</td>
            <td>int</td>
        </tr>
        <tr>
            <td>ClientBytes</td>
            <td>The number of bytes read from the client by the Spectrum service</td>
            <td>int</td>
        </tr>
        <tr>
            <td>ClientCountry</td>
            <td>Country of the client IP address</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientIP</td>
            <td>Client IP address</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientMatchedIpFirewall</td>
            <td>
                <div>
                    Whether the connection matched any IP Firewall rules; <em>UNKNOWN</em> | <em>ALLOW</em> | <em>BLOCK_ERROR</em> | <em>BLOCK_IP</em> | <em>BLOCK_COUNTRY</em> | <em>BLOCK_ASN</em> | <em>WHITELIST_IP</em> |
                    <em>WHITELIST_COUNTRY</em> | <em>WHITELIST_ASN</em>
                </div>
            </td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientPort</td>
            <td>Client port</td>
            <td>int</td>
        </tr>
        <tr>
            <td>ClientProto</td>
            <td>
                <div>Transport protocol used by client; <em>tcp</em> | <em>udp</em> | <em>unix</em></div>
            </td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientTcpRtt</td>
            <td>The TCP round-trip time in nanoseconds between the client and Spectrum</td>
            <td>int</td>
        </tr>
        <tr>
            <td>ClientTlsCipher</td>
            <td>The cipher negotiated between the client and Spectrum</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientTlsClientHelloServerName</td>
            <td>The server name in the Client Hello message from client to Spectrum</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientTlsProtocol</td>
            <td>
                <div>The TLS version negotiated between the client and Spectrum; <em>unknown</em> | <em>none</em> | <em>SSLv3</em> | <em>TLSv1</em> | <em>TLSv1.1</em> | <em>TLSv1.2</em> | <em>TLSv1.3</em></div>
            </td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientTlsStatus</td>
            <td>
                <div>
                    Indicates state of TLS session from the client to Spectrum; <em>UNKNOWN</em> | <em>OK</em> | <em>INTERNAL_ERROR</em> | <em>INVALID_CONFIG</em> | <em>INVALID_SNI</em> | <em>HANDSHAKE_FAILED</em> | <em>KEYLESS_RPC</em>
                </div>
            </td>
            <td>string</td>
        </tr>
        <tr>
            <td>ColoCode</td>
            <td>IATA airport code of data center that received the request</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ConnectTimestamp</td>
            <td>Timestamp at which both legs of the connection (client/edge, edge/origin or nexthop) were established</td>
            <td>int or string</td>
        </tr>
        <tr>
            <td>DisconnectTimestamp</td>
            <td>Timestamp at which the connection was closed</td>
            <td>int or string</td>
        </tr>
        <tr>
            <td>Event</td>
            <td>
                <div><em>connect</em> | <em>disconnect</em> | <em>clientFiltered</em> | <em>tlsError</em> | <em>resolveOrigin</em> | <em>originError</em></div>
            </td>
            <td>string</td>
        </tr>
        <tr>
            <td>IpFirewall</td>
            <td>Whether IP Firewall was enabled at time of connection</td>
            <td>bool</td>
        </tr>
        <tr>
            <td>OriginBytes</td>
            <td>The number of bytes read from the origin by Spectrum</td>
            <td>int</td>
        </tr>
        <tr>
            <td>OriginIP</td>
            <td>Origin IP address</td>
            <td>string</td>
        </tr>
        <tr>
            <td>OriginPort</td>
            <td>Origin port</td>
            <td>int</td>
        </tr>
        <tr>
            <td>OriginProto</td>
            <td>
                <div>Transport protocol used by origin; <em>tcp</em> | <em>udp</em> | <em>unix</em></div>
            </td>
            <td>string</td>
        </tr>
        <tr>
            <td>OriginTcpRtt</td>
            <td>The TCP round-trip time in nanoseconds between Spectrum and the origin</td>
            <td>int</td>
        </tr>
        <tr>
            <td>OriginTlsCipher</td>
            <td>The cipher negotiated between Spectrum and the origin</td>
            <td>string</td>
        </tr>
        <tr>
            <td>OriginTlsFingerprint</td>
            <td>SHA256 hash of origin certificate</td>
            <td>string</td>
        </tr>
        <tr>
            <td>OriginTlsMode</td>
            <td>
                <div>If and how the upstream connection is encrypted; <em>unknown</em> | <em>off</em> | <em>flexible</em> | <em>full</em> | <em>strict</em></div>
            </td>
            <td>string</td>
        </tr>
        <tr>
            <td>OriginTlsProtocol</td>
            <td>
                <div>The TLS version negotiated between Spectrum and the origin; <em>unknown</em> | <em>none</em> | <em>SSLv3</em> | <em>TLSv1</em> | <em>TLSv1.1</em> | <em>TLSv1.2</em> | <em>TLSv1.3</em></div>
            </td>
            <td>string</td>
        </tr>
        <tr>
            <td>OriginTlsStatus</td>
            <td>
                <div>
                    The state of the TLS session from Spectrum to the origin; <em>UNKNOWN</em> | <em>OK</em> | <em>INTERNAL_ERROR</em> | <em>INVALID_CONFIG</em> | <em>INVALID_SNI</em> | <em>HANDSHAKE_FAILED</em> | <em>KEYLESS_RPC</em>
                </div>
            </td>
            <td>string</td>
        </tr>
        <tr>
            <td>ProxyProtocol</td>
            <td>
                <div>Which form of proxy protocol is applied to the given connection; <em>off</em> | <em>v1</em> | <em>v2</em> | <em>simple</em></div>
            </td>
            <td>string</td>
        </tr>
        <tr>
            <td>Status</td>
            <td>A code indicating reason for connection closure</td>
            <td>int</td>
        </tr>
        <tr>
            <td>Timestamp</td>
            <td>Timestamp at which the event took place</td>
            <td>string</td>
        </tr>
    </tbody>
</table>


----

<a id="firewall-events" style="color: inherit">

### Firewall events
</a>

<table style="border: solid 2px darkgrey; width: 75%;">
    <thead style="background: #ffeadf;">
        <tr>
            <th>Field</th>
            <th>Value</th>
            <th>Type</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Action</td>
            <td>The code of the first-class action the Cloudflare Firewall took on this request</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientASN</td>
            <td>The ASN number of the visitor</td>
            <td>int</td>
        </tr>
        <tr>
            <td>ClientASNDescription</td>
            <td>The ASN of the visitor as string</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientCountry</td>
            <td>Country from which request originated</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientIP</td>
            <td>The visitor's IP address (IPv4 or IPv6)</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientIPClass</td>
            <td>
                The classification of the visitor's IP address, possible values are: <em>unknown</em> | <em>clean</em> | <em>badHost</em> | <em>searchEngine</em> | <em>whitelist</em> | <em>greylist</em> | <em>monitoringService</em> |
                <em>securityScanner</em> | <em>noRecord</em> | <em>scan</em> | <em>backupService</em> | <em>mobilePlatform</em> | <em>tor</em>
            </td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRefererHost</td>
            <td>The referer host</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRefererPath</td>
            <td>The referer path requested by visitor</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRefererQuery</td>
            <td>The referer query-string was requested by the visitor</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRefererScheme</td>
            <td>The referer url scheme requested by the visitor</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRequestHost</td>
            <td>The HTTP hostname requested by the visitor</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRequestMethod</td>
            <td>The HTTP method used by the visitor</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRequestPath</td>
            <td>The path requested by visitor</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRequestProtocol</td>
            <td>The version of HTTP protocol requested by the visitor</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRequestQuery</td>
            <td>The query-string was requested by the visitor</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRequestScheme</td>
            <td>The url scheme requested by the visitor</td>
            <td>string</td>
        </tr>
        <tr>
            <td>ClientRequestUserAgent</td>
            <td>Visitor's user-agent string</td>
            <td>string</td>
        </tr>
        <tr>
            <td>Datetime</td>
            <td>The date and time the event occurred at the edge</td>
            <td>int or string</td>
        </tr>
        <tr>
            <td>EdgeColoCode</td>
            <td>The airport code of the Cloudflare datacenter that served this request</td>
            <td>string</td>
        </tr>
        <tr>
            <td>EdgeResponseStatus</td>
            <td>HTTP response status code returned to browser</td>
            <td>int</td>
        </tr>
        <tr>
            <td>Kind</td>
            <td>The kind of event, currently only possible values are: <em>firewall</em></td>
            <td>string</td>
        </tr>
        <tr>
            <td>MatchIndex</td>
            <td>Rules match index in the chain</td>
            <td>int</td>
        </tr>
        <tr>
            <td>Metadata</td>
            <td>Additional product-specific information. Metadata is organized in key:value pairs. Key and Value formats can vary by Cloudflare security product and can change over time</td>
            <td>object</td>
        </tr>
        <tr>
            <td>OriginResponseStatus</td>
            <td>HTTP origin response status code returned to browser</td>
            <td>int</td>
        </tr>
        <tr>
            <td>OriginatorRayID</td>
            <td>The RayID of the request that issued the challenge/jschallenge</td>
            <td>string</td>
        </tr>
        <tr>
            <td>RayID</td>
            <td>The RayID of the request</td>
            <td>string</td>
        </tr>
        <tr>
            <td>RuleID</td>
            <td>The Cloudflare security product-specific RuleID triggered by this request</td>
            <td>string</td>
        </tr>
        <tr>
            <td>Source</td>
            <td>The Cloudflare security product triggered by this request</td>
            <td>string</td>
        </tr>
    </tbody>
</table>
