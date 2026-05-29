---
# Code generator. DO NOT EDIT.

title: Magic Network Monitoring Flow Logs
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `mnm_flow_logs`.

## AWSVPCFlowJSON

Type: `string`

AWS VPC Flow Logs JSON data. Only set if the flow protocol is AWS_VPC.

## Bits

Type: `int`

The number of bits transmitted.

## DestinationAS

Type: `int`

The autonomous system number of the destination.

## DestinationAddress

Type: `string`

The destination IP address.

## DestinationPort

Type: `int`

The destination port number.

## DeviceID

Type: `string`

The ID of the network device (such as a router or switch) that originated the flow.

## EgressBits

Type: `int`

The number of egress bits transmitted.

## EgressPackets

Type: `int`

The number of egress packets transmitted.

## Ethertype

Type: `int`

The ethertype of the packet (2048 for IPv4, 34525 for IPv6, etc.).

## FlowProtocol

Type: `string`

The flow protocol (e.g., 'AWS_VPC', 'IPFIX', 'SFLOW_5', 'NETFLOW_V9', etc.).

## FlowTimestamp

Type: `int or string`

The timestamp of the flow. To specify the timestamp format, refer to [Output types](/logs/logpush/logpush-job/log-output-options/#output-types).

## NumFlows

Type: `int`

The number of flows.

## PacketID

Type: `string`

The packet ID.

## Packets

Type: `int`

The number of packets transmitted.

## Protocol

Type: `int`

The protocol number (e.g., 6 for TCP, 17 for UDP).

## RuleIDs

Type: `string`

Comma-separated list of Magic Network Monitoring rule IDs associated with the flow, if any.

## SampleRate

Type: `int`

The sample rate of the flow set by the sampler (1, 100, 1000, 1024, 2000 are common).

## SampleRateType

Type: `string`

The type of sample rate (e.g. 'flow', 'default', 'propagated').

## SamplerAddress

Type: `string`

The sampler IP address.

## SourceAS

Type: `int`

The autonomous system number of the source.

## SourceAddress

Type: `string`

The source IP address.

## SourcePort

Type: `int`

The source port number.

## TcpFlags

Type: `int`

The TCP flags.

## Timestamp

Type: `int or string`

The date and time of the event. To specify the timestamp format, refer to [Output types](/logs/logpush/logpush-job/log-output-options/#output-types).
