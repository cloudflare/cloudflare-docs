---
# Code generator. DO NOT EDIT.

title: Gateway DNS
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `gateway_dns`.

## AccountID

Type: `string`

Cloudflare account ID.

## ApplicationID

Type: `int`

ID of the application the domain belongs to (for example, 1, 2). Set to 0 when no ApplicationID is matched.

## ApplicationName

Type: `string`

Name of the application the domain belongs to (for example, 'Cloudflare Dashboard').

## AuthoritativeNameServerIPs

Type: `array[string]`

The IPs of the authoritative nameservers that provided the answers, if any (for example ['203.0.113.1', '203.0.113.2']).

## CNAMECategoryIDs

Type: `array[int]`

ID or IDs of category that the intermediate cname domains belongs to (for example, [7,12,28,122,129,163]).

## CNAMECategoryNames

Type: `array[string]`

Name or names of category that the intermediate cname domains belongs to (for example, ['Photography', 'Weather']).

## CNAMEs

Type: `array[string]`

Resolved intermediate cname domains (for example, ['alias.example.com']).

## CNAMEsReversed

Type: `array[string]`

Resolved intermediate cname domains in reverse (for example, ['com.example.alias']).

## ColoCode

Type: `string`

The name of the colo that received the DNS query (for example, 'SJC', 'MIA', 'IAD').

## ColoID

Type: `int`

The ID of the colo that received the DNS query (for example, 46, 72, 397).

## CustomResolveDurationMs

Type: `int`

The time it took for the custom resolver to respond.

## CustomResolverAddress

Type: `string`

IP and port combo used to resolve the custom dns resolver query, if any.

## CustomResolverPolicyID (deprecated)

Type: `string`

Custom resolver policy UUID, if matched. Deprecated by ResolverPolicyID.

## CustomResolverPolicyName (deprecated)

Type: `string`

Custom resolver policy name, if matched. Deprecated by ResolverPolicyName.

## CustomResolverResponse

Type: `string`

Status of the custom resolver response.

## Datetime

Type: `int or string`

The date and time the corresponding DNS request was made (for example, '2021-07-27T00:01:07Z').

## DeviceID

Type: `string`

UUID of the device where the HTTP request originated from (for example, 'dad71818-0429-11ec-a0dc-000000000000').

## DeviceName

Type: `string`

The name of the device where the HTTP request originated from (for example, 'Laptop MB810').

## DoHSubdomain

Type: `string`

The destination DoH subdomain the DNS query was made to.

## DoTSubdomain

Type: `string`

The destination DoT subdomain the DNS query was made to.

## DstIP

Type: `string`

The destination IP address the DNS query was made to (for example, '104.16.132.2290').

## DstPort

Type: `int`

The destination port used at the edge. The port changes based on the protocol used by the DNS query (for example, 0).

## EDEErrors

Type: `array[int]`

List of returned Extended DNS Error Codes (for example, [2, 3]).

## Email

Type: `string`

Email used to authenticate the client (for example, 'user@test.com').

## InitialCategoryIDs

Type: `array[int]`

ID or IDs of category that the queried domains belongs to (for example, [7,12,28,122,129,163]).

## InitialCategoryNames

Type: `array[string]`

Name or names of category that the queried domains belongs to (for example, ['Photography', 'Weather']).

## InternalDNSFallbackStrategy

Type: `string`

The fallback strategy applied over the internal DNS response. Empty if no fallback strategy was applied.

## InternalDNSRCode

Type: `int`

The return code sent back by the internal DNS service.

## InternalDNSViewID

Type: `string`

The DNS internal view identifier that was sent to the internal DNS service.

## InternalDNSZoneID

Type: `string`

The DNS zone identifier returned by the internal DNS service.

## IsResponseCached

Type: `bool`

Response comes from cache or not.

## Location

Type: `string`

Name of the location the DNS request is coming from. Location is created by the customer (for example, 'Office NYC').

## LocationID

Type: `string`

UUID of the location the DNS request is coming from. Location is created by the customer (for example, '7bdc7a9c-81d3-4816-8e56-000000000000').

## MatchedCategoryIDs

Type: `array[int]`

ID or IDs of category that the domain was matched with the policy (for example, [7,12,28,122,129,163]).

## MatchedCategoryNames

Type: `array[string]`

Name or names of category that the domain was matched with the policy (for example, ['Photography', 'Weather']).

## MatchedIndicatorFeedIDs

Type: `array[int]`

ID or IDs of indicator feed(s) that the domain was matched with the policy (for example, [7,12]).

## MatchedIndicatorFeedNames

Type: `array[string]`

Name or names of indicator feed(s) that the domain was matched with the policy (for example, ['Vendor Malware Feed', 'Vendor CoC Feed']).

## Policy (deprecated)

Type: `string`

Name of the policy that was applied (if any) (for example, '7bdc7a9c-81d3-4816-8e56-de1acad3dec5').

## PolicyID

Type: `string`

ID of the policy/rule that was applied (if any).

## PolicyName

Type: `string`

Name of the policy that was applied (if any).

## Protocol

Type: `string`

The protocol used for the DNS query by the client (for example, 'udp').

## QueryCategoryIDs

Type: `array[int]`

Union of all categories; Initial categories + Resolved IP categories + Cname intermediate categories

## QueryCategoryNames

Type: `array[string]`

Union of all category names; Initial categories + Resolved IP categories + Cname intermediate categories

## QueryID

Type: `string`

Globally unique identifier of the query.

## QueryIndicatorFeedIDs

Type: `array[int]`

ID or IDs of indicator feed(s) that the domain belongs to (for example, [7,12,28]).

## QueryIndicatorFeedNames

Type: `array[string]`

Name or names of indicator feed(s) that the domain belongs to (for example, ['Vendor Malware Feed', 'Vendor CoC Feed', 'Vendor Phishing Feed']).

## QueryName

Type: `string`

The query name (for example, 'example.com'). Cloudflare will surface '.' for root server queries in your logs.

## QueryNameReversed

Type: `string`

Query name in reverse (for example, 'com.example'). Cloudflare will surface '.' for root server queries in your logs.

## QuerySize

Type: `int`

The size of the DNS request in bytes (for example, 151).

## QueryType

Type: `int`

The type of DNS query (for example, 1, 28, 15, or 16).

## QueryTypeName

Type: `string`

The type of DNS query (for example, 'A', 'AAAA', 'MX', or 'TXT').

## RCode

Type: `int`

The return code sent back by the DNS resolver.

## RData (deprecated)

Type: `array[object]`

The rdata objects (for example, [{"type":"5","data":"dns-packet-placeholder..."}]).

## ResolvedIPCategoryIDs

Type: `array[int]`

ID or IDs of category that the ips in the response belongs to (for example, [7,12,28,122,129,163]).

## ResolvedIPCategoryNames

Type: `array[string]`

Name or names of category that the ips in the response belongs to (for example, ['Photography', 'Weather']).

## ResolvedIPContinentCodes

Type: `array[string]`

Continent code of each resolved IP, if any (for example ['NA', 'EU']).

## ResolvedIPCountryCodes

Type: `array[string]`

Country code of each resolved IP, if any (for example ['US', 'PT']).

## ResolvedIPs

Type: `array[string]`

The resolved IPs in the response, if any (for example ['203.0.113.1', '203.0.113.2']).

## ResolverDecision

Type: `string`

Result of the DNS query (for example, 'overrideForSafeSearch').

## ResolverPolicyID

Type: `string`

Resolver policy UUID, if any matched.

## ResolverPolicyName

Type: `string`

Resolver policy name, if any matched.

## ResourceRecords

Type: `array[object]`

The rdata objects (for example, [{"type":"5","data":"dns-packet-placeholder..."}]).

## ResourceRecordsJSON

Type: `string`

String that represents the JSON array with the returned resource records (for example, '[{"name": "example.com", "type": "CNAME", "class": "IN", "ttl": 3600, "rdata": "cname.example.com."}]').

## SrcIP

Type: `string`

The source IP address making the DNS query (for example, '104.16.132.229').

## SrcIPContinentCode

Type: `string`

Continent code of the source IP address making the DNS query (for example, 'NA').

## SrcIPCountryCode

Type: `string`

Country code of the source IP address making the DNS query (for example, 'US').

## SrcPort

Type: `int`

The port used by the client when they sent the DNS request (for example, 0).

## TimeZone

Type: `string`

Time zone used to calculate the current time, if a matched rule was scheduled with it.

## TimeZoneInferredMethod

Type: `string`

Method used to pick the time zone for the schedule (from rule/ from user ip/ from local time).

## UserID

Type: `string`

User identity where the HTTP request originated from (for example, '00000000-0000-0000-0000-000000000000').
