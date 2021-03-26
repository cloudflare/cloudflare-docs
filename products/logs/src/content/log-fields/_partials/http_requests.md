| Field | Value | Type |
| -- | -- | -- |
| BotScore | Cloudflare Bot Score (available for Bot Management customers; please contact your account team to enable) | int |
| BotScoreSrc | Underlying detection engine or <em>source</em> on where a Bot Score is calculated. <br />Possible values are <em>Not Computed</em> \| <em>Heuristics</em> \| <em>Machine Learning</em> \| <em>Behavioral Analysis</em> \| <em>Verified Bot</em> \| <em>Cloudflare Service</em> | string |
| CacheCacheStatus | <em>unknown</em> \| <em>miss</em> \| <em>expired</em> \| <em>updating</em> \| <em>stale</em> \| <em>hit</em> \| <em>ignored</em> \| <em>bypass</em> \| <em>revalidated</em> | string |
| CacheResponseBytes | Number of bytes returned by the cache | int |
| CacheResponseStatus | HTTP status code returned by the cache to the edge; all requests (including non-cacheable ones) go through the cache; also see CacheStatus field | int |
| CacheTieredFill | Tiered Cache was used to serve this request | bool |
| ClientASN | Client AS number | int |
| ClientCountry | Country of the client IP address | string |
| ClientDeviceType | Client device type | string |
| ClientIP | IP address of the client | string |
| ClientIPClass | <em>unknown</em> \| <em>clean</em> \| <em>badHost</em> \| <em>searchEngine</em> \| <em>allowlist</em> \| <em>greylist</em> \| <em>monitoringService</em> \| <em>securityScanner</em> \| <em>noRecord</em> \| <em>scan</em> \| <em>backupService</em> \| <em>mobilePlatform</em> \| <em>tor</em> | string |
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
| EdgeRateLimitID | The internal rule ID of the rate-limiting rule that triggered a block (ban) or log action. 0 if no action taken. | int |
| EdgeRequestHost | Host header on the request from the edge to the origin | string |
| EdgeResponseBytes | Number of bytes returned by the edge to the client | int |
| EdgeResponseCompressionRatio | Edge response compression ratio | float |
| EdgeResponseContentType | Edge response Content-Type header value | string |
| EdgeResponseStatus | HTTP status code returned by Cloudflare to the client | int |
| EdgeServerIP | IP of the edge server making a request to the origin | string |
| EdgeStartTimestamp | Timestamp at which the edge received request from the client | int or string |
| FirewallMatchesActions | Array of actions the Cloudflare firewall products performed on this request. The individual firewall products associated with this action be found in FirewallMatchesSources and their respective RuleIds can be found in FirewallMatchesRuleIDs. The length of the array is the same as FirewallMatchesRuleIDs and FirewallMatchesSources. <br />Possible actions are <em>unknown</em> \| <em>allow</em> \| <em>block</em> \| <em>challenge</em> \| <em>jschallenge</em> \| <em>connection_close</em> \| <em>log</em> \| <em>challenge_solved</em> \| <em>challenge_failed</em> \| <em>challenge_bypassed</em> \| <em>jschallenge_solved</em> \| <em>jschallenge_failed</em> \| <em>jschallenge_bypassed</em> \| <em>bypass</em> \| <em>managed_challenge</em> \| <em>managed_challenge_skipped</em> \| <em>managed_challenge_non_interactive_solved</em> \| <em>managed_challenge_interactive_solved</em> \| <em>managed_challenge_bypassed</em> | array[string] |
| FirewallMatchesRuleIDs | Array of RuleIDs of the firewall product that has matched the request. The firewall product associated with the RuleID can be found in FirewallMatchesSources. The length of the array is the same as FirewallMatchesActions and FirewallMatchesSources. | array[string] |
| FirewallMatchesSources | The firewall products that matched the request. The same product can appear multiple times, which indicates different rules or actions that were activated. The RuleIDs can be found in FirewallMatchesRuleIDs, the actions can be found in FirewallMatchesActions. The length of the array is the same as FirewallMatchesRuleIDs and FirewallMatchesActions. <br />Possible sources are <em>unknown</em> \| <em>asn</em> \| <em>country</em> \| <em>ip</em> \| <em>iprange</em> \| <em>securitylevel</em> \| <em>zonelockdown</em> \| <em>waf</em> \| <em>firewallrules</em> \| <em>uablock</em> \| <em>ratelimit</em> \| <em>bic</em> \| <em>hot</em> \| <em>l7ddos</em> \| <em>validation</em> \| <em>botFight</em> | array[string] |
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
| WAFFlags | Deprecated | string |
| WAFMatchedVar | Deprecated | string |
| WAFProfile | <em>low</em> \| <em>med</em> \| <em>high</em> | string |
| WAFRuleID | ID of the applied WAF rule | string |
| WAFRuleMessage | Rule message associated with the triggered rule | string |
| WorkerCPUTime | Amount of time in microseconds spent executing a worker, if any | int |
| WorkerStatus | Status returned from worker daemon | string |
| WorkerSubrequest | Whether or not this request was a worker subrequest | bool |
| WorkerSubrequestCount | Number of subrequests issued by a worker when handling this request | int |
| ZoneID | Internal zone ID | int |
