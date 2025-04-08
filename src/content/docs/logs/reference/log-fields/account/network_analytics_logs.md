---
# Code generator. DO NOT EDIT.

title: Network Analytics Logs
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `network_analytics_logs`.

## AttackCampaignID

Type: `string`

Unique identifier of the attack campaign that this packet was a part of, if any.

## AttackID

Type: `string`

Unique identifier of the mitigation that matched the packet, if any.

## AttackVector

Type: `string`

Descriptive name of the type of attack that this packet was a part of, if any. Only for packets matching rules contained within the Cloudflare L3/4 managed ruleset.

## ColoCity

Type: `string`

The city where the Cloudflare data center that received the packet is located.

## ColoCode

Type: `string`

The Cloudflare data center that received the packet (nearest IATA airport code).

## ColoCountry

Type: `string`

The country where the Cloudflare data center that received the packet is located (ISO 3166-1 alpha-2).

## ColoGeoHash

Type: `string`

The latitude and longitude where the Cloudflare data center that received the packet is located (Geohash encoding).

## ColoName

Type: `string`

The unique site identifier of the Cloudflare data center that received the packet (for example, 'ams01', 'sjc01', 'lhr01').

## Datetime

Type: `int or string`

The date and time the event occurred at the edge.

## DestinationASN

Type: `int`

The ASN associated with the destination IP of the packet.

## DestinationASNName

Type: `string`

The name of the ASN associated with the destination IP of the packet.

## DestinationCountry

Type: `string`

The country where the destination IP of the packet is located (ISO 3166-1 alpha-2).

## DestinationGeoHash

Type: `string`

The latitude and longitude where the destination IP of the packet is located (Geohash encoding).

## DestinationPort

Type: `int`

Value of the Destination Port header field in the TCP or UDP packet.

## Direction

Type: `string`

The direction in relation to customer network. <br />Possible values are <em>ingress</em> \| <em>egress</em>.

## GREChecksum

Type: `int`

Value of the Checksum header field in the GRE packet.

## GREEtherType

Type: `int`

Value of the EtherType header field in the GRE packet.

## GREHeaderLength

Type: `int`

Length of the GRE packet header, in bytes.

## GREKey

Type: `int`

Value of the Key header field in the GRE packet.

## GRESequenceNumber

Type: `int`

Value of the Sequence Number header field in the GRE packet.

## GREVersion

Type: `int`

Value of the Version header field in the GRE packet.

## ICMPChecksum

Type: `int`

Value of the Checksum header field in the ICMP packet.

## ICMPCode

Type: `int`

Value of the Code header field in the ICMP packet.

## ICMPType

Type: `int`

Value of the Type header field in the ICMP packet.

## IPDestinationAddress

Type: `string`

Value of the Destination Address header field in the IPv4 or IPv6 packet.

## IPDestinationSubnet

Type: `string`

Computed subnet of the Destination Address header field in the IPv4 or IPv6 packet (/24 for IPv4; /64 for IPv6).

## IPFragmentOffset

Type: `int`

Value of the Fragment Offset header field in the IPv4 or IPv6 packet.

## IPHeaderLength

Type: `int`

Length of the IPv4 or IPv6 packet header, in bytes.

## IPMoreFragments

Type: `int`

Value of the More Fragments header field in the IPv4 or IPv6 packet.

## IPProtocol

Type: `int`

Value of the Protocol header field in the IPv4 or IPv6 packet.

## IPProtocolName

Type: `string`

Name of the protocol specified by the Protocol header field in the IPv4 or IPv6 packet.

## IPSourceAddress

Type: `string`

Value of the Source Address header field in the IPv4 or IPv6 packet.

## IPSourceSubnet

Type: `string`

Computed subnet of the Source Address header field in the IPv4 or IPv6 packet (/24 for IPv4; /64 for IPv6).

## IPTTL

Type: `int`

Value of the TTL header field in the IPv4 packet or the Hop Limit header field in the IPv6 packet.

## IPTTLBuckets

Type: `int`

Value of the TTL header field in the IPv4 packet or the Hop Limit header field in the IPv6 packet, with the last digit truncated.

## IPTotalLength

Type: `int`

Total length of the IPv4 or IPv6 packet, in bytes.

## IPTotalLengthBuckets

Type: `int`

Total length of the IPv4 or IPv6 packet, in bytes, with the last two digits truncated.

## IPv4Checksum

Type: `int`

Value of the Checksum header field in the IPv4 packet.

## IPv4DSCP

Type: `int`

Value of the Differentiated Services Code Point header field in the IPv4 packet.

## IPv4DontFragment

Type: `int`

Value of the Don't Fragment header field in the IPv4 packet.

## IPv4ECN

Type: `int`

Value of the Explicit Congestion Notification header field in the IPv4 packet.

## IPv4Identification

Type: `int`

Value of the Identification header field in the IPv4 packet.

## IPv4Options

Type: `string`

List of Options numbers included in the IPv4 packet header.

## IPv6DSCP

Type: `int`

Value of the Differentiated Services Code Point header field in the IPv6 packet.

## IPv6ECN

Type: `int`

Value of the Explicit Congestion Notification header field in the IPv6 packet.

## IPv6ExtensionHeaders

Type: `string`

List of Extension Header numbers included in the IPv6 packet header.

## IPv6FlowLabel

Type: `int`

Value of the Flow Label header field in the IPv6 packet.

## IPv6Identification

Type: `int`

Value of the Identification extension header field in the IPv6 packet.

## MitigationReason

Type: `string`

Reason for applying a mitigation to the packet, if any. <br />Possible values are <em>BLOCKED</em> \| <em>RATE_LIMITED</em> \|<em>UNEXPECTED</em> \| <em>CHALLENGE_NEEDED</em> \| <em>CHALLENGE_PASSED</em> \| <em>NOT_FOUND</em> \| <em>OUT_OF_SEQUENCE</em> \| <em>ALREADY_CLOSED</em>.

## MitigationScope

Type: `string`

Whether the packet matched a local or global mitigation, if any. <br />Possible values are <em>local</em> \| <em>global</em>.

## MitigationSystem

Type: `string`

Which Cloudflare system sampled the packet. <br />Possible values are <em>dosd</em> \| <em>flowtrackd</em> \| <em>magic-firewall</em>.

## Outcome

Type: `string`

The action that Cloudflare systems took on the packet. <br />Possible values are <em>pass</em> \| <em>drop</em>.

## ProtocolState

Type: `string`

State of the packet in the context of the protocol, if any. <br />Possible values are <em>OPEN</em> \| <em>NEW</em> \| <em>CLOSING</em> \| <em>CLOSED</em>.

## RuleID

Type: `string`

Unique identifier of the rule contained within the Cloudflare L3/4 managed ruleset that this packet matched, if any.

## RuleName

Type: `string`

Human-readable name of the rule contained within the Cloudflare L3/4 managed ruleset that this packet matched, if any.

## RulesetID

Type: `string`

Unique identifier of the Cloudflare L3/4 managed ruleset containing the rule that this packet matched, if any. <br />Possible values are <em>3b64149bfa6e4220bbbc2bd6db589552</em>.

## RulesetOverrideID

Type: `string`

Unique identifier of the rule within the accounts root ddos_l4 phase ruleset which resulted in an override of the default sensitivity or action being applied/evaluated, if any.

## SampleInterval

Type: `int`

The sample interval is the inverse of the sample rate. For example, a sample interval of 1000 means that this packet was randomly sampled from 1 in 1000 packets. Sample rates are dynamic and based on the volume of traffic.

## SourceASN

Type: `int`

The ASN associated with the source IP of the packet.

## SourceASNName

Type: `string`

The name of the ASN associated with the source IP of the packet.

## SourceCountry

Type: `string`

The country where the source IP of the packet is located (ISO 3166-1 alpha-2).

## SourceGeoHash

Type: `string`

The latitude and longitude where the source IP of the packet is located (Geohash encoding).

## SourcePort

Type: `int`

Value of the Source Port header field in the TCP or UDP packet.

## TCPAcknowledgementNumber

Type: `int`

Value of the Acknowledgement Number header field in the TCP packet.

## TCPChecksum

Type: `int`

Value of the Checksum header field in the TCP packet.

## TCPDataOffset

Type: `int`

Value of the Data Offset header field in the TCP packet.

## TCPFlags

Type: `int`

Value of the Flags header field in the TCP packet.

## TCPFlagsString

Type: `string`

Human-readable string representation of the Flags header field in the TCP packet.

## TCPMSS

Type: `int`

Value of the MSS option header field in the TCP packet.

## TCPOptions

Type: `string`

List of Options numbers included in the TCP packet header.

## TCPSACKBlocks

Type: `string`

List of the SACK Blocks option header in the TCP packet.

## TCPSACKPermitted

Type: `int`

Value of the SACK Permitted option header in the TCP packet.

## TCPSequenceNumber

Type: `int`

Value of the Sequence Number header field in the TCP packet.

## TCPTimestampECR

Type: `int`

Value of the Timestamp Echo Reply option header in the TCP packet.

## TCPTimestampValue

Type: `int`

Value of the Timestamp option header in the TCP packet.

## TCPUrgentPointer

Type: `int`

Value of the Urgent Pointer header field in the TCP packet.

## TCPWindowScale

Type: `int`

Value of the Window Scale option header in the TCP packet.

## TCPWindowSize

Type: `int`

Value of the Window Size header field in the TCP packet.

## UDPChecksum

Type: `int`

Value of the Checksum header field in the UDP packet.

## UDPPayloadLength

Type: `int`

Value of the Payload Length header field in the UDP packet.

## Verdict

Type: `string`

The action that Cloudflare systems think should be taken on the packet. <br />Possible values are <em>pass</em> \| <em>drop</em>.
