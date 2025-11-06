---
# Code generator. DO NOT EDIT.

title: DEX Device State Events
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `dex_device_state_events`.

## AccountID

Type: `string`

The Cloudflare account ID.

## AlwaysOn

Type: `bool`

Whether the WARP daemon is configured to reconnect automatically or not.

## AppFirewallEnabled

Type: `bool`

Whether the application-level firewall is enabled or disabled.

## BatteryCharging

Type: `bool`

Whether the battery is charging or not.

## BatteryCycles

Type: `int`

The number of battery cycles. May not be available on all platforms.

## BatteryPercentage

Type: `float`

The percentage of battery remaining from 0 - 1.

## CPUPercentage

Type: `float`

The percentage of CPU utilization from 0 - 1.

## CPUPercentageByApp

Type: `array[object]`

The top applications by percentage of CPU used, for example `[{"name": "app0", "percentage": 0.55}, {"name": "app1", "percentage": 0.45}]`.

## ClientPlatform

Type: `string`

The client's OS.

## ClientVersion

Type: `string`

The WARP client version.

## ConnectionType

Type: `string`

The type of connection the device has. Can be `cellular`, `ethernet`, or `wifi`.

## DeviceID

Type: `string`

The unique device ID.

## DeviceIPv4Address

Type: `string`

The device's private IPv4 address.

## DeviceIPv4Netmask

Type: `string`

The device's private IPv4 netmask.

## DeviceIPv6Address

Type: `string`

The device's private IPv6 address.

## DeviceIPv6Netmask

Type: `string`

The device's private IPv6 netmask.

## DeviceRegistrationID

Type: `string`

The unique ID for the device registration.

## DiskReadBPS

Type: `int`

The number of disk bytes read per second.

## DiskUsagePercentage

Type: `float`

The percentage of disk used from 0 - 1.

## DiskWriteBPS

Type: `int`

The number of disk bytes written per second.

## DoHSubdomain

Type: `string`

The WARP client's DoH subdomain.

## FirewallEnabled

Type: `bool`

Whether the system-level firewall is enabled or disabled.

## GatewayIPv4Address

Type: `string`

The private IPv4 address of the gateway/router the device is connected to.

## GatewayIPv4Netmask

Type: `string`

The private IPv4 netmask of the gateway/router the device is connected to.

## GatewayIPv6Address

Type: `string`

The private IPv6 address of the gateway/router the device is connected to.

## GatewayIPv6Netmask

Type: `string`

The private IPv6 netmask of the gateway/router the device is connected to.

## HandshakeLatencyMs

Type: `int`

When WARP is connected, the tunnel's estimated latency in milliseconds. When disconnected, -1.

## ISPIPv4ASN

Type: `int`

The public IPv4 autonomous system number of the device assigned by the ISP, for example `13335`.

## ISPIPv4ASO

Type: `string`

The public IPv4 autonomous system organization of the device assigned by the ISP, for example `Cloudflare Inc`.

## ISPIPv4Address

Type: `string`

The public IPv4 address of the device assigned by the ISP.

## ISPIPv4City

Type: `string`

The public IPv4 city name in English language of the device assigned by the ISP, for example `San Francisco`.

## ISPIPv4CountryISO

Type: `string`

The public IPv4 country ISO code of the device assigned by the ISP, for example `US` for the United States.

## ISPIPv4Netmask

Type: `string`

The public IPv4 netmask of the device assigned by the ISP.

## ISPIPv4StateISO

Type: `string`

The public IPv4 state ISO code of the device assigned by the ISP, for example `CA` for California.

## ISPIPv4Zip

Type: `string`

The public IPv4 postal code of the device assigned by the ISP, for example `90001`.

## ISPIPv6ASN

Type: `int`

The public IPv6 autonomous system number of the device assigned by the ISP, for example `13335`.

## ISPIPv6ASO

Type: `string`

The public IPv6 autonomous system organization of the device assigned by the ISP, for example `Cloudflare Inc`.

## ISPIPv6Address

Type: `string`

The public IPv6 address of the device assigned by the ISP.

## ISPIPv6City

Type: `string`

The public IPv6 city name in English language of the device assigned by the ISP, for example `San Francisco`.

## ISPIPv6CountryISO

Type: `string`

The public IPv6 country ISO code of the device assigned by the ISP, for example `US` for the United States.

## ISPIPv6Netmask

Type: `string`

The public IPv6 netmask of the device assigned by the ISP.

## ISPIPv6StateISO

Type: `string`

The public IPv6 state ISO code of the device assigned by the ISP, for example `CA` for California.

## ISPIPv6Zip

Type: `string`

The public IPv6 postal code of the device assigned by the ISP, for example `90001`.

## Mode

Type: `string`

The WARP client connection mode, e.g. `warp+doh`, `proxy`.

## NetworkReceivedBPS

Type: `int`

The number of network bytes received per second.

## NetworkSSID

Type: `string`

The SSID of the network the device is connected to, max 32 characters.

## NetworkSentBPS

Type: `int`

The number of network bytes sent per second.

## RAMAvailableKB

Type: `int`

The total available RAM in kilobytes.

## RAMUsedPercentage

Type: `float`

The percentage of RAM utilization from 0 - 1.

## RAMUsedPercentageByApp

Type: `array[object]`

The top applications by percentage of RAM used, for example `[{"name": "app0", "percentage": 0.55}, {"name": "app1", "percentage": 0.45}]`.

## Status

Type: `string`

The WARP client connection status, e.g. `connected`, `paused`.

## SwitchLocked

Type: `bool`

Whether the WARP client was configured to always be enabled.

## Timestamp

Type: `int or string`

Event timestamp.

## TunnelStatsDownstream

Type: `object`

Warp Tunnel downstream stats, focused on MASQUE tunnels, for example `{"rttUs": 5, "minRttUs": 1, "rttVarUs": 1, "packetsSent": 100, "packetsLost": 50, "packetsRetransmitted": 25, "bytesSent": 1000, "bytesLost": 500, "bytesRetransmitted": 250}`.

## TunnelStatsUpstream

Type: `object`

Warp Tunnel upstream stats, focused on MASQUE tunnels, for example `{"rttUs": 5, "minRttUs": 1, "rttVarUs": 1, "packetsSent": 100, "packetsLost": 50, "packetsRetransmitted": 25, "bytesSent": 1000, "bytesLost": 500, "bytesRetransmitted": 250}`.

## TunnelType

Type: `string`

The tunnel type the device uses to establish a connection to the edge, if any. Can be `http2`, `masque`, or `wireguard`.

## WarpColoCode

Type: `string`

The colo code where the client is connected to our API. e.g. `DFW` or `none`.

## WiFiStrengthDBM

Type: `int`

The WiFi strength in decibel milliwatts. Scale between -30 and -90.
