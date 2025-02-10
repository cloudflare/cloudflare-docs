---
# Code generator. DO NOT EDIT.

title: HTTP requests
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `http_requests`.

## BotDetectionIDs

Type: `array[int]`

List of IDs that correlate to the Bot Management Heuristic detections made on a request. Available only for Bot Management customers. To enable this feature, contact your account team.

## BotDetectionTags

Type: `array[string]`

List of tags that correlate to the Bot Management Heuristic detections made on a request. Available only for Bot Management customers. To enable this feature, contact your account team.

## BotScore

Type: `int`

Cloudflare Bot Score. Scores below 30 are commonly associated with automated traffic. Available only for Bot Management customers. To enable this feature, contact your account team.

## BotScoreSrc

Type: `string`

Detection engine responsible for generating the Bot Score. <br />Possible values are <em>Not Computed</em> \| <em>Heuristics</em> \| <em>Machine Learning</em> \| <em>Behavioral Analysis</em> \| <em>Verified Bot</em> \| <em>JS Fingerprinting</em> \| <em>Cloudflare Service</em>. Available only for Bot Management customers. To enable this feature, contact your account team.

## BotTags

Type: `array[string]`

Type of bot traffic (if available). Refer to [Bot Tags](/bots/concepts/cloudflare-bot-tags/) for the list of potential values. Available only for Bot Management customers. To enable this feature, contact your account team.

## CacheCacheStatus

Type: `string`

Cache status. <br />Possible values are <em>unknown</em> \| <em>miss</em> \| <em>expired</em> \| <em>updating</em> \| <em>stale</em> \| <em>hit</em> \| <em>ignored</em> \| <em>bypass</em> \| <em>revalidated</em> \| <em>dynamic</em> \| <em>stream_hit</em> \| <em>deferred</em> <br />"dynamic" means that a request is not eligible for cache. This can mean, for example that it was blocked by the firewall. Refer to [Cloudflare cache responses](/cache/concepts/cache-responses/) for more details.

## CacheReserveUsed

Type: `bool`

Cache Reserve was used to serve this request.

## CacheResponseBytes

Type: `int`

Number of bytes returned by the cache.

## CacheResponseStatus (deprecated)

Type: `int`

HTTP status code returned by the cache to the edge. All requests (including non-cacheable ones) go through the cache. Refer also to CacheCacheStatus field.

## CacheTieredFill

Type: `bool`

Tiered Cache was used to serve this request.

## ClientASN

Type: `int`

Client AS number.

## ClientCity

Type: `string`

Approximate city of the client.

## ClientCountry

Type: `string`

2-letter ISO-3166 country code of the client IP address.

## ClientDeviceType

Type: `string`

Client device type.

## ClientIP

Type: `string`

IP address of the client.

## ClientIPClass

Type: `string`

Client IP class. <br />Possible values are <em>unknown</em> \| <em>badHost</em> \| <em>searchEngine</em> \| <em>allowlist</em> \| <em>monitoringService</em> \| <em>noRecord</em> \| <em>scan</em> \| <em>tor</em>.

## ClientLatitude

Type: `string`

Approximate latitude of the client.

## ClientLongitude

Type: `string`

Approximate longitude of the client.

## ClientMTLSAuthCertFingerprint

Type: `string`

The SHA256 fingerprint of the certificate presented by the client during mTLS authentication. Only populated on the first request on an mTLS connection.

## ClientMTLSAuthStatus

Type: `string`

The status of mTLS authentication. Only populated on the first request on an mTLS connection. <br />Possible values are <em>unknown</em> \| <em>ok</em> \| <em>absent</em> \| <em>untrusted</em> \| <em>notyetvalid</em> \| <em>expired</em>.

## ClientRegionCode

Type: `string`

The ISO-3166-2 region code of the client IP address.

## ClientRequestBytes

Type: `int`

Number of bytes in the client request.

## ClientRequestHost

Type: `string`

Host requested by the client.

## ClientRequestMethod

Type: `string`

HTTP method of client request.

## ClientRequestPath

Type: `string`

URI path requested by the client.

## ClientRequestProtocol

Type: `string`

HTTP protocol of client request.

## ClientRequestReferer

Type: `string`

HTTP request referrer.

## ClientRequestScheme

Type: `string`

The URL scheme requested by the visitor.

## ClientRequestSource

Type: `string`

Identifies requests as coming from an external source or another service within Cloudflare. Refer to [ClientRequestSource field](/logs/reference/clientrequestsource/) for the list of potential values.

## ClientRequestURI

Type: `string`

URI requested by the client.

## ClientRequestUserAgent

Type: `string`

User agent reported by the client.

## ClientSSLCipher

Type: `string`

Client SSL cipher.

## ClientSSLProtocol

Type: `string`

Client SSL (TLS) protocol. The value "none" means that SSL was not used.

## ClientSrcPort

Type: `int`

Client source port.

## ClientTCPRTTMs

Type: `int`

The smoothed average of TCP round-trip time (SRTT). For the initial request on a connection, this is measured only during connection setup. For a subsequent request on the same connection, it is measured over the entire connection lifetime up until the time that request is received.

## ClientXRequestedWith

Type: `string`

X-Requested-With HTTP header.

## ContentScanObjResults

Type: `array[string]`

List of content scan results.

## ContentScanObjSizes

Type: `array[int]`

List of content object sizes.

## ContentScanObjTypes

Type: `array[string]`

List of content types.

## Cookies

Type: `object`

String key-value pairs for Cookies. This field is populated based on [Logpush Custom fields](/logs/reference/custom-fields/), which need to be configured.

## EdgeCFConnectingO2O

Type: `bool`

True if the request looped through multiple zones on the Cloudflare edge. This is considered an orange to orange (o2o) request.

## EdgeColoCode

Type: `string`

IATA airport code of data center that received the request.

## EdgeColoID

Type: `int`

Cloudflare edge colo id.

## EdgeEndTimestamp

Type: `int or string`

Timestamp at which the edge finished sending response to the client.

## EdgePathingOp

Type: `string`

Indicates what type of response was issued for this request (unknown = no specific action).

## EdgePathingSrc

Type: `string`

Details how the request was classified based on security checks (unknown = no specific classification).

## EdgePathingStatus

Type: `string`

Indicates what data was used to determine the handling of this request (unknown = no data).

## EdgeRequestHost

Type: `string`

Host header on the request from the edge to the origin.

## EdgeResponseBodyBytes

Type: `int`

Size of the HTTP response body returned to clients.

## EdgeResponseBytes

Type: `int`

Number of bytes returned by the edge to the client.

## EdgeResponseCompressionRatio

Type: `float`

The edge response compression ratio is calculated as the ratio between the sizes of the original and compressed responses.

## EdgeResponseContentType

Type: `string`

Edge response Content-Type header value.

## EdgeResponseStatus

Type: `int`

HTTP status code returned by Cloudflare to the client.

## EdgeServerIP

Type: `string`

IP of the edge server making a request to the origin. Possible responses are string in IPv4 or IPv6 format, or empty string. Empty string means that there was no request made to the origin server.

## EdgeStartTimestamp

Type: `int or string`

Timestamp at which the edge received request from the client.

## EdgeTimeToFirstByteMs

Type: `int`

Total view of Time To First Byte as measured at Cloudflare's edge. Starts after a TCP connection is established and ends when Cloudflare begins returning the first byte of a response to eyeballs. Includes TLS handshake time (for new connections) and origin response time.

## JA3Hash

Type: `string`

The MD5 hash of the JA3 fingerprint used to profile SSL/TLS clients. Available only for Bot Management customers. To enable this feature, contact your account team.

## JA4

Type: `string`

The JA4 fingerprint used to profile SSL/TLS clients. Available only for Bot Management customers. To enable this feature, contact your account team.

## JA4Signals

Type: `object`

Inter-request statistics computed for this JA4 fingerprint. JA4Signals field is organized in key:value pairs, where values are numbers. Available only for Bot Management customers. To enable this feature, contact your account team.

## LeakedCredentialCheckResult

Type: `string`

Result of the check for [leaked credentials](/waf/detections/leaked-credentials/). <br />Possible results are: <em>password_leaked</em> \| <em>username_and_password_leaked</em> \| <em>username_password_similar</em> \| <em>username_leaked</em> \| <em>clean</em>.

## OriginDNSResponseTimeMs

Type: `int`

Time taken to receive a DNS response for an origin name. Usually takes a few milliseconds, but may be longer if a CNAME record is used.

## OriginIP

Type: `string`

IP of the origin server.

## OriginRequestHeaderSendDurationMs

Type: `int`

Time taken to send request headers to origin after establishing a connection. Note that this value is usually 0.

## OriginResponseBytes (deprecated)

Type: `int`

Number of bytes returned by the origin server.

## OriginResponseDurationMs

Type: `int`

Upstream response time, measured from the first datacenter that receives a request. Includes time taken by Argo Smart Routing and Tiered Cache, plus time to connect and receive a response from origin servers. This field replaces OriginResponseTime.

## OriginResponseHTTPExpires

Type: `string`

Value of the origin 'expires' header in RFC1123 format.

## OriginResponseHTTPLastModified

Type: `string`

Value of the origin 'last-modified' header in RFC1123 format.

## OriginResponseHeaderReceiveDurationMs

Type: `int`

Time taken for origin to return response headers after Cloudflare finishes sending request headers.

## OriginResponseStatus

Type: `int`

Status returned by the upstream server. The value 0 means that there was no request made to the origin server and the response was served by Cloudflare's Edge. However, if the zone has a Worker running on it, the value 0 could be the result of a Workers subrequest made to the origin.

## OriginResponseTime (deprecated)

Type: `int`

Number of nanoseconds it took the origin to return the response to edge.

## OriginSSLProtocol

Type: `string`

SSL (TLS) protocol used to connect to the origin.

## OriginTCPHandshakeDurationMs

Type: `int`

Time taken to complete TCP handshake with origin. This will be 0 if an origin connection is reused.

## OriginTLSHandshakeDurationMs

Type: `int`

Time taken to complete TLS handshake with origin. This will be 0 if an origin connection is reused.

## ParentRayID

Type: `string`

Ray ID of the parent request if this request was made using a Worker script.

## RayID

Type: `string`

ID of the request.

## RequestHeaders

Type: `object`

String key-value pairs for RequestHeaders. This field is populated based on [Logpush Custom fields](/logs/reference/custom-fields/), which need to be configured.

## ResponseHeaders

Type: `object`

String key-value pairs for ResponseHeaders. This field is populated based on [Logpush Custom fields](/logs/reference/custom-fields/), which need to be configured.

## SecurityAction

Type: `string`

Action of the security rule that triggered a terminating action, if any.

## SecurityActions

Type: `array[string]`

Array of actions the Cloudflare security products performed on this request. The individual security products associated with this action can be found in SecuritySources and their respective rule Ids can be found in SecurityRuleIDs. The length of the array is the same as SecurityRuleIDs and SecuritySources. <br />Possible actions are <em>unknown</em> \| <em>allow</em> \| <em>block</em> \| <em>challenge</em> \| <em>jschallenge</em> \| <em>log</em> \| <em>connectionClose</em> \| <em>challengeSolved</em> \| <em>challengeBypassed</em> \| <em>jschallengeSolved</em> \| <em>jschallengeBypassed</em> \| <em>bypass</em> \| <em>managedChallenge</em> \| <em>managedChallengeNonInteractiveSolved</em> \| <em>managedChallengeInteractiveSolved</em> \| <em>managedChallengeBypassed</em> \| <em>rewrite</em> \| <em>forceConnectionClose</em> \| <em>skip</em>.

## SecurityRuleDescription

Type: `string`

Description of the security rule that triggered a terminating action, if any.

## SecurityRuleID

Type: `string`

Rule ID of the security rule that triggered a terminating action, if any.

## SecurityRuleIDs

Type: `array[string]`

Array of rule IDs of the security product that matched the request. The security product associated with the rule ID can be found in SecuritySources. The length of the array is the same as SecurityActions and SecuritySources.

## SecuritySources

Type: `array[string]`

Array of security products that matched the request. The same product can appear multiple times, which indicates different rules or actions that were activated. The rule IDs can be found in SecurityRuleIDs, and the actions can be found in SecurityActions. The length of the array is the same as SecurityRuleIDs and SecurityActions. <br />Possible sources are <em>unknown</em> \| <em>asn</em> \| <em>country</em> \| <em>ip</em> \| <em>ipRange</em> \| <em>securityLevel</em> \| <em>zoneLockdown</em> \| <em>waf</em> \| <em>firewallRules</em> \| <em>uaBlock</em> \| <em>rateLimit</em> \| <em>bic</em> \| <em>hot</em> \| <em>l7ddos</em> \| <em>validation</em> \| <em>botFight</em> \| <em>apiShield</em> \| <em>botManagement</em> \| <em>dlp</em> \| <em>firewallManaged</em> \| <em>firewallCustom</em> \| <em>apiShieldSchemaValidation</em> \| <em>apiShieldTokenValidation</em> \| <em>apiShieldSequenceMitigation</em>.

## SmartRouteColoID

Type: `int`

The Cloudflare datacenter used to connect to the origin server if Argo Smart Routing is used.

## UpperTierColoID

Type: `int`

The "upper tier" datacenter that was checked for a cached copy if Tiered Cache is used.

## WAFAttackScore

Type: `int`

Overall request score generated by the WAF detection module.

## WAFFlags (deprecated)

Type: `string`

Additional configuration flags: <em>simulate (0x1)</em> \| <em>null</em>.

## WAFMatchedVar (deprecated)

Type: `string`

The full name of the most-recently matched variable.

## WAFRCEAttackScore

Type: `int`

WAF score for an RCE attack.

## WAFSQLiAttackScore

Type: `int`

WAF score for an SQLi attack.

## WAFXSSAttackScore

Type: `int`

WAF score for an XSS attack.

## WorkerCPUTime

Type: `int`

Amount of time in microseconds spent executing a worker, if any.

## WorkerStatus

Type: `string`

Status returned from worker daemon.

## WorkerSubrequest

Type: `bool`

Whether or not this request was a worker subrequest.

## WorkerSubrequestCount

Type: `int`

Number of subrequests issued by a worker when handling this request.

## WorkerWallTimeUs

Type: `int`

The elapsed time in microseconds between the start of a Worker invocation, and when the Workers Runtime determines that no more JavaScript needs to run. Specifically, this measures the wall-clock time that the JavaScript context remained open. For example, when returning a response with a large body, the Workers runtime can, in some cases, determine that no more JavaScript needs to run, and closes the JS context before all the bytes have passed through and been sent. Alternatively, if you use the `waitUntil()` API to perform work without blocking the return of a response, this work may continue executing after the response has been returned, and will be included in `WorkerWallTimeUs`.

## ZoneName

Type: `string`

The human-readable name of the zone (e.g. 'cloudflare.com').
