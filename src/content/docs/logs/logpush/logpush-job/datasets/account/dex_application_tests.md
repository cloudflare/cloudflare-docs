---
# Code generator. DO NOT EDIT.

title: DEX Application Tests
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `dex_application_tests`.

## AccountID

Type: `string`

The Cloudflare account ID.

## ClientPlatform

Type: `string`

The client's operating system.

## ClientVersion

Type: `string`

The WARP client version.

## ColoCode

Type: `string`

The Colo code where the WARP client is connected to Cloudflare.

## DeviceID

Type: `string`

The unique device ID.

## DeviceRegistrationID

Type: `string`

The unique ID for the device registration.

## ExecutionContext

Type: `string`

Whether the test traffic was run inside or outside of the tunnel. Can be `inTunnel` or `outOfTunnel`.

## HTTPClientIPASN

Type: `int`

HTTP test client IP autonomous system number, for example `13335`. HTTP tests only.

## HTTPClientIPASO

Type: `string`

HTTP test client IP autonomous system organization, for example `Cloudflare, Inc.`. HTTP tests only.

## HTTPClientIPAddress

Type: `string`

HTTP test client IP address. HTTP tests only.

## HTTPClientIPCity

Type: `string`

HTTP test client IP city name in English language, for example `Los Angeles`. HTTP tests only.

## HTTPClientIPCountryISO

Type: `string`

HTTP test client IP country ISO code, for example `US` for the United States. HTTP tests only.

## HTTPClientIPNetmask

Type: `string`

HTTP test client IP netmask. HTTP tests only.

## HTTPClientIPStateISO

Type: `string`

HTTP test client IP state ISO code, for example `CA` for California. HTTP tests only.

## HTTPClientIPVersion

Type: `string`

HTTP test client IP version. HTTP tests only.

## HTTPClientIPZip

Type: `string`

HTTP test client IP postal code, for example `90001`. HTTP tests only.

## HTTPConnectEndMs

Type: `int`

HTTP test result connect end, in milliseconds since test start. HTTP tests only. Refer to [Resource timing](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API) for more details.

## HTTPConnectStartMs

Type: `int`

HTTP test result connect start, in milliseconds since test start. HTTP tests only. Refer to [Resource timing](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API) for more details.

## HTTPDomainLookupEndMs

Type: `int`

HTTP test result domain lookup end, in milliseconds since test start. HTTP tests only. Refer to [Resource timing](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API) for more details.

## HTTPDomainLookupStartMs

Type: `int`

HTTP test result domain lookup start, in milliseconds since test start. HTTP tests only. Refer to [Resource timing](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API) for more details.

## HTTPErrorMessage

Type: `string`

HTTP test result error message. HTTP tests only.

## HTTPMethod

Type: `string`

HTTP test method. HTTP tests only.

## HTTPRequestStartMs

Type: `int`

HTTP test result request start, in milliseconds since test start. HTTP tests only. Refer to [Resource timing](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API) for more details.

## HTTPResponseBodyBytes

Type: `int`

Size of the HTTP response body. HTTP tests only.

## HTTPResponseEndMs

Type: `int`

HTTP test result response end, in milliseconds since test start. HTTP tests only. Refer to [Resource timing](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API) for more details.

## HTTPResponseHeaderBytes

Type: `int`

HTTP test result header bytes. HTTP tests only.

## HTTPResponseStartMs

Type: `int`

HTTP test result response start, in milliseconds since test start. HTTP tests only. Refer to [Resource timing](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API) for more details.

## HTTPSecureConnectionStartMs

Type: `int`

HTTP test result secure connection start, in milliseconds since test start. HTTP tests only. Refer to [Resource timing](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API) for more details.

## HTTPServerIPASN

Type: `int`

HTTP test server IP autonomous system number, for example `13335`. HTTP tests only.

## HTTPServerIPASO

Type: `string`

HTTP test server IP autonomous system organization, for example `Cloudflare, Inc.`. HTTP tests only.

## HTTPServerIPAddress

Type: `string`

HTTP test server IP address. HTTP tests only.

## HTTPServerIPCity

Type: `string`

HTTP test server IP city name in English language, for example `Los Angeles`. HTTP tests only.

## HTTPServerIPCountryISO

Type: `string`

HTTP test server IP country ISO code, for example `US` for the United States. HTTP tests only.

## HTTPServerIPNetmask

Type: `string`

HTTP test server IP netmask. HTTP tests only.

## HTTPServerIPStateISO

Type: `string`

HTTP test server IP state ISO code, for example `CA` for California. HTTP tests only.

## HTTPServerIPVersion

Type: `string`

HTTP test server IP version. HTTP tests only.

## HTTPServerIPZip

Type: `string`

HTTP test server IP postal code, for example `90001`. HTTP tests only.

## HTTPStatusCode

Type: `int`

HTTP test result status code. HTTP tests only.

## HTTPURL

Type: `string`

HTTP test target URL. HTTP tests only.

## TestID

Type: `string`

The test ID for which the result was uploaded.

## TestType

Type: `string`

The type of test. Can be `traceroute` or `http`.

## Timestamp

Type: `int or string`

Test start time.

## TracerouteDestinationHostname

Type: `string`

Traceroute test result destination hostname. Traceroute tests only.

## TracerouteDestinationIPASN

Type: `int`

Traceroute test destination IP autonomous system number, for example `13335`. Traceroute tests only.

## TracerouteDestinationIPASO

Type: `string`

Traceroute test destination IP autonomous system organization, for example `Cloudflare, Inc.`. Traceroute tests only.

## TracerouteDestinationIPAddress

Type: `string`

Traceroute test destination IP address. Traceroute tests only.

## TracerouteDestinationIPCity

Type: `string`

Traceroute test destination IP city name in English language, for example `Los Angeles`. Traceroute tests only.

## TracerouteDestinationIPCountryISO

Type: `string`

Traceroute test destination IP country ISO code, for example `US` for the United States. Traceroute tests only.

## TracerouteDestinationIPNetmask

Type: `string`

Traceroute test destination IP netmask. Traceroute tests only.

## TracerouteDestinationIPStateISO

Type: `string`

Traceroute test destination IP state ISO code, for example `CA` for California. Traceroute tests only.

## TracerouteDestinationIPVersion

Type: `string`

Traceroute test destination IP version. Traceroute tests only.

## TracerouteDestinationIPZip

Type: `string`

Traceroute test destination IP postal code, for example `90001`. Traceroute tests only.

## TracerouteDurationMs

Type: `int`

Traceroute test result duration in milliseconds. Traceroute tests only.

## TracerouteHops

Type: `array[object]`

Traceroute test result hops, for example `[{"errors": ["timeout", "host unreachable"], "ip": {"address": "192.0.2.0", "asn": 13335, "aso": "Cloudflare, Inc.", "location": {"city": "Los Angeles", "countryISO": "US", "stateISO": "CA", "zip": "90001"}, "netmask": "255.255.255.0", "version": "v4"}, "name": "router1.example.com", "pathID": 1, "received": 3, "rtts": [10, 12, 11], "sent": 3, "ttl": 60}]`. Traceroute tests only.

## TracerouteMaxTTL

Type: `int`

Traceroute test result maximum TTL value. Traceroute tests only.

## TracerouteProtocol

Type: `string`

Traceroute test result protocol. Can be `icmp`, `udp`, or `tcp`. Traceroute tests only.

## TracerouteSize

Type: `int`

Traceroute test result packet size in bytes. Traceroute tests only.

## TracerouteSourceIPASN

Type: `int`

Traceroute test source IP autonomous system number, for example `13335`. Traceroute tests only.

## TracerouteSourceIPASO

Type: `string`

Traceroute test source IP autonomous system organization, for example `Cloudflare, Inc.`. Traceroute tests only.

## TracerouteSourceIPAddress

Type: `string`

Traceroute test source IP address. Traceroute tests only.

## TracerouteSourceIPCity

Type: `string`

Traceroute test source IP city name in English language, for example `Los Angeles`. Traceroute tests only.

## TracerouteSourceIPCountryISO

Type: `string`

Traceroute test source IP country ISO code, for example `US` for the United States. Traceroute tests only.

## TracerouteSourceIPNetmask

Type: `string`

Traceroute test source IP netmask. Traceroute tests only.

## TracerouteSourceIPStateISO

Type: `string`

Traceroute test source IP state ISO code, for example `CA` for California. Traceroute tests only.

## TracerouteSourceIPVersion

Type: `string`

Traceroute test source IP version. Traceroute tests only.

## TracerouteSourceIPZip

Type: `string`

Traceroute test source IP postal code, for example `90001`. Traceroute tests only.

## TracerouteStatus

Type: `string`

Traceroute test result status. Can be `destinationReached`, `lastHopFailed`, or `maxHopsExhausted`. Traceroute tests only.

## TracerouteTimeEnd

Type: `int or string`

Traceroute test result time end. Traceroute tests only.

## TracerouteVersion

Type: `string`

The version of the WARP traceroute client. Traceroute tests only.

## TunnelType

Type: `string`

The tunnel type the device uses to establish a connection to the edge, if any. Can be `http2`, `masque`, or `wireguard`.

## UserEmail

Type: `string`

The Access user email.

## UserID

Type: `string`

The Access user ID.
